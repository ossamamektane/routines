// Typography audit: every visible text node uses the system font stack, no manual
// tracking (breaks Arabic joining and double-tightens SF), no weight above 600
// except the large title. Real SF Pro rendering requires an iPhone.
const {testUrl}=require('./ui-fixture.cjs'),{chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
for(const lang of ['en','ar'])for(const theme of ['light','dark'])for(const open of ['','openSheet(null)','openPrefs()']){
 const p=await b.newPage({viewport:{width:390,height:844}});await p.goto(testUrl+'?t=2026-11-09T12:00:00&fresh=1&native=1&seed=1');
 await p.evaluate(s=>__R.ev(s),`lang='${lang}';set('r.lang',lang);set('r.theme','${theme}');applyTheme();applyLang();askSet(null);set('r.open',String(Date.now()));lastHTML='';render();${open}`);await p.waitForTimeout(700);
 const bad=await p.evaluate(()=>{const out=[];for(const e of document.querySelectorAll('body *')){if(!e.childNodes.length||![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))continue;const c=getComputedStyle(e);if(c.display==='none'||c.visibility==='hidden')continue;
  if(!c.fontFamily.startsWith('-apple-system'))out.push(['family',e.className||e.tagName,c.fontFamily]);
  if(c.letterSpacing!=='normal'&&c.letterSpacing!=='0px')out.push(['tracking',e.className||e.tagName,c.letterSpacing]);
  if(+c.fontWeight>600&&!e.closest('.day h1'))out.push(['weight',e.className||e.tagName,c.fontWeight]);}return out.slice(0,8)});
 assert.deepEqual(bad,[],lang+' '+theme+' '+open);await p.close();}
await b.close();console.log('PASS: system font, natural tracking, iOS weights across home/editor/settings, en/ar, light/dark');})().catch(e=>{console.error(e);process.exit(1)});
