import concurrent.futures,json,urllib.request,re,html,hashlib
from pathlib import Path
pages=[('oven','https://unsplash.com/photos/pizza-being-removed-from-a-wood-fired-oven-zyvkmq1yJBs'),('pizza-table','https://unsplash.com/photos/a-table-topped-with-pizzas-next-to-an-oven-pjCS7wtjJXQ'),('pizza-chef','https://unsplash.com/photos/person-holding-white-and-brown-pizza-J-Y1kMFVNvI'),('pizza-garden','https://unsplash.com/photos/a-delicious-pizza-loaded-with-toppings-Cqg9B-JRteI')]
def download(item):
 name,url=item
 try:
  ids={'oven':'1754799565084-b381bd0b4db7','pizza-table':'1694444398429-e37d74b13288','pizza-chef':'1597075349517-0deb1e127c37','pizza-garden':'1743615357618-de4ac111c79c'}
  src='https://images.unsplash.com/photo-'+ids[name]+'?auto=format&fit=crop&w=1400&q=85&fm=jpg'
  data=urllib.request.urlopen(src,timeout=30).read();path=Path(f'public/assets/pizza/{name}.jpg');path.write_bytes(data)
  return {'file':str(path),'source':url,'image':src,'sha256':hashlib.sha256(data).hexdigest()}
 except Exception as e:return {'name':name,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:results=list(pool.map(download,pages))
Path('docs/PIZZA_PHOTO_SOURCES.json').write_text(json.dumps(results,indent=2)+'\n')
print(json.dumps(results,indent=2))
