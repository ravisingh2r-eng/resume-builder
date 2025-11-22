/*

 ============================================
   RESUME BUILDER - MAIN APPLICATION
   Comprehensive resume builder with real-time preview
   ============================================
*/

// ============================================
// GLOBAL STATE MANAGEMENT
// ============================================
const APP_STATE = {
    currentPage: 'home',
    currentTemplate: 'modern',
    accentColor: '#3498db',
    fontFamily: 'Inter',
    fontSize: 14,
    spacing: 1,
    zoomLevel: 100,
    resumeData: {
        personal: {
            fullName: '',
            jobTitle: '',
            email: '',
            phone: '',
            location: '',
            website: '',
            linkedin: '',
            github: '',
            photo: null
        },
        summary: '',
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: [],
        interests: ''
    },
    visibleSections: {
        summary: true,
        experience: true,
        education: true,
        skills: true,
        projects: true,
        certifications: true,
        languages: true,
        interests: true
    },
    achievements: {
        firstResume: false,
        firstDownload: false,
        downloads5: false,
        allSectionsFilled: false
    },
    stats: {
        downloadsCount: 0,
        resumesCreated: 0,
        lastEdited: null
    }
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    loadSavedData();
    initializeTemplates();
    checkAdBlocker();
    updateProgress();
    setupAutoSave();
});

function initializeApp() {
    console.log('Resume Builder initialized');

    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Load sample data if it's the first visit
    if (!localStorage.getItem('hasVisited')) {
        loadSampleData();
        localStorage.setItem('hasVisited', 'true');
    }

    // Initialize ad refresh timer
    setupAdRefresh();
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // CTA Buttons
    document.getElementById('createResumeBtn')?.addEventListener('click', () => navigateToPage('editor'));
    document.getElementById('heroCreateBtn')?.addEventListener('click', () => navigateToPage('editor'));
    document.getElementById('heroTemplatesBtn')?.addEventListener('click', () => navigateToPage('templates'));

    // Theme Toggle
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

    // Zoom Controls
    document.getElementById('zoomIn')?.addEventListener('click', () => adjustZoom(10));
    document.getElementById('zoomOut')?.addEventListener('click', () => adjustZoom(-10));

    // Settings/Customization
    document.getElementById('settingsBtn')?.addEventListener('click', toggleCustomization);

    // Download
    document.getElementById('downloadBtn')?.addEventListener('click', openDownloadModal);

    // Personal Information Inputs
    document.getElementById('fullName')?.addEventListener('input', (e) => updateResumeData('personal', 'fullName', e.target.value));
    document.getElementById('jobTitle')?.addEventListener('input', (e) => updateResumeData('personal', 'jobTitle', e.target.value));
    document.getElementById('email')?.addEventListener('input', (e) => updateResumeData('personal', 'email', e.target.value));
    document.getElementById('phone')?.addEventListener('input', (e) => updateResumeData('personal', 'phone', e.target.value));
    document.getElementById('location')?.addEventListener('input', (e) => updateResumeData('personal', 'location', e.target.value));
    document.getElementById('website')?.addEventListener('input', (e) => updateResumeData('personal', 'website', e.target.value));
    document.getElementById('linkedin')?.addEventListener('input', (e) => updateResumeData('personal', 'linkedin', e.target.value));
    document.getElementById('github')?.addEventListener('input', (e) => updateResumeData('personal', 'github', e.target.value));
    document.getElementById('profilePhoto')?.addEventListener('change', handlePhotoUpload);

    // Summary
    document.getElementById('summary')?.addEventListener('input', (e) => {
        updateResumeData('summary', null, e.target.value);
        updateCharCounter('summaryCounter', e.target.value.length);
    });

    // Interests
    document.getElementById('interests')?.addEventListener('input', (e) => {
        updateResumeData('interests', null, e.target.value);
    });

    // Customization Controls
    document.getElementById('accentColor')?.addEventListener('input', (e) => updateAccentColor(e.target.value));
    document.getElementById('fontFamily')?.addEventListener('change', (e) => updateFontFamily(e.target.value));
    document.getElementById('fontSize')?.addEventListener('input', (e) => updateFontSize(e.target.value));
    document.getElementById('spacing')?.addEventListener('input', (e) => updateSpacing(e.target.value));

    // Color Presets
    document.querySelectorAll('.color-preset').forEach(preset => {
        preset.addEventListener('click', (e) => {
            const color = e.target.getAttribute('data-color');
            updateAccentColor(color);
            document.getElementById('accentColor').value = color;
        });
    });

    // Section Visibility Toggles
    document.querySelectorAll('.visibility-toggles input[type="checkbox"]').forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const section = e.target.getAttribute('data-section');
            toggleSectionVisibility(section, e.target.checked);
        });
    });

    // Template Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleTemplateFilter);
    });

    // Social Share
    window.shareOnWhatsApp = shareOnWhatsApp;
    window.shareOnTwitter = shareOnTwitter;
    window.shareOnFacebook = shareOnFacebook;
    window.shareOnLinkedIn = shareOnLinkedIn;

    // Modal Close
    window.closeDownloadModal = closeDownloadModal;
    window.closeCustomization = closeCustomization;

    // Download Functions
    window.downloadPDF = downloadPDF;
    window.downloadPNG = downloadPNG;
    window.downloadJSON = downloadJSON;

    // Section Toggle
    window.toggleSection = toggleSection;

    // Dynamic Section Additions
    window.addExperience = addExperience;
    window.addEducation = addEducation;
    window.addSkill = addSkill;
    window.addProject = addProject;
    window.addCertification = addCertification;
    window.addLanguage = addLanguage;
}

