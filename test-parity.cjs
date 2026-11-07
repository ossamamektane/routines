// Compares the extracted engine and the legacy engine in the SAME JS runtime
// and timezone. Browser runtime is for parity tests only; engine.js uses no DOM.
const path=require('path'),fs=require('fs');const reference=process.env.ROUTINES_REFERENCE_DIR || '/data/Routines-36';
const {testUrl}=require(path.join(reference,'scripts/ui-fixture.cjs')),{chromium}=require('playwright'),assert=require('node:assert/strict');
const source=fs.readFileSync(path.join(__dirname,'src','engine.js'),'utf8').replace('export function createEngine','window.createEngine = function createEngine');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});for(const t of ['2026-11-06T12:30:00','2026-11-07T00:30:00','2026-03-08T01:30:00'])for(const lang of ['en','fr','ar']){
 const p=await b.newPage();await p.goto(testUrl+`?t=${t}&fresh=1&native=1&seed=1&lang=${lang}`);const ev=s=>p.evaluate(s=>__R.ev(s),s);
 await p.addScriptTag({content:source});await p.evaluate(()=>{const data=Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)]));window.testEngine=createEngine(data)});
 let model=await p.evaluate(()=>JSON.parse(JSON.stringify(testEngine.model())));assert.deepEqual(model,await ev('model()'),`model ${t} ${lang}`);
 assert.deepEqual(await p.evaluate(()=>testEngine.notifPlan()),await ev('notifPlan()'),`notifications ${t} ${lang}`);
 const slot=(await ev('model().slots.map(s=>({id:s.it.id,time:s.time,done:s.done}))')).find(x=>!x.done);
 if(slot){const a=await p.evaluate(x=>testEngine.apply('slot',x.id,x.time,{}),slot), c=await ev(`apply('slot',${JSON.stringify(slot.id)},${JSON.stringify(slot.time)},{})`);assert.deepEqual(a,c,`completion ${t} ${lang}`);assert.deepEqual(await p.evaluate(()=>JSON.parse(JSON.stringify(testEngine.model()))),await ev('model()'));}
 // Exercise a wider range of existing completion flows, including undo and deferral.
 const ops=[['win','gym',null,{}],['win','gym',null,{}],['item','read',null,{}],['item','read',null,{}],['item','read',null,{later:true,days:1}],['slot','pill','21:00',{later:true,to:'22:00'}],['slot','pill','21:00',{missed:true}]];
 for(const op of ops){
   const a=await p.evaluate(x=>testEngine.apply(...x),op);
   const c=await ev(`apply(${op.map(x=>JSON.stringify(x)).join(',')})`);
   assert.deepEqual(a,c,`action ${JSON.stringify(op)} ${t} ${lang}`);
   assert.deepEqual(await p.evaluate(()=>JSON.parse(JSON.stringify(testEngine.model()))),await ev('model()'),`action model ${JSON.stringify(op)} ${t} ${lang}`);
 }
 await p.close();
}await b.close();console.log('PASS: 9 data/model/notification/action parity scenarios vs current app in same runtime');})().catch(e=>{console.error(e);process.exit(1)});
