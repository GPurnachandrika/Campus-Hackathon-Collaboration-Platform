import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const select = document.getElementById("placeSelect");
const mapFrame = document.getElementById("campusMap");
const mapMessage = document.getElementById("mapMessage");

// Hide iframe initially
mapFrame.style.display = "none";
mapMessage.style.display = "flex";

// Populate dropdown from Firebase
const snapshot = await getDocs(collection(db, "places"));

snapshot.forEach(docSnap => {
  const data = docSnap.data();
  if (!data.name || !data.lat || !data.lng) return;

  const option = document.createElement("option");
  option.textContent = data.name;
  option.value = `${data.lat},${data.lng}`;
  select.appendChild(option);
});

// Handle selection change
select.addEventListener("change", () => {
  if (!select.value) {
    // No place selected
    mapFrame.style.display = "none";
    mapMessage.innerText = "Please select a place to navigate";
    mapMessage.style.display = "flex";
    return;
  }

  const [lat, lng] = select.value.split(",");
  mapFrame.src = `https://www.google.com/maps?q=${lat},${lng}&output=embed`;
  mapFrame.style.display = "block";
  mapMessage.style.display = "none";
});
