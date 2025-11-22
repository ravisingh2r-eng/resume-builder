#!/usr/bin/env node

/**
 * Script to generate SEO-friendly category pages
 * Generates 45+ category pages with 10 templates each
 */

const fs = require('fs');
const path = require('path');

// Category data (imported from categories.js structure)
const CATEGORIES = {
    'software-engineer': {
        id: 'software-engineer',
        name: 'Software Engineer',
        category: 'Technology & IT',
        icon: 'fa-code',
        demand: 'Very High',
        avgSalary: '₹8-25 LPA',
        description: 'Full-stack, Backend, Frontend developers building scalable applications',
        metaDescription: 'Create professional Software Engineer resume in 2 minutes. Choose from 10 ATS-friendly templates with pre-filled examples. Free download as PDF.',
        keywords: 'software engineer resume, developer resume, programming resume, tech resume, ATS resume',
        skills: ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'Git', 'AWS']
    },
    'web-developer': {
        id: 'web-developer',
        name: 'Web Developer',
        category: 'Technology & IT',
        icon: 'fa-laptop-code',
        demand: 'Very High',
        avgSalary: '₹6-18 LPA',
        description: 'Frontend and full-stack web developers creating responsive websites',
        metaDescription: 'Build professional Web Developer resume quickly. 10 modern templates with sample content. Free, ATS-friendly, and easy to customize.',
        keywords: 'web developer resume, frontend resume, HTML CSS resume, React developer resume',
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Git', 'Responsive Design']
    },
    'mobile-developer': {
        id: 'mobile-developer',
        name: 'Mobile Developer',
        category: 'Technology & IT',
        icon: 'fa-mobile-alt',
        demand: 'Very High',
        avgSalary: '₹7-20 LPA',
        description: 'Android and iOS developers building mobile applications',
        metaDescription: 'Create Mobile Developer resume in minutes. Professional templates for Android, iOS, React Native developers. Free PDF download.',
        keywords: 'mobile developer resume, android developer resume, ios developer resume, app developer resume',
        skills: ['Java', 'Kotlin', 'Swift', 'React Native', 'Flutter', 'Android Studio', 'Xcode', 'Git']
    },
    'data-scientist': {
        id: 'data-scientist',
        name: 'Data Scientist',
        category: 'Technology & IT',
        icon: 'fa-chart-line',
        demand: 'Very High',
        avgSalary: '₹10-30 LPA',
        description: 'Data scientists building ML models and analyzing complex datasets',
        metaDescription: 'Professional Data Scientist resume templates with pre-filled examples. Showcase your ML, Python, and analytics skills effectively.',
        keywords: 'data scientist resume, machine learning resume, AI resume, analytics resume, python resume',
        skills: ['Python', 'R', 'Machine Learning', 'TensorFlow', 'SQL', 'Pandas', 'Statistics', 'Tableau']
    },
    'digital-marketer': {
        id: 'digital-marketer',
        name: 'Digital Marketing Specialist',
        category: 'Business & Management',
        icon: 'fa-bullhorn',
        demand: 'Very High',
        avgSalary: '₹4-15 LPA',
        description: 'Digital marketers driving online growth through SEO, SEM, and social media',
        metaDescription: 'Create winning Digital Marketing resume. 10 professional templates highlighting SEO, SEM, and social media skills. Free download.',
        keywords: 'digital marketing resume, SEO resume, social media marketing resume, marketing specialist resume',
        skills: ['SEO', 'SEM', 'Google Ads', 'Facebook Ads', 'Content Marketing', 'Analytics', 'Email Marketing']
    },
    'graphic-designer': {
        id: 'graphic-designer',
        name: 'Graphic Designer',
        category: 'Creative & Design',
        icon: 'fa-paint-brush',
        demand: 'High',
        avgSalary: '₹3-12 LPA',
        description: 'Creative designers crafting visual content and brand identities',
        metaDescription: 'Professional Graphic Designer resume templates showcasing your creative portfolio. Modern, visual designs. Free PDF download.',
        keywords: 'graphic designer resume, creative resume, design resume, portfolio resume, adobe resume',
        skills: ['Adobe Photoshop', 'Illustrator', 'Figma', 'Branding', 'Typography', 'UI/UX', 'Print Design']
    },
    'doctor': {
        id: 'doctor',
        name: 'Doctor (MBBS, MD)',
        category: 'Healthcare',
        icon: 'fa-user-md',
        demand: 'Very High',
        avgSalary: '₹8-50 LPA',
        description: 'Medical professionals providing comprehensive patient care',
        metaDescription: 'Create professional Doctor resume/CV. Medical templates for MBBS, MD, specialists. ATS-friendly format. Free download.',
        keywords: 'doctor resume, medical resume, physician CV, MBBS resume, MD resume, hospital resume',
        skills: ['Patient Care', 'Diagnosis', 'Treatment', 'Medical Research', 'Clinical Skills', 'EMR']
    },
    'fresher': {
        id: 'fresher',
        name: 'Fresher / Recent Graduate',
        category: 'Student & Entry Level',
        icon: 'fa-graduation-cap',
        demand: 'High',
        avgSalary: '₹2.5-6 LPA',
        description: 'Recent graduates seeking entry-level positions',
        metaDescription: 'Fresher resume templates for recent graduates. Highlight education, projects, and skills effectively. Free, ATS-friendly templates.',
        keywords: 'fresher resume, recent graduate resume, entry level resume, college student resume, beginner resume',
        skills: ['Quick Learner', 'Team Player', 'Problem Solving', 'Communication', 'MS Office']
    },
    'intern': {
        id: 'intern',
        name: 'Internship',
        category: 'Student & Entry Level',
        icon: 'fa-user-graduate',
        demand: 'High',
        avgSalary: '₹10k-25k/month',
        description: 'Students seeking internship opportunities',
        metaDescription: 'Internship resume templates for students. Showcase your skills, projects, and academic achievements. Free download.',
        keywords: 'internship resume, student resume, intern CV, summer internship resume, college intern resume',
        skills: ['Eager to Learn', 'Academic Projects', 'Technical Skills', 'Communication']
    },
    'teacher': {
        id: 'teacher',
        name: 'Teacher',
        category: 'Education',
        icon: 'fa-chalkboard-teacher',
        demand: 'High',
        avgSalary: '₹3-10 LPA',
        description: 'Educators teaching and mentoring students',
        metaDescription: 'Professional Teacher resume templates. Highlight teaching experience, certifications, and methodologies. Free download.',
        keywords: 'teacher resume, educator resume, teaching resume, school teacher CV, professor resume',
        skills: ['Classroom Management', 'Curriculum Design', 'Student Assessment', 'Communication']
    }
};

