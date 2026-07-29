/**
 * Apolitik Dükkan - Product Detail Page Handler
 */

let currentProduct = null;
let currentQuantity = 1;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'p1';
  currentProduct = getProductById(productId);

  renderProductDetail();
});

function renderProductDetail() {
  if (!currentProduct) return;

  // Breadcrumbs
  const breadcrumbCategory = document.getElementById('detail-breadcrumb-cat');
  const breadcrumbTitle = document.getElementById('detail-breadcrumb-title');
  if (breadcrumbCategory) {
    breadcrumbCategory.textContent = currentProduct.category;
    breadcrumbCategory.href = getAssetPath(`pages/products.html?cat=${encodeURIComponent(currentProduct.category)}`);
  }
  if (breadcrumbTitle) breadcrumbTitle.textContent = currentProduct.name;

  // Title & Metadata
  const titleEl = document.getElementById('detail-title');
  const subtitleEl = document.getElementById('detail-subtitle');
  const priceEl = document.getElementById('detail-price');
  const descEl = document.getElementById('detail-desc');
  const badgeEl = document.getElementById('detail-badge');
  const ratingEl = document.getElementById('detail-rating');

  if (titleEl) titleEl.textContent = currentProduct.name;
  if (subtitleEl) subtitleEl.textContent = currentProduct.subtitle || currentProduct.collection;
  if (priceEl) priceEl.textContent = `${currentProduct.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL`;
  if (descEl) descEl.textContent = currentProduct.longDesc;
  if (ratingEl) ratingEl.textContent = `★ ${currentProduct.rating} (Müze Onaylı Eser)`;
  if (badgeEl) {
    if (currentProduct.badge) {
      badgeEl.textContent = currentProduct.badge;
      badgeEl.classList.remove('hidden');
    } else {
      badgeEl.classList.add('hidden');
    }
  }

  // Main Image & Gallery Thumbnails
  const mainImg = document.getElementById('detail-main-img');
  const galleryContainer = document.getElementById('detail-thumbnails-container');

  if (mainImg) {
    mainImg.src = getAssetPath(currentProduct.image);
    mainImg.alt = currentProduct.name;
  }

  if (galleryContainer && currentProduct.gallery) {
    galleryContainer.innerHTML = currentProduct.gallery.map((imgSrc, index) => `
      <div onclick="switchDetailGalleryImage('${getAssetPath(imgSrc)}', this)" class="detail-thumb-btn aspect-square w-20 rounded-2xl overflow-hidden cursor-pointer border-2 ${index === 0 ? 'border-shop-violet shadow-md' : 'border-transparent opacity-70 hover:opacity-100'} transition-all bg-surface-container-low">
        <img src="${getAssetPath(imgSrc)}" alt="Görsel ${index + 1}" class="w-full h-full object-cover" />
      </div>
    `).join('');
  }

  // Specifications
  const specsContainer = document.getElementById('detail-specs-container');
  if (specsContainer && currentProduct.specs) {
    specsContainer.innerHTML = Object.entries(currentProduct.specs).map(([key, val]) => `
      <div class="flex justify-between items-center py-3 border-b border-faint-border font-label-md text-label-md">
        <span class="text-muted-gray font-medium">${key}</span>
        <span class="text-ink-black font-semibold">${val}</span>
      </div>
    `).join('');
  }

  // Quantity Control Events
  const qtyDecBtn = document.getElementById('detail-qty-dec');
  const qtyIncBtn = document.getElementById('detail-qty-inc');
  const qtyVal = document.getElementById('detail-qty-val');

  if (qtyDecBtn && qtyIncBtn && qtyVal) {
    qtyDecBtn.onclick = () => {
      if (currentQuantity > 1) {
        currentQuantity--;
        qtyVal.textContent = currentQuantity;
      }
    };
    qtyIncBtn.onclick = () => {
      currentQuantity++;
      qtyVal.textContent = currentQuantity;
    };
  }

  // CTA Buttons
  const addBtn = document.getElementById('detail-add-cart-btn');
  const buyBtn = document.getElementById('detail-buy-now-btn');
  const favBtn = document.getElementById('detail-fav-btn');

  if (addBtn) {
    addBtn.onclick = () => {
      CartStore.addItem(currentProduct.id, currentQuantity);
    };
  }

  if (buyBtn) {
    buyBtn.onclick = () => {
      CartStore.addItem(currentProduct.id, currentQuantity);
      window.location.href = getAssetPath('pages/cart.html');
    };
  }

  if (favBtn) {
    const isFav = WishlistStore.getItems().includes(currentProduct.id);
    favBtn.setAttribute('data-wishlist-id', currentProduct.id);
    favBtn.innerHTML = `
      <span class="material-symbols-outlined text-[20px] ${isFav ? 'filled text-independence-red' : 'text-on-surface-variant'}">favorite</span>
    `;
    favBtn.onclick = () => {
      WishlistStore.toggleItem(currentProduct.id);
    };
  }

  renderRelatedProducts();
}

function switchDetailGalleryImage(src, thumbBtn) {
  const mainImg = document.getElementById('detail-main-img');
  if (mainImg) {
    mainImg.style.opacity = '0.5';
    setTimeout(() => {
      mainImg.src = src;
      mainImg.style.opacity = '1';
    }, 150);
  }

  document.querySelectorAll('.detail-thumb-btn').forEach(btn => {
    btn.classList.remove('border-shop-violet', 'shadow-md');
    btn.classList.add('border-transparent', 'opacity-70');
  });

  if (thumbBtn) {
    thumbBtn.classList.remove('border-transparent', 'opacity-70');
    thumbBtn.classList.add('border-shop-violet', 'shadow-md');
  }
}

function renderRelatedProducts() {
  const container = document.getElementById('detail-related-grid');
  if (!container) return;

  const related = PRODUCTS.filter(p => p.id !== currentProduct.id).slice(0, 4);
  container.innerHTML = related.map(product => createProductCardHTML(product)).join('');
}
