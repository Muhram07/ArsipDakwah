/* ===========================
   ADMIN PANEL
=========================== */

const adminDashboard = document.getElementById("dashboard");
const adminUploadPage = document.getElementById("uploadPage");

const adminNameText = document.getElementById("adminName");

const tambahBtn = document.getElementById("btnTambah");
const arsipBtn = document.getElementById("btnArsip");
const statistikBtn = document.getElementById("btnStatistik");
const settingBtn = document.getElementById("btnSetting");

const kembaliBtn = document.getElementById("btnKembali");
const previewBtn = document.getElementById("btnPreview");
const simpanBtn = document.getElementById("btnSimpan");

const posterFile = document.getElementById("posterFile");
const posterList = document.getElementById("posterList");

/* ===========================
   LOAD
=========================== */

window.onload = function() {
    if (adminNameText) {
        adminNameText.textContent = ADMIN_CONFIG.NAME;
    }
};

/* ===========================
   TAMPILKAN DAFTAR GAMBAR
=========================== */

if (posterFile) {
    posterFile.onchange = function() {
        posterList.innerHTML = "";
        const files = this.files;

        if (files.length == 0) {
            posterList.innerHTML = "";
            return;
        }

        let html = "";
        html += "<br>";
        html += "<b>" + files.length + " Part Dipilih</b><br><br>";

        for (let i = 0; i < files.length; i++) {
            html += "✅ Part " + (i + 1) + " : " + files[i].name + "<br>";
        }

        posterList.innerHTML = html;
    };
}

/* ===========================
   TAMBAH POSTER
=========================== */

if (tambahBtn) {
    tambahBtn.onclick = function() {
        adminDashboard.style.display = "none";
        adminUploadPage.style.display = "block";
    };
}

/* ===========================
   SEMUA ARSIP
=========================== */

if (arsipBtn) {
    arsipBtn.onclick = function() {
        location.href = "arsip.html";
    };
}

/* ===========================
   STATISTIK
=========================== */

if (statistikBtn) {
    statistikBtn.onclick = function() {
        alert("Halaman Statistik akan dibuat pada tahap berikutnya.");
    };
}

/* ===========================
   PENGATURAN
=========================== */

if (settingBtn) {
    settingBtn.onclick = function() {
        alert("Halaman Pengaturan akan dibuat pada tahap berikutnya.");
    };
}

/* ===========================
   KEMBALI
=========================== */

if (kembaliBtn) {
    kembaliBtn.onclick = function() {
        adminUploadPage.style.display = "none";
        adminDashboard.style.display = "block";
    };
}

/* ===========================
   PREVIEW
=========================== */

if (previewBtn) {
    previewBtn.onclick = function() {
        const judul = document.getElementById("judul").value;
        const kategori = document.getElementById("kategori").value;
        const total = posterFile.files.length;

        alert(
            "========== PREVIEW ==========\n\n" +
            "Judul : " + judul +
            "\nKategori : " + kategori +
            "\nJumlah Part : " + total +
            "\n\nSiap dipublikasikan."
        );
    };
}

/* ===========================
   SIMPAN (Koneksi ke Vercel API)
=========================== */
if (simpanBtn) {
    simpanBtn.onclick = async function() {
        const judul = document.getElementById("judul").value.trim();
        const kategori = document.getElementById("kategori").value;
        const tags = document.getElementById("tag").value;
        const caption = document.getElementById("caption").value;
        const content = document.getElementById("content").value;
        const file = posterFile.files[0];

        if (judul == "") { alert("Masukkan judul poster."); return; }
        if (!file) { alert("Pilih minimal satu gambar."); return; }

        simpanBtn.disabled = true;
        simpanBtn.textContent = "⏳ Mengupload...";

        // Konversi gambar ke Base64
        const reader = new FileReader();
        reader.onload = async function(e) {
            const base64String = e.target.result.split(',')[1]; // Ambil data base64 murni

            try {
                // Kirim ke API Vercel (Path '/api/github.js')
                const response = await fetch('/api/github.js', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: judul,
                        category: kategori,
                        tags: tags,
                        caption: caption,
                        content: content,
                        imageBase64: base64String,
                        filename: file.name
                    })
                });

                const result = await response.json();
                if (result.success) {
                    alert("✅ " + result.message);
                    location.reload(); // Refresh dashboard setelah sukses
                } else {
                    alert("❌ Gagal: " + result.message);
                }
            } catch (error) {
                alert("❌ Error sistem: " + error.message);
            } finally {
                simpanBtn.disabled = false;
                simpanBtn.textContent = "🚀 Simpan Poster";
            }
        };
        reader.readAsDataURL(file);
    };
}

console.log("APP ADMIN BERHASIL DIMUAT");
