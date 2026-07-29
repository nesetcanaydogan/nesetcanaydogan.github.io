/**
 * Apolitik Dükkan - Cart Page Management & Checkout Handler
 */

let activeDiscountRatio = 0;
let activePromoCode = '';

document.addEventListener('DOMContentLoaded', () => {
  renderCartPage();

  const promoBtn = document.getElementById('cart-promo-apply-btn');
  const promoInput = document.getElementById('cart-promo-input');

  if (promoBtn && promoInput) {
    promoBtn.onclick = () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'CUMHURIYET100' || code === 'APOLITIK10') {
        activeDiscountRatio = 0.10;
        activePromoCode = code;
        showToast('Kupon kodu uygulandı! %10 İndirim.', 'success');
      } else if (code === '') {
        showToast('Lütfen bir kupon kodu giriniz.', 'info');
      } else {
        showToast('Geçersiz veya süresi dolmuş kupon kodu.', 'info');
      }
      renderCartPage();
    };
  }

  const checkoutBtn = document.getElementById('cart-checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      const items = CartStore.getItems();
      if (items.length === 0) {
        showToast('Sepetinizde ürün bulunmamaktadır.', 'info');
        return;
      }

      showCheckoutModal();
    };
  }
});

function renderCartPage() {
  const container = document.getElementById('cart-items-container');
  const emptyState = document.getElementById('cart-empty-state');
  const cartContent = document.getElementById('cart-content-wrapper');
  
  if (!container) return;

  const items = CartStore.getItems();

  if (items.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    if (cartContent) cartContent.classList.add('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  if (cartContent) cartContent.classList.remove('hidden');

  let subtotal = 0;

  container.innerHTML = items.map(cartItem => {
    const product = getProductById(cartItem.id);
    if (!product) return '';
    const lineTotal = product.price * cartItem.quantity;
    subtotal += lineTotal;

    const imgPath = getAssetPath(product.image);
    const detailUrl = getAssetPath(`pages/product-detail.html?id=${product.id}`);

    return `
      <div class="bg-pure-white p-5 rounded-pill-card shadow-soft-card border border-faint-border flex flex-col md:flex-row items-center justify-between gap-5 transition-all hover:shadow-md">
        <div class="flex items-center gap-4 w-full md:w-auto">
          <div class="w-20 h-20 rounded-2xl overflow-hidden bg-surface-container-low flex-shrink-0 cursor-pointer" onclick="window.location.href='${detailUrl}'">
            <img src="${imgPath}" alt="${product.name}" class="w-full h-full object-cover" />
          </div>
          <div>
            <span class="text-shop-violet font-bold font-label-sm text-label-sm uppercase">${product.category}</span>
            <h4 class="font-headline-lg text-headline-lg font-bold text-ink-black cursor-pointer hover:text-shop-violet transition-colors" onclick="window.location.href='${detailUrl}'">${product.name}</h4>
            <p class="font-body-md text-body-md text-shop-violet font-bold mt-1">${product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL</p>
          </div>
        </div>

        <div class="flex items-center justify-between w-full md:w-auto gap-6 border-t md:border-t-0 border-faint-border pt-4 md:pt-0">
          <div class="flex items-center bg-canvas-mist rounded-full p-1 border border-faint-border">
            <button onclick="updateCartItemQty('${product.id}', -1)" class="w-8 h-8 rounded-full bg-pure-white shadow-sm flex items-center justify-center font-bold text-ink-black hover:bg-shop-violet hover:text-pure-white transition-colors">-</button>
            <span class="px-4 font-bold font-label-md text-label-md">${cartItem.quantity}</span>
            <button onclick="updateCartItemQty('${product.id}', 1)" class="w-8 h-8 rounded-full bg-pure-white shadow-sm flex items-center justify-center font-bold text-ink-black hover:bg-shop-violet hover:text-pure-white transition-colors">+</button>
          </div>

          <div class="text-right">
            <div class="font-headline-lg text-headline-lg font-black text-ink-black">${lineTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL</div>
          </div>

          <button onclick="removeCartItem('${product.id}')" class="text-muted-gray hover:text-independence-red p-2 rounded-full hover:bg-canvas-mist transition-colors" title="Sil">
            <span class="material-symbols-outlined text-[20px]">delete</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Update Calculations
  const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 45.00;
  const discountAmount = subtotal * activeDiscountRatio;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  const subtotalEl = document.getElementById('cart-subtotal');
  const shippingEl = document.getElementById('cart-shipping');
  const discountEl = document.getElementById('cart-discount');
  const grandTotalEl = document.getElementById('cart-grand-total');

  if (subtotalEl) subtotalEl.textContent = `${subtotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL`;
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'ÜCRETSİZ' : `${shipping.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL`;
  if (discountEl) {
    if (activeDiscountRatio > 0) {
      discountEl.textContent = `-${discountAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL (%10)`;
      discountEl.parentElement.classList.remove('hidden');
    } else {
      discountEl.parentElement.classList.add('hidden');
    }
  }
  if (grandTotalEl) grandTotalEl.textContent = `${grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL`;
}

function updateCartItemQty(id, delta) {
  CartStore.updateQuantity(id, delta);
  renderCartPage();
}

function removeCartItem(id) {
  CartStore.removeItem(id);
  renderCartPage();
}

function showCheckoutModal() {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 bg-ink-black/60 backdrop-blur-sm flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="bg-pure-white rounded-pill-card p-8 max-w-md w-full shadow-2xl text-center border border-faint-border animate-float">
      <div class="w-16 h-16 bg-shop-violet/10 text-shop-violet rounded-full flex items-center justify-center mx-auto mb-4">
        <span class="material-symbols-outlined text-[36px]">verified</span>
      </div>
      <h3 class="font-headline-lg text-headline-lg font-black text-ink-black text-2xl">Siparişiniz Alındı!</h3>
      <p class="font-body-md text-body-md text-muted-gray mt-2">Apolitik Dükkan tarihimizi evlerinize ulaştırmanın onurunu taşıyor. Sipariş numaranız: <strong>#APL-2026-${Math.floor(1000 + Math.random() * 9000)}</strong></p>
      <div class="mt-6 p-4 bg-canvas-mist rounded-2xl text-left text-xs text-muted-gray space-y-1">
        <div><strong>Kargo:</strong> Müze Özel Muhafazalı Ambalaj</div>
        <div><strong>Teslimat:</strong> 1-3 İş Günü İçerisinde Sevk</div>
      </div>
      <button onclick="completeCheckout(this)" class="mt-6 w-full bg-shop-violet text-pure-white py-3.5 rounded-full font-bold font-label-md text-label-md shadow-violet-glow hover:scale-105 transition-all">
        Alışverişe Devam Et
      </button>
    </div>
  `;
  document.body.appendChild(modal);
}

function completeCheckout(btn) {
  const modal = btn.closest('.fixed');
  if (modal) modal.remove();
  localStorage.setItem('apolitik_cart', JSON.stringify([]));
  CartStore.updateBadges();
  showToast('Tebrikler! Siparişiniz başarıyla tamamlandı.', 'success');
  window.location.href = getAssetPath('master.html');
}
