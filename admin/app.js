/* ===========================
   ADMIN PANEL
=========================== */

const dashboard =
document.getElementById("dashboard");

const uploadPage =
document.getElementById("uploadPage");

const btnTambah =
document.getElementById("btnTambah");

const btnKembali =
document.getElementById("btnKembali");

const btnPreview =
document.getElementById("btnPreview");

const btnSimpan =
document.getElementById("btnSimpan");

const adminName =
document.getElementById("adminName");

/* ===========================
   LOAD ADMIN
=========================== */

document.addEventListener("DOMContentLoaded",()=>{

    if(adminName){

        adminName.textContent =
        ADMIN_CONFIG.NAME;

    }

});

/* ===========================
   BUKA HALAMAN TAMBAH POSTER
=========================== */

if(btnTambah){

btnTambah.onclick=function(){

dashboard.style.display="none";

uploadPage.style.display="block";

};

}

/* ===========================
   KEMBALI KE DASHBOARD
=========================== */

if(btnKembali){

btnKembali.onclick=function(){

uploadPage.style.display="none";

dashboard.style.display="block";

};

}

/* ===========================
   PREVIEW
=========================== */

if(btnPreview){

btnPreview.onclick=function(){

const judul =
document.getElementById("judul").value;

const kategori =
document.getElementById("kategori").value;

alert(

"Preview\n\n"+

"Judul : "+judul+

"\nKategori : "+kategori+

"\n\n(Fitur preview premium akan dibuat pada tahap berikutnya.)"

);

};

}

/* ===========================
   SIMPAN
=========================== */

if(btnSimpan){

btnSimpan.onclick=function(){

const judul =
document.getElementById("judul").value.trim();

if(judul===""){

alert("Masukkan judul poster.");

return;

}

alert(

"🚀 Sistem Admin sudah aktif.\n\n"+

"Selanjutnya kita akan membuat tombol ini benar-benar mengirim data ke GitHub."

);

};

}

console.log("Admin Panel Aktif");
