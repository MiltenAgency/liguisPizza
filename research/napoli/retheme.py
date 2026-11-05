from pathlib import Path
import json,re
root=Path.cwd(); assets=root/'public/assets/pizza'
# An original vector mascot, kept crisp at navigation and favicon sizes.
mascot='''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><title>Baristi Napoli pizza chef</title><circle cx="80" cy="80" r="76" fill="#dff2fc" stroke="#1379b1" stroke-width="4"/><path d="M17 107 48 75 65 88 87 66 141 112" fill="#1379b1" opacity=".18"/><path d="M30 153v-17c0-24 23-39 50-39s50 15 50 39v17" fill="#1379b1" stroke="#252a29" stroke-width="4"/><path d="m58 110 22 22 22-22" fill="white"/><path d="m73 126 7 6 7-6 5 27H68Z" fill="#dc352e"/><ellipse cx="80" cy="81" rx="39" ry="43" fill="#f4bd89" stroke="#252a29" stroke-width="4"/><ellipse cx="40" cy="82" rx="8" ry="12" fill="#f4bd89" stroke="#252a29" stroke-width="3"/><ellipse cx="120" cy="82" rx="8" ry="12" fill="#f4bd89" stroke="#252a29" stroke-width="3"/><path d="M42 65c-8-31 8-48 37-48 32 0 47 18 41 46" fill="#dc352e" stroke="#252a29" stroke-width="4"/><path d="M38 62c17-14 64-15 86 0l-5 13c-24-11-54-11-77 0Z" fill="#dc352e" stroke="#252a29" stroke-width="4"/><circle cx="81" cy="39" r="15" fill="white"/><path d="m74 32 17 4-13 15Z" fill="#efc454" stroke="#dc352e" stroke-width="2"/><circle cx="80" cy="38" r="2" fill="#dc352e"/><path d="m58 77 10-2m25 0 10 2" fill="none" stroke="#352721" stroke-width="5" stroke-linecap="round"/><ellipse cx="65" cy="83" rx="3" ry="5" fill="#252a29"/><ellipse cx="97" cy="83" rx="3" ry="5" fill="#252a29"/><path d="M80 97c-14-15-23-6-28-9 0 16 15 25 28 14 13 11 28 2 28-14-5 3-14-6-28 9" fill="#352721"/><ellipse cx="80" cy="91" rx="12" ry="9" fill="#f8c99b"/><path d="M71 112q9 8 18 0" fill="none" stroke="#97492f" stroke-width="3" stroke-linecap="round"/><path d="M33 151h31" stroke="#178057" stroke-width="9"/><path d="M64 151h32" stroke="white" stroke-width="9"/><path d="M96 151h31" stroke="#dc352e" stroke-width="9"/></svg>'''
(assets/'napoli-chef.svg').write_text(mascot); (assets/'favicon.svg').write_text(mascot)
(assets/'napoli-roundel.svg').write_text('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="100" cy="100" r="94" fill="#dff2fc" stroke="#1379b1" stroke-width="5"/><circle cx="100" cy="100" r="82" fill="none" stroke="#1379b1" stroke-width="2" stroke-dasharray="3 9"/><path d="M40 130 79 80l21 20 20-30 43 60Z" fill="#1379b1"/><path d="m68 94 11-14 21 20 20-30 15 21-15-6-19 31-23-21Z" fill="white"/><path d="M42 145h39" stroke="#178057" stroke-width="8"/><path d="M81 145h39" stroke="white" stroke-width="8"/><path d="M120 145h39" stroke="#dc352e" stroke-width="8"/><circle cx="143" cy="56" r="13" fill="#efc454"/></svg>''')
(assets/'napoli-ticket.svg').write_text('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 200"><rect x="5" y="5" width="330" height="190" rx="95" fill="#efc454" stroke="#252a29" stroke-width="4"/><rect x="16" y="16" width="308" height="168" rx="84" fill="none" stroke="#252a29" stroke-width="2"/></svg>''')
for name,color in [('shape-peach.svg','#fbe4df'),('shape-sage.svg','#e4f0e7'),('shape-gold.svg','#dff2fc')]:
 (assets/name).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 700"><path d="M20 675V245C20-60 480-60 480 245v430Z" fill="{color}"/><path d="M40 655V245C40-30 460-30 460 245v410Z" fill="none" stroke="#1379b1" stroke-width="3"/></svg>')
# Replace beverage categories and imagery throughout the live frontend.
for file in [root/'src/main.jsx',root/'src/styles.css',root/'src/video-match.css',root/'tests/site.spec.js',root/'research/pizza/final-captures.mjs']:
 s=file.read_text().replace('Drinks','Burgers').replace('drinks','burgers')
 file.write_text(s)
