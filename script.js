// Portfolio JavaScript - Modern and Lightweight

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.loadProjects();
        this.setupSmoothScrolling();
        this.setupAnimations();
    }

    // Navigation functionality
    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        navToggle?.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // Prevent body scroll when mobile menu is open
        const toggleBodyScroll = () => {
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };
        
        // Update body scroll when menu toggles
        const observer = new MutationObserver(toggleBodyScroll);
        observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });

        // Update active nav link on scroll
        this.updateActiveNavLink();
    }

    // Update active navigation link based on scroll position
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // Smooth scrolling for anchor links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 75; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Scroll effects (navbar background, scroll animations)
    setupScrollEffects() {
        const nav = document.querySelector('.nav');
        let lastScrollY = window.pageYOffset;

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            
            // Add/remove scrolled class for enhanced navbar styling
            if (scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll (optional - disabled for better UX)
            // Uncomment below if you want auto-hiding navbar
            /*
            if (scrollY > lastScrollY && scrollY > 200) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            */
            
            lastScrollY = scrollY;
        });
    }

    // Animation on scroll
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.stat, .project-card, .skill-category, .contact-link').forEach(el => {
            observer.observe(el);
        });
    }

    // Load GitHub projects dynamically
    async loadProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        
        if (!projectsGrid) return;

        // Show loading skeletons
        this.showProjectSkeletons(projectsGrid);

        try {
            const projects = await this.fetchGitHubProjects();
            this.renderProjects(projects, projectsGrid);
        } catch (error) {
            console.error('Error loading projects:', error);
            this.showProjectError(projectsGrid);
        }
    }

    // Fetch pinned projects from GitHub API
    async fetchGitHubProjects() {
        const username = window.portfolioConfig?.github?.username || 'ayanpanda-github';
        
        try {
            // First, try to fetch pinned repositories using a scraping approach
            const pinnedRepos = await this.fetchPinnedRepositories(username);
            if (pinnedRepos && pinnedRepos.length > 0) {
                return pinnedRepos;
            }
        } catch (error) {
            console.log('Could not fetch pinned repos, falling back to recent repos:', error);
        }
        
        // Fallback to recent repositories if pinned repos fail
        return this.fetchRecentRepositories(username);
    }

    // Fetch pinned repositories using GitHub's public profile scraping
    async fetchPinnedRepositories(username) {
        try {
            // Try to use GitHub's GraphQL API through a proxy service
            const pinnedRepos = await this.fetchPinnedViaGraphQL(username);
            if (pinnedRepos && pinnedRepos.length > 0) {
                return pinnedRepos;
            }
        } catch (error) {
            console.log('GraphQL approach failed, using curated list:', error);
        }

        // Fallback to manually curated featured projects from config
        // Update config.js to change your featured repositories
        const featuredRepoNames = window.portfolioConfig?.featuredProjects || [
            'QnA-AsyncLLM',
            'esignet-mock-services', 
            'CrimeEyeSurv',
            'Panda_Chat',
            'LicensePlate-Identification-Model',
            'bajaj_project'
        ];
        
        // Fetch details for each featured repository
        const repoPromises = featuredRepoNames.map(async (repoName) => {
            try {
                const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
                if (response.ok) {
                    return response.json();
                }
                return null;
            } catch (error) {
                console.error(`Error fetching ${repoName}:`, error);
                return null;
            }
        });
        
        const repos = await Promise.all(repoPromises);
        return repos.filter(repo => repo !== null);
    }

    // Try to fetch pinned repositories via GraphQL (using a public proxy)
    async fetchPinnedViaGraphQL(username) {
        const query = `
            query {
                user(login: "${username}") {
                    pinnedItems(first: 6, types: REPOSITORY) {
                        nodes {
                            ... on Repository {
                                name
                                description
                                url
                                homepageUrl
                                primaryLanguage {
                                    name
                                }
                                stargazerCount
                                forkCount
                                updatedAt
                                owner {
                                    login
                                }
                            }
                        }
                    }
                }
            }
        `;

        try {
            // Use GitHub's public GraphQL endpoint (requires no auth for public data)
            const response = await fetch('https://api.github.com/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Note: This will work for public repositories without authentication
                    // but has rate limits. For better results, users can add their GitHub token
                },
                body: JSON.stringify({ query })
            });

            if (!response.ok) {
                throw new Error('GraphQL request failed');
            }

            const data = await response.json();
            
            if (data.errors) {
                throw new Error('GraphQL errors: ' + JSON.stringify(data.errors));
            }

            const pinnedItems = data.data?.user?.pinnedItems?.nodes || [];
            
            // Convert GraphQL response to match REST API format
            return pinnedItems.map(item => ({
                name: item.name,
                description: item.description,
                html_url: item.url,
                homepage: item.homepageUrl,
                language: item.primaryLanguage?.name,
                stargazers_count: item.stargazerCount,
                forks_count: item.forkCount,
                updated_at: item.updatedAt,
                owner: {
                    login: item.owner.login
                }
            }));
        } catch (error) {
            console.error('GraphQL pinned repos fetch failed:', error);
            throw error;
        }
    }

    // Fallback to recent repositories
    async fetchRecentRepositories(username) {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }

        return response.json();
    }

    // Render projects to the grid
    renderProjects(projects, container) {
        // Since we're now fetching curated/pinned projects, we don't need to filter
        // Just sort by the order they appear (pinned repos) or by update date
        const sortedProjects = projects.sort((a, b) => {
            return new Date(b.updated_at) - new Date(a.updated_at);
        });

        const projectsHTML = sortedProjects.slice(0, 6).map(project => {
            const description = project.description || 'No description available';
            const language = project.language || 'Unknown';
            const lastUpdated = new Date(project.updated_at).toLocaleDateString();

            return `
                <div class="project-card">
                    <div class="project-header">
                        <h3 class="project-title">${project.name.replace(/-/g, ' ')}</h3>
                        <div class="project-links">
                            <a href="${project.html_url}" target="_blank" aria-label="View ${project.name} on GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                            ${project.homepage ? `
                                <a href="${project.homepage}" target="_blank" aria-label="View ${project.name} live">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                            ` : ''}
                        </div>
                    </div>
                    <p class="project-description">${description}</p>
                    <div class="project-tech">
                        ${language ? `<span class="tech-tag">${language}</span>` : ''}
                        <span class="tech-tag">Updated ${lastUpdated}</span>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = projectsHTML;

        // Add animation to newly loaded projects
        container.querySelectorAll('.project-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in-up');
            }, index * 100);
        });
    }

    // Show loading skeletons while projects load
    showProjectSkeletons(container) {
        const skeletonHTML = Array(6).fill().map(() => `
            <div class="project-card skeleton">
                <div class="project-header">
                    <div style="height: 24px; background: var(--bg-tertiary); border-radius: 4px; width: 60%;"></div>
                    <div style="height: 20px; width: 60px; background: var(--bg-tertiary); border-radius: 4px;"></div>
                </div>
                <div style="height: 40px; background: var(--bg-tertiary); border-radius: 4px; margin: 16px 0;"></div>
                <div style="height: 20px; background: var(--bg-tertiary); border-radius: 4px; width: 40%;"></div>
            </div>
        `).join('');

        container.innerHTML = skeletonHTML;
    }

    // Show error message if projects fail to load
    showProjectError(container) {
        container.innerHTML = `
            <div class="project-card" style="text-align: center; grid-column: 1 / -1;">
                <h3>Unable to Load Projects</h3>
                <p>Sorry, there was an error loading projects from GitHub. Please visit my GitHub profile to see my work.</p>
                <a href="https://github.com/ayanpanda-github" target="_blank" class="btn btn-primary">
                    View GitHub Profile
                </a>
            </div>
        `;
    }
}

// Utility functions
const utils = {
    // Debounce function for performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Copy text to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    }
};

// Enhanced scroll performance with debouncing
const debouncedScrollHandler = utils.debounce(() => {
    // Additional scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Theme detection and handling
const handleThemeChange = () => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('dark-theme', isDark);
};

// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
    handleThemeChange();
});

// Performance optimization: Preload critical resources
const preloadCriticalResources = () => {
    // Preload GitHub API endpoint
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = '//api.github.com';
    document.head.appendChild(link);
};

// Run preload immediately
preloadCriticalResources();

// Error handling for uncaught promises
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // Prevent the default browser error handling
    event.preventDefault();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Portfolio, utils };
}
