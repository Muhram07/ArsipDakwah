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

    data.forEach(item=>{

        container.innerHTML+=`

        <div class="poster"
        onclick="bukaPoster('${item.id}')"
        style="cursor:pointer;">

            <img src="${item.image}" alt="${item.title}">

            <h3>${item.title}</h3>

            <p>${item.caption}</p>

            <small>📂 ${item.category}</small>

            <div style="padding:0 20px 20px;">

                <button onclick="event.stopPropagation();toggleCaption('${item.id}')">

                    📖 Baca Caption

                </button>

                <button onclick="event.stopPropagation();copyCaption('${item.id}')">

                    📋 Copy Caption

                </button>

            </div>

            <div
            id="caption-${item.id}"
            class="caption-box">

${item.content}

            </div>

        </div>

        `;

    });

}

function bukaPoster(id){

    location.href="poster.html?id="+id;

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

const search=document.getElementById("search");

search.addEventListener("input",function(){

    const key=this.value.trim().toLowerCase();

    if(key===""){

        renderPoster(posterData);

        return;

    }

    const hasil=posterData.filter(item=>{

        const tags=(item.tags||[]).join(" ").toLowerCase();

        return(

            item.title.toLowerCase().includes(key)

            ||

            item.category.toLowerCase().includes(key)

            ||

            item.caption.toLowerCase().includes(key)

            ||

            tags.includes(key)

        );

    });

    renderPoster(hasil);

});

loadPosters();
