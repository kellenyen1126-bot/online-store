let total = 0;
let cart = [];

let isLoginMode = true;

// ---------- AUTH ----------
function toggleAuth() {
  isLoginMode = !isLoginMode;

  document.getElementById("authTitle").innerText =
    isLoginMode ? "Login" : "Register";

  document.getElementById("toggleText").innerText =
    isLoginMode ? "No account? Register" : "Already have account? Login";
}

function authAction() {

  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (!user || !pass) {
    alert("Fill in all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (isLoginMode) {
    // LOGIN
    let found = users.find(u => u.user === user && u.pass === pass);

    if (found) {
      alert("Login successful!");
      loginSuccess();
    } else {
      alert("Wrong username or password");
    }

  } else {
    // REGISTER
    let exists = users.find(u => u.user === user);

    if (exists) {
      alert("User already exists");
      return;
    }

    users.push({ user, pass });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully! Now login");
    toggleAuth();
  }
}

function loginSuccess() {
  document.getElementById("authBox").style.display = "none";
  document.getElementById("shopBox").style.display = "block";
}

function logout() {
  location.reload();
}

// ---------- CART ----------
function addItem(name, price) {

  let item = cart.find(i => i.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  total += price;
  renderCart();
}

function removeOne(name) {

  let item = cart.find(i => i.name === name);

  if (!item) return;

  item.qty--;
  total -= item.price;

  if (item.qty <= 0) {
    cart = cart.filter(i => i.name !== name);
  }

  renderCart();
}

function renderCart() {

  const list = document.getElementById("cartList");
  list.innerHTML = "";

  cart.forEach(item => {

    let li = document.createElement("li");

    li.innerHTML = `
      ${item.name} - $${item.price} x${item.qty}
      <button onclick="removeOne('${item.name}')">-</button>
    `;

    list.appendChild(li);
  });

  document.getElementById("total").innerText = "$" + total;
}

function clearCart() {
  cart = [];
  total = 0;
  renderCart();
}

function purchase() {
  if (total === 0) {
    alert("Cart is empty!");
  } else {
    alert("Purchase successful!");
    clearCart();
  }
}
