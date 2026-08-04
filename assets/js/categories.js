async function loadCategories() {

    try {

        const res = await fetch("data/categories.json");
        const categories = await res.json();

        const container = document.getElementById("category-list");

        container.innerHTML = "";

        categories.forEach(cat => {

            container.innerHTML += `

            <div class="card"
                 onclick="filterCategory('${cat.name}')">

                <div style="font-size:40px;margin-bottom:12px;">
                    ${cat.icon}
                </div>

                <div style="font-size:24px;font-weight:bold;">
                    ${cat.name}
                </div>

                <div style="
                    font-size:15px;
                    color:#bbb;
                    margin-top:10px;
                    line-height:1.6;
                ">
                    ${cat.description}
                </div>

            </div>

            `;

        });

    } catch (e) {

        document.getElementById("category-list").innerHTML =
        "<p>❌ Gagal memuat kategori.</p>";

    }

}

function filterCategory(category){

    const hasil = posterData.filter(item =>
        item.category === category
    );

    renderPoster(hasil);

    document.getElementById("post-list")
        .scrollIntoView({
            behavior:"smooth"
        });

}

loadCategories();
