/* ===========================
   GITHUB CMS
   Arsip Dakwah
=========================== */

const GITHUB_CONFIG = {

    OWNER: "",
    REPO: "",
    BRANCH: "main",

    TOKEN: "",

    IMAGE_FOLDER: "assets/posters/",
    PDF_FOLDER: "assets/pdf/",
    DATA_FILE: "data/posters.json"

};

/* ===========================
   STATUS
=========================== */

function githubReady(){

    return(

        GITHUB_CONFIG.OWNER !== "" &&
        GITHUB_CONFIG.REPO !== "" &&
        GITHUB_CONFIG.TOKEN !== ""

    );

}

/* ===========================
   CEK KONFIGURASI
=========================== */

function checkGithub(){

    if(githubReady()){

        console.log("✅ GitHub Siap");

        return true;

    }

    console.warn("⚠ GitHub belum dikonfigurasi");

    return false;

}

/* ===========================
   UPLOAD POSTER
=========================== */

async function uploadPoster(data){

    if(!checkGithub()){

        alert(

        "GitHub belum dikonfigurasi.\n\n"+
        "Isi OWNER, REPO dan TOKEN terlebih dahulu."

        );

        return false;

    }

    console.log(data);

    alert(

    "Tahap berikutnya:\n\n"+
    "Fungsi upload GitHub akan dibuat."

    );

}

/* ===========================
   EXPORT
=========================== */

window.uploadPoster = uploadPoster;
