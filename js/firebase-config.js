// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey:  "AIzaSyBaETLyUcDmMg01pmix2x6lDUEzeKbH2VE",
  authDomain: "cineverse-2720c.firebaseapp.com",
  projectId:  "cineverse-2720c",
  storageBucket: "cineverse-2720c.firebasestorage.app",
  messagingSenderId: "1028276478538",
  appId: "1:1028276478538:web:12c8a3cdaf64d244507cb3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };