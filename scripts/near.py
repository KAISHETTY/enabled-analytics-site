import re,sys
t=open(sys.argv[1],encoding='utf8',errors='ignore').read()
t=re.sub(r'<(script|style)\b[^>]*>.*?</\1>','',t,flags=re.S)
for name in sys.argv[2:]:
    for m in re.finditer(re.escape(name),t):
        pre=t[max(0,m.start()-6000):m.start()]
        imgs=re.findall(r'media/(0a24a1_[0-9a-f]+~mv2\.(?:jpg|png|jpeg|webp))',pre)
        print(name,'->',imgs[-1] if imgs else None); break
