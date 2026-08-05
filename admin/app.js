/* ===========================
   ADMIN PANEL
=========================== */

const adminDashboard =
document.getElementById("dashboard");

const adminUploadPage =
document.getElementById("uploadPage");

const adminNameText =
document.getElementById("adminName");

const tambahBtn =
document.getElementById("btnTambah");

const kembaliBtn =
document.getElementById("btnKembali");

const previewBtn =
document.getElementById("btnPreview");

const simpanBtn =
document.getElementById("btnSimpan");

/* ===========================
   LOAD
=========================== */

window.onload=function(){

    if(adminNameText){

        adminNameText.textContent=
        ADMIN_CONFIG.NAME;

    }

};

/* ===========================
   TAMBAH POSTER
=========================== */

if(tambahBtn){

    tambahBtn.onclick=function(){

        adminDashboard.style.display="none";

        adminUploadPage.style.display="block";

    };

}

/* ===========================
   KEMBALI
=========================== */

if(kembaliBtn){

    kembaliBtn.onclick=function(){

        adminUploadPage.style.display="none";

        adminDashboard.style.display="block";

    };

}

/* ===========================
   PREVIEW
=========================== */

if(previewBtn){

previewBtn.onclick=function(){

const judul=
document.getElementById("judul").value;

const kategori=
document.getElementById("kategori").value;

alert(

"PREVIEW\n\n"+

"Judul : "+judul+

"\nKategori : "+kategori

);

};

}

/* ===========================
   SIMPAN
=========================== */

if(simpanBtn){

simpanBtn.onclick=function(){

const judul=
document.getElementById("judul").value.trim();

if(judul==""){

alert("Masukkan judul poster.");

return;

}

alert(

"Poster siap disimpan.\n\n"+

"Tahap berikutnya kita akan membuat tombol ini benar-benar mengirim data ke GitHub."

);

};

}

console.log("APP ADMIN BERHASIL DIMUAT");
