// Matching Routines' monochrome brand: a distinct repeat/check symbol on a
// pure-black canvas. iOS applies its own mask; Android masks the foreground.
const fs=require('fs'),sharp=require('sharp'),path=require('path');
const root=path.resolve(__dirname,'..'), assets=path.join(root,'assets');
const symbol=(color)=>`<g fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round"><path d="M 294 330 A 288 288 0 1 1 225 532" stroke-width="64"/><path d="M 180 551 L 225 505 L 270 551" stroke-width="64"/><path d="M 353 512 L 462 621 L 645 420" stroke-width="82"/></g>`;
const wrap=(content)=>`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">${content}</svg>`;
(async()=>{
 const icon=wrap(`<rect width="1024" height="1024" fill="#000000"/>${symbol('#ffffff')}`);
 fs.writeFileSync(path.join(root,'design/app-icon.svg'),icon);
 await sharp(Buffer.from(icon)).removeAlpha().png().toFile(path.join(assets,'icon.png'));
 const safe=`<g transform="translate(143 143) scale(.72)">${symbol('#ffffff')}</g>`;
 await sharp(Buffer.from(wrap(safe))).png().toFile(path.join(assets,'adaptive-icon.png'));
 // Android's small notification icon must be a white monochrome glyph on transparency.
 // Android applies the system tint; RGB is intentionally white rather than a blue brand color.
 await sharp(Buffer.from(wrap(`<g transform="translate(143 143) scale(.72)">${symbol('#ffffff')}</g>`)))
   .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 })
   .resize(76, 76, { fit: 'contain' }).extend({ top: 10, bottom: 10, left: 10, right: 10, background: { r: 0, g: 0, b: 0, alpha: 0 } })
   .png().toFile(path.join(assets,'notification-icon.png'));
 await sharp(Buffer.from(wrap(symbol('#000000')))).png().toFile(path.join(assets,'splash-icon.png'));
 await sharp(Buffer.from(wrap(symbol('#f5f5f7')))).png().toFile(path.join(assets,'splash-icon-dark.png'));
 console.log('Rendered black Routines app icon and monochrome Android notification icon assets');
})().catch(e=>{console.error(e);process.exit(1)});
