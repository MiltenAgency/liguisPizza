import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1880,height:950}});
for(const route of ['','about','contact','menu','404']){
 await page.goto('https://baristi.framer.website/'+route,{waitUntil:'domcontentloaded'});await page.waitForTimeout(1800);
 const result=await page.evaluate(()=>{
  const info=el=>{let r=el.getBoundingClientRect(),s=getComputedStyle(el);return{name:el.getAttribute('data-framer-name'),tag:el.tagName,x:r.x,y:r.y,w:r.width,h:r.height,bg:s.backgroundColor,padding:s.padding,gap:s.gap,transform:s.transform,position:s.position,font:s.fontSize,line:s.lineHeight,images:[...el.querySelectorAll('img')].slice(0,4).map(i=>i.src.split('?')[0].split('/').pop()),text:el.innerText?.slice(0,100)}};
  return {sections:[...document.querySelectorAll('[data-framer-name]')].filter(e=>/Section|Footer|Hero|Cards Wrapper|Slide Wrapper|Fact Card|Fact|Shape|Menu Card|Title Wrapper/.test(e.getAttribute('data-framer-name'))&&e.getBoundingClientRect().width>0).map(info),headings:[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(e=>e.getBoundingClientRect().width>0).map(info)};
 });await fs.writeFile('research/video/live-'+(route||'home')+'.json',JSON.stringify(result,null,2));
 if(!route){await page.getByText('Essentials',{exact:true}).first().hover();await page.waitForTimeout(700);await page.screenshot({path:'research/video/live-navigation.png'});}
 console.log(route||'home',result.sections.filter(x=>/Section|Footer Content/.test(x.name)).map(x=>({name:x.name,y:Math.round(x.y),w:Math.round(x.w),h:Math.round(x.h),bg:x.bg})))
}
await browser.close();
