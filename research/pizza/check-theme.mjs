import { chromium } from '@playwright/test';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1880,height:950},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const route of ['/','/menu','/about','/contact','/team','/menu/margherita','/404']){
 await page.goto('http://127.0.0.1:5173'+route,{waitUntil:'networkidle'});
 await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager'); await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));await document.fonts.ready;});
 console.log(route,await page.title(), await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),promos:!!document.querySelector('.template-links')})));
 await page.screenshot({path:`research/pizza/${route.slice(1).replaceAll('/','-')||'home'}-desktop.png`});
 if(route==='/')for(const selector of ['.category-section','.goodies-section','.why-statement','.cta-art','footer']){
  await page.evaluate(selector=>scrollBy({top:document.querySelector(selector).getBoundingClientRect().top-70,behavior:'instant'}),selector);
  await page.screenshot({path:`research/pizza/${selector.replace('.','')}.png`});
 }
}
await page.setViewportSize({width:390,height:844});
for(const route of ['/','/menu','/contact','/404']){await page.goto('http://127.0.0.1:5173'+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`research/pizza/${route.slice(1)||'home'}-mobile.png`});}
console.log('Browser errors:',errors);await browser.close();if(errors.length)process.exitCode=1;
