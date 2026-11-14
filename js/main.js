/* DA BRO v2 — shared: city gate, header, motion, bag */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  };
  const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------- cities (prototype data) ---------- */
  const CITIES = {
    astana: {
      name: "Астана", info: "Три бутика на обоих берегах Есиля", img: "assets/boutique.png",
      stores: [
        { name: "Левый берег", addr: "Торговый центр, 1 этаж", hours: "10:00 — 22:00" },
        { name: "Правый берег", addr: "Торговый центр, 2 этаж", hours: "10:00 — 22:00" },
        { name: "Есиль", addr: "Торговый центр, 1 этаж", hours: "10:00 — 22:00" },
      ],
    },
    uralsk: {
      name: "Уральск", info: "Бутик в центре города", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=70&auto=format&fit=crop",
      stores: [{ name: "Центр", addr: "Торговый центр, 1 этаж", hours: "10:00 — 21:00" }],
    },
  };
  const plural = (n, f) => f[(n % 10 === 1 && n % 100 !== 11) ? 0 : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? 1 : 2];
  const storesWord = n => `${n} ${plural(n, ["бутик", "бутика", "бутиков"])}`;

  let city = store.get("dabro-city", null);
  if (!CITIES[city]) city = null;

  window.dabro = {
    CITIES, storesWord, arrow,
    get city() { return city; },
    cityData() { return CITIES[city] || CITIES.astana; },
    openGate,
  };

  function paintCity() {
    const c = dabro.cityData();
    $$("[data-city]").forEach(el => (el.textContent = c.name));
    $$("[data-city-in]").forEach(el => (el.textContent = city === "uralsk" ? "Уральске" : "Астане"));
    $$("[data-city-stores]").forEach(el => (el.textContent = storesWord(c.stores.length)));
    document.dispatchEvent(new CustomEvent("dabro:city", { detail: city }));
  }

  /* ---------- gate ---------- */
  function buildGate(closable) {
    const g = document.createElement("div");
    g.className = "gate";
    g.setAttribute("role", "dialog");
    g.setAttribute("aria-modal", "true");
    g.setAttribute("aria-label", "Выбор города");
    g.innerHTML = `
      <div class="gate__top">
        <span class="gate__logo">DA BRO</span>
        <span class="gate__q">Мужская одежда и обувь</span>
        ${closable ? '<button class="gate__close" data-gate-close>Закрыть ✕</button>' : '<span class="gate__q">KZ</span>'}
      </div>
      <h2 class="gate__title"><span class="mask"><span>Откуда вы?</span></span><span class="mask"><span class="accent">Выберите город</span></span></h2>
      <div class="gate__cities">
        ${Object.entries(CITIES).map(([k, c], i) => `
          <button class="gate__city" data-pick="${k}">
            <span class="gate__city-bg" style="background-image:url('${c.img}')"></span>
            <span class="gate__meta"><span>0${i + 1}</span><span>${storesWord(c.stores.length)}</span></span>
            <span class="gate__name">${c.name}</span>
            <span class="gate__bottom"><span class="gate__info">${c.info}. Наличие, адреса и примерка — для вашего города.</span><span class="gate__go">${arrow}</span></span>
          </button>`).join("")}
      </div>`;
    document.body.append(g);
    document.body.classList.add("lock");
    requestAnimationFrame(() => requestAnimationFrame(() => { $(".gate__title", g).classList.add("in"); g.classList.add("ready"); }));
    g.addEventListener("click", e => {
      const b = e.target.closest("[data-pick]");
      if (b) pick(b.dataset.pick, b, g);
      if (e.target.closest("[data-gate-close]")) closeGate(g);
    });
    g.addEventListener("keydown", e => { if (e.key === "Escape" && closable) closeGate(g); });
    if (matchMedia("(pointer: fine)").matches) setTimeout(() => $(".gate__city", g)?.focus({ preventScroll: true }), 400);
  }
  function pick(k, btn, g) {
    city = k; store.set("dabro-city", k);
    btn.classList.add("picked");
    paintCity();
    setTimeout(() => closeGate(g), reduce ? 0 : 650);
  }
  function closeGate(g) {
    g.classList.add("out");
    document.body.classList.remove("lock");
    setTimeout(() => document.body.classList.add("go"), 250);
    setTimeout(() => g.remove(), 1100);
  }
  function openGate() { if (!$(".gate")) buildGate(true); }

  if (!city) buildGate(false);
  else requestAnimationFrame(() => document.body.classList.add("go"));
  paintCity();
  $$("[data-open-gate]").forEach(b => b.addEventListener("click", e => { e.preventDefault(); closeMenu(); openGate(); }));

  /* ---------- header hide on scroll ---------- */
  const hdr = $(".hdr");
  let lastY = 0;
  addEventListener("scroll", () => {
    const y = scrollY;
    hdr?.classList.toggle("hide", y > lastY && y > 240 && !document.body.classList.contains("lock"));
    lastY = y;
  }, { passive: true });

  /* ---------- mobile menu ---------- */
  const burger = $(".burger"), mnav = $(".mnav");
  function closeMenu() { mnav?.classList.remove("open"); burger?.classList.remove("x"); burger?.setAttribute("aria-expanded", "false"); document.body.classList.remove("lock"); }
  burger?.addEventListener("click", () => {
    const open = !mnav.classList.contains("open");
    if (!open) return closeMenu();
    mnav.classList.add("open"); burger.classList.add("x"); burger.setAttribute("aria-expanded", "true"); document.body.classList.add("lock");
  });
  $$(".mnav a").forEach(a => a.addEventListener("click", closeMenu));

  /* ---------- reveal ---------- */
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.15 });
  $$(".rv, [data-mask]").forEach(el => io.observe(el));

  /* ---------- counters ---------- */
  const cio = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target, to = +el.dataset.count, t0 = performance.now();
    const tick = t => { const k = Math.min(1, (t - t0) / 1600); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 4))).toLocaleString("ru-RU"); if (k < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick); cio.unobserve(el);
  }), { threshold: .6 });
  $$("[data-count]").forEach(el => cio.observe(el));

  /* ---------- horizontal scroll section ---------- */
  const hs = $(".hscroll");
  if (hs) {
    const track = $(".hscroll__track", hs), bar = $(".hscroll__progress i", hs);
    // phones/tablets: native swipe carousel; desktop: strip moves with vertical scroll
    const swipeMQ = matchMedia("(hover: none), (max-width: 860px)");
    const swipe = () => swipeMQ.matches;
    const size = () => { hs.style.height = swipe() ? "" : `${track.scrollWidth - innerWidth + innerHeight}px`; };
    const run = () => {
      if (swipe()) return;
      const r = hs.getBoundingClientRect(), max = hs.offsetHeight - innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / max));
      track.style.transform = `translate3d(${-p * (track.scrollWidth - innerWidth)}px,0,0)`;
      if (bar) bar.style.transform = `scaleX(${p})`;
    };
    const runSwipe = () => {
      if (!swipe() || !bar) return;
      const max = track.scrollWidth - track.clientWidth;
      bar.style.transform = `scaleX(${max > 0 ? track.scrollLeft / max : 0})`;
    };
    const reset = () => { if (swipe()) track.style.transform = ""; size(); run(); runSwipe(); };
    reset();
    addEventListener("resize", reset);
    addEventListener("load", reset);
    swipeMQ.addEventListener?.("change", reset);
    addEventListener("scroll", run, { passive: true });
    track.addEventListener("scroll", runSwipe, { passive: true });
    // desktop trackpad: horizontal swipe gesture also moves the strip
    hs.addEventListener("wheel", e => {
      if (swipe() || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      const r = hs.getBoundingClientRect();
      if (r.top > 0 || r.bottom < innerHeight) return;
      e.preventDefault();
      scrollBy(0, e.deltaX);
    }, { passive: false });
  }

  /* ---------- cursor blob ---------- */
  if (matchMedia("(hover: hover) and (pointer: fine)").matches && !reduce) {
    const b = document.createElement("div"); b.className = "blob"; document.body.append(b);
    let x = -100, y = -100, bx = x, by = y;
    addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; });
    (function loop() { bx += (x - bx) * .2; by += (y - by) * .2; b.style.transform = `translate(${bx}px,${by}px)`; requestAnimationFrame(loop); })();
    document.addEventListener("mouseover", e => b.classList.toggle("big", !!e.target.closest("a, button, .pc__media")));
  }

  /* ---------- toast ---------- */
  let tt;
  window.toast = (msg, icon = "✓") => {
    let el = $(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); document.body.append(el); }
    el.innerHTML = `<i>${icon}</i><span>${msg}</span>`;
    requestAnimationFrame(() => el.classList.add("show"));
    clearTimeout(tt); tt = setTimeout(() => el.classList.remove("show"), 2600);
  };
  $$(".sub").forEach(f => f.addEventListener("submit", e => { e.preventDefault(); f.reset(); toast("Готово — вы в списке первых"); }));
  $$("[data-soon]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); toast(a.dataset.soon, "i"); }));

  /* ---------- bag ---------- */
  window.bag = {
    get: () => store.get("dabro-bag", []),
    set(v) { store.set("dabro-bag", v); this.paint(true); },
    paint(pop) {
      const n = this.get().reduce((s, i) => s + i.qty, 0);
      $$(".bag-n").forEach(b => { b.textContent = n; if (pop) { b.classList.add("pop"); setTimeout(() => b.classList.remove("pop"), 350); } });
    },
  };
  bag.paint();
})();