// ============================================
// NAVIGATION
// ============================================
function handleNavigation(e) {
    e.preventDefault();
    const page = e.target.getAttribute('data-page');
    navigateToPage(page);
}

function navigateToPage(page) {
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-page') === page);
    });

    // Show appropriate page
    document.querySelectorAll('.page').forEach(p => {
        p.classList.toggle('active', p.id === `${page}Page`);
    });

    APP_STATE.currentPage = page;

    // Track page view
    trackEvent('page_view', { page });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// THEME MANAGEMENT
// ============================================
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Add transitioning class to prevent flash
    document.body.classList.add('theme-transitioning');

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Remove transitioning class after animation
    setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
    }, 300);

    trackEvent('theme_toggle', { theme: newTheme });
}

// ============================================
// TEMPLATE MANAGEMENT
// ============================================
function initializeTemplates() {
    const templatesGrid = document.getElementById('templatesGrid');
    if (!templatesGrid) return;

    const templates = [
        {
            id: 'modern',
            name: 'Modern Minimal',
            category: 'modern',
            description: 'Clean, contemporary design with sidebar layout',
            badge: 'Popular',
            colors: ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6']
        },
        {
            id: 'ats',
            name: 'ATS-Friendly',
            category: 'ats',
            description: 'Optimized for Applicant Tracking Systems',
            badge: 'Recommended',
            colors: ['#2c3e50', '#34495e', '#7f8c8d', '#95a5a6']
        },
        {
            id: 'creative',
            name: 'Creative Designer',
            category: 'creative',
            description: 'Colorful, portfolio-style layout',
            badge: 'Eye-catching',
            colors: ['#e74c3c', '#f39c12', '#9b59b6', '#1abc9c']
        },
        {
            id: 'professional',
            name: 'Professional Corporate',
            category: 'professional',
            description: 'Traditional, formal business layout',
            badge: 'Classic',
            colors: ['#2c3e50', '#3498db', '#2ecc71', '#f39c12']
        },
        {
            id: 'tech',
            name: 'Tech Developer',
            category: 'modern',
            description: 'Developer-focused with code aesthetics',
            badge: 'For Developers',
            colors: ['#007acc', '#4ec9b0', '#ce9178', '#dcdcaa']
        },
        {
            id: 'student',
            name: 'Student/Fresher',
            category: 'professional',
            description: 'Education-focused layout',
            badge: 'For Students',
            colors: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12']
        }
    ];

    templates.forEach(template => {
        const card = createTemplateCard(template);
        templatesGrid.appendChild(card);
    });

    // Also populate template selector in customization panel
    populateTemplateSelectorThumbs(templates);
}

function createTemplateCard(template) {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.setAttribute('data-category', template.category);
    card.onclick = () => selectTemplate(template.id);

    card.innerHTML = `
        <div class="template-preview">
            <i class="fas fa-file-alt"></i>
            <span class="template-badge">${template.badge}</span>
        </div>
        <div class="template-info">
            <h3>${template.name}</h3>
            <p>${template.description}</p>
            <div class="template-colors">
                ${template.colors.map(color => `<div class="color-dot" style="background: ${color};"></div>`).join('')}
            </div>
        </div>
    `;

    return card;
}

function populateTemplateSelectorThumbs(templates) {
    const selector = document.getElementById('templateSelector');
    if (!selector) return;

    templates.forEach(template => {
        const thumb = document.createElement('div');
        thumb.className = 'template-thumb';
        if (template.id === APP_STATE.currentTemplate) {
            thumb.classList.add('active');
        }
        thumb.innerHTML = '<i class="fas fa-file-alt"></i>';
        thumb.onclick = () => selectTemplate(template.id);
        thumb.title = template.name;
        selector.appendChild(thumb);
    });
}

function selectTemplate(templateId) {
    APP_STATE.currentTemplate = templateId;

    // Update active state in template selector
    document.querySelectorAll('.template-thumb').forEach((thumb, index) => {
        thumb.classList.toggle('active', index === getTemplateIndex(templateId));
    });

    // Navigate to editor if not already there
    if (APP_STATE.currentPage !== 'editor') {
        navigateToPage('editor');
    }

    // Render preview
    renderResumePreview();

    trackEvent('template_select', { template: templateId });
}

function getTemplateIndex(templateId) {
    const templates = ['modern', 'ats', 'creative', 'professional', 'tech', 'student'];
    return templates.indexOf(templateId);
}

function handleTemplateFilter(e) {
    const filter = e.target.getAttribute('data-filter');

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
    });

    // Filter templates
    document.querySelectorAll('.template-card').forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    trackEvent('template_filter', { filter });
}

