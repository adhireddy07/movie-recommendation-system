import { auth } from "./firebase.js";
import { signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = {
            email: userCredential.user.email,
            isAdult: true
        };

        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Login Successful!");

        window.location.href = "dashboard.html";

    } catch (error) {

        alert(error.message);

    }

});