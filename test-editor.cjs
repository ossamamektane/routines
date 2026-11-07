// Compare native editor adapter with the legacy Save handler in one runtime.
const {testUrl}=require(require('path').join(process.env.ROUTINES_REFERENCE_DIR||'/data/Routines-36','scripts/ui-fixture.cjs')),{chromium}=require('playwright'),fs=require('fs'),assert=require('assert/strict');
const engine=fs.readFileSync('src/engine.js','utf8').replace('export function createEngine','window.createEngine = function createEngine');
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
for(const scenario of [
 {id:'pill',unit:'d',n:1,mode:'fixed',times:['09:00','21:00'],shift:false,start:'2026-11-06',name:'Vitamins revised',wake:null,quota:1},
 {id:'plants',unit:'w',n:2,mode:'fixed',times:[],shift:false,start:'2026-11-06',name:'Plants',wake:null,quota:1},
 {id:'gym',unit:'w',n:1,mode:'flex',times:[],shift:false,start:'2026-11-06',name:'Gym',wake:null,quota:2},
 {id:'water',unit:'h',n:3,mode:'fixed',times:['08:00'],shift:true,start:'2026-11-06',name:'Water',wake:null,quota:1},
 {id:'walk',unit:'d',n:1,mode:'fixed',times:[],shift:false,start:'2026-11-06',name:'Walk',wake:45,quota:1},
]){
 const page=await browser.newPage();await page.goto(testUrl+'?t=2026-11-06T12:30:00&fresh=1&native=1&seed=1');await page.addScriptTag({content:engine});
 const out=await page.evaluate(f=>{const data=Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])), e=createEngine(data), old=e.getItems().find(i=>i.id===f.id); const draft={...f,notes:'test',paused:old.paused,initialStart:old.anchor||old.next};e.saveDraft(draft);e.roll();const native=JSON.stringify(e.getItems());
 const code=`openSheet(find(${JSON.stringify(f.id)})); F.unit=${JSON.stringify(f.unit)}; F.nBy[F.unit]=${f.n}; F.mode=${JSON.stringify(f.mode)}; F.times=${JSON.stringify(f.times)}; F.shift=${f.shift}; F.start=${JSON.stringify(f.start)}; F.quota=${f.quota}; F.wake=${JSON.stringify(f.wake)}; document.getElementById('fName').value=${JSON.stringify(f.name)}; document.getElementById('fDesc').value='test'; document.getElementById('saveBtn').click(); JSON.stringify(items)`;
 return {native,legacy:__R.ev(code)};},scenario);
 try {assert.deepEqual(JSON.parse(out.native),JSON.parse(out.legacy));}catch(e){let a=JSON.parse(out.native).find(x=>x.id===scenario.id),b=JSON.parse(out.legacy).find(x=>x.id===scenario.id); console.error('Mismatch',scenario.id,JSON.stringify(a),JSON.stringify(b));throw e;}
 await page.close();console.log('PASS editor',scenario.id);
}await browser.close();})().catch(e=>{console.error(e);process.exit(1)});
