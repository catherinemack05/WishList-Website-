import json,sqlite3,time,urllib.request
base='http://localhost:3013'
def get(q):
 return json.load(urllib.request.urlopen(base+q,timeout=15))
a=get('/api/products');b=get('/api/products?offset=48');assert len(a['items'])==48 and a['total']==5000;assert not {p['id'] for p in a['items']} & {p['id'] for p in b['items']}
r=get('/api/products?q=owala&recipient=him&budget=50');assert r['total'] and all(p['brand']=='Owala' and 'him' in p['recipients'] and p['price']<50 for p in r['items'])
r=get('/api/products?sort=low');assert [p['price'] for p in r['items']]==sorted(p['price'] for p in r['items'])
assert get('/api/products?q=zzzznotaproduct')['total']==0
assert len(get('/api/products?ids=20,23')['items'])==2
assert get('/api/products?q=%25')['total']==0
last=get('/api/products?offset=4992');assert len(last['items'])==8 and last['total']==5000
assert not get('/api/products?offset=5000')['items']
seen=set()
for offset in range(0,5000,48):
 for p in get('/api/products?offset='+str(offset))['items']:
  assert p['id'] not in seen and p['url'].startswith('https://');seen.add(p['id'])
assert len(seen)==5000
print('PASS: all 5,000 catalog items are unique and reachable through pagination; filters, price order, saved IDs, empty search, and the final partial page verified.')
