// Browser regressions for focus, task sections, localization and reduced motion.
// An iPhone build is still required for the real keyboard, haptics and performance.
const {testUrl}=require('./ui-fixture.cjs'),{chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
for(const reducedMotion of ['no-preference','reduce']){
const p=await b.newPage({viewport:{width:320,height:568},isMobile:true,hasTouch:true,reducedMotion});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto(testUrl+'?t=2026-11-06T12:30:00&fresh=1&native=1&seed=1');
assert.equal((await p.locator('.listManage').innerText()).trim(),'All tasks');
await p.locator('.listManage').click();assert.equal(await p.locator('#aTitle').innerText(),'All tasks');
// The same list separates active from paused, rather than duplicating management.
await p.evaluate(()=>__R.ev('items[0].paused=true; paintAll()'));assert.equal(await p.locator('#all .row.paused').count(),1);assert.match(await p.locator('#all').innerText(),/Paused/);
await p.locator('#aClose').click();await p.waitForTimeout(300);await p.evaluate(()=>__R.ev('openSheet(null)'));
await p.locator('#fName').fill('Test');
// Simulate a reduced visual viewport: it must not leave a stale offset on blur.
await p.evaluate(()=>{Object.defineProperty(window,'visualViewport',{configurable:true,value:{height:368,offsetTop:0}});__R.ev('syncVisibleViewport()')});
assert.equal(await p.evaluate(()=>document.documentElement.style.getPropertyValue('--visible-bottom')),'200px');
await p.locator('#fName').press('Enter');assert.equal(await p.evaluate(()=>document.activeElement.id),'fDesc');
await p.locator('#fDesc').blur();await p.waitForTimeout(20);assert.equal(await p.evaluate(()=>document.documentElement.style.getPropertyValue('--visible-bottom')),'0px');
assert.equal(await p.locator('#rMenu').evaluate(e=>getComputedStyle(e).bottom),'0px');
assert.equal(await p.locator('#fName').getAttribute('enterkeyhint'),'next');
await p.evaluate(()=>__R.ev('lang="ar";set("r.lang","ar");applyLang();paintSheet()'));
assert.match(await p.locator('#fKind [data-mode=fixed]').innerText(),/موعد محدد/);await p.locator('#fKind [data-mode=flex]').click();assert.match(await p.locator('.modeHelp').innerText(),/العدد المطلوب/);
assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
await p.locator('#closeBtn').click();await p.waitForTimeout(300);const late=await p.locator('#app .row.late:not(.done):not(.missed) .st.late, #app .row.lt:not(.done):not(.missed) .st.late').count();if(late){let anim=await p.locator('#app .row.late:not(.done):not(.missed) .st.late, #app .row.lt:not(.done):not(.missed) .st.late').first().evaluate(e=>getComputedStyle(e).animationName);assert.equal(anim,reducedMotion==='reduce'?'none':'overdueBreath');}
assert.deepEqual(errors,[]);await p.close();}
await b.close();console.log('PASS: All tasks/paused, Arabic mode labels, Enter focus and reduced motion');})().catch(e=>{console.error(e);process.exit(1)});
