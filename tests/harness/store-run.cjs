const path=require('path'),esbuild=require('esbuild'),os=require('os'),fs=require('fs'),cp=require('child_process');
const out=path.join(fs.mkdtempSync(path.join(os.tmpdir(),'native-store-')),'test.cjs');
esbuild.buildSync({entryPoints:[path.join(__dirname,'store-entry.js')],bundle:true,platform:'node',format:'cjs',nodePaths:(process.env.NODE_PATH||'').split(':').filter(Boolean),alias:{'expo-file-system':path.join(__dirname,'file.js')},outfile:out});
try{cp.execFileSync(process.execPath,[out],{stdio:'inherit'});}finally{fs.rmSync(path.dirname(out),{recursive:true,force:true});}
