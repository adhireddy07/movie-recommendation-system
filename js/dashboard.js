const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieContainer = document.getElementById("movieContainer");

// Page load ayinappudu trending movies load cheyyi
loadTrendingMovies();

searchBtn.addEventListener("click", () => {

    const movieName = searchInput.value.trim();

    if (movieName === "") {
        loadTrendingMovies();
    } else {
        searchMovie(movieName);
    }

});

async function loadTrendingMovies() {

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

    displayMovies(data.results);
}

async function searchMovie(movieName) {

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

    displayMovies(data.results);
}

function displayMovies(movies) {

console.log(currentUser);
    movieContainer.innerHTML = "";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const isAdult = currentUser ? currentUser.isAdult : false;

movies.forEach(movie => {

    if (movie.adult && !isAdult) {
        return;
    }
        const poster = movie.poster_path
            ? IMAGE_URL + movie.poster_path
            : "https://via.placeholder.com/300x450?text=No+Image";

        movieContainer.innerHTML += `
        <div class="col-md-3 mb-4">

            <div class="card bg-dark text-white h-100">

                <img src="${poster}" class="card-img-top">

                <div class="card-body">

                    <h5>${movie.title}</h5>

                    <p>⭐ ${movie.vote_average.toFixed(1)}</p>

                    <p>${movie.release_date || "N/A"}</p>

                    <button
                        class="btn btn-warning w-100"
                        onclick="viewMovie(${movie.id})">
                        View Details
                    </button>

                </div>

            </div>

        </div>
        `;
    });

}

function viewMovie(id) {
    window.location.href = `movie-details.html?id=${id}`;
}