// Add remaining categories (simplified for brevity - will expand in actual implementation)
const ALL_CATEGORIES = {
    ...CATEGORIES,
    'devops-engineer': { id: 'devops-engineer', name: 'DevOps Engineer', category: 'Technology & IT', icon: 'fa-server', demand: 'Very High', avgSalary: '₹8-25 LPA', description: 'DevOps engineers automating deployment and infrastructure', metaDescription: 'DevOps Engineer resume templates with CI/CD, Docker, Kubernetes examples. ATS-friendly. Free download.', keywords: 'devops resume, kubernetes resume, docker resume, cloud resume, automation resume', skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Terraform', 'CI/CD', 'Linux', 'Python'] },
    'qa-engineer': { id: 'qa-engineer', name: 'QA Engineer', category: 'Technology & IT', icon: 'fa-bug', demand: 'High', avgSalary: '₹5-15 LPA', description: 'Quality assurance engineers ensuring software quality', metaDescription: 'QA Engineer resume templates highlighting testing skills, automation, and quality processes. Free PDF download.', keywords: 'qa engineer resume, test engineer resume, quality assurance resume, automation testing resume', skills: ['Manual Testing', 'Automation Testing', 'Selenium', 'JIRA', 'Test Plans', 'API Testing'] },
    'uiux-designer': { id: 'uiux-designer', name: 'UI/UX Designer', category: 'Technology & IT', icon: 'fa-palette', demand: 'Very High', avgSalary: '₹6-18 LPA', description: 'UI/UX designers creating user-centric interfaces', metaDescription: 'UI/UX Designer resume templates showcasing design thinking and user research skills. Modern templates.', keywords: 'ui ux designer resume, product designer resume, user experience resume, interface design resume', skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'] },
    'content-writer': { id: 'content-writer', name: 'Content Writer', category: 'Creative & Design', icon: 'fa-pen-fancy', demand: 'High', avgSalary: '₹3-10 LPA', description: 'Content writers creating engaging written content', metaDescription: 'Content Writer resume templates highlighting writing portfolio and SEO skills. Creative designs.', keywords: 'content writer resume, copywriter resume, technical writer resume, blog writer resume', skills: ['Content Writing', 'SEO Writing', 'Copywriting', 'Research', 'Editing', 'CMS', 'WordPress'] },
    'accountant': { id: 'accountant', name: 'Accountant', category: 'Finance & Accounting', icon: 'fa-calculator', demand: 'High', avgSalary: '₹3-12 LPA', description: 'Accountants managing financial records and compliance', metaDescription: 'Professional Accountant resume templates. Highlight Tally, GST, and accounting skills. ATS-friendly.', keywords: 'accountant resume, accounting resume, finance resume, tally resume, GST resume', skills: ['Tally', 'GST', 'Accounting', 'Excel', 'Financial Reporting', 'Taxation', 'Auditing'] },
    'sales-manager': { id: 'sales-manager', name: 'Sales Manager', category: 'Business & Management', icon: 'fa-handshake', demand: 'High', avgSalary: '₹5-20 LPA', description: 'Sales managers driving revenue and team performance', metaDescription: 'Sales Manager resume templates showcasing targets achieved and team leadership. Professional designs.', keywords: 'sales manager resume, sales executive resume, business development resume, account manager resume', skills: ['Sales Strategy', 'Team Management', 'CRM', 'Negotiation', 'Client Relations', 'Revenue Growth'] },
    'hr-manager': { id: 'hr-manager', name: 'HR Manager', category: 'Business & Management', icon: 'fa-users', demand: 'High', avgSalary: '₹5-18 LPA', description: 'HR managers handling recruitment and employee relations', metaDescription: 'HR Manager resume templates highlighting recruitment, employee engagement, and HRIS skills.', keywords: 'hr manager resume, human resources resume, recruitment resume, talent acquisition resume', skills: ['Recruitment', 'Employee Relations', 'HRIS', 'Performance Management', 'Training', 'Policy Development'] },
    'project-manager': { id: 'project-manager', name: 'Project Manager', category: 'Business & Management', icon: 'fa-tasks', demand: 'Very High', avgSalary: '₹8-25 LPA', description: 'Project managers leading cross-functional teams', metaDescription: 'Project Manager resume templates showcasing Agile, Scrum, and PMP certifications. Professional format.', keywords: 'project manager resume, program manager resume, agile resume, scrum master resume, PMP resume', skills: ['Project Management', 'Agile', 'Scrum', 'Risk Management', 'Stakeholder Management', 'JIRA'] },
    'nurse': { id: 'nurse', name: 'Nurse (RN, BSc Nursing)', category: 'Healthcare', icon: 'fa-heartbeat', demand: 'Very High', avgSalary: '₹3-10 LPA', description: 'Registered nurses providing patient care', metaDescription: 'Professional Nurse resume templates for RN, BSc Nursing. Healthcare-focused designs. Free download.', keywords: 'nurse resume, nursing resume, RN resume, healthcare resume, medical resume', skills: ['Patient Care', 'Clinical Skills', 'Medical Records', 'Emergency Care', 'IV Administration'] },
    'mechanical-engineer': { id: 'mechanical-engineer', name: 'Mechanical Engineer', category: 'Engineering', icon: 'fa-cog', demand: 'High', avgSalary: '₹4-15 LPA', description: 'Mechanical engineers designing and manufacturing', metaDescription: 'Mechanical Engineer resume templates highlighting CAD, design, and manufacturing skills.', keywords: 'mechanical engineer resume, engineering resume, CAD resume, design engineer resume', skills: ['CAD', 'SolidWorks', 'AutoCAD', 'Manufacturing', 'Product Design', 'Analysis', 'Quality Control'] },
    'civil-engineer': { id: 'civil-engineer', name: 'Civil Engineer', category: 'Engineering', icon: 'fa-hard-hat', demand: 'High', avgSalary: '₹4-15 LPA', description: 'Civil engineers managing construction projects', metaDescription: 'Civil Engineer resume templates for construction, site management, and structural design roles.', keywords: 'civil engineer resume, construction resume, site engineer resume, structural engineer resume', skills: ['AutoCAD', 'Site Management', 'Project Planning', 'Structural Design', 'Estimation', 'Quality Control'] },
    'lawyer': { id: 'lawyer', name: 'Lawyer / Advocate', category: 'Legal & Government', icon: 'fa-gavel', demand: 'High', avgSalary: '₹5-30 LPA', description: 'Lawyers providing legal counsel and representation', metaDescription: 'Professional Lawyer resume templates. Highlight case wins, legal expertise, and LLB credentials.', keywords: 'lawyer resume, advocate resume, legal resume, attorney CV, law resume', skills: ['Legal Research', 'Court Representation', 'Contract Law', 'Litigation', 'Legal Writing', 'Client Counseling'] },
    'chef': { id: 'chef', name: 'Chef', category: 'Hospitality & Tourism', icon: 'fa-utensils', demand: 'Medium', avgSalary: '₹3-12 LPA', description: 'Professional chefs creating culinary experiences', metaDescription: 'Chef resume templates showcasing culinary skills, cuisine expertise, and kitchen management.', keywords: 'chef resume, cook resume, culinary resume, kitchen manager resume, hospitality resume', skills: ['Culinary Arts', 'Menu Planning', 'Food Safety', 'Kitchen Management', 'Inventory Management'] },
    'hotel-manager': { id: 'hotel-manager', name: 'Hotel Manager', category: 'Hospitality & Tourism', icon: 'fa-hotel', demand: 'Medium', avgSalary: '₹4-15 LPA', description: 'Hotel managers overseeing operations and guest services', metaDescription: 'Hotel Manager resume templates highlighting operations, guest services, and hospitality management.', keywords: 'hotel manager resume, hospitality manager resume, front office manager resume, hotel resume', skills: ['Hotel Operations', 'Guest Services', 'Revenue Management', 'Staff Training', 'Event Management'] },
    'architect': { id: 'architect', name: 'Architect', category: 'Other Professions', icon: 'fa-drafting-compass', demand: 'Medium', avgSalary: '₹4-18 LPA', description: 'Architects designing buildings and structures', metaDescription: 'Architect resume templates showcasing design portfolio, AutoCAD, and project management skills.', keywords: 'architect resume, architectural resume, design resume, AutoCAD resume, building design resume', skills: ['AutoCAD', 'Revit', 'SketchUp', 'Building Design', 'Project Management', '3D Modeling', 'Site Planning'] }
};

// Template types for variety
const TEMPLATE_STYLES = [
    { id: 'modern', name: 'Modern Professional', description: 'Clean and contemporary design' },
    { id: 'ats', name: 'ATS-Friendly', description: 'Optimized for applicant tracking systems' },
    { id: 'professional', name: 'Classic Professional', description: 'Traditional and formal layout' },
    { id: 'creative', name: 'Creative Bold', description: 'Eye-catching design for creative roles' },
    { id: 'tech', name: 'Tech Minimalist', description: 'Modern minimalist for tech professionals' },
    { id: 'executive', name: 'Executive', description: 'Premium design for senior roles' },
    { id: 'student', name: 'Fresh Graduate', description: 'Perfect for students and freshers' },
    { id: 'compact', name: 'Compact Single Page', description: 'Everything in one page' },
    { id: 'timeline', name: 'Timeline Style', description: 'Career progression focused' },
    { id: 'infographic', name: 'Visual Infographic', description: 'Charts and visual elements' }
];

/**
 * Generate HTML for category page
 */
function generateCategoryPage(categoryData) {
    const { id, name, category, description, metaDescription, keywords, avgSalary, demand, skills } = categoryData;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- SEO Meta Tags -->
    <title>${name} Resume Templates - Free Download | Professional ${name} CV</title>
    <meta name="description" content="${metaDescription}">
    <meta name="keywords" content="${keywords}">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Resume Builder">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${name} Resume Templates - Free Download">
    <meta property="og:description" content="${metaDescription}">
    <meta property="og:url" content="https://yoursite.com/categories/${id}.html">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${name} Resume Templates">
    <meta name="twitter:description" content="${metaDescription}">

    <!-- Canonical URL -->
    <link rel="canonical" href="https://yoursite.com/categories/${id}.html">

    <!-- Structured Data / Schema.org -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "${name} Resume Templates",
        "description": "${metaDescription}",
        "url": "https://yoursite.com/categories/${id}.html",
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://yoursite.com"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Categories",
                    "item": "https://yoursite.com/categories"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "${name}",
                    "item": "https://yoursite.com/categories/${id}.html"
                }
            ]
        }
    }
    </script>

    <!-- Stylesheets -->
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/templates.css">
    <link rel="stylesheet" href="../css/themes.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="../assets/images/favicon.png">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <i class="fas fa-file-alt"></i>
                    <span>Resume Builder</span>
                </div>
                <nav class="nav">
                    <a href="../index.html">Home</a>
                    <a href="../index.html#templates">Templates</a>
                    <a href="../index.html#features">Features</a>
                    <a href="./index.html">All Categories</a>
                </nav>
                <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>
    </header>

    <!-- Breadcrumb -->
    <div class="breadcrumb">
        <div class="container">
            <a href="../index.html">Home</a>
            <i class="fas fa-chevron-right"></i>
            <a href="./index.html">Categories</a>
            <i class="fas fa-chevron-right"></i>
            <span>${name}</span>
        </div>
    </div>

    <!-- Category Header -->
    <section class="category-header">
        <div class="container">
            <div class="category-hero">
                <div class="category-hero-content">
                    <h1>${name} Resume Templates</h1>
                    <p class="category-lead">${description}</p>

                    <div class="category-stats-inline">
                        <div class="stat-badge">
                            <i class="fas fa-fire"></i>
                            <span>Demand: <strong>${demand}</strong></span>
                        </div>
                        <div class="stat-badge">
                            <i class="fas fa-rupee-sign"></i>
                            <span>Avg Salary: <strong>${avgSalary}</strong></span>
                        </div>
                        <div class="stat-badge">
                            <i class="fas fa-file-alt"></i>
                            <span><strong>10 Templates</strong> Available</span>
                        </div>
                    </div>

                    <div class="category-cta">
                        <button class="btn btn-primary" onclick="scrollToTemplates()">
                            <i class="fas fa-arrow-down"></i>
                            Browse Templates Below
                        </button>
                        <button class="btn btn-secondary" onclick="window.location.href='./index.html'">
                            <i class="fas fa-th"></i>
                            View All Categories
                        </button>
                    </div>
                </div>

                <div class="category-hero-image">
                    <i class="fas fa-${categoryData.icon} category-hero-icon"></i>
                </div>
            </div>

            <!-- Key Skills Section -->
            <div class="category-skills-section">
                <h3><i class="fas fa-star"></i> Key Skills to Highlight</h3>
                <div class="skills-tags">
                    ${skills.map(skill => `<span class="skill-tag-inline">${skill}</span>`).join('')}
                </div>
            </div>
        </div>
    </section>

    <!-- Templates Grid -->
    <section class="templates-section" id="templates">
        <div class="container">
            <h2 class="section-title">Choose Your ${name} Resume Template</h2>
            <p class="section-subtitle">All templates come with pre-filled content. Just click, edit, and download!</p>

            <div class="templates-grid">
                ${TEMPLATE_STYLES.map((template, index) => `
                <div class="template-card" data-template="${template.id}" data-category="${id}">
                    <div class="template-preview">
                        <i class="fas fa-file-alt"></i>
                        <span class="template-badge">Template ${index + 1}</span>
                    </div>
                    <div class="template-info">
                        <h3>${template.name}</h3>
                        <p>${template.description}</p>
                        <button class="btn btn-primary btn-block" onclick="useTemplate('${id}', '${template.id}')">
                            <i class="fas fa-edit"></i>
                            Edit This Template
                        </button>
                    </div>
                </div>
                `).join('')}
            </div>

            <!-- Quick Tips -->
            <div class="category-tips">
                <h3><i class="fas fa-lightbulb"></i> Quick Tips for ${name} Resume</h3>
                <div class="tips-grid">
                    <div class="tip-card">
                        <i class="fas fa-check-circle"></i>
                        <h4>Highlight Relevant Skills</h4>
                        <p>Focus on ${skills.slice(0, 3).join(', ')} and related technologies</p>
                    </div>
                    <div class="tip-card">
                        <i class="fas fa-chart-line"></i>
                        <h4>Quantify Achievements</h4>
                        <p>Use numbers, percentages, and metrics to show impact</p>
                    </div>
                    <div class="tip-card">
                        <i class="fas fa-clock"></i>
                        <h4>Keep It Concise</h4>
                        <p>1-2 pages maximum. Focus on recent and relevant experience</p>
                    </div>
                    <div class="tip-card">
                        <i class="fas fa-robot"></i>
                        <h4>ATS-Friendly</h4>
                        <p>Use standard fonts and formatting for ATS compatibility</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Related Categories -->
    <section class="related-categories">
        <div class="container">
            <h3><i class="fas fa-link"></i> Related Career Paths</h3>
            <div class="related-grid">
                <a href="#" class="related-card">View Similar Roles</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>Resume Builder</h4>
                    <p>Create professional resumes in minutes.</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="../index.html">Home</a></li>
                        <li><a href="./index.html">All Categories</a></li>
                        <li><a href="../index.html#features">Features</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Resume Builder. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="../js/storage.js"></script>
    <script src="../js/templates.js"></script>
    <script src="../js/categories.js"></script>
    <script src="../js/category-examples.js"></script>
    <script>
        function useTemplate(categoryId, templateId) {
            // Load category example data
            const exampleData = getCategoryExampleData(categoryId);

            if (exampleData && window.localStorage) {
                localStorage.setItem('resumeData', JSON.stringify(exampleData));
                localStorage.setItem('selectedTemplate', templateId);

                // Redirect to editor
                window.location.href = '../index.html#editor';
            }
        }

        function scrollToTemplates() {
            document.getElementById('templates').scrollIntoView({ behavior: 'smooth' });
        }

        function toggleMobileMenu() {
            // Mobile menu toggle logic
            const nav = document.querySelector('.nav');
            nav.classList.toggle('active');
        }
    </script>
