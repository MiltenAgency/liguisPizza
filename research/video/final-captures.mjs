import {chromium} from '@playwright/test';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1880,height:950},reducedMotion:'reduce'});
for(const [route,sections] of [['/', ['.hero-home','.why-statement','.cta-art','footer']],['/about',['.story']],['/contact',['.contact-form-section']]]) {
 await page.goto('http://127.0.0.1:5173'+route);
 await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager'); await Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))); await document.fonts.ready;});
 for(const s of sections) {
  if(s==='.hero-home')await page.evaluate(()=>scrollTo(0,0)); else await page.evaluate(s=>{scrollBy(0,document.querySelector(s).getBoundingClientRect().top-100)},s);
  await page.screenshot({path:`research/video/final-${s.slice(1)||'footer'}.png`});
 }
 console.log(route,await page.locator('.cta-portrait').evaluateAll(els=>els.map(e=>({loaded:e.naturalWidth,rect:e.getBoundingClientRect().toJSON(),opacity:getComputedStyle(e).opacity}))));
}
await browser.close();
