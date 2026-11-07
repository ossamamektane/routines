// Web geometry and icon regressions; real iOS keyboard and motion need device testing.
const {testUrl}=require('./ui-fixture.cjs'),{chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{let b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
for(const size of [{width:320,height:568},{width:390,height:844}]){
const p=await b.newPage({viewport:size,isMobile:true,hasTouch:true,reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(testUrl+'?t=2026-11-06T12:30:00&fresh=1&native=1&seed=1');
// A stale keyboard height must not shorten the wake overlay or float its card.
await p.evaluate(()=>document.documentElement.style.setProperty('--visible-height','368px'));let overlay=await p.locator('.wakeOverlay').boundingBox(),wake=await p.locator('#ndCard').boundingBox();assert(Math.abs(overlay.y+overlay.height-size.height)<1,JSON.stringify(overlay));assert(Math.abs(wake.y+wake.height-size.height)<1,JSON.stringify(wake));await p.locator('[data-act=ndNo]').click();
await p.locator('#app .row .mo').first().click();let menu=await p.locator('#rMenu').boundingBox();assert(Math.abs(menu.y+menu.height-size.height)<1,JSON.stringify(menu));
await p.evaluate(()=>document.documentElement.style.setProperty('--sb','34px'));assert.equal(await p.locator('#rMenu').evaluate(e=>getComputedStyle(e).paddingBottom),'14px');assert.equal(await p.locator('#rMenu .mi').last().evaluate(e=>e.getBoundingClientRect().height>=44),true);
await p.evaluate(()=>__R.ev('closeMenu();openSheet(items[0])'));assert.equal(await p.locator('#pauseIco svg path').getAttribute('fill'),null);assert.equal(await p.locator('#pauseIco svg').getAttribute('fill'),'none');assert.match(await p.locator('#pauseTx').innerText(),/Pause/);
await p.evaluate(()=>__R.ev('closeSheet();items[0].paused=true;openSheet(items[0])'));assert.match(await p.locator('#pauseTx').innerText(),/Resume/);assert.equal(await p.locator('#pauseIco svg').getAttribute('fill'),'none');assert.deepEqual(errors,[]);await p.close();}
await b.close();console.log('PASS: wake/menu anchoring, compact safe-area padding and pause/resume icons');})().catch(e=>{console.error(e);process.exit(1)});
