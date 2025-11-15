// scripts/buildBlogs.js
// Scans posts/ for .html files, extracts title/date/description, and writes posts/index.json
// Run: node scripts/buildBlogs.js

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'posts');
const OUT_FILE = path.join(POSTS_DIR, 'index.json');

function getFiles(dir) {
  return fs.existsSync(dir) ? fs.readdirSync(dir) : [];
}

function extractMeta(html) {
  // title from first <h1> or <h2>, date from <meta name="date" content="..."> (optional)
  const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i) || html.match(/<h2[^>]*>([^<]+)<\/h2>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;

  const dateMeta = html.match(/<meta\s+name=["']date["']\s+content=["']([^"']+)["']/i);
  const date = dateMeta ? dateMeta[1].trim() : null;

  // first paragraph as description fallback
  const pMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const description = pMatch ? pMatch[1].replace(/<[^>]+>/g, '').trim().slice(0, 200) : '';

  return { title, date, description };
}

function buildIndex() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.log('No posts/ directory found. Creating one.');
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  const files = getFiles(POSTS_DIR)
    .filter(f => f.endsWith('.html') && f !== 'index.html');

  const posts = files.map(file => {
    const filePath = path.join(POSTS_DIR, file);
    const html = fs.readFileSync(filePath, 'utf8');
    const meta = extractMeta(html);

    return {
      file,
      id: file.replace('.html', ''),
      title: meta.title || file.replace('.html', ''),
      date: meta.date || fs.statSync(filePath).mtime.toISOString().slice(0, 10),
      description: meta.description || '',
      path: `posts/${file}`
    };
  });

  // Sort by date desc
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  fs.writeFileSync(OUT_FILE, JSON.stringify(posts, null, 2), 'utf8');
  console.log(`Generated posts/index.json with ${posts.length} posts.`);
}

buildIndex();
