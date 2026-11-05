import { chromium } from '@playwright/test';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1600,height:1000},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const path of ['/','/menu?category=pastries','/menu/strawberry-bliss','/contact','/unknown']){
 const response=await page.goto('http://127.0.0.1:4173'+path,{waitUntil:'networkidle'});
 console.log(response.status(),path,await page.locator('h1').innerText());
}
await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});await page.screenshot({path:'docs/home-desktop.png'});
await page.setViewportSize({width:390,height:844});await page.screenshot({path:'docs/home-mobile.png'});
console.log('Production browser errors:',JSON.stringify(errors));await browser.close();
if(errors.length)process.exitCode=1;
