import { Octokit } from "https://esm.sh/octokit";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_OWNER = "Muhram07";
  const GITHUB_REPO = "ArsipDakwah";

  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: "GITHUB_TOKEN tidak ditemukan di Vercel" });
  }

  try {
    const { title, category, tags, caption, content, imageBase64, filename } = req.body;
    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    const imagePath = `assets/img/${filename}`;

    // 1. Upload Gambar ke GitHub
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER, repo: GITHUB_REPO, path: imagePath,
      message: `Upload poster: ${title}`, content: imageBase64, branch: "main",
    });

    // 2. Ambil data JSON saat ini
    const current = await octokit.rest.repos.getContent({
      owner: GITHUB_OWNER, repo: GITHUB_REPO, path: "data/posters.json", branch: "main",
    });
    const sha = current.data.sha;
    const oldContent = Buffer.from(current.data.content, 'base64').toString('utf-8');
    let posters = JSON.parse(oldContent);

    // 3. Tambahkan poster baru
    posters.push({
      id: `${category.toLowerCase().replace(/ /g, '-')}-${Date.now()}`,
      title, category, tags: tags.split(',').map(t => t.trim()),
      image: `/${imagePath}`, caption, content,
      date: new Date().toISOString().split('T')[0]
    });

    // 4. Simpan kembali JSON ke GitHub
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER, repo: GITHUB_REPO, path: "data/posters.json",
      message: `Tambah poster: ${title}`,
      content: Buffer.from(JSON.stringify(posters, null, 2)).toString('base64'),
      sha: sha, branch: "main",
    });

    return res.status(200).json({ success: true, message: "✅ Poster berhasil dipublikasikan!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
