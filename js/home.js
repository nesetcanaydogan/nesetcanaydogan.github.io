/**
 * Apolitik Dükkan - Home Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  renderHomeProducts();

  // Search Submit Listener
  const searchInput = document.getElementById('home-search-input');
  const searchBtn = document.getElementById('home-search-btn');

  if (searchInput && searchBtn) {
    const handleSearch = () => {
      const q = searchInput.value.trim();
      if (q) {
        window.location.href = getAssetPath(`pages/products.html?q=${encodeURIComponent(q)}`);
      }
    };

    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSearch();
    });
  }
});

function renderHomeProducts(filterCategory = null) {
  const gridContainer = document.getElementById('home-products-grid');
  if (!gridContainer) return;

  let items = PRODUCTS;
  if (filterCategory && filterCategory !== 'All') {
    items = PRODUCTS.filter(p => p.category === filterCategory);
  }

  gridContainer.innerHTML = items.map(product => createProductCardHTML(product)).join('');
}

function filterHomeCategory(btn, categoryName) {
  // Update active pill button UI
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.classList.remove('bg-shop-violet', 'text-pure-white');
    pill.classList.add('bg-pure-white', 'text-ink-black');
  });

  btn.classList.remove('bg-pure-white', 'text-ink-black');
  btn.classList.add('bg-shop-violet', 'text-pure-white');

  renderHomeProducts(categoryName);
}
