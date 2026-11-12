import json,sqlite3,time,urllib.request
base='http://localhost:3013'
def get(q):
 return json.load(urllib.request.urlopen(base+q))
a=get('/api/products');b=get('/api/products?offset=48');assert len(a['items'])==48 and a['total']==1260;assert not {p['id'] for p in a['items']} & {p['id'] for p in b['items']}
r=get('/api/products?q=owala&recipient=him&budget=50');assert r['total'] and all(p['brand']=='Owala' and 'him' in p['recipients'] and p['price']<50 for p in r['items'])
r=get('/api/products?sort=low');assert [p['price'] for p in r['items']]==sorted(p['price'] for p in r['items'])
assert get('/api/products?q=zzzznotaproduct')['total']==0
assert len(get('/api/products?ids=20,23')['items'])==2
assert get('/api/products?q=%25')['total']==0
src=sqlite3.connect('/private/tmp/wishd-preview.sqlite');dst=sqlite3.connect('/private/tmp/wishd-100k-test.sqlite');src.backup(dst)
row=dst.execute('SELECT * FROM products LIMIT 1').fetchone()
def copies():
 for i in range(100000-1260):
  p=list(row);p[0]=i+100000;p[10]=i+1260;yield p
dst.executemany('INSERT INTO products VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',copies());dst.commit()
t=time.perf_counter();n=dst.execute('SELECT COUNT(*) FROM products').fetchone()[0];page=dst.execute('SELECT data FROM products ORDER BY rank,id LIMIT 48 OFFSET 99936').fetchall();ms=(time.perf_counter()-t)*1000
assert n==100000 and len(page)==48
print('PASS: API pagination, no duplicates, combined filters, sorting, empty search, literal wildcard, saved-ID recovery.');print(f'PASS: separate SQLite database with {n:,} test records; last-page query {ms:.1f} ms. Synthetic records are not in production.')
