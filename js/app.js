/* DA BRO v3 — shared shell + page logic */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const page = document.body.dataset.page;
  const esc = s => String(s).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  const fmt = n => n.toLocaleString("ru-RU").replace(/[ ,]/g, " ") + " ₸";
  const plural = (n, f) => f[(n % 10 === 1 && n % 100 !== 11) ? 0 : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? 1 : 2];
  const img = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=78&auto=format&fit=crop`;
  const byId = id => PRODUCTS.find(p => p.id === +id);
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  };

  const I = {
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.4"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>',
    chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 6l-6 6 6 6"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 8h14l-1.2 12H6.2L5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M10 20v-5h4v5"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>',
    store: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 9l1.5-5h13L20 9"/><path d="M4 9h16v2a3 3 0 0 1-5.3 1.9A3 3 0 0 1 12 14a3 3 0 0 1-2.7-1.1A3 3 0 0 1 4 11V9Z"/><path d="M5.5 13.5V20h13v-6.5"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.1a4.3 4.3 0 0 1 7.5 2.7C19.5 15.4 12 20 12 20Z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/></svg>',
    ruler: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m3 17 14-14 4 4L7 21z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/></svg>',
    swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 8h13l-3-3M20 16H7l3 3"/></svg>',
    hanger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 7a2 2 0 1 1 2-2M12 7v2L3 16h18l-9-7"/></svg>',
  };

  /* ---------------- state: city, cart, favourites ---------------- */
  let city = store.get("dabro-city", null);
  if (!CITIES[city]) city = null;
  const C = () => CITIES[city || "astana"];

  const cart = {
    items: () => store.get("dabro-cart", []).filter(i => byId(i.id)),
    save(v) { store.set("dabro-cart", v); paintCounts(true); },
    add(id, size, qty = 1) {
      const v = this.items(), ex = v.find(i => i.id === id && i.size === size);
      ex ? ex.qty = Math.min(9, ex.qty + qty) : v.push({ id, size, qty });
      this.save(v);
    },
    count() { return this.items().reduce((s, i) => s + i.qty, 0); },
    total() { return this.items().reduce((s, i) => s + byId(i.id).price * i.qty, 0); },
  };
  let favs = store.get("dabro-favs", []);
  const toggleFav = id => { favs = favs.includes(id) ? favs.filter(x => x !== id) : [...favs, id]; store.set("dabro-favs", favs); return favs.includes(id); };

  /* ---------------- shell ---------------- */
  const sale = new URLSearchParams(location.search).get("sale") === "1";
  const navLinks = [
    ["catalog.html", "Каталог", (page === "catalog" && !sale) || page === "product"],
    ["catalog.html?sale=1", "Скидки", page === "catalog" && sale],
    ["index.html#how", "Как заказать", false],
    ["index.html#about", "О нас", false],
  ];
  function shell() {
    document.body.insertAdjacentHTML("afterbegin", `
      <header class="hdr"><div class="wrap hdr__in">
        <a href="index.html" class="logo" aria-label="DA BRO — на главную">DA<span>·</span>BRO</a>
        <nav class="nav" aria-label="Разделы">${navLinks.map(([h, t, on]) => `<a href="${h}" class="${on ? "on" : ""}" ${on ? 'aria-current="page"' : ""}>${t}</a>`).join("")}</nav>
        <div class="hdr__right">
          <button class="city-btn" data-city-open aria-label="Сменить город">${I.pin}<span data-city-name>${C().name}</span></button>
          <a href="catalog.html" class="icon-btn show-m ${page === "catalog" || page === "product" ? "on" : ""}" aria-label="Каталог">${I.grid}</a>
          <a href="catalog.html" class="icon-btn hide-m" aria-label="Поиск по каталогу">${I.search}</a>
          <a href="cart.html" class="cart-btn ${page === "cart" || page === "checkout" ? "on" : ""}" aria-label="Корзина">${I.bag}<span class="cart-btn__lbl">Корзина</span><span class="count" data-count></span></a>
        </div>
      </div></header>`);
    document.body.insertAdjacentHTML("beforeend", `
      <footer class="foot"><div class="wrap">
        <div class="foot__grid">
          <div><div class="logo" style="margin-bottom:12px">DA<span>·</span>BRO</div><p style="color:rgba(255,255,255,.6);max-width:34ch">Мужская одежда и обувь. Бутики в Астане и Уральске. Заказ через WhatsApp — менеджер подтвердит наличие и время.</p></div>
          <div><h4>Каталог</h4><ul><li><a href="catalog.html?cat=outerwear">Верхняя одежда</a></li><li><a href="catalog.html?cat=suits">Костюмы</a></li><li><a href="catalog.html?cat=shoes">Обувь</a></li><li><a href="catalog.html?sale=1">Скидки</a></li></ul></div>
          <div><h4>Покупателям</h4><ul><li><a href="index.html#how">Как заказать</a></li><li><a href="cart.html">Корзина</a></li></ul></div>
          <div><h4>Связь</h4><ul><li><a href="#" data-wa-general>WhatsApp</a></li><li><a href="#" onclick="return false">Instagram</a></li><li><a href="tel:+70000000000">+7 (000) 000-00-00</a></li></ul></div>
        </div>
        <div class="foot__base"><span>© 2026 DA BRO</span><span>Прототип: адреса, телефоны и фото — заглушки</span></div>
      </div></footer>`);
  }

  function paintCounts(pop) {
    const n = cart.count();
    $$("[data-count]").forEach(el => { el.textContent = n; el.dataset.n = n; if (pop) { el.classList.add("pop"); setTimeout(() => el.classList.remove("pop"), 300); } });
  }
  function paintCity() {
    $$("[data-city-name]").forEach(el => el.textContent = C().name);
    $$("[data-city-in]").forEach(el => el.textContent = C().in);
    $$("[data-city-stores]").forEach(el => { const n = C().stores.length; el.textContent = `${n} ${plural(n, ["бутик", "бутика", "бутиков"])}`; });
    document.dispatchEvent(new Event("city"));
  }

  /* ---------------- city sheet ---------------- */
  function citySheet(closable) {
    if ($(".sheet")) return;
    const el = document.createElement("div");
    el.className = "sheet"; el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true"); el.setAttribute("aria-labelledby", "city-h");
    el.innerHTML = `<div class="sheet__bg" ${closable ? "data-close" : ""}></div>
      <div class="sheet__box">
        ${closable ? `<button class="icon-btn sheet__x" data-close aria-label="Закрыть">${I.x}</button>` : ""}
        <div class="sheet__logo">DA·BRO</div>
        <h2 id="city-h">Выберите ваш город</h2>
        <p>Покажем наличие, бутики рядом и передадим заказ менеджеру вашего города.</p>
        ${Object.entries(CITIES).map(([k, c]) => `
          <button class="city-opt ${k === city ? "on" : ""}" data-pick="${k}">
            <img src="${c.img}" alt="">
            <span><b>${c.name}</b><small>${c.stores.length} ${plural(c.stores.length, ["бутик", "бутика", "бутиков"])} · ежедневно</small></span>
            ${I.chev}
          </button>`).join("")}
      </div>`;
    document.body.append(el); document.body.classList.add("lock");
    const close = () => { el.classList.add("closing"); setTimeout(() => { el.remove(); if (!$(".sheet")) document.body.classList.remove("lock"); }, 280); };
    el.addEventListener("click", e => {
      const b = e.target.closest("[data-pick]");
      if (b) { city = b.dataset.pick; store.set("dabro-city", city); paintCity(); close(); toast(`Город: ${C().name}`); }
      else if (e.target.closest("[data-close]")) close();
    });
    if (closable) el.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
    setTimeout(() => $(".city-opt", el)?.focus({ preventScroll: true }), 50);
  }

  /* ---------------- generic modal ---------------- */
  function modal(html) {
    const el = document.createElement("div");
    el.className = "sheet"; el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true");
    el.innerHTML = `<div class="sheet__bg" data-close></div><div class="sheet__box"><button class="icon-btn sheet__x" data-close aria-label="Закрыть">${I.x}</button>${html}</div>`;
    document.body.append(el); document.body.classList.add("lock");
    const close = () => { el.classList.add("closing"); setTimeout(() => { el.remove(); document.body.classList.remove("lock"); }, 280); };
    el.addEventListener("click", e => { if (e.target.closest("[data-close]")) close(); });
    el.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
    setTimeout(() => $("[data-close].icon-btn", el).focus(), 50);
  }
  const sizeGuide = () => modal(`<h2>Таблица размеров</h2><p>Если сомневаетесь — напишите нам, подберём по росту и весу.</p>
    <table class="sz"><tr><th>Размер</th><th>Межд.</th><th>Грудь, см</th><th>Талия, см</th></tr>
    <tr><td>46</td><td>S</td><td>92</td><td>80</td></tr><tr><td>48</td><td>M</td><td>96</td><td>84</td></tr>
    <tr><td>50</td><td>L</td><td>100</td><td>88</td></tr><tr><td>52</td><td>XL</td><td>104</td><td>92</td></tr>
    <tr><td>54</td><td>XXL</td><td>108</td><td>96</td></tr><tr><td>56</td><td>3XL</td><td>112</td><td>100</td></tr></table>`);

  /* ---------------- toast ---------------- */
  let tt;
  function toast(msg, link) {
    let el = $(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); document.body.append(el); }
    el.innerHTML = `<span>${msg}</span>${link ? `<a href="${link[0]}">${link[1]}</a>` : ""}`;
    requestAnimationFrame(() => el.classList.add("show"));
    clearTimeout(tt); tt = setTimeout(() => el.classList.remove("show"), 3200);
  }

  /* ---------------- WhatsApp ---------------- */
  const waUrl = text => `https://wa.me/${CONFIG.whatsapp[city || "astana"] || ""}?text=${encodeURIComponent(text)}`;
  const openWA = text => { const w = window.open(waUrl(text), "_blank", "noopener"); if (!w) location.href = waUrl(text); };

  /* ---------------- product card ---------------- */
  function card(p) {
    const imgs = p.img.map((id, k) => `<img src="${img(id, 600)}" alt="${k ? "" : esc(p.name)}" loading="lazy" onerror="this.outerHTML='<span class=card__ph>DA BRO</span>'">`).join("");
    const tag = p.old ? `<span class="card__tag sale">−${Math.round((1 - p.price / p.old) * 100)}%</span>` : p.tag ? `<span class="card__tag">${p.tag}</span>` : "";
    return `<article class="card">
      <a class="card__media" href="product.html?id=${p.id}" aria-label="${esc(p.name)}">
        ${tag}<div class="card__slides">${imgs}</div>
        ${p.img.length > 1 ? `<div class="card__dots">${p.img.map((_, k) => `<i class="${k ? "" : "on"}"></i>`).join("")}</div>` : ""}
      </a>
      <button class="card__fav ${favs.includes(p.id) ? "on" : ""}" data-fav="${p.id}" aria-label="В избранное" aria-pressed="${favs.includes(p.id)}">${I.heart}</button>
      <div class="card__body">
        <div class="card__price">${p.old ? `<span class="red">${fmt(p.price)}</span><s>${fmt(p.old)}</s>` : fmt(p.price)}</div>
        <a class="card__name" href="product.html?id=${p.id}">${esc(p.name)}</a>
        <div class="card__row">
          <span class="card__colors">${p.colors.map(c => `<i style="background:${COLORS[c]}" title="${COLOR_NAMES[c] || c}"></i>`).join("")}</span>
          <a class="card__add" href="product.html?id=${p.id}">${I.plus}Выбрать</a>
        </div>
      </div>
    </article>`;
  }
  // shared card behaviours
  document.addEventListener("click", e => {
    const f = e.target.closest("[data-fav]");
    if (f) { e.preventDefault(); const on = toggleFav(+f.dataset.fav); $$(`[data-fav="${f.dataset.fav}"]`).forEach(b => { b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); }); toast(on ? "Добавлено в избранное" : "Убрано из избранного"); }
    if (e.target.closest("[data-city-open]")) { e.preventDefault(); citySheet(true); }
    if (e.target.closest("[data-wa-general]")) { e.preventDefault(); openWA(`Здравствуйте! Пишу с сайта DA BRO (${C().name}). Хочу проконсультироваться.`); }
  });
  document.addEventListener("scroll", e => {
    const sl = e.target;
    if (!sl.classList || !sl.classList.contains("card__slides")) return;
    const i = Math.round(sl.scrollLeft / sl.clientWidth);
    sl.parentElement.querySelectorAll(".card__dots i").forEach((d, k) => d.classList.toggle("on", k === i));
  }, { capture: true, passive: true });

  /* ---------------- custom select (enhances <div class="cselect"><select>) ---------------- */
  function enhanceSelect(sel) {
    const box = sel.parentElement, id = (sel.id || "cs" + Math.random().toString(36).slice(2, 7)) + "-list";
    const label = sel.dataset.label;
    box.insertAdjacentHTML("beforeend", `
      <button type="button" class="cselect__btn" aria-haspopup="listbox" aria-expanded="false" aria-controls="${id}">
        ${label ? `<span class="lbl">${esc(label)}:</span>` : ""}<span class="val"></span>${I.down}
      </button>
      <ul class="cselect__list" role="listbox" id="${id}" tabindex="-1" aria-label="${esc(sel.getAttribute("aria-label") || label || "")}">
        ${[...sel.options].map((o, i) => `<li class="cselect__opt" role="option" id="${id}-${i}" aria-selected="false">${esc(o.text)}${I.check}</li>`).join("")}
      </ul>`);
    sel.tabIndex = -1; sel.setAttribute("aria-hidden", "true");
    const btn = $(".cselect__btn", box), list = $(".cselect__list", box), opts = $$(".cselect__opt", box);
    let active = sel.selectedIndex;
    const paint = () => {
      $(".val", btn).textContent = sel.options[sel.selectedIndex].text;
      opts.forEach((o, i) => { o.setAttribute("aria-selected", i === sel.selectedIndex); o.classList.toggle("active", i === active); });
      list.setAttribute("aria-activedescendant", opts[active].id);
    };
    const isOpen = () => box.classList.contains("open");
    const open = () => { $$(".cselect.open").forEach(b => b !== box && b.classList.remove("open")); box.classList.add("open"); btn.setAttribute("aria-expanded", "true"); active = sel.selectedIndex; paint(); list.focus({ preventScroll: true }); };
    const close = (focus = true) => { box.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); if (focus) btn.focus({ preventScroll: true }); };
    const choose = i => { if (sel.selectedIndex !== i) { sel.selectedIndex = i; sel.dispatchEvent(new Event("change", { bubbles: true })); } paint(); close(); };
    btn.addEventListener("click", () => isOpen() ? close() : open());
    btn.addEventListener("keydown", e => { if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) { e.preventDefault(); open(); } });
    list.addEventListener("keydown", e => {
      const n = opts.length;
      if (e.key === "ArrowDown") { e.preventDefault(); active = (active + 1) % n; paint(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); active = (active - 1 + n) % n; paint(); }
      else if (e.key === "Home") { e.preventDefault(); active = 0; paint(); }
      else if (e.key === "End") { e.preventDefault(); active = n - 1; paint(); }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(active); }
      else if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "Tab") close(false);
    });
    opts.forEach((o, i) => {
      o.addEventListener("mousemove", () => { if (active !== i) { active = i; paint(); } });
      o.addEventListener("click", () => choose(i));
    });
    document.addEventListener("click", e => { if (isOpen() && !box.contains(e.target)) close(false); });
    sel.addEventListener("change", paint);
    paint();
  }

  /* ---------------- reveal ---------------- */
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: .12 }) : null;
  const reveal = () => $$(".rv:not(.in)").forEach(el => io ? io.observe(el) : el.classList.add("in"));

  /* =========================================================
     PAGES
     ========================================================= */
  const pages = {
    home() {
      $("#new-row").innerHTML = PRODUCTS.filter(p => p.tag || p.old).concat(PRODUCTS.filter(p => !p.tag && !p.old)).slice(0, 10).map(card).join("");
      $$("[data-row]").forEach(b => b.addEventListener("click", () => { const r = $("#new-row"); r.scrollBy({ left: +b.dataset.row * r.clientWidth * .75, behavior: "smooth" }); }));
      const renderStores = () => {
        $("#stores-list").innerHTML = C().stores.map(s => `
          <article class="store rv">
            <div class="store__top"><span class="muted" style="font-size:14px">${C().name}</span><span class="badge-open">Открыто · ${s.hours}</span></div>
            <h3>${s.name}</h3><p>${s.addr}</p>
            <div class="store__btns">
              <button class="btn btn--wa btn--sm" data-store-wa="${s.id}">${I.wa}Написать</button>
              <a class="btn btn--light btn--sm" href="#" data-route>${I.pin}Маршрут</a>
            </div>
          </article>`).join("");
        reveal();
      };
      renderStores();
      document.addEventListener("city", renderStores);
      document.addEventListener("click", e => {
        const b = e.target.closest("[data-store-wa]");
        if (b) { const s = C().stores.find(x => x.id === b.dataset.storeWa); openWA(`Здравствуйте! Пишу с сайта DA BRO. Вопрос по бутику «${s.name}» (${C().name}).`); }
        if (e.target.closest("[data-route]")) { e.preventDefault(); toast("В рабочей версии откроется маршрут в 2ГИС"); }
      });
    },

    catalog() {
      const q = new URLSearchParams(location.search);
      const st = { cat: CATS[q.get("cat")] ? q.get("cat") : "all", sort: "pop", text: "", sale: q.get("sale") === "1" };
      const count = k => k === "all" ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === k).length;
      $("#chips").innerHTML = `<button class="chip" data-cat="sale">Скидки</button>` + Object.entries(CATS).map(([k, v]) => `<button class="chip" data-cat="${k}">${v} <small>${count(k)}</small></button>`).join("");
      const search = $("#q"), wrap = search.closest(".search");
      function render() {
        $$("#chips .chip").forEach(c => c.classList.toggle("on", st.sale ? c.dataset.cat === "sale" : c.dataset.cat === st.cat));
        let l = PRODUCTS.filter(p => (st.cat === "all" || p.cat === st.cat) && (!st.sale || p.old));
        if (st.text) { const t = st.text.toLowerCase(); l = l.filter(p => (p.name + " " + CATS[p.cat] + " " + p.desc).toLowerCase().includes(t)); }
        if (st.sort === "asc") l.sort((a, b) => a.price - b.price);
        if (st.sort === "desc") l.sort((a, b) => b.price - a.price);
        if (st.sort === "new") l.sort((a, b) => (b.tag === "Новинка") - (a.tag === "Новинка"));
        $("#title").textContent = st.sale ? "Скидки" : st.cat === "all" ? "Каталог" : CATS[st.cat];
        $("#found").textContent = `${l.length} ${plural(l.length, ["товар", "товара", "товаров"])}`;
        $("#grid").innerHTML = l.length ? l.map(card).join("") : `<div class="empty"><b>Ничего не нашли</b>Попробуйте другой запрос или категорию<br><button class="btn btn--light" data-reset>Сбросить фильтры</button></div>`;
        const url = new URL(location); url.searchParams.delete("cat"); url.searchParams.delete("sale");
        if (st.sale) url.searchParams.set("sale", "1"); else if (st.cat !== "all") url.searchParams.set("cat", st.cat);
        history.replaceState(null, "", url);
      }
      $("#chips").addEventListener("click", e => {
        const b = e.target.closest("[data-cat]"); if (!b) return;
        if (b.dataset.cat === "sale") { st.sale = !st.sale; st.cat = "all"; } else { st.sale = false; st.cat = b.dataset.cat; }
        b.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        render();
      });
      search.addEventListener("input", () => { st.text = search.value.trim(); wrap.classList.toggle("has", !!st.text); render(); });
      $("#q-clear").addEventListener("click", () => { search.value = ""; st.text = ""; wrap.classList.remove("has"); render(); search.focus(); });
      $("#sort").addEventListener("change", e => { st.sort = e.target.value; render(); });
      document.addEventListener("click", e => { if (e.target.closest("[data-reset]")) { st.cat = "all"; st.sale = false; st.text = ""; search.value = ""; wrap.classList.remove("has"); render(); } });
      render();
    },

    product() {
      const p = byId(new URLSearchParams(location.search).get("id")) || PRODUCTS[0];
      document.title = `${p.name} — DA BRO`;
      let size = p.sizes.length === 1 ? p.sizes[0] : null, color = p.colors[0];
      const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
      $("#crumb-cat").textContent = CATS[p.cat]; $("#crumb-cat").href = `catalog.html?cat=${p.cat}`;
      $("#crumb-name").textContent = p.name;
      $("#pp").innerHTML = `
        <div class="gallery ${p.img.length < 2 ? "single" : ""}">
          <div class="gallery__thumbs">${p.img.map((id, k) => `<button class="${k ? "" : "on"}" data-thumb="${k}" aria-label="Фото ${k + 1}"><img src="${img(id, 200)}" alt=""></button>`).join("")}</div>
          <div class="gallery__main">
            <div class="gallery__track" id="track" tabindex="0" aria-label="Фото товара">${p.img.map((id, k) => `<img src="${img(id, 1200)}" alt="${esc(p.name)}${k ? `, фото ${k + 1}` : ""}">`).join("")}</div>
            <button class="gallery__arrow prev" data-g="-1" aria-label="Предыдущее фото" disabled>${I.chevL}</button>
            <button class="gallery__arrow next" data-g="1" aria-label="Следующее фото">${I.chev}</button>
            <div class="gallery__dots">${p.img.map((_, k) => `<i class="${k ? "" : "on"}"></i>`).join("")}</div>
          </div>
        </div>
        <div class="info">
          <div class="info__cat">${CATS[p.cat]} · ${p.brand}</div>
          <h1>${esc(p.name)}</h1>
          <div class="info__price">${fmt(p.price)}${p.old ? `<s>${fmt(p.old)}</s><span class="off">−${off}%</span>` : ""}</div>
          <div class="info__stock">В наличии в&nbsp;<b data-city-in>${C().in}</b>&nbsp;· <span data-city-stores></span></div>
          ${p.colors.length > 1 ? `<div class="opt-h"><span>Цвет: <span id="color-name">${COLOR_NAMES[color]}</span></span></div>
          <div class="colors">${p.colors.map(c => `<button class="${c === color ? "on" : ""}" data-color="${c}" style="background:${COLORS[c]}" aria-label="${COLOR_NAMES[c]}"></button>`).join("")}</div>` : ""}
          <div class="opt-h"><span>Размер</span><button data-guide>Таблица размеров</button></div>
          <div class="sizes" id="sizes">${p.sizes.map(s => `<button ${p.out.includes(s) ? "disabled title='Нет в наличии'" : ""} class="${s === size ? "on" : ""}" data-size="${s}">${s}</button>`).join("")}</div>
          <div class="size-err" id="size-err" aria-live="polite"></div>
          <div class="buy">
            <button class="btn" id="add">${I.bag}Добавить в корзину</button>
            <button class="fav-big ${favs.includes(p.id) ? "on" : ""}" data-fav="${p.id}" aria-label="В избранное">${I.heart}</button>
            <button class="btn btn--wa" id="buy-wa">${I.wa}Купить сразу через WhatsApp</button>
          </div>
          <div class="acc">
            <details open><summary>Описание ${I.plus}</summary><p>${esc(p.desc)}</p></details>
            <details><summary>Получение и оплата ${I.plus}</summary><p>Самовывоз из бутика в день заказа или доставка по городу. Оплата Kaspi, картой или наличными при получении. Заказ подтверждает менеджер в WhatsApp.</p></details>
            <details><summary>Примерка и обмен ${I.plus}</summary><p>Примерьте в бутике перед оплатой. Обмен и возврат — 14 дней. Подгонка длины брюк и рукавов — бесплатно.</p></details>
          </div>
        </div>`;
      $("#sticky").innerHTML = `<div><b>${fmt(p.price)}</b><small id="sticky-size">${size ? "Размер " + size : "Выберите размер"}</small></div><button class="btn" id="add2">${I.bag}В корзину</button>`;
      $("#related").innerHTML = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).concat(PRODUCTS.filter(x => x.cat !== p.cat)).slice(0, 8).map(card).join("");
      paintCity();

      // gallery
      const track = $("#track"), N = p.img.length;
      const idx = () => Math.round(track.scrollLeft / track.clientWidth);
      const go = i => track.scrollTo({ left: Math.max(0, Math.min(N - 1, i)) * track.clientWidth, behavior: "smooth" });
      track.addEventListener("scroll", () => requestAnimationFrame(() => {
        const i = idx();
        $$(".gallery__dots i").forEach((d, k) => d.classList.toggle("on", k === i));
        $$("[data-thumb]").forEach((t, k) => t.classList.toggle("on", k === i));
        $(".gallery__arrow.prev").disabled = i <= 0; $(".gallery__arrow.next").disabled = i >= N - 1;
      }), { passive: true });
      $$("[data-g]").forEach(b => b.addEventListener("click", () => go(idx() + +b.dataset.g)));
      $$("[data-thumb]").forEach(b => b.addEventListener("click", () => go(+b.dataset.thumb)));
      track.addEventListener("keydown", e => { if (e.key === "ArrowRight") go(idx() + 1); if (e.key === "ArrowLeft") go(idx() - 1); });

      // options
      $$("[data-color]").forEach(b => b.addEventListener("click", () => { color = b.dataset.color; $$("[data-color]").forEach(x => x.classList.toggle("on", x === b)); $("#color-name").textContent = COLOR_NAMES[color]; }));
      $("#sizes").addEventListener("click", e => {
        const b = e.target.closest("[data-size]"); if (!b || b.disabled) return;
        size = b.dataset.size; $$("#sizes button").forEach(x => x.classList.toggle("on", x === b));
        $("#size-err").textContent = ""; $("#sticky-size").textContent = "Размер " + size;
      });
      $("[data-guide]").addEventListener("click", sizeGuide);
      const needSize = () => {
        if (size) return false;
        $("#size-err").textContent = "Выберите размер";
        const s = $("#sizes"); s.classList.remove("shake"); void s.offsetWidth; s.classList.add("shake");
        s.scrollIntoView({ behavior: "smooth", block: "center" });
        return true;
      };
      const add = () => { if (needSize()) return; cart.add(p.id, size); toast(`Добавлено: ${p.name}, ${size}`, ["cart.html", "В корзину"]); };
      $("#add").addEventListener("click", add);
      $("#add2").addEventListener("click", add);
      $("#buy-wa").addEventListener("click", () => {
        if (needSize()) return;
        openWA(`Здравствуйте! Хочу купить с сайта DA BRO:\n\n• ${p.name}\n  Размер: ${size}${p.colors.length > 1 ? `, цвет: ${COLOR_NAMES[color]}` : ""}\n  Цена: ${fmt(p.price)}\n\nГород: ${C().name}\nПодскажите, пожалуйста, наличие и как забрать.`);
      });

      // sticky bar (mobile) when main button scrolled away
      const sticky = $("#sticky"); document.body.classList.add("has-sticky");
      if ("IntersectionObserver" in window) new IntersectionObserver(([en]) => sticky.classList.toggle("show", !en.isIntersecting && en.boundingClientRect.top < 0), { threshold: 0 }).observe($("#add"));
    },

    cart() {
      function render() {
        const items = cart.items();
        if (!items.length) {
          $("#cart").innerHTML = `<div class="empty" style="padding:48px 0 80px"><b>Корзина пуста</b>Загляните в каталог — там много нового<br><a class="btn" href="catalog.html" style="margin-top:18px">Перейти в каталог</a></div>`;
          return;
        }
        const total = cart.total(), n = cart.count();
        $("#cart").innerHTML = `<div class="two-col">
          <div>${items.map((it, i) => { const p = byId(it.id); return `
            <div class="line">
              <a class="line__img" href="product.html?id=${p.id}"><img src="${img(p.img[0], 300)}" alt=""></a>
              <div><a class="line__name" href="product.html?id=${p.id}">${esc(p.name)}</a><div class="line__meta">Размер ${it.size} · ${fmt(p.price)}</div>
                <div class="qty"><button data-q="${i}" data-d="-1" ${it.qty <= 1 ? "disabled" : ""} aria-label="Меньше">−</button><span>${it.qty}</span><button data-q="${i}" data-d="1" ${it.qty >= 9 ? "disabled" : ""} aria-label="Больше">+</button></div>
              </div>
              <div class="line__right"><span class="line__price">${fmt(p.price * it.qty)}</span><button class="line__rm" data-rm="${i}">${I.trash}Удалить</button></div>
            </div>`; }).join("")}</div>
          <aside class="summary">
            <h3>Ваш заказ</h3>
            <div class="sum-row"><span>Товары (${n})</span><span>${fmt(total)}</span></div>
            <div class="sum-row"><span>Получение</span><span class="muted">на следующем шаге</span></div>
            <div class="sum-row total"><span>Итого</span><span>${fmt(total)}</span></div>
            <a class="btn btn--block" href="checkout.html">Оформить заказ ${I.arrow}</a>
            <div class="note">${I.info}<span>Заказ отправится менеджеру в WhatsApp — он подтвердит наличие и время. Оплата при получении.</span></div>
          </aside></div>`;
      }
      $("#cart").addEventListener("click", e => {
        const q = e.target.closest("[data-q]"), r = e.target.closest("[data-rm]"), v = cart.items();
        if (q) { const it = v[+q.dataset.q]; it.qty = Math.max(1, Math.min(9, it.qty + +q.dataset.d)); cart.save(v); render(); }
        if (r) { const [x] = v.splice(+r.dataset.rm, 1); cart.save(v); render(); toast(`Удалено: ${byId(x.id).name}`); }
      });
      render();
    },

    checkout() {
      const items = cart.items();
      if (!items.length) { $("#co").innerHTML = `<div class="empty" style="padding:48px 0 80px"><b>Корзина пуста</b>Добавьте товары, чтобы оформить заказ<br><a class="btn" href="catalog.html" style="margin-top:18px">В каталог</a></div>`; return; }
      const saved = store.get("dabro-contact", {});
      const total = cart.total();
      const deliv = () => ($("[name=get]:checked")?.value === "delivery" ? (total >= CONFIG.freeDeliveryFrom ? 0 : CONFIG.deliveryPrice) : 0);
      $("#co").innerHTML = `<form class="two-col" id="form" novalidate>
        <div>
          <fieldset class="fs"><legend><i>1</i>Контакты</legend>
            <div class="fields">
              <div class="field"><label for="f-name">Имя *</label><input id="f-name" name="name" autocomplete="given-name" value="${esc(saved.name || "")}" placeholder="Как к вам обращаться"><div class="msg">Укажите имя</div></div>
              <div class="field"><label for="f-phone">Телефон *</label><input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" value="${esc(saved.phone || "")}" placeholder="+7 (___) ___-__-__"><div class="msg">Введите номер полностью</div></div>
            </div>
          </fieldset>
          <fieldset class="fs"><legend><i>2</i>Получение · <span data-city-name>${C().name}</span></legend>
            <div class="opts opts--2">
              <label class="opt on"><input type="radio" name="get" value="pickup" checked><span class="dot"></span><span><b>Самовывоз из бутика</b><small>Сегодня, бесплатно</small></span></label>
              <label class="opt"><input type="radio" name="get" value="delivery"><span class="dot"></span><span><b>Доставка по городу</b><small>${total >= CONFIG.freeDeliveryFrom ? "Бесплатно" : fmt(CONFIG.deliveryPrice)} · 1–2 дня</small></span></label>
            </div>
            <div class="sub-opts" id="pickup-box"><div class="opts" id="stores-opts"></div></div>
            <div class="sub-opts hidden" id="delivery-box"><div class="field"><label for="f-addr">Адрес доставки *</label><input id="f-addr" name="addr" autocomplete="street-address" placeholder="Улица, дом, квартира"><div class="msg">Укажите адрес</div></div></div>
          </fieldset>
          <fieldset class="fs"><legend><i>3</i>Оплата</legend>
            <div class="opts">
              <label class="opt on"><input type="radio" name="pay" value="Kaspi" checked><span class="dot"></span><span><b>Kaspi</b><small>Перевод или QR при подтверждении заказа</small></span></label>
              <label class="opt"><input type="radio" name="pay" value="Картой при получении"><span class="dot"></span><span><b>Картой при получении</b><small>В бутике или курьеру</small></span></label>
              <label class="opt"><input type="radio" name="pay" value="Наличными при получении"><span class="dot"></span><span><b>Наличными при получении</b></span></label>
            </div>
          </fieldset>
          <fieldset class="fs"><legend><i>4</i>Комментарий</legend>
            <div class="field"><label for="f-note" class="sr">Комментарий</label><textarea id="f-note" name="note" placeholder="Например: нужна подгонка брюк, удобное время — после 18:00"></textarea></div>
          </fieldset>
        </div>
        <aside class="summary">
          <h3>Ваш заказ</h3>
          <div class="minis">${items.map(it => { const p = byId(it.id); return `<div class="mini"><img src="${img(p.img[0], 200)}" alt=""><span><b>${esc(p.name)}</b><small>Размер ${it.size} · ${it.qty} шт.</small></span><span class="p">${fmt(p.price * it.qty)}</span></div>`; }).join("")}</div>
          <div class="sum-row"><span>Товары</span><span>${fmt(total)}</span></div>
          <div class="sum-row"><span>Получение</span><span id="s-deliv">Бесплатно</span></div>
          <div class="sum-row total"><span>Итого</span><span id="s-total">${fmt(total)}</span></div>
          <button class="btn btn--wa btn--block" type="submit">${I.wa}Отправить заказ в WhatsApp</button>
          <div class="note">${I.info}<span>Откроется WhatsApp с готовым сообщением — останется нажать «Отправить». Менеджер подтвердит наличие и время.</span></div>
        </aside>
      </form>`;

      const renderStores = () => {
        $("#stores-opts").innerHTML = C().stores.map((s, i) => `<label class="opt ${i ? "" : "on"}"><input type="radio" name="store" value="${s.id}" ${i ? "" : "checked"}><span class="dot"></span><span><b>${s.name}</b><small>${s.addr} · ${s.hours}</small></span></label>`).join("");
      };
      renderStores();
      document.addEventListener("city", renderStores);

      const form = $("#form");
      const syncOpts = () => {
        $$(".opt", form).forEach(o => o.classList.toggle("on", $("input", o).checked));
        const del = $("[name=get]:checked").value === "delivery";
        $("#pickup-box").classList.toggle("hidden", del); $("#delivery-box").classList.toggle("hidden", !del);
        const d = deliv();
        $("#s-deliv").textContent = d ? fmt(d) : "Бесплатно";
        $("#s-total").textContent = fmt(total + d);
      };
      form.addEventListener("change", syncOpts);

      // phone mask +7 (XXX) XXX-XX-XX
      const phone = $("#f-phone");
      const maskPhone = v => {
        let d = v.replace(/\D/g, ""); if (d[0] === "8") d = "7" + d.slice(1); if (d && d[0] !== "7") d = "7" + d; d = d.slice(0, 11);
        const r = d.slice(1); let out = "+7";
        if (r.length) out += " (" + r.slice(0, 3); if (r.length >= 3) out += ")"; if (r.length > 3) out += " " + r.slice(3, 6);
        if (r.length > 6) out += "-" + r.slice(6, 8); if (r.length > 8) out += "-" + r.slice(8, 10);
        return d ? out : "";
      };
      phone.addEventListener("input", () => { phone.value = maskPhone(phone.value); });
      phone.addEventListener("focus", () => { if (!phone.value) phone.value = "+7 ("; });
      phone.addEventListener("blur", () => { if (phone.value.replace(/\D/g, "").length <= 1) phone.value = ""; });
      $$(".field input", form).forEach(i => i.addEventListener("input", () => i.closest(".field").classList.remove("err")));

      form.addEventListener("submit", e => {
        e.preventDefault();
        const name = $("#f-name").value.trim(), ph = phone.value, digits = ph.replace(/\D/g, "");
        const get = $("[name=get]:checked").value, addr = $("#f-addr").value.trim();
        const errs = [];
        if (!name) errs.push("#f-name"); if (digits.length !== 11) errs.push("#f-phone"); if (get === "delivery" && !addr) errs.push("#f-addr");
        errs.forEach(s => $(s).closest(".field").classList.add("err"));
        if (errs.length) { $(errs[0]).focus(); $(errs[0]).scrollIntoView({ behavior: "smooth", block: "center" }); return; }
        store.set("dabro-contact", { name, phone: ph });

        const num = "DB-" + String(Date.now()).slice(-5);
        const d = deliv(), sum = total + d;
        const s = C().stores.find(x => x.id === ($("[name=store]:checked") || {}).value) || C().stores[0];
        const lines = items.map((it, i) => { const p = byId(it.id); return `${i + 1}. ${p.name}\n   Размер ${it.size} × ${it.qty} — ${fmt(p.price * it.qty)}`; }).join("\n");
        const note = $("#f-note").value.trim();
        const text = `Здравствуйте! Новый заказ с сайта DA BRO\nЗаказ № ${num}\n\n${lines}\n\nТовары: ${fmt(total)}\n${get === "delivery" ? `Доставка: ${d ? fmt(d) : "бесплатно"}\n` : ""}Итого: ${fmt(sum)}\n\nГород: ${C().name}\nПолучение: ${get === "delivery" ? `доставка — ${addr}` : `самовывоз — ${s.name}`}\nОплата: ${$("[name=pay]:checked").value}\n\nИмя: ${name}\nТелефон: ${ph}${note ? `\nКомментарий: ${note}` : ""}`;

        openWA(text);
        cart.save([]);
        $("#stepper").innerHTML = `<i class="done">✓</i><span>Корзина</span><span class="sep"></span><i class="done">✓</i><span>Оформление</span><span class="sep"></span><i class="wa">3</i><b>WhatsApp</b>`;
        $("#co-head").classList.add("hidden");
        $("#co").innerHTML = `<div class="success">
          <div class="success__ic">${I.check}</div>
          <div class="success__num">Заказ № ${num}</div>
          <h1>Заказ передан в WhatsApp</h1>
          <p>Мы открыли WhatsApp с готовым сообщением. Нажмите «Отправить» — менеджер DA BRO в ${C().in} подтвердит наличие и время.</p>
          <div class="success__msg">${esc(text)}</div>
          <a class="btn btn--wa" href="${waUrl(text)}" target="_blank" rel="noopener">${I.wa}Открыть WhatsApp ещё раз</a>
          <a class="btn btn--light" href="catalog.html">Продолжить покупки</a>
        </div>`;
        scrollTo({ top: 0, behavior: "smooth" });
      });
      syncOpts();
    },
  };

  /* ---------------- boot ---------------- */
  shell();
  $$(".cselect > select").forEach(enhanceSelect);
  paintCounts();
  pages[page]?.();
  paintCity();
  reveal();
  if (!city) citySheet(false);
})();
