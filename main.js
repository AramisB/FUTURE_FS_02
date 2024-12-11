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
    title: "BINBOND Gold Watch",
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
    variations: ["./images/dive1.jpg", "./images/dive2.jpg", "./images/dive3.jpg"],
  },
  {
    id: 3,
    title: "Sport Watch",
    price: 310,
    desc: "Built for high-performance activities.",
    img: "./images/sport.jpg",
    variations: ["./images/sport1.jpg", "./images/sport2.jpg", "./images/sport3.jpg"],
  },
  {
    id: 4,
    title: "Dress Watch",
    price: 400,
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

// Add to Cart Button
const addButton = document.querySelector(".addButton");
addButton.addEventListener("click", () => {
  alert(`Added ${selectedProduct.title} to the cart!`);
});
