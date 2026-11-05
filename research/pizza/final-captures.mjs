import {chromium} from '@playwright/test';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1880,height:950},reducedMotion:'reduce'});
for(const [width,label] of [[1880,'desktop'],[390,'mobile']]){
 await page.setViewportSize({width,height:label==='desktop'?950:844});
 for(const route of ['/','/about','/contact','/menu','/404',label==='desktop'?'/menu/margherita':'/menu/garden-pizza']){
  await page.goto('http://127.0.0.1:5173'+route,{waitUntil:'networkidle'});
  await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager'); await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));await document.fonts.ready;});
  await page.screenshot({path:`docs/${route.slice(1).replaceAll('/','-')||'home'}-${label}.png`});
 }
}
await page.setViewportSize({width:1880,height:950});
await page.emulateMedia({reducedMotion:'no-preference'});
await page.goto('http://127.0.0.1:5173',{waitUntil:'networkidle'});
await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));await document.fonts.ready;});
for(const selector of ['.why-statement','.testimonials','.cta-art']){
 await page.evaluate(selector=>scrollBy({top:document.querySelector(selector).getBoundingClientRect().top-100,behavior:'instant'}),selector);
 await page.waitForTimeout(1200);
 await page.screenshot({path:`docs/animation-${selector.slice(1)}.png`});
}
// Verify the burgers row has enough repeated content to cross and rebase its loop boundary.
const track=page.locator('.carousel-burgers .carousel-track');
await track.scrollIntoViewIfNeeded();
const group=await track.evaluate(el=>(el.firstElementChild.getBoundingClientRect().width+20)*(el.children.length/3));
await track.evaluate((el,group)=>el.scrollLeft=group*2+10,group);
await page.waitForTimeout(100);
const left=await track.evaluate(el=>el.scrollLeft);
if(left>=group*2)throw Error('Burgers loop failed to wrap');
console.log('Refreshed screenshots; burgers carousel wraps:',{left,group});
await browser.close();
