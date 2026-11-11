// The menu offers truthful backdating only for a late, timed occurrence.
// Test the real menu and Undo in the WebView page; iOS needs device testing.
const {testUrl}=require('./ui-fixture.cjs'), {chromium}=require('playwright'), assert=require('node:assert/strict');
(async()=>{ const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
for(const lang of ['en','fr','ar']) for(const kind of ['fixed','flex']){
 const p=await b.newPage({viewport:{width:320,height:568},isMobile:true,hasTouch:true}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(testUrl+'?t=2026-11-09T12:00:00&fresh=1&native=1&seed=1&lang='+lang);
 const ev=s=>p.evaluate(s=>__R.ev(s),s);
 await ev(`askSet(null);set('r.open',String(Date.now()));items=[norm({id:'x',name:'Example',kind:'${kind}',n:2,unit:'w',next:'2026-11-09',anchor:'2026-11-09',times:['09:00']})];lastHTML='';render()`);
 await p.locator('.row[data-id=x] .mo').first().click();await p.waitForTimeout(680);
 const action=p.locator('#rMenu [data-m=scheduled]');assert.equal(await action.count(),1);assert((await action.innerText()).includes('09'));
 const dim=await action.evaluate(el=>{let r=el.getBoundingClientRect(); return {height:r.height, scroll:document.querySelector('#rMenu').scrollHeight, width:el.scrollWidth, client:el.clientWidth}});assert(dim.height>=44);assert(dim.width<=dim.client+1,JSON.stringify(dim));
 await action.click();await p.waitForTimeout(320);assert.equal(await ev(`dlGet(find('x'))['09:00']`),'09:00');assert.equal(await ev(`find('x').next`),'2026-11-23');
 await p.locator('#undoBtn').click();await p.waitForTimeout(500);assert.equal(await ev(`find('x').next`),'2026-11-09');assert.equal(await ev(`dlGet(find('x'))['09:00'] || null`),null);
 // A snoozed late slot records its visible, postponed time instead.
 await ev(`find('x').slots={date:iso(today()),done:{},snz:{'09:00':'10:00'}};lastHTML='';render()`);
 await p.locator('.row[data-id=x] .mo').first().click();await p.waitForTimeout(680);assert((await p.locator('#rMenu [data-m=scheduled]').innerText()).includes('10'));await p.locator('#rMenu [data-m=scheduled]').click();await p.waitForTimeout(300);assert.equal(await ev(`dlGet(find('x'))['09:00']`),'10:00');assert.equal(await ev('model().ontime'),1);
 assert.deepEqual(errors,[]);await p.close();
}
const p=await b.newPage({viewport:{width:320,height:568}});await p.goto(testUrl+'?t=2026-11-09T12:00:00&fresh=1&native=1&seed=1');const ev=s=>p.evaluate(s=>__R.ev(s),s);
await ev(`askSet(null);set('r.open',String(Date.now()));items=[norm({id:'future',name:'Future',kind:'fixed',n:1,unit:'d',next:'2026-11-09',anchor:'2026-11-09',times:['18:00']}),norm({id:'any',name:'Untimed',kind:'fixed',n:1,unit:'d',next:'2026-11-09',anchor:'2026-11-09',times:[]}),norm({id:'goal',name:'Goal',kind:'window',period:'w',quota:1,log:[],next:'2026-11-09'})];lastHTML='';render()`);
for(const id of ['future','any','goal']){await p.locator(`.row[data-id=${id}] .mo`).first().click();await p.waitForTimeout(650);assert.equal(await p.locator('#rMenu [data-m=scheduled]').count(),0,id);await ev('closeMenu()');await p.waitForTimeout(470);}
assert.equal(await ev(`scheduledLate('future','18:00')`),null);
// A menu left open while its slot changes must not backdate a future occurrence.
await ev(`items=[norm({id:'stale',name:'Stale',kind:'fixed',n:1,unit:'d',next:'2026-11-09',anchor:'2026-11-09',times:['09:00']})];lastHTML='';render()`);
await p.locator('.row[data-id=stale] .mo').click();await p.waitForTimeout(650);await ev(`find('stale').slots={date:iso(today()),done:{},snz:{'09:00':'18:00'}}`);await p.locator('#rMenu [data-m=scheduled]').click();assert.equal(await ev(`dlGet(find('stale'))['09:00'] || null`),null);
await p.close();await b.close();console.log('PASS: late scheduled action, flexible and fortnightly tasks, snoozing, undo, localization, and no invented times');
})().catch(e=>{console.error(e);process.exit(1)});
