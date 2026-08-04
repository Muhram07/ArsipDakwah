let posterData = [];
let categoryData = [];

const search = document.getElementById("search");

const resultBox = document.createElement("div");
resultBox.id = "search-result";
search.after(resultBox);

async function loadPosters(){

    try{

        const res = await fetch("data/posters.json");
        posterData = await res.json();

        renderPoster(posterData);

    }catch(e){

        document.getElementById("post-list").innerHTML="<h3>Gagal memuat data.</h3>";

    }

}

async function loadCategories(){

    try{

        const res = await fetch("data/categories.json");

        categoryData = await res.json();

        const box = document.getElementById("kategori-list");

        box.innerHTML="";

        categoryData.forEach(cat=>{

            box.innerHTML += `

            <div class="card"

            onclick="filterKategori('${cat.id}')">

            ${cat.icon}

            <br><br>

            ${cat.name}

            </div>

            `;

        });

    }catch(e){

        console.log(e);

    }

}

function renderPoster(data){

    const container=document.getElementById("post-list");

    container.innerHTML="";

    if(data.length===0){

        container.innerHTML="<h3>Tidak ada hasil.</h3>";

        return;

    }

    data.forEach(item=>{

        container.innerHTML+=`

        <div class="poster"

        id="${item.id}">

            <img src="${item.image}">

            <h3>${item.title}</h3>

            <p>${item.caption}</p>

            <small>${item.category}</small>

            <button onclick="toggleCaption('${item.id}')">

            📖 Baca Caption

            </button>

            <button onclick="copyCaption('${item.id}')">

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

function toggleCaption(id){

    const box=document.getElementById("caption-"+id);

    if(box.style.display==="block"){

        box.style.display="none";

    }else{

        box.style.display="block";

        box.scrollIntoView({

            behavior:"smooth",

            block:"center"

        });

    }

}

function copyCaption(id){

    const poster=posterData.find(p=>p.id===id);

    navigator.clipboard.writeText(poster.content);

    alert("✅ Caption berhasil disalin");

}

function filterKategori(id){

    resultBox.innerHTML="";

    search.value="";

    const hasil=posterData.filter(p=>p.category===id);

    renderPoster(hasil);

    document.getElementById("post-list")

    .scrollIntoView({

        behavior:"smooth"

    });

}

search.addEventListener("input",function(){

    const key=this.value.trim().toLowerCase();

    if(key===""){

        resultBox.innerHTML="";

        renderPoster(posterData);

        return;

    }

    const hasil=posterData.filter(item=>

        item.title.toLowerCase().includes(key)||

        item.category.toLowerCase().includes(key)||

        item.caption.toLowerCase().includes(key)||

        item.tags.join(" ").toLowerCase().includes(key)

    );

    resultBox.innerHTML="";

    if(hasil.length===0){

        resultBox.innerHTML="<div class='search-item'>Tidak ada hasil.</div>";

        return;

    }

    hasil.forEach(item=>{

        resultBox.innerHTML+=`

        <div

        class="search-item"

        onclick="goPoster('${item.id}')">

        <b>${item.title}</b>

        <small>${item.category}</small>

        </div>

        `;

    });

});

function goPoster(id){

    resultBox.innerHTML="";

    search.value="";

    renderPoster(posterData);

    setTimeout(()=>{

        document.getElementById(id)

        .scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    },150);

}

loadCategories();

loadPosters();
