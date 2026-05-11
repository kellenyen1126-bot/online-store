const products = [
  { name: "Pencil ✏️", price: 10 },
  { name: "Eraser 🧽", price: 5 }
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart");
const totalDisplay = document.getElementById("total");

let cart = [];

// 顯示商品
products.forEach((product, index) => {
  const div = document.createElement("div");
  div.className = "product";

  div.innerHTML = `
    <h3>${product.name}</h3>
    <p>Price: $${product.price}</p>
    <button onclick="addToCart(${index})">Add to Cart</button>
  `;

  productList.appendChild(div);
});

// 加入購物車
function addToCart(index) {
  cart.push(products[index]);
  updateCart();
}

// 更新購物車
function updateCart() {
  cartList.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
    total += item.price;
  });

  totalDisplay.textContent = total;
}
