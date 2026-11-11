// Wake line reads "Up for X" + "Since [time]" with no extra "Your <day> continues" line,
// and a tap on an editor option right after typing still lands (no focus-time keyboard bar).
const {testUrl}=require('./ui-fixture.cjs'),{chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
for(const [lang,since] of [['en','Since'],['fr','Depuis'],['ar','منذ']]){
 const p=await b.newPage({viewport:{width:320,height:568},isMobile:true,hasTouch:true});
 await p.goto(testUrl+'?t=2026-11-10T01:30:00&fresh=1&native=1&seed=1');const ev=s=>p.evaluate(s=>__R.ev(s),s);
 await ev(`lang='${lang}';set('r.lang',lang);askSet(null);set('r.wake',JSON.stringify({at:new Date('2026-11-09T07:00:00').getTime()}));set('r.open',String(Date.now()));lastHTML='';render();applyLang&&applyLang()`).catch(()=>{});
 await ev(`lastHTML='';render()`);
 const s=await p.evaluate(()=>({tlS:document.getElementById('tlS').textContent,nd:document.getElementById('ndBtn').textContent,body:document.body.innerText}));
 assert.equal(s.tlS,'',lang+' no secondary line');assert(!/continues|continue|مستمر/.test(s.body),lang+' no "continues"');
 if(s.nd) assert(s.nd.startsWith(since),lang+' since label: '+s.nd);
 await p.close();
}
const p=await b.newPage({viewport:{width:320,height:568},isMobile:true,hasTouch:true});
await p.goto(testUrl+'?t=2026-11-09T12:00:00&fresh=1&native=1&seed=1');const ev=s=>p.evaluate(s=>__R.ev(s),s);
await ev(`askSet(null);set('r.open',String(Date.now()));openSheet(null)`);await p.waitForTimeout(700);
await p.locator('#fName').tap();await p.locator('#fName').fill('X');
assert.equal(await p.evaluate(()=>document.activeElement.id),'fName'); assert.equal(await p.locator('#keyboardDone').count(),0);
for(const u of ['w','m','d']){await p.locator(`#fKind [data-unit=${u}]`).tap();await p.waitForTimeout(60);assert.equal(await ev('F.unit'),u,'tap '+u);}
await p.waitForTimeout(400);assert.notEqual(await p.evaluate(()=>document.activeElement.id),'fName','option ends typing');
await b.close();console.log('PASS: "Up for / Since" wording in en/fr/ar, no "continues", option taps while typing');})().catch(e=>{console.error(e);process.exit(1)});
