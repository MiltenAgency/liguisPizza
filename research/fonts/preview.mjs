import {chromium} from '@playwright/test';
const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1400,height:1000}});
await p.goto('http://127.0.0.1:5173');
await p.setContent(`<style>@font-face{font-family:Groovy;src:url('/assets/fonts/groovy-waves-demo.otf')}@font-face{font-family:Konja;src:url('/assets/fonts/konja.otf')}body{padding:30px;color:#176b4c}section{margin:10px 0 40px}h2{font:18px Arial;color:#333}p{margin:8px 0} .logo{font-size:80px}.heading{font-size:72px}.body{font-size:24px}</style>`+['Groovy','Konja'].map(font=>`<section style="font-family:${font}"><h2>${font}</h2><p class="logo">LUIGI'S PIZZA — Luigi’s Pizza</p><p class="heading">GOOD TIMES, GREAT PIZZA</p><p class="body">Golden buns, juicy patties, and crispy chicken. $12.50 · 98% · Order now</p></section>`).join(''));
await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:'research/fonts/comparison.png'});await b.close();
