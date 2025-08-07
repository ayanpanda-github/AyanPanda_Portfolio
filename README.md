# Ayan Panda - Portfolio Website

A modern, lightweight, and responsive portfolio website built with HTML, CSS, and JavaScript. This portfolio automatically fetches and displays your latest GitHub projects and is designed to be easily customizable and maintainable.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Fully Responsive**: Works perfectly on all devices (mobile, tablet, desktop)
- **Dynamic Content**: Automatically loads your latest GitHub projects via API
- **Dark Mode Support**: Automatically adapts to user's system theme preference
- **Performance Optimized**: Lightweight with fast loading times
- **SEO Friendly**: Proper meta tags and semantic HTML structure
- **Easy to Update**: Simple structure for quick modifications

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🛠 Quick Setup

1. **Clone or download** this portfolio to your local machine
2. **Update your information** in the HTML file (see customization section below)
3. **Test locally** by opening `index.html` in your browser
4. **Deploy** to your preferred hosting platform

## ✏️ Customization Guide

### 1. Update Personal Information

Open `index.html` and modify these sections:

#### **Contact Information**
```html
<!-- Update the email link -->
<a href="mailto:your.email@example.com" class="contact-link">

<!-- LinkedIn and GitHub URLs are already set -->
```

#### **About Section**
```html
<!-- Modify the about text in the about section -->
<section id="about" class="about">
    <div class="about-text">
        <p>Update this paragraph with your own description...</p>
        <p>Add more details about your experience...</p>
    </div>
</section>
```

#### **Skills Section**
```html
<!-- Update skills in the skills section -->
<div class="skill-items">
    <span class="skill-item">Your Skill</span>
    <span class="skill-item">Another Skill</span>
    <!-- Add more skills as needed -->
</div>
```

### 2. Customize Styling

Open `styles.css` to modify:

#### **Color Scheme**
```css
:root {
    --primary: #6366f1;        /* Main brand color */
    --secondary: #06b6d4;      /* Secondary accent color */
    --accent: #f59e0b;         /* Additional accent color */
    /* Modify these colors to match your brand */
}
```

#### **Typography**
```css
:root {
    --font-family: 'Inter', sans-serif;  /* Change to your preferred font */
    --font-size-base: 1rem;              /* Adjust base font size */
}
```

### 3. Update Featured/Pinned Projects

The portfolio tries to fetch your GitHub pinned repositories automatically. If that fails, it falls back to a curated list.

**Easy Way - Update config.js:**

Open `config.js` and modify the `featuredProjects` array:

```javascript
featuredProjects: [
    'Your-Important-Repo',
    'Another-Featured-Project', 
    'Third-Project-Name',
    // Add your exact GitHub repository names here
],
```

**How it works:**
1. **First**: Tries to fetch your actual GitHub pinned repositories
2. **Fallback**: Uses the list from `config.js` if pinned repos can't be fetched
3. **Final Fallback**: Shows your most recently updated repositories

**To sync with your GitHub pins:**
- Pin up to 6 repositories on your GitHub profile
- The portfolio will automatically display them
- If you change your pins on GitHub, they'll update on your portfolio too!

### 4. Modify Sections

You can easily add, remove, or modify sections:

#### **Add a New Section**
```html
<section id="new-section" class="new-section">
    <div class="container">
        <h2 class="section-title">New Section Title</h2>
        <div class="section-content">
            <!-- Your content here -->
        </div>
    </div>
</section>
```

Don't forget to add the corresponding CSS styles and update the navigation menu!

#### **Remove a Section**
1. Delete the section from HTML
2. Remove the corresponding navigation link
3. Remove any related CSS styles

## 🎨 Styling Guidelines

### CSS Variables
The portfolio uses CSS custom properties (variables) for easy theming:
- Colors, fonts, spacing, and other design tokens are defined in `:root`
- Dark mode is automatically handled via CSS media queries
- Modify variables to change the entire theme

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet), 480px (mobile)
- Grid and flexbox layouts for responsive components

### Animation Classes
- `.fade-in-up`: Slide up animation on scroll
- `.skeleton`: Loading animation for dynamic content
- Add these classes to elements for automatic animations

## 🚀 Deployment Options

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify
1. Drag and drop your portfolio folder to [netlify.com](https://netlify.com)
2. Or connect your GitHub repository for automatic deployments

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project folder
3. Follow the setup prompts

## 📱 Testing

### Local Testing
- Open `index.html` directly in your browser
- Use browser dev tools to test responsive design
- Test on different devices and screen sizes

### Performance Testing
- Use Google PageSpeed Insights
- Check loading times and optimization suggestions
- Monitor Core Web Vitals

## 🔧 Advanced Customizations

### Add Contact Form
Replace the contact links with a contact form by integrating:
- Formspree (simple)
- Netlify Forms (if using Netlify)
- Your own backend API

### Add Blog Section
Create a blog section by:
1. Adding a new blog section to HTML
2. Creating a blog posts array in JavaScript
3. Rendering blog posts dynamically

### Integration Options
- Google Analytics for tracking
- EmailJS for contact form functionality
- Content Management System (CMS) integration

## 🐛 Troubleshooting

### Projects Not Loading
- Check browser console for errors
- Verify GitHub username in `script.js`
- Ensure internet connection for API requests
- GitHub API has rate limits (60 requests/hour for unauthenticated requests)

### Styling Issues
- Clear browser cache
- Check for CSS syntax errors
- Verify file paths are correct
- Use browser dev tools to debug

### Mobile Issues
- Test on actual devices
- Use browser dev tools mobile simulation
- Check viewport meta tag is present

## 📈 SEO Optimization

The portfolio includes basic SEO optimization:
- Semantic HTML structure
- Meta descriptions and titles
- Alt tags for images
- Proper heading hierarchy

To improve SEO further:
- Add structured data (JSON-LD)
- Optimize images with proper sizing
- Add a sitemap.xml
- Use Google Search Console

## 🤝 Contributing

Feel free to submit issues and suggestions for improvements!

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ by Ayan Panda**

For questions or support, feel free to reach out via [LinkedIn](https://www.linkedin.com/in/ayan-panda/) or [GitHub](https://github.com/ayanpanda-github)!
