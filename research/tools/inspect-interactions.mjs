import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1600,height:1000}});
await page.goto('https://baristi.framer.website/',{waitUntil:'domcontentloaded'});await page.waitForTimeout(2000);
await page.getByText('Essentials',{exact:true}).first().click();await page.waitForTimeout(500);
console.log('NAV', (await page.locator('body').innerText()).slice(0,450));await page.screenshot({path:'research/navigation-open.png'});
await page.mouse.click(20,300);
for(let y=900;y<8000;y+=900){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(450)}
await page.screenshot({path:'research/desktop-full.png',fullPage:true});
await page.goto('https://baristi.framer.website/menu?category=drinks',{waitUntil:'domcontentloaded'});await page.waitForTimeout(1800);
console.log('FILTER', (await page.locator('body').innerText()).slice(0,1500));
await page.goto('https://baristi.framer.website/about',{waitUntil:'domcontentloaded'});await page.waitForTimeout(1000);
const question=page.getByText('How can I place an order?',{exact:true}).first();await question.scrollIntoViewIfNeeded();await page.waitForTimeout(700);await page.screenshot({path:'research/faq-before.png'});await question.click();await page.waitForTimeout(500);await page.screenshot({path:'research/faq-after.png'});
await page.setViewportSize({width:390,height:844});await page.goto('https://baristi.framer.website/',{waitUntil:'domcontentloaded'});await page.waitForTimeout(1800);await page.screenshot({path:'research/mobile-top.png'});
await fs.writeFile('research/mobile-header.html',await page.locator('header').first().innerHTML());
await browser.close();
