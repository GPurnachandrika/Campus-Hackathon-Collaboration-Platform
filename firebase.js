import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "campusnavigator-d3df5.firebaseapp.com",
  projectId: "campusnavigator-d3df5",
  storageBucket: "campusnavigator-d3df5.appspot.com",
  messagingSenderId: "1012224738580",
  appId: "1:1012224738580:web:9ffd1849e02cfb8b612e01",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
