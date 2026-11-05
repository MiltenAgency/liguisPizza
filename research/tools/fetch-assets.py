"""Download only public imagery and fonts referenced by the inspected pages."""
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.parse import urlparse
from concurrent.futures import ThreadPoolExecutor
from bs4 import BeautifulSoup
import json,re,hashlib
root=Path(__file__).resolve().parents[1]
urls=set()
for p in (root/'research').glob('*.html'):
 s=BeautifulSoup(p.read_text(),'html.parser')
 for img in s.find_all('img'):
  u=img.get('src','').split('?')[0]
  if u.startswith('https://framerusercontent.com/images/'):urls.add(u)
 for x in re.findall(r'https://framerusercontent.com/images/[^\s"<>?]+',str(s)):
  if re.search(r'\.(png|jpg|jpeg|webp|svg)$',x):urls.add(x)
urls.update(['https://fonts.gstatic.com/s/boldonse/v1/ZgNQjPxGPbbJUZemjB37jGA.woff2','https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSg.woff2'])
def get(u):
 name=urlparse(u).path.split('/')[-1];p=root/'public/assets'/name
 if not p.exists():
  for attempt in range(3):
   try:
    with urlopen(Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=40) as r:data=r.read()
    p.write_bytes(data);break
   except Exception as e:
    if attempt==2:return {'source':u,'error':str(e)}
 b=p.read_bytes()
 return {'source':u,'file':'public/assets/'+name,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()}
with ThreadPoolExecutor(max_workers=6) as pool:rows=list(pool.map(get,sorted(urls)))
(root/'research/assets-manifest.json').write_text(json.dumps(rows,indent=2))
print('Downloaded',sum('file' in r for r in rows),'of',len(rows),'assets')
for r in rows:
 if 'error' in r:print(r)
