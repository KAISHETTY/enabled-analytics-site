# Motion Study (Playwright, 2026-10-28)

Method: Playwright 1.64 driving installed Chrome at 1440×900. Each site got a load sequence (16 frames, 200ms apart), hover frames on every top-nav item, and a wheel-scroll sequence (300px steps) with `document.getAnimations()` and inline transform/opacity styles logged at every step. Libraries were detected at runtime and the inline choreography code was read from source.

## TO TOP (to-top.ch/en): GSAP 3.15 + ScrollTrigger (63 triggers) + SplitText + TextPlugin + Lenis + Spline + Lottie
| Moment | What happens | Our version |
|---|---|---|
| Intro | Centered logo on a blank stage, then the stage lifts | `IntroCurtain`: EA cloud mark draws its stroke, then the curtain slides up (session-once) |
| Header → title | Nav items fade in one by one, then the giant serif headline reveals **letter by letter** (`gsap_split_letter`) | Header items stagger in (60ms), the hero title splits into letters that rise out of a mask |
| Hero scroll | `.parallax-components` timeline `scrub:1.2`: mountain layers 0→80% `yPercent`, the CTA circle to 125%, the logo section to −70%, and a header overlay fading to 1 | Light **Salesforce sky** with 5 cloud and hill layers scrubbed at different rates. The title lifts and fades, and the header frosts in |
| Badge | Rotating sun disc, "Where do you want to go?" | Rotating text badge "Free Org Health Check • 48h •" |
| Section seams | Torn-paper edges | Soft cloud-edge SVG seams |
| Journey line | A dashed trail winds down the page through chapters | `TrailPath`: an SVG dashed path drawn by scroll progress |
| "Why are you here?" | Signpost plus tilted cards swinging in | "Where is your org today?" with two tilted choice cards that fan out on scroll |
| Concerns | **Sticky stacking cards**, each one scaling the previous down | `StackCards` for the solutions |
| Buttons | Rotated circle CTA that eases to 8° on hover, and a cursor-follow play button (lerp 0.1) | `RotatingBadge`, `CursorPlay` on the Dreamforce video card |
| Smooth scroll | Lenis duration 2.3, expo ease | Lenis duration 1.25, same ease (2.3 felt floaty for a B2B site). Off for reduced motion |

## ABSYZ (absyz.com): Elementor + GSAP 3.11 + ScrollTrigger + Swiper 8 + jquery-numerator
| Moment | What happens | Our version |
|---|---|---|
| Hero (above Awards) | Salesforce **Summit Partner** badge, a background slideshow with Ken Burns zoom and crossfade, and the headline "The Future Is **Agentic**" typed in | Typed Agentforce line in the Agentforce chapter; the Crest Partner badge sits in the trust strip |
| Section marks | A small animated cloud-drop icon above every heading | `CloudMark`: a bouncing mini cloud beside each eyebrow |
| Enduring Relationships | Logo grid fading up (`fadeInUp` stagger) | Logo marquee plus a grid on Case Studies |
| Awards & Recognitions | Badge row (GoodFirms, CMMI, Clutch, GPTW, Salesforce Partner, Pledge 1%) | **Trust strip** with Crest Consulting Partner, ISV Partner, AppExchange 4.95/5, certifications, and Clutch/G2 slots |
| Media scroll | `elementor-motion-effects` scale 1→1.2 tied to scroll | `ScrollZoom` image wrapper |
| Stats | Count-up tiles | Existing `StatsCounter` |
| Assistant | "Your Agentic Assistant" panel with quick-reply chips | **EA Assistant** chat with chips, answers from site knowledge and meeting booking; it hands off to Agentforce Embedded Messaging when configured |
| Journey (/about) | Year milestones 2011 → 2020 | **Horizontal pinned journey** (DAQ mechanics) with EA milestones |

## DAQ (daqconsulting.com): Lenis + WebGL canvas (fluid background)
| Moment | What happens | Our version |
|---|---|---|
| Intro | Logo glyph on black | Folded into `IntroCurtain` |
| Hero | Thin/bold contrast headline over a liquid canvas | Light theme instead: weight contrast plus a serif italic accent |
| Manifesto | **Words light up as you scroll** (grey → white) | `ScrollHighlight`: words go from 15% to 100% ink by scroll progress |
| Neural Core | **Pinned diagram** whose step list highlights as you scroll | `PinnedSteps` for the Shape Cycle and Agentforce flow |
| Engineered for scale | **Horizontal pinned card track** with giant indices and progress tabs | `HorizontalPin` for the journey and case studies |

All motion respects `prefers-reduced-motion`: Lenis is off, scrub effects render in their end state, and the intro is skipped.
