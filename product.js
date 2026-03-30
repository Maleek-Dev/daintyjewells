

//     let cartarr = [];

// function addToCart(product) {
//     let localStoragecart = localStorage.getItem('productcart');
//     if(localStoragecart){
//         cartarr =JSON.stringify(localStoragecart);
//     }

//     let checkifExists = arr.find((item) => item.id == product.id)
//     if(checkifExists != undefined){
//         alert("Product already in basket");
//     }
//     else {
//          arr.push(product);
//         localStorage.setItem
//          alert("Item added to basket")
//     }
   
// }



// =======================
// CART HELPERS
// =======================

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// =======================
// UPDATE CART COUNT
// =======================

function updateCartCount() {
  let cart = getCart();

  let totalItems = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  let countEl = document.getElementById("cart_count");
  if (countEl) countEl.innerText = totalItems;
}

// =======================
// ADD TO CART
// =======================

function addToCart(product, qty) {
  let cart = getCart();

  let existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      ...product,
      quantity: qty
    });
  }

  saveCart(cart);
  updateCartCount();

  alert("Added to cart!");
}

// =======================
// INIT PRODUCT PAGE
// =======================

function initProductPage() {
  let btn = document.getElementById("addToBasket");
  let qtyInput = document.getElementById("qty");

  if (!btn) return;

  btn.addEventListener("click", () => {
    
    let qty = parseInt(qtyInput.value) || 1;

    // 👇 Your product data (static for now)
    let product = {
      id: 1,
      name: "The Vivienne Dress",
      price: 119.95,
      image: "./images/List.jpg"
    };

    addToCart(product, qty);
  });
}

// =======================
// RUN ON LOAD
// =======================

initProductPage();
updateCartCount();