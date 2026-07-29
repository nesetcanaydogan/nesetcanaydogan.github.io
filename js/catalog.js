/**
 * Apolitik Dükkan - Catalog & Listing Logic
 */

let activeCategoryFilter = null;
let activeSearchQuery = '';
let activeSort = 'popular';

document.addEventListener('DOMContentLoaded', () => {
  // Parse URL Parameters
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  const qParam = urlParams.get('q');

  if (catParam) activeCategoryFilter = catParam;
  if (qParam) activeSearchQuery = qParam;

  const catalogSearchInput = document.getElementById('catalog-search-input');
  if (catalogSearchInput && activeSearchQuery) {
    catalogSearchInput.value = activeSearchQuery;
  }

  // Bind Listeners
  if (catalogSearchInput) {
    catalogSearchInput.addEventListener('input', (e) => {
      activeSearchQuery = e.target.value.trim();
      renderCatalog();
    });
  }

  const sortSelect = document.getElementById('catalog-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeSort = e.target.value;
      renderCatalog();
    });
  }

  renderCategoriesSidebar();
  renderCatalog();
});

function renderCategoriesSidebar() {
  const container = document.getElementById('catalog-categories-list');
  if (!container) return;

  const allCount = PRODUCTS.length;
  let html = `
    <button type="button" onclick="selectCatalogCategory(null, this)" class="catalog-cat-btn w-full text-left px-4 py-2.5 rounded-xl font-label-md text-label-md font-semibold flex justify-between items-center ${!activeCategoryFilter ? 'bg-shop-violet text-pure-white' : 'hover:bg-canvas-mist text-ink-black'} transition-colors">
      <span>Tüm Eserler</span>
      <span class="text-xs opacity-75">${allCount}</span>
    </button>
  `;

  CATEGORIES.forEach(cat => {
    const isSelected = activeCategoryFilter === cat.name;
    const count = PRODUCTS.filter(p => p.category === cat.name).length;
    html += `
      <button type="button" onclick="selectCatalogCategory('${cat.name}', this)" class="catalog-cat-btn w-full text-left px-4 py-2.5 rounded-xl font-label-md text-label-md font-semibold flex justify-between items-center ${isSelected ? 'bg-shop-violet text-pure-white' : 'hover:bg-canvas-mist text-ink-black'} transition-colors">
        <span>${cat.name}</span>
        <span class="text-xs opacity-75">${count}</span>
      </button>
    `;
  });

  container.innerHTML = html;
}

function selectCatalogCategory(catName, btn) {
  activeCategoryFilter = catName;
  
  document.querySelectorAll('.catalog-cat-btn').forEach(b => {
    b.classList.remove('bg-shop-violet', 'text-pure-white');
    b.classList.add('hover:bg-canvas-mist', 'text-ink-black');
  });

  if (btn) {
    btn.classList.remove('hover:bg-canvas-mist', 'text-ink-black');
    btn.classList.add('bg-shop-violet', 'text-pure-white');
  }

  renderCatalog();
}

function renderCatalog() {
  const gridContainer = document.getElementById('catalog-products-grid');
  const countBadge = document.getElementById('catalog-result-count');
  if (!gridContainer) return;

  let filtered = [...PRODUCTS];

  if (activeCategoryFilter) {
    filtered = filtered.filter(p => p.category === activeCategoryFilter);
  }

  if (activeSearchQuery) {
    const query = activeSearchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.shortDesc.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.collection.toLowerCase().includes(query)
    );
  }

  // Sorting
  if (activeSort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeSort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (activeSort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
  } else if (activeSort === 'popular') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (countBadge) {
    countBadge.textContent = `${filtered.length} ürün listeleniyor`;
  }

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <span class="material-symbols-outlined text-[64px] text-muted-gray mb-4">search_off</span>
        <h3 class="font-headline-lg text-headline-lg font-bold text-ink-black">Aramanızla eşleşen eser bulunamadı</h3>
        <p class="font-body-md text-body-md text-muted-gray mt-2">Lütfen farklı arama terimleri veya filtreler deneyiniz.</p>
        <button onclick="activeSearchQuery=''; activeCategoryFilter=null; renderCatalog();" class="mt-6 bg-shop-violet text-pure-white px-6 py-2.5 rounded-full font-bold font-label-md text-label-md shadow-violet-glow hover:scale-105 transition-transform">Filtreleri Temizle</button>
      </div>
    `;
  } else {
    gridContainer.innerHTML = filtered.map(product => createProductCardHTML(product)).join('');
  }
}