// ============================================
// DATA MANAGEMENT
// ============================================
function updateResumeData(section, key, value) {
    if (key === null) {
        // Direct section update (like summary)
        APP_STATE.resumeData[section] = value;
    } else {
        // Nested update (like personal.fullName)
        APP_STATE.resumeData[section][key] = value;
    }

    renderResumePreview();
    updateProgress();
    saveToLocalStorage();
}

function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            APP_STATE.resumeData.personal.photo = event.target.result;
            renderResumePreview();
            saveToLocalStorage();
        };
        reader.readAsDataURL(file);
    }
}

// ============================================
// DYNAMIC SECTIONS
// ============================================
function addExperience() {
    const id = Date.now();
    const experience = {
        id,
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
    };

    APP_STATE.resumeData.experience.push(experience);
    renderExperienceItem(experience);
    saveToLocalStorage();
}

function renderExperienceItem(exp) {
    const container = document.getElementById('experienceList');
    const item = document.createElement('div');
    item.className = 'experience-entry';
    item.setAttribute('data-id', exp.id);

    item.innerHTML = `
        <div class="form-group">
            <label>Job Title *</label>
            <input type="text" value="${exp.title}" placeholder="Software Engineer"
                   onchange="updateExperience(${exp.id}, 'title', this.value)">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Company *</label>
                <input type="text" value="${exp.company}" placeholder="Company Name"
                       onchange="updateExperience(${exp.id}, 'company', this.value)">
            </div>
            <div class="form-group">
                <label>Location</label>
                <input type="text" value="${exp.location}" placeholder="City, Country"
                       onchange="updateExperience(${exp.id}, 'location', this.value)">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Start Date *</label>
                <input type="month" value="${exp.startDate}"
                       onchange="updateExperience(${exp.id}, 'startDate', this.value)">
            </div>
            <div class="form-group">
                <label>End Date</label>
                <input type="month" value="${exp.endDate}" ${exp.current ? 'disabled' : ''}
                       onchange="updateExperience(${exp.id}, 'endDate', this.value)">
            </div>
        </div>
        <div class="form-group">
            <label>
                <input type="checkbox" ${exp.current ? 'checked' : ''}
                       onchange="updateExperience(${exp.id}, 'current', this.checked)">
                I currently work here
            </label>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea rows="4" placeholder="• Describe your responsibilities and achievements&#10;• Use bullet points&#10;• Start with action verbs"
                      onchange="updateExperience(${exp.id}, 'description', this.value)">${exp.description}</textarea>
            <small>Tip: Use bullet points and start with action verbs like "Developed", "Managed", "Led"</small>
        </div>
        <button class="btn-icon" onclick="removeExperience(${exp.id})" style="color: #e74c3c;">
            <i class="fas fa-trash"></i> Remove
        </button>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid var(--border-color);">
    `;

    container.appendChild(item);
}

window.updateExperience = function(id, field, value) {
    const exp = APP_STATE.resumeData.experience.find(e => e.id === id);
    if (exp) {
        exp[field] = value;

        // If current is checked, clear end date
        if (field === 'current' && value) {
            exp.endDate = '';
            const item = document.querySelector(`[data-id="${id}"]`);
            const endDateInput = item.querySelector('input[type="month"]:last-of-type');
            if (endDateInput) {
                endDateInput.value = '';
                endDateInput.disabled = true;
            }
        } else if (field === 'current' && !value) {
            const item = document.querySelector(`[data-id="${id}"]`);
            const endDateInput = item.querySelector('input[type="month"]:last-of-type');
            if (endDateInput) {
                endDateInput.disabled = false;
            }
        }

        renderResumePreview();
        updateProgress();
        saveToLocalStorage();
    }
};

window.removeExperience = function(id) {
    APP_STATE.resumeData.experience = APP_STATE.resumeData.experience.filter(e => e.id !== id);
    document.querySelector(`[data-id="${id}"]`)?.remove();
    renderResumePreview();
    updateProgress();
    saveToLocalStorage();
};

// Similar functions for Education
function addEducation() {
    const id = Date.now();
    const education = {
        id,
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: ''
    };

    APP_STATE.resumeData.education.push(education);
    renderEducationItem(education);
    saveToLocalStorage();
}

function renderEducationItem(edu) {
    const container = document.getElementById('educationList');
    const item = document.createElement('div');
    item.className = 'education-entry';
    item.setAttribute('data-id', edu.id);

    item.innerHTML = `
        <div class="form-group">
            <label>Degree *</label>
            <input type="text" value="${edu.degree}" placeholder="Bachelor of Science in Computer Science"
                   onchange="updateEducation(${edu.id}, 'degree', this.value)">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Institution *</label>
                <input type="text" value="${edu.institution}" placeholder="University Name"
                       onchange="updateEducation(${edu.id}, 'institution', this.value)">
            </div>
            <div class="form-group">
                <label>Location</label>
                <input type="text" value="${edu.location}" placeholder="City, Country"
                       onchange="updateEducation(${edu.id}, 'location', this.value)">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Start Date</label>
                <input type="month" value="${edu.startDate}"
                       onchange="updateEducation(${edu.id}, 'startDate', this.value)">
            </div>
            <div class="form-group">
                <label>End Date</label>
                <input type="month" value="${edu.endDate}"
                       onchange="updateEducation(${edu.id}, 'endDate', this.value)">
            </div>
        </div>
        <div class="form-group">
            <label>GPA (optional)</label>
            <input type="text" value="${edu.gpa}" placeholder="3.8/4.0"
                   onchange="updateEducation(${edu.id}, 'gpa', this.value)">
        </div>
        <div class="form-group">
            <label>Additional Info</label>
            <textarea rows="3" placeholder="Honors, relevant coursework, achievements"
                      onchange="updateEducation(${edu.id}, 'description', this.value)">${edu.description}</textarea>
        </div>
        <button class="btn-icon" onclick="removeEducation(${edu.id})" style="color: #e74c3c;">
            <i class="fas fa-trash"></i> Remove
        </button>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid var(--border-color);">
    `;

    container.appendChild(item);
}

