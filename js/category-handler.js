/* ============================================
   CATEGORY HANDLER
   Manages category selection and population
   ============================================ */

// Global state for selected category
let selectedCategory = null;

/**
 * Initialize category selector on page load
 */
function initializeCategorySelector() {
    populatePopularCategories();
    populateAllCategories();
    setupCategorySearch();
    setupCategoryEventListeners();
}

/**
 * Populate popular categories section
 */
function populatePopularCategories() {
    const popularCategoriesContainer = document.getElementById('popularCategories');
    if (!popularCategoriesContainer) return;

    const popularCategories = getPopularCategories();

    // Add blank template first
    const blankPill = createCategoryPill(BLANK_TEMPLATE);
    popularCategoriesContainer.appendChild(blankPill);

    // Add popular categories
    popularCategories.slice(0, 8).forEach(category => {
        const pill = createCategoryPill(category);
        popularCategoriesContainer.appendChild(pill);
    });
}

/**
 * Create a category pill element
 */
function createCategoryPill(category) {
    const pill = document.createElement('div');
    pill.className = 'category-pill';
    pill.dataset.categoryId = category.id;
    pill.innerHTML = `
        <i class="fas ${category.icon}"></i>
        <span>${category.name}</span>
    `;

    pill.addEventListener('click', () => selectCategory(category));

    return pill;
}

/**
 * Populate all categories in accordion
 */
function populateAllCategories() {
    const accordionContainer = document.getElementById('categoriesAccordion');
    if (!accordionContainer) return;

    const categoryTypes = {
        'Technology & IT': ['software-engineer', 'web-developer', 'mobile-developer', 'data-scientist',
                            'devops-engineer', 'qa-engineer', 'uiux-designer', 'cybersecurity',
                            'cloud-architect', 'database-admin'],
        'Healthcare': ['doctor', 'nurse', 'pharmacist', 'lab-technician', 'physiotherapist'],
        'Business & Management': ['digital-marketer', 'sales-manager', 'business-analyst', 'hr-manager',
                                   'project-manager', 'product-manager', 'operations-manager', 'customer-success'],
        'Creative & Design': ['graphic-designer', 'content-writer', 'video-editor', 'photographer', '3d-animator'],
        'Education': ['teacher', 'professor', 'counselor', 'corporate-trainer'],
        'Engineering': ['mechanical-engineer', 'civil-engineer', 'electrical-engineer',
                        'chemical-engineer', 'biomedical-engineer'],
        'Finance & Accounting': ['accountant', 'financial-analyst', 'chartered-accountant', 'investment-banker'],
        'Hospitality & Tourism': ['hotel-manager', 'chef', 'event-manager', 'travel-consultant'],
        'Legal & Government': ['lawyer', 'legal-advisor', 'government-officer'],
        'Student & Entry Level': ['fresher', 'intern', 'college-student'],
        'Other Professions': ['architect', 'real-estate-agent', 'fashion-designer', 'journalist', 'social-worker']
    };

    Object.entries(categoryTypes).forEach(([typeName, categoryIds]) => {
        const typeElement = createCategoryTypeSection(typeName, categoryIds);
        accordionContainer.appendChild(typeElement);
    });
}

/**
 * Create category type section (accordion item)
 */
function createCategoryTypeSection(typeName, categoryIds) {
    const typeDiv = document.createElement('div');
    typeDiv.className = 'category-type';

    const categories = categoryIds.map(id => getCategoryById(id)).filter(Boolean);

    const header = document.createElement('div');
    header.className = 'category-type-header';
    header.innerHTML = `
        <div class="category-type-title">
            <i class="fas fa-folder"></i>
            <span>${typeName}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="category-type-count">${categories.length} roles</span>
            <i class="fas fa-chevron-down category-type-icon"></i>
        </div>
    `;

    const categoryList = document.createElement('div');
    categoryList.className = 'category-list';

    categories.forEach(category => {
        const categoryItem = createCategoryItem(category);
        categoryList.appendChild(categoryItem);
    });

    header.addEventListener('click', () => {
        const wasActive = header.classList.contains('active');

        // Close all other accordions
        document.querySelectorAll('.category-type-header').forEach(h => {
            h.classList.remove('active');
            h.nextElementSibling.classList.remove('show');
        });

        // Toggle current accordion
        if (!wasActive) {
            header.classList.add('active');
            categoryList.classList.add('show');
        }
    });

    typeDiv.appendChild(header);
    typeDiv.appendChild(categoryList);

    return typeDiv;
}

