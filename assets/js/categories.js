async function loadCategories(){

    try{

        const res = await fetch("data/categories.json");
        const categories = await res.json();

        const container = document.getElementById("category-list");

        container.innerHTML = "";

        categories.forEach(cat=>{

            const jumlah =
            posterData.filter(p=>p.category===cat.name).length;

            container.innerHTML += `

            <div class="card"
                 id="cat-${cat.id}"
                 onclick="filterCategory('${cat.name}','${cat.id}')">

                <div style="font-size:42px">
                    ${cat.icon}
                </div>

                <h3 style="
                    margin-top:12px;
                    font-size:24px;
                    color:white;
                ">
                    ${cat.name}
                </h3>

                <p style="
                    margin-top:10px;
                    color:#bdbdbd;
                    line-height:1.6;
                    font-size:15px;
                ">
                    ${cat.description}
                </p>

                <div style="
                    margin-top:18px;
                    color:#FFD700;
                    font-weight:bold;
                ">
                    📄 ${jumlah} Poster
                </div>

            </div>

            `;

        });

    }catch(e){

        document.getElementById("category-list").innerHTML=

        "<h3>❌ Gagal memuat kategori.</h3>";

    }

}

function filterCategory(category,id){

    document.querySelectorAll(".card").forEach(card=>{

        card.style.borderColor="#222";
        card.style.boxShadow="none";

    });

    const aktif=document.getElementById("cat-"+id);

    if(aktif){

        aktif.style.borderColor="#FFD700";
        aktif.style.boxShadow="0 0 20px rgba(255,215,0,.35)";

    }

    const hasil = posterData.filter(item=>

        item.category===category

    );

    renderPoster(hasil);

    document.getElementById("post-list")
    .scrollIntoView({

        behavior:"smooth"

    });

}

loadCategories();
