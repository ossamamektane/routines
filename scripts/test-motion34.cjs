// Sample the real animation frames, not just declared CSS durations.
const {testUrl}=require('./ui-fixture.cjs'), {chromium}=require('playwright'), assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
for(const reduce of [false,true]){
 const p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:reduce?'reduce':'no-preference'});
 await p.goto(testUrl+'?t=2026-11-06T12:30:00&fresh=1&native=1&seed=1');
 const ev=s=>p.evaluate(s=>__R.ev(s),s); await ev('openSheet(null)'); await p.waitForTimeout(reduce?30:620);
 let o=await p.evaluate(()=>({y:document.querySelector('#sheet').getBoundingClientRect().bottom,screen:innerHeight,back:parseFloat(getComputedStyle(document.querySelector('#scrim')).opacity)}));
 assert(Math.abs(o.y-o.screen)<2&&o.back>.99,JSON.stringify(o));
 if(!reduce){
  const frames=await p.evaluate(()=>new Promise(resolve=>{const sh=document.querySelector('#sheet'),sc=document.querySelector('#scrim'); const distance=Math.max(innerHeight*.6,sh.offsetHeight); let start=performance.now(),samples=[];__R.ev('closeSheet()'); function f(){let ms=performance.now()-start, y=new DOMMatrixReadOnly(getComputedStyle(sh).transform).m42, opacity=parseFloat(getComputedStyle(sc).opacity);samples.push({ms,progress:1-y/distance,opacity}); if(ms<460)requestAnimationFrame(f); else resolve(samples)}requestAnimationFrame(f)}));
  const mid=frames.filter(x=>x.ms>55&&x.ms<320); assert(mid.length>=3,JSON.stringify(frames));
  for(const x of mid) assert(Math.abs(x.progress-x.opacity)<.09,JSON.stringify(x));
  const end=frames.at(-1);assert(end.opacity<.01&&end.progress<.01,JSON.stringify(end));
 } else {await ev('closeSheet()');await p.waitForTimeout(30); assert.equal(await p.locator('#sheet').evaluate(e=>getComputedStyle(e).visibility),'hidden');}
 // Picker inside the editor: backdrop and the opaque child use the same curve.
 await ev('openSheet(null)'); await p.waitForTimeout(reduce?30:620); await p.locator('[data-picker-for=fStartDate]').click(); await p.waitForTimeout(reduce?30:620);
 const picker=await p.locator('#customPick .pickDialog').evaluate(e=>({y:e.getBoundingClientRect().bottom, opacity:getComputedStyle(e.parentElement).opacity})); assert(Math.abs(picker.y-844)<2&&picker.opacity==='1',JSON.stringify(picker));
 await p.locator('#cpCancel').click(); await p.waitForTimeout(reduce?30:440);assert.equal(await p.locator('#customPick').evaluate(e=>getComputedStyle(e).visibility),'hidden'); await ev('closeSheet()'); await p.waitForTimeout(reduce?30:440);
 // A rendered wake sheet remains during its exit and then releases the lock.
 await ev('showNd()'); await p.waitForTimeout(reduce?30:620); await p.locator('[data-act=ndNo]').click();
 if(!reduce) assert.equal(await p.locator('.wakeOverlay.leaving').count(),1);
 await p.waitForTimeout(reduce?30:480);assert.equal(await p.locator('.wakeOverlay').count(),0);
 await p.close();
}
await b.close();console.log('PASS: sheet and tint frame synchronization, nested picker, wake exit, Reduce Motion');})().catch(e=>{console.error(e);process.exit(1)});
