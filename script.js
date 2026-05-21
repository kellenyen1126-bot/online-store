// 🔥 PUT YOUR SUPABASE INFO HERE
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let cart = [];
let total = 0;

/* ================= AUTH ================= */

async function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let { error } = await client.auth.signUp({
    email,
    password
  });

  if (error) {
    document.getElementById("status").innerText = error.message;
  } else {
    document.getElementById("status").innerText = "Registered! Check email or login.";
  }
}

async function signIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let { error } = await client.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    document.getElementById("status").innerText = error.message;
  } else {
    document.getElementById("authBox").style.display = "none";
    document.getElementById("shopBox").style.display = "block";
  }
}

async function logout() {
  await client.auth.signOut();
  location.reload();
}

/* check session on load */
client.auth.getSession().then(({ data }) => {
  if (data.session) {
    document.getElementById("authBox").style.display = "none";
    document.getElementById("shopBox").style.display = "block";
  }
});

/* ================= CART ================= */

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
  let list = document.getElementById("cartList");
  list.innerHTML = "";

  cart.forEach(item => {
    let li = document.createElement("li");
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
