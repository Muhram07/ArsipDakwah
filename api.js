// Deno Deploy API - Final Version
import { Octokit } from "https://esm.sh/octokit";

// Fungsi untuk mengatur CORS (mengizinkan akses dari browser)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

Deno.serve(async (req) => {
  // Tangani permintaan OPTIONS (preflight request dari browser)
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Hanya izinkan POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN");
  const GITHUB_OWNER = "Muhram07";
  const GITHUB_REPO = "ArsipDakwah";

  if (!GITHUB_TOKEN) {
    return new Response(JSON.stringify({ success: false, message: "Token GitHub belum diset!" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const body = await req.json();
    const { title, category, tags, caption, content, imageBase64, filename } = body;

    if (!title || !imageBase64 || !filename) {
      return new Response(JSON.stringify({ success: false, message: "Data tidak lengkap" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
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
    const oldContent = new TextDecoder().decode(Uint8Array.from(atob(current.data.content), c => c.charCodeAt(0)));
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
      content: btoa(JSON.stringify(posters, null, 2)),
      sha: sha, branch: "main",
    });

    return new Response(JSON.stringify({ success: true, message: "✅ Poster berhasil dipublikasikan!" }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
