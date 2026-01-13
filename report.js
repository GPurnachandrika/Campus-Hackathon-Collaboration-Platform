import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("reportForm");

// ---- Fixed Admin Info ----
const adminInfo = {
  admin_name: "Campus Admin",
  admin_number: "1234567890"
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const itemName = document.getElementById("itemName").value.trim();
  const description = document.getElementById("description").value.trim();
  const reporterName = document.getElementById("reporterName").value.trim();
  const reporterPhone = document.getElementById("reporterPhone").value.trim();
  const imageUrl = document.getElementById("imageUrl").value.trim();

  if (!itemName || !description || !reporterName || !reporterPhone) {
    alert("Please fill in all required fields");
    return;
  }

  try {
    await addDoc(collection(db, "lost"), {
      name: itemName,
      desc: description,
      img: imageUrl || "",
      reporterName: reporterName,
      reporterPhone: reporterPhone,
      status: "lost",
      admin_name: adminInfo.admin_name,
      admin_number: adminInfo.admin_number,
      timestamp: new Date()
    });

    alert("Item reported successfully!");
    window.location.href = "lost.html"; // Redirect back to lost & found page
  } catch (error) {
    console.error("Error reporting item:", error);
    alert("Error reporting item. Try again.");
  }
});
