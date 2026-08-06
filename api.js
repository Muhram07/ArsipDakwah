// KODE TES: Hanya untuk membuktikan API dipanggil
export default async function handler(req, res) {
  // 1. Selalu izinkan akses (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // 2. Jika metode bukan POST, kita beri tahu
  if (req.method !== "POST") {
    return res.status(200).json({ 
      status: "API DIPANGGIL!",
      message: "Tapi metode yang dikirim bukan POST.",
      method_terkirim: req.method 
    });
  }

  // 3. Jika metode POST, kita katakan berhasil tanpa simpan data
  return res.status(200).json({ 
    status: "SUKSES!",
    message: "API Anda BERHASIL dipanggil! Token akan berubah jadi Used." 
  });
}
