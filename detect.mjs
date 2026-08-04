// Locates the photograph inside an Airbnb host-dashboard screenshot by finding
// the bounding box of non-white pixels. Used by build.mjs.
import sharp from 'sharp';
import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), 'images_xenstay');
const isWhite=(r,g,b)=>r>242&&g>242&&b>242;

export async function findPhoto(file){
  const img=sharp(file);
  const {width:W,height:H}=await img.metadata();
  const {data,info}=await img.raw().toBuffer({resolveWithObject:true});
  const ch=info.channels;
  const px=(x,y)=>{const i=(y*W+x)*ch;return[data[i],data[i+1],data[i+2]];};
  const rowWhite=y=>{let n=0;for(let x=0;x<W;x+=4)if(isWhite(...px(x,y)))n++;return n/Math.ceil(W/4);};
  const colWhite=x=>{let n=0;for(let y=0;y<H;y+=4)if(isWhite(...px(x,y)))n++;return n/Math.ceil(H/4);};
  // photo band = contiguous rows that are NOT mostly white
  let top=0; while(top<H && rowWhite(top)>0.85) top++;
  let bot=H-1; while(bot>top && rowWhite(bot)>0.55) bot--;
  let left=0; while(left<W && colWhite(left)>0.85) left++;
  let right=W-1; while(right>left && colWhite(right)>0.85) right--;
  return {W,H,top,bot,left,right};
}
if(process.argv[2]==='scan'){
  for(const f of readdirSync(SRC).filter(f=>/\.jpe?g$/i.test(f))){
    const r=await findPhoto(`${SRC}/${f}`);
    console.log(f.padEnd(20), `src ${r.W}x${r.H}`, `photo x${r.left}-${r.right} y${r.top}-${r.bot}`,
      `=> ${r.right-r.left}x${r.bot-r.top}`);
  }
}
