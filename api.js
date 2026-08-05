import { Octokit } from "https://esm.sh/octokit";

export default async function handler(req, res) {
  // Mengizinkan akses dari browser (CORS) agar bisa diakses lewat link URL
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const url = new URL(`https://${req.headers.host}`);
  const pathParts = url.pathname.split('/');
  const GITHUB_OWNER = pathParts[1];
  const GITHUB_REPO = "ArsipDakwah";

  if (!GITHUB_TOKEN) {
    return res.status(500).json({ success: false, message: "GITHUB_TOKEN belum diset!" });
  }

  try {
    const { imageBase64, filename } = req.body;
    
    if (!imageBase64 || !filename) {
      return res.status(400).json({ success: false, message: "Gambar atau nama file tidak ditemukan" });
    }

    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    
    // Upload gambar saja (TANPA JSON)
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER, repo: GITHUB_REPO, path: `assets/img/${filename}`,
      message: `Tes upload: ${filename}`, content: imageBase64, branch: "main",
    });

    return res.status(200).json({ 
      success: true, 
      message: `✅ Gambar ${filename} berhasil diupload!`,
      url: `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/assets/img/${filename}`
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
