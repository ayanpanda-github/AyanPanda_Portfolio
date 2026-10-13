// Portfolio Configuration
// Update this file to manage the GitHub user and the curated project list.

const portfolioConfig = {
    github: {
        username: 'ayanpanda-github',
        // Repos hidden from the "Recently updated" list (forks, coursework, profile repo, etc.)
        hideFromRecent: ['ayanpanda-github', '21BCY10173', 'try1', 'project2', 'kickstart.nvim']
    },

    personal: {
        name: 'Ayan Panda',
        email: 'ayan.panda.inbox@gmail.com',
        linkedin: 'https://www.linkedin.com/in/ayan-panda/',
        github: 'https://github.com/ayanpanda-github'
    },

    // Typed roles in the hero
    roles: [
        'Platform Engineer',
        'Backend Developer',
        'Open Source Contributor @ MOSIP',
        'Cloud & Kubernetes Enthusiast',
        'Full Stack Developer'
    ],

    // Curated projects. `repo` is used to pull live stars from GitHub.
    // categories: backend | web | ai | security
    projects: [
        {
            name: 'Panda Jobs',
            repo: 'Panda_Jobs',
            icon: 'fas fa-briefcase',
            date: '2026',
            categories: ['backend', 'ai'],
            description: 'Local job-search app that matches live listings from 15 job boards to your resume, with salary estimates, experience fit, visa/location checks and free-to-apply detection.',
            tech: ['Python', 'Scraping', 'Resume matching'],
            isNew: true
        },
        {
            name: 'MOSIP Self-Service UIN Deletion',
            icon: 'fas fa-user-shield',
            date: '2026',
            categories: ['backend', 'security'],
            description: 'End-to-end "Delete my UIN" flow for MOSIP Collab: residents authenticate with eSignet (UIN → OTP → consent) and their data is permanently deleted across every MOSIP module and the object store, with each deletion audited by hashed UIN only. Built in the C4GT DMP 2026 program.',
            tech: ['Java', 'Python', 'eSignet / OIDC', 'PostgreSQL', 'MinIO', 'Docker'],
            link: 'https://github.com/aritraroy02/Mosip-uin-deletion',
            highlight: 'C4GT DMP 2026'
        },
        {
            name: 'ChildHealthBooklet',
            icon: 'fas fa-baby',
            date: 'Nov 2025',
            categories: ['web', 'security'],
            description: 'Offline-first PWA for collecting child health records in low-connectivity areas. IndexedDB storage, Node/Express + MongoDB APIs, OAuth 2.0 and MOSIP eSignet identity. MOSIP Decode Hackathon finalist.',
            tech: ['React', 'Node.js', 'MongoDB', 'IndexedDB', 'eSignet', 'GCP'],
            link: 'https://github.com/aritraroy02/Hackathon-v3',
            highlight: 'Hackathon finalist'
        },
        {
            name: 'E-Commerce Recommendation System',
            repo: 'EcommercerecommendationSystem',
            icon: 'fas fa-cart-shopping',
            date: 'Jun 2025',
            categories: ['backend', 'ai'],
            description: 'Hybrid recommendation engine on Spark MLlib for real-time personalization. Redis-cached REST APIs and PostgreSQL tuning cut latency by 40%; containerized microservices with PyTest + CI/CD.',
            tech: ['Python', 'Spark MLlib', 'PostgreSQL', 'Redis', 'Docker'],
            highlight: '−40% latency'
        },
        {
            name: 'AsyncDocQA',
            repo: 'QnA-AsyncLLM',
            icon: 'fas fa-file-circle-question',
            date: '2025',
            categories: ['backend', 'ai'],
            description: 'Asynchronous FastAPI + PostgreSQL microservice: upload documents, ask questions, get AI-generated answers — built around non-blocking request handling.',
            tech: ['Python', 'FastAPI', 'PostgreSQL', 'async I/O']
        },
        {
            name: 'Panda Chat',
            repo: 'Panda_Chat',
            icon: 'fas fa-video',
            date: '2025',
            categories: ['web'],
            description: 'Real-time random peer-to-peer video chat. WebRTC connections with a React frontend and Node.js signalling backend.',
            tech: ['TypeScript', 'React', 'Node.js', 'WebRTC']
        },
        {
            name: 'AES-CBC Encrypter',
            repo: 'AES-CBC_Encrypter',
            icon: 'fas fa-lock',
            date: '2025',
            categories: ['security'],
            description: 'AES-128 and AES-256 in CBC mode implemented from first principles for secure file encryption, tuned for speed and memory use.',
            tech: ['Python', 'Cryptography']
        },
        {
            name: 'Weather Dashboard',
            repo: 'Weather-app',
            icon: 'fas fa-cloud-sun',
            date: 'Nov 2025',
            categories: ['web'],
            description: 'Responsive weather dashboard with live forecasts, deployed on Vercel.',
            tech: ['JavaScript', 'REST APIs', 'Vercel'],
            live: 'https://weather-dashboard-eight-azure.vercel.app'
        },
        {
            name: 'License Plate Identification',
            repo: 'LicensePlate-Identification-Model',
            icon: 'fas fa-car',
            date: '2024',
            categories: ['ai'],
            description: 'Computer vision program that detects and reads number plates from moving vehicles.',
            tech: ['Python', 'OpenCV', 'Jupyter']
        },
        {
            name: 'CrimeEyeSurv',
            repo: 'CrimeEyeSurv',
            icon: 'fas fa-eye',
            date: '2025',
            categories: ['ai', 'security'],
            description: 'Face recognition analytics for law enforcement: captures faces in one video, then finds which of those people reappear in other footage and at what timestamps.',
            tech: ['Python', 'OpenCV', 'face_recognition']
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioConfig;
} else if (typeof window !== 'undefined') {
    window.portfolioConfig = portfolioConfig;
}
