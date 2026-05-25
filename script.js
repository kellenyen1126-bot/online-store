const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ---------- AUTH ---------- */

async function signUp() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const { data, error } = await client.auth.signUp({
    email,
    password
  });

  if (error) {
    alert("Register Error: " + error.message);
    return;
  }

  alert("Registered! Now login.");
}

async function signIn() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Login Error: " + error.message);
    return;
  }

  document.getElementById("authBox").style.display = "none";
  document.getElementById("shopBox").style.display = "block";
}

/* AUTO CHECK SESSION */
async function checkUser() {
  const { data } = await client.auth.getSession();

  if (data.session) {
    document.getElementById("authBox").style.display = "none";
    document.getElementById("shopBox").style.display = "block";
  }
}

checkUser();

/* ---------- LOGOUT ---------- */
async function logout() {
  await client.auth.signOut();
  location.reload();
}

/* ---------- CART ---------- */
let cart = [];
let total = 0;

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

function renderCart() {
  const list = document.getElementById("cartList");
  list.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} x${item.qty} - $${item.price}`;
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
    alert("Cart empty");
  } else {
    alert("Purchase success!");
    clearCart();
  }
}
