// Browser simulations cover web layout and values. iOS status icons and keyboard
// are system-owned and still require testing in a signed build on real devices.
const {testUrl}=require('./ui-fixture.cjs'),{chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{let b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
for(const width of [280,320,390,430]) for(const lang of ['en','fr','ar']) for(const theme of ['light','dark']){
 let p=await b.newPage({viewport:{width,height:700},isMobile:true,hasTouch:true}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(testUrl+'?t=2026-11-09T12:00:00&fresh=1&native=1&seed=1&lang='+lang);let ev=s=>p.evaluate(s=>__R.ev(s),s);
 await ev(`askSet(null);set('r.theme','${theme}');applyTheme();toast('A longer example message',snap())`);await p.waitForTimeout(300);
 let rect=await p.evaluate(()=>{let t=document.querySelector('#toast').getBoundingClientRect(),tx=document.querySelector('#toastTx').getBoundingClientRect(),a=document.querySelector('#undoBtn').getBoundingClientRect();return {t:JSON.parse(JSON.stringify(t)),tx:JSON.parse(JSON.stringify(tx)),a:JSON.parse(JSON.stringify(a)),align:getComputedStyle(document.querySelector('#toastTx')).textAlign}});
 assert.equal(rect.align,'center');assert(rect.tx.right<=rect.a.left+1,JSON.stringify({width,lang,rect}));assert(rect.a.right<=rect.t.right && rect.a.right>rect.t.right-25,JSON.stringify(rect));assert(rect.a.height>=44);
 await ev(`toast('A longer example message',snap(),{label:t('setTimeB'),fn:function(){}})`);await p.waitForTimeout(80);
 let bounds=await p.evaluate(()=>[...document.querySelectorAll('#toastActions, #toastTx,#extraBtn,#undoBtn')].filter(e=>getComputedStyle(e).display!=='none').map(e=>{let r=e.getBoundingClientRect(),t=document.querySelector('#toast').getBoundingClientRect();return {id:e.id,l:r.left,r:r.right,tl:t.left,tr:t.right,sw:e.scrollWidth,cw:e.clientWidth}}));
 for(let x of bounds)assert(x.l>=x.tl-1&&x.r<=x.tr+1&&x.sw<=x.cw+2,JSON.stringify({width,lang,x}));
 await ev(`toast('No action',null)`);assert.equal(await p.locator('.toastActions').isVisible(),false);
 await ev(`openSheet(null)`);await p.waitForTimeout(600);await p.locator('#fName').focus();assert(await p.locator('#shTitle').isVisible());assert.equal(await p.locator('#keyboardDone').count(),0);assert.equal(await p.evaluate(()=>document.activeElement.id),'fName');
 assert.deepEqual(errors,[]);await p.close();
}
// Exercise the real task completion -> Change time -> As scheduled -> Undo flow.
for (const kind of ['fixed','flex']) for(const snoozed of [false,true]){
 let p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(testUrl+'?t=2026-11-09T12:00:00&fresh=1&native=1&seed=1');let ev=s=>p.evaluate(s=>__R.ev(s),s);
 await ev(`askSet(null);set('r.open',String(Date.now()));items=[norm({id:'x',name:'Example',kind:'${kind}',n:2,unit:'w',next:'2026-11-09',anchor:'2026-11-09',times:['09:00']})];${snoozed?"find('x').slots={date:iso(today()),done:{},snz:{'09:00':'10:00'}};":''}lastHTML='';render()`);
 await p.locator('.row[data-id=x] .ck').first().click();await p.waitForTimeout(400);await p.locator('#extraBtn').click();await p.waitForTimeout(550);assert.equal(await p.locator('#tChips [data-tm]').count(),1);assert((await p.locator('#tChips').innerText()).includes('As scheduled'));
 await p.locator('#tChips [data-tm]').click();await p.waitForTimeout(350);assert.equal(await ev(`dlGet(find('x'))['09:00']`),snoozed?'10:00':'09:00');await p.locator('#undoBtn').click();await p.waitForTimeout(100);assert.equal(await ev(`dlGet(find('x'))['09:00']||null`),null);assert.deepEqual(errors,[]);await p.close();
}
await b.close();console.log('PASS: toast alignment, themes, languages, keyboard heading, scheduled shortcut and undo');})().catch(e=>{console.error(e);process.exit(1)});
