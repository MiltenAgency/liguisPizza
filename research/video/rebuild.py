from pathlib import Path
p=Path('baristi-local/src/main.jsx');s=p.read_text()
s=s.replace('import "./styles.css";','import "./styles.css";\nimport "./video-match.css";\nimport { usePageMotion } from "./motion.js";')
def replace_fn(name,nextname,code):
 global s
 start=s.index('function '+name+'(');end=s.index('function '+nextname+'(',start);s=s[:start]+code+'\n'+s[end:]
# Hover is the desktop trigger visible at 98 seconds. Click and keyboard still work.
s=s.replace('<div className="dropdown">','<div className="dropdown" onMouseEnter={() => { if (matchMedia("(hover: hover)").matches) setDropdown(true); }} onMouseLeave={() => setDropdown(false)}>')
s=s.replace('<Link href="/menu">Shop</Link>\n                <Link href="/menu/berry-bliss">Product details</Link>\n                <Link href="/team">Team</Link>\n                <Link href="/404">404</Link>','<div><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div><div><Link href="/menu" aria-label="Shop">Menu (CMS)</Link><Link href="/menu/berry-bliss">Menu details (CMS)</Link><Link href="/team">Team</Link><Link href="/404">404</Link></div>')
s=s.replace('<span>✧</span>\n          </div>','<Img name="tSvjTuoluT9BVQnmdhd5k6gdzIE.svg" className="flower-symbol"/>\n          </div>',1)
replace_fn('Carousel','Categories',r'''function Carousel({ items, label = "Products" }) {
  const track = useRef(null), hover = useRef(false), moving = useRef(false), timer = useRef(null);
  const [paused, setPaused] = useState(false);
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  const step = () => track.current ? track.current.firstElementChild.getBoundingClientRect().width + 20 : 0;
  const reposition = () => {
    const el = track.current;
    if (!el || moving.current) return;
    const group = step() * items.length;
    if (el.scrollLeft < group * .5) el.scrollLeft += group;
    else if (el.scrollLeft >= group * 2.5) el.scrollLeft -= group;
  };
  useEffect(() => {
    const el = track.current;
    const init = () => { el.scrollLeft = step() * items.length; };
    const observer = new ResizeObserver(init); observer.observe(el); init();
    const tick = setInterval(() => {
      if (!paused && !hover.current && !moving.current && !reduced() && el.getBoundingClientRect().bottom > 0 && el.getBoundingClientRect().top < innerHeight) {
        el.scrollLeft += .7; reposition();
      }
    }, 24);
    return () => {observer.disconnect();clearInterval(tick);clearTimeout(timer.current)};
  }, [items.length, paused]);
  const move = dir => {
    const el = track.current; moving.current = true;
    el.scrollBy({left:dir*step(),behavior:reduced()?'instant':'smooth'});
    clearTimeout(timer.current);timer.current=setTimeout(()=>{moving.current=false;reposition()},reduced()?10:550);
  };
  return <div className={`carousel carousel-${label.toLowerCase()}`} role="region" aria-label={label} onMouseEnter={()=>hover.current=true} onMouseLeave={()=>hover.current=false} onFocusCapture={()=>hover.current=true} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))hover.current=false}}>
    <div className="carousel-track" ref={track} onScroll={reposition} tabIndex="0" aria-label={`${label}, scroll horizontally`}>
      {[0,1,2].map(copy=><React.Fragment key={copy}>{items.map(p=><div className="carousel-slide" key={`${copy}-${p.slug}`} aria-hidden={copy!==1?true:undefined} inert={copy!==1?true:undefined}><ProductCard product={p}/></div>)}</React.Fragment>)}
    </div>
    <div className="carousel-controls"><button onClick={()=>move(-1)} aria-label={`Previous ${label.toLowerCase()}`}><Img name="UHalb3BSMuuvzoMp3PLOgwS3160.svg"/></button><button onClick={()=>move(1)} aria-label={`Next ${label.toLowerCase()}`}><Img name="gG4SNhNov1BMz1cAToZ3g23LMk.svg"/></button><button className="motion-pause" onClick={()=>setPaused(!paused)} aria-label={`${paused?'Resume':'Pause'} ${label.toLowerCase()} autoplay`} aria-pressed={paused}>{paused?'▶':'Ⅱ'}</button></div>
  </div>;
}''')
replace_fn('Categories','Crafted',r'''function Categories() {
  const [active,setActive]=useState(1),[paused,setPaused]=useState(false);
  const hover=useRef(false);
  const cats=[
    ['Drinks','Smooth and creamy consistency','jy3FNq5zGoTn0M22iCqumo5YQ.png','skoF31ljFDED1S7hVJ290BEsvw.png'],
    ['Pastries','Flaky, buttery, and baked fresh','dvFdYFMaopafwrtQXCkfO69SDc.png','XXZ1ITH16cICd9gBy0WDEPKGHU.jpg'],
    ['Cakes','Cake begins before the first bite','VO9fqqkD74OQVKmcZwGjl8Tcz0.png','hnXod6pc5i0ctK0BCEvUGjEgUa0.jpg']
  ];
  useEffect(()=>{const t=setInterval(()=>{if(!paused&&!hover.current&&!matchMedia('(prefers-reduced-motion: reduce)').matches)setActive(n=>(n+1)%3)},4200);return()=>clearInterval(t)},[paused]);
  return <section id="menu" className="section container category-section">
    <SectionTitle title={<>Choose your<br/>favorite</>} label="Our menu" href="/menu" center/>
    <div className="category-stage" role="region" aria-label="Bakery categories" onMouseEnter={()=>hover.current=true} onMouseLeave={()=>hover.current=false} onFocusCapture={()=>hover.current=true} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))hover.current=false}}>
      {cats.map(([name,description,img,thumb],i)=>{const pos=(i-active+3)%3;return <Link href={`/menu?category=${name.toLowerCase()}`} key={name} className={`category-card category-position-${pos}`} aria-label={`Explore ${name}`}><Img name={img} alt={name} className="category-image"/></Link>})}
      <div className="category-nav"><button onClick={()=>setActive(n=>(n+2)%3)} aria-label="Previous category"><Img name="UHalb3BSMuuvzoMp3PLOgwS3160.svg"/></button><Link href={`/menu?category=${cats[active][0].toLowerCase()}`} className="category-caption" key={cats[active][0]}><span className="card-plus">+</span><Img name={cats[active][3]} className="category-thumb"/><span><strong>{cats[active][0]}</strong><span>{cats[active][1]}</span></span></Link><button onClick={()=>setActive(n=>(n+1)%3)} aria-label="Next category"><Img name="gG4SNhNov1BMz1cAToZ3g23LMk.svg"/></button></div>
      <button className="motion-pause category-pause" aria-label={`${paused?'Resume':'Pause'} category rotation`} aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?'▶':'Ⅱ'}</button>
    </div>
  </section>;
}''')
# Add source decorative stickers to the scenes.
s=s.replace('<span className="doodle">✳</span>','<Img name="HIokzl1CsQyh7C9zHUuT1mqDk.svg" className="scene-sticker sticker-one"/><Img name="FC6QabqNKQElNxUu4T7QdNHMfPI.svg" className="scene-sticker sticker-two"/>')
s=s.replace('className="cutout float"\n        />\n      </div>\n    </section>','className="cutout float"\n        /><Img name="GRrWY4LSAoi4A56d1EKlJ32M.svg" className="scene-sticker sticker-three"/><Img name="MPrzrQGaarPFNKk05B5yVmoPU.svg" className="scene-sticker sticker-four"/>\n      </div><div className="crafted-ribbon"><Marquee color="yellow" tilt/></div>\n    </section>',1)
# Replace the statement only, preserve the two quality cards.
start=s.index('      <Label>Why choose us</Label>',s.index('function WhyUs'))
end=s.index('      <div className="quality-grid">',start)
s=s[:start]+'''      <div className="why-statement"><Label>Why choose us</Label><h2><span className="why-line"><span className="stat-sticker">98%<small>Love Every Bite</small></span> From buttery</span><span className="why-line">pastries to decadent</span><span className="why-last"><span className="why-line">cakes we make every</span><span className="why-line">bite count <span className="stat-sticker lime">12K+<small>Treats Baked</small><Img name="WOkOnZ3D16yFWaXluSNBe9kiUA.svg"/></span></span></span></h2><div className="why-badge"><Img name="WMCkAi0co2Fxqxh6KKAWXZ4VEZY.svg" className="spin"/><Img name="WOkOnZ3D16yFWaXluSNBe9kiUA.svg"/></div></div>
'''+s[end:]
s=s.replace('<div className="quality-support">','<div className="quality-support"><Img name="nghP8KbVnDVGxLpTslFzl81Q5Y4.png" className="striped-ticket"/>')
s=s.replace('<span>✧</span>\n            <p>','<Img name="SIx3ypypo4KOYzzeYkxlX1ue28.svg" className="support-flower"/>\n            <p>',1)
s=s.replace('''          <span className="small-stamp">
            Fresh
            <br />
            sips ✧
          </span>''','''          <div className="small-stamp"><Img name="xg42HVnbkObbX0AYyzTYQvaLUm8.svg" className="spin"/><Img name="kNBoB3qc61TjtW28xHnq7Iu8Vzw.svg"/></div><Img name="l57Z0w9ysb28rnhqOmFuyVuu5g.svg" className="scene-sticker sticker-three"/><Img name="Fvz7VjS9DUnl3YDzdCSSgYNIKyE.svg" className="scene-sticker sticker-four"/>''')