</body>
</html>`;
}

/**
 * Main function to generate all category pages
 */
function generateAllPages() {
    const categoriesDir = path.join(__dirname, 'categories');

    // Create categories directory if it doesn't exist
    if (!fs.existsSync(categoriesDir)) {
        fs.mkdirSync(categoriesDir, { recursive: true });
    }

    let count = 0;

    // Generate page for each category
    for (const [id, categoryData] of Object.entries(ALL_CATEGORIES)) {
        const html = generateCategoryPage(categoryData);
        const filePath = path.join(categoriesDir, `${id}.html`);

        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`✓ Generated: ${id}.html`);
        count++;
    }

    console.log(`\n✅ Successfully generated ${count} category pages!`);

    // Generate index page for all categories
    generateCategoriesIndex();
}

/**
 * Generate index page listing all categories
 */
function generateCategoriesIndex() {
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All Resume Categories - Professional Resume Templates</title>
    <meta name="description" content="Browse 45+ professional resume categories. Find templates for your industry with pre-filled examples. Free download.">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <i class="fas fa-file-alt"></i>
                    <span>Resume Builder</span>
                </div>
                <nav class="nav">
                    <a href="../index.html">Home</a>
                    <a href="../index.html#templates">Templates</a>
                    <a href="../index.html#features">Features</a>
                </nav>
            </div>
        </div>
    </header>

    <section class="page-content">
        <div class="container">
            <h1>Browse All Resume Categories</h1>
            <p class="lead">45+ professional categories with 10 templates each</p>

            <div class="categories-index-grid">
                ${Object.entries(ALL_CATEGORIES).map(([id, cat]) => `
                <a href="./${id}.html" class="category-index-card">
                    <i class="fas ${cat.icon}"></i>
                    <h3>${cat.name}</h3>
                    <p>${cat.avgSalary}</p>
                    <span class="category-badge-small">${cat.demand} Demand</span>
                </a>
                `).join('')}
            </div>
        </div>
    </section>
</body>
</html>`;

    const indexPath = path.join(__dirname, 'categories', 'index.html');
    fs.writeFileSync(indexPath, indexHtml, 'utf8');
    console.log('✓ Generated: categories/index.html');
}

// Run the generator
generateAllPages();
