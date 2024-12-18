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


// Payment Modal Elements
const addButton = document.querySelector(".addButton");
const paymentModal = document.getElementById("payment-modal");
const paymentOverlay = document.getElementById("payment-overlay");
const closeButton = document.getElementById("close-payment");
const subtotalEl = document.getElementById("subtotal");
const taxEl = document.getElementById("tax");
const totalEl = document.getElementById("total");

// Add to cart
addButton.addEventListener("click", () => {
  cart.addItem(selectedProduct);
  updateCart();
});

const cart = {
  items: [],
  addItem: function(item) {
    const existingItem = this.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
    this.updateTotal();
  },
  removeItem: function(itemId) {
    const index = this.items.findIndex(i => i.id === itemId);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.updateTotal();
    }
  },
  updateQuantity: function(itemId, quantity) {
    const item = this.items.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.updateTotal();
    }
  },
  updateTotal: function() {
    const subtotal = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    // Update the payment summary on the page
    document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').innerText = `$${tax.toFixed(2)}`;
    document.getElementById('total').innerText = `$${total.toFixed(2)}`;
  }
};


// Open Payment Modal
addButton.addEventListener("click", () => {
    paymentModal.style.display = "block";
    paymentOverlay.style.display = "block";
    updatePaymentSummary();
});

// Close Payment Modal
closeButton.addEventListener("click", () => {
    paymentModal.style.display = "none";
    paymentOverlay.style.display = "none";
});

// Close modal when clicking outside the payment modal
paymentOverlay.addEventListener("click", () => {
    paymentModal.style.display = "none";
    paymentOverlay.style.display = "none";
});