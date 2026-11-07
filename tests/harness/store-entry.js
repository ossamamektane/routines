// Dual-copy recovery check using fake files; not a filesystem/device test.
import {File,Paths} from 'expo-file-system';
import {loadStore,getStore,applyChange,flushStore} from '../../src/store';
(async()=>{
 await loadStore();applyChange({set:{'r.items':'[{"id":"a","name":"Test"}]'}});flushStore();
 const a=new File(Paths.document,'routines-a.json'),b=new File(Paths.document,'routines-b.json');
 if(!a.exists||!b.exists||!(await a.text()).includes('Test'))throw Error('Copies not saved');
 a.write('{');await loadStore();if(!getStore().data['r.items'].includes('Test'))throw Error('Valid copy not recovered');
 b.write('{');let threw=false;try{await loadStore()}catch{threw=true}if(!threw)throw Error('Both corrupt copies should stop loading');
 if(await a.text()!=='{'||await b.text()!=='{')throw Error('Corrupt files unexpectedly overwritten');
 console.log('PASS mocked dual-copy storage and corrupt-data protection');
})().catch(e=>{console.error(e);process.exitCode=1;});
