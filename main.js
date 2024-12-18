const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

// Slider Items
const sliderItems = document.querySelectorAll(".sliderItem");

// Product Section Elements
const productImg = document.querySelector(".productImg");
const productTitle = document.querySelector(".productTitle");
const productPrice = document.querySelector(".productPrice");
const productDesc = document.querySelector(".productDesc");
const productVariations = document.querySelectorAll(".variation img");

// Cart Elements
const cartIcon = document.getElementById("cartIcon");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsEl = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const goToPayment = document.getElementById("goToPayment");

// Define Products
const products = [
  {
    id: 1,
    title: "Luxury Watch",
    price: 490,
    desc: "Luxury Original Watches Mens Waterproof Stainless Steel Golden",
    img: "./images/watch1.jpg",
    variations: ["./images/Binbond1.jpg", "./images/Binbond2.jpg", "./images/Binbond3.jpg"],
  },
  {
    id: 2,
    title: "Dive Watch",
    price: 250,
    desc: "Perfect for underwater adventures.",
    img: "./images/dive.webp",
    variations: ["./images/diver1.jpg", "./images/diver2.webp", "./images/diver3.jpg"],
  },
  {
    id: 3,
    title: "Sport Watch",
    price: 330,
    desc: "Built for high-performance activities.",
    img: "./images/sport.jpg",
    variations: ["./images/sport1.jpg", "./images/sport2.jpg", "./images/sport3.webp"],
  },
  {
    id: 4,
    title: "Dress Watch",
    price: 250,
    desc: "Elegant timepieces for formal occasions.",
    img: "./images/new2.webp",
    variations: ["./images/dress1.jpg", "./images/dress2.jpg", "./images/dress3.jpg"],
  },
  {
    id: 5,
    title: "Pilot Watch",
    price: 450,
    desc: "Reliable timekeeping for aviation enthusiasts.",
    img: "./images/pilot.jpg",
    variations: ["./images/pilot1.jpg", "./images/pilot2.jpg", "./images/pilot3.jpg"],
  },
];

let selectedProduct = products[0];

// Menu Navigation Functionality
menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Change slider position
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    // Update selected product
    selectedProduct = products[index];

    // Update product details
    productImg.src = selectedProduct.img;
    productTitle.textContent = selectedProduct.title;
    productPrice.textContent = `$${selectedProduct.price}`;
    productDesc.textContent = selectedProduct.desc;

    // Update product variations
    productVariations.forEach((variation, i) => {
      if (selectedProduct.variations[i]) {
        variation.src = selectedProduct.variations[i];
        variation.style.display = "block";
      } else {
        variation.style.display = "none";
      }
    });
  });
});

// Variation Click Functionality
productVariations.forEach((variation) => {
  variation.addEventListener("click", (e) => {
    productImg.src = e.target.src;
  });
});

// Cart Object
const cart = {
  items: [],
  addItem: function (product) {
    const existingItem = this.items.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.updateCartUI();
  },
  removeItem: function (itemId) {
    this.items = this.items.filter((item) => item.id !== itemId);
    this.updateCartUI();
  },
  updateCartUI: function () {
    // Update cart count
    cartCount.textContent = this.items.reduce((acc, item) => acc + item.quantity, 0);

    // Update cart overlay
    cartItemsEl.innerHTML = ""; // Clear existing items
    this.items.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("cartItem");

      // Create the product display in cart (Image, Title, Price, and Quantity)
      li.innerHTML = `
        <div class="cartItemContent">
          <img src="${item.img}" alt="${item.title}" class="cartItemImg">
          <div class="cartItemDetails">
            <h3 class="cartItemTitle">${item.title}</h3>
            <p class="cartItemDesc">${item.desc}</p>
            <span class="cartItemPrice">$${item.price}</span>
            <span class="cartItemQuantity">x ${item.quantity}</span>
          </div>
          <button class="removeItem" data-id="${item.id}">Remove</button>
        </div>
      `;
      cartItemsEl.appendChild(li);
    });

    // Attach remove event listeners
    document.querySelectorAll(".removeItem").forEach((button) => {
      button.addEventListener("click", (e) => {
        const itemId = parseInt(e.target.dataset.id);
        cart.removeItem(itemId);
      });
    });
  },
};

// Add to Cart Button
const addButton = document.querySelector(".addButton");
addButton.addEventListener("click", () => {
  cart.addItem(selectedProduct);
});

// Toggle Cart Overlay
cartIcon.addEventListener("click", () => {
  cartOverlay.style.display = cartOverlay.style.display === "flex" ? "none" : "flex";
});

// Go to Payment Button
goToPayment.addEventListener("click", () => {
  // Trigger existing payment modal
  paymentModal.style.display = "block";
  paymentOverlay.style.display = "block";
});

// Close Payment Modal
const closeButton = document.getElementById("close-payment");
closeButton.addEventListener("click", () => {
  paymentModal.style.display = "none";
  paymentOverlay.style.display = "none";
});

// Close Cart Overlay When Clicking Outside
document.addEventListener("click", (event) => {
  const cartOverlayEl = document.getElementById("cartOverlay");
  const cartIconEl = document.getElementById("cartIcon");
  
  // Check if the click is outside the cart overlay and the cart icon
  if (
    cartOverlayEl.style.display === "flex" && // Cart overlay is open
    !cartOverlayEl.contains(event.target) && // Click is not inside cart overlay
    !cartIconEl.contains(event.target) // Click is not on cart icon
  ) {
    cartOverlayEl.style.display = "none";
  }
});
