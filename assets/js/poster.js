const params = new URLSearchParams(window.location.search);

const id = params.get("id");

async function loadPoster(){

    try{

        const res = await fetch("data/posters.json");

        const posters = await res.json();

        const poster = posters.find(item=>item.id===id);

        if(!poster){

            document.body.innerHTML=`

            <div style="
                text-align:center;
                margin-top:100px;
                color:white;
                font-size:30px;
            ">

            ❌ Poster tidak ditemukan

            </div>

            `;

            return;

        }

        document.title=poster.title;

        document.getElementById("judul").textContent=
        poster.title;

        document.getElementById("judul2").textContent=
        poster.title;

        document.getElementById("kategori").textContent=
        "📚 "+poster.category;

        document.getElementById("gambar").src=
        poster.image;

        document.getElementById("gambar").alt=
        poster.title;

        document.getElementById("caption").textContent=
        poster.caption;

        document.getElementById("isi").textContent=
        poster.content;

        document.getElementById("copy").onclick=function(){

            navigator.clipboard.writeText(poster.content);

            alert("✅ Caption berhasil disalin");

        };

    }catch(e){

        document.body.innerHTML=`

        <div style="
            text-align:center;
            margin-top:100px;
            color:white;
            font-size:30px;
        ">

        ❌ Gagal memuat poster

        </div>

        `;

    }

}

loadPoster();
