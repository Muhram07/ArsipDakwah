async function loadPosters() {

  const container = document.getElementById("post-list");

  try {

    const res = await fetch("data/posters.json");

    const posters = await res.json();

    container.innerHTML = "";

    posters.forEach((item,index)=>{

      container.innerHTML += `

      <div class="poster">

        <img src="${item.image}" alt="${item.title}">

        <h3>${item.title}</h3>

        <p>${item.caption}</p>

        <small>${item.category}</small>

        <br><br>

        <button onclick="toggleCaption(${index})">
        📖 Baca Caption
        </button>

        <button onclick="copyCaption(${index})">
        📋 Copy Caption
        </button>

        <div
        id="caption-${index}"
        class="caption-box"
        style="display:none;">

        ${item.content}

        </div>

      </div>

      `;

    });

    window.posterData = posters;

  } catch (e) {

    container.innerHTML="Gagal memuat data.";

  }

}

function toggleCaption(id){

  const box=document.getElementById("caption-"+id);

  if(box.style.display==="none"){

    box.style.display="block";

  }else{

    box.style.display="none";

  }

}

function copyCaption(id){

  navigator.clipboard.writeText(window.posterData[id].content);

  alert("✅ Caption berhasil disalin");

}

loadPosters();
