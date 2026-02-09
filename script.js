const PRODUCTS = [
  { id: 1, name: "Brownies", price: 50, desc: "Rich, gooey chocolate squares with a crackly top.", image: "static/images/brow.jpg" },
  { id: 2, name: "Golden Blondies", price: 50, desc: "Buttery, butterscotch-flavored treats with white chocolate chips.", image: "static/images/gold_brow.jpg" },
  { id: 3, name: "Handcrafted Chocolates", price: 20, desc: "Assorted artisanal truffles and dark chocolate pralines.", image: "static/images/chocolates.jpg" },
  { id: 4, name: "Cookies", price: 10, desc: "Classic chocolate chip cookies, baked until golden and chewy.", image: "static/images/cook.jpg" },
  { id: 5, name: "Classic Bun Maska", price: 25, desc: "Soft, fluffy buns served with a generous layer of fresh butter.", image: "static/images/bun_maska.jpg" },
  { id: 6, name: "Tres Leches Cake", price: 100, desc: "Sponge cake soaked in three kinds of milk, topped with whipped cream.", image: "static/images/cake.jpg" },
  { id: 7, name: "Tiramisu", price: 200, desc: "Italian coffee-flavored dessert with layers of mascarpone cheese.", image: "static/images/tiramisu.jpg" },
  { id: 8, name: "Jar Cakes", price: 150, desc: "Layers of cake and frosting served in a convenient, portable jar.", image: "static/images/jar_cakes.jpg" },
  { id: 9, name: "Italian Bomboloni", price: 100, desc: "Soft, sugar-coated Italian doughnuts filled with custard or Nutella.", image: "static/images/bomboloni.jpg" },
  { id: 10, name: "Sweet Ladoo", price: 10, desc: "Traditional Indian sweets made with gram flour, ghee, and sugar.", image: "static/images/image.png" },
  { id: 11, name: "Custom Chocolate Bar", price: 300, desc: "Personalized chocolate bars with custom messages or designs.", image: "static/images/custom_chocolate.jpeg" }
];

const CART_KEY = "moonlight_cart";
const ORDER_KEY = "moonlight_last_order";

const loadCart = () => JSON.parse(localStorage.getItem(CART_KEY) || "[]");
const saveCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));

const updateCartCount = () => {
  const cart = loadCart();
  const countEls = document.querySelectorAll("#cart-count");
  countEls.forEach((el) => (el.textContent = cart.length));
};

const addToCart = (id) => {
  const cart = loadCart();
  cart.push(id);
  saveCart(cart);
  updateCartCount();
};

const getCartItems = () => {
  const cart = loadCart();
  return cart.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
};

const renderProducts = () => {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map((item) => `
    <div class="card-bg rounded-2xl border border-gray-200 hover:border-gold transition-all duration-300 group overflow-hidden shadow-lg">
      <div class="relative h-56 overflow-hidden">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full max-w-[800px] mx-auto object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100">
        <div class="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent"></div>
      </div>
      <div class="p-6">
        <h4 class="text-xl font-bold mb-2 group-hover:gold-accent transition-colors">${item.name}</h4>
        <p class="text-sm mb-6 opacity-80">${item.desc}</p>
        <div class="flex justify-between items-center border-t border-gray-200 pt-4">
          <span class="text-2xl font-bold gold-accent">₹${item.price}</span>
          <button data-id="${item.id}" class="accent-btn px-6 py-2 rounded-full font-bold text-xs uppercase hover:opacity-90 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll("button[data-id]").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.id)));
  });
};

const renderCart = () => {
  const itemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const emptyEl = document.getElementById("empty-cart");
  if (!itemsEl || !totalEl) return;

  const items = getCartItems();
  const total = items.reduce((sum, item) => sum + item.price, 0);

  if (items.length === 0) {
    emptyEl?.classList.remove("hidden");
    itemsEl.innerHTML = "";
  } else {
    emptyEl?.classList.add("hidden");
    itemsEl.innerHTML = items.map((item) => `
      <div class="flex justify-between border-b border-gray-200 py-2">
        <span>${item.name}</span>
        <span>₹${item.price}</span>
      </div>
    `).join("");
  }

  totalEl.textContent = total;
};

const renderCheckout = () => {
  const totalEl = document.getElementById("checkout-total");
  const form = document.getElementById("checkout-form");
  if (!totalEl || !form) return;

  const items = getCartItems();
  const total = items.reduce((sum, item) => sum + item.price, 0);
  totalEl.textContent = total;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const orderNumber = `#${Math.floor(10000 + Math.random() * 90000)}`;
    localStorage.setItem(ORDER_KEY, orderNumber);
    saveCart([]);
    window.location.href = "success.html";
  });
};

const renderSuccess = () => {
  const orderEl = document.getElementById("order-number");
  if (!orderEl) return;
  const orderNumber = localStorage.getItem(ORDER_KEY) || "#12345";
  orderEl.textContent = orderNumber;
};

updateCartCount();
renderProducts();
renderCart();
renderCheckout();
renderSuccess();