window.updateEducation = function(id, field, value) {
    const edu = APP_STATE.resumeData.education.find(e => e.id === id);
    if (edu) {
        edu[field] = value;
        renderResumePreview();
        updateProgress();
        saveToLocalStorage();
    }
};

window.removeEducation = function(id) {
    APP_STATE.resumeData.education = APP_STATE.resumeData.education.filter(e => e.id !== id);
    document.querySelector(`[data-id="${id}"]`)?.remove();
    renderResumePreview();
    updateProgress();
    saveToLocalStorage();
};

// Skills
function addSkill() {
    const id = Date.now();
    const skill = {
        id,
        name: '',
        level: 80
    };

    APP_STATE.resumeData.skills.push(skill);
    renderSkillItem(skill);
    saveToLocalStorage();
}

function renderSkillItem(skill) {
    const container = document.getElementById('skillsList');
    const item = document.createElement('div');
    item.className = 'skill-entry';
    item.setAttribute('data-id', skill.id);

    item.innerHTML = `
        <div class="form-row">
            <div class="form-group" style="flex: 2;">
                <label>Skill Name *</label>
                <input type="text" value="${skill.name}" placeholder="JavaScript, Leadership, etc."
                       onchange="updateSkill(${skill.id}, 'name', this.value)">
            </div>
            <div class="form-group" style="flex: 1;">
                <label>Proficiency: <span id="skill-level-${skill.id}">${skill.level}%</span></label>
                <input type="range" min="0" max="100" value="${skill.level}"
                       oninput="document.getElementById('skill-level-${skill.id}').textContent = this.value + '%'"
                       onchange="updateSkill(${skill.id}, 'level', parseInt(this.value))">
            </div>
        </div>
        <button class="btn-icon" onclick="removeSkill(${skill.id})" style="color: #e74c3c;">
            <i class="fas fa-trash"></i> Remove
        </button>
        <hr style="margin: 15px 0; border: none; border-top: 1px solid var(--border-color);">
    `;

    container.appendChild(item);
}

window.updateSkill = function(id, field, value) {
    const skill = APP_STATE.resumeData.skills.find(s => s.id === id);
    if (skill) {
        skill[field] = value;
        renderResumePreview();
        updateProgress();
        saveToLocalStorage();
    }
};

window.removeSkill = function(id) {
    APP_STATE.resumeData.skills = APP_STATE.resumeData.skills.filter(s => s.id !== id);
    document.querySelector(`[data-id="${id}"]`)?.remove();
    renderResumePreview();
    updateProgress();
    saveToLocalStorage();
};

// Projects
function addProject() {
    const id = Date.now();
    const project = {
        id,
        title: '',
        technologies: '',
        link: '',
        description: ''
    };

    APP_STATE.resumeData.projects.push(project);
    renderProjectItem(project);
    saveToLocalStorage();
}

function renderProjectItem(project) {
    const container = document.getElementById('projectsList');
    const item = document.createElement('div');
    item.className = 'project-entry';
    item.setAttribute('data-id', project.id);

    item.innerHTML = `
        <div class="form-group">
            <label>Project Title *</label>
            <input type="text" value="${project.title}" placeholder="E-Commerce Platform"
                   onchange="updateProject(${project.id}, 'title', this.value)">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Technologies Used</label>
                <input type="text" value="${project.technologies}" placeholder="React, Node.js, MongoDB"
                       onchange="updateProject(${project.id}, 'technologies', this.value)">
            </div>
            <div class="form-group">
                <label>Project Link</label>
                <input type="url" value="${project.link}" placeholder="https://github.com/..."
                       onchange="updateProject(${project.id}, 'link', this.value)">
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea rows="3" placeholder="Describe the project and your role"
                      onchange="updateProject(${project.id}, 'description', this.value)">${project.description}</textarea>
        </div>
        <button class="btn-icon" onclick="removeProject(${project.id})" style="color: #e74c3c;">
            <i class="fas fa-trash"></i> Remove
        </button>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid var(--border-color);">
    `;

    container.appendChild(item);
}

window.updateProject = function(id, field, value) {
    const project = APP_STATE.resumeData.projects.find(p => p.id === id);
    if (project) {
        project[field] = value;
        renderResumePreview();
        updateProgress();
        saveToLocalStorage();
    }
};

window.removeProject = function(id) {
    APP_STATE.resumeData.projects = APP_STATE.resumeData.projects.filter(p => p.id !== id);
    document.querySelector(`[data-id="${id}"]`)?.remove();
    renderResumePreview();
    updateProgress();
    saveToLocalStorage();
};

