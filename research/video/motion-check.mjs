import {chromium} from '@playwright/test';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1880,height:950},reducedMotion:'no-preference'});
await page.goto('http://127.0.0.1:5173',{waitUntil:'networkidle'});
await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));await document.fonts.ready;document.documentElement.style.scrollBehavior='auto';});
for (const [selector,offset] of [['.why-statement',100],['.testimonials',70],['.cta-art',100]]){
 await page.evaluate(({selector,offset})=>{scrollTo({top:scrollY+document.querySelector(selector).getBoundingClientRect().top-offset,behavior:'instant'})},{selector,offset});
 await page.waitForTimeout(1200);
 console.log(selector,await page.evaluate(selector=>({y:scrollY,rect:document.querySelector(selector).getBoundingClientRect().toJSON(),fill:document.querySelector('.why-statement').style.getPropertyValue('--word-fill')}),selector));
 await page.screenshot({path:`research/video/motion-${selector.slice(1)}.png`});
}
await browser.close();