/**
 * Create category item element
 */
function createCategoryItem(category) {
    const item = document.createElement('div');
    item.className = 'category-item';
    item.dataset.categoryId = category.id;

    const demandClass = category.demand.toLowerCase().replace(' ', '-');

    item.innerHTML = `
        <div class="category-icon">
            <i class="fas ${category.icon}"></i>
        </div>
        <div class="category-details">
            <div class="category-name">${category.name}</div>
            <div class="category-meta">
                <span class="category-badge demand-${demandClass}">
                    <i class="fas fa-fire"></i> ${category.demand} Demand
                </span>
                <span class="category-badge salary">
                    <i class="fas fa-rupee-sign"></i> ${category.avgSalary}
                </span>
            </div>
            <div class="category-description">${category.description}</div>
        </div>
    `;

    item.addEventListener('click', () => selectCategory(category));

    return item;
}

/**
 * Setup category search functionality
 */
function setupCategorySearch() {
    const searchInput = document.getElementById('categorySearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        if (query.length === 0) {
            // Show all categories
            document.querySelectorAll('.category-item').forEach(item => {
                item.style.display = 'flex';
            });
            document.querySelectorAll('.category-type').forEach(type => {
                type.style.display = 'block';
            });
            return;
        }

        const results = searchCategories(query);
        const resultIds = new Set(results.map(c => c.id));

        // Hide/show category items based on search
        document.querySelectorAll('.category-item').forEach(item => {
            const categoryId = item.dataset.categoryId;
            item.style.display = resultIds.has(categoryId) ? 'flex' : 'none';
        });

        // Hide category types that have no visible items
        document.querySelectorAll('.category-type').forEach(type => {
            const visibleItems = type.querySelectorAll('.category-item[style*="display: flex"]');
            type.style.display = visibleItems.length > 0 ? 'block' : 'none';
        });
    });
}

/**
 * Setup event listeners
 */
function setupCategoryEventListeners() {
    // Listen for category selection from pills or accordion
    document.addEventListener('click', (e) => {
        if (e.target.closest('.category-pill') || e.target.closest('.category-item')) {
            // Handled by individual click handlers
        }
    });
}

/**
 * Select a category and show details
 */