// Certifications
function addCertification() {
    const id = Date.now();
    const cert = {
        id,
        name: '',
        issuer: '',
        date: '',
        link: ''
    };

    APP_STATE.resumeData.certifications.push(cert);
    renderCertificationItem(cert);
    saveToLocalStorage();
}

function renderCertificationItem(cert) {
    const container = document.getElementById('certificationsList');
    const item = document.createElement('div');
    item.className = 'certification-entry';
    item.setAttribute('data-id', cert.id);

    item.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>Certification Name *</label>
                <input type="text" value="${cert.name}" placeholder="AWS Certified Solutions Architect"
                       onchange="updateCertification(${cert.id}, 'name', this.value)">
            </div>
            <div class="form-group">
                <label>Issuing Organization</label>
                <input type="text" value="${cert.issuer}" placeholder="Amazon Web Services"
                       onchange="updateCertification(${cert.id}, 'issuer', this.value)">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Date Obtained</label>
                <input type="month" value="${cert.date}"
                       onchange="updateCertification(${cert.id}, 'date', this.value)">
            </div>
            <div class="form-group">
                <label>Credential Link</label>
                <input type="url" value="${cert.link}" placeholder="https://..."
                       onchange="updateCertification(${cert.id}, 'link', this.value)">
            </div>
        </div>
        <button class="btn-icon" onclick="removeCertification(${cert.id})" style="color: #e74c3c;">
            <i class="fas fa-trash"></i> Remove
        </button>
        <hr style="margin: 15px 0; border: none; border-top: 1px solid var(--border-color);">
    `;

    container.appendChild(item);
}

window.updateCertification = function(id, field, value) {
    const cert = APP_STATE.resumeData.certifications.find(c => c.id === id);
    if (cert) {
        cert[field] = value;
        renderResumePreview();
        updateProgress();
        saveToLocalStorage();
    }
};

window.removeCertification = function(id) {
    APP_STATE.resumeData.certifications = APP_STATE.resumeData.certifications.filter(c => c.id !== id);
    document.querySelector(`[data-id="${id}"]`)?.remove();
    renderResumePreview();
    updateProgress();
    saveToLocalStorage();
};

// Languages
function addLanguage() {
    const id = Date.now();
    const lang = {
        id,
        name: '',
        proficiency: 'Native'
    };

    APP_STATE.resumeData.languages.push(lang);
    renderLanguageItem(lang);
    saveToLocalStorage();
}

function renderLanguageItem(lang) {
    const container = document.getElementById('languagesList');
    const item = document.createElement('div');
    item.className = 'language-entry';
    item.setAttribute('data-id', lang.id);

    item.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>Language *</label>
                <input type="text" value="${lang.name}" placeholder="English"
                       onchange="updateLanguage(${lang.id}, 'name', this.value)">
            </div>
            <div class="form-group">
                <label>Proficiency</label>
                <select onchange="updateLanguage(${lang.id}, 'proficiency', this.value)">
                    <option value="Native" ${lang.proficiency === 'Native' ? 'selected' : ''}>Native</option>
                    <option value="Fluent" ${lang.proficiency === 'Fluent' ? 'selected' : ''}>Fluent</option>
                    <option value="Professional" ${lang.proficiency === 'Professional' ? 'selected' : ''}>Professional</option>
                    <option value="Intermediate" ${lang.proficiency === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                    <option value="Basic" ${lang.proficiency === 'Basic' ? 'selected' : ''}>Basic</option>
                </select>
            </div>
        </div>
        <button class="btn-icon" onclick="removeLanguage(${lang.id})" style="color: #e74c3c;">
            <i class="fas fa-trash"></i> Remove
        </button>
        <hr style="margin: 15px 0; border: none; border-top: 1px solid var(--border-color);">
    `;

    container.appendChild(item);
}

window.updateLanguage = function(id, field, value) {
    const lang = APP_STATE.resumeData.languages.find(l => l.id === id);
    if (lang) {
        lang[field] = value;
        renderResumePreview();
        updateProgress();
        saveToLocalStorage();
    }
};

window.removeLanguage = function(id) {
    APP_STATE.resumeData.languages = APP_STATE.resumeData.languages.filter(l => l.id !== id);
    document.querySelector(`[data-id="${id}"]`)?.remove();
    renderResumePreview();
    updateProgress();
    saveToLocalStorage();
};

// ============================================
// RESUME PREVIEW RENDERING
// ============================================
function renderResumePreview() {
    const preview = document.getElementById('resumePreview');
    if (!preview) return;

    const templateFunction = window[`renderTemplate_${APP_STATE.currentTemplate}`];
    if (templateFunction) {
        preview.innerHTML = templateFunction();
        applyCustomizations();
        updateResumeScore();
    }
}

function applyCustomizations() {
    const preview = document.getElementById('resumePreview');
    if (!preview) return;

    preview.style.setProperty('--accent-color', APP_STATE.accentColor);
    preview.style.fontFamily = APP_STATE.fontFamily;
    preview.style.fontSize = `${APP_STATE.fontSize}px`;
    preview.style.transform = `scale(${APP_STATE.zoomLevel / 100})`;
}

