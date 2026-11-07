// Module-level reconciliation checks with fake Expo APIs; not an iOS delivery test.
import {applyPlan} from '../../src/notify';
import * as N from 'expo-notifications';
const pause=()=>new Promise(resolve=>setTimeout(resolve,80));
(async()=>{
  const n={at:Date.now()+3600000,kind:'slot',title:'Test',body:'Due',data:{id:'a',time:'12:00',date:'2026-11-07'}};
  applyPlan({list:[n],action:'Mark as done'});await pause();
  let entries=await N.getAllScheduledNotificationsAsync();
  if(entries.length!==1 || entries[0].content.sound!=='default' || entries[0].content.categoryIdentifier!=='task')throw Error('Could not schedule standard-sound task');
  applyPlan({list:[n],action:'Mark as done'});await pause();entries=await N.getAllScheduledNotificationsAsync();if(entries.length!==1)throw Error('Duplicate reminder');
  const realNow=Date.now;Date.now=()=>n.at-2000;applyPlan({list:[],action:'Mark as done',cancelImminent:true});await pause();entries=await N.getAllScheduledNotificationsAsync();Date.now=realNow;if(entries.length)throw Error('Imminent reminder not cancelled after disabling');
  console.log('PASS mocked notification scheduling, standard sound, deduplication and cancellation');
})().catch(e=>{console.error(e);process.exitCode=1;});
