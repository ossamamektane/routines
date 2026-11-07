// The bridge must dispatch each action to the existing task model/sheets.
const {testUrl}=require('./ui-fixture.cjs'),{chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
for(const key of ['do','skip','later','at','edit']){
 const p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(testUrl+'?t=2026-11-06T12:30:00&fresh=1&native=1&seed=1');await p.evaluate(()=>{__R.ev('wakeIs(540)');__nat.nativeSheets(true)});
 // Find a real row whose menu offers this command; the first task is not
 // necessarily timed, so do not assume every action is always available.
 const count=await p.locator('#app .row .mo').count();let msg;
 for(let i=0;i<count;i++){await p.locator('#app .row .mo').nth(i).click();msg=await p.evaluate(()=>__msgs.filter(m=>m.type==='nativeMenu').at(-1));if(msg.options.some(o=>o.key===key))break;await p.evaluate(m=>__nat.nativeMenuResult({token:m.token,key:null}),msg);msg=null;}
 assert(msg,'no fixture menu for '+key);const before=await p.evaluate(()=>localStorage.getItem('r.items'));
 await p.evaluate(({token,key})=>__nat.nativeMenuResult({token,key}),{token:msg.token,key});
 if(key==='edit')assert(await p.locator('#sheet').evaluate(e=>e.classList.contains('on')));
 if(key==='later')assert(await p.locator('#later').evaluate(e=>e.classList.contains('on')));
 if(key==='at')assert(await p.locator('#tsheet').evaluate(e=>e.classList.contains('on')));
 if(key==='do'||key==='skip'){await p.waitForTimeout(350);assert.notEqual(await p.evaluate(()=>localStorage.getItem('r.items')),before,'model did not change for '+key);}
 assert.deepEqual(errors,[]);await p.close();
}await b.close();console.log('PASS: native menu commands dispatch to the existing task model and editors')})().catch(e=>{console.error(e);process.exit(1)});