// ============================================
// CUSTOMIZATION CONTROLS
// ============================================
function updateAccentColor(color) {
    APP_STATE.accentColor = color;
    renderResumePreview();
    saveToLocalStorage();
}

function updateFontFamily(font) {
    APP_STATE.fontFamily = font;
    renderResumePreview();
    saveToLocalStorage();
}

function updateFontSize(size) {
    APP_STATE.fontSize = parseInt(size);
    document.getElementById('fontSizeValue').textContent = `${size}px`;
    renderResumePreview();
    saveToLocalStorage();
}

function updateSpacing(spacing) {
    APP_STATE.spacing = parseFloat(spacing);
    const labels = { 0.8: 'Compact', 1: 'Normal', 1.2: 'Relaxed', 1.5: 'Spacious' };
    document.getElementById('spacingValue').textContent = labels[spacing] || 'Normal';
    renderResumePreview();
    saveToLocalStorage();
}

function adjustZoom(delta) {
    APP_STATE.zoomLevel = Math.max(50, Math.min(150, APP_STATE.zoomLevel + delta));
    document.getElementById('zoomLevel').textContent = `${APP_STATE.zoomLevel}%`;
    applyCustomizations();
}

function toggleCustomization() {
    const panel = document.getElementById('customizationPanel');
    panel?.classList.toggle('active');
}

function closeCustomization() {
    document.getElementById('customizationPanel')?.classList.remove('active');
}

function toggleSectionVisibility(section, visible) {
    APP_STATE.visibleSections[section] = visible;
    renderResumePreview();
    saveToLocalStorage();
}

// ============================================
// PROGRESS & SCORING
// ============================================
function updateProgress() {
    const data = APP_STATE.resumeData;
    let completedFields = 0;
    let totalFields = 0;

    // Personal Info (8 fields, 6 required)
    totalFields += 6;
    if (data.personal.fullName) completedFields++;
    if (data.personal.jobTitle) completedFields++;
    if (data.personal.email) completedFields++;
    if (data.personal.phone) completedFields++;
    if (data.personal.location) completedFields++;
    if (data.personal.linkedin || data.personal.website) completedFields++;

    // Summary
    totalFields += 1;
    if (data.summary && data.summary.length > 50) completedFields++;

    // Experience
    totalFields += 1;
    if (data.experience.length > 0) completedFields++;

    // Education
    totalFields += 1;
    if (data.education.length > 0) completedFields++;

    // Skills
    totalFields += 1;
    if (data.skills.length > 0) completedFields++;

    const percentage = Math.round((completedFields / totalFields) * 100);

    document.getElementById('progressFill').style.width = `${percentage}%`;
    document.getElementById('progressText').textContent = `${percentage}% Complete`;

    // Check for achievement
    if (percentage === 100 && !APP_STATE.achievements.allSectionsFilled) {
        APP_STATE.achievements.allSectionsFilled = true;
        showAchievement('Resume Master!', 'You completed all sections!');
        saveToLocalStorage();
    }
}

function updateResumeScore() {
    const data = APP_STATE.resumeData;
    let score = 0;
    let details = [];

    // Personal Info (20 points)
    if (data.personal.fullName && data.personal.jobTitle && data.personal.email && data.personal.phone) {
        score += 20;
        details.push('✓ Contact information complete');
    } else {
        details.push('✗ Complete contact information');
    }

    // Summary (15 points)
    if (data.summary && data.summary.length >= 100) {
        score += 15;
        details.push('✓ Professional summary added');
    } else {
        details.push('✗ Add a detailed summary (100+ chars)');
    }

    // Experience (25 points)
    if (data.experience.length >= 2) {
        score += 25;
        details.push('✓ Multiple work experiences');
    } else if (data.experience.length === 1) {
        score += 15;
        details.push('△ Add more work experience');
    } else {
        details.push('✗ Add work experience');
    }

    // Education (15 points)
    if (data.education.length > 0) {
        score += 15;
        details.push('✓ Education added');
    } else {
        details.push('✗ Add education');
    }

    // Skills (15 points)
    if (data.skills.length >= 5) {
        score += 15;
        details.push('✓ Skills showcased');
    } else if (data.skills.length > 0) {
        score += 8;
        details.push('△ Add more skills (5+ recommended)');
    } else {
        details.push('✗ Add skills');
    }

    // Projects (10 points - bonus)
    if (data.projects.length > 0) {
        score += 10;
        details.push('✓ Projects included');
    }

    // Update display
    document.getElementById('scoreValue').textContent = score;
    document.getElementById('scoreDetails').innerHTML = details.map(d => `<div>${d}</div>`).join('');

    // Update circle gradient
    const circle = document.getElementById('scoreCircle');
    if (circle) {
        const percentage = score;
        circle.style.background = `conic-gradient(var(--primary-color) ${percentage}%, var(--bg-tertiary) 0%)`;
    }
}

function updateCharCounter(elementId, count) {
    document.getElementById(elementId).textContent = count;
}

// ============================================
// SECTION TOGGLE
// ============================================
function toggleSection(header) {
    const section = header.parentElement;
    section.classList.toggle('active');
}

