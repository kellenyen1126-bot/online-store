let total = 0;
let cart = [];
let isLogin = true;

/* ---------- AUTH ---------- */
function toggleAuth() {
  isLogin = !isLogin;

  document.getElementById("authTitle").innerText =
    isLogin ? "Login" : "Register";

  document.getElementById("toggleText").innerText =
    isLogin ? "No account? Register" : "Already have account? Login";
}

function authAction() {

  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!user || !pass) {
    alert("Fill all fields");
    return;
  }

  if (!isLogin) {
    // REGISTER
    let exists = users.find(u => u.user === user);

    if (exists) {
      alert("User already exists");
      return;
    }

    users.push({ user, pass });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered! Now login");
    toggleAuth();

  } else {
    // LOGIN
    let found = users.find(u => u.user === user && u.pass === pass);

    if (found) {
      alert("Login success!");
      document.getElementById("authBox").style.display = "none";
      document.getElementById("shopBox").style.display = "block";
    } else {
      alert("Wrong login");
    }
  }
}

/* ---------- CART ---------- */
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
      <span>${item.name} x${item.qty} - $${item.price}</span>
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
    alert("Cart empty!");
  } else {
    alert("Success!");
    clearCart();
  }
}

function logout() {
  location.reload();
}
