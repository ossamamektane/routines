// Real task menus: compact bottom gap while keeping the final action above
// the home indicator, at small sizes and with longer translated labels.
const {testUrl}=require('./ui-fixture.cjs'),{chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
for(const size of [{width:280,height:480},{width:320,height:568},{width:390,height:844}]) for(const lang of ['en','fr','ar']) for(const safe of [0,21,34]){
 const p=await b.newPage({viewport:size,isMobile:true,hasTouch:true,reducedMotion:'reduce'});await p.goto(testUrl+'?t=2026-11-06T12:30:00&fresh=1&native=1&seed=1&lang='+lang);await p.evaluate(s=>document.documentElement.style.setProperty('--sb',s+'px'),safe);
 // Dismiss the first-run wake prompt as a user would before opening task actions.
 if(await p.locator('.wakeOverlay [data-act=ndNo]').count()){await p.locator('.wakeOverlay [data-act=ndNo]').click();await p.waitForTimeout(550);}
 await p.locator('#app .row .mo').first().click();await p.waitForTimeout(680);const rect=await p.locator('#rMenu').evaluate(m=>{let b=m.querySelector('.mi:last-child'),r=b.getBoundingClientRect(),s=b.querySelector('span').getBoundingClientRect(),p=getComputedStyle(m);return {bottom:m.getBoundingClientRect().bottom,buttonH:r.height,labelCenter:(s.top+s.bottom)/2,padding:parseFloat(p.paddingBottom),visible:getComputedStyle(m).visibility}});
 assert.equal(rect.visible,'visible');assert(Math.abs(rect.bottom-size.height)<1,JSON.stringify({size,lang,safe,rect}));assert(rect.buttonH>=44,JSON.stringify(rect));assert(rect.labelCenter<=size.height-safe,JSON.stringify({size,lang,safe,rect}));assert(rect.padding<=Math.max(12,safe-20)+.1,JSON.stringify(rect));await p.close();
}await b.close();console.log('PASS: compact action sheet, safe-area label clearance, targets and 27 size/language/inset combinations')})().catch(e=>{console.error(e);process.exit(1)});
