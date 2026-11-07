// Exercise the real web/native protocol with a fake bridge. Native presentation,
// physical-device animations and launch still require an actual iOS build.
const {testUrl}=require('./ui-fixture.cjs'), {chromium}=require('playwright'), assert=require('node:assert/strict');
(async()=>{let b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
for(const lang of ['en','fr','ar']){
 const p=await b.newPage({viewport:{width:320,height:568},isMobile:true,hasTouch:true,reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(testUrl+'?t=2026-11-06T12:30:00&fresh=1&native=1&seed=1&lang='+lang);
 await p.evaluate(()=>window.__nat.nativeSheets(true));
 const button=p.locator('#app .row .mo').first();await button.click();
 let msg=await p.evaluate(()=>__msgs.filter(m=>m.type==='nativeMenu').at(-1));assert(msg&&msg.options.length>=2,JSON.stringify(msg));
 let expected=await p.locator('#rMenu [data-m]').evaluateAll(es=>es.map(e=>({key:e.dataset.m,label:e.querySelector('span').textContent})));assert.deepEqual(msg.options.map(({key,label})=>({key,label})),expected);
 assert.equal(await p.locator('#rMenu').evaluate(e=>e.classList.contains('on')),false);assert.equal(await p.locator('html').evaluate(e=>e.classList.contains('lock')),true);
 await p.evaluate(m=>__nat.nativeMenuResult({token:m.token+1,key:'edit'}),msg);assert.equal(await p.locator('html').evaluate(e=>e.classList.contains('lock')),true);
 await p.evaluate(m=>__nat.nativeMenuResult({token:m.token,key:'unexpected'}),msg);assert.equal(await p.locator('html').evaluate(e=>e.classList.contains('lock')),true);
 await p.evaluate(m=>__nat.nativeMenuResult({token:m.token,key:null}),msg);assert.equal(await p.locator('html').evaluate(e=>e.classList.contains('lock')),false);
 await button.click();msg=await p.evaluate(()=>__msgs.filter(m=>m.type==='nativeMenu').at(-1));await p.evaluate(m=>__nat.nativeMenuResult({token:m.token,key:'edit'}),msg);
 assert(await p.locator('#sheet').evaluate(e=>e.classList.contains('on')));assert.equal(await p.locator('#fName').inputValue(),msg.title);await p.evaluate(()=>__R.ev('closeSheet()'));
 // Old shells / browser must still retain the working web menu.
 await p.evaluate(()=>__nat.nativeSheets(false));await button.click();assert(await p.locator('#rMenu').evaluate(e=>e.classList.contains('on')));await p.evaluate(()=>__R.ev('closeMenu()'));assert.deepEqual(errors,[]);await p.close();
}await b.close();console.log('PASS: native menu handshake, actions, stale callbacks, cancellation, edit and fallback in three languages');})().catch(e=>{console.error(e);process.exit(1)});
