/**
 * Plays the stacked-alpha longhorn clip (colour on top, matte below) through
 * WebGL so he sits on the page with a true transparent background.
 *
 * Self-contained on purpose: HeroMascot inlines `mascotPlayer.toString()` as a
 * script right after its markup, so playback starts while the HTML is still
 * parsing, before React hydrates. Client-mounted instances (header menus) call
 * it from an effect instead. Calling it twice on the same element is a no-op.
 *
 * Reads from the wrapper: data-loop-start, data-wait-intro ("1" = hold until the
 * intro curtain lifts). Children: <canvas>, <video>, and an <img data-poster>.
 */
export function mascotPlayer(wrap: HTMLElement & { __mascotStop?: () => void }): () => void {
  if (wrap.__mascotStop) return wrap.__mascotStop
  let canvas = wrap.querySelector("canvas") as (HTMLCanvasElement & { __released?: boolean }) | null
  // A canvas whose context was released by an earlier stop() (React remount, dev
  // Strict Mode) can never draw again, so swap in a fresh copy.
  if (canvas && canvas.__released) {
    const fresh = canvas.cloneNode() as HTMLCanvasElement
    canvas.replaceWith(fresh)
    canvas = fresh
  }
  const video = wrap.querySelector("video")
  const poster = wrap.querySelector<HTMLElement>("[data-poster]")
  const loopStart = parseFloat(wrap.dataset.loopStart || "0")
  const showPoster = () => {
    if (poster) poster.style.visibility = "visible"
    if (canvas) canvas.style.visibility = "hidden"
  }
  if (!canvas || !video || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    showPoster()
    return (wrap.__mascotStop = () => {})
  }
  const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false })
  if (!gl || gl.isContextLost()) {
    showPoster()
    return (wrap.__mascotStop = () => {})
  }
  const sh = (type: number, src: string) => {
    const s = gl.createShader(type)!
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return s
  }
  const prog = gl.createProgram()!
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, "attribute vec2 p;varying vec2 uv;void main(){uv=vec2((p.x+1.)*.5,(1.-p.y)*.5);gl_Position=vec4(p,0.,1.);}"))
  gl.attachShader(
    prog,
    sh(gl.FRAGMENT_SHADER, "precision mediump float;varying vec2 uv;uniform sampler2D t;void main(){vec3 c=texture2D(t,vec2(uv.x,uv.y*.5)).rgb;float a=texture2D(t,vec2(uv.x,.5+uv.y*.5)).r;gl_FragColor=vec4(c*a,a);}")
  )
  gl.linkProgram(prog)
  gl.useProgram(prog)
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, "p")
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture())
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

  const cv = canvas
  video.muted = true
  let alive = true
  let ready = false
  let armed = false
  let visible = true
  let raf = 0
  const tick = () => {
    if (!alive) return
    if (video.readyState >= 2 && !video.paused) {
      gl.viewport(0, 0, cv.width, cv.height)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      if (!ready) {
        ready = true
        cv.style.visibility = "visible"
        if (poster) poster.style.visibility = "hidden"
      }
    }
    if (video.duration && video.currentTime >= video.duration - 0.08) video.currentTime = loopStart
    raf = requestAnimationFrame(tick)
  }
  const onEnded = () => {
    video.currentTime = loopStart
    void video.play().catch(() => {})
  }
  const sync = () => {
    if (armed && visible) void video.play().catch(() => {})
    else video.pause()
  }
  video.addEventListener("ended", onEnded)
  const io = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting
    sync()
  })
  io.observe(wrap)
  raf = requestAnimationFrame(tick)

  // Hold under the intro curtain; start the moment it begins to lift.
  const root = document.documentElement
  let mo: MutationObserver | null = null
  const arm = () => {
    armed = true
    sync()
  }
  if (wrap.dataset.waitIntro === "1" && root.classList.contains("intro-playing")) {
    mo = new MutationObserver(() => {
      if (root.classList.contains("intro-playing")) return
      mo!.disconnect()
      arm()
    })
    mo.observe(root, { attributes: true, attributeFilter: ["class"] })
  } else arm()

  return (wrap.__mascotStop = () => {
    alive = false
    cancelAnimationFrame(raf)
    io.disconnect()
    if (mo) mo.disconnect()
    video.removeEventListener("ended", onEnded)
    video.pause()
    // Free the context right away: menus mount a fresh canvas every time they open.
    const lose = gl.getExtension("WEBGL_lose_context")
    if (lose) lose.loseContext()
    ;(canvas as HTMLCanvasElement & { __released?: boolean }).__released = true
  })
}
