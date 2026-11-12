let seeding;
async function ensureSeed(db){
 if(!seeding)seeding=(async()=>{if(await db.prepare('SELECT version FROM catalog_seed WHERE version = ?').bind(SEED_VERSION).first())return;
 for(let i=0;i<SEED.length;i+=40)await db.batch(SEED.slice(i,i+40).map(row=>db.prepare('INSERT INTO products (id,brand,name,category,ages,price,him,her,edits,search_text,rank,data) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET rank=excluded.rank, data=excluded.data').bind(...row)));
 await db.prepare('INSERT OR IGNORE INTO catalog_seed(version) VALUES (?)').bind(SEED_VERSION).run();})();
 try{await seeding;}catch(e){seeding=null;throw e;}
}
const json=(value,status=200)=>Response.json(value,{status,headers:{'Cache-Control':'no-store'}});
export async function productQuery(db,s){
 const ids=s.get('ids');if(ids!==null){const values=ids.split(',').filter(x=>/^\d+$/.test(x)).slice(0,100).map(Number);if(!values.length)return json({items:[]});const r=await db.prepare(`SELECT data FROM products WHERE id IN (${values.map(()=>'?').join(',')})`).bind(...values).all();return json({items:r.results.map(r=>JSON.parse(r.data))});}
 const clauses=[],args=[];
 for(const [key,column] of [['brand','brand'],['category','category']]){const v=s.get(key);if(v&&v!=='all'&&v!=='All finds'){clauses.push(column+' = ?');args.push(v.slice(0,150));}}
 const who=s.get('recipient');if(who==='him'||who==='her')clauses.push(who+' = 1');
 const age=s.get('age');if(['kids','teens','adults'].includes(age)){clauses.push('ages LIKE ?');args.push('%'+age+'%');}
 const trend=s.get('trend');if(['cafe','creator','offline','scent','reset','hydration'].includes(trend)){clauses.push('edits LIKE ?');args.push('%'+trend+'%');}
 const budget=Number(s.get('budget'));if(budget>0&&Number.isFinite(budget)){clauses.push('price < ?');args.push(budget);}
 for(const token of (s.get('q')||'').toLowerCase().slice(0,200).split(/\s+/).filter(Boolean).slice(0,10)){clauses.push("search_text LIKE ? ESCAPE '\\'");args.push('%'+token.replace(/[\\%_]/g,'\\$&')+'%');}
 const where=clauses.length?' WHERE '+clauses.join(' AND '):'';const raw=Number(s.get('offset')||0);const offset=Number.isSafeInteger(raw)?Math.max(0,Math.min(raw,10000000)):0;
 const sort=s.get('sort');const order=sort==='low'?'price ASC,id ASC':sort==='high'?'price DESC,id ASC':'rank ASC,id ASC';
 const results=await db.batch([db.prepare('SELECT COUNT(*) AS total FROM products'+where).bind(...args),db.prepare('SELECT data FROM products'+where+' ORDER BY '+order+' LIMIT 48 OFFSET ?').bind(...args,offset)]);
 return json({items:results[1].results.map(r=>JSON.parse(r.data)),total:results[0].results[0].total,offset,limit:48});
}
export default {async fetch(request,env){const url=new URL(request.url);if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});
 try{if(url.pathname.startsWith('/api/')){await ensureSeed(env.DB);if(url.pathname==='/api/products')return await productQuery(env.DB,url.searchParams);if(url.pathname==='/api/catalog'){const r=await env.DB.batch([env.DB.prepare('SELECT COUNT(*) total,SUM(him) him,SUM(her) her FROM products'),env.DB.prepare('SELECT DISTINCT brand FROM products ORDER BY brand')]);const c=r[0].results[0];return json({total:c.total,brands:r[1].results.map(x=>x.brand),recipients:{him:c.him,her:c.her}});}return json({error:'Not found'},404);}
 const asset=ASSETS[url.pathname==='/'?'/index.html':url.pathname];if(!asset)return new Response('Not found',{status:404});return new Response(request.method==='HEAD'?null:Uint8Array.from(atob(asset.body),c=>c.charCodeAt(0)),{headers:{'Content-Type':asset.type,'Cache-Control':url.pathname.includes('/assets/')?'public,max-age=86400':'no-cache','X-Content-Type-Options':'nosniff'}});
 }catch(error){console.error('Catalog request failed',error);return json({error:'Catalog temporarily unavailable. Please retry.'},503);}}};
