/**
 * Apolitik Dükkan - Main Application Logic & Store State
 */

// Cart State Manager
class CartStore {
  static getItems() {
    try {
      const stored = localStorage.getItem('apolitik_cart');
      return stored ? JSON.parse(stored) : [
        { id: "p1", quantity: 1 },
        { id: "p3", quantity: 2 }
      ]; // Pre-populated default items for rich initial cart presentation
    } catch (e) {
      return [];
    }
  }

  static setItems(items) {
    localStorage.setItem('apolitik_cart', JSON.stringify(items));
    CartStore.updateBadges();
  }

  static addItem(productId, qty = 1) {
    const items = CartStore.getItems();
    const existingIndex = items.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      items[existingIndex].quantity += qty;
    } else {
      items.push({ id: productId, quantity: qty });
    }
    CartStore.setItems(items);
    
    const prod = getProductById(productId);
    showToast(`"${prod ? prod.name : 'Ürün'}" sepetinize eklendi!`, 'success');
  }

  static removeItem(productId) {
    let items = CartStore.getItems();
    items = items.filter(item => item.id !== productId);
    CartStore.setItems(items);
    showToast('Ürün sepetten çıkarıldı.', 'info');
  }

  static updateQuantity(productId, delta) {
    const items = CartStore.getItems();
    const item = items.find(i => i.id === productId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        CartStore.removeItem(productId);
        return;
      }
      CartStore.setItems(items);
    }
  }

  static getTotalCount() {
    const items = CartStore.getItems();
    return items.reduce((sum, i) => sum + i.quantity, 0);
  }

  static updateBadges() {
    const count = CartStore.getTotalCount();
    document.querySelectorAll('.cart-badge-count').forEach(el => {
      el.textContent = count;
      if (count > 0) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  }
}

// Wishlist State Manager
class WishlistStore {
  static getItems() {
    try {
      const stored = localStorage.getItem('apolitik_wishlist');
      return stored ? JSON.parse(stored) : ["p1", "p5"];
    } catch (e) {
      return [];
    }
  }

  static toggleItem(productId) {
    let items = WishlistStore.getItems();
    const prod = getProductById(productId);
    if (items.includes(productId)) {
      items = items.filter(id => id !== productId);
      showToast(`"${prod ? prod.name : 'Ürün'}" favorilerden çıkarıldı.`, 'info');
    } else {
      items.push(productId);
      showToast(`"${prod ? prod.name : 'Ürün'}" favorilerinize eklendi!`, 'heart');
    }
    localStorage.setItem('apolitik_wishlist', JSON.stringify(items));
    WishlistStore.updateBadges();
    
    // Update heart icons on page
    document.querySelectorAll(`[data-wishlist-id="${productId}"]`).forEach(btn => {
      const isFav = items.includes(productId);
      const icon = btn.querySelector('.material-symbols-outlined');
      if (icon) {
        if (isFav) {
          icon.classList.add('filled', 'text-independence-red');
          icon.classList.remove('text-on-surface-variant');
        } else {
          icon.classList.remove('filled', 'text-independence-red');
          icon.classList.add('text-on-surface-variant');
        }
      }
    });
  }

  static updateBadges() {
    const count = WishlistStore.getItems().length;
    document.querySelectorAll('.wishlist-badge-count').forEach(el => {
      el.textContent = count;
      if (count > 0) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  }
}

// Global Toast Alert Helper
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  let iconName = 'check_circle';
  let badgeBg = 'bg-shop-violet';
  if (type === 'heart') {
    iconName = 'favorite';
    badgeBg = 'bg-independence-red';
  } else if (type === 'info') {
    iconName = 'info';
    badgeBg = 'bg-ink-black';
  }

  toast.className = `toast-msg bg-pure-white text-ink-black px-5 py-3.5 rounded-full shadow-lg border border-faint-border flex items-center gap-3 font-label-md text-label-md font-semibold pointer-events-auto`;
  toast.innerHTML = `
    <div class="w-7 h-7 ${badgeBg} rounded-full flex items-center justify-center text-pure-white">
      <span class="material-symbols-outlined text-[16px]">${iconName}</span>
    </div>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Dynamic Product Card HTML Builder
function createProductCardHTML(product) {
  const isFav = WishlistStore.getItems().includes(product.id);
  const imgPath = getAssetPath(product.image);
  const detailUrl = getAssetPath(`pages/product-detail.html?id=${product.id}`);

  return `
    <div class="bg-pure-white rounded-pill-card shadow-soft-card pillow-card group flex flex-col justify-between overflow-hidden relative border border-faint-border/60">
      <div>
        <div class="aspect-square rounded-t-pill-card overflow-hidden relative bg-surface-container-low cursor-pointer" onclick="window.location.href='${detailUrl}'">
          ${product.badge ? `<span class="absolute top-3.5 left-3.5 bg-shop-violet text-pure-white px-3 py-1 rounded-full font-label-sm text-label-sm font-semibold z-10 shadow-sm">${product.badge}</span>` : ''}
          <button type="button" class="absolute top-3.5 right-3.5 w-9 h-9 bg-pure-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm z-10 hover:bg-pure-white transition-all" data-wishlist-id="${product.id}" onclick="event.stopPropagation(); WishlistStore.toggleItem('${product.id}')">
            <span class="material-symbols-outlined text-[18px] ${isFav ? 'filled text-independence-red' : 'text-on-surface-variant'}">favorite</span>
          </button>
          <img src="${imgPath}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        </div>
        <div class="p-5 cursor-pointer" onclick="window.location.href='${detailUrl}'">
          <div class="text-shop-violet font-bold font-label-sm text-label-sm tracking-wider uppercase mb-1">${product.category}</div>
          <h3 class="font-headline-lg text-headline-lg font-bold text-ink-black line-clamp-1 group-hover:text-shop-violet transition-colors">${product.name}</h3>
          <p class="font-body-md text-body-md text-muted-gray mt-1 line-clamp-2">${product.shortDesc}</p>
        </div>
      </div>
      <div class="px-5 pb-5 pt-0 flex items-center justify-between">
        <div>
          <span class="font-body-md text-body-md font-extrabold text-shop-violet">${product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL</span>
        </div>
        <button type="button" class="bg-shop-violet hover:bg-primary-dark text-pure-white px-4 py-2 rounded-full font-label-md text-label-md font-bold shadow-violet-glow flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all" onclick="CartStore.addItem('${product.id}')">
          <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span>
          <span>Ekle</span>
        </button>
      </div>
    </div>
  `;
}

// Global Document Initialization
document.addEventListener('DOMContentLoaded', () => {
  CartStore.updateBadges();
  WishlistStore.updateBadges();
});
