// api/github.js (Untuk Vercel Serverless Functions)
import { Octokit } from "@octokit/rest";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Ambil data dari Environment Variables di Vercel
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_OWNER = process.env.GITHUB_OWNER;
  const GITHUB_REPO = process.env.GITHUB_REPO;
  const BRANCH = "main";

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return res.status(500).json({ error: "Server tidak terkonfigurasi (Token hilang)" });
  }

  try {
    const { title, category, tags, caption, content, imageBase64, filename } = req.body;
    const imagePath = `assets/img/${filename}`;

    const octokit = new Octokit({ auth: GITHUB_TOKEN });

    // 1. Upload Gambar ke GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: imagePath,
      message: `Upload poster: ${title}`,
      content: imageBase64,
      branch: BRANCH,
    });

    // 2. Ambil data posters.json
    const current = await octokit.repos.getContent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: "data/posters.json",
      branch: BRANCH,
    });

    const sha = current.data.sha;
    const oldContent = Buffer.from(current.data.content, 'base64').toString('utf-8');
    let posters = JSON.parse(oldContent);

    // 3. Buat Data Poster Baru
    const newPoster = {
      id: `${category.toLowerCase().replace(/ /g, '-')}-${Date.now()}`,
      title,
      category,
      tags: tags.split(',').map(t => t.trim()),
      image: `/${imagePath}`,
      caption,
      content,
      date: new Date().toISOString().split('T')[0]
    };
    posters.push(newPoster);

    // 4. Simpan data baru ke posters.json di GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: "data/posters.json",
      message: `Tambah poster baru: ${title}`,
      content: Buffer.from(JSON.stringify(posters, null, 2)).toString('base64'),
      sha: sha,
      branch: BRANCH,
    });

    return res.status(200).json({ success: true, message: "Poster berhasil dipublikasikan!" });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
      }
