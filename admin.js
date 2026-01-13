import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const list = document.getElementById("adminItems");

async function loadAdminItems() {
  list.innerHTML = "";
  const snap = await getDocs(collection(db, "lost"));

  snap.forEach(docSnap => {
    const data = docSnap.data();
    const id = docSnap.id;

    const li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `
      <strong>${data.name}</strong><br>
      ${data.desc}<br>
      <b>Status:</b>
      <span class="${data.status === "found" ? "status-found" : "status-lost"}">
        ${data.status.toUpperCase()}
      </span><br><br>
      <button>Toggle Status</button>
    `;

    li.querySelector("button").onclick = async () => {
      const newStatus = data.status === "lost" ? "found" : "lost";
      await updateDoc(doc(db, "lost", id), { status: newStatus });
      loadAdminItems();
    };

    list.appendChild(li);
  });
}

loadAdminItems();
