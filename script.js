let cart = [];
let total = 0;

function addItem(item) {

  if (item === "pencil") {
    cart.push({ name: "Pencil ✏️", price: 10 });
    total += 10;
  }

  if (item === "eraser") {
    cart.push({ name: "Eraser 🧽", price: 15 });
    total += 15;
  }

  update();
}

function update() {
  let list = document.getElementById("cart");
  list.innerHTML = "";

  cart.forEach((item, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      ${item.name} - $${item.price}
      <button onclick="removeItem(${index})">❌</button>
    `;

    list.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

function removeItem(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  update();
}

function clearCart() {
  cart = [];
  total = 0;
  update();
}
