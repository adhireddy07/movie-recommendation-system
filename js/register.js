import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

console.log("register.js loaded");

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);

        alert("Registration Successful!");
        window.location.href = "login.html";

    } catch (error) {
        alert(error.message);
    }
});