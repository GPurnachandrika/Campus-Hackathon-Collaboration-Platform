import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // ✅ CORRECT ELEMENT REFERENCES
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // 🔐 Firebase login
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    // 📄 Get role
    const snap = await getDoc(doc(db, "users", uid));

    if (!snap.exists()) {
      errorMsg.innerText = "No role assigned. Contact admin.";
      return;
    }

    const role = snap.data().role;

    // 🚦 Redirect
    if (role === "admin") {
      window.location.href = "admin.html";
    } else if (role === "student") {
      window.location.href = "student.html";
    } else {
      errorMsg.innerText = "Invalid role";
    }

  } catch (err) {
  console.error("Firebase Auth Error:", err.code, err.message);
  errorMsg.innerText = err.message;
}

});
