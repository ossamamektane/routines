// Verify interruption behavior and the JS bridge with a mocked native shell.
const {testUrl}=require('./ui-fixture.cjs'), {chromium}=require('playwright'), assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
for(const reduce of [false,true]) {
 const p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:reduce?'reduce':'no-preference'});
 await p.goto(testUrl+'?t=2026-11-06T12:30:00&fresh=1&native=1&seed=1');
 const ev=s=>p.evaluate(s=>__R.ev(s),s);
 await ev('openSheet(null)');await p.waitForTimeout(720);
 assert(await p.evaluate(()=>document.documentElement.classList.contains('lock')));
 await p.evaluate(()=>{__msgs.length=0;__R.ev('closeSheet();openPrefs()')});await p.waitForTimeout(50);
 assert.deepEqual(await p.evaluate(()=>__msgs.filter(m=>m.type==='modalState').map(m=>m.open)),[],'changing sheets should not flash native tint');
 await ev('closePrefs()');
 await p.waitForTimeout(120);assert(await p.evaluate(()=>document.documentElement.classList.contains('lock')),'dashboard remains locked during exit');
 await p.waitForTimeout(520);assert(!(await p.evaluate(()=>document.documentElement.classList.contains('lock'))),'dashboard unlocks after exit');
 await ev('openSheet(null)');await p.waitForTimeout(80);await ev('closeSheet()');await p.waitForTimeout(80);await ev('openSheet(null)');await p.waitForTimeout(530);assert(await p.evaluate(()=>document.documentElement.classList.contains('lock')),'reopening cancels pending unlock');
 await p.close();
}await b.close();console.log('PASS: close/open coalescing, exit lock and interrupted/reduced motion');})().catch(e=>{console.error(e);process.exit(1)});
