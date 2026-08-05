import { Octokit } from "https://esm.sh/octokit";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  
  // Ambil Owner & Repo otomatis dari URL
  const url = new URL(`https://${req.headers.host}`);
  const pathParts = url.pathname.split('/');
  const GITHUB_OWNER = pathParts[1];
  const GITHUB_REPO = "ArsipDakwah";

  if (!GITHUB_TOKEN) {
    return res.status(500).json({ success: false, message: "GITHUB_TOKEN belum diset!" });
  }

  try {
    const { title, category, tags, caption, content, imageBase64, filename } = req.body;
    
    if (!title || !imageBase64 || !filename) {
      return res.status(400).json({ success: false, message: "Data tidak lengkap" });
    }

    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    
    // Upload gambar
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER, repo: GITHUB_REPO, path: `assets/img/${filename}`,
      message: `Upload poster: ${title}`, content: imageBase64, branch: "main",
    });

    // Ambil & update JSON
    const current = await octokit.rest.repos.getContent({
      owner: GITHUB_OWNER, repo: GITHUB_REPO, path: "data/posters.json", branch: "main",
    });
    const sha = current.data.sha;
    const oldContent = Buffer.from(current.data.content, 'base64').toString('utf-8');
    let posters = JSON.parse(oldContent);

    posters.push({
      id: `${category.toLowerCase().replace(/ /g, '-')}-${Date.now()}`,
      title, category, tags: tags.split(',').map(t => t.trim()),
      image: `/assets/img/${filename}`, caption, content,
      date: new Date().toISOString().split('T')[0]
    });

    // Simpan JSON
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
