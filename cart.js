
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}


function renderCart() {
  let cart = getCart();
  let container = document.getElementById("cart_container");

  if (!container) return;

  container.innerHTML = "";

  cart.forEach(item => {
    container.innerHTML += `
      <div class="Cart">

        <div class="CartD">
          <img src="${item.image}" width="80">

          <div>
            <h4>${item.name}</h4>
          </div>
        </div>

        <div class="CartP">

          <h4>₦${item.price}</h4>

          <div>
            <button onclick="decreaseQty(${item.id})" style="background: #bb867d; color: white; padding: 5px 20px; border: none;">-</button>
            ${item.quantity}
            <button onclick="increaseQty(${item.id})" style="background: #bb867d; color: white; padding: 5px 20px; border: none;">+</button>
          </div>

          <h4>₦${(item.price * item.quantity).toFixed(2)}</h4>

          <button onclick="removeItem(${item.id})" style="background: #931c07; color: white; padding: 5px 20px; border: none;">X</button>

        </div>

      </div>
    `;
  });

  updateTotals();
  updateCartCount();
  updateItemCount();
}


function updateTotals() {
  let cart = getCart();

  let total = cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  document.getElementById("subtotal").innerText = total.toFixed(2);
  document.getElementById("grand_total").innerText = total.toFixed(2);
}


function updateCartCount() {
  let cart = getCart();

  let totalItems = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  let el = document.getElementById("cart_count");
  if (el) el.innerText = totalItems;
}


function updateItemCount() {
  let cart = getCart();

  let total = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  let el = document.getElementById("item_count");
  if (el) el.innerText = total;
}


function increaseQty(id) {
  let cart = getCart();

  let item = cart.find(p => p.id == id);
  if (item) item.quantity += 1;

  saveCart(cart);
  renderCart();
}

function decreaseQty(id) {
  let cart = getCart();

  let item = cart.find(p => p.id == id);

  if (item && item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter(p => p.id != id);
  }

  saveCart(cart);
  renderCart();
}

function removeItem(id) {
  let cart = getCart();

  cart = cart.filter(item => item.id != id);

  saveCart(cart);
  renderCart();
}


renderCart();

function checkout() {
  let cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let confirmPurchase = confirm("Are you sure you want to complete this purchase?");

  if (confirmPurchase) {
    alert(" Purchase successful! Thank you for shopping with us.");

 
    localStorage.removeItem("cart");


    renderCart();
  } else {
    alert("Purchase cancelled.");
  }
}