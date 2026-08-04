let posterData = [];

async function loadPosters(){

    try{

        const res = await fetch("data/posters.json");
        posterData = await res.json();

        renderPoster(posterData);

    }catch(e){

        document.getElementById("post-list").innerHTML=
        "<h3>Gagal memuat data.</h3>";

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

        <div class="poster">

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

    box.style.display=
    box.style.display==="block"
    ? "none"
    : "block";

}

function copyCaption(id){

    navigator.clipboard.writeText(
        posterData[id].content
    );

    alert("✅ Caption berhasil disalin");

}

/* =======================
      SEARCH
======================= */

const search=document.getElementById("search");

search.addEventListener("input",function(){

    const key=this.value
    .trim()
    .toLowerCase();

    if(key===""){

        renderPoster(posterData);

        return;

    }

    const hasil=posterData.filter(item=>{

        const tagText=(item.tags||[])
        .join(" ")
        .toLowerCase();

        return(

            item.title.toLowerCase().includes(key)

            ||

            item.category.toLowerCase().includes(key)

            ||

            item.caption.toLowerCase().includes(key)

            ||

            tagText.includes(key)

        );

    });

    renderPoster(hasil);

});

loadPosters();
