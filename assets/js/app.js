async function loadPosters() {

  const container = document.getElementById("post-list");

  try {

    const res = await fetch("data/posters.json");

    const posters = await res.json();

    container.innerHTML = "";

    posters.forEach(item => {

      container.innerHTML += `
      <div class="poster">

        <img src="${item.image}" alt="${item.title}">

        <h3>${item.title}</h3>

        <p>${item.caption}</p>

        <small>${item.category}</small>

      </div>
      `;

    });

  } catch (e) {

    container.innerHTML = "Gagal memuat data.";

  }

}

loadPosters();