// ============================================
// STORAGE
// ============================================
function saveToLocalStorage() {
    localStorage.setItem('resumeData', JSON.stringify(APP_STATE.resumeData));
    localStorage.setItem('appState', JSON.stringify({
        currentTemplate: APP_STATE.currentTemplate,
        accentColor: APP_STATE.accentColor,
        fontFamily: APP_STATE.fontFamily,
        fontSize: APP_STATE.fontSize,
        spacing: APP_STATE.spacing,
        visibleSections: APP_STATE.visibleSections,
        achievements: APP_STATE.achievements,
        stats: APP_STATE.stats
    }));

    APP_STATE.stats.lastEdited = new Date().toISOString();
}

function loadSavedData() {
    const savedResume = localStorage.getItem('resumeData');
    const savedState = localStorage.getItem('appState');

    if (savedResume) {
        APP_STATE.resumeData = JSON.parse(savedResume);
        populateFormFields();
    }

    if (savedState) {
        const state = JSON.parse(savedState);
        APP_STATE.currentTemplate = state.currentTemplate || 'modern';
        APP_STATE.accentColor = state.accentColor || '#3498db';
        APP_STATE.fontFamily = state.fontFamily || 'Inter';
        APP_STATE.fontSize = state.fontSize || 14;
        APP_STATE.spacing = state.spacing || 1;
        APP_STATE.visibleSections = state.visibleSections || APP_STATE.visibleSections;
        APP_STATE.achievements = state.achievements || APP_STATE.achievements;
        APP_STATE.stats = state.stats || APP_STATE.stats;

        // Apply loaded state
        document.getElementById('accentColor').value = APP_STATE.accentColor;
        document.getElementById('fontFamily').value = APP_STATE.fontFamily;
        document.getElementById('fontSize').value = APP_STATE.fontSize;
        document.getElementById('fontSizeValue').textContent = `${APP_STATE.fontSize}px`;
        document.getElementById('spacing').value = APP_STATE.spacing;
    }
}

function populateFormFields() {
    const data = APP_STATE.resumeData;

    // Personal
    document.getElementById('fullName').value = data.personal.fullName || '';
    document.getElementById('jobTitle').value = data.personal.jobTitle || '';
    document.getElementById('email').value = data.personal.email || '';
    document.getElementById('phone').value = data.personal.phone || '';
    document.getElementById('location').value = data.personal.location || '';
    document.getElementById('website').value = data.personal.website || '';
    document.getElementById('linkedin').value = data.personal.linkedin || '';
    document.getElementById('github').value = data.personal.github || '';

    // Summary
    document.getElementById('summary').value = data.summary || '';
    updateCharCounter('summaryCounter', (data.summary || '').length);

    // Interests
    document.getElementById('interests').value = data.interests || '';

    // Dynamic sections
    data.experience.forEach(exp => renderExperienceItem(exp));
    data.education.forEach(edu => renderEducationItem(edu));
    data.skills.forEach(skill => renderSkillItem(skill));
    data.projects.forEach(project => renderProjectItem(project));
    data.certifications.forEach(cert => renderCertificationItem(cert));
    data.languages.forEach(lang => renderLanguageItem(lang));

    renderResumePreview();
}

function setupAutoSave() {
    // Auto-save every 30 seconds
    setInterval(() => {
        saveToLocalStorage();
    }, 30000);
}

// ============================================
// SAMPLE DATA
// ============================================
function loadSampleData() {
    APP_STATE.resumeData = {
        personal: {
            fullName: 'John Doe',
            jobTitle: 'Senior Software Engineer',
            email: 'john.doe@email.com',
            phone: '+1 (555) 123-4567',
            location: 'San Francisco, CA',
            website: 'https://johndoe.dev',
            linkedin: 'https://linkedin.com/in/johndoe',
            github: 'https://github.com/johndoe',
            photo: null
        },
        summary: 'Experienced software engineer with 5+ years of expertise in full-stack development. Proven track record of building scalable web applications and leading cross-functional teams. Passionate about clean code, user experience, and continuous learning.',
        experience: [
            {
                id: 1,
                title: 'Senior Software Engineer',
                company: 'Tech Corp Inc.',
                location: 'San Francisco, CA',
                startDate: '2020-01',
                endDate: '',
                current: true,
                description: '• Led development of microservices architecture serving 1M+ users\n• Reduced API response time by 40% through optimization\n• Mentored team of 5 junior developers\n• Implemented CI/CD pipeline reducing deployment time by 60%'
            },
            {
                id: 2,
                title: 'Software Engineer',
                company: 'StartupXYZ',
                location: 'San Francisco, CA',
                startDate: '2018-06',
                endDate: '2019-12',
                current: false,
                description: '• Developed React-based dashboard used by 50K+ customers\n• Integrated third-party payment systems\n• Improved test coverage from 40% to 85%'
            }
        ],
        education: [
            {
                id: 1,
                degree: 'Bachelor of Science in Computer Science',
                institution: 'Stanford University',
                location: 'Stanford, CA',
                startDate: '2014-09',
                endDate: '2018-05',
                gpa: '3.8/4.0',
                description: 'Dean\'s List, Computer Science Society President'
            }
        ],
        skills: [
            { id: 1, name: 'JavaScript/TypeScript', level: 95 },
            { id: 2, name: 'React & Node.js', level: 90 },
            { id: 3, name: 'Python', level: 85 },
            { id: 4, name: 'AWS & Docker', level: 80 },
            { id: 5, name: 'Team Leadership', level: 85 }
        ],
        projects: [
            {
                id: 1,
                title: 'E-Commerce Platform',
                technologies: 'React, Node.js, MongoDB, Stripe',
                link: 'https://github.com/johndoe/ecommerce',
                description: 'Full-stack e-commerce platform with real-time inventory management and payment processing. Handles 10K+ daily transactions.'
            }
        ],
        certifications: [
            {
                id: 1,
                name: 'AWS Certified Solutions Architect',
                issuer: 'Amazon Web Services',
                date: '2022-03',
                link: 'https://aws.amazon.com/certification/'
            }
        ],
        languages: [
            { id: 1, name: 'English', proficiency: 'Native' },
            { id: 2, name: 'Spanish', proficiency: 'Professional' }
        ],
        interests: 'Open Source Contributing, Photography, Hiking, Tech Blogging'
    };

    saveToLocalStorage();
}

