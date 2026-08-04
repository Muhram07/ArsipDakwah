const params = new URLSearchParams(window.location.search);

const id = params.get("id");

async function loadPoster() {

    try {

        const res = await fetch("data/posters.json");

        const posters = await res.json();

        const poster = posters.find(item => item.id === id);

        const detail = document.getElementById("detail");

        if (!poster) {

            detail.innerHTML = "<h2>Poster tidak ditemukan.</h2>";

            return;

        }

        document.title = poster.title;

        document.getElementById("judul").innerText = poster.title;

        detail.innerHTML = `

        <div class="poster">

            <img src="${poster.image}" alt="${poster.title}">

            <h3>${poster.title}</h3>

            <p>${poster.caption}</p>

            <small>${poster.category}</small>

            <button onclick="copyCaption()">

                📋 Copy Caption

            </button>

            <a href="${poster.image}" download>

                <button>

                    📥 Download Poster

                </button>

            </a>

            <div class="caption-box" style="display:block">

                ${poster.content}

            </div>

        </div>

        `;

        window.caption = poster.content;

    }

    catch (e) {

        document.getElementById("detail").innerHTML =
        "<h2>Gagal memuat poster.</h2>";

    }

}

function copyCaption() {

    navigator.clipboard.writeText(window.caption);

    alert("✅ Caption berhasil disalin");

}

loadPoster();
