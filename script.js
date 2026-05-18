let total = 0;

// store items in object instead of duplicates
let cart = {};

function addItem(name, price) {

  if (cart[name]) {
    cart[name].qty += 1;
  } else {
    cart[name] = {
      price: price,
      qty: 1
    };
  }

  total += price;
  renderCart();
}

function removeOne(name) {

  if (!cart[name]) return;

  cart[name].qty -= 1;
  total -= cart[name].price;

  if (cart[name].qty <= 0) {
    delete cart[name];
  }

  renderCart();
}

function renderCart() {

  const list = document.getElementById("cartList");
  list.innerHTML = "";

  for (let name in cart) {

    const item = cart[name];

    const li = document.createElement("li");

    li.innerHTML = `
      <span>
        ${name} - $${item.price} 
        <b> x${item.qty}</b>
      </span>

      <button class="delete-btn" onclick="removeOne('${name}')">-</button>
    `;

    list.appendChild(li);
  }

  updateTotal();
}

function clearCart() {
  cart = {};
  total = 0;
  renderCart();
}

function purchase() {
  if (total === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Purchase Successful! 🛒");
    clearCart();
  }
}

function updateTotal() {
  document.getElementById("total").innerText = "$" + total;
}
