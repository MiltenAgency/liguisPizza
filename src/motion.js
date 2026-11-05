import { useEffect } from "react";

// The recording combines time-based movement with viewport-driven entrances.
// All listeners and animation frames belong to the current page and are cleaned up.
export function usePageMotion(route) {
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      const root = document.querySelector("main");
      if (!root || preference.matches) return;
      const elements = [
        ...root.querySelectorAll(
          ".section-heading h2, .about-hero h1, .contact-hero h1, .team-card, .about-gallery figure, .contact-form-card, .contact-form-photo, .timeline article, .not-found > img:not(.not-found-flower)",
        ),
      ];
      elements.forEach((el, i) => {
        el.classList.add("reveal-ready");
        el.style.setProperty(
          "--reveal-delay",
          `${el.matches(".team-card,.about-gallery figure") ? (i % 4) * 90 : 0}ms`,
        );
      });
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -35px 0px" },
      );
      elements.forEach((el) => observer.observe(el));
      const why = root.querySelector(".why-statement");
      const testimonial = root.querySelector(".testimonial-grid");
      const hero = root.querySelector(".hero-home");
      let frame = 0;
      const clamp = (n) => Math.max(0, Math.min(1, n));
      const paint = () => {
        frame = 0;
        if (why) {
          const r = why.getBoundingClientRect();
          const progress = clamp(
            (innerHeight * 0.8 - r.top) / (r.height * 0.85),
          );
          why.style.setProperty("--word-fill", `${progress * 100}%`);
        }
        if (testimonial) {
          const r = testimonial.getBoundingClientRect();
          const progress = clamp(
            (innerHeight * 0.9 - r.top) / (innerHeight * 0.55),
          );
          testimonial.style.setProperty(
            "--photo-shift",
            `${(1 - progress) * -26}%`,
          );
        }
        if (hero) {
          const r = hero.getBoundingClientRect();
          hero.style.setProperty(
            "--hero-turn",
            `${clamp(-r.top / r.height) * -7}deg`,
          );
        }
      };
      const queue = () => {
        if (!frame) frame = requestAnimationFrame(paint);
      };
      addEventListener("scroll", queue, { passive: true });
      addEventListener("resize", queue);
      paint();
      cleanup = () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
        removeEventListener("scroll", queue);
        removeEventListener("resize", queue);
        elements.forEach((el) =>
          el.classList.remove("reveal-ready", "is-revealed"),
        );
        why?.style.removeProperty("--word-fill");
        testimonial?.style.removeProperty("--photo-shift");
        hero?.style.removeProperty("--hero-turn");
      };
    };
    setup();
    preference.addEventListener("change", setup);
    return () => {
      cleanup();
      preference.removeEventListener("change", setup);
    };
  }, [route]);
}
