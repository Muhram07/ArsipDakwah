let posterData = [];

async function loadPosters() {

  const container = document.getElementById("post-list");

  try {

    const res = await fetch("data/posters.json");

    posterData = await res.json();

    renderPoster(posterData);

  } catch (e) {

    container.innerHTML = "<h3>Gagal memuat data.</h3>";

  }

}

function renderPoster(data){

  const container=document.getElementById("post-list");

  container.innerHTML="";

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

  if(box.style.display==="block"){

    box.style.display="none";

  }else{

    box.style.display="block";

  }

}

function copyCaption(id){

  navigator.clipboard.writeText(posterData[id].content);

  alert("✅ Caption berhasil disalin");

}

document.addEventListener("input",function(e){

  if(e.target.id==="search"){

    const key=e.target.value.toLowerCase();

    const hasil=posterData.filter(item=>

      item.title.toLowerCase().includes(key)||

      item.category.toLowerCase().includes(key)||

      item.caption.toLowerCase().includes(key)

    );

    renderPoster(hasil);

  }

});

loadPosters();
