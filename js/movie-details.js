console.log("movie-details.js loaded");

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

// Load Movie Details
fetch(`${BASE_URL}/movie/${movieId}`, {
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
    }
})
.then(response => response.json())
.then(movie => {
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const isAdult = currentUser ? currentUser.isAdult : false;

const title = movie.title.toLowerCase();

const isBlockedMovie = blockedMovies.some(name =>
    title.includes(name.toLowerCase())
);

const hasBlockedKeyword = blockedKeywords.some(word =>
    title.includes(word.toLowerCase())
);

if (!isAdult && (movie.adult || isBlockedMovie || hasBlockedKeyword)) {

    document.body.innerHTML = `
        <div class="container text-center mt-5">
            <h1>🚫 Access Denied</h1>
            <h4>This movie is restricted for users under 18.</h4>

            <a href="dashboard.html" class="btn btn-warning mt-4">
                Back to Dashboard
            </a>
        </div>
    `;

    return;
}

    console.log("Movie:", movie.title);
    console.log("Adult:", movie.adult);

    // Movie Details
    document.getElementById("poster").src =
        IMAGE_URL + movie.poster_path;

    document.getElementById("title").textContent =
        movie.title;

    document.getElementById("rating").textContent =
        movie.vote_average.toFixed(1);

    document.getElementById("genre").textContent =
        movie.genres.map(g => g.name).join(", ");

    document.getElementById("language").textContent =
        movie.original_language.toUpperCase();

    document.getElementById("release").textContent =
        movie.release_date;

    document.getElementById("overview").textContent =
        movie.overview;
localStorage.setItem("continueMovie", JSON.stringify(movie));
    // ==========================
    // Favorites
    // ==========================

    document.getElementById("favoriteBtn").onclick = function () {

        let favorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

        const alreadyExists =
            favorites.find(f => f.id === movie.id);

        if (alreadyExists) {
            alert("Movie is already in Favorites!");
            return;
        }

        favorites.push({
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path
        });

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

        alert("Movie added to Favorites ❤️");
    };

    // ==========================
    // Trailer
    // ==========================

    document.getElementById("trailerBtn").onclick = async function () {

        try {

            const response = await fetch(
                `${BASE_URL}/movie/${movieId}/videos`,
                {
                    headers: {
                        Authorization: `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            const data = await response.json();

            const trailer = data.results.find(video =>
                video.site === "YouTube" &&
                video.type === "Trailer"
            );

            if (trailer) {

                window.open(
                    `https://www.youtube.com/watch?v=${trailer.key}`,
                    "_blank"
                );

            } else {

                alert("Trailer not available.");

            }

        } catch (error) {

            console.log(error);

            alert("Error loading trailer.");

        }

    };

    // ==========================
    // Rating System
    // ==========================

    const stars =
        document.querySelectorAll(".star");

    const ratingText =
        document.getElementById("userRating");

    const ratingKey =
        "rating_" + movie.id;

    const savedRating =
        localStorage.getItem(ratingKey);

    if (savedRating) {

        ratingText.textContent =
            savedRating + " / 5";

        highlightStars(savedRating);

    }

    stars.forEach(star => {

        star.addEventListener("click", function () {

            const rating =
                Number(this.dataset.rating);

            localStorage.setItem(
                ratingKey,
                rating
            );

            ratingText.textContent =
                rating + " / 5";

            highlightStars(rating);

           ratingText.textContent = rating + " / 5 (Saved)"; 
        });

    });

    function highlightStars(rating) {

        stars.forEach(star => {

            if (
                Number(star.dataset.rating) <= rating
            ) {

                star.style.color = "gold";

            } else {

                star.style.color = "white";

            }

        });

    }

})
.catch(error => {
    console.log(error);
});