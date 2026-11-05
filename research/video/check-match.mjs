import {chromium} from '@playwright/test';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1880,height:950},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const route of ['/','/about','/contact','/menu','/404']){
 await page.goto('http://127.0.0.1:5173'+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 const n=route.slice(1)||'home';await page.screenshot({path:`research/video/local-${n}-top.png`});
 const selectors=route==='/'?['.category-section','.goodies-section','.crafted','.why-statement','.drinks-intro','.testimonials','.cta-blob','footer']:route==='/about'?['.about-stats','.crew-section','.story','.faq']:route==='/contact'?['.contact-form-section','.location-section']:route==='/menu'?['.shop-section']:[];
 for(const selector of selectors){const el=page.locator(selector).first();await el.scrollIntoViewIfNeeded();await page.evaluate(s=>{const r=document.querySelector(s).getBoundingClientRect();window.scrollBy(0,r.top-70)},selector);await page.waitForTimeout(100);await page.screenshot({path:`research/video/local-${n}-${selector.replaceAll('.','')}.png`})}
 console.log(n, await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,hero:document.querySelector('h1')?.innerText})));
}
for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:844});for(const route of ['/','/about','/contact','/menu','/404']){
 await page.goto('http://127.0.0.1:5173'+route,{waitUntil:'networkidle'});
 if(width===390)await page.screenshot({path:`research/video/mobile-${route.slice(1)||'home'}.png`});
 const w=await page.evaluate(()=>document.documentElement.scrollWidth);console.log(width,route,w===width?'fits':`OVERFLOW ${w}`);
}}
console.log('Errors:',errors);await browser.close();if(errors.length)process.exitCode=1;
