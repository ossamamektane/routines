// Focused regressions for deadline order, calendar rollover and completion UI.
// These exercise the WebView page only; actual iOS status icons need device testing.
const {testUrl}=require('./ui-fixture.cjs'),{chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
for(const lang of ['en','fr','ar']){
 const p=await b.newPage({viewport:{width:320,height:568},isMobile:true,hasTouch:true,reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(testUrl+'?t=2026-11-09T12:00:00&fresh=1&native=1&seed=1&lang='+lang);
 const ev=s=>p.evaluate(s=>__R.ev(s),s);
 await ev(`items=[norm({id:'untimed',name:'Untimed',kind:'fixed',n:1,unit:'d',next:'2026-11-09',anchor:'2026-11-09',times:[]}),norm({id:'timed',name:'Timed',kind:'fixed',n:1,unit:'d',next:'2026-11-09',anchor:'2026-11-09',times:['18:00']}),norm({id:'win',name:'Weekly goal',kind:'window',period:'w',quota:1,log:[],next:'2026-11-09'})];lastHTML='';render()`);
 const ids=await p.locator('#app .list .row').evaluateAll(nodes=>nodes.map(n=>n.dataset.id));assert.deepEqual(ids,['timed','untimed','win'],JSON.stringify(ids));
 for(const id of ['timed','untimed','win']){ const row=p.locator(`.row[data-id="${id}"]`);assert((await row.locator('.tm').innerText()).trim(),id+' must have a leading date/time'); }
 let text=await p.locator('.row[data-id="untimed"] .sb').innerText();assert(/12h|12 h|12س/.test(text),text);
 // Check weekly goal, undo, then verify it remains available.
 await ev(`apply('win','win',null,{});`); assert.equal(await ev("find('win').log.length"),1);await ev(`apply('win','win',null,{});`);assert.equal(await ev("find('win').log.length"),0);
 await ev(`items=[norm({id:'fortnight',name:'Fortnight',kind:'fixed',n:2,unit:'w',next:'2026-11-09',anchor:'2026-11-09',times:[]})]`);
 await ev(`apply('item','fortnight',null,{})`);assert.equal(await ev(`find('fortnight').next`),'2026-11-23'); await ev(`apply('item','fortnight',null,{})`);assert.equal(await ev(`find('fortnight').next`),'2026-11-09');
 // The existing As scheduled quick choice must actually be present and work.
 await ev(`items=[norm({id:'timed',name:'Timed fortnight',kind:'fixed',n:2,unit:'w',next:'2026-11-09',anchor:'2026-11-09',times:['09:00']})];lastHTML='';render();act('slot','timed','09:00',null)`);
 await p.locator('#extraBtn').click();await p.waitForTimeout(680);assert.equal(await p.locator('#tChips [data-tm="540"]').count(),1);await p.locator('#tChips [data-tm="540"]').click();assert.equal(await ev(`dlGet(find('timed'))['09:00']`),'09:00');assert.equal(await ev(`find('timed').next`),'2026-11-23');
 // Synthetic safe area: opaque backing above content, scrim above backing.
 await ev(`document.documentElement.style.setProperty('--st','47px');openPrefs()`);await p.waitForTimeout(50);const layers=await p.evaluate(()=>({top:document.elementFromPoint(10,10).id,back:document.querySelector('#statusBacking').getBoundingClientRect().height}));assert.equal(layers.top,'pScrim');assert.equal(layers.back,47);
 assert.deepEqual(errors,[]);await p.close();
}
// An extended Sunday must not pin a weekly goal to a period which ended at midnight.
const p=await b.newPage({viewport:{width:390,height:844}});await p.goto(testUrl+'?t=2026-11-09T00:01:00&fresh=1&native=1&seed=1');const ev=s=>p.evaluate(s=>__R.ev(s),s);
await ev(`set('r.wake',JSON.stringify({at:new Date(2026,10,8,9).getTime(),still:Date.now()}));DI=null;items=[norm({id:'win',name:'Weekly',kind:'window',period:'w',quota:1,log:['2026-11-08'],next:'2026-11-08'})];lastHTML='';render()`);
const state=await ev(`({logical:iso(today()),calendar:iso(calDay()),remaining:windowLeft('w').min,met:model().week[0].met})`);assert.equal(state.calendar,'2026-11-09');assert(state.remaining>9000,JSON.stringify(state));assert.equal(state.met,false);
await p.close();await b.close();console.log('PASS: chronological deadlines, nonempty leading labels, weekly rollover, fortnightly and goal completion, scheduled shortcut and web status layering');
})().catch(e=>{console.error(e);process.exit(1)});
