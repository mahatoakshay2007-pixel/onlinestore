fetch("header.html")
    .then(response => response.text())
    .then(data => {

        const header = document.getElementById("header");

        if (!header) return;

        header.innerHTML = data;

        // Update header after it has loaded
        if (typeof updateCartCount === "function") {
            updateCartCount();
        }

        if (typeof updateProfileLink === "function") {
            updateProfileLink();
        }

        // Put search query back into search box
        const params =
            new URLSearchParams(window.location.search);

        const searchTerm =
            params.get("search");

        const searchInput =
            document.getElementById("searchInput");

        if (searchTerm && searchInput) {
            searchInput.value = searchTerm;
        }

    })
    .catch(error => {
        console.error("Header loading error:", error);
    });