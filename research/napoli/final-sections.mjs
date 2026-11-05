import {chromium} from '@playwright/test';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1880,height:950},reducedMotion:'reduce'});
for(const width of [1880,390]){
 await page.setViewportSize({width,height:width===1880?950:844});
 await page.goto('http://127.0.0.1:5173',{waitUntil:'networkidle'});
 await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));await document.fonts.ready;});
 for(const [selector,name] of [['.burgers-intro','burgers'],['footer','footer']]){
  await page.locator(selector).scrollIntoViewIfNeeded(); await page.screenshot({path:`docs/${name}-${width===1880?'desktop':'mobile'}.png`});
 }
 await page.goto('http://127.0.0.1:5173/menu/napoli-burger',{waitUntil:'networkidle'});
 await page.screenshot({path:`docs/burger-product-${width===1880?'desktop':'mobile'}.png`});
}
console.log(await page.evaluate(()=>({headingFont:getComputedStyle(document.querySelector('h1')).fontFamily,bodyFont:getComputedStyle(document.body).fontFamily,background:getComputedStyle(document.body).backgroundColor,footerWidth:document.querySelector('footer').getBoundingClientRect().width,viewport:innerWidth})));
await browser.close();
