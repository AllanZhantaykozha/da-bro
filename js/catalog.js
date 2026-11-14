/* DA BRO v2 — catalog (prototype data) */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const u = (id, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=78&auto=format&fit=crop`;

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
  const grid = $("#pgrid");
  const params = new URLSearchParams(location.search);
  const state = { cat: CATS[params.get("cat")] ? params.get("cat") : "all", sort: "default" };
  let favs = [];
  try { favs = JSON.parse(localStorage.getItem("dabro-favs") || "[]"); } catch (e) {}
  const count = k => k === "all" ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === k).length;
  const imgTag = (id, cls, alt) => `<img class="${cls}" src="${u(id)}" alt="${alt}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'pc__ph',textContent:'DA BRO'}))">`;

  /* ---------- filters (sidebar + mobile chips) ---------- */
  $("#cats-list").innerHTML = Object.entries(CATS).map(([k, v]) => `<button data-cat="${k}">${v}<span>${count(k)}</span></button>`).join("");
  $("#chips").innerHTML = Object.entries(CATS).map(([k, v]) => `<button data-cat="${k}">${v}</button>`).join("");
  function setCat(k) {
    state.cat = k;
    $$("[data-cat]").forEach(b => b.classList.toggle("on", b.dataset.cat === k));
    const url = new URL(location); k === "all" ? url.searchParams.delete("cat") : url.searchParams.set("cat", k);
    history.replaceState(null, "", url);
    $("#cat-title").textContent = k === "all" ? "Каталог" : CATS[k];
    render();
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-cat]"); if (!b) return;
    setCat(b.dataset.cat);
    if (b.closest("#chips")) b.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    else scrollTo({ top: Math.min(scrollY, $(".shop").offsetTop - 100), behavior: "smooth" });
  });
  $$("[data-sort]").forEach(b => b.addEventListener("click", () => {
    state.sort = b.dataset.sort;
    $$("[data-sort]").forEach(x => x.classList.toggle("on", x === b));
    render();
  }));

  function list() {
    let l = PRODUCTS.filter(p => state.cat === "all" || p.cat === state.cat);
    if (state.sort === "asc") l = [...l].sort((a, b) => a.price - b.price);
    if (state.sort === "desc") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }

  function render() {
    const l = list();
    $("#cat-count").textContent = l.length;
    grid.innerHTML = l.map((p, i) => `
      <article class="pc" style="animation-delay:${Math.min(i, 9) * .05}s">
        <div class="pc__media" data-open="${p.id}" role="button" tabindex="0" aria-label="Открыть: ${p.name}">
          ${p.tag ? `<span class="pc__tag${p.old ? " sale" : ""}">${p.tag}</span>` : ""}
          <div class="pc__slides">
            ${imgTag(p.img[0], "a", p.name)}
            ${p.img[1] ? imgTag(p.img[1], "b", `${p.name}, фото 2`) : ""}
          </div>
          ${p.img.length > 1 ? `<div class="pc__pager">${p.img.map((_, k) => `<i class="${k ? "" : "on"}"></i>`).join("")}</div>` : ""}
          <div class="pc__quick" data-stop>
            <small>Быстро в корзину</small>
            <div class="pc__sizes">${p.sizes.map(s => `<button data-quick="${p.id}" data-size="${s}" ${p.out.includes(s) ? "disabled" : ""}>${s}</button>`).join("")}</div>
          </div>
        </div>
        <button class="pc__fav${favs.includes(p.id) ? " on" : ""}" data-fav="${p.id}" aria-label="В избранное"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg></button>
        <div class="pc__info">
          <span class="pc__cat">${CATS[p.cat]}</span>
          <h3 class="pc__name">${p.name}</h3>
          <span class="pc__price">${fmt(p.price)}${p.old ? `<s>${fmt(p.old)}</s>` : ""}</span>
          <span class="pc__dots">${p.colors.map(c => `<i style="background:${C[c]}"></i>`).join("")}</span>
        </div>
      </article>`).join("");
  }

  function addToBag(p, size) {
    const items = bag.get();
    const ex = items.find(i => i.id === p.id && i.size === size);
    ex ? ex.qty++ : items.push({ id: p.id, size, qty: 1 });
    bag.set(items);
    toast(`${p.name} · ${size} — в корзине`);
  }

  grid.addEventListener("click", e => {
    const q = e.target.closest("[data-quick]");
    if (q) { e.stopPropagation(); addToBag(PRODUCTS.find(p => p.id === +q.dataset.quick), q.dataset.size); return; }
    if (e.target.closest("[data-stop]")) return;
    const f = e.target.closest("[data-fav]");
    if (f) {
      const id = +f.dataset.fav;
      favs = favs.includes(id) ? favs.filter(x => x !== id) : [...favs, id];
      try { localStorage.setItem("dabro-favs", JSON.stringify(favs)); } catch (er) {}
      f.classList.toggle("on", favs.includes(id));
      if (favs.includes(id)) toast("Добавлено в избранное", "♥");
      return;
    }
    const o = e.target.closest("[data-open]");
    if (o) openProduct(+o.dataset.open);
  });
  grid.addEventListener("keydown", e => { if (e.key === "Enter" && e.target.matches("[data-open]")) openProduct(+e.target.dataset.open); });

  /* ---------- panels ---------- */
  let lastFocus = null;
  const openPanel = p => { lastFocus = document.activeElement; p.classList.add("open"); p.setAttribute("aria-hidden", "false"); document.body.classList.add("lock"); setTimeout(() => $(".panel__x", p).focus({ preventScroll: true }), 60); };
  const closePanel = p => { p.classList.remove("open"); p.setAttribute("aria-hidden", "true"); if (!$(".panel.open")) document.body.classList.remove("lock"); lastFocus?.focus?.({ preventScroll: true }); };
  $$(".panel").forEach(p => $$("[data-x]", p).forEach(b => b.addEventListener("click", () => closePanel(p))));
  addEventListener("keydown", e => { if (e.key === "Escape") $$(".panel.open").forEach(closePanel); });

  /* product view */
  const pv = $("#pv");
  let cur = null, size = null;
  function openProduct(id) {
    cur = PRODUCTS.find(p => p.id === id); size = cur.sizes.length === 1 ? cur.sizes[0] : null;
    $("#pv-gal").innerHTML = cur.img.map((im, k) => `<img src="${u(im, 1100)}" alt="${cur.name}${k ? `, фото ${k + 1}` : ""}">`).join("");
    $("#pv-gal").scrollLeft = 0;
    $("#pv-galwrap").classList.toggle("single", cur.img.length < 2);
    $("#pv-pager").innerHTML = cur.img.map((_, k) => `<i class="${k ? "" : "on"}"></i>`).join("");
    syncGal();
    $("#pv-cat").textContent = `${cur.brand} · ${CATS[cur.cat]}`;
    $("#pv-name").textContent = cur.name;
    $("#pv-price").innerHTML = fmt(cur.price) + (cur.old ? `<s>${fmt(cur.old)}</s>` : "");
    $("#pv-desc").textContent = cur.desc;
    $("#pv-sizes").innerHTML = cur.sizes.map(s => `<button class="${s === size ? "on" : ""}" ${cur.out.includes(s) ? "disabled" : ""}>${s}</button>`).join("");
    const c = dabro.cityData();
    $("#pv-stock").innerHTML = `<i></i><span>В наличии в ${dabro.city === "uralsk" ? "Уральске" : "Астане"} — ${dabro.storesWord(c.stores.length)}. Можно забронировать примерку.</span>`;
    pv.querySelector(".panel__box").scrollTop = 0;
    openPanel(pv);
  }
  /* gallery: swipe, arrows, dots */
  const gal = $("#pv-gal");
  const step = () => (gal.querySelector("img")?.offsetWidth || gal.clientWidth) + 8;
  function syncGal() {
    const n = gal.children.length, idx = Math.min(n - 1, Math.round(gal.scrollLeft / step()));
    $$("#pv-pager i").forEach((d, k) => d.classList.toggle("on", k === idx));
    const max = gal.scrollWidth - gal.clientWidth - 2;
    $(".pv__nav.prev").disabled = gal.scrollLeft <= 2;
    $(".pv__nav.next").disabled = gal.scrollLeft >= max;
  }
  gal.addEventListener("scroll", () => requestAnimationFrame(syncGal), { passive: true });
  $$("[data-gal]").forEach(b => b.addEventListener("click", () => gal.scrollBy({ left: +b.dataset.gal * step(), behavior: "smooth" })));
  gal.addEventListener("keydown", e => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); gal.scrollBy({ left: (e.key === "ArrowRight" ? 1 : -1) * step(), behavior: "smooth" }); } });
  gal.tabIndex = 0;

  /* card photo swipe (touch): keep dots in sync */
  grid.addEventListener("scroll", e => {
    const sl = e.target; if (!sl.classList || !sl.classList.contains("pc__slides")) return;
    const idx = Math.round(sl.scrollLeft / sl.clientWidth);
    sl.parentElement.querySelectorAll(".pc__pager i").forEach((d, k) => d.classList.toggle("on", k === idx));
  }, { passive: true, capture: true });

  $("#pv-sizes").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b || b.disabled) return;
    size = b.textContent;
    $$("#pv-sizes button").forEach(x => x.classList.toggle("on", x === b));
  });
  $("#pv-add").addEventListener("click", () => {
    if (!size) { const s = $("#pv-sizes"); s.classList.remove("shake"); void s.offsetWidth; s.classList.add("shake"); toast("Сначала выберите размер", "!"); return; }
    addToBag(cur, size); closePanel(pv);
  });
  $("#pv-try").addEventListener("click", () => toast(`Прототип: здесь будет бронь примерки в ${dabro.city === "uralsk" ? "Уральске" : "Астане"}`, "i"));

  /* bag */
  const bp = $("#bagp");
  function renderBag() {
    const items = bag.get(), box = $("#bag-items");
    let total = 0;
    box.innerHTML = items.length ? items.map((it, i) => {
      const p = PRODUCTS.find(x => x.id === it.id); if (!p) return "";
      total += p.price * it.qty;
      return `<div class="bl"><img src="${u(p.img[0], 300)}" alt=""><div><div class="bl__n">${p.name}</div><div class="bl__m">Размер ${it.size} · ${it.qty} шт.</div><button class="bl__rm" data-rm="${i}">Удалить</button></div><div class="bl__p">${fmt(p.price * it.qty)}</div></div>`;
    }).join("") : `<div class="bag__empty"><b>Пусто</b>Добавьте вещи из каталога</div>`;
    $("#bag-total").textContent = fmt(total);
  }
  $("#bag-items").addEventListener("click", e => {
    const b = e.target.closest("[data-rm]"); if (!b) return;
    const items = bag.get(); items.splice(+b.dataset.rm, 1); bag.set(items); renderBag();
  });
  $$(".bag-btn").forEach(b => b.addEventListener("click", e => { e.preventDefault(); renderBag(); openPanel(bp); }));
  $("#checkout").addEventListener("click", () => toast(`Прототип: оформление и выбор бутика в ${dabro.city === "uralsk" ? "Уральске" : "Астане"}`, "i"));
  if (location.hash === "#bag") { renderBag(); setTimeout(() => openPanel(bp), 300); history.replaceState(null, "", location.pathname + location.search); }

  setCat(state.cat);
})();
