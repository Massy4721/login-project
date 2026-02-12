// --- Utilitaires stockage ---
function loadUsers() {
  const raw = localStorage.getItem("users");
  if (raw) return JSON.parse(raw);

  // utilisateurs par défaut
  const defaults = { admin: "1234" };
  localStorage.setItem("users", JSON.stringify(defaults));
  return defaults;
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function setMessage(text, type) {
  const el = document.getElementById("message");
  if (!el) return;
  el.textContent = text || "";
  el.style.color =
    type === "ok" ? "#22c55e" :
    type === "err" ? "#ef4444" :
    type === "info" ? "#38bdf8" : "#94a3b8";
}

// --- Navigation ---
function goRegister() {
  window.location.href = "register.html";
}

function goLogin() {
  window.location.href = "index.html";
}

// --- Page login ---
function resetForm() {
  const u = document.getElementById("username");
  const p = document.getElementById("password");
  if (u) u.value = "";
  if (p) p.value = "";
  setMessage("", "");
}

function login() {
  const username = document.getElementById("username")?.value.trim();
  const password = document.getElementById("password")?.value;

  if (!username || !password) {
    setMessage("Veuillez remplir identifiant et mot de passe.", "err");
    return;
  }

  const users = loadUsers();
  if (users[username] === password) {
    setMessage("Vous êtes connecté ✅", "ok");
  } else {
    setMessage("Erreur ❌ Identifiant ou mot de passe incorrect.", "err");
  }
}

// --- Page register ---
function resetRegister() {
  const u = document.getElementById("newUsername");
  const p = document.getElementById("newPassword");
  const c = document.getElementById("confirmPassword");
  if (u) u.value = "";
  if (p) p.value = "";
  if (c) c.value = "";
  setMessage("", "");
}

function register() {
  const newUsername = document.getElementById("newUsername")?.value.trim();
  const newPassword = document.getElementById("newPassword")?.value;
  const confirm = document.getElementById("confirmPassword")?.value;

  if (!newUsername || !newPassword || !confirm) {
    setMessage("Veuillez remplir tous les champs.", "err");
    return;
  }

  if (newPassword !== confirm) {
    setMessage("Les mots de passe ne correspondent pas.", "err");
    return;
  }

  const users = loadUsers();

  if (users[newUsername]) {
    setMessage("Cet identifiant existe déjà.", "err");
    return;
  }

  users[newUsername] = newPassword;
  saveUsers(users);

  setMessage("Compte créé ✅ Retour à la connexion…", "ok");

  // retour auto à la page login après 1 seconde
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}
