// blog.js - loads posts from posts/index.json and renders list

async function loadBlogs() {
  const container = document.getElementById('blog-list');
  if (!container) return;

  try {
    const res = await fetch('posts/index.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('posts/index.json not found');
    const posts = await res.json();

    if (!posts.length) {
      container.innerHTML = '<p>No posts published yet.</p>';
      return;
    }

    posts.forEach(post => {
      const div = document.createElement('div');
      div.className = 'project-card';

      div.innerHTML = `
        <div class="project-header">
          <h3 class="project-title">${escapeHtml(post.title)}</h3>
          <div class="project-links"><span class="project-tech">${escapeHtml(post.date)}</span></div>
        </div>
        <p class="project-description">${escapeHtml(post.description)}</p>
        <a class="btn btn-primary" href="post.html?file=${encodeURIComponent(post.file)}">Read More</a>
      `;

      container.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = '<p>Unable to load posts.</p>';
  }
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

document.addEventListener('DOMContentLoaded', loadBlogs);
