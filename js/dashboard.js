const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "login.html";
}
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieContainer = document.getElementById("movieContainer");

// Load Trending Movies
loadTrendingMovies();

// Search Button
searchBtn.addEventListener("click", () => {

    const movieName = searchInput.value.trim();

    if (movieName === "") {
        loadTrendingMovies();
    } else {
        searchMovie(movieName);
    }

});

// ==========================
// Load Trending Movies
// ==========================

async function loadTrendingMovies() {

    try {

        const response = await fetch(
            `${BASE_URL}/trending/movie/week`,
            {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const data = await response.json();

        displayMovies(data.results || []);

    } catch (error) {

        console.log(error);

    }

}

// ==========================
// Search Movie
// ==========================

async function searchMovie(movieName) {

    try {

        const response = await fetch(
            `${BASE_URL}/search/movie?query=${encodeURIComponent(movieName)}`,
            {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const data = await response.json();

        displayMovies(data.results || []);

    } catch (error) {

        console.log(error);

    }

}

// ==========================
// Display Movies
// ==========================

function displayMovies(movies) {

    movieContainer.innerHTML = "";

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const isAdult = currentUser ? currentUser.isAdult : false;

    movies.forEach(movie => {

        const title = (movie.title || "").toLowerCase();

        const isBlockedMovie = blockedMovies.some(name =>
            title.includes(name.toLowerCase())
        );

        const hasBlockedKeyword = blockedKeywords.some(word =>
            title.includes(word.toLowerCase())
        );

        if (!isAdult && (movie.adult || isBlockedMovie || hasBlockedKeyword)) {
            return;
        }

        const poster = movie.poster_path
            ? IMAGE_URL + movie.poster_path
            : "https://via.placeholder.com/300x450?text=No+Image";

        movieContainer.innerHTML += `
        <div class="col-md-3 mb-4">

            <div class="card bg-dark text-white h-100">

                <img src="${poster}" class="card-img-top" alt="${movie.title}">

                <div class="card-body d-flex flex-column">

                    <h5>${movie.title}</h5>

                    <p>⭐ ${movie.vote_average.toFixed(1)}</p>

                    <p>${movie.release_date || "N/A"}</p>

                    <button
                        class="btn btn-warning mt-auto"
                        onclick="viewMovie(${movie.id})">
                        View Details
                    </button>

                </div>

            </div>

        </div>
        `;

    });

    if (movieContainer.innerHTML === "") {

        movieContainer.innerHTML = `
            <div class="col-12 text-center mt-5">
                <h3>No movies found.</h3>
            </div>
        `;

    }

}

// ==========================
// View Movie
// ==========================

function viewMovie(id) {

    window.location.href = `movie-details.html?id=${id}`;

}
function logout() {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {

        localStorage.removeItem("currentUser");

        alert("Logged out successfully!");

        window.location.href = "login.html";

    }

}
const lastMovie = JSON.parse(localStorage.getItem("continueMovie"));

if (lastMovie) {

    const section = document.getElementById("continueSection");
    const title = document.getElementById("continueTitle");

    if (section && title) {
        section.style.display = "block";
        title.innerText = lastMovie.title;
    }

}

function resumeMovie() {

    const movie = JSON.parse(localStorage.getItem("continueMovie"));

    if (movie) {
        localStorage.setItem("selectedMovie", JSON.stringify(movie));
        window.location.href = "movie-details.html";
    }

}
// ==========================
// Recently Watched
// ==========================

const watchHistory = JSON.parse(localStorage.getItem("watchHistory")) || [];

const historySection = document.getElementById("historySection");
const historyContainer = document.getElementById("historyContainer");

if (watchHistory.length > 0) {

    historySection.style.display = "block";

    watchHistory.forEach(movie => {

        const poster = movie.poster
            ? IMAGE_URL + movie.poster
            : "https://via.placeholder.com/300x450?text=No+Image";

        historyContainer.innerHTML += `
        <div class="col-md-3 mb-4">

            <div class="card bg-dark text-white h-100">

                <img src="${poster}" class="card-img-top">

                <div class="card-body">

                    <h5>${movie.title}</h5>

                </div>

            </div>

        </div>
        `;

    });

}
// ==========================
// Smart Recommendations
// ==========================

const recommendSection = document.getElementById("recommendSection");
const recommendContainer = document.getElementById("recommendContainer");

loadRecommendations();

async function loadRecommendations() {

    const watchHistory = JSON.parse(localStorage.getItem("watchHistory")) || [];

    if (watchHistory.length === 0) return;

    recommendSection.style.display = "block";

    // Last watched movie
    const lastMovie = watchHistory[0];

    try {

        const response = await fetch(
            `${BASE_URL}/movie/${lastMovie.id}/recommendations`,
            {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const data = await response.json();

        displayRecommendations(data.results || []);

    } catch (error) {

        console.log(error);

    }

}

function displayRecommendations(movies) {

    recommendContainer.innerHTML = "";

    movies.slice(0,8).forEach(movie => {

        const poster = movie.poster_path
            ? IMAGE_URL + movie.poster_path
            : "https://via.placeholder.com/300x450?text=No+Image";

        recommendContainer.innerHTML += `

        <div class="col-md-3 mb-4">

            <div class="card bg-dark text-white h-100">

                <img src="${poster}" class="card-img-top">

                <div class="card-body d-flex flex-column">

                    <h5>${movie.title}</h5>

                    <p>⭐ ${movie.vote_average.toFixed(1)}</p>

                    <button
                        class="btn btn-warning mt-auto"
                        onclick="viewMovie(${movie.id})">

                        View Details

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}
window.addEventListener("load", function () {
    document.body.classList.add("loaded");
});
// ==========================
// Theme Toggle
// ==========================

const themeBtn = document.getElementById("themeBtn");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if(savedTheme === "light"){
    document.body.classList.add("light-mode");
    themeBtn.innerHTML = "☀️ Light";
}

themeBtn.onclick = function(){

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){

        localStorage.setItem("theme","light");
        themeBtn.innerHTML = "☀️ Light";

    }else{

        localStorage.setItem("theme","dark");
        themeBtn.innerHTML = "🌙 Dark";

    }

};