# only within Drinks, color should be orange
start=s.index('function Drinks');end=s.index('function Testimonials');part=s[start:end].replace('<Marquee color="yellow" />','<Marquee color="orange" />');s=s[:start]+part+s[end:]
s=s.replace('<span className="quote-mark">✧</span>','<span className="quote-mark"><Img name="jxva9ITJry1tRkh1IycsPo1MXPc.svg" className="spin"/><Img name="93nNh4NWnULUs5IwK7DfVBNcO6k.svg"/></span>')
s=s.replace('''          <span className="review-sticker">
            5.0
            <br />
            <small>Happy bites</small>
          </span>''','''          <span className="review-sticker"><Img name="tQbznCiHguudCsfxC9Pm3pypM9s.svg" className="spin"/><Img name="bDi4sAF0vjuF9jJztN4k6fkfvc.svg"/></span>''')
s=s.replace('''          <span className="customer-name">
            Emma Collins<small>Pastry Enthusiast</small>
          </span>''','''          <span className="customer-name"><span className="card-plus">+</span><Img name="u74EA4gWWtoHgUH9fND7iKUNVo.png"/>Emma Collins<small>Pastry Enthusiast</small></span>''')
s=s.replace('<span>✧ Baristi</span>\n            <span>↗</span>','<span><Img name="93nNh4NWnULUs5IwK7DfVBNcO6k.svg"/> Baristi</span><span className="gallery-heart">♥</span>')
replace_fn('SweetCTA','Footer',r'''function SupportBadge(){return <span className="support-badge"><Img name="mfE2HewgyKKTOC58k2y1Sbc4Gw.svg" className="spin"/><Img name="dTQnRD8IV9ZGns2NL6zl13HyWCI.svg"/></span>}
function SweetCTA() {
  return <section className="sweet-cta"><Marquee text="Happy bites" color="lime"/>
    <div className="cta-blob"><div className="container"><SectionTitle title={<>Your next sweet<br/>favorite is waiting</>} label="Let’s talk" center/>
      <div className="cta-art"><Img name={art.next} alt="A sweet bakery moment" className="cta-portrait"/>
        <Link href="/contact" className="cta-mini treats"><span className="card-plus">+</span><Img name="hAO54xht0sNHptFufBrdS9dvxs.png" alt="Chocolate cake"/><span><strong>Treats</strong>Sweet Moments</span></Link>
        <Link href="/contact" className="cta-mini taste"><span className="card-plus">+</span><Img name="aum9ywU84b1DqoMWe7hDLaEeaA.png" alt="Chocolate frosting"/><span><strong>Taste</strong>Rich Flavors</span></Link>
        <SupportBadge/><div className="cta-flower"><Img name="jxva9ITJry1tRkh1IycsPo1MXPc.svg" className="spin"/><Img name="93nNh4NWnULUs5IwK7DfVBNcO6k.svg"/></div>
        <div className="cta-stamp">A delicious<br/>favorite you’ll<br/>want again</div>
        <Link href="/contact" className="cta-contact" aria-label="Contact Baristi"><Img name="8aiV9r3tqCDRPA5nNOAe9Qwo0rI.svg" className="spin"/><Arrow/></Link>
      </div><div className="cta-copy"><p>Freshly baked, beautifully made, and ready to make your day a little sweeter. Pick your favorite treat and let us bake something special for you.</p></div>
    </div></div><div className="baked-ticker" aria-label="Baked with love"><div aria-hidden="true">{[0,1,2,3].map(i=><span key={i}>Baked with love&nbsp;</span>)}</div></div>
  </section>;
}
function TemplateLinks(){return <aside className="template-links" aria-label="Original template links"><Img name="gK0S9F3CepOn3QRt7pdkVJK3Bn8.png"/><a className="template-free" href="https://framer.link/GgOpQh9" target="_blank" rel="noreferrer">Get It For Free</a><a className="template-more" href="https://reddevs.com/" target="_blank" rel="noreferrer">See More Templates</a><a className="template-custom" href="https://reddevs.com/hire-experts" target="_blank" rel="noreferrer">Customization Service</a><a className="framer-credit" href="https://www.framer.com" target="_blank" rel="noreferrer"><svg viewBox="0 0 16 24" aria-hidden="true"><path fill="currentColor" d="M0 0h16v8H8l8 8H8v8L0 16V8h8L0 0Z"/></svg>Made in Framer</a></aside>}
''')
s=s.replace('''      <section className="section container">
        <SectionTitle title="Our goodies"''','''      <section className="section container goodies-section">
        <SectionTitle title="Our goodies"''',1)
