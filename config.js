// Portfolio Configuration
// Update this file to easily manage your portfolio settings

const portfolioConfig = {
    // GitHub username
    github: {
        username: 'ayanpanda-github'
    },

    // Personal Information
    personal: {
        name: 'Ayan Panda',
        email: 'ayan.panda.inbox@gmail.com', // Update with your email
        linkedin: 'https://www.linkedin.com/in/ayan-panda/',
        github: 'https://github.com/ayanpanda-github'
    },

    // Featured/Pinned Projects
    // Update this list to match your GitHub pinned repositories
    // The portfolio will try to fetch actual pinned repos first, then fall back to this list
    featuredProjects: [
        'QnA-AsyncLLM',
        'Detection-Analysis-Using-MachineLearning',
        'CrimeEyeSurv', 
        'Panda_Chat',
        'LicensePlate-Identification-Model',
        'aritraroy02/Hackathon'
    ],

    // Skills organized by category
    skills: {
        languages: [
            'Java',
            'Python', 
            'TypeScript',
            'JavaScript',
            'HTML/CSS'
        ],
        frameworks: [
            'FastAPI',
            'Spring Boot',
            'React',
            'React-Native',
            'Node.js',
            'Git'
        ],
        databases: [
            'PostgreSQL',
            'MySQL',
            'MongoDB'
        ],
        others: [
            'Machine Learning',
            'Computer Vision',
            'Microservices',
            'REST APIs'
        ]
    },

    // About section content
    about: {
        description: [
            "I'm a passionate Full Stack Developer with experience in building modern web applications and backend services. I enjoy working with various technologies and am always eager to learn and implement new solutions.",
            "My expertise spans across multiple programming languages including Java, Python, and TypeScript, with a focus on creating efficient, scalable applications that solve real-world problems."
        ],
        stats: [
            { value: '25+', label: 'Public Repositories' },
            { value: '2+', label: 'Years Coding' },
            { value: '∞', label: 'Learning' }
        ]
    },

    // Contact methods
    contact: {
        title: "Let's Work Together",
        description: "I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.",
        methods: [
            {
                icon: 'fas fa-envelope',
                text: 'Send me an email',
                link: 'mailto:ayan.panda.inbox@gmail.com' // Update with your email
            },
            {
                icon: 'fab fa-linkedin',
                text: 'Connect on LinkedIn',
                link: 'https://www.linkedin.com/in/ayan-panda/'
            },
            {
                icon: 'fab fa-github', 
                text: 'Follow on GitHub',
                link: 'https://github.com/ayanpanda-github'
            }
        ]
    },

    // Theme customization
    theme: {
        primaryColor: '#6366f1',
        secondaryColor: '#06b6d4',
        accentColor: '#f59e0b'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioConfig;
} else if (typeof window !== 'undefined') {
    window.portfolioConfig = portfolioConfig;
}
