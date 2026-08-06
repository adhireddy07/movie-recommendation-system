import { auth } from "./firebase.js";
import { signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        await signInWithEmailAndPassword(auth, email, password);

        // Get all registered users
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Find current user
        const user = users.find(u => u.email === email);

        if (user) {

            localStorage.setItem("currentUser", JSON.stringify(user));

        } else {

            localStorage.setItem("currentUser", JSON.stringify({
                email: email,
                age: 18,
                isAdult: true
            }));

        }

        alert("Login Successful!");

        window.location.href = "dashboard.html";

    } catch (error) {

        alert(error.message);
        console.error(error);

    }

});