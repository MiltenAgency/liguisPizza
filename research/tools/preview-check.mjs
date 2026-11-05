import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1600,height:1000},reducedMotion:'reduce'});
page.on('pageerror',e=>console.log('PAGE ERROR',e.message));
const external=[];page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:5173'))external.push(r.url())});
for(const path of ['/','/menu','/contact','/about','/team','/menu/berry-bliss','/404']){
 await page.goto('http://127.0.0.1:5173'+path,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 const name=path.slice(1).replaceAll('/','-')||'home';
 await page.screenshot({path:'docs/'+name+'-desktop.png'});
 console.log(path,await page.evaluate(()=>({title:document.title,scroll:document.documentElement.scrollWidth,width:innerWidth,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)})));
}
for(const width of [390,768,320]){
 await page.setViewportSize({width,height:844});
 for(const path of ['/','/menu','/contact','/about','/team','/menu/blueberry-muffin','/404']){
 await page.goto('http://127.0.0.1:5173'+path,{waitUntil:'networkidle'});
 const overflow=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth,culprits:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>innerWidth+2&&getComputedStyle(e).position!=='absolute'}).slice(0,8).map(e=>e.className)}));
 if(width===390)await page.screenshot({path:'docs/'+(path.slice(1).replaceAll('/','-')||'home')+'-mobile.png'});
 console.log(width,path,JSON.stringify(overflow));
 }
}
console.log('External requests:',external);
await browser.close();
