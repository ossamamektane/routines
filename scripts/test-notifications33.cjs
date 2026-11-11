// Tests the real reconciliation algorithm with a fake OS. It cannot prove iOS delivery.
const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
let src=fs.readFileSync('src/notify.js','utf8').replace('import { Platform } from "react-native";','const Platform=globalThis.Platform;').replace('import * as Notifications from "expo-notifications";','const Notifications=globalThis.Notifications;').replace(/^export /gm,'')+'\nglobalThis.testSync=sync;';
let pending=[],canceled=[],fail=false,perm=true;
const Notifications={setNotificationHandler(){}, getPermissionsAsync:async()=>({granted:perm}), getAllScheduledNotificationsAsync:async()=>pending.slice(),cancelScheduledNotificationAsync:async id=>{canceled.push(id);pending=pending.filter(x=>x.identifier!==id)},scheduleNotificationAsync:async x=>{if(fail)throw Error('fake failure');pending=pending.filter(n=>n.identifier!==x.identifier);pending.push({identifier:x.identifier,content:x.content});return x.identifier},SchedulableTriggerInputTypes:{DATE:'date'},setNotificationCategoryAsync:async()=>{}};
const ctx={Platform:{OS:'ios'},Notifications,console:{warn(){}},Date,Map,Set,Promise};vm.createContext(ctx);vm.runInContext(src,ctx);
(async()=>{let at=Date.now()+3600000,old={at,kind:'slot',title:'Old',body:'',data:{}},next={at:at+60000,kind:'slot',title:'New',body:'',data:{}};
await ctx.testSync({list:[old]});assert.equal(pending.length,1);const oldId=pending[0].identifier;
fail=true;await ctx.testSync({list:[next]});assert(pending.some(x=>x.identifier===oldId),'failed replacement removed old reminder');assert(!canceled.includes(oldId));
fail=false;await ctx.testSync({list:[next]});assert.equal(pending.length,1);assert.notEqual(pending[0].identifier,oldId);assert(canceled.includes(oldId));
let before=pending[0].identifier;perm=false;await ctx.testSync({list:[]});assert.equal(pending[0].identifier,before);perm=true;await ctx.testSync({list:[]});assert.equal(pending.length,0);
console.log('PASS: notification reconciliation, permission gate and failed-replacement protection (mock OS)');})().catch(e=>{console.error(e);process.exit(1)});
