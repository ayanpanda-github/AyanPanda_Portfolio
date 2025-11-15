// post.js - loads a post file passed via ?file=filename

async function loadPost() {
  const params = new URLSearchParams(window.location.search);
  const file = params.get('file');
  if (!file) return;

  const contentEl = document.getElementById('post-content');
  const titleEl = document.getElementById('post-title');

  try {
    const res = await fetch(`posts/${file}`, { cache: 'no-cache' });
    if (!res.ok) throw new Error('Post not found');
    const html = await res.text();

    // parse to extract first heading as fallback title
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const heading = doc.querySelector('h1, h2');
    const title = heading ? heading.textContent : decodeURIComponent(file);

    titleEl.textContent = title;
    contentEl.innerHTML = html;
  } catch (err) {
    console.error(err);
    titleEl.textContent = 'Post Not Found';
    contentEl.innerHTML = '<p>Unable to load post.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadPost);