// ============================================
// DOWNLOAD & EXPORT
// ============================================
function openDownloadModal() {
    const modal = document.getElementById('downloadModal');
    modal.classList.add('active');

    // Show interstitial ad and start countdown
    showInterstitialAd();

    trackEvent('download_initiated');
}

function closeDownloadModal() {
    document.getElementById('downloadModal')?.classList.remove('active');
}

function showInterstitialAd() {
    let countdown = 5;
    const timerElement = document.getElementById('adTimer');
    const adContainer = document.getElementById('downloadAdContainer');
    const optionsContainer = document.getElementById('downloadOptions');

    const timer = setInterval(() => {
        countdown--;
        timerElement.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(timer);
            adContainer.style.display = 'none';
            optionsContainer.style.display = 'block';
        }
    }, 1000);
}

// Placeholder functions (actual implementation in pdf-generator.js)
function downloadPDF() {
    if (window.generatePDF) {
        window.generatePDF();
        incrementDownloadCount();
        closeDownloadModal();
        showAchievement('Downloaded!', 'Your resume has been downloaded successfully');
    }
}

function downloadPNG() {
    if (window.generatePNG) {
        window.generatePNG();
        incrementDownloadCount();
        closeDownloadModal();
    }
}

function downloadJSON() {
    const dataStr = JSON.stringify(APP_STATE.resumeData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `resume_${Date.now()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    closeDownloadModal();
}

function incrementDownloadCount() {
    APP_STATE.stats.downloadsCount++;

    if (APP_STATE.stats.downloadsCount === 1 && !APP_STATE.achievements.firstDownload) {
        APP_STATE.achievements.firstDownload = true;
        showAchievement('First Download!', 'You downloaded your first resume');
    }

    if (APP_STATE.stats.downloadsCount === 5 && !APP_STATE.achievements.downloads5) {
        APP_STATE.achievements.downloads5 = true;
        showAchievement('Power User!', 'You\'ve downloaded 5 resumes');
    }

    saveToLocalStorage();
    trackEvent('download_complete', { count: APP_STATE.stats.downloadsCount });
}

// ============================================
// ACHIEVEMENTS & NOTIFICATIONS
// ============================================
function showAchievement(title, message) {
    const toast = document.getElementById('achievementToast');
    document.getElementById('achievementTitle').textContent = title;
    document.getElementById('achievementMessage').textContent = message;

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// ============================================
// SOCIAL SHARING
// ============================================
function shareOnWhatsApp() {
    const text = 'Check out this amazing free resume builder! Create professional resumes in minutes.';
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    trackEvent('share', { platform: 'whatsapp' });
}

function shareOnTwitter() {
    const text = 'Just created my professional resume with this amazing free builder!';
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    trackEvent('share', { platform: 'twitter' });
}

function shareOnFacebook() {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    trackEvent('share', { platform: 'facebook' });
}

function shareOnLinkedIn() {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    trackEvent('share', { platform: 'linkedin' });
}

// ============================================
// AD MANAGEMENT
// ============================================
function checkAdBlocker() {
    // Simple ad blocker detection
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    document.body.appendChild(testAd);

    window.setTimeout(() => {
        if (testAd.offsetHeight === 0) {
            // Ad blocker detected
            document.getElementById('ad-blocker-notice').style.display = 'flex';
            trackEvent('ad_blocker_detected');
        }
        testAd.remove();
    }, 100);
}

function setupAdRefresh() {
    // Refresh ads every 30 seconds when user is active
    let lastActivity = Date.now();

    document.addEventListener('mousemove', () => {
        lastActivity = Date.now();
    });

    setInterval(() => {
        if (Date.now() - lastActivity < 60000) {
            // User is active, refresh ads
            try {
                if (window.adsbygoogle) {
                    // Trigger ad refresh
                    console.log('Refreshing ads...');
                }
            } catch (e) {
                console.error('Ad refresh error:', e);
            }
        }
    }, 30000);
}

// ============================================
// ANALYTICS
// ============================================
function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    console.log('Event tracked:', eventName, parameters);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function formatDate(dateString) {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

console.log('Resume Builder App Loaded Successfully');
