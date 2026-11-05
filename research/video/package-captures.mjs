import {chromium} from '@playwright/test';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1880,height:950},reducedMotion:'reduce'});
for(const [width,label] of [[1880,'desktop'],[390,'mobile']]){
 await page.setViewportSize({width,height:label==='desktop'?950:844});
 for(const route of ['/','/about','/contact','/menu','/team','/404',label==='desktop'?'/menu/berry-bliss':'/menu/blueberry-muffin']){
  await page.goto('http://127.0.0.1:5173'+route,{waitUntil:'networkidle'});
  await page.evaluate(async()=>{document.querySelectorAll("img").forEach(i=>i.loading="eager");await document.fonts.ready;await Promise.all([...document.images].filter(i=>i.getBoundingClientRect().top<innerHeight).map(i=>i.decode().catch(()=>{})));});
  await page.screenshot({path:`docs/${route.slice(1).replaceAll('/','-')||'home'}-${label}.png`});
 }
}
await page.setViewportSize({width:1880,height:950});
await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('http://127.0.0.1:5173');
await page.evaluate(()=>{const el=document.querySelector('.why-statement');scrollBy(0,el.getBoundingClientRect().top-400)});await page.waitForTimeout(300);
await page.screenshot({path:'research/video/motion-why.png'});
console.log('Scroll fill:',await page.locator('.why-statement').evaluate(el=>el.style.getPropertyValue('--word-fill')));
await browser.close();
