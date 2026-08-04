// Crops the Airbnb host-dashboard chrome out of the source screenshots in
// images_xenstay/ and emits responsive 4:3 WebP (+ a JPEG fallback) into img/.
//
// Run from the repo root:  npm i sharp && node build.mjs
import sharp from 'sharp';
import { readdirSync, mkdirSync, statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { findPhoto } from './detect.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC  = path.join(ROOT, 'images_xenstay');
const OUT  = path.join(ROOT, 'img');

// Overwrites in place — deliberately does NOT wipe img/ first, so a run against
// downscaled sources can't destroy larger variants it is unable to regenerate.
mkdirSync(OUT, { recursive: true });

const AR=4/3, WIDTHS=[480,800,1200];
let before=0, after=0;

for(const f of readdirSync(SRC).filter(f=>/\.jpe?g$/i.test(f))){
  const src=path.join(SRC,f), base=path.basename(f,path.extname(f));
  before+=statSync(src).size;
  const r=await findPhoto(src);

  // inset to clear rounded corners, drop the top 13% where the "Listed" pill sits
  const L=r.left+9, R=r.right-9, T=r.top+Math.round((r.bot-r.top)*0.13), B=r.bot-5;
  let w=R-L, h=B-T;
  // centre-crop to 4:3
  if(w/h > AR){ const nw=Math.round(h*AR); var x=L+Math.round((w-nw)/2), y=T, cw=nw, chh=h; }
  else       { const nh=Math.round(w/AR); var x=L, y=T+Math.round((h-nh)*0.45), cw=w, chh=nh; }

  // Never upscale. The originals in images_xenstay/ were downscaled to ~800px in
  // commit 0e82e01, so a 1200px variant would otherwise be interpolated from a
  // ~750px crop and ship visibly soft. Full-resolution sources are recoverable
  // with: git show 47c59cf:images_xenstay/<name>.jpg > images_xenstay/<name>.jpg
  const skipped=[];
  for(const W of WIDTHS){
    if(W > cw){ skipped.push(W); continue; }
    const o=path.join(OUT,`${base}-${W}.webp`);
    await sharp(src).extract({left:x,top:y,width:cw,height:chh})
      .resize({width:W,height:Math.round(W/AR),fit:'cover'})
      .sharpen({sigma:0.6})
      .webp({quality:76,effort:6}).toFile(o);
    after+=statSync(o).size;
  }
  if(skipped.length) console.warn(
    `  ⚠ ${base}: source crop is only ${cw}px wide — skipped ${skipped.join('/')}px ` +
    `variant(s) rather than upscale. Existing files kept; restore the full-res ` +
    `original to regenerate them.`);
  const j=path.join(OUT,`${base}-800.jpg`);
  await sharp(src).extract({left:x,top:y,width:cw,height:chh})
    .resize({width:800,height:600,fit:'cover'}).sharpen({sigma:0.6})
    .jpeg({quality:78,progressive:true,mozjpeg:true}).toFile(j);
  after+=statSync(j).size;
  console.log(`${base.padEnd(18)} crop ${cw}x${chh} @ ${x},${y}`);
}
console.log(`\nsource ${(before/1048576).toFixed(2)}MB -> full set ${(after/1048576).toFixed(2)}MB`);
