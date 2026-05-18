let total = 0;

function addItem(name, price) {
  total += price;

  const li = document.createElement("li");

  li.innerHTML = `
    <span>${name} - $${price}</span>
    <button class="delete-btn" onclick="removeItem(this, ${price})">X</button>
  `;

  document.getElementById("cartList").appendChild(li);

  updateTotal();
}

function removeItem(button, price) {
  button.parentElement.remove();
  total -= price;
  updateTotal();
}

function clearCart() {
  document.getElementById("cartList").innerHTML = "";
  total = 0;
  updateTotal();
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
