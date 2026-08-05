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

const posterFile =
document.getElementById("posterFile");

const posterList =
document.getElementById("posterList");

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
   TAMPILKAN DAFTAR GAMBAR
=========================== */

if(posterFile){

posterFile.onchange=function(){

posterList.innerHTML="";

const files=this.files;

if(files.length==0){

posterList.innerHTML="";

return;

}

let html="";

html+="<br>";
html+="<b>"+files.length+" Part Dipilih</b><br><br>";

for(let i=0;i<files.length;i++){

html+="✅ Part "+(i+1)+" : "+files[i].name+"<br>";

}

posterList.innerHTML=html;

};

}

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

const total=
posterFile.files.length;

alert(

"========== PREVIEW ==========\n\n"+

"Judul : "+judul+

"\nKategori : "+kategori+

"\nJumlah Part : "+total+

"\n\nSiap dipublikasikan."

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

if(posterFile.files.length==0){

alert("Pilih minimal satu gambar.");

return;

}

alert(

"✅ "+posterFile.files.length+

" gambar siap diproses.\n\n"+

"Pada tahap berikutnya tombol ini akan benar-benar mengirim semua file ke GitHub dan memperbarui arsip secara otomatis."

);

};

}

console.log("APP ADMIN BERHASIL DIMUAT");