function selectCategory(category) {
    selectedCategory = category;

    // Update UI - remove previous selections
    document.querySelectorAll('.category-pill, .category-item').forEach(el => {
        el.classList.remove('selected');
    });

    // Mark as selected
    document.querySelectorAll(`[data-category-id="${category.id}"]`).forEach(el => {
        el.classList.add('selected');
    });

    // Show category info
    showSelectedCategoryInfo(category);

    // Auto-scroll to templates
    setTimeout(() => {
        const templatesSection = document.querySelector('.template-filters');
        if (templatesSection) {
            templatesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 300);
}

/**
 * Show selected category information
 */
function showSelectedCategoryInfo(category) {
    const infoContainer = document.getElementById('selectedCategoryInfo');
    if (!infoContainer) return;

    const skillsHtml = category.skills.slice(0, 8).map(skill =>
        `<span class="skill-tag">${skill}</span>`
    ).join('');

    const moreSkills = category.skills.length > 8 ?
        `<span class="skill-tag">+${category.skills.length - 8} more</span>` : '';

    infoContainer.innerHTML = `
        <div class="selected-category-header">
            <div class="selected-category-icon">
                <i class="fas ${category.icon}"></i>
            </div>
            <div class="selected-category-title">
                <h3>${category.name}</h3>
                <p>${category.description}</p>
            </div>
        </div>

        <div class="selected-category-stats">
            <div class="stat-item">
                <i class="fas fa-fire"></i>
                <div class="stat-label">Market Demand</div>
                <div class="stat-value">${category.demand}</div>
            </div>
            <div class="stat-item">
                <i class="fas fa-rupee-sign"></i>
                <div class="stat-label">Avg. Salary</div>
                <div class="stat-value">${category.avgSalary}</div>
            </div>
            <div class="stat-item">
                <i class="fas fa-briefcase"></i>
                <div class="stat-label">Templates</div>
                <div class="stat-value">${category.templates.length}</div>
            </div>
        </div>

        ${category.skills.length > 0 ? `
        <div class="selected-category-skills">
            <h4><i class="fas fa-star"></i> Key Skills</h4>
            <div class="skills-list">
                ${skillsHtml}
                ${moreSkills}
            </div>
        </div>
        ` : ''}

        <div class="selected-category-actions">
            <button class="category-action-btn" onclick="loadCategoryExampleData('${category.id}')">
                <i class="fas fa-magic"></i> Start with Example
            </button>
            <button class="category-action-btn secondary" onclick="loadBlankTemplate('${category.id}')">
                <i class="fas fa-file"></i> Start from Scratch
            </button>
        </div>
    `;

    infoContainer.classList.add('show');

    // Filter templates based on category
    filterTemplatesByCategory(category);
}

/**
 * Filter templates based on selected category
 */
function filterTemplatesByCategory(category) {
    const templateCards = document.querySelectorAll('.template-card');
    const recommendedTemplates = new Set(category.templates);

    templateCards.forEach(card => {
        const templateId = card.dataset.template;

        // Show all templates but highlight recommended ones
        card.style.display = 'block';

        const badge = card.querySelector('.template-badge');
        if (recommendedTemplates.has(templateId)) {
            if (!badge) {
                const newBadge = document.createElement('span');
                newBadge.className = 'template-badge';
                newBadge.textContent = 'Recommended';
                card.querySelector('.template-preview').appendChild(newBadge);
            } else {
                badge.textContent = 'Recommended';
            }
            // Move recommended to front
            card.style.order = '-1';
        } else {
            if (badge && badge.textContent === 'Recommended') {
                badge.remove();
            }
            card.style.order = '0';
        }
    });
}

/**
 * Load category-specific example data
 */
function loadCategoryExampleData(categoryId) {
    const category = getCategoryById(categoryId);
    if (!category) return;

    // Get example data for this category
    const exampleData = getCategoryExampleData(categoryId);

    if (!exampleData) {
        // Fallback to blank template
        loadBlankTemplate(categoryId);
        return;
    }

    // Load the data into the form
    if (window.APP_STATE) {
        window.APP_STATE.resumeData = exampleData;

        // Save to localStorage
        if (window.saveResumeData) {
            window.saveResumeData();
        }

        // Navigate to editor
        if (window.showPage) {
            window.showPage('editor');
        }

        // Show success message
        if (window.showToast) {
            window.showToast('Example data loaded! You can now customize it.', 'success');
        }
    }
}

/**
 * Load blank template for category
 */
function loadBlankTemplate(categoryId) {
    const category = getCategoryById(categoryId);
    if (!category) return;

    // Create minimal data with category-specific skills
    const blankData = {
        personal: {
            fullName: '',
            email: '',
            phone: '',
            location: '',
            title: category.name,
            linkedin: '',
            github: '',
            portfolio: '',
            photo: ''
        },
        summary: '',
        experience: [],
        education: [],
        skills: category.skills.slice(0, 10),
        projects: [],
        certifications: [],
        languages: []
    };

    if (window.APP_STATE) {
        window.APP_STATE.resumeData = blankData;

        // Save to localStorage
        if (window.saveResumeData) {
            window.saveResumeData();
        }

        // Navigate to editor
        if (window.showPage) {
            window.showPage('editor');
        }

        // Show success message
        if (window.showToast) {
            window.showToast('Blank template loaded with suggested skills!', 'success');
        }
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCategorySelector);
} else {
    initializeCategorySelector();
}

// Export functions for global access
window.initializeCategorySelector = initializeCategorySelector;
window.selectCategory = selectCategory;
window.loadCategoryExampleData = loadCategoryExampleData;
window.loadBlankTemplate = loadBlankTemplate;