p=root/'src/main.jsx'; s=p.read_text().replace('import "./pizza-theme.css";','import "./pizza-theme.css";\nimport "./napoli-fonts.css";\nimport "./napoli-theme.css";')
s=s.replace('logo: "0PCvOlbXatqKbliMUNgThiw10A.svg"','logo: "pizza/napoli-chef.svg"').replace('stamp: "nfpFlIiR7WYwfqwK5z3IHJBb1M4.svg"','stamp: "pizza/napoli-ticket.svg"').replace('flower: "xvt7afS4lPbYLEExJgH15VMpm4k.svg"','flower: "pizza/napoli-roundel.svg"').replace('drink: "EfirZvwiebQMQaspOALSfafz7Q.png"','burger: "pizza/classic-burger.png"').replace('art.drink','art.burger')
s=s.replace('"221KXMpCyb8HfQF49Z3d7Uqg.png"','"pizza/classic-burger.png"').replace('"6zka6oDzunWrdvD5xFmQkiDf0.png"','"pizza/chicken-burger.png"').replace('"skoF31ljFDED1S7hVJ290BEsvw.png"','"pizza/classic-burger.png"')
s=s.replace('Cold sips for hot slices','Big bites, Napoli spirit').replace('Sips made to','Big bites,').replace('delight\n','big flavor\n').replace('Iced coffees, fruity coolers, and refreshing citrus sips. Pick the\n            perfect partner for your favorite pizza.','Golden buns, juicy patties, and crispy chicken. Discover our\n            burgers, stacked with Italian flair and made for big appetites.').replace('Refreshing iced coffee','Classic cheeseburger with lettuce and tomato').replace('cold burgers','stacked burgers').replace('favorite slice','favorite bite')
s=re.sub(r'<span className="brand-mark">\s*<Img name=\{art.logo\} alt="Baristi"(?: eager)? />\s*<small>Pizza kitchen</small>\s*</span>','<BrandLogo />',s)
pos=s.index('function Arrow(')
s=s[:pos]+'''function BrandLogo() {
  return <span className="brand-mark">
    <Img name={art.logo} alt="" eager />
    <span className="brand-wordmark"><strong>BARISTI</strong><small>NAPOLI · PIZZA & BURGERS</small></span>
  </span>;
}
'''+s[pos:]
s=s.replace('<Img name="kNBoB3qc61TjtW28xHnq7Iu8Vzw.svg" />','<Img name="pizza/hot.svg" />')
p.write_text(s)
products=json.loads((root/'src/products.json').read_text())
burgers=iter([
 ('classic-burger','Classic Burger','A juicy grilled beef patty, melted cheddar, crisp lettuce, tomato, pickles, and house sauce in a toasted sesame bun.','Beef, cheddar & house sauce','classic-burger.png',11.5),
 ('crispy-chicken','Crispy Chicken','Crunchy golden chicken, crisp lettuce, tomato, and creamy house sauce in a soft toasted brioche bun.','Crispy chicken & house sauce','chicken-burger.png',12),
 ('napoli-burger','Napoli Burger','Our classic cheeseburger with a Naples-inspired basil sauce, juicy beef, cheddar, lettuce, and tomato.','Beef, cheddar & basil sauce','classic-burger.png',13),
 ('spicy-chicken','Spicy Chicken','Golden crispy chicken, fresh lettuce, tomato, and a lively chili sauce tucked into a toasted brioche bun.','Crispy chicken & chili sauce','chicken-burger.png',12.5),
 ('house-cheeseburger','House Cheeseburger','Grilled beef, melting cheddar, fresh vegetables, pickles, and our extra-cheesy house sauce in a sesame bun.','Beef, cheddar & cheese sauce','classic-burger.png',12.5),
])
colors=['#dff2fc','#fbe4df','#e4f0e7','#fff0c7']
for i,p in enumerate(products):
 if p['category']=='drinks':
  slug,name,desc,ingredient,img,price=next(burgers)
  p.update(slug=slug,name=name,description=desc,ingredient=ingredient,image='pizza/'+img,price=price,minutes=15,category='burgers',categories=['burgers'])
  p.pop('legacySlug',None)
  p['article'][1]['text']=desc
  p['article'][2]['text']='MAKE IT A BURGER NIGHT'
 p['color']=colors[i%4]
 for part in p['article']:
  part['text']=part['text'].replace('a fresh pizza, a side to share, and a cold drink','a fresh pizza or burger and a side to share')
(root/'src/products.json').write_text(json.dumps(products,indent=2)+'\n')
f=root/'src/faqs.json'; f.write_text(f.read_text().replace('pizza, side, or drink','pizza, burger, or side'))
f=root/'index.html'; f.write_text(f.read_text().replace('#fff3df','#ffffff').replace('cold drinks','stacked burgers'))
