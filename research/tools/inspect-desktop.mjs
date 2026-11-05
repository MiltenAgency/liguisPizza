import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1600,height:1000}});
page.on('requestfailed',r=>console.log('FAILED',r.url(),r.failure()?.errorText));
for(const route of ['','about','contact','menu','menu/berry-bliss']){
 await page.goto('https://baristi.framer.website/'+route,{waitUntil:'domcontentloaded'});await page.waitForTimeout(5000);
 await page.screenshot({path:'research/desktop-'+(route.replaceAll('/','-')||'home')+'.png',fullPage:false});
 if(!route){
 console.log('dimensions',await page.evaluate(()=>({width:innerWidth,dpr:devicePixelRatio,fonts:document.fonts.status,images:[...document.images].slice(0,8).map(i=>({src:i.src,loaded:i.complete,natural:i.naturalWidth}))})));
 await page.getByText('Essentials',{exact:true}).first().hover({timeout:4000}).catch(()=>{});await page.waitForTimeout(500);
 await fs.writeFile('research/desktop-nav.txt',await page.locator('body').innerText());
 await page.screenshot({path:'research/desktop-nav.png'});
 }
}
await browser.close();
