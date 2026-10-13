// Portfolio JavaScript — vanilla, no build step

const cfg = window.portfolioConfig || {};
const GH_USER = cfg.github?.username || 'ayanpanda-github';

const escapeHtml = (str = '') => String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// GitHub language colours for the language bars / repo dots
const LANG_COLORS = {
    Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#3178c6', Java: '#b07219',
    HTML: '#e34c26', CSS: '#663399', C: '#555555', 'Jupyter Notebook': '#DA5B0B',
    Shell: '#89e051', 'C#': '#178600'
};

/* ---------- Theme ---------- */
function setupTheme() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const root = document.documentElement;
        const current = root.dataset.theme
            || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        const next = current === 'dark' ? 'light' : 'dark';
        root.dataset.theme = next;
        try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
    });
}

/* ---------- Navigation ---------- */
function setupNavigation() {
    const nav = document.querySelector('.nav');
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const progress = document.getElementById('scroll-progress');
    if (!nav || !menu) return;

    const closeMenu = () => {
        menu.classList.remove('active');
        toggle?.classList.remove('active');
        document.body.classList.remove('menu-open');
    };

    toggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = menu.classList.toggle('active');
        toggle.classList.toggle('active', open);
        document.body.classList.toggle('menu-open', open);
    });
    menu.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle?.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

    // Navbar background + progress bar
    const onScroll = () => {
        const y = window.scrollY;
        nav.classList.toggle('scrolled', y > 30);
        if (progress) {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Active link via IntersectionObserver
    const links = [...menu.querySelectorAll('.nav-link[href^="#"]')];
    const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${entry.target.id}`));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => io.observe(s));
}

/* ---------- Hero ---------- */
function setupTypedRole() {
    const el = document.getElementById('typed-role');
    const roles = cfg.roles;
    if (!el || !roles?.length || prefersReducedMotion) return;

    let roleIdx = 0, charIdx = roles[0].length, deleting = true;
    const tick = () => {
        const word = roles[roleIdx];
        charIdx += deleting ? -1 : 1;
        el.textContent = word.slice(0, charIdx);

        let delay = deleting ? 40 : 80;
        if (!deleting && charIdx === word.length) { deleting = true; delay = 2000; }
        else if (deleting && charIdx === 0) {
            deleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            delay = 300;
        }
        setTimeout(tick, delay);
    };
    setTimeout(tick, 2200);
}

function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    if (prefersReducedMotion) { el.textContent = target.toFixed(decimals); return; }
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

function setupCounters() {
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { animateCount(entry.target); io.unobserve(entry.target); }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
}

/* ---------- Reveal on scroll ---------- */
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

function observeReveals(root = document) {
    root.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}

/* ---------- Projects ---------- */
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid || !cfg.projects) return;

    grid.innerHTML = cfg.projects.map(p => {
        const repoUrl = p.link || (p.repo ? `https://github.com/${GH_USER}/${p.repo}` : null);
        return `
        <article class="project-card reveal" data-categories="${p.categories.join(' ')}">
            <div class="project-header">
                <div class="project-icon"><i class="${escapeHtml(p.icon)}"></i></div>
                <div class="project-links">
                    ${repoUrl ? `<a href="${escapeHtml(repoUrl)}" target="_blank" rel="noopener" aria-label="${escapeHtml(p.name)} source on GitHub"><i class="fab fa-github"></i></a>` : ''}
                    ${p.live ? `<a href="${escapeHtml(p.live)}" target="_blank" rel="noopener" aria-label="${escapeHtml(p.name)} live demo"><i class="fas fa-arrow-up-right-from-square"></i></a>` : ''}
                </div>
            </div>
            <h3 class="project-title">${escapeHtml(p.name)}
                ${p.isNew ? '<span class="badge badge-live">New</span>' : ''}
                ${p.highlight ? `<span class="badge badge-accent">${escapeHtml(p.highlight)}</span>` : ''}
            </h3>
            <p class="project-description">${escapeHtml(p.description)}</p>
            <div class="tags">${p.tech.map(t => `<span>${escapeHtml(t)}</span>`).join('')}</div>
            <div class="project-meta">
                <span><i class="far fa-calendar"></i> ${escapeHtml(p.date)}</span>
                ${p.repo ? `<span class="project-stars" data-repo="${escapeHtml(p.repo)}" hidden><i class="fas fa-star"></i> <b>0</b></span>` : ''}
            </div>
        </article>`;
    }).join('');

    // Spotlight glow follows the cursor
    grid.addEventListener('pointermove', (e) => {
        const card = e.target.closest('.project-card');
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });

    // Filters
    const filters = document.getElementById('project-filters');
    filters?.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        filters.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === chip));
        const f = chip.dataset.filter;
        grid.querySelectorAll('.project-card').forEach(card => {
            const show = f === 'all' || card.dataset.categories.split(' ').includes(f);
            card.classList.toggle('hidden', !show);
        });
    });

    observeReveals(grid);
}

