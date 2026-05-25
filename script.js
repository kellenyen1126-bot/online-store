import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

/* ---------- YOUR CONFIG ---------- */
const firebaseConfig = {
  apiKey: "AIzaSyBfNgoTbkvoL_kWb_sr7E5RcOLg_oteens",
  authDomain: "onlinestore-b48e3.firebaseapp.com",
  projectId: "onlinestore-b48e3",
  storageBucket: "onlinestore-b48e3.firebasestorage.app",
  messagingSenderId: "883945675813",
  appId: "1:883945675813:web:c2e4dcdad489897707f3cc"
};

/* ---------- INIT ---------- */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ---------- MUST EXPOSE FUNCTIONS (IMPORTANT FIX) ---------- */

window.register = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    document.getElementById("msg").innerText = "Registered!";
  } catch (e) {
    document.getElementById("msg").innerText = e.message;
  }
};

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    document.getElementById("authBox").style.display = "none";
    document.getElementById("shopBox").style.display = "block";

  } catch (e) {
    document.getElementById("msg").innerText = e.message;
  }
};

window.logout = async function () {
  await signOut(auth);
  location.reload();
};

/* ---------- AUTO LOGIN ---------- */
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("authBox").style.display = "none";
    document.getElementById("shopBox").style.display = "block";
  }
});

/* ---------- CART ---------- */
let cart = [];
let total = 0;

window.addItem = function (name, price) {

  let item = cart.find(i => i.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  total += price;
  renderCart();
};

function renderCart() {

  const list = document.getElementById("cart");
  list.innerHTML = "";

  cart.forEach(i => {
    const li = document.createElement("li");
    li.innerText = `${i.name} x${i.qty} - $${i.price}`;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = "$" + total;
}
