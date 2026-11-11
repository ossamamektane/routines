// Behavioral regression scenarios, with a simulated local clock; no native iOS APIs.
const {testUrl}=require('./ui-fixture.cjs'),{chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
for(const timezoneId of ['America/New_York','Europe/Paris','Africa/Casablanca']){
 const p=await b.newPage({viewport:{width:390,height:844},timezoneId}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(testUrl+'?t=2026-11-09T12:00:00&fresh=1&native=1&seed=1');const ev=s=>p.evaluate(s=>__R.ev(s),s);
 const setup=async expr=>{await ev(`askSet(null);set('r.open',String(Date.now()));items=[norm(${expr})];lastHTML='';render()`)};
 const undo=async()=>{await p.locator('#undoBtn').click();await p.waitForTimeout(330)};
 const fixed=`{id:'x',name:'Fortnight',kind:'fixed',unit:'w',n:2,next:'2026-11-09',anchor:'2026-11-09',times:['09:00']}`;
 await setup(fixed);assert.equal(await ev(`slotInfo('x','09:00').state`),'late');
 await ev(`act('slot','x','09:00',null,{missed:true})`);assert.equal(await ev(`dlGet(find('x'))['09:00']`),'×');assert.equal(await ev(`find('x').next`),'2026-11-23');await undo();assert.equal(await ev(`find('x').next`),'2026-11-09');assert.equal(await ev(`dlGet(find('x'))['09:00'] || null`),null);
 await setup(fixed);
 // The actual Later sheet rejects past times, accepts a future time, and Undo restores it.
 await ev(`openLater('slot','x','09:00');$('lTime').value='11:00'`);await p.waitForTimeout(680);await p.locator('#lpSet').click();assert(await p.locator('#lWarn').isVisible());assert.equal(await ev(`slotInfo('x','09:00').eff`),'09:00');
 await ev(`$('lTime').value='15:00'`);await p.locator('#lpSet').click();assert.equal(await ev(`slotInfo('x','09:00').eff`),'15:00');assert.equal(await ev(`slotInfo('x','09:00').state`),'soon');await undo();assert.equal(await ev(`slotInfo('x','09:00').eff`),'09:00');
 await setup(`{id:'x',name:'Anytime',kind:'fixed',unit:'w',n:2,next:'2026-11-09',anchor:'2026-11-09',times:[]}`);await ev(`act('item','x',null,null,{later:true,date:'2026-11-11'})`);assert.equal(await ev(`find('x').next`),'2026-11-11');await undo();assert.equal(await ev(`find('x').next`),'2026-11-09');
 await ev(`act('item','x',null,null,{missed:true})`);assert.equal(await ev(`find('x').next`),'2026-11-23');assert.equal(await ev(`find('x').last`),null);await undo();assert.equal(await ev(`find('x').next`),'2026-11-09');
 await setup(`{id:'x',name:'Hourly',kind:'fixed',unit:'h',n:2,next:'2026-11-09',anchor:'2026-11-09',at0:'09:00',times:['09:00']}`);const slot=await ev(`find('x').times[0]`);await ev(`act('slot','x',${JSON.stringify(slot)},null,{missed:true})`);assert.equal(await ev(`dlGet(find('x'))[${JSON.stringify(slot)}]`),'×');assert.notEqual(await ev(`find('x').times[0]`),slot);await undo();assert.equal(await ev(`find('x').times[0]`),slot);
 await setup(`{id:'x',name:'Goal',kind:'window',period:'w',quota:2,log:[],next:'2026-11-09'}`);await ev(`act('win','x',null,null)`);assert.equal(await ev(`find('x').log.length`),1);await undo();assert.equal(await ev(`find('x').log.length`),0);
 await setup(fixed);assert.equal(await ev(`lateQueue().length`),1);await ev(`openCatch();answer('ontime')`);assert.equal(await ev(`dlGet(find('x'))['09:00']`),'09:00');assert.equal(await ev(`find('x').next`),'2026-11-23');
 assert.deepEqual(errors,[]);await p.close();console.log('PASS behaviors:',timezoneId);
}
await b.close()})().catch(e=>{console.error(e);process.exit(1)});
