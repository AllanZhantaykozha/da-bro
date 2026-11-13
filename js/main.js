/* DA BRO — shared interactions */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- preloader (first visit per session only) ---- */
  const pre = $(".preloader");
  const ready = () => document.body.classList.add("is-ready");
  let seen = false;
  try { seen = sessionStorage.getItem("dabro-seen") === "1"; } catch (e) {}
  if (pre) {
    if (seen || reduce) { pre.remove(); requestAnimationFrame(ready); }
    else {
      try { sessionStorage.setItem("dabro-seen", "1"); } catch (e) {}
      window.addEventListener("load", () => {
        setTimeout(() => { pre.classList.add("is-done"); setTimeout(ready, 350); setTimeout(() => pre.remove(), 1200); }, 1500);
      });
    }
  } else { requestAnimationFrame(ready); }

  /* ---- page curtain transitions ---- */
  const curtain = $(".curtain");
  if (curtain) {
    curtain.classList.add("is-active");
    curtain.style.transition = "none";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      curtain.style.transition = "";
      curtain.style.transform = "translateY(-100%)";
      setTimeout(() => { curtain.classList.remove("is-active"); curtain.style.transition = "none"; curtain.style.transform = ""; requestAnimationFrame(() => curtain.style.transition = ""); }, 800);
    }));
    $$('a[href$=".html"], a[href*=".html?"], a[href*=".html#"]').forEach(a => {
      a.addEventListener("click", e => {
        if (e.metaKey || e.ctrlKey || a.target === "_blank") return;
        const url = a.getAttribute("href");
        const here = location.pathname.split("/").pop() || "index.html";
        if (url.split(/[?#]/)[0] === here) return;
        e.preventDefault();
        curtain.classList.add("is-active");
        setTimeout(() => (location.href = url), 650);
      });
    });
    window.addEventListener("pageshow", e => { if (e.persisted) curtain.classList.remove("is-active"); });
  }

  /* ---- header behaviour ---- */
  const header = $(".header");
  let lastY = 0;
  const onScroll = () => {
    const y = scrollY;
    if (header) {
      header.classList.toggle("is-scrolled", y > 40);
      header.classList.toggle("is-hidden", y > lastY && y > 300 && !document.body.classList.contains("is-locked"));
    }
    lastY = y;
    const p = $(".progress");
    if (p) {
      const max = document.documentElement.scrollHeight - innerHeight;
      p.classList.toggle("is-show", y > 600);
      const c = $("circle", p);
      const len = 2 * Math.PI * 26;
      c.style.strokeDasharray = len;
      c.style.strokeDashoffset = len - (y / max) * len;
    }
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  $(".progress")?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  /* ---- mobile menu ---- */
  const burger = $(".burger"), menu = $(".mobile-menu");
  burger?.addEventListener("click", () => {
    const open = !menu.classList.contains("is-open");
    menu.classList.toggle("is-open", open);
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
    document.body.classList.toggle("is-locked", open);
    header.style.color = open ? "var(--ivory)" : "";
  });

  /* ---- reveal on scroll ---- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
  window.dabroReveal = el => io.observe(el);
  $$("[data-reveal], [data-split], .about__text").forEach(el => io.observe(el));

  /* ---- counters ---- */
  const cio = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, to = +el.dataset.count, t0 = performance.now(), dur = 1800;
      const tick = t => {
        const k = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(to * (1 - Math.pow(1 - k, 4))).toLocaleString("ru-RU");
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach(el => cio.observe(el));

  /* ---- parallax ---- */
  const par = $$("[data-parallax]");
  if (par.length && !reduce) {
    const run = () => {
      par.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        const k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        el.style.transform = `translate3d(0, ${k * -(+el.dataset.parallax || 60)}px, 0)`;
      });
      requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }

  /* ---- custom cursor ---- */
  if (matchMedia("(hover: hover) and (pointer: fine)").matches && !reduce) {
    const ring = document.createElement("div"), dot = document.createElement("div");
    ring.className = "cursor"; dot.className = "cursor-dot";
    document.body.append(ring, dot);
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px, ${my}px)`; });
    const loop = () => { rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16; ring.style.transform = `translate(${rx}px, ${ry}px)`; requestAnimationFrame(loop); };
    loop();
    document.addEventListener("mouseover", e => ring.classList.toggle("is-hover", !!e.target.closest("a, button, select, .card__media")));
  }

  /* ---- magnetic buttons ---- */
  if (matchMedia("(hover: hover)").matches && !reduce) {
    $$("[data-magnetic]").forEach(el => {
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transition = "transform .7s cubic-bezier(.22,1,.36,1), color .5s"; el.style.transform = ""; setTimeout(() => el.style.transition = "", 700); });
    });
  }

  /* ---- store tabs ---- */
  $$(".tab").forEach(t => t.addEventListener("click", () => {
    $$(".tab").forEach(x => { x.classList.toggle("is-active", x === t); x.setAttribute("aria-selected", x === t); });
    $$(".stores__panel").forEach(p => p.classList.toggle("is-active", p.id === t.dataset.target));
  }));

  /* ---- toast ---- */
  let tt;
  window.dabroToast = msg => {
    let el = $(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); document.body.append(el); }
    el.innerHTML = `<i></i>${msg}`;
    requestAnimationFrame(() => el.classList.add("is-show"));
    clearTimeout(tt); tt = setTimeout(() => el.classList.remove("is-show"), 2600);
  };

  $(".subscribe")?.addEventListener("submit", e => { e.preventDefault(); e.target.reset(); dabroToast("Спасибо! Вы в списке первых — о новинках узнаете раньше всех."); });

  /* ---- bag counter shared across pages ---- */
  window.dabroBag = {
    get() { try { return JSON.parse(localStorage.getItem("dabro-bag") || "[]"); } catch (e) { return []; } },
    set(items) { try { localStorage.setItem("dabro-bag", JSON.stringify(items)); } catch (e) {} this.paint(); },
    paint(bump) {
      const n = this.get().reduce((s, i) => s + i.qty, 0);
      $$(".bag-count").forEach(b => { b.textContent = n; if (bump) { b.classList.add("is-bump"); setTimeout(() => b.classList.remove("is-bump"), 300); } });
    }
  };
  dabroBag.paint();
})();
