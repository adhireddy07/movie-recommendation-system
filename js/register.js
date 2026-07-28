const form = document.querySelector("form");
const dob = document.getElementById("dob");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const birthDate = new Date(dob.value);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // Age save
    localStorage.setItem("userAge", age);

    // Adult status save
    if (age >= 18) {
        localStorage.setItem("isAdult", "true");
    } else {
        localStorage.setItem("isAdult", "false");
    }

    alert("Registration Successful!");

    window.location.href = "login.html";
});