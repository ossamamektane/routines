// Verify concise localized plan text and preserved routing, not iOS delivery.
const {testUrl}=require('./ui-fixture.cjs'),{chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
for(const [locale,due,late,left] of [['en','Due now','Due at','Today’s tasks'],['fr','À faire maintenant','Prévu à','Tâches du jour'],['ar','حان موعدها الآن','موعدها','مهام اليوم']]) {
 const p=await b.newPage(); await p.goto(testUrl+'?t=2026-11-06T12:30:00&fresh=1&native=1&seed=1&lang='+locale);
 const ev=s=>p.evaluate(s=>__R.ev(s),s);
 await ev('wakeIs(540); items.find(x=>x.id==="pill").desc="Take with water"');
 const plan=await ev('notifPlan()');
 const withNote=plan.find(n=>n.kind==='slot'&&n.data.id==='pill');assert(withNote);assert.equal(withNote.title,'Vitamins');assert.equal(withNote.body,'Take with water');assert(withNote.data.time&&withNote.data.date);
 const follow=plan.find(n=>n.kind==='late'&&n.data.id==='pill');assert(follow);assert.equal(follow.title,'Vitamins');assert(follow.body.includes(late));assert(follow.data.time&&follow.data.date);
 const plain=plan.find(n=>n.kind==='slot'&&n.data.id!=='pill');assert(plain);assert.equal(plain.body,due);
 const checkin=plan.find(n=>n.kind==='left');if(checkin){assert.equal(checkin.title,left);assert(!checkin.body.includes('Still open:'));}
 await p.close();
}await b.close();console.log('PASS: concise localized reminders, notes, follow-ups and routing data');})().catch(e=>{console.error(e);process.exit(1)});
