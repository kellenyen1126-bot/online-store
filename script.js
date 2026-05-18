let isLoginMode = true;

// switch login/register
function toggleAuth() {
  isLoginMode = !isLoginMode;

  document.getElementById("authTitle").innerText =
    isLoginMode ? "Login" : "Register";

  document.getElementById("toggleText").innerText =
    isLoginMode ? "No account? Register" : "Already have account? Login";
}

// login or register
function authAction() {

  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!user || !pass) {
    alert("Please fill in all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!isLoginMode) {
    // ✅ REGISTER MODE
    let exists = users.find(u => u.user === user);

    if (exists) {
      alert("❌ User already exists");
      return;
    }

    users.push({ user, pass });
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Registered successfully! Now login");

    // auto switch to login
    isLoginMode = true;
    toggleAuth();

  } else {
    // LOGIN MODE
    let found = users.find(u => u.user === user && u.pass === pass);

    if (found) {
      alert("✅ Login successful!");
      loginSuccess();
    } else {
      alert("❌ Wrong username or password");
    }
  }
}

function loginSuccess() {
  document.getElementById("authBox").style.display = "none";
  document.getElementById("shopBox").style.display = "block";
}
