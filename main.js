document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 3000,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    renderProducts();
    setupSearch();
    setupThemeToggle();

    const lazyImages = document.querySelectorAll('img.lazy');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });

    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    if (darkModeToggle) {
        // Load theme from localStorage
        const isDarkMode = localStorage.getItem('theme') === 'dark';
        darkModeToggle.checked = isDarkMode;
        body.classList.toggle('dark-mode', isDarkMode);
        document.querySelectorAll('*').forEach((el) => el.classList.toggle('dark-mode', isDarkMode));

        darkModeToggle.addEventListener('change', () => {
            const isDarkMode = darkModeToggle.checked;
            body.classList.toggle('dark-mode', isDarkMode);
            document.querySelectorAll('*').forEach((el) => el.classList.toggle('dark-mode', isDarkMode));

            // Save theme preference
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    } else {
        console.error('Dark mode toggle element not found');
    }

    document.querySelectorAll('.view-watches').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.dataset.target);
            if (target) {
                target.style.display = 'flex';
            }
        });
    });

    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.watches-modal').style.display = 'none';
        });
    });

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        cartCount.textContent = cart.length;
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }

    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productId = parseInt(productCard.dataset.productId, 10);
            addToCart(productId);
        });
    });

    updateCartDisplay();
});

// Products Data
const products = [
    { id: 1, name: 'Classic Silver Watch', price: 250, image: 'images/watch1.jpg', description: 'A timeless classic with a modern twist.' },
    { id: 2, name: 'Gold Luxe Watch', price: 350, image: 'images/watch2.jpg', description: 'Luxury and elegance combined in one.' },
    { id: 3, name: 'Sporty Blue Watch', price: 180, image: 'images/watch3.jpg', description: 'Perfect for the active lifestyle.' },
    // Luxury Collection
    { id: 4, name: 'Luxury Watch 1', price: 500, image: 'images/luxury1.jpg', description: 'Elegant and timeless design with a classic touch.' },
    { id: 5, name: 'Luxury Watch 2', price: 750, image: 'images/luxury2.jpg', description: 'Crafted with precision and luxury materials.' },
    { id: 6, name: 'Luxury Watch 3', price: 900, image: 'images/luxury3.jpg', description: 'Exclusive design for the discerning collector.' },
    // New Arrivals
    { id: 7, name: 'New Arrival Watch 1', price: 300, image: 'images/new1.jpg', description: 'Fresh design with modern aesthetics.' },
    { id: 8, name: 'New Arrival Watch 2', price: 350, image: 'images/new2.jpg', description: 'Innovative features with a sleek look.' },
    { id: 9, name: 'New Arrival Watch 3', price: 400, image: 'images/new3.jpg', description: 'Contemporary style for the modern individual.' },
    // Limited Edition
    { id: 10, name: 'Limited Edition Watch 1', price: 1200, image: 'images/limited1.jpg', description: 'Rare and unique, crafted for exclusivity.' },
    { id: 11, name: 'Limited Edition Watch 2', price: 1500, image: 'images/limited2.jpg', description: 'Designed with the finest materials and craftsmanship.' },
    { id: 12, name: 'Limited Edition Watch 3', price: 2000, image: 'images/limited3.jpg', description: 'A collector\'s dream, limited to a few pieces.' },
];

// Render Products
function renderProducts() {
  const productContainer = document.getElementById('products');
  productContainer.innerHTML = products.map(product => `
      <div class="product-card">
          <div class="product-image">
              <img src="${product.image}" alt="${product.name}">
          </div>
          <h3>${product.name}</h3>
          <p>$${product.price.toFixed(2)}</p>
          <button class="add-to-cart-button">Add to Cart</button>
      </div>
  `).join('');
}

// Search
function setupSearch() {
  const searchButton = document.querySelector('.search-button');
  searchButton.addEventListener('click', () => {
      const query = document.querySelector('.search-input').value.toLowerCase();
      const filtered = products.filter(p => p.name.toLowerCase().includes(query));
      renderProducts(filtered);
  });
}

// Theme Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.add('dark-mode');
        document.querySelectorAll('*').forEach((el) => el.classList.add('dark-mode'));
    } else {
        body.classList.remove('dark-mode');
        document.querySelectorAll('*').forEach((el) => el.classList.remove('dark-mode'));
    }
});

// Cart Toggle
function toggleCart() {
  const cartSidebar = document.querySelector('.cart-sidebar');
  const overlay = document.querySelector('.overlay');
  cartSidebar.classList.toggle('active');
  overlay.classList.toggle('active');
}

function setupThemeToggle() {
    const themeToggleButton = document.querySelector('.theme-toggle');
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            document.querySelectorAll('*').forEach((el) => el.classList.toggle('dark-mode'));
        });
    } else {
        console.error('Theme toggle button not found');
    }
}

