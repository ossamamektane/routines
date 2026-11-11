// Simulated layout/UX checks. Native iOS symbols and keyboard require an iPhone.
const {testUrl}=require('./ui-fixture.cjs'), {chromium}=require('playwright'), assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
for(const [p,early,at] of [['d','2026-11-09T17:59:00','2026-11-09T18:00:00'],['w','2026-11-14T05:59:00','2026-11-14T06:00:00'],['m','2026-11-23T11:59:00','2026-11-23T12:00:00']]){
 // November 2026 begins on Sunday; week begins Monday, ending Nov 16.
 const page=await b.newPage({viewport:{width:320,height:568},timezoneId:'UTC'});await page.goto(testUrl+'?t='+early+'&fresh=1&native=1&seed=1');const ev=s=>page.evaluate(s=>__R.ev(s),s);
 assert.equal(await ev(`windowLeft('${p}').red`),false,p+' early');await page.evaluate(t=>__setNow(t),at);assert.equal(await ev(`windowLeft('${p}').red`),true,p+' threshold');
 await ev(`items=[norm({id:'goal',name:'Goal',kind:'window',period:'${p}',quota:2,log:[],next:iso(today())})];lastHTML='';render()`);
 assert.equal(await page.locator('.row[data-id=goal] .st.late').count(),1,p+' pending red');
 // Completed quota: no urgent countdown; partial quota stays red.
 let today=at.slice(0,10);await ev(`find('goal').log=['${today}'];lastHTML='';render()`);assert.equal(await page.locator('.row[data-id=goal] .st.late').count(),1,p+' partial red');
 await ev(`find('goal').log=['${today}','${today}'];lastHTML='';render()`);assert.equal(await page.locator('.row[data-id=goal] .st.late').count(),0,p+' completed');await page.close();
}
// Daylight-saving days are 23 or 25 hours long; the quarter uses actual local boundaries.
for(const [before,after] of [['2026-03-08T18:14:00','2026-03-08T18:15:00'],['2026-11-01T17:44:00','2026-11-01T17:45:00']]){
 const p=await b.newPage({timezoneId:'America/New_York'});await p.goto(testUrl+'?t='+before+'&fresh=1&native=1&seed=1');const ev=s=>p.evaluate(s=>__R.ev(s),s);assert.equal(await ev(`windowLeft('d').red`),false,before);await p.evaluate(t=>__setNow(t),after);assert.equal(await ev(`windowLeft('d').red`),true,after);await p.close();
}
for(const theme of ['light','dark']){
 const p=await b.newPage({viewport:{width:320,height:568},isMobile:true,hasTouch:true});await p.goto(testUrl+'?t=2026-11-09T12:00:00&fresh=1&native=1&seed=1');const ev=s=>p.evaluate(s=>__R.ev(s),s);
 await ev(`askSet(null);set('r.open',String(Date.now()));set('r.theme','${theme}');applyTheme();openSheet(null)`);await p.waitForTimeout(680);
 await p.locator('#fName').fill('Example');await p.locator('#fKind [data-unit=w]').click();await p.waitForTimeout(100);
 assert.equal(await ev('F.unit'),'w');assert.notEqual(await p.evaluate(()=>document.activeElement.id),'fName');assert.equal(await p.locator('#fName').inputValue(),'Example');
 await ev(`var n=document.createElement('div');n.className='tgl on';n.innerHTML='<div class="sw"></div>';document.body.appendChild(n)`);
 const colors=await p.evaluate(()=>({sw:getComputedStyle(document.querySelector('body > .tgl .sw')).backgroundColor,dot:getComputedStyle(document.querySelector('#wakeCheck circle')).fill,button:(()=>{const e=document.createElement('button');e.className='nd-b';const w=document.createElement('div');w.className='wake ndc';w.appendChild(e);document.body.appendChild(w);const bg=getComputedStyle(e).backgroundColor;w.remove();return bg;})()}));assert.equal(colors.sw,colors.dot);assert.equal(colors.sw,colors.button);
 assert.equal(await p.locator('#statusBacking').count(),0);await p.close();
}
await b.close();console.log('PASS: 25% urgency thresholds, partial/completed goals, keyboard option taps and matching greens');})().catch(e=>{console.error(e);process.exit(1)});
