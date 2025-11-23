/* ============================================
   RESUME TEMPLATES - RENDERING FUNCTIONS
   6 Professional Template Styles
   ============================================ */

// ============================================
// TEMPLATE 1: MODERN MINIMAL
// ============================================
function renderTemplate_modern() {
    const data = APP_STATE.resumeData;
    const visible = APP_STATE.visibleSections;

    return `
        <div class="resume-template template-modern">
            <!-- Sidebar -->
            <div class="resume-sidebar">
                ${data.personal.photo ? `<img src="${data.personal.photo}" class="profile-photo" alt="Profile">` : ''}
                <div class="resume-header">
                    <h1 class="resume-name">${data.personal.fullName || 'Your Name'}</h1>
                    <p class="resume-title">${data.personal.jobTitle || 'Your Job Title'}</p>
                </div>

                <!-- Contact -->
                <div class="contact-section">
                    <h3 class="section-title">Contact</h3>
                    ${data.personal.email ? `<div class="contact-item"><i class="fas fa-envelope"></i><span>${data.personal.email}</span></div>` : ''}
                    ${data.personal.phone ? `<div class="contact-item"><i class="fas fa-phone"></i><span>${data.personal.phone}</span></div>` : ''}
                    ${data.personal.location ? `<div class="contact-item"><i class="fas fa-map-marker-alt"></i><span>${data.personal.location}</span></div>` : ''}
                    ${data.personal.website ? `<div class="contact-item"><i class="fas fa-globe"></i><span>${data.personal.website}</span></div>` : ''}
                    ${data.personal.linkedin ? `<div class="contact-item"><i class="fab fa-linkedin"></i><span>${data.personal.linkedin.replace('https://', '')}</span></div>` : ''}
                    ${data.personal.github ? `<div class="contact-item"><i class="fab fa-github"></i><span>${data.personal.github.replace('https://', '')}</span></div>` : ''}
                </div>

                <!-- Skills -->
                ${visible.skills && data.skills.length > 0 ? `
                <div class="skills-section">
                    <h3 class="section-title">Skills</h3>
                    ${data.skills.map(skill => `
                        <div class="skill-item">
                            <div class="skill-name">${skill.name}<span>${skill.level}%</span></div>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: ${skill.level}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                <!-- Languages -->
                ${visible.languages && data.languages.length > 0 ? `
                <div class="languages-section">
                    <h3 class="section-title">Languages</h3>
                    ${data.languages.map(lang => `
                        <div class="language-item">
                            <span>${lang.name}</span>
                            <span class="language-level">${lang.proficiency}</span>
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                <!-- Interests -->
                ${visible.interests && data.interests ? `
                <div class="interests-section">
                    <h3 class="section-title">Interests</h3>
                    <div class="interests-list">
                        ${data.interests.split(',').map(interest => `
                            <span class="interest-tag">${interest.trim()}</span>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>

            <!-- Main Content -->
            <div class="resume-main">
                <!-- Summary -->
                ${visible.summary && data.summary ? `
                <section class="resume-section">
                    <h2 class="section-title">Professional Summary</h2>
                    <p class="summary-text">${data.summary}</p>
                </section>
                ` : ''}

                <!-- Experience -->
                ${visible.experience && data.experience.length > 0 ? `
                <section class="resume-section">
                    <h2 class="section-title">Work Experience</h2>
                    ${data.experience.map(exp => `
                        <div class="experience-item">
                            <h4 class="item-title">${exp.title}</h4>
                            <p class="item-subtitle">${exp.company}${exp.location ? `, ${exp.location}` : ''}</p>
                            <p class="item-date">${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                            ${exp.description ? `<div class="item-description">${formatDescription(exp.description)}</div>` : ''}
                        </div>
                    `).join('')}
                </section>
                ` : ''}

                <!-- Projects -->
                ${visible.projects && data.projects.length > 0 ? `
                <section class="resume-section">
                    <h2 class="section-title">Projects</h2>
                    ${data.projects.map(project => `
                        <div class="project-item">
                            <h4 class="item-title">${project.title}</h4>
                            ${project.technologies ? `<p class="item-subtitle">${project.technologies}</p>` : ''}
                            ${project.description ? `<div class="item-description">${formatDescription(project.description)}</div>` : ''}
                            ${project.link ? `<p class="item-description"><i class="fas fa-link"></i> ${project.link}</p>` : ''}
                        </div>
                    `).join('')}
                </section>
                ` : ''}

                <!-- Education -->
                ${visible.education && data.education.length > 0 ? `
                <section class="resume-section">
                    <h2 class="section-title">Education</h2>
                    ${data.education.map(edu => `
                        <div class="education-item">
                            <h4 class="item-title">${edu.degree}</h4>
                            <p class="item-subtitle">${edu.institution}${edu.location ? `, ${edu.location}` : ''}</p>
                            <p class="item-date">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</p>
                            ${edu.gpa ? `<p class="item-description">GPA: ${edu.gpa}</p>` : ''}
                            ${edu.description ? `<div class="item-description">${formatDescription(edu.description)}</div>` : ''}
                        </div>
                    `).join('')}
                </section>
                ` : ''}

                <!-- Certifications -->
                ${visible.certifications && data.certifications.length > 0 ? `
                <section class="resume-section">
                    <h2 class="section-title">Certifications</h2>
                    ${data.certifications.map(cert => `
                        <div class="certification-item">
                            <h4 class="item-title">${cert.name}</h4>
                            <p class="item-subtitle">${cert.issuer}${cert.date ? ` - ${formatDate(cert.date)}` : ''}</p>
                        </div>
                    `).join('')}
                </section>
                ` : ''}
            </div>
        </div>
    `;
}

// ============================================
// TEMPLATE 2: ATS-FRIENDLY
// ============================================
function renderTemplate_ats() {
    const data = APP_STATE.resumeData;
    const visible = APP_STATE.visibleSections;

    return `
        <div class="resume-template template-ats">
            <!-- Header -->
            <header class="resume-header">
                <h1 class="resume-name">${data.personal.fullName || 'Your Name'}</h1>
                <p class="resume-title">${data.personal.jobTitle || 'Your Job Title'}</p>
                <div class="contact-info">
                    ${data.personal.email ? `<div class="contact-item"><i class="fas fa-envelope"></i>${data.personal.email}</div>` : ''}
                    ${data.personal.phone ? `<div class="contact-item"><i class="fas fa-phone"></i>${data.personal.phone}</div>` : ''}
                    ${data.personal.location ? `<div class="contact-item"><i class="fas fa-map-marker-alt"></i>${data.personal.location}</div>` : ''}
                    ${data.personal.linkedin ? `<div class="contact-item"><i class="fab fa-linkedin"></i>LinkedIn</div>` : ''}
                    ${data.personal.github ? `<div class="contact-item"><i class="fab fa-github"></i>GitHub</div>` : ''}
                </div>
            </header>

            <!-- Summary -->
            ${visible.summary && data.summary ? `
            <section>
                <h2 class="section-title">Professional Summary</h2>
                <p class="summary-text">${data.summary}</p>
            </section>
            ` : ''}

            <!-- Experience -->
            ${visible.experience && data.experience.length > 0 ? `
            <section>
                <h2 class="section-title">Professional Experience</h2>
                ${data.experience.map(exp => `
                    <div class="experience-item">
                        <div class="item-header">
                            <h3 class="item-title">${exp.title}</h3>
                            <span class="item-date">${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                        </div>
                        <p class="item-subtitle">${exp.company}${exp.location ? `, ${exp.location}` : ''}</p>
                        ${exp.description ? `<div class="item-description">${formatDescription(exp.description)}</div>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Education -->
            ${visible.education && data.education.length > 0 ? `
            <section>
                <h2 class="section-title">Education</h2>
                ${data.education.map(edu => `
                    <div class="education-item">
                        <div class="item-header">
                            <h3 class="item-title">${edu.degree}</h3>
                            <span class="item-date">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span>
                        </div>
                        <p class="item-subtitle">${edu.institution}${edu.location ? `, ${edu.location}` : ''}</p>
                        ${edu.gpa ? `<p class="item-description">GPA: ${edu.gpa}</p>` : ''}
                        ${edu.description ? `<div class="item-description">${formatDescription(edu.description)}</div>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Skills -->
            ${visible.skills && data.skills.length > 0 ? `
            <section>
                <h2 class="section-title">Skills</h2>
                <div class="skills-grid">
                    ${data.skills.map(skill => `
                        <div class="skill-item">${skill.name}</div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Projects -->
            ${visible.projects && data.projects.length > 0 ? `
            <section>
                <h2 class="section-title">Projects</h2>
                ${data.projects.map(project => `
                    <div class="project-item">
                        <h3 class="item-title">${project.title}</h3>
                        ${project.technologies ? `<p class="item-subtitle">Technologies: ${project.technologies}</p>` : ''}
                        ${project.description ? `<div class="item-description">${formatDescription(project.description)}</div>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Certifications -->
            ${visible.certifications && data.certifications.length > 0 ? `
            <section>
                <h2 class="section-title">Certifications</h2>
                ${data.certifications.map(cert => `
                    <div class="certification-item">
                        <strong>${cert.name}</strong> - ${cert.issuer}${cert.date ? ` (${formatDate(cert.date)})` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Languages -->
            ${visible.languages && data.languages.length > 0 ? `
            <section>
                <h2 class="section-title">Languages</h2>
                <div class="languages-list">
                    ${data.languages.map(lang => `
                        <span class="language-item">${lang.name} (${lang.proficiency})</span>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Interests -->
            ${visible.interests && data.interests ? `
            <section>
                <h2 class="section-title">Interests</h2>
                <div class="interests-list">
                    ${data.interests.split(',').map(interest => `
                        <span class="interest-tag">${interest.trim()}</span>
                    `).join('')}
                </div>
            </section>
            ` : ''}
        </div>
    `;
}

// ============================================
// TEMPLATE 3: CREATIVE DESIGNER
// ============================================
function renderTemplate_creative() {
    const data = APP_STATE.resumeData;
    const visible = APP_STATE.visibleSections;

    return `
        <div class="resume-template template-creative">
            <!-- Header -->
            <header class="resume-header">
                ${data.personal.photo ? `<img src="${data.personal.photo}" class="profile-photo" alt="Profile">` : ''}
                <h1 class="resume-name">${data.personal.fullName || 'Your Name'}</h1>
                <p class="resume-title">${data.personal.jobTitle || 'Your Job Title'}</p>
                <div class="contact-info">
                    ${data.personal.email ? `<div class="contact-item"><i class="fas fa-envelope"></i>${data.personal.email}</div>` : ''}
                    ${data.personal.phone ? `<div class="contact-item"><i class="fas fa-phone"></i>${data.personal.phone}</div>` : ''}
                    ${data.personal.location ? `<div class="contact-item"><i class="fas fa-map-marker-alt"></i>${data.personal.location}</div>` : ''}
                    ${data.personal.website ? `<div class="contact-item"><i class="fas fa-globe"></i>${data.personal.website}</div>` : ''}
                </div>
            </header>

            <div class="resume-body">
                <!-- Summary -->
                ${visible.summary && data.summary ? `
                <section>
                    <h2 class="section-title">About Me</h2>
                    <p class="summary-text">${data.summary}</p>
                </section>
                ` : ''}

                <!-- Experience -->
                ${visible.experience && data.experience.length > 0 ? `
                <section>
                    <h2 class="section-title">Experience</h2>
                    ${data.experience.map(exp => `
                        <div class="experience-item">
                            <h3 class="item-title">${exp.title}</h3>
                            <p class="item-subtitle">${exp.company}</p>
                            <span class="item-date">${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                            ${exp.description ? `<div class="item-description">${formatDescription(exp.description)}</div>` : ''}
                        </div>
                    `).join('')}
                </section>
                ` : ''}

                <!-- Skills -->
                ${visible.skills && data.skills.length > 0 ? `
                <section>
                    <h2 class="section-title">Skills</h2>
                    <div class="skills-container">
                        ${data.skills.map(skill => `
                            <div class="skill-item">
                                <div class="skill-name">${skill.name}</div>
                                <div class="skill-bar">
                                    <div class="skill-fill" style="width: ${skill.level}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
                ` : ''}

                <!-- Projects -->
                ${visible.projects && data.projects.length > 0 ? `
                <section>
                    <h2 class="section-title">Portfolio Projects</h2>
                    ${data.projects.map(project => `
                        <div class="project-item">
                            <h3 class="item-title">${project.title}</h3>
                            ${project.technologies ? `<p class="item-subtitle">${project.technologies}</p>` : ''}
                            ${project.description ? `<div class="item-description">${formatDescription(project.description)}</div>` : ''}
                        </div>
                    `).join('')}
                </section>
                ` : ''}

                <!-- Education -->
                ${visible.education && data.education.length > 0 ? `
                <section>
                    <h2 class="section-title">Education</h2>
                    ${data.education.map(edu => `
                        <div class="education-item">
                            <h3 class="item-title">${edu.degree}</h3>
                            <p class="item-subtitle">${edu.institution}</p>
                            <span class="item-date">${formatDate(edu.endDate)}</span>
                            ${edu.description ? `<div class="item-description">${formatDescription(edu.description)}</div>` : ''}
                        </div>
                    `).join('')}
                </section>
                ` : ''}

                <!-- Interests -->
                ${visible.interests && data.interests ? `
                <section>
                    <h2 class="section-title">Interests</h2>
                    <div class="interests-list">
                        ${data.interests.split(',').map(interest => `
                            <span class="interest-tag">${interest.trim()}</span>
                        `).join('')}
                    </div>
                </section>
                ` : ''}
            </div>
        </div>
    `;
}

// ============================================
// TEMPLATE 4: PROFESSIONAL CORPORATE
// ============================================
function renderTemplate_professional() {
    const data = APP_STATE.resumeData;
    const visible = APP_STATE.visibleSections;

    return `
        <div class="resume-template template-professional">
            <!-- Header -->
            <header class="resume-header">
                <h1 class="resume-name">${data.personal.fullName || 'Your Name'}</h1>
                <p class="resume-title">${data.personal.jobTitle || 'Your Job Title'}</p>
                <div class="contact-info">
                    ${data.personal.email ? `<div class="contact-item"><i class="fas fa-envelope"></i>${data.personal.email}</div>` : ''}
                    ${data.personal.phone ? `<div class="contact-item"><i class="fas fa-phone"></i>${data.personal.phone}</div>` : ''}
                    ${data.personal.location ? `<div class="contact-item"><i class="fas fa-map-marker-alt"></i>${data.personal.location}</div>` : ''}
                    ${data.personal.linkedin ? `<div class="contact-item"><i class="fab fa-linkedin"></i>LinkedIn Profile</div>` : ''}
                </div>
            </header>

            <!-- Summary -->
            ${visible.summary && data.summary ? `
            <section>
                <h2 class="section-title">Professional Summary</h2>
                <p class="summary-text">${data.summary}</p>
            </section>
            ` : ''}

            <!-- Experience -->
            ${visible.experience && data.experience.length > 0 ? `
            <section>
                <h2 class="section-title">Professional Experience</h2>
                ${data.experience.map(exp => `
                    <div class="experience-item">
                        <div class="item-header">
                            <h3 class="item-title">${exp.title}</h3>
                            <span class="item-date">${formatDate(exp.startDate)} – ${exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                        </div>
                        <p class="item-subtitle">${exp.company}${exp.location ? ` | ${exp.location}` : ''}</p>
                        ${exp.description ? `<div class="item-description">${formatDescription(exp.description)}</div>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Education -->
            ${visible.education && data.education.length > 0 ? `
            <section>
                <h2 class="section-title">Education</h2>
                ${data.education.map(edu => `
                    <div class="education-item">
                        <div class="item-header">
                            <h3 class="item-title">${edu.degree}</h3>
                            <span class="item-date">${formatDate(edu.endDate)}</span>
                        </div>
                        <p class="item-subtitle">${edu.institution}${edu.location ? ` | ${edu.location}` : ''}</p>
                        ${edu.gpa ? `<p class="item-description">Grade Point Average: ${edu.gpa}</p>` : ''}
                        ${edu.description ? `<div class="item-description">${formatDescription(edu.description)}</div>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Skills -->
            ${visible.skills && data.skills.length > 0 ? `
            <section>
                <h2 class="section-title">Core Competencies</h2>
                <div class="skills-grid">
                    ${data.skills.map(skill => `
                        <div class="skill-item">${skill.name}</div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Certifications -->
            ${visible.certifications && data.certifications.length > 0 ? `
            <section>
                <h2 class="section-title">Professional Certifications</h2>
                ${data.certifications.map(cert => `
                    <div class="certification-item">
                        <strong>${cert.name}</strong>, ${cert.issuer}${cert.date ? ` (${formatDate(cert.date)})` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Languages -->
            ${visible.languages && data.languages.length > 0 ? `
            <section>
                <h2 class="section-title">Languages</h2>
                <div class="languages-grid">
                    ${data.languages.map(lang => `
                        <div class="language-item">
                            <span>${lang.name}</span>
                            <span>${lang.proficiency}</span>
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Interests -->
            ${visible.interests && data.interests ? `
            <section>
                <h2 class="section-title">Professional Interests</h2>
                <p class="interests-list">${data.interests}</p>
            </section>
            ` : ''}
        </div>
    `;
}

// ============================================
// TEMPLATE 5: TECH DEVELOPER
// ============================================
function renderTemplate_tech() {
    const data = APP_STATE.resumeData;
    const visible = APP_STATE.visibleSections;

    return `
        <div class="resume-template template-tech">
            <!-- Header -->
            <header class="resume-header">
                <h1 class="resume-name">${data.personal.fullName || 'Your Name'}</h1>
                <p class="resume-title">${data.personal.jobTitle || 'Your Job Title'}</p>
                <div class="contact-info">
                    ${data.personal.email ? `<div class="contact-item"><i class="fas fa-envelope"></i>${data.personal.email}</div>` : ''}
                    ${data.personal.github ? `<div class="contact-item"><i class="fab fa-github"></i>${data.personal.github}</div>` : ''}
                    ${data.personal.linkedin ? `<div class="contact-item"><i class="fab fa-linkedin"></i>LinkedIn</div>` : ''}
                    ${data.personal.website ? `<div class="contact-item"><i class="fas fa-globe"></i>${data.personal.website}</div>` : ''}
                </div>
            </header>

            <div class="resume-body">
                <!-- Summary -->
                ${visible.summary && data.summary ? `
                <section>
                    <h2 class="section-title">Summary</h2>
                    <p class="summary-text">${data.summary}</p>
                </section>
                ` : ''}

                <!-- Skills -->
                ${visible.skills && data.skills.length > 0 ? `
                <section>
                    <h2 class="section-title">Technical Skills</h2>
                    <div class="skills-container">
                        ${data.skills.map(skill => `
                            <div class="skill-item">${skill.name}</div>
                        `).join('')}
                    </div>
                </section>
                ` : ''}

                <!-- Experience -->
                ${visible.experience && data.experience.length > 0 ? `
                <section>
                    <h2 class="section-title">Work Experience</h2>
                    ${data.experience.map(exp => `
                        <div class="experience-item">
                            <h3 class="item-title">${exp.title}</h3>
                            <p class="item-subtitle">${exp.company}</p>
                            <p class="item-date">${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                            ${exp.description ? `<div class="item-description">${formatDescription(exp.description)}</div>` : ''}
                        </div>
                    `).join('')}
                </section>
                ` : ''}

                <!-- Projects -->
                ${visible.projects && data.projects.length > 0 ? `
                <section>
                    <h2 class="section-title">Projects</h2>
                    ${data.projects.map(project => `
                        <div class="project-item">
                            <h3 class="item-title">${project.title}</h3>
                            ${project.technologies ? `<p class="item-subtitle">Stack: ${project.technologies}</p>` : ''}
                            ${project.description ? `<div class="item-description">${formatDescription(project.description)}</div>` : ''}
                            ${project.link ? `<p class="item-description">🔗 ${project.link}</p>` : ''}
                        </div>
                    `).join('')}
                </section>
                ` : ''}

                <!-- Education -->
                ${visible.education && data.education.length > 0 ? `
                <section>
                    <h2 class="section-title">Education</h2>
                    ${data.education.map(edu => `
                        <div class="education-item">
                            <h3 class="item-title">${edu.degree}</h3>
                            <p class="item-subtitle">${edu.institution}</p>
                            <p class="item-date">${formatDate(edu.endDate)}</p>
                        </div>
                    `).join('')}
                </section>
                ` : ''}

                <!-- Certifications -->
                ${visible.certifications && data.certifications.length > 0 ? `
                <section>
                    <h2 class="section-title">Certifications</h2>
                    ${data.certifications.map(cert => `
                        <div class="certification-item">
                            ${cert.name} - ${cert.issuer}
                        </div>
                    `).join('')}
                </section>
                ` : ''}

                <!-- Languages -->
                ${visible.languages && data.languages.length > 0 ? `
                <section>
                    <h2 class="section-title">Languages</h2>
                    <div class="languages-list">
                        ${data.languages.map(lang => `
                            <div class="language-item">${lang.name} - ${lang.proficiency}</div>
                        `).join('')}
                    </div>
                </section>
                ` : ''}

                <!-- Interests -->
                ${visible.interests && data.interests ? `
                <section>
                    <h2 class="section-title">Interests</h2>
                    <div class="interests-list">
                        ${data.interests.split(',').map(interest => `
                            <span class="interest-tag">${interest.trim()}</span>
                        `).join('')}
                    </div>
                </section>
                ` : ''}
            </div>
        </div>
    `;
}

// ============================================
// TEMPLATE 6: STUDENT/FRESHER
// ============================================
function renderTemplate_student() {
    const data = APP_STATE.resumeData;
    const visible = APP_STATE.visibleSections;

    return `
        <div class="resume-template template-student">
            <!-- Header -->
            <header class="resume-header">
                ${data.personal.photo ? `<img src="${data.personal.photo}" class="profile-photo" alt="Profile">` : ''}
                <h1 class="resume-name">${data.personal.fullName || 'Your Name'}</h1>
                <p class="resume-title">${data.personal.jobTitle || 'Your Job Title'}</p>
                <div class="contact-info">
                    ${data.personal.email ? `<div class="contact-item"><i class="fas fa-envelope"></i>${data.personal.email}</div>` : ''}
                    ${data.personal.phone ? `<div class="contact-item"><i class="fas fa-phone"></i>${data.personal.phone}</div>` : ''}
                    ${data.personal.location ? `<div class="contact-item"><i class="fas fa-map-marker-alt"></i>${data.personal.location}</div>` : ''}
                    ${data.personal.linkedin ? `<div class="contact-item"><i class="fab fa-linkedin"></i>LinkedIn</div>` : ''}
                </div>
            </header>

            <!-- Summary -->
            ${visible.summary && data.summary ? `
            <section>
                <h2 class="section-title">Objective</h2>
                <p class="summary-text">${data.summary}</p>
            </section>
            ` : ''}

            <!-- Education (Priority for students) -->
            ${visible.education && data.education.length > 0 ? `
            <section class="education-section">
                <h2 class="section-title">Education</h2>
                ${data.education.map(edu => `
                    <div class="education-item">
                        <h3 class="item-title">${edu.degree}</h3>
                        <p class="item-subtitle">${edu.institution}${edu.location ? `, ${edu.location}` : ''}</p>
                        <span class="item-date">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span>
                        ${edu.gpa ? `<p class="item-description">GPA: ${edu.gpa}</p>` : ''}
                        ${edu.description ? `<div class="item-description">${formatDescription(edu.description)}</div>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Projects -->
            ${visible.projects && data.projects.length > 0 ? `
            <section>
                <h2 class="section-title">Projects</h2>
                ${data.projects.map(project => `
                    <div class="project-item">
                        <h3 class="item-title">${project.title}</h3>
                        ${project.technologies ? `<p class="item-subtitle">Technologies: ${project.technologies}</p>` : ''}
                        ${project.description ? `<div class="item-description">${formatDescription(project.description)}</div>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Experience -->
            ${visible.experience && data.experience.length > 0 ? `
            <section>
                <h2 class="section-title">Experience</h2>
                ${data.experience.map(exp => `
                    <div class="experience-item">
                        <h3 class="item-title">${exp.title}</h3>
                        <p class="item-subtitle">${exp.company}${exp.location ? `, ${exp.location}` : ''}</p>
                        <span class="item-date">${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                        ${exp.description ? `<div class="item-description">${formatDescription(exp.description)}</div>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Skills -->
            ${visible.skills && data.skills.length > 0 ? `
            <section>
                <h2 class="section-title">Skills</h2>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h4 class="skill-category-title">Technical Skills</h4>
                        <div class="skill-tags">
                            ${data.skills.map(skill => `
                                <span class="skill-tag">${skill.name}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </section>
            ` : ''}

            <!-- Certifications -->
            ${visible.certifications && data.certifications.length > 0 ? `
            <section>
                <h2 class="section-title">Certifications</h2>
                <div class="certifications-list">
                    ${data.certifications.map(cert => `
                        <div class="certification-item">
                            <div class="certification-name">${cert.name}</div>
                            <div class="certification-issuer">${cert.issuer}${cert.date ? ` - ${formatDate(cert.date)}` : ''}</div>
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Languages -->
            ${visible.languages && data.languages.length > 0 ? `
            <section>
                <h2 class="section-title">Languages</h2>
                <div class="skill-tags">
                    ${data.languages.map(lang => `
                        <span class="skill-tag">${lang.name} - ${lang.proficiency}</span>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Interests -->
            ${visible.interests && data.interests ? `
            <section>
                <h2 class="section-title">Interests & Activities</h2>
                <div class="interests-list">
                    ${data.interests.split(',').map(interest => `
                        <span class="interest-tag">${interest.trim()}</span>
                    `).join('')}
                </div>
            </section>
            ` : ''}
        </div>
    `;
}

// ============================================
// TEMPLATE 7: EXECUTIVE
// ============================================
function renderTemplate_executive() {
    const data = APP_STATE.resumeData;
    const visible = APP_STATE.visibleSections;

    return `
        <div class="resume-template template-executive">
            <!-- Executive Header -->
            <header class="resume-header">
                <div class="header-content">
                    <h1 class="resume-name">${data.personal.fullName || 'Your Name'}</h1>
                    <p class="resume-title">${data.personal.jobTitle || 'Your Job Title'}</p>
                    <div class="contact-info">
                        ${data.personal.email ? `<span><i class="fas fa-envelope"></i>${data.personal.email}</span>` : ''}
                        ${data.personal.phone ? `<span><i class="fas fa-phone"></i>${data.personal.phone}</span>` : ''}
                        ${data.personal.location ? `<span><i class="fas fa-map-marker-alt"></i>${data.personal.location}</span>` : ''}
                        ${data.personal.linkedin ? `<span><i class="fab fa-linkedin"></i>LinkedIn</span>` : ''}
                    </div>
                </div>
            </header>

            <div class="resume-body">
                <div class="two-column-layout">
                    <!-- Left Column: Experience & Projects -->
                    <div class="left-column">
                        <!-- Summary -->
                        ${visible.summary && data.summary ? `
                        <section>
                            <h2 class="section-title">Executive Summary</h2>
                            <p class="summary-text">${data.summary}</p>
                        </section>
                        ` : ''}

                        <!-- Experience -->
                        ${visible.experience && data.experience.length > 0 ? `
                        <section>
                            <h2 class="section-title">Professional Experience</h2>
                            ${data.experience.map(exp => `
                                <div class="experience-item">
                                    <h3 class="item-title">${exp.title}</h3>
                                    <p class="item-subtitle">${exp.company}${exp.location ? ` • ${exp.location}` : ''}</p>
                                    <p class="item-date">${formatDate(exp.startDate)} – ${exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                                    ${exp.description ? `<div class="item-description">${formatDescription(exp.description)}</div>` : ''}
                                </div>
                            `).join('')}
                        </section>
                        ` : ''}

                        <!-- Projects -->
                        ${visible.projects && data.projects.length > 0 ? `
                        <section>
                            <h2 class="section-title">Key Projects</h2>
                            ${data.projects.map(project => `
                                <div class="project-item">
                                    <h3 class="item-title">${project.title}</h3>
                                    ${project.technologies ? `<p class="item-subtitle">${project.technologies}</p>` : ''}
                                    ${project.description ? `<div class="item-description">${formatDescription(project.description)}</div>` : ''}
                                </div>
                            `).join('')}
                        </section>
                        ` : ''}
                    </div>

                    <!-- Right Column: Skills, Education, Certifications -->
                    <div class="right-column">
                        <!-- Skills -->
                        ${visible.skills && data.skills.length > 0 ? `
                        <section>
                            <h2 class="section-title">Core Competencies</h2>
                            <div class="skills-tags">
                                ${data.skills.map(skill => `
                                    <span class="skill-tag">${skill.name}</span>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}

                        <!-- Education -->
                        ${visible.education && data.education.length > 0 ? `
                        <section>
                            <h2 class="section-title">Education</h2>
                            ${data.education.map(edu => `
                                <div class="education-item">
                                    <h3 class="item-title">${edu.degree}</h3>
                                    <p class="item-subtitle">${edu.institution}</p>
                                    <p class="item-date">${formatDate(edu.endDate)}</p>
                                    ${edu.gpa ? `<p class="item-description">GPA: ${edu.gpa}</p>` : ''}
                                </div>
                            `).join('')}
                        </section>
                        ` : ''}

                        <!-- Certifications -->
                        ${visible.certifications && data.certifications.length > 0 ? `
                        <section>
                            <h2 class="section-title">Certifications</h2>
                            ${data.certifications.map(cert => `
                                <div class="certification-item">
                                    <strong>${cert.name}</strong>
                                    <p>${cert.issuer}</p>
                                </div>
                            `).join('')}
                        </section>
                        ` : ''}

                        <!-- Languages -->
                        ${visible.languages && data.languages.length > 0 ? `
                        <section>
                            <h2 class="section-title">Languages</h2>
                            ${data.languages.map(lang => `
                                <div class="language-item">${lang.name} <span>(${lang.proficiency})</span></div>
                            `).join('')}
                        </section>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// TEMPLATE 8: MINIMALIST
// ============================================
function renderTemplate_minimalist() {
    const data = APP_STATE.resumeData;
    const visible = APP_STATE.visibleSections;

    return `
        <div class="resume-template template-minimalist">
            <!-- Minimal Header -->
            <header class="resume-header">
                <h1 class="resume-name">${data.personal.fullName || 'Your Name'}</h1>
                <p class="resume-title">${data.personal.jobTitle || 'Your Job Title'}</p>
                <div class="contact-info">
                    ${data.personal.email || ''}${data.personal.email && data.personal.phone ? ' • ' : ''}${data.personal.phone || ''}${(data.personal.email || data.personal.phone) && data.personal.location ? ' • ' : ''}${data.personal.location || ''}
                </div>
            </header>

            <!-- Summary -->
            ${visible.summary && data.summary ? `
            <section>
                <p class="summary-text">${data.summary}</p>
            </section>
            ` : ''}

            <!-- Experience -->
            ${visible.experience && data.experience.length > 0 ? `
            <section>
                <h2 class="section-title">Experience</h2>
                ${data.experience.map(exp => `
                    <div class="experience-item">
                        <div class="item-header">
                            <div>
                                <h3 class="item-title">${exp.title}</h3>
                                <p class="item-subtitle">${exp.company}</p>
                            </div>
                            <span class="item-date">${formatDate(exp.startDate)} – ${exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                        </div>
                        ${exp.description ? `<div class="item-description">${formatDescription(exp.description)}</div>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Education -->
            ${visible.education && data.education.length > 0 ? `
            <section>
                <h2 class="section-title">Education</h2>
                ${data.education.map(edu => `
                    <div class="education-item">
                        <div class="item-header">
                            <div>
                                <h3 class="item-title">${edu.degree}</h3>
                                <p class="item-subtitle">${edu.institution}</p>
                            </div>
                            <span class="item-date">${formatDate(edu.endDate)}</span>
                        </div>
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Projects -->
            ${visible.projects && data.projects.length > 0 ? `
            <section>
                <h2 class="section-title">Projects</h2>
                ${data.projects.map(project => `
                    <div class="project-item">
                        <h3 class="item-title">${project.title}</h3>
                        ${project.technologies ? `<p class="item-subtitle">${project.technologies}</p>` : ''}
                        ${project.description ? `<div class="item-description">${formatDescription(project.description)}</div>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Skills -->
            ${visible.skills && data.skills.length > 0 ? `
            <section>
                <h2 class="section-title">Skills</h2>
                <p class="skills-text">${data.skills.map(skill => skill.name).join(', ')}</p>
            </section>
            ` : ''}

            <!-- Certifications -->
            ${visible.certifications && data.certifications.length > 0 ? `
            <section>
                <h2 class="section-title">Certifications</h2>
                ${data.certifications.map(cert => `
                    <div class="certification-item">${cert.name} – ${cert.issuer}</div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Languages -->
            ${visible.languages && data.languages.length > 0 ? `
            <section>
                <h2 class="section-title">Languages</h2>
                <p class="languages-text">${data.languages.map(lang => `${lang.name} (${lang.proficiency})`).join(', ')}</p>
            </section>
            ` : ''}
        </div>
    `;
}

// ============================================
// TEMPLATE 9: BOLD
// ============================================
function renderTemplate_bold() {
    const data = APP_STATE.resumeData;
    const visible = APP_STATE.visibleSections;

    return `
        <div class="resume-template template-bold">
            <!-- Bold Header -->
            <header class="resume-header">
                <div class="header-main">
                    <h1 class="resume-name">${data.personal.fullName || 'Your Name'}</h1>
                    <p class="resume-title">${data.personal.jobTitle || 'Your Job Title'}</p>
                </div>
                <div class="header-contact">
                    ${data.personal.email ? `<div><i class="fas fa-envelope"></i>${data.personal.email}</div>` : ''}
                    ${data.personal.phone ? `<div><i class="fas fa-phone"></i>${data.personal.phone}</div>` : ''}
                    ${data.personal.location ? `<div><i class="fas fa-map-marker-alt"></i>${data.personal.location}</div>` : ''}
                    ${data.personal.linkedin ? `<div><i class="fab fa-linkedin"></i>LinkedIn</div>` : ''}
                </div>
            </header>

            <!-- Summary -->
            ${visible.summary && data.summary ? `
            <section class="summary-section">
                <h2 class="section-title">Profile</h2>
                <p class="summary-text">${data.summary}</p>
            </section>
            ` : ''}

            <!-- Experience -->
            ${visible.experience && data.experience.length > 0 ? `
            <section>
                <h2 class="section-title">Experience</h2>
                ${data.experience.map(exp => `
                    <div class="experience-item">
                        <div class="item-header">
                            <h3 class="item-title">${exp.title}</h3>
                            <span class="item-date">${formatDate(exp.startDate)} – ${exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                        </div>
                        <p class="item-subtitle">${exp.company}${exp.location ? ` • ${exp.location}` : ''}</p>
                        ${exp.description ? `<div class="item-description">${formatDescription(exp.description)}</div>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Skills -->
            ${visible.skills && data.skills.length > 0 ? `
            <section class="skills-section">
                <h2 class="section-title">Skills</h2>
                <div class="skills-grid">
                    ${data.skills.map(skill => `
                        <div class="skill-badge">${skill.name}</div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Projects -->
            ${visible.projects && data.projects.length > 0 ? `
            <section>
                <h2 class="section-title">Projects</h2>
                ${data.projects.map(project => `
                    <div class="project-item">
                        <h3 class="item-title">${project.title}</h3>
                        ${project.technologies ? `<p class="item-subtitle">${project.technologies}</p>` : ''}
                        ${project.description ? `<div class="item-description">${formatDescription(project.description)}</div>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Education -->
            ${visible.education && data.education.length > 0 ? `
            <section>
                <h2 class="section-title">Education</h2>
                ${data.education.map(edu => `
                    <div class="education-item">
                        <div class="item-header">
                            <h3 class="item-title">${edu.degree}</h3>
                            <span class="item-date">${formatDate(edu.endDate)}</span>
                        </div>
                        <p class="item-subtitle">${edu.institution}</p>
                        ${edu.gpa ? `<p class="item-description">GPA: ${edu.gpa}</p>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Certifications -->
            ${visible.certifications && data.certifications.length > 0 ? `
            <section>
                <h2 class="section-title">Certifications</h2>
                <div class="certifications-grid">
                    ${data.certifications.map(cert => `
                        <div class="certification-badge">
                            <strong>${cert.name}</strong>
                            <span>${cert.issuer}</span>
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Languages -->
            ${visible.languages && data.languages.length > 0 ? `
            <section>
                <h2 class="section-title">Languages</h2>
                <div class="languages-grid">
                    ${data.languages.map(lang => `
                        <div class="language-badge">${lang.name} <span>${lang.proficiency}</span></div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Interests -->
            ${visible.interests && data.interests ? `
            <section>
                <h2 class="section-title">Interests</h2>
                <div class="interests-grid">
                    ${data.interests.split(',').map(interest => `
                        <span class="interest-badge">${interest.trim()}</span>
                    `).join('')}
                </div>
            </section>
            ` : ''}
        </div>
    `;
}

// ============================================
// TEMPLATE 10: TIMELINE
// ============================================
function renderTemplate_timeline() {
    const data = APP_STATE.resumeData;
    const visible = APP_STATE.visibleSections;

    return `
        <div class="resume-template template-timeline">
            <!-- Header -->
            <header class="resume-header">
                ${data.personal.photo ? `<img src="${data.personal.photo}" class="profile-photo" alt="Profile">` : ''}
                <div class="header-info">
                    <h1 class="resume-name">${data.personal.fullName || 'Your Name'}</h1>
                    <p class="resume-title">${data.personal.jobTitle || 'Your Job Title'}</p>
                    <div class="contact-info">
                        ${data.personal.email ? `<span><i class="fas fa-envelope"></i>${data.personal.email}</span>` : ''}
                        ${data.personal.phone ? `<span><i class="fas fa-phone"></i>${data.personal.phone}</span>` : ''}
                        ${data.personal.location ? `<span><i class="fas fa-map-marker-alt"></i>${data.personal.location}</span>` : ''}
                    </div>
                </div>
            </header>

            <!-- Summary -->
            ${visible.summary && data.summary ? `
            <section class="summary-section">
                <h2 class="section-title">About</h2>
                <p class="summary-text">${data.summary}</p>
            </section>
            ` : ''}

            <!-- Skills -->
            ${visible.skills && data.skills.length > 0 ? `
            <section class="skills-section">
                <h2 class="section-title">Skills</h2>
                <div class="skills-container">
                    ${data.skills.map(skill => `
                        <div class="skill-item">
                            <span class="skill-name">${skill.name}</span>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: ${skill.level}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Experience Timeline -->
            ${visible.experience && data.experience.length > 0 ? `
            <section>
                <h2 class="section-title">Experience Timeline</h2>
                <div class="timeline">
                    ${data.experience.map((exp, index) => `
                        <div class="timeline-item">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <h3 class="item-title">${exp.title}</h3>
                                <p class="item-subtitle">${exp.company}${exp.location ? `, ${exp.location}` : ''}</p>
                                <p class="item-date">${formatDate(exp.startDate)} – ${exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                                ${exp.description ? `<div class="item-description">${formatDescription(exp.description)}</div>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Education Timeline -->
            ${visible.education && data.education.length > 0 ? `
            <section>
                <h2 class="section-title">Education Timeline</h2>
                <div class="timeline">
                    ${data.education.map(edu => `
                        <div class="timeline-item">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <h3 class="item-title">${edu.degree}</h3>
                                <p class="item-subtitle">${edu.institution}${edu.location ? `, ${edu.location}` : ''}</p>
                                <p class="item-date">${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}</p>
                                ${edu.gpa ? `<p class="item-description">GPA: ${edu.gpa}</p>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Projects -->
            ${visible.projects && data.projects.length > 0 ? `
            <section>
                <h2 class="section-title">Notable Projects</h2>
                ${data.projects.map(project => `
                    <div class="project-item">
                        <h3 class="item-title">${project.title}</h3>
                        ${project.technologies ? `<p class="item-subtitle">${project.technologies}</p>` : ''}
                        ${project.description ? `<div class="item-description">${formatDescription(project.description)}</div>` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}

            <!-- Certifications -->
            ${visible.certifications && data.certifications.length > 0 ? `
            <section>
                <h2 class="section-title">Certifications</h2>
                <div class="certifications-list">
                    ${data.certifications.map(cert => `
                        <div class="certification-item">
                            <i class="fas fa-certificate"></i>
                            <div>
                                <strong>${cert.name}</strong>
                                <p>${cert.issuer}${cert.date ? ` • ${formatDate(cert.date)}` : ''}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Languages -->
            ${visible.languages && data.languages.length > 0 ? `
            <section>
                <h2 class="section-title">Languages</h2>
                <div class="languages-list">
                    ${data.languages.map(lang => `
                        <div class="language-item">
                            <span class="language-name">${lang.name}</span>
                            <span class="language-level">${lang.proficiency}</span>
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}

            <!-- Interests -->
            ${visible.interests && data.interests ? `
            <section>
                <h2 class="section-title">Interests</h2>
                <div class="interests-list">
                    ${data.interests.split(',').map(interest => `
                        <span class="interest-tag">${interest.trim()}</span>
                    `).join('')}
                </div>
            </section>
            ` : ''}
        </div>
    `;
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

function formatDescription(text) {
    if (!text) return '';

    // Convert newlines to bullet points if they start with bullet characters
    const lines = text.split('\n').filter(line => line.trim());

    if (lines.some(line => line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*'))) {
        const items = lines.map(line => {
            const cleaned = line.trim().replace(/^[•\-\*]\s*/, '');
            return `<li>${escapeHtml(cleaned)}</li>`;
        }).join('');
        return `<ul>${items}</ul>`;
    }

    // Otherwise, return as paragraph
    return `<p>${escapeHtml(text)}</p>`;
}

console.log('Resume Templates Loaded Successfully');
