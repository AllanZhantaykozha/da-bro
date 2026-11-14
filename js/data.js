/* DA BRO — prototype data (replace with real data) */

/* WhatsApp numbers of each city's manager, digits only with country code, e.g. "77011234567".
   Leave empty in the prototype: WhatsApp then opens with the message and lets you pick a chat. */
const CONFIG = {
  whatsapp: { astana: "", uralsk: "" },
  freeDeliveryFrom: 50000,
  deliveryPrice: 1500,
};

const CITIES = {
  astana: {
    name: "Астана", in: "Астане", img: "assets/boutique.png",
    stores: [
      { id: "a1", name: "DA BRO · Левый берег", addr: "Торговый центр, 1 этаж (адрес уточняется)", hours: "10:00–22:00" },
      { id: "a2", name: "DA BRO · Правый берег", addr: "Торговый центр, 2 этаж (адрес уточняется)", hours: "10:00–22:00" },
      { id: "a3", name: "DA BRO · Есиль", addr: "Торговый центр, 1 этаж (адрес уточняется)", hours: "10:00–22:00" },
    ],
  },
  uralsk: {
    name: "Уральск", in: "Уральске", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&q=70&auto=format&fit=crop",
    stores: [
      { id: "u1", name: "DA BRO · Центр", addr: "Торговый центр, 1 этаж (адрес уточняется)", hours: "10:00–21:00" },
    ],
  },
};

const COLOR_NAMES = { black: "чёрный", graphite: "графит", camel: "кэмел", ivory: "молочный", navy: "тёмно-синий", brown: "коричневый", olive: "оливковый", grey: "серый", white: "белый" };

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

const COLORS = { black: "#111", graphite: "#3b3b3b", camel: "#b48a5a", ivory: "#efe8da", navy: "#1f2a3c", brown: "#5a3b26", olive: "#5b5a3c", grey: "#8c8c8c", white: "#fafafa" };
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
