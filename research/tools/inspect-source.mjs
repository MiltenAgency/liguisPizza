import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const dir = new URL('../research/', import.meta.url);
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless:true, args:['--no-sandbox']});
const page = await browser.newPage({viewport:{width:1440,height:1000}, deviceScaleFactor:1});
const paths = ['/', '/about','/team','/contact','/404','/menu','/menu/berry-bliss','/menu/choco-ring','/menu/iced-mocha','/menu/blueberry-muffin','/menu/velvet-mocha','/menu/choco-nap','/menu/berry-bubble','/menu/strawberry-tart','/menu/citrus-glow','/menu/strawberry-cake','/menu/strawberry-bliss'];
for(const path of paths){
 const name=path==='/'?'home':path.slice(1).replaceAll('/','-');
 await page.goto('https://baristi.framer.website'+path,{waitUntil:'networkidle',timeout:60000}).catch(()=>{});
 await page.waitForTimeout(1400);
 const data = await page.evaluate(()=>{
  const visible = el=>!!el.getClientRects().length&&getComputedStyle(el).visibility!=='hidden';
  const info=el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return {tag:el.tagName,text:el.innerText,href:el.getAttribute('href'),name:el.getAttribute('data-framer-name'),x:r.x,y:r.y,w:r.width,h:r.height,font:s.fontFamily,size:s.fontSize,color:s.color,bg:s.backgroundColor}};
  return {title:document.title,text:document.body.innerText, links:[...document.querySelectorAll('a')].filter(visible).map(info),headings:[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible).map(info),images:[...document.querySelectorAll('img')].filter(visible).map(el=>({...info(el),src:el.currentSrc||el.src,alt:el.alt})),fields:[...document.querySelectorAll('input,textarea,select,button')].filter(visible).map(el=>({...info(el),type:el.type,placeholder:el.placeholder,name:el.name})),sections:[...document.querySelectorAll('main > *,main > * > *')].filter(visible).map(info)};
 });
 await fs.writeFile(new URL(name+'.json',dir),JSON.stringify(data,null,2));
 await fs.writeFile(new URL(name+'.html',dir),await page.content());
 if(paths.indexOf(path)<7) await page.screenshot({path:new URL(name+'.png',dir).pathname,fullPage:true});
 console.log(name, data.headings.map(h=>h.text).join(' | '));
}
await page.goto('https://baristi.framer.website/',{waitUntil:'networkidle'});
await page.getByText('Essentials',{exact:true}).first().hover(); await page.waitForTimeout(600);
await page.screenshot({path:new URL('dropdown.png',dir).pathname});
await fs.writeFile(new URL('dropdown.txt',dir),await page.locator('body').innerText());
await page.setViewportSize({width:390,height:844});
await page.goto('https://baristi.framer.website/',{waitUntil:'networkidle'});await page.waitForTimeout(1000);
await page.screenshot({path:new URL('mobile.png',dir).pathname,fullPage:true});
await browser.close();