s=s.replace('''      <Crafted />
      <Marquee color="yellow" />''','''      <Crafted />''',1)
s=s.replace('''          <h1>About us</h1>
          <Gallery about />
        </div>
        <Marquee tilt />''','''          <h1>About us</h1>
          <div className="about-ribbon"><Marquee tilt/></div><Gallery about />
          <div className="about-flower"><Img name={art.flower} className="spin"/><Img name="tSvjTuoluT9BVQnmdhd5k6gdzIE.svg"/></div>
        </div><Link href="/about#stats" className="scroll-cue" aria-label="Scroll to bakery stats"><Arrow direction="down"/></Link>''')
s=s.replace('<section className="section container about-stats">','<section id="stats" className="section container about-stats">')
s=s.replace('''      <section className="section container">
        <SectionTitle title="Meet the crew"''','''      <section className="section container crew-section">
        <SectionTitle title="Meet the crew"''',1)
s=s.replace('''      <Marquee color="yellow" />
      <section className="section container story">''','''      <section className="section container story"><div className="story-ribbon"><Marquee color="yellow" tilt/></div>''',1)
s=s.replace('useState(8);','useState(9);').replace('setLimit(8)','setLimit(9)').replace('setLimit((n) => n + 8)','setLimit((n) => n + 9)')
s=s.replace('<Img name={art.flower} className="contact-flower spin" />','<div className="contact-flower"><Img name="SIx3ypypo4KOYzzeYkxlX1ue28.svg" className="spin"/><Img name="tSvjTuoluT9BVQnmdhd5k6gdzIE.svg"/></div>')
s=s.replace('''          <span className="review-sticker">
            Sweet
            <br />
            moments
          </span>''','''          <SupportBadge/>''')
