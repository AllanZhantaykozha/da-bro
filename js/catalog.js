/* DA BRO — catalog (prototype data) */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const u = id => `https://images.unsplash.com/photo-${id}?w=900&q=80&auto=format&fit=crop`;

  const CATS = {
    all: "Все",
    outerwear: "Верхняя одежда",
    suits: "Костюмы",
    shirts: "Рубашки",
    knit: "Трикотаж",
    trousers: "Брюки",
    shoes: "Обувь",
    accessories: "Аксессуары",
  };

  const C = { black: "#111", graphite: "#3b3b3b", camel: "#b48a5a", ivory: "#efe8da", navy: "#1f2a3c", brown: "#5a3b26", olive: "#5b5a3c", grey: "#8c8c8c", white: "#fafafa" };
  const S = ["46", "48", "50", "52", "54", "56", "58"];
  const SH = ["40", "41", "42", "43", "44", "45"];

  const PRODUCTS = [
    { id: 1, cat: "outerwear", name: "Утеплённая парка из хлопка", brand: "DA BRO", price: 149000, tag: "Новинка", colors: ["olive", "black"], img: ["1544022613-e87ca75a784a", "1539533018447-63fcce2678e3"], sizes: S, out: ["58"], desc: "Плотный хлопковый твил, съёмный утеплитель, капюшон и четыре накладных кармана. Рассчитана на казахстанскую зиму." },
    { id: 2, cat: "outerwear", name: "Кожаная куртка", brand: "DA BRO Atelier", price: 165000, tag: "Бестселлер", colors: ["black"], img: ["1551028719-00167b16eac5", "1520975954732-35dd22299614"], sizes: S, out: ["46"], desc: "Мягкая натуральная кожа ягнёнка, косая молния, металлическая фурнитура матового оттенка." },
    { id: 3, cat: "outerwear", name: "Бомбер из технической ткани", brand: "DA BRO", price: 74000, old: 98000, tag: "−25%", colors: ["camel", "black"], img: ["1591047139829-d91aecb6caea", "1548126032-079a0fb0099d"], sizes: S, out: [], desc: "Лёгкий бомбер с трикотажными манжетами. Идеален для межсезонья и как слой под пальто." },
    { id: 4, cat: "suits", name: "Костюм-двойка из шерсти", brand: "DA BRO Atelier", price: 245000, tag: "Бестселлер", colors: ["navy", "graphite"], img: ["1617137968427-85924c800a22", "1507679799987-c73779587ccf"], sizes: S, out: [], desc: "Итальянская шерсть Super 120's, однобортный пиджак на двух пуговицах, брюки со стрелками. Подгонка в бутике." },
    { id: 5, cat: "suits", name: "Костюм-тройка в клетку", brand: "DA BRO Atelier", price: 289000, tag: "Новинка", colors: ["navy"], img: ["1594938298603-c8148c4dae35", "1507679799987-c73779587ccf"], sizes: S, out: ["56", "58"], desc: "Пиджак, жилет и брюки из шерстяной ткани в деликатную клетку. Для свадеб, торжеств и важных встреч." },
    { id: 6, cat: "suits", name: "Пиджак приталенный", brand: "DA BRO", price: 138000, colors: ["black"], img: ["1617127365659-c47fa864d8bc", "1610652492500-ded49ceeb378"], sizes: S, out: [], desc: "Мягкое плечо, лёгкая полуподкладка, узкий лацкан. Сочетается с брюками и с джинсами." },
    { id: 7, cat: "shirts", name: "Рубашка из египетского хлопка", brand: "DA BRO", price: 42000, colors: ["white", "ivory"], img: ["1603252109303-2751441dd157", "1620012253295-c15cc3e65df4"], sizes: ["S", "M", "L", "XL", "XXL"], out: [], desc: "Поплин высокой плотности, воротник кент, перламутровые пуговицы." },
    { id: 8, cat: "shirts", name: "Джинсовая рубашка", brand: "DA BRO", price: 39000, colors: ["navy"], img: ["1596755094514-f87e34085b2c", "1602810318383-e386cc2a3ccf"], sizes: ["S", "M", "L", "XL", "XXL"], out: ["S"], desc: "Мягкий выстиранный деним, два нагрудных кармана, прямой крой." },
    { id: 9, cat: "knit", name: "Свитшот из плотного хлопка", brand: "DA BRO", price: 34000, old: 42000, tag: "−20%", colors: ["black", "graphite"], img: ["1614975059251-992f11792b9f"], sizes: ["S", "M", "L", "XL", "XXL"], out: [], desc: "Петельчатый хлопок 380 г/м², свободная посадка, рубчатые манжеты." },
    { id: 10, cat: "trousers", name: "Брюки со стрелками", brand: "DA BRO Atelier", price: 58000, colors: ["black", "graphite"], img: ["1624378439575-d8705ad7ae80"], sizes: S, out: [], desc: "Шерстяной габардин, высокая посадка, заутюженные стрелки. Подгоним длину." },
    { id: 11, cat: "trousers", name: "Чиносы прямого кроя", brand: "DA BRO", price: 36000, colors: ["camel", "navy", "olive"], img: ["1473966968600-fa801b869a1a", "1593030761757-71fae45fa0e7"], sizes: S, out: ["46"], desc: "Хлопковый твил с небольшим добавлением эластана для комфорта." },
    { id: 12, cat: "trousers", name: "Джинсы прямого кроя", brand: "DA BRO", price: 44000, colors: ["navy", "black"], img: ["1638247025967-b4e38f787b76", "1593030761757-71fae45fa0e7"], sizes: S, out: [], desc: "Японский деним 13 oz, классическая пятикарманка, без потёртостей." },
    { id: 13, cat: "shoes", name: "Монки из гладкой кожи", brand: "DA BRO", price: 89000, tag: "Новинка", colors: ["brown", "black"], img: ["1533867617858-e7b97e060509", "1614252235316-8c857d38b5f4"], sizes: SH, out: ["45"], desc: "Кожа телёнка, две пряжки, кожаная подошва с резиновой вставкой, ручная полировка." },
    { id: 14, cat: "shoes", name: "Кожаные ботинки на зимней подошве", brand: "DA BRO", price: 112000, colors: ["brown"], img: ["1608256246200-53e635b5b65f", "1614252235316-8c857d38b5f4"], sizes: SH, out: [], desc: "Натуральная кожа, утеплённая подкладка, протектор для снега и льда." },
    { id: 15, cat: "shoes", name: "Кеды из замши", brand: "DA BRO", price: 64000, colors: ["camel", "ivory"], img: ["1549298916-b41d501d3772", "1525966222134-fcfa99b8ae77"], sizes: SH, out: ["40"], desc: "Мягкая замша, белая подошва, минималистичный силуэт." },
    { id: 16, cat: "accessories", name: "Кожаный ремень", brand: "DA BRO", price: 24000, colors: ["brown", "black"], img: ["1624222247344-550fb60583dc"], sizes: ["90", "95", "100", "105"], out: [], desc: "Цельная полоса кожи растительного дубления, латунная пряжка." },
    { id: 17, cat: "accessories", name: "Портмоне из кожи", brand: "DA BRO Atelier", price: 29000, colors: ["brown"], img: ["1627123424574-724758594e93"], sizes: ["One size"], out: [], desc: "Кожа растительного дубления, восемь отделений для карт, подарочная коробка." },
  ];

  const fmt = n => n.toLocaleString("ru-RU").replace(/,/g, " ") + " ₸";
  const grid = $("#grid"), count = $("#count");
  const params = new URLSearchParams(location.search);
  let state = { cat: CATS[params.get("cat")] ? params.get("cat") : "all", sort: "default" };
  let favs = [];
  try { favs = JSON.parse(localStorage.getItem("dabro-favs") || "[]"); } catch (e) {}

  const img = (id, cls, alt) => `<img class="${cls}" src="${u(id)}" alt="${alt}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'ph',textContent:'DA BRO'}))">`;

  /* filters */
  const filters = $("#filters");
  filters.innerHTML = Object.entries(CATS).map(([k, v]) => {
    const n = k === "all" ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === k).length;
    return `<button class="chip${k === state.cat ? " is-active" : ""}" data-cat="${k}">${v}<sup>${n}</sup></button>`;
  }).join("");
  filters.addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    state.cat = b.dataset.cat;
    $$(".chip", filters).forEach(c => c.classList.toggle("is-active", c === b));
    b.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    const url = new URL(location); state.cat === "all" ? url.searchParams.delete("cat") : url.searchParams.set("cat", state.cat);
    history.replaceState(null, "", url);
    render();
  });
  $("#sort").addEventListener("change", e => { state.sort = e.target.value; render(); });
  $$(".view-toggle button").forEach(b => b.addEventListener("click", () => {
    $$(".view-toggle button").forEach(x => x.classList.toggle("is-active", x === b));
    grid.classList.toggle("is-large", b.dataset.view === "large");
  }));

  function list() {
    let l = PRODUCTS.filter(p => state.cat === "all" || p.cat === state.cat);
    if (state.sort === "asc") l = [...l].sort((a, b) => a.price - b.price);
    if (state.sort === "desc") l = [...l].sort((a, b) => b.price - a.price);
    if (state.sort === "new") l = [...l].sort((a, b) => (b.tag === "Новинка") - (a.tag === "Новинка"));
    return l;
  }

  function render() {
    const l = list();
    count.textContent = `${l.length} ${plural(l.length, ["модель", "модели", "моделей"])}`;
    $("#page-title-cat").textContent = state.cat === "all" ? "Вся коллекция" : CATS[state.cat];
    grid.innerHTML = l.length ? l.map((p, i) => `
      <article class="card" style="animation-delay:${Math.min(i, 8) * 0.06}s">
        <div class="card__media" data-open="${p.id}" role="button" tabindex="0" aria-label="Быстрый просмотр: ${p.name}">
          ${p.tag ? `<span class="card__tag${p.old ? " card__tag--sale" : ""}">${p.tag}</span>` : ""}
          ${img(p.img[0], "main", p.name)}
          ${p.img[1] ? img(p.img[1], "alt", "") : ""}
          <button class="card__quick" data-open="${p.id}">Быстрый просмотр</button>
        </div>
        <button class="card__fav${favs.includes(p.id) ? " is-on" : ""}" data-fav="${p.id}" aria-label="В избранное">
          <svg viewBox="0 0 24 24" stroke-width="1.4"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>
        </button>
        <div class="card__info">
          <div>
            <div class="card__brand">${p.brand}</div>
            <h3 class="card__name">${p.name}</h3>
            <div class="card__colors">${p.colors.map(c => `<i style="background:${C[c]}" title="${c}"></i>`).join("")}</div>
          </div>
          <div class="card__price">${fmt(p.price)}${p.old ? `<s>${fmt(p.old)}</s>` : ""}</div>
        </div>
      </article>`).join("") : `<div class="empty"><p class="lead">В этой категории пока пусто</p></div>`;
  }
  const plural = (n, f) => f[(n % 10 === 1 && n % 100 !== 11) ? 0 : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? 1 : 2];

  grid.addEventListener("click", e => {
    const fav = e.target.closest("[data-fav]");
    if (fav) {
      const id = +fav.dataset.fav;
      favs = favs.includes(id) ? favs.filter(x => x !== id) : [...favs, id];
      try { localStorage.setItem("dabro-favs", JSON.stringify(favs)); } catch (e) {}
      fav.classList.toggle("is-on");
      if (favs.includes(id)) dabroToast("Добавлено в избранное");
      return;
    }
    const o = e.target.closest("[data-open]");
    if (o) open(+o.dataset.open);
  });
  grid.addEventListener("keydown", e => { if (e.key === "Enter" && e.target.matches(".card__media")) open(+e.target.dataset.open); });

  /* quick view */
  const modal = $("#modal");
  let cur = null, size = null, lastFocus = null;
  function open(id) {
    cur = PRODUCTS.find(p => p.id === id); size = null;
    lastFocus = document.activeElement;
    $("#m-brand").textContent = `${cur.brand} · ${CATS[cur.cat]}`;
    $("#m-name").textContent = cur.name;
    $("#m-price").innerHTML = fmt(cur.price) + (cur.old ? `<s>${fmt(cur.old)}</s>` : "");
    $("#m-desc").textContent = cur.desc;
    $("#m-img").src = u(cur.img[0]); $("#m-img").alt = cur.name;
    $("#m-thumbs").innerHTML = cur.img.length < 2 ? "" : cur.img.map((im, i) => `<button class="${i ? "" : "is-active"}" data-src="${u(im)}" aria-label="Фото ${i + 1}"><img src="${u(im)}" alt=""></button>`).join("");
    $("#m-sizes").innerHTML = cur.sizes.map(s => `<button class="size" ${cur.out.includes(s) ? "disabled" : ""}>${s}</button>`).join("");
    if (cur.sizes.length === 1) { size = cur.sizes[0]; $("#m-sizes .size").classList.add("is-active"); }
    modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    setTimeout(() => $(".modal__close").focus(), 50);
  }
  function close() {
    modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    lastFocus?.focus?.();
  }
  $("#m-thumbs").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    $$("#m-thumbs button").forEach(x => x.classList.toggle("is-active", x === b));
    const m = $("#m-img"); m.style.opacity = 0;
    setTimeout(() => { m.src = b.dataset.src; m.style.opacity = 1; }, 200);
  });
  $("#m-img").style.transition = "opacity .3s";
  $("#m-sizes").addEventListener("click", e => {
    const b = e.target.closest(".size"); if (!b || b.disabled) return;
    size = b.textContent;
    $$("#m-sizes .size").forEach(x => x.classList.toggle("is-active", x === b));
  });
  $("#m-add").addEventListener("click", () => {
    if (!size) { const s = $("#m-sizes"); s.classList.remove("shake"); void s.offsetWidth; s.classList.add("shake"); dabroToast("Выберите размер"); return; }
    const items = dabroBag.get();
    const ex = items.find(i => i.id === cur.id && i.size === size);
    ex ? ex.qty++ : items.push({ id: cur.id, size, qty: 1 });
    dabroBag.set(items); dabroBag.paint(true);
    close(); dabroToast(`«${cur.name}», размер ${size} — в корзине`);
    renderBag();
  });
  $("#m-wa").addEventListener("click", () => dabroToast("В рабочей версии откроется чат WhatsApp с менеджером"));
  $$("[data-close]", modal).forEach(b => b.addEventListener("click", close));

  /* bag drawer */
  const drawer = $("#drawer");
  function renderBag() {
    const items = dabroBag.get();
    const box = $("#bag-items");
    if (!items.length) {
      box.innerHTML = `<div class="drawer__empty"><p class="lead">Корзина пуста</p><p>Добавьте вещи из каталога</p></div>`;
      $("#bag-total").textContent = fmt(0); return;
    }
    let total = 0;
    box.innerHTML = items.map((it, i) => {
      const p = PRODUCTS.find(x => x.id === it.id); if (!p) return "";
      total += p.price * it.qty;
      return `<div class="line">
        <img src="${u(p.img[0])}" alt="">
        <div><div class="line__name">${p.name}</div><div class="line__meta">Размер ${it.size} · ${it.qty} шт.</div><button class="line__rm" data-rm="${i}">Удалить</button></div>
        <div class="line__price">${fmt(p.price * it.qty)}</div></div>`;
    }).join("");
    $("#bag-total").textContent = fmt(total);
  }
  const openBag = e => { e?.preventDefault(); renderBag(); drawer.classList.add("is-open"); document.body.classList.add("is-locked"); };
  const closeBag = () => { drawer.classList.remove("is-open"); document.body.classList.remove("is-locked"); };
  $$("[data-bag]").forEach(b => b.addEventListener("click", openBag));
  $$("[data-close-bag]").forEach(b => b.addEventListener("click", closeBag));
  $("#bag-items").addEventListener("click", e => {
    const b = e.target.closest("[data-rm]"); if (!b) return;
    const items = dabroBag.get(); items.splice(+b.dataset.rm, 1); dabroBag.set(items); renderBag();
  });
  $("#checkout").addEventListener("click", () => dabroToast("Прототип: здесь будет оформление заказа и выбор бутика"));

  addEventListener("keydown", e => { if (e.key === "Escape") { if (modal.classList.contains("is-open")) close(); if (drawer.classList.contains("is-open")) closeBag(); } });

  render();
})();