/* ---------- GitHub live data ---------- */
async function fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return res.json();
}

async function loadGitHub() {
    let repos = [];
    try {
        repos = await fetchJson(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=pushed`);
    } catch (err) {
        console.warn('GitHub repos unavailable:', err);
        document.getElementById('recent-repos').innerHTML = fallbackMsg();
        document.getElementById('lang-bars').innerHTML = fallbackMsg();
        return;
    }

    const own = repos.filter(r => !r.fork);
    const stars = own.reduce((s, r) => s + r.stargazers_count, 0);

    // Counts
    setText('gh-repos', repos.length);
    setText('gh-stars', stars);
    document.querySelectorAll('.js-repo-count').forEach(el => { el.textContent = repos.length; });
    const statRepos = document.getElementById('stat-repos');
    if (statRepos && Number(statRepos.dataset.count) !== repos.length) {
        statRepos.dataset.count = repos.length;
        animateCount(statRepos);
    }

    // Stars on project cards
    const byName = Object.fromEntries(repos.map(r => [r.name, r]));
    document.querySelectorAll('.project-stars').forEach(el => {
        const repo = byName[el.dataset.repo];
        if (repo && repo.stargazers_count > 0) {
            el.querySelector('b').textContent = repo.stargazers_count;
            el.hidden = false;
        }
    });

    // Languages (by repo count, own repos only)
    const langCount = {};
    own.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
    const langs = Object.entries(langCount).sort((a, b) => b[1] - a[1]);
    setText('gh-langs', langs.length);
    const total = langs.reduce((s, [, n]) => s + n, 0);
    document.getElementById('lang-bars').innerHTML = langs.slice(0, 7).map(([lang, n]) => {
        const pct = Math.round((n / total) * 100);
        return `
            <div class="lang-row">
                <div class="lang-label"><span><i class="dot" style="background:${LANG_COLORS[lang] || 'var(--primary)'}"></i>${escapeHtml(lang)}</span><span>${n} repo${n > 1 ? 's' : ''}</span></div>
                <div class="lang-track"><div class="lang-fill" style="--w:${pct}%;background:${LANG_COLORS[lang] || 'var(--primary)'}"></div></div>
            </div>`;
    }).join('');

    // Recently updated
    const hidden = new Set(cfg.github?.hideFromRecent || []);
    const recent = own.filter(r => !hidden.has(r.name)).slice(0, 6);
    document.getElementById('recent-repos').innerHTML = recent.map(r => `
        <a class="recent-repo" href="${escapeHtml(r.html_url)}" target="_blank" rel="noopener">
            <div class="recent-repo-top">
                <strong>${escapeHtml(r.name)}</strong>
                <span class="time">${timeAgo(r.pushed_at)}</span>
            </div>
            ${r.description ? `<p>${escapeHtml(cleanDescription(r.description))}</p>` : ''}
            <div class="recent-repo-meta">
                ${r.language ? `<span><i class="dot" style="background:${LANG_COLORS[r.language] || 'var(--primary)'}"></i>${escapeHtml(r.language)}</span>` : ''}
                ${r.stargazers_count ? `<span><i class="fas fa-star"></i> ${r.stargazers_count}</span>` : ''}
            </div>
        </a>`).join('');
}

function cleanDescription(desc) {
    // Strip markdown badges that sometimes leak into repo descriptions
    return desc.replace(/\[!\[[^\]]*\]\([^)]*\)?\]?\([^)]*\)?/g, '').replace(/^[^A-Za-z]+/, '').trim();
}

function timeAgo(iso) {
    const s = (Date.now() - new Date(iso)) / 1000;
    const units = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];
    for (const [name, secs] of units) {
        const v = Math.floor(s / secs);
        if (v >= 1) return `${v} ${name}${v > 1 ? 's' : ''} ago`;
    }
    return 'just now';
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function fallbackMsg() {
    return `<p class="muted">GitHub's API is rate-limited right now. <a href="https://github.com/${GH_USER}" target="_blank" rel="noopener">See everything on GitHub →</a></p>`;
}

/* ---------- Contact ---------- */
function setupCopyEmail() {
    const btn = document.getElementById('copy-email');
    const toast = document.getElementById('toast');
    if (!btn) return;
    btn.addEventListener('click', async () => {
        const email = btn.dataset.email;
        try {
            await navigator.clipboard.writeText(email);
            showToast(toast, 'Email copied to clipboard ✓');
        } catch (e) {
            window.location.href = `mailto:${email}`;
        }
    });
}

function showToast(toast, msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
    setupTheme();
    setupNavigation();
    setupTypedRole();
    renderProjects();
    setupCopyEmail();
    observeReveals();
    setupCounters();
    loadGitHub();
    setText('year', new Date().getFullYear());
});
