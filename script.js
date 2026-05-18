let total = 0;
let cart = [];

function addItem(name, price) {

  let item = cart.find(i => i.name === name);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      qty: 1
    });
  }

  total += price;
  renderCart();
}

function removeOne(name) {

  let index = cart.findIndex(i => i.name === name);

  if (index === -1) return;

  let item = cart[index];

  item.qty -= 1;
  total -= item.price;

  if (item.qty <= 0) {
    cart.splice(index, 1);
  }

  renderCart();
}

function renderCart() {

  const list = document.getElementById("cartList");
  list.innerHTML = "";

  cart.forEach(item => {

    const li = document.createElement("li");

    li.innerHTML = `
      <span>${item.name} - $${item.price} <b>x${item.qty}</b></span>
      <button class="delete-btn" onclick="removeOne('${item.name}')">-</button>
    `;

    list.appendChild(li);
  });

  updateTotal();
}

function clearCart() {
  cart = [];
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
