let posterData = [];

/* =========================
   LOAD POSTER
========================= */

async function loadPosters() {

    try {

        const res = await fetch("data/posters.json");

        if (!res.ok) throw new Error();

        posterData = await res.json();

        renderPoster(posterData);

        // Kalau categories.js sudah dimuat,
        // hitung ulang jumlah poster tiap kategori
        if (typeof updateCategoryCount === "function") {
            updateCategoryCount();
        }

    } catch (e) {

        document.getElementById("post-list").innerHTML = `
        <div class="loading">
            ❌ Gagal memuat poster.
        </div>
        `;

    }

}

/* =========================
   RENDER POSTER
========================= */

function renderPoster(data) {

    const container = document.getElementById("post-list");

    container.innerHTML = "";

    if (!data || data.length === 0) {

        container.innerHTML = `
        <div class="loading">
            Tidak ada hasil.
        </div>
        `;

        return;

    }

    data.forEach(item => {

        container.innerHTML += `

        <div class="poster">

            <img
            src="${item.image}"
            alt="${item.title}"
            onclick="bukaPoster('${item.id}')">

            <h3 onclick="bukaPoster('${item.id}')">
                ${item.title}
            </h3>

            <p>
                ${item.caption}
            </p>

            <small>
                📂 ${item.category}
            </small>

            <button
            onclick="toggleCaption('${item.id}')">

                📖 Baca Caption

            </button>

            <button
            onclick="copyCaption('${item.id}')">

                📋 Copy Caption

            </button>

            <div
            id="caption-${item.id}"
            class="caption-box">

${item.content}

            </div>

        </div>

        `;

    });

}

/* =========================
   DETAIL POSTER
========================= */

function bukaPoster(id) {

    window.location.href =
    "poster.html?id=" + encodeURIComponent(id);

}

/* =========================
   CAPTION
========================= */

function toggleCaption(id) {

    const box =
    document.getElementById("caption-" + id);

    if (!box) return;

    if (box.style.display === "block") {

        box.style.display = "none";

    } else {

        box.style.display = "block";

        box.scrollIntoView({

            behavior: "smooth",
            block: "center"

        });

    }

}

function copyCaption(id) {

    const poster =
    posterData.find(p => p.id === id);

    if (!poster) return;

    navigator.clipboard.writeText(poster.content);

    alert("✅ Caption berhasil disalin");

}

/* =========================
   SEARCH
========================= */

const search =
document.getElementById("search");

search.addEventListener("input", function () {

    const keyword =
    this.value.trim().toLowerCase();

    if (keyword === "") {

        renderPoster(posterData);

        return;

    }

    const hasil = posterData.filter(item => {

        const tags =
        (item.tags || []).join(" ").toLowerCase();

        return (

            item.title.toLowerCase().includes(keyword) ||

            item.category.toLowerCase().includes(keyword) ||

            item.caption.toLowerCase().includes(keyword) ||

            tags.includes(keyword)

        );

    });

    renderPoster(hasil);

});

/* =========================
   FILTER KATEGORI
========================= */

function filterCategory(category) {

    const hasil = posterData.filter(item =>
        item.category === category
    );

    renderPoster(hasil);

    document.getElementById("post-list")
    .scrollIntoView({

        behavior: "smooth"

    });

}

/* ========================= */

loadPosters();
