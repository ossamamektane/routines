const files={};export const Paths={document:'document',cache:'cache'};export class File{constructor(...args){this.uri=args.join('/');}get exists(){return Object.hasOwn(files,this.uri)}create(){files[this.uri]='';}write(s){files[this.uri]=s;}async text(){return files[this.uri]}delete(){delete files[this.uri]}}

globalThis.__mockFiles=files;
