import {chromium} from '@playwright/test';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:768,height:950},reducedMotion:'reduce'});
await page.goto('http://127.0.0.1:5173',{waitUntil:'networkidle'});
console.log(await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.right>innerWidth+1||r.left< -1}).map(e=>({tag:e.tagName,cls:e.className,left:Math.round(e.getBoundingClientRect().left),right:Math.round(e.getBoundingClientRect().right)})).filter(e=>!/marquee|carousel|baked-ticker|category|hero|scene|flower|sticker|shape/.test(e.cls))})));
await page.setViewportSize({width:1880,height:950});
for(const [selector,name] of [['.burgers-intro','burgers'],['footer','footer']]){
 await page.locator(selector).scrollIntoViewIfNeeded(); await page.waitForTimeout(300); await page.screenshot({path:`research/napoli/${name}.png`});
}
await page.setViewportSize({width:390,height:844}); await page.locator('footer').scrollIntoViewIfNeeded(); await page.screenshot({path:'research/napoli/footer-mobile.png'});
await browser.close();
