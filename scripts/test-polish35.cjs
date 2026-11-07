// Checks the v35 follow-up in a browser. Real iOS keyboard and native tint need a device.
const { testUrl } = require('./ui-fixture.cjs');
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH, args:['--no-sandbox']});
  for (const reduce of [false, true]) for (const theme of ['light','dark']) {
    const page = await browser.newPage({viewport:{width:320,height:568},isMobile:true,hasTouch:true,reducedMotion:reduce?'reduce':'no-preference'});
    const errors=[]; page.on('pageerror', e=>errors.push(e.message));
    await page.goto(testUrl+'?t=2026-11-06T12:30:00&fresh=1&native=1&seed=1');
    const ev=s=>page.evaluate(s=>__R.ev(s),s);
    await ev(`set('r.theme','${theme}');applyTheme();openSheet(null)`);
    await page.waitForTimeout(100);
    const opening=await page.evaluate(()=>({opacity:getComputedStyle(document.querySelector('#scrim')).opacity,y:new DOMMatrixReadOnly(getComputedStyle(document.querySelector('#sheet')).transform).m42}));
    assert.equal(opening.opacity,'1','backdrop should be immediate'); assert(opening.y>5,JSON.stringify({reduce,theme,opening}));
    await page.waitForTimeout(650);
    await page.locator('#fName').focus();
    assert(await page.locator('#keyboardDone').isVisible(),'Done should be available for keyboard');
    await page.locator('#fName').fill('Test routine');
    await page.keyboard.press('Enter'); assert.equal(await page.evaluate(()=>document.activeElement.id),'fDesc');
    await page.locator('#fDesc').fill('Notes'); await page.locator('#keyboardDone').click();
    assert.notEqual(await page.evaluate(()=>document.activeElement.id),'fDesc');
    assert(!(await page.locator('#keyboardDone').isVisible()));
    assert.equal(await page.locator('#fName').inputValue(),'Test routine');
    await ev('closeSheet()'); await page.waitForTimeout(520);
    // Give the fixture a wake record to exercise the actual "Did you sleep?" state.
    await ev('setWake(540); showNd()'); await page.waitForTimeout(100);
    const wake=await page.locator('[data-act=ndYes]').evaluate(e=>({background:getComputedStyle(e).backgroundColor,color:getComputedStyle(e).color}));
    assert.deepEqual(wake,theme==='dark'?{background:'rgb(48, 209, 88)',color:'rgb(0, 0, 0)'}:{background:'rgb(25, 124, 59)',color:'rgb(255, 255, 255)'});
    const wakeBg=await page.locator('.wakeOverlay').evaluate(e=>getComputedStyle(e).backgroundColor);
    assert.equal(wakeBg,theme==='dark'?'rgba(0, 0, 0, 0.6)':'rgba(0, 0, 0, 0.32)');
    assert.deepEqual(errors,[]); await page.close();
  }
  await browser.close();console.log('PASS: immediate tint, moving sheets with both motion settings, keyboard Done and green wake prompt');
})().catch(e=>{console.error(e);process.exit(1)});
