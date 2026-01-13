import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const lostItems = document.getElementById("lostItems");

// ---- Fixed Admin Info ----
const adminInfo = {
  admin_name: "Mahesh Kumar",
  admin_number: "9784567899"
};

// Display admin info
document.getElementById("adminName").innerText = `👤 ${adminInfo.admin_name}`;
document.getElementById("adminNumber").innerText = `📞 ${adminInfo.admin_number}`;

// ---- Load Lost Items ----
async function loadItems() {
  const snap = await getDocs(collection(db, "lost"));
  lostItems.innerHTML = "";

  snap.forEach(docSnap => {
    const data = docSnap.data();

    const li = document.createElement("li");
    li.className = "card";

    li.innerHTML = `
      <strong>${data.name}</strong><br>
      ${data.desc}<br><br>

      👤 <b>Reported by:</b> ${data.reporterName}<br>
      📞 <b>Contact:</b> ${data.reporterPhone}<br>
      🏫 <b>Admin:</b> ${data.admin_name} (${data.admin_number})<br><br>

      <span class="${data.status === "found" ? "status-found" : "status-lost"}">
        ${data.status.toUpperCase()}
      </span>

      <div class="media"></div>
    `;

    // Handle image
    const mediaDiv = li.querySelector(".media");
    if (data.img) {
      const img = new Image();
      img.src = data.img;
      img.style.maxWidth = "100%";
      img.style.borderRadius = "10px";
      img.style.marginTop = "12px";

      img.onload = () => mediaDiv.appendChild(img);
      img.onerror = () => {
        mediaDiv.innerHTML = `<br><a href="${data.img}" target="_blank" style="color:#2563eb; font-weight:500;">🔗 Open Link</a>`;
      };
    }

    lostItems.appendChild(li);
  });
}

// Initial load
loadItems();
