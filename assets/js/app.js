let posterData = [];

async function loadPosters() {

    try {

        const res = await fetch("data/posters.json");

        posterData = await res.json();

        renderPoster(posterData);

    }

    catch (e) {

        document.getElementById("post-list").innerHTML =
        "<h3>Gagal memuat data.</h3>";

    }

}

function renderPoster(data) {

    const container = document.getElementById("post-list");

    container.innerHTML = "";

    if (data.length === 0) {

        container.innerHTML = "<h3>Tidak ada hasil.</h3>";

        return;

    }

    data.forEach(item => {

        container.innerHTML += `

        <div class="poster">

            <a href="poster.html?id=${item.id}">

                <img src="${item.image}" alt="${item.title}">

            </a>

            <h3>${item.title}</h3>

            <p>${item.caption}</p>

            <small>${item.category}</small>

            <button onclick="window.location.href='poster.html?id=${item.id}'">

                📖 Baca Caption

            </button>

            <button onclick="copyCaption('${item.id}')">

                📋 Copy Caption

            </button>

        </div>

        `;

    });

}

function copyCaption(id) {

    const poster = posterData.find(item => item.id === id);

    navigator.clipboard.writeText(poster.content);

    alert("✅ Caption berhasil disalin");

}

const search = document.getElementById("search");

const resultBox = document.createElement("div");

resultBox.id = "search-result";

search.after(resultBox);

search.addEventListener("input", function () {

    const key = this.value.trim().toLowerCase();

    if (key === "") {

        resultBox.innerHTML = "";

        renderPoster(posterData);

        return;

    }

    const hasil = posterData.filter(item =>

        item.title.toLowerCase().includes(key) ||

        item.category.toLowerCase().includes(key) ||

        item.caption.toLowerCase().includes(key)

    );

    resultBox.innerHTML = "";

    hasil.forEach(item => {

        resultBox.innerHTML += `

        <div class="search-item"

        onclick="window.location.href='poster.html?id=${item.id}'">

            <b>📚 ${item.title}</b>

            <small>${item.category}</small>

        </div>

        `;

    });

});

loadPosters();
