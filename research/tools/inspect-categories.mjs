import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1600,height:1000}});
const result={};
for(const category of ['cakes','pastries']){
 await page.goto(`https://baristi.framer.website/menu?category=${category}`,{waitUntil:'domcontentloaded'});await page.waitForTimeout(1800);
 result[category]=await page.locator('h6').allTextContents();
 console.log(category,result[category]);
}
await fs.writeFile('research/categories.json',JSON.stringify(result,null,2));await browser.close();
