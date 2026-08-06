import { auth } from "./firebase.js";
import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
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
            dob,
            age,
            isAdult: age >= 18
        };

        // Save all users in localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Prevent duplicate users
        if (!users.some(user => user.email === email)) {
            users.push(userData);
            localStorage.setItem("users", JSON.stringify(users));
        }

        alert("Registration Successful!");

        window.location.href = "login.html";

    } catch (error) {

        alert(error.message);
        console.error(error);

    }

});