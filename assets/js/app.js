let posterData = [];

async function loadPosters(){

    try{

        const res = await fetch("data/posters.json");
        posterData = await res.json();

        renderPoster(posterData);

    }catch(e){

        document.getElementById("post-list").innerHTML="<h3>Gagal memuat data.</h3>";

    }

}

function renderPoster(data){

    const container=document.getElementById("post-list");

    container.innerHTML="";

    if(data.length===0){

        container.innerHTML="<h3>Tidak ada hasil.</h3>";
        return;

    }

    data.forEach((item,index)=>{

        container.innerHTML+=`

        <div class="poster" id="poster-${index}">

            <img src="${item.image}" alt="${item.title}">

            <h3>${item.title}</h3>

            <p>${item.caption}</p>

            <small>${item.category}</small>

            <button onclick="toggleCaption(${index})">
            📖 Baca Caption
            </button>

            <button onclick="copyCaption(${index})">
            📋 Copy Caption
            </button>

            <div
            id="caption-${index}"
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

    navigator.clipboard.writeText(posterData[id].content);

    alert("✅ Caption berhasil disalin");

}

const search=document.getElementById("search");

const resultBox=document.createElement("div");

resultBox.id="search-result";

search.after(resultBox);

search.addEventListener("input",function(){

    const key=this.value.trim().toLowerCase();

    if(key===""){

        resultBox.innerHTML="";
        renderPoster(posterData);
        return;

    }

    const hasil=posterData.filter(item=>

        item.title.toLowerCase().includes(key) ||

        item.category.toLowerCase().includes(key) ||

        item.caption.toLowerCase().includes(key)

    );

    resultBox.innerHTML="";

    if(hasil.length===0){

        resultBox.innerHTML="<div class='search-item'>Tidak ada hasil.</div>";

        return;

    }

    hasil.forEach(item=>{

        resultBox.innerHTML+=`

        <div class="search-item"
        onclick="pilihPoster('${item.title}')">

            <b>📚 ${item.title}</b>

            <small>${item.category}</small>

        </div>

        `;

    });

});

function pilihPoster(judul){

    resultBox.innerHTML="";

    search.value="";

    const hasil=posterData.filter(item=>item.title===judul);

    renderPoster(hasil);

    setTimeout(()=>{

        document.getElementById("post-list").scrollIntoView({

            behavior:"smooth"

        });

    },150);

}

loadPosters();
