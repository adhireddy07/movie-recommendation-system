const container = document.getElementById("favoriteContainer");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// ==========================
// No Favorites
// ==========================

if (favorites.length === 0) {

    container.innerHTML = `
        <div class="col-12 text-center mt-5">

            <h2 class="text-warning">
                ❤️ No Favorite Movies Yet
            </h2>

            <p class="text-light">
                Go to Dashboard and add your favorite movies.
            </p>

            <a href="dashboard.html" class="btn btn-warning">
                Browse Movies
            </a>

        </div>
    `;

} else {

    favorites.forEach(movie => {

        const poster = movie.poster
            ? `https://image.tmdb.org/t/p/w500${movie.poster}`
            : "https://via.placeholder.com/300x450?text=No+Image";

        container.innerHTML += `

        <div class="col-md-3 mb-4">

            <div class="card text-white h-100">

                <img src="${poster}" class="card-img-top">

                <div class="card-body d-flex flex-column">

                    <h5>${movie.title}</h5>

                    <button
                        class="btn btn-danger mt-auto"
                        onclick="removeFavorite(${movie.id})">
                        🗑 Remove
                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

// ==========================
// Remove Favorite
// ==========================

function removeFavorite(id) {

    const confirmDelete = confirm(
        "Remove this movie from Favorites?"
    );

    if (!confirmDelete) {
        return;
    }

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(movie => movie.id !== id);

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    alert("Movie removed from Favorites!");

    location.reload();

}