const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "login.html";
}

document.getElementById("name").textContent = currentUser.fullName;
document.getElementById("email").textContent = currentUser.email;
document.getElementById("age").textContent = currentUser.age + " Years";

document.getElementById("restriction").textContent =
    currentUser.isAdult
        ? "Eligible for 18+ Movies"
        : "Under 18 - Adult Movies Blocked";