// KONFIGURASI GITHUB
const GITHUB_OWNER = "Muhram07";
const GITHUB_REPO = "ArsipDakwah";
const BRANCH = "main";

// ==========================================================
// 🔴 LANGKAH PENTING: GANTI BAGIAN INI DENGAN TOKEN BARU ANDA
// ==========================================================
const GITHUB_TOKEN = "MASUKKAN_TOKEN_BARU_ANDA_DISINI"; 
// ==========================================================

import { Octokit } from "@octokit/rest";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  
  if (GITHUB_TOKEN === "MASUKKAN_TOKEN_BARU_ANDA_DISINI") {
    return res.status(500).json({ success: false, message: "Token lupa diganti!" });
  }

  try {
    const { title, category, tags, caption, content, imageBase64, filename } = req.body;
    const imagePath = `assets/img/${filename}`;

    const octokit = new Octokit({ auth: GITHUB_TOKEN });

    // 1. Upload Gambar
    await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER, repo: GITHUB_REPO, path: imagePath,
      message: `Upload poster: ${title}`, content: imageBase64, branch: BRANCH,
    });

    // 2. Ambil data JSON
    const current = await octokit.repos.getContent({
      owner: GITHUB_OWNER, repo: GITHUB_REPO, path: "data/posters.json", branch: BRANCH,
    });
    const sha = current.data.sha;
    const oldContent = Buffer.from(current.data.content, 'base64').toString('utf-8');
    let posters = JSON.parse(oldContent);

    // 3. Buat data baru
    const newPoster = {
      id: `${category.toLowerCase().replace(/ /g, '-')}-${Date.now()}`,
      title, category,
      tags: tags.split(',').map(t => t.trim()),
      image: `/${imagePath}`, caption, content,
      date: new Date().toISOString().split('T')[0]
    };
    posters.push(newPoster);

    // 4. Simpan JSON baru
    await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER, repo: GITHUB_REPO, path: "data/posters.json",
      message: `Tambah poster: ${title}`,
      content: Buffer.from(JSON.stringify(posters, null, 2)).toString('base64'),
      sha: sha, branch: BRANCH,
    });

    return res.status(200).json({ success: true, message: "✅ Poster berhasil dipublikasikan!" });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
           }
