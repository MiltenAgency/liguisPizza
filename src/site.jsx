"use client";

import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Agentation } from "agentation";
import products from "./products.json";
import faqs from "./faqs.json";
import { usePageMotion } from "./motion.js";

const asset = (name) =>
  name?.endsWith(".svg") && !name.startsWith("pizza/")
    ? `/assets/pizza/decor/${name}`
    : `/assets/${name}`;
const art = {
  logo: "pizza/luigis-pizza-logo-transparent.png",
  hero: "pizza/pepperoni.png",
  stamp: "pizza/napoli-ticket.svg",
  flower: "pizza/napoli-roundel.svg",
  star: "miwxAFnUmnrwHC7cO5ZRJlGlVM.svg",
  label: "ol7FlU9sBWrOdmzw1ylUg5kPL6M.svg",
  margherita: "pizza/margherita.png",
  orangeShape: "pizza/shape-peach.svg",
  burger: "pizza/classic-burger.png",
  yellowShape: "pizza/shape-gold.svg",
  shop: "pizza/garden.png",
  contact: "pizza/margherita.png",
  pinkShape: "pizza/shape-sage.svg",
  customer: "pizza/pizza-chef.jpg",
  next: "pizza/pizza-table.jpg",
};
const categories = [
  ["all", "All", "pizza/pepperoni.png"],
  ["burgers", "Burgers", "pizza/classic-burger.png"],
  ["pizzas", "Pizzas", "pizza/margherita.png"],
  ["sides", "Sides", "pizza/garlic-bread.png"],
];
function Img({ name, alt = "", className = "", eager = false, ...props }) {
  return (
    <img
      src={asset(name)}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...props}
    />
  );
}
function BrandLogo() {
  return (
    <span className="brand-mark">
      <Img name={art.logo} alt="Luigi’s Pizza" width={1154} height={1363} eager />
    </span>
  );
}
function Arrow({ direction = "right" }) {
  return (
    <svg
      className={`arrow ${direction}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 12h15M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Button({ href, children, className = "", ...props }) {
  const inside = (
    <>
      <span className="button-label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      <Arrow />
    </>
  );
  return href ? (
    <Link href={href} className={`button ${className}`} {...props}>
      {inside}
    </Link>
  ) : (
    <button className={`button ${className}`} {...props}>
      {inside}
    </button>
  );
}
function Label({ children }) {
  return (
    <span
      className="eyebrow"
      style={{ backgroundImage: `url(${asset(art.label)})` }}
    >
      {children}
    </span>
  );
}
function Header({ cream = false }) {
  const [open, setOpen] = useState(false),
    [dropdown, setDropdown] = useState(false);
  const ref = useRef(null),
    trigger = useRef(null),
    essentials = useRef(null);
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
    setDropdown(false);
  }, [pathname]);
  useEffect(() => {
    const dismiss = (e) => {
      if (!ref.current?.contains(e.target)) {
        setDropdown(false);
        setOpen(false);
      }
    };
    const escape = (e) => {
      if (e.key === "Escape") {
        setDropdown(false);
        setOpen(false);
        (trigger.current?.offsetParent
          ? trigger.current
          : essentials.current
        )?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <header className={`header ${cream ? "cream" : ""}`} ref={ref}>
      <div className="header-inner">
        <Link href="/" className="logo" aria-label="Luigi’s Pizza home">
          <BrandLogo />
        </Link>
        <button
          className="menu-toggle"
          ref={trigger}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={open ? "nav open" : "nav"}
        >
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Home
          </Link>
          <Link
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
          >
            About
          </Link>
          <div
            className="dropdown"
            onMouseEnter={() => {
              if (matchMedia("(hover: hover)").matches) setDropdown(true);
            }}
            onMouseLeave={() => setDropdown(false)}
          >
            <button
              ref={essentials}
              className="dropdown-trigger"
              aria-expanded={dropdown}
              aria-controls="essentials-links"
              onClick={(event) =>
                setDropdown(event.detail === 0 ? !dropdown : true)
              }
            >
              Essentials{" "}
              <span className={dropdown ? "chevron up" : "chevron"} />
            </button>
            {dropdown && (
              <div className="dropdown-panel" id="essentials-links">
                <div>
                  <Link href="/">Home</Link>
                  <Link href="/about">About</Link>
                  <Link href="/contact">Contact</Link>
                </div>
                <div>
                  <Link href="/menu" aria-label="Shop">
                    Pizza menu
                  </Link>
                  <Link href="/menu/margherita">Pizza details</Link>
                  <Link href="/404">404</Link>
                </div>
              </div>
            )}
          </div>
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
          >
            Contact
          </Link>
          <Button href="/menu" className="mobile-order">
            Order now
          </Button>
        </nav>
        <Button href="/menu" className="header-order">
          Order now
        </Button>
      </div>
    </header>
  );
}
function Marquee({ text = "Hot & fresh", color = "pink", tilt = false }) {
  return (
    <div
      className={`marquee ${color} ${tilt ? "tilted" : ""}`}
      aria-label={text}
    >
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((group) => (
          <div className="marquee-group" key={group}>
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>
                {text}
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M24 2C20 17 17 20 2 24c15 4 18 7 22 22 4-15 7-18 22-22C31 20 28 17 24 2Z"
                  />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
function Wave() {
  return (
    <svg
      className="wave"
      viewBox="0 0 1600 90"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 8C160 110 320 65 510 35C560 30 585 108 660 65C745 25 835 25 930 65C1000 110 1040 32 1090 35C1280 60 1450 115 1600 8V90H0Z"
        fill="currentColor"
      />
    </svg>
  );
}
function Hero({ type = "home" }) {
  const config = {
    home: ["Good times", "great pizza", art.hero, "Hot & fresh", "pink"],
    menu: [
      "Find your",
      "favorite bite",
      art.shop,
      "Slice of happiness",
      "orange",
    ],
  };
  const [first, second, img, text, color] = config[type];
  return (
    <section className={`hero hero-${type}`}>
      {type === "menu" && <Label>Our menu</Label>}
      <h1>
        {first}
        <br />
        {second}
      </h1>
      <div className="hero-ribbon">
        <Marquee text={text} color={color} tilt />
      </div>
      <Img
        name={img}
        alt={
          type === "home"
            ? "Wood-fired pepperoni pizza with melted mozzarella and fresh basil"
            : "Freshly baked vegetable pizza"
        }
        className="hero-food"
        eager
      />
      {type === "home" && (
        <>
          <div className="hero-stamp">
            <Img name={art.stamp} />
            <span>
              A delicious
              <br />
              favorite you’ll
              <br />
              want again
            </span>
          </div>
          <div className="hero-flower spin">
            <Img name={art.flower} />
            <Img
              name="tSvjTuoluT9BVQnmdhd5k6gdzIE.svg"
              className="flower-symbol"
            />
          </div>
        </>
      )}
      <Wave />
      <Link
        href={`#${type === "home" ? "menu" : "shop"}`}
        className="scroll-cue"
        aria-label="Scroll to content"
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById(
              type === "home" ? "menu" : "shop",
            )
            ?.scrollIntoView({
              behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth",
            });
        }}
      >
        <Arrow direction="down" />
      </Link>
    </section>
  );
}
function SectionTitle({
  title,
  label,
  href,
  button = "View all",
  center = false,
}) {
  return (
    <div className={`section-heading ${center ? "center" : ""}`}>
      <div>
        <Label>{label}</Label>
        <h2>{title}</h2>
      </div>
      {href && <Button href={href}>{button}</Button>}
    </div>
  );
}
function ProductCard({ product }) {
  return (
    <article className="product-card" style={{ "--card-color": product.color }}>
      <Link
        href={`/menu/${product.slug}`}
        className="product-image"
        aria-label={`View ${product.name}`}
      >
        <Img name={product.image} alt={product.name} />
      </Link>
      <div className="product-card-info">
        <h3>
          <Link href={`/menu/${product.slug}`}>{product.name}</Link>
        </h3>
        <div className="product-price">${product.price.toFixed(2)} USD</div>
        <Button href={`/menu/${product.slug}`} className="white-button">
          Order now
        </Button>
      </div>
    </article>
  );
}
function Carousel({ items, label = "Products" }) {
  const track = useRef(null),
    hover = useRef(false),
    moving = useRef(false),
    timer = useRef(null);
  const [paused, setPaused] = useState(false);
  const pauseRef = useRef(false);
  pauseRef.current = paused;
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  const step = () =>
    track.current
      ? track.current.firstElementChild.getBoundingClientRect().width + 20
      : 0;
  const reposition = () => {
    const el = track.current;
    if (!el || moving.current) return;
    const group = step() * items.length;
    if (el.scrollLeft < group * 0.5) el.scrollLeft += group;
    else if (el.scrollLeft >= group * 2) el.scrollLeft -= group;
  };
  useEffect(() => {
    const el = track.current;
    const init = () => {
      el.scrollLeft = step() * items.length;
    };
    el.querySelectorAll("[aria-hidden=true] a").forEach(
      (a) => (a.tabIndex = -1),
    );
    const observer = new ResizeObserver(init);
    observer.observe(el);
    init();
    const tick = setInterval(() => {
      if (
        !pauseRef.current &&
        !hover.current &&
        !moving.current &&
        !reduced() &&
        el.getBoundingClientRect().bottom > 0 &&
        el.getBoundingClientRect().top < innerHeight
      ) {
        el.scrollLeft += 0.7;
        reposition();
      }
    }, 24);
    return () => {
      observer.disconnect();
      clearInterval(tick);
      clearTimeout(timer.current);
    };
  }, [items.length]);
  const move = (dir) => {
    const el = track.current;
    moving.current = true;
    el.scrollBy({
      left: dir * step(),
      behavior: reduced() ? "instant" : "smooth",
    });
    clearTimeout(timer.current);
    timer.current = setTimeout(
      () => {
        moving.current = false;
        reposition();
      },
      reduced() ? 10 : 550,
    );
  };
  return (
    <div
      className={`carousel carousel-${label.toLowerCase()}`}
      role="region"
      aria-label={label}
      onMouseEnter={() => (hover.current = true)}
      onMouseLeave={() => (hover.current = false)}
      onFocusCapture={() => (hover.current = true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) hover.current = false;
      }}
    >
      <div
        className="carousel-track"
        ref={track}
        onScroll={reposition}
        tabIndex="0"
        aria-label={`${label}, scroll horizontally`}
      >
        {[0, 1, 2].map((copy) => (
          <React.Fragment key={copy}>
            {items.map((p) => (
              <div
                className="carousel-slide"
                key={`${copy}-${p.slug}`}
                aria-hidden={copy !== 1 ? true : undefined}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="carousel-controls">
        <button
          onClick={() => move(-1)}
          aria-label={`Previous ${label.toLowerCase()}`}
        >
          <Img name="UHalb3BSMuuvzoMp3PLOgwS3160.svg" />
        </button>
        <button
          onClick={() => move(1)}
          aria-label={`Next ${label.toLowerCase()}`}
        >
          <Img name="gG4SNhNov1BMz1cAToZ3g23LMk.svg" />
        </button>
        <button
          className="motion-pause"
          onClick={() => setPaused(!paused)}
          aria-label={`${paused ? "Resume" : "Pause"} ${label.toLowerCase()} autoplay`}
          aria-pressed={paused}
        >
          {paused ? "▶" : "Ⅱ"}
        </button>
      </div>
    </div>
  );
}
function Categories() {
  const [active, setActive] = useState(1),
    [paused, setPaused] = useState(false);
  const hover = useRef(false);
  const cats = [
    [
      "Burgers",
      "Big bites, Napoli spirit",
      "pizza/chicken-burger.png",
      "pizza/classic-burger.png",
    ],
    [
      "Pizzas",
      "Hot from the oven, made to share",
      "pizza/pepperoni.png",
      "pizza/pizza-table.jpg",
    ],
    [
      "Sides",
      "A little extra for your pizza night",
      "pizza/garlic-bread.png",
      "pizza/garlic-bread.png",
    ],
  ];
  useEffect(() => {
    const t = setInterval(() => {
      if (
        !paused &&
        !hover.current &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        setActive((n) => (n + 1) % 3);
    }, 4200);
    return () => clearInterval(t);
  }, [paused]);
  return (
    <section id="menu" className="section container category-section">
      <SectionTitle
        title={
          <>
            Choose your
            <br />
            favorite
          </>
        }
        label="Our menu"
        href="/menu"
        center
      />
      <div
        className="category-stage"
        role="region"
        aria-label="Pizza categories"
        onMouseEnter={() => (hover.current = true)}
        onMouseLeave={() => (hover.current = false)}
        onFocusCapture={() => (hover.current = true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) hover.current = false;
        }}
      >
        {cats.map(([name, description, img, thumb], i) => {
          const pos = (i - active + 3) % 3;
          return (
            <Link
              href={`/menu?category=${name.toLowerCase()}`}
              key={name}
              className={`category-card category-position-${pos}`}
              aria-label={`Explore ${name}`}
            >
              <Img name={img} alt={name} className="category-image" />
            </Link>
          );
        })}
        <div className="category-nav">
          <button
            onClick={() => setActive((n) => (n + 2) % 3)}
            aria-label="Previous category"
          >
            <Img name="UHalb3BSMuuvzoMp3PLOgwS3160.svg" />
          </button>
          <Link
            href={`/menu?category=${cats[active][0].toLowerCase()}`}
            className="category-caption"
            key={cats[active][0]}
          >
            <span className="card-plus" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
            <Img name={cats[active][3]} className="category-thumb" />
            <span>
              <strong>{cats[active][0]}</strong>
              <span>{cats[active][1]}</span>
            </span>
          </Link>
          <button
            onClick={() => setActive((n) => (n + 1) % 3)}
            aria-label="Next category"
          >
            <Img name="gG4SNhNov1BMz1cAToZ3g23LMk.svg" />
          </button>
        </div>
        <button
          className="motion-pause category-pause"
          aria-label={`${paused ? "Resume" : "Pause"} category rotation`}
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? "▶" : "Ⅱ"}
        </button>
      </div>
    </section>
  );
}
function Crafted() {
  return (
    <section className="section container crafted">
      <div className="crafted-copy">
        <SectionTitle
          title={
            <>
              Crafted with
              <br />
              our care
            </>
          }
          label="About us"
        />
        <p>
          We stretch every dough by hand, layer on fresh ingredients, and fire
          every pizza until the crust is golden. Good food, great company.
        </p>
        <Button href="/about">Learn more</Button>
        <Img
          name="HIokzl1CsQyh7C9zHUuT1mqDk.svg"
          className="scene-sticker sticker-one"
        />
        <Img
          name="FC6QabqNKQElNxUu4T7QdNHMfPI.svg"
          className="scene-sticker sticker-two"
        />
      </div>
      <div className="cutout-scene">
        <Img name={art.orangeShape} className="shape" />
        <Img
          name={art.margherita}
          alt="Margherita pizza with fresh basil"
          className="cutout float"
        />
        <Img
          name="GRrWY4LSAoi4A56d1EKlJ32M.svg"
          className="scene-sticker sticker-three"
        />
        <Img
          name="MPrzrQGaarPFNKk05B5yVmoPU.svg"
          className="scene-sticker sticker-four"
        />
      </div>
      <div className="crafted-ribbon">
        <Marquee color="yellow" tilt />
      </div>
    </section>
  );
}
function WhyUs() {
  return (
    <section className="section container why-us">
      <div className="why-statement">
        <Label>Why choose us</Label>
        <h2>
          <span className="why-line">
            <span className="stat-sticker">
              98%<small>Love Every Bite</small>
            </span>{" "}
            Golden crust.
          </span>
          <span className="why-line">Bold flavors.</span>
          <span className="why-last">
            <span className="why-line">Every slice is made</span>
            <span className="why-line">
              to share{" "}
              <span className="stat-sticker lime">
                12K+<small>Pizzas Fired</small>
                <Img name="WOkOnZ3D16yFWaXluSNBe9kiUA.svg" />
              </span>
            </span>
          </span>
        </h2>
        <div className="why-badge">
          <Img name="WMCkAi0co2Fxqxh6KKAWXZ4VEZY.svg" className="spin" />
          <Img name="WOkOnZ3D16yFWaXluSNBe9kiUA.svg" />
        </div>
      </div>
      <div className="quality-grid">
        <div className="quality-bread">
          <Img
            name="pizza/oven.jpg"
            alt="Pizza cooking in a glowing wood-fired oven"
          />
          <div className="quality-message">
            <h3>Made with care, trusted for every occasion</h3>
            <p>
              Great pizza starts with good dough, ripe tomatoes, and real
              mozzarella. We bring them together with a hot oven, a little
              patience, and plenty of care. Simple ingredients. Big flavor.
            </p>
          </div>
        </div>
        <div className="quality-support">
          <Img
            name="nghP8KbVnDVGxLpTslFzl81Q5Y4.png"
            className="striped-ticket"
          />
          <div className="support-ticket">
            <Img
              name="SIx3ypypo4KOYzzeYkxlX1ue28.svg"
              className="support-flower"
            />
            <p>
              Whether you have a question, need help with an order, or want a
              recommendation, our friendly team is always here to help
            </p>
            <strong>Fresh</strong>
            <small>Hot from the oven. Made to share.</small>
          </div>
          <Img name="pizza/pepperoni.png" alt="Fresh pepperoni pizza" />
        </div>
      </div>
    </section>
  );
}
function Burgers() {
  return (
    <section className="section burgers-section">
      <div className="container burgers-intro">
        <div>
          <SectionTitle
            title={
              <>
                Big bites,
                <br />
                big flavor
              </>
            }
            label="Our burgers"
          />
          <p>
            Golden buns, juicy patties, and crispy chicken. Discover our
            burgers, stacked with Italian flair and made for big appetites.
          </p>
          <Button href="/menu?category=burgers">View all</Button>
        </div>
        <div className="cutout-scene">
          <Img name={art.yellowShape} className="shape" />
          <Img
            name={art.burger}
            className="cutout float"
            alt="Classic cheeseburger with lettuce and tomato"
          />
          <div className="small-stamp">
            <Img name="pizza/support-ring.svg" className="spin" />
            <Img name="pizza/hot.svg" />
          </div>
          <Img
            name="pizza/pepper.svg"
            className="scene-sticker sticker-three"
          />
          <Img
            name="Fvz7VjS9DUnl3YDzdCSSgYNIKyE.svg"
            className="scene-sticker sticker-four"
          />
        </div>
      </div>
      <Marquee color="orange" />
      <div className="container">
        <Carousel
          items={products.filter((p) => p.category === "burgers")}
          label="Burgers"
        />
      </div>
    </section>
  );
}
function Testimonials() {
  return (
    <section className="section container testimonials">
      <SectionTitle
        title="Real stories from people who love every bite"
        label="Testimonial"
        center
      />
      <div className="testimonial-grid">
        <div className="quotes">
          <span className="quote-mark">
            <Img name="jxva9ITJry1tRkh1IycsPo1MXPc.svg" className="spin" />
            <Img name="93nNh4NWnULUs5IwK7DfVBNcO6k.svg" />
          </span>
          {[
            ["Emma Carter", "Every visit feels special and delicious."],
            ["Noah Williams", "Golden crust, generous toppings, every time."],
            ["Sophia Miller", "The perfect spot for pizza night."],
          ].map(([name, quote]) => (
            <blockquote key={name}>
              <cite>— {name}</cite>
              <p>“{quote}”</p>
            </blockquote>
          ))}
          <div className="rating">
            <strong>5.0</strong>
            <div>
              <span className="stars" aria-label="5 out of 5 stars">
                ★★★★★
              </span>
              <p>Loved by 5,000+ happy customers</p>
            </div>
          </div>
        </div>
        <div className="testimonial-photo">
          <Img
            name={art.customer}
            alt="Fresh pizza being served from a wood-fired oven"
          />
          <span className="review-sticker">
            <Img name="tQbznCiHguudCsfxC9Pm3pypM9s.svg" className="spin" />
            <Img name="bDi4sAF0vjuF9jJztN4k6fkfvc.svg" />
          </span>
          <span className="customer-name">
            <span className="card-plus">+</span>
            <Img name="u74EA4gWWtoHgUH9fND7iKUNVo.png" />
            Emma Collins<small>Pizza Enthusiast</small>
          </span>
        </div>
      </div>
      <Gallery />
    </section>
  );
}
function Gallery({ about = false }) {
  const photos = about
    ? [
        "pizza/pizza-chef.jpg",
        "pizza/pizza-garden.jpg",
        "pizza/oven.jpg",
        "pizza/pizza-table.jpg",
      ]
    : [
        "pizza/pizza-table.jpg",
        "pizza/pizza-garden.jpg",
        "pizza/pizza-chef.jpg",
        "pizza/oven.jpg",
      ];
  return (
    <div className={`gallery ${about ? "about-gallery" : ""}`}>
      {photos.map((p, i) => (
        <figure key={p}>
          <Img
            name={p}
            alt={
              about
                ? [
                    "Pizza fresh from the oven",
                    "A pizza loaded with colorful toppings",
                    "Our wood-fired pizza oven",
                    "Pizza night at the table",
                  ][i]
                : [
                    "Pizza ready to share",
                    "Freshly baked pizza",
                    "Serving a fresh pizza",
                    "Pizza in the wood-fired oven",
                  ][i]
            }
          />
          <figcaption>
            <span>
              <Img name="93nNh4NWnULUs5IwK7DfVBNcO6k.svg" /> Luigi’s Pizza
            </span>
            <span className="gallery-heart">♥</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
function SupportBadge() {
  return (
    <span className="support-badge">
      <Img name="pizza/support-ring.svg" className="spin" />
      <Img name="pizza/hot.svg" />
    </span>
  );
}
function SweetCTA() {
  return (
    <section className="sweet-cta">
      <Marquee text="Happy slices" color="lime" />
      <div className="cta-blob">
        <div className="container">
          <SectionTitle
            title={
              <>
                Your next great
                <br />
                slice is waiting
              </>
            }
            label="Let’s talk"
            center
          />
          <div className="cta-art">
            <Img
              name={art.next}
              alt="Wood-fired pizzas ready to share at the table"
              className="cta-portrait"
            />
            <Link href="/contact" className="cta-mini treats">
              <span className="card-plus">+</span>
              <Img name="pizza/margherita.png" alt="Margherita pizza" />
              <span>
                <strong>Pizza</strong>Made to share
              </span>
            </Link>
            <Link href="/contact" className="cta-mini taste">
              <span className="card-plus">+</span>
              <Img name="pizza/garlic-bread.png" alt="Cheesy garlic bread" />
              <span>
                <strong>Sides</strong>A little extra
              </span>
            </Link>
            <SupportBadge />
            <div className="cta-flower">
              <Img name="jxva9ITJry1tRkh1IycsPo1MXPc.svg" className="spin" />
              <Img name="93nNh4NWnULUs5IwK7DfVBNcO6k.svg" />
            </div>
            <div className="cta-stamp">
              A delicious
              <br />
              favorite you’ll
              <br />
              want again
            </div>
            <Link
              href="/contact"
              className="cta-contact"
              aria-label="Contact Luigi’s Pizza"
            >
              <Img name="8aiV9r3tqCDRPA5nNOAe9Qwo0rI.svg" className="spin" />
              <Arrow />
            </Link>
          </div>
          <div className="cta-copy">
            <p>
              Hand-stretched, oven-fired, and ready for good company. Choose
              your favorite pizza, add a side, and make tonight a pizza night.
            </p>
          </div>
        </div>
      </div>
      <div className="baked-ticker" aria-label="Fired with love">
        <div aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span key={i}>Fired with love&nbsp;</span>
          ))}
        </div>
      </div>
    </section>
  );
}
function Footer() {
  const [status, setStatus] = useState("");
  return (
    <footer>
      <div className="container footer-main">
        <div className="footer-brand">
          <Link href="/" aria-label="Luigi’s Pizza home">
            <BrandLogo />
          </Link>
          <p>
            Your neighborhood pizza kitchen. Golden crusts, generous toppings,
            stacked burgers, and good times around the table.
          </p>
          <form
            className="newsletter"
            onSubmit={(e) => {
              e.preventDefault();
              setStatus("Demo subscription received. No email was sent.");
              e.currentTarget.reset();
            }}
          >
            <label htmlFor="newsletter-email">Newsletter</label>
            <div>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
              <button aria-label="Subscribe to newsletter">
                <Arrow />
              </button>
            </div>
            <p className="form-status" role="status">
              {status}
            </p>
          </form>
        </div>
        <div className="footer-links">
          <h3>Main pages</h3>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/menu">Shop</Link>
        </div>
        <div className="footer-links">
          <h3>More pages</h3>
          <Link href="/menu/margherita">Product details</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/404">404</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <div className="socials">
          {[
            [
              "Facebook",
              "https://facebook.com",
              "QI12eOQY8ALF0kgbrrOOekhoxYY.svg",
            ],
            ["X", "https://x.com", "Vi4HOihqXI0JoaOQNRqoLHzNo.svg"],
            [
              "LinkedIn",
              "https://linkedin.com",
              "BX5JHgoUZkEOf105YedE49POY.svg",
            ],
            [
              "YouTube",
              "https://youtube.com",
              "OS4uwWWyQogjIBEG8v43xiswd0.svg",
            ],
          ].map(([n, url, img]) => (
            <a
              key={n}
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={n}
            >
              <Img name={img} />
            </a>
          ))}
        </div>
        <p>© {new Date().getFullYear()} Luigi’s Pizza. Made for good times.</p>
      </div>
    </footer>
  );
}
function FAQ() {
  const [active, setActive] = useState(0);
  return (
    <section className="section container faq">
      <SectionTitle title="Got questions?" label="FAQ" />
      <div className="faq-list">
        {faqs.map((f, i) => (
          <div
            className={`faq-item ${active === i ? "expanded" : ""}`}
            key={f.question}
          >
            <h3>
              <button
                id={`faq-title-${i}`}
                aria-expanded={active === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setActive(active === i ? null : i)}
              >
                {f.question}
                <span aria-hidden="true">{active === i ? "−" : "+"}</span>
              </button>
            </h3>
            <div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-title-${i}`}
              hidden={active !== i}
            >
              <p>{f.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <section className="section container goodies-section">
        <SectionTitle title="Pizza favorites" label="Our menu" />
        <Carousel
          items={products.filter((p) => p.category !== "burgers").slice(0, 5)}
          label="Goodies"
        />
      </section>
      <Crafted />
      <WhyUs />
      <Burgers />
      <Testimonials />
      <SweetCTA />
    </>
  );
}
function About() {
  return (
    <>
      <section className="about-hero">
        <div className="container">
          <h1>About us</h1>
          <div className="about-ribbon">
            <Marquee tilt />
          </div>
          <Gallery about />
          <div className="about-flower">
            <Img name={art.flower} className="spin" />
            <Img name="tSvjTuoluT9BVQnmdhd5k6gdzIE.svg" />
          </div>
        </div>
        <Link
          href="/about#stats"
          className="scroll-cue"
          aria-label="Scroll to pizza kitchen stats"
        >
          <Arrow direction="down" />
        </Link>
      </section>
      <section id="stats" className="section container about-stats">
        <SectionTitle title="Built on good pizza" label="Our stats" center />
        <div className="about-stats-grid">
          <Img
            name="pizza/pizza-chef.jpg"
            alt="Fresh pizza served from the oven"
            className="baker-photo"
          />
          <div className="stats-list">
            {[
              ["10K+", "Served with care, flavor, and a commitment"],
              ["5K+", "Happy customers who keep coming back for more"],
              ["20+", "Expert chefs bringing skill and creativity"],
            ].map(([v, t]) => (
              <div key={v}>
                <strong>{v}</strong>
                <p>{t}</p>
              </div>
            ))}
          </div>
          <div className="cutout-scene">
            <Img name={art.orangeShape} className="shape" />
            <Img
              name="pizza/garden.png"
              alt="Wood-fired garden pizza"
              className="cutout"
            />
          </div>
        </div>
      </section>
      <section className="section container story">
        <div className="story-ribbon">
          <Marquee color="yellow" tilt />
        </div>
        <div>
          <SectionTitle title="The story behind us" label="Our story" />
          <p>
            We started with a love of pizza and a table full of friends. Now we
            bring that same warmth to every hand-stretched base, every topping,
            and every slice we share.
          </p>
          <Button href="/contact">Contact us</Button>
        </div>
        <div className="timeline">
          {[
            [
              "2022",
              "Where it all began",
              "It started with dough, tomatoes, and a very hot oven. We spent our evenings trying recipes, sharing slices, and finding that perfect balance of airy crust and rich flavor. Before long, our pizza nights became the beginning of a neighborhood kitchen.",
            ],
            [
              "2024",
              "Growing craft",
              "Our menu grew from a classic Margherita to bold toppings, golden garlic bread, and stacked burgers. We kept learning, stretching, and tasting, with one simple goal: a pizza you want to share, and a crust you never leave behind.",
            ],
            [
              "2026",
              "Firing up what’s next",
              "Today, we are still discovering new combinations and bringing people together around good pizza. From a quick lunch to a table full of friends, Every slice is made with the same curiosity, care, and love of real ingredients.",
            ],
          ].map(([year, title, text], i) => (
            <article key={year}>
              <span>0{i + 1}</span>
              <div>
                <h3>
                  {year} — {title}
                </h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <FAQ />
    </>
  );
}
function Shop({ requestedCategory: requested }) {
  const router = useRouter();
  const category = categories.some((c) => c[0] === requested)
    ? requested
    : "all";
  const [limit, setLimit] = useState(9);
  useEffect(() => setLimit(9), [category]);
  const filtered = products.filter(
    (p) => category === "all" || p.categories.includes(category),
  );
  return (
    <>
      <Hero type="menu" />
      <section id="shop" className="section container shop-section">
        <div
          className="category-filters"
          role="group"
          aria-label="Filter products by category"
        >
          {categories.map(([id, label, img]) => (
            <button
              key={id}
              className={category === id ? "active" : ""}
              aria-pressed={category === id}
              onClick={() => {
                setLimit(9);
                router.push(
                  id === "all" ? "/menu" : `/menu?category=${id}`,
                  { scroll: false },
                );
              }}
            >
              <Img name={img} />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          Showing {Math.min(limit, filtered.length)} of {filtered.length}{" "}
          {category === "all" ? "products" : category}
        </p>
        <div className="product-grid">
          {filtered.slice(0, limit).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        {filtered.length > limit && (
          <div className="center-action">
            <Button onClick={() => setLimit((n) => n + 9)}>Load more</Button>
          </div>
        )}
      </section>
      <SweetCTA />
    </>
  );
}
function Product({ product }) {
  const related = products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (product.categories.includes("burgers")
          ? p.categories.includes("burgers")
          : p.categories.some((c) => product.categories.includes(c))),
    )
    .slice(0, 4);
  return (
    <>
      <section className="section container product-detail">
        <div className="detail-image" style={{ background: product.color }}>
          <Img name={product.image} alt={product.name} eager />
        </div>
        <div className="detail-copy">
          <div className="review-line">
            <span className="stars" aria-label="5 out of 5 stars">
              ★★★★★
            </span>
            <span>({product.reviews} reviews)</span>
          </div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="product-tags">
            <span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path d="M12 6v6l4 3" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {product.minutes} minutes
            </span>
            <span>♡ &nbsp; {product.ingredient}</span>
          </div>
          <strong className="detail-price">
            ${product.price.toFixed(2)} USD
          </strong>
          <Button href={`/contact?product=${product.slug}#message`}>
            Order now
          </Button>
        </div>
      </section>
      <Marquee text="Happy slices" color="yellow" />
      <article className="section product-article">
        {product.article.map((p, i) =>
          p.type === "heading" ? (
            <h2 key={i}>{p.text}</h2>
          ) : (
            <p key={i}>{p.text}</p>
          ),
        )}
      </article>
      <Testimonials />
      <section className="section container">
        <SectionTitle
          title="More to share"
          label="Our menu"
          href="/menu"
          button="View more"
        />
        <div className="related-grid">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
function Contact({ productSlug }) {
  const selected = products.find((p) =>
    [p.slug, p.legacySlug].includes(productSlug),
  );
  const [status, setStatus] = useState("");
  return (
    <>
      <section className="contact-hero">
        <div className="container">
          <Label>Get in touch</Label>
          <h1>
            Let’s start a<br />
            conversation
          </h1>
          <div className="contact-ticket">
            <h2>Contact info</h2>
            <a href="mailto:hello@luigispizza.example">hello@luigispizza.example</a>
            <a href="tel:+1234567890">+1 234 567 890</a>
          </div>
          <div className="contact-scene">
            <Img name={art.pinkShape} className="shape" />
            <Img
              name={art.contact}
              alt="Fresh Margherita pizza"
              className="cutout float"
              eager
            />
          </div>
          <div className="contact-flower">
            <Img name="SIx3ypypo4KOYzzeYkxlX1ue28.svg" className="spin" />
            <Img name="tSvjTuoluT9BVQnmdhd5k6gdzIE.svg" />
          </div>
        </div>
        <Wave />
      </section>
      <section id="message" className="section container contact-form-section">
        <div className="contact-form-card">
          <h2>Send a message</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStatus(
                "Your message has been received in this local demo. It has not been sent to Luigi’s Pizza.",
              );
              e.currentTarget.reset();
            }}
          >
            <div className="form-grid">
              <label>
                First name
                <input
                  name="firstName"
                  placeholder="Jane"
                  autoComplete="given-name"
                  required
                />
              </label>
              <label>
                Last name
                <input
                  name="lastName"
                  placeholder="Smith"
                  autoComplete="family-name"
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="jane@example.com"
                  autoComplete="email"
                  required
                />
              </label>
              <label>
                Phone number
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 234 567 890"
                  autoComplete="tel"
                />
              </label>
              <label className="full">
                Subject
                <input
                  name="subject"
                  placeholder="Order support"
                  defaultValue={
                    selected ? `Order enquiry: ${selected.name}` : ""
                  }
                  required
                />
              </label>
              <label className="full">
                Message
                <textarea
                  name="message"
                  placeholder="Hi! I’d like to plan a pizza night…"
                  rows="5"
                  required
                />
              </label>
            </div>
            <Button type="submit">Send a message</Button>
            <p className="demo-note">Local demo — messages are not sent.</p>
            <p className="form-status" role="status">
              {status}
            </p>
          </form>
        </div>
        <div className="contact-form-photo">
          <Img name="pizza/oven.jpg" alt="Pizza baking in a wood-fired oven" />
          <SupportBadge />
        </div>
      </section>
      <Marquee text="Come visit us" color="orange" />
      <section className="section container location-section">
        <SectionTitle title="Find your pizza place" label="Locations" center />
        <div className="map">
          <Img
            name="VtxLomJxeaVD17j8gok7Ji2T0.png"
            alt="Illustrated map of London, showing the pizzeria area"
          />
          <Img
            className="map-pin pin-one"
            name="oYHHCYKyf0UI0A5uGCqPr62p00E.png"
          />
          <Img
            className="map-pin pin-two"
            name="YqYF5E8rBQ0j48e2BL2evdCDs4k.png"
          />
          <a
            href="https://www.openstreetmap.org/search?query=London"
            target="_blank"
            rel="noreferrer"
            className="map-card"
          >
            <span className="card-plus">+</span>
            <Img
              name="kujf30L5pVwTIfCeJyE40iQzh4.png"
              alt="Pizzeria location in London"
            />
            <h3>London</h3>
          </a>
        </div>
      </section>
      <FAQ />
    </>
  );
}
function NotFound() {
  return (
    <section className="not-found container">
      <Img
        name="xFKsPZ0FDRXSSCZePMHalRQppDQ.svg"
        className="not-found-flower spin"
      />
      <div
        className="pizza-404-art"
        role="img"
        aria-label="404, with a pizza in place of the zero"
      >
        <span>4</span>
        <Img name="pizza/pepperoni.png" eager />
        <span>4</span>
      </div>
      <h1>Oops, this page is fresh out of reach.</h1>
      <Button href="/">Back to home</Button>
    </section>
  );
}
function SiteShell({ children }) {
  const pathname = usePathname();
  usePageMotion(pathname);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header cream={pathname.startsWith("/menu/")} />
      <main id="main-content" key={pathname}>
        {children}
      </main>
      <Footer />
      {process.env.NODE_ENV === "development" && <Agentation />}
    </>
  );
}

export { SiteShell, Home, About, Shop, Contact, Product, NotFound };
