import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    try {

        await createUserWithEmailAndPassword(auth, email, password);

        const userData = {
            fullName,
            email,
            age,
            isAdult: age >= 18
        };

        localStorage.setItem("currentUser", JSON.stringify(userData));

        alert("Registration Successful!");

        window.location.href = "login.html";

    } catch (error) {

        alert(error.message);

    }
});