const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "login.html";
}

// ==========================
// Basic User Details
// ==========================

document.getElementById("name").textContent = currentUser.fullName;
document.getElementById("email").textContent = currentUser.email;
document.getElementById("age").textContent = currentUser.age + " Years";

document.getElementById("restriction").textContent =
    currentUser.isAdult
        ? "Eligible for 18+ Movies ✅"
        : "Under 18 - Adult Movies Blocked 🚫";

// ==========================
// Movies Watched
// ==========================

const watchHistory =
    JSON.parse(localStorage.getItem("watchHistory")) || [];

document.getElementById("watched").textContent =
    watchHistory.length;

// ==========================
// Favorites
// ==========================

const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

document.getElementById("favorites").textContent =
    favorites.length;

// ==========================
// Ratings Given
// ==========================

let ratingCount = 0;

for (let key in localStorage) {

    if (key.startsWith("rating_")) {
        ratingCount++;
    }

}

document.getElementById("ratings").textContent =
    ratingCount;

// ==========================
// Last Watched Movie
// ==========================

if (watchHistory.length > 0) {

    document.getElementById("lastMovie").textContent =
        watchHistory[0].title;

} else {

    document.getElementById("lastMovie").textContent =
        "No Movie Watched";

}