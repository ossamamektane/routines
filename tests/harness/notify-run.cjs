const path=require('path'),esbuild=require('esbuild'),os=require('os'),fs=require('fs'),cp=require('child_process');
const out=path.join(fs.mkdtempSync(path.join(os.tmpdir(),'native-notify-')),'test.cjs');
const aliases={'react-native':path.join(__dirname,'native.js'),'expo-notifications':path.join(__dirname,'notifications.js')};
esbuild.buildSync({entryPoints:[path.join(__dirname,'notify-entry.js')],bundle:true,platform:'node',format:'cjs',loader:{'.js':'jsx'},nodePaths:(process.env.NODE_PATH||'').split(':').filter(Boolean),alias:aliases,outfile:out});
try{cp.execFileSync(process.execPath,[out],{stdio:'inherit'});}finally{fs.rmSync(path.dirname(out),{recursive:true,force:true});}