s=s.replace('''            <h3>
              London <Arrow />
            </h3>
            <span>Explore the area</span>''','''            <span className="card-plus">+</span><Img name="kujf30L5pVwTIfCeJyE40iQzh4.png" alt="Bakery in London"/><h3>London</h3>''')
s=s.replace('''      <h1>
        Oops, this page is
        <br />
        fresh out of reach.
      </h1>''','''      <h1>Oops, this page is fresh out of reach.</h1>''')
s=s.replace('''      <Img
        name="Oo2pO4eja4YQCG0pTQiw1Dzxw.png"''','''      <Img name="xFKsPZ0FDRXSSCZePMHalRQppDQ.svg" className="not-found-flower spin"/><Img
        name="Oo2pO4eja4YQCG0pTQiw1Dzxw.png"''')
s=s.replace('''      <Footer />
    </Navigation.Provider>''','''      <Footer /><TemplateLinks/>
    </Navigation.Provider>''')
s=s.replace('''  const main = useRef(null);''','''  const main = useRef(null);
  usePageMotion(location.pathname);''')
# product family for related cards should match recording's pastries group
s=s.replace('''product.category === "drinks"
            ? p.category === "drinks"
            : p.category !== "drinks"''','''product.categories.includes("drinks") ? p.categories.includes("drinks") : p.categories.some(c=>product.categories.includes(c))''')
p.write_text(s)
