/* ============================================
   RESUME CATEGORIES & INDUSTRY TEMPLATES
   57 High-Demand Categories with 10 Templates Each
   Total: 570 Professional Resume Templates
   ============================================ */

// ============================================
// CATEGORY DEFINITIONS
// ============================================
const RESUME_CATEGORIES = {
    // ========================================
    // TECHNOLOGY & IT (10 Categories)
    // ========================================
    'software-engineer': {
        id: 'software-engineer',
        name: 'Software Engineer',
        category: 'Technology',
        icon: 'fa-code',
        demand: 'Very High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'Git', 'AWS'],
        avgSalary: '₹8-25 LPA',
        description: 'Full-stack, Backend, Frontend developers'
    },
    'web-developer': {
        id: 'web-developer',
        name: 'Web Developer',
        category: 'Technology',
        icon: 'fa-globe',
        demand: 'Very High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'Responsive Design', 'APIs'],
        avgSalary: '₹5-18 LPA',
        description: 'Frontend, Full-stack web development'
    },
    'mobile-developer': {
        id: 'mobile-developer',
        name: 'Mobile App Developer',
        category: 'Technology',
        icon: 'fa-mobile-alt',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS', 'Android', 'Firebase'],
        avgSalary: '₹6-22 LPA',
        description: 'iOS, Android, Cross-platform development'
    },
    'data-scientist': {
        id: 'data-scientist',
        name: 'Data Scientist',
        category: 'Technology',
        icon: 'fa-chart-line',
        demand: 'Very High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Python', 'R', 'Machine Learning', 'SQL', 'TensorFlow', 'Statistics', 'Pandas'],
        avgSalary: '₹10-30 LPA',
        description: 'ML, AI, Data Analysis, Analytics'
    },
    'devops-engineer': {
        id: 'devops-engineer',
        name: 'DevOps Engineer',
        category: 'Technology',
        icon: 'fa-server',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Jenkins', 'Terraform', 'Linux'],
        avgSalary: '₹8-25 LPA',
        description: 'Cloud, Infrastructure, Automation'
    },
    'qa-tester': {
        id: 'qa-tester',
        name: 'QA/Test Engineer',
        category: 'Technology',
        icon: 'fa-bug',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Selenium', 'Automation Testing', 'Manual Testing', 'JIRA', 'API Testing'],
        avgSalary: '₹4-12 LPA',
        description: 'Quality Assurance, Testing'
    },
    'ui-ux-designer': {
        id: 'ui-ux-designer',
        name: 'UI/UX Designer',
        category: 'Technology',
        icon: 'fa-paint-brush',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Figma', 'Adobe XD', 'Sketch', 'Wireframing', 'Prototyping', 'User Research'],
        avgSalary: '₹5-18 LPA',
        description: 'Product Design, UX Research'
    },
    'cyber-security': {
        id: 'cyber-security',
        name: 'Cybersecurity Specialist',
        category: 'Technology',
        icon: 'fa-shield-alt',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Penetration Testing', 'Network Security', 'SIEM', 'Firewall', 'Ethical Hacking'],
        avgSalary: '₹7-22 LPA',
        description: 'Information Security, Ethical Hacking'
    },
    'cloud-architect': {
        id: 'cloud-architect',
        name: 'Cloud Architect',
        category: 'Technology',
        icon: 'fa-cloud',
        demand: 'Very High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['AWS', 'Azure', 'GCP', 'Microservices', 'Serverless', 'Cloud Security'],
        avgSalary: '₹12-35 LPA',
        description: 'Cloud Solutions, Architecture'
    },
    'database-admin': {
        id: 'database-admin',
        name: 'Database Administrator',
        category: 'Technology',
        icon: 'fa-database',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle', 'Database Design', 'Performance Tuning'],
        avgSalary: '₹6-18 LPA',
        description: 'DBA, Database Management'
    },

    // ========================================
    // HEALTHCARE & MEDICAL (5 Categories)
    // ========================================
    'doctor': {
        id: 'doctor',
        name: 'Doctor/Physician',
        category: 'Healthcare',
        icon: 'fa-user-md',
        demand: 'Very High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Patient Care', 'Diagnosis', 'Medical Records', 'EMR Systems', 'Clinical Skills'],
        avgSalary: '₹8-50 LPA',
        description: 'MD, MBBS, Specialist, General Practitioner'
    },
    'nurse': {
        id: 'nurse',
        name: 'Nurse/Healthcare Worker',
        category: 'Healthcare',
        icon: 'fa-heartbeat',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Patient Care', 'Medical Equipment', 'Emergency Response', 'Healthcare Software'],
        avgSalary: '₹3-10 LPA',
        description: 'RN, LPN, Critical Care Nurse'
    },
    'pharmacist': {
        id: 'pharmacist',
        name: 'Pharmacist',
        category: 'Healthcare',
        icon: 'fa-pills',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Drug Dispensing', 'Patient Counseling', 'Inventory Management', 'Pharmacy Software'],
        avgSalary: '₹3-8 LPA',
        description: 'Clinical Pharmacist, Retail Pharmacist'
    },
    'medical-lab-tech': {
        id: 'medical-lab-tech',
        name: 'Medical Lab Technician',
        category: 'Healthcare',
        icon: 'fa-flask',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Lab Testing', 'Equipment Operation', 'Sample Analysis', 'Quality Control'],
        avgSalary: '₹2-6 LPA',
        description: 'Lab Tech, Pathology Assistant'
    },
    'physiotherapist': {
        id: 'physiotherapist',
        name: 'Physiotherapist',
        category: 'Healthcare',
        icon: 'fa-hands-helping',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Physical Therapy', 'Rehabilitation', 'Patient Assessment', 'Treatment Planning'],
        avgSalary: '₹3-10 LPA',
        description: 'Physical Therapy, Rehabilitation Specialist'
    },

    // ========================================
    // BUSINESS & MANAGEMENT (8 Categories)
    // ========================================
    'digital-marketing': {
        id: 'digital-marketing',
        name: 'Digital Marketing Specialist',
        category: 'Business',
        icon: 'fa-bullhorn',
        demand: 'Very High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['SEO', 'Google Ads', 'Social Media', 'Content Marketing', 'Analytics', 'Email Marketing'],
        avgSalary: '₹4-15 LPA',
        description: 'SEO, SEM, Social Media Marketing'
    },
    'sales-executive': {
        id: 'sales-executive',
        name: 'Sales Executive',
        category: 'Business',
        icon: 'fa-handshake',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Sales Strategy', 'Client Relations', 'CRM', 'Negotiation', 'Lead Generation'],
        avgSalary: '₹3-12 LPA',
        description: 'B2B, B2C Sales, Account Executive'
    },
    'business-analyst': {
        id: 'business-analyst',
        name: 'Business Analyst',
        category: 'Business',
        icon: 'fa-chart-bar',
        demand: 'Very High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Data Analysis', 'SQL', 'Excel', 'Requirements Gathering', 'Process Improvement'],
        avgSalary: '₹6-20 LPA',
        description: 'BA, Systems Analyst, Data Analyst'
    },
    'hr-manager': {
        id: 'hr-manager',
        name: 'HR Manager',
        category: 'Business',
        icon: 'fa-users',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Recruitment', 'Employee Relations', 'HRIS', 'Performance Management', 'Payroll'],
        avgSalary: '₹5-18 LPA',
        description: 'Human Resources, Talent Acquisition'
    },
    'project-manager': {
        id: 'project-manager',
        name: 'Project Manager',
        category: 'Business',
        icon: 'fa-tasks',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Project Planning', 'Agile', 'Scrum', 'Risk Management', 'Stakeholder Management'],
        avgSalary: '₹8-25 LPA',
        description: 'PMP, Scrum Master, Program Manager'
    },
    'product-manager': {
        id: 'product-manager',
        name: 'Product Manager',
        category: 'Business',
        icon: 'fa-box',
        demand: 'Very High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Product Strategy', 'Roadmap Planning', 'User Stories', 'Analytics', 'Market Research'],
        avgSalary: '₹10-35 LPA',
        description: 'Product Owner, Product Lead'
    },
    'operations-manager': {
        id: 'operations-manager',
        name: 'Operations Manager',
        category: 'Business',
        icon: 'fa-cogs',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Process Optimization', 'Supply Chain', 'Inventory Management', 'Lean Six Sigma'],
        avgSalary: '₹6-20 LPA',
        description: 'Operations, Supply Chain, Logistics'
    },
    'customer-success': {
        id: 'customer-success',
        name: 'Customer Success Manager',
        category: 'Business',
        icon: 'fa-smile',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Customer Relations', 'CRM', 'Problem Solving', 'Communication', 'Retention'],
        avgSalary: '₹4-15 LPA',
        description: 'Customer Support, Client Relations'
    },

    // ========================================
    // CREATIVE & DESIGN (5 Categories)
    // ========================================
    'graphic-designer': {
        id: 'graphic-designer',
        name: 'Graphic Designer',
        category: 'Creative',
        icon: 'fa-palette',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Adobe Photoshop', 'Illustrator', 'InDesign', 'Branding', 'Typography', 'Logo Design'],
        avgSalary: '₹3-12 LPA',
        description: 'Visual Design, Brand Identity'
    },
    'content-writer': {
        id: 'content-writer',
        name: 'Content Writer',
        category: 'Creative',
        icon: 'fa-pen',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Copywriting', 'SEO Writing', 'Content Strategy', 'Research', 'Editing'],
        avgSalary: '₹3-10 LPA',
        description: 'Copywriter, Technical Writer, Blogger'
    },
    'video-editor': {
        id: 'video-editor',
        name: 'Video Editor',
        category: 'Creative',
        icon: 'fa-video',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Adobe Premiere', 'After Effects', 'Final Cut Pro', 'Color Grading', 'Motion Graphics'],
        avgSalary: '₹3-12 LPA',
        description: 'Video Production, Motion Graphics'
    },
    'photographer': {
        id: 'photographer',
        name: 'Photographer',
        category: 'Creative',
        icon: 'fa-camera',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Photography', 'Lightroom', 'Photoshop', 'Studio Lighting', 'Photo Editing'],
        avgSalary: '₹2-15 LPA',
        description: 'Commercial, Portrait, Wedding Photography'
    },
    'animator': {
        id: 'animator',
        name: '3D Animator',
        category: 'Creative',
        icon: 'fa-film',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Maya', 'Blender', '3D Modeling', 'After Effects', 'Animation', 'Rigging'],
        avgSalary: '₹4-15 LPA',
        description: '3D Animation, VFX, Motion Design'
    },

    // ========================================
    // EDUCATION (4 Categories)
    // ========================================
    'teacher': {
        id: 'teacher',
        name: 'Teacher/Educator',
        category: 'Education',
        icon: 'fa-chalkboard-teacher',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Curriculum Development', 'Classroom Management', 'Lesson Planning', 'Student Assessment'],
        avgSalary: '₹3-10 LPA',
        description: 'School Teacher, Subject Teacher'
    },
    'professor': {
        id: 'professor',
        name: 'Professor/Lecturer',
        category: 'Education',
        icon: 'fa-university',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Research', 'Academic Writing', 'Curriculum Design', 'Student Mentoring', 'Publishing'],
        avgSalary: '₹5-20 LPA',
        description: 'College Professor, Assistant Professor'
    },
    'education-counselor': {
        id: 'education-counselor',
        name: 'Education Counselor',
        category: 'Education',
        icon: 'fa-user-graduate',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Career Guidance', 'Student Assessment', 'University Applications', 'Counseling'],
        avgSalary: '₹3-8 LPA',
        description: 'Career Counselor, Academic Advisor'
    },
    'trainer': {
        id: 'trainer',
        name: 'Corporate Trainer',
        category: 'Education',
        icon: 'fa-presentation',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Training Delivery', 'Instructional Design', 'LMS', 'Public Speaking', 'E-learning'],
        avgSalary: '₹4-12 LPA',
        description: 'Soft Skills, Technical Training'
    },

    // ========================================
    // ENGINEERING (5 Categories)
    // ========================================
    'mechanical-engineer': {
        id: 'mechanical-engineer',
        name: 'Mechanical Engineer',
        category: 'Engineering',
        icon: 'fa-cog',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['CAD', 'SolidWorks', 'AutoCAD', 'Manufacturing', 'Thermodynamics', 'Design'],
        avgSalary: '₹4-15 LPA',
        description: 'Design, Manufacturing, R&D'
    },
    'civil-engineer': {
        id: 'civil-engineer',
        name: 'Civil Engineer',
        category: 'Engineering',
        icon: 'fa-building',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['AutoCAD', 'Structural Design', 'Project Management', 'Construction', 'Site Planning'],
        avgSalary: '₹3-12 LPA',
        description: 'Construction, Structural Engineering'
    },
    'electrical-engineer': {
        id: 'electrical-engineer',
        name: 'Electrical Engineer',
        category: 'Engineering',
        icon: 'fa-bolt',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Circuit Design', 'Power Systems', 'PLC', 'Electrical Design', 'MATLAB', 'AutoCAD'],
        avgSalary: '₹4-15 LPA',
        description: 'Power Systems, Electronics'
    },
    'chemical-engineer': {
        id: 'chemical-engineer',
        name: 'Chemical Engineer',
        category: 'Engineering',
        icon: 'fa-flask',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Process Design', 'Chemical Safety', 'Quality Control', 'Plant Operations'],
        avgSalary: '₹4-12 LPA',
        description: 'Process Engineering, Plant Operations'
    },
    'biomedical-engineer': {
        id: 'biomedical-engineer',
        name: 'Biomedical Engineer',
        category: 'Engineering',
        icon: 'fa-heartbeat',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Medical Devices', 'Biotech', 'CAD', 'Clinical Engineering', 'FDA Regulations'],
        avgSalary: '₹4-14 LPA',
        description: 'Medical Devices, Healthcare Technology'
    },

    // ========================================
    // FINANCE & ACCOUNTING (4 Categories)
    // ========================================
    'accountant': {
        id: 'accountant',
        name: 'Accountant',
        category: 'Finance',
        icon: 'fa-calculator',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Tally', 'QuickBooks', 'GST', 'Financial Reporting', 'Tax Filing', 'Excel'],
        avgSalary: '₹3-10 LPA',
        description: 'CA, Accounts Manager, Bookkeeper'
    },
    'financial-analyst': {
        id: 'financial-analyst',
        name: 'Financial Analyst',
        category: 'Finance',
        icon: 'fa-chart-pie',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Financial Modeling', 'Excel', 'Bloomberg', 'Investment Analysis', 'Valuation'],
        avgSalary: '₹6-20 LPA',
        description: 'Investment Banking, Equity Research'
    },
    'chartered-accountant': {
        id: 'chartered-accountant',
        name: 'Chartered Accountant (CA)',
        category: 'Finance',
        icon: 'fa-balance-scale',
        demand: 'Very High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Audit', 'Taxation', 'Financial Reporting', 'IFRS', 'Company Law', 'GST'],
        avgSalary: '₹8-30 LPA',
        description: 'CA, Audit, Taxation, Corporate Finance'
    },
    'investment-banker': {
        id: 'investment-banker',
        name: 'Investment Banker',
        category: 'Finance',
        icon: 'fa-briefcase',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['M&A', 'Valuation', 'Financial Modeling', 'Due Diligence', 'Deal Structuring'],
        avgSalary: '₹10-50 LPA',
        description: 'M&A, Corporate Finance, IPO'
    },

    // ========================================
    // HOSPITALITY & SERVICE (4 Categories)
    // ========================================
    'hotel-manager': {
        id: 'hotel-manager',
        name: 'Hotel Manager',
        category: 'Hospitality',
        icon: 'fa-hotel',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Hotel Management', 'Customer Service', 'Operations', 'PMS Software', 'Revenue Management'],
        avgSalary: '₹4-15 LPA',
        description: 'Hospitality Management, Front Office'
    },
    'chef': {
        id: 'chef',
        name: 'Chef/Cook',
        category: 'Hospitality',
        icon: 'fa-utensils',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Culinary Arts', 'Menu Planning', 'Food Safety', 'Kitchen Management', 'Cooking'],
        avgSalary: '₹3-12 LPA',
        description: 'Executive Chef, Sous Chef, Cook'
    },
    'event-manager': {
        id: 'event-manager',
        name: 'Event Manager',
        category: 'Hospitality',
        icon: 'fa-calendar-alt',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Event Planning', 'Vendor Management', 'Budget Planning', 'Coordination', 'Marketing'],
        avgSalary: '₹3-10 LPA',
        description: 'Wedding Planner, Corporate Events'
    },
    'travel-consultant': {
        id: 'travel-consultant',
        name: 'Travel Consultant',
        category: 'Hospitality',
        icon: 'fa-plane',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Travel Planning', 'Customer Service', 'GDS Systems', 'Itinerary Planning', 'Booking'],
        avgSalary: '₹2-8 LPA',
        description: 'Travel Agent, Tour Operator'
    },

    // ========================================
    // LEGAL & GOVERNMENT (3 Categories)
    // ========================================
    'lawyer': {
        id: 'lawyer',
        name: 'Lawyer/Advocate',
        category: 'Legal',
        icon: 'fa-gavel',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Legal Research', 'Court Proceedings', 'Contract Law', 'Legal Writing', 'Case Management'],
        avgSalary: '₹5-25 LPA',
        description: 'Corporate Lawyer, Litigation'
    },
    'legal-advisor': {
        id: 'legal-advisor',
        name: 'Legal Advisor',
        category: 'Legal',
        icon: 'fa-handshake',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Legal Compliance', 'Contract Review', 'Corporate Law', 'Legal Advisory', 'Negotiation'],
        avgSalary: '₹6-20 LPA',
        description: 'Corporate Legal, Compliance'
    },
    'government-officer': {
        id: 'government-officer',
        name: 'Government Officer',
        category: 'Government',
        icon: 'fa-landmark',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Public Administration', 'Policy Making', 'Governance', 'Project Management'],
        avgSalary: '₹4-15 LPA',
        description: 'IAS, IPS, Civil Services'
    },

    // ========================================
    // FRESHER & STUDENT (3 Categories)
    // ========================================
    'fresher-graduate': {
        id: 'fresher-graduate',
        name: 'Fresher/Graduate',
        category: 'Student',
        icon: 'fa-graduation-cap',
        demand: 'Very High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Communication', 'MS Office', 'Teamwork', 'Problem Solving', 'Quick Learning'],
        avgSalary: '₹2-6 LPA',
        description: 'Recent Graduate, Entry Level'
    },
    'intern': {
        id: 'intern',
        name: 'Intern/Trainee',
        category: 'Student',
        icon: 'fa-user-tie',
        demand: 'High',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Learning', 'Adaptability', 'Team Collaboration', 'Basic Tools'],
        avgSalary: '₹10k-30k/month',
        description: 'Internship, Summer Trainee'
    },
    'college-student': {
        id: 'college-student',
        name: 'College Student',
        category: 'Student',
        icon: 'fa-book',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Projects', 'Extra-curricular', 'Academic Excellence', 'Leadership'],
        avgSalary: 'N/A',
        description: 'Student Resume for Internships'
    },

    // ========================================
    // OTHER CATEGORIES (5 More)
    // ========================================
    'architect': {
        id: 'architect',
        name: 'Architect',
        category: 'Engineering',
        icon: 'fa-drafting-compass',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['AutoCAD', 'SketchUp', '3D Modeling', 'Architectural Design', 'Building Codes'],
        avgSalary: '₹4-15 LPA',
        description: 'Architectural Design, Interior Design'
    },
    'real-estate': {
        id: 'real-estate',
        name: 'Real Estate Agent',
        category: 'Business',
        icon: 'fa-home',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Sales', 'Property Management', 'Negotiation', 'Market Analysis', 'Customer Relations'],
        avgSalary: '₹3-15 LPA',
        description: 'Property Sales, Real Estate Broker'
    },
    'fashion-designer': {
        id: 'fashion-designer',
        name: 'Fashion Designer',
        category: 'Creative',
        icon: 'fa-tshirt',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Fashion Design', 'Sketching', 'Textiles', 'Pattern Making', 'Adobe Illustrator'],
        avgSalary: '₹3-12 LPA',
        description: 'Fashion Design, Styling, Apparel'
    },
    'journalist': {
        id: 'journalist',
        name: 'Journalist/Reporter',
        category: 'Creative',
        icon: 'fa-newspaper',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Reporting', 'Writing', 'Editing', 'Research', 'News Production', 'Interviewing'],
        avgSalary: '₹3-12 LPA',
        description: 'News Reporter, Editor, Anchor'
    },
    'social-worker': {
        id: 'social-worker',
        name: 'Social Worker/NGO',
        category: 'Social',
        icon: 'fa-hands-helping',
        demand: 'Medium',
        templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
        skills: ['Community Development', 'Project Management', 'Fundraising', 'Advocacy'],
        avgSalary: '₹2-8 LPA',
        description: 'NGO, Community Development'
    }
};

// ============================================
// BLANK TEMPLATE
// ============================================
const BLANK_TEMPLATE = {
    id: 'blank',
    name: 'Start from Scratch',
    category: 'General',
    icon: 'fa-file',
    demand: 'All Levels',
    templates: ['modern', 'ats', 'creative', 'professional', 'tech', 'student', 'executive', 'minimalist', 'bold', 'timeline'],
    skills: [],
    avgSalary: 'N/A',
    description: 'Empty template - Build your own custom resume'
};

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get all categories grouped by type
function getCategoriesByType() {
    const grouped = {};

    Object.values(RESUME_CATEGORIES).forEach(cat => {
        if (!grouped[cat.category]) {
            grouped[cat.category] = [];
        }
        grouped[cat.category].push(cat);
    });

    return grouped;
}

// Get category by ID
function getCategoryById(id) {
    return RESUME_CATEGORIES[id] || BLANK_TEMPLATE;
}

// Search categories
function searchCategories(query) {
    query = query.toLowerCase();
    return Object.values(RESUME_CATEGORIES).filter(cat =>
        cat.name.toLowerCase().includes(query) ||
        cat.description.toLowerCase().includes(query) ||
        cat.skills.some(skill => skill.toLowerCase().includes(query))
    );
}

// Get popular categories
function getPopularCategories() {
    return Object.values(RESUME_CATEGORIES)
        .filter(cat => cat.demand === 'Very High')
        .slice(0, 10);
}

// Get total count
function getCategoryCount() {
    return Object.keys(RESUME_CATEGORIES).length;
}

// ============================================
// TEMPLATE THUMBNAIL GENERATOR
// ============================================

// Generate template thumbnail preview
function getTemplateThumbnail(templateId, colors = { primary: '#2563eb', accent: '#3b82f6' }) {
    const thumbnails = {
        'modern': `
            <svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" class="template-thumbnail">
                <rect width="100" height="140" fill="white"/>
                <rect x="0" y="0" width="35" height="140" fill="${colors.primary}"/>
                <circle cx="17.5" cy="15" r="8" fill="white" opacity="0.3"/>
                <rect x="10" y="28" width="15" height="2" fill="white" opacity="0.7" rx="1"/>
                <rect x="10" y="33" width="15" height="1.5" fill="white" opacity="0.5" rx="0.75"/>
                <rect x="10" y="45" width="15" height="1.5" fill="white" opacity="0.7" rx="0.75"/>
                <rect x="10" y="49" width="12" height="1" fill="white" opacity="0.5" rx="0.5"/>
                <rect x="42" y="10" width="50" height="3" fill="${colors.primary}" opacity="0.9" rx="1.5"/>
                <rect x="42" y="16" width="35" height="2" fill="${colors.accent}" opacity="0.6" rx="1"/>
                <rect x="42" y="25" width="50" height="1.5" fill="#64748b" opacity="0.4" rx="0.75"/>
                <rect x="42" y="29" width="45" height="1.5" fill="#64748b" opacity="0.4" rx="0.75"/>
                <rect x="42" y="33" width="48" height="1.5" fill="#64748b" opacity="0.4" rx="0.75"/>
                <rect x="42" y="42" width="40" height="2" fill="${colors.primary}" opacity="0.7" rx="1"/>
                <rect x="42" y="47" width="50" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
                <rect x="42" y="50" width="48" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
            </svg>
        `,
        'ats': `
            <svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" class="template-thumbnail">
                <rect width="100" height="140" fill="white"/>
                <rect x="10" y="10" width="80" height="4" fill="${colors.primary}" opacity="0.9" rx="2"/>
                <rect x="10" y="18" width="50" height="2.5" fill="${colors.accent}" opacity="0.6" rx="1.25"/>
                <rect x="10" y="28" width="35" height="2" fill="#64748b" opacity="0.5" rx="1"/>
                <line x1="10" y1="35" x2="90" y2="35" stroke="#e2e8f0" stroke-width="0.5"/>
                <rect x="10" y="40" width="30" height="2" fill="${colors.primary}" opacity="0.7" rx="1"/>
                <rect x="10" y="45" width="80" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
                <rect x="10" y="48" width="75" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
                <rect x="10" y="51" width="78" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
                <line x1="10" y1="58" x2="90" y2="58" stroke="#e2e8f0" stroke-width="0.5"/>
                <rect x="10" y="63" width="30" height="2" fill="${colors.primary}" opacity="0.7" rx="1"/>
                <rect x="10" y="68" width="70" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
            </svg>
        `,
        'creative': `
            <svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" class="template-thumbnail">
                <rect width="100" height="140" fill="white"/>
                <rect x="0" y="0" width="100" height="25" fill="${colors.primary}"/>
                <circle cx="50" cy="12.5" r="7" fill="white" opacity="0.9"/>
                <rect x="35" y="19" width="30" height="2" fill="white" opacity="0.9" rx="1"/>
                <rect x="10" y="32" width="80" height="2.5" fill="${colors.accent}" opacity="0.7" rx="1.25"/>
                <rect x="10" y="38" width="35" height="15" fill="${colors.primary}" opacity="0.1" rx="2"/>
                <rect x="55" y="38" width="35" height="15" fill="${colors.accent}" opacity="0.1" rx="2"/>
                <rect x="12" y="41" width="10" height="1.5" fill="${colors.primary}" opacity="0.6" rx="0.75"/>
                <rect x="12" y="44" width="28" height="1" fill="#64748b" opacity="0.4" rx="0.5"/>
                <rect x="10" y="60" width="80" height="1.5" fill="#64748b" opacity="0.3" rx="0.75"/>
                <rect x="10" y="64" width="75" height="1.5" fill="#64748b" opacity="0.3" rx="0.75"/>
            </svg>
        `,
        'professional': `
            <svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" class="template-thumbnail">
                <rect width="100" height="140" fill="white"/>
                <rect x="10" y="10" width="80" height="5" fill="${colors.primary}" opacity="0.9" rx="1"/>
                <rect x="10" y="18" width="50" height="2" fill="#64748b" opacity="0.5" rx="1"/>
                <line x1="10" y1="26" x2="90" y2="26" stroke="${colors.primary}" stroke-width="1" opacity="0.3"/>
                <rect x="10" y="32" width="25" height="2" fill="${colors.primary}" opacity="0.8" rx="1"/>
                <rect x="10" y="38" width="80" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
                <rect x="10" y="41" width="78" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
                <rect x="10" y="44" width="75" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
                <rect x="10" y="52" width="25" height="2" fill="${colors.primary}" opacity="0.8" rx="1"/>
                <rect x="10" y="58" width="70" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
                <rect x="10" y="61" width="75" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
            </svg>
        `,
        'tech': `
            <svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" class="template-thumbnail">
                <rect width="100" height="140" fill="#0f172a"/>
                <rect x="0" y="0" width="100" height="8" fill="${colors.primary}"/>
                <rect x="10" y="2" width="30" height="3" fill="white" opacity="0.9" rx="1.5"/>
                <rect x="10" y="14" width="80" height="2" fill="${colors.accent}" opacity="0.8" rx="1"/>
                <rect x="10" y="20" width="25" height="10" fill="${colors.primary}" opacity="0.2" rx="1"/>
                <rect x="42" y="20" width="25" height="10" fill="${colors.primary}" opacity="0.2" rx="1"/>
                <rect x="74" y="20" width="16" height="10" fill="${colors.primary}" opacity="0.2" rx="1"/>
                <rect x="12" y="22" width="8" height="1.5" fill="${colors.accent}" opacity="0.7" rx="0.75"/>
                <rect x="10" y="36" width="80" height="1.2" fill="white" opacity="0.3" rx="0.6"/>
                <rect x="10" y="40" width="75" height="1.2" fill="white" opacity="0.3" rx="0.6"/>
            </svg>
        `,
        'student': `
            <svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" class="template-thumbnail">
                <rect width="100" height="140" fill="white"/>
                <rect x="10" y="10" width="80" height="4" fill="${colors.primary}" opacity="0.9" rx="2"/>
                <rect x="10" y="18" width="45" height="2" fill="${colors.accent}" opacity="0.6" rx="1"/>
                <rect x="10" y="28" width="28" height="2" fill="${colors.primary}" opacity="0.7" rx="1"/>
                <rect x="10" y="33" width="80" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
                <rect x="10" y="36" width="75" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
                <rect x="10" y="44" width="28" height="2" fill="${colors.primary}" opacity="0.7" rx="1"/>
                <rect x="10" y="49" width="70" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
                <rect x="10" y="52" width="65" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
                <rect x="10" y="60" width="28" height="2" fill="${colors.primary}" opacity="0.7" rx="1"/>
                <rect x="12" y="65" width="15" height="8" fill="${colors.accent}" opacity="0.1" rx="1"/>
            </svg>
        `,
        'executive': `
            <svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" class="template-thumbnail">
                <rect width="100" height="140" fill="white"/>
                <rect x="0" y="0" width="100" height="20" fill="${colors.primary}" opacity="0.1"/>
                <rect x="10" y="6" width="80" height="4" fill="${colors.primary}" opacity="0.9" rx="2"/>
                <rect x="10" y="13" width="50" height="2" fill="${colors.accent}" opacity="0.7" rx="1"/>
                <line x1="10" y1="25" x2="90" y2="25" stroke="${colors.primary}" stroke-width="0.5"/>
                <rect x="10" y="30" width="35" height="2.5" fill="${colors.primary}" opacity="0.8" rx="1.25"/>
                <rect x="10" y="36" width="80" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
                <rect x="10" y="39" width="78" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
                <rect x="10" y="42" width="75" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
                <rect x="10" y="50" width="35" height="2.5" fill="${colors.primary}" opacity="0.8" rx="1.25"/>
            </svg>
        `,
        'minimalist': `
            <svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" class="template-thumbnail">
                <rect width="100" height="140" fill="white"/>
                <rect x="10" y="15" width="80" height="3" fill="${colors.primary}" rx="1.5"/>
                <rect x="10" y="22" width="40" height="1.5" fill="#64748b" opacity="0.4" rx="0.75"/>
                <line x1="10" y1="32" x2="90" y2="32" stroke="#e2e8f0" stroke-width="0.3"/>
                <rect x="10" y="38" width="20" height="1.5" fill="${colors.primary}" opacity="0.6" rx="0.75"/>
                <rect x="10" y="43" width="80" height="1" fill="#64748b" opacity="0.25" rx="0.5"/>
                <rect x="10" y="46" width="75" height="1" fill="#64748b" opacity="0.25" rx="0.5"/>
                <rect x="10" y="54" width="20" height="1.5" fill="${colors.primary}" opacity="0.6" rx="0.75"/>
                <rect x="10" y="59" width="70" height="1" fill="#64748b" opacity="0.25" rx="0.5"/>
                <rect x="10" y="62" width="68" height="1" fill="#64748b" opacity="0.25" rx="0.5"/>
            </svg>
        `,
        'bold': `
            <svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" class="template-thumbnail">
                <rect width="100" height="140" fill="white"/>
                <rect x="0" y="0" width="15" height="140" fill="${colors.primary}"/>
                <rect x="20" y="10" width="70" height="6" fill="${colors.primary}" rx="2"/>
                <rect x="20" y="20" width="45" height="3" fill="${colors.accent}" opacity="0.7" rx="1.5"/>
                <rect x="20" y="30" width="70" height="2.5" fill="${colors.primary}" opacity="0.7" rx="1.25"/>
                <rect x="20" y="36" width="68" height="1.5" fill="#64748b" opacity="0.4" rx="0.75"/>
                <rect x="20" y="40" width="65" height="1.5" fill="#64748b" opacity="0.4" rx="0.75"/>
                <rect x="20" y="50" width="70" height="2.5" fill="${colors.primary}" opacity="0.7" rx="1.25"/>
                <rect x="20" y="56" width="60" height="1.5" fill="#64748b" opacity="0.4" rx="0.75"/>
            </svg>
        `,
        'timeline': `
            <svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" class="template-thumbnail">
                <rect width="100" height="140" fill="white"/>
                <rect x="10" y="10" width="80" height="4" fill="${colors.primary}" rx="2"/>
                <rect x="10" y="18" width="45" height="2" fill="${colors.accent}" opacity="0.6" rx="1"/>
                <line x1="15" y1="30" x2="15" y2="110" stroke="${colors.primary}" stroke-width="1" opacity="0.3"/>
                <circle cx="15" cy="30" r="3" fill="${colors.primary}"/>
                <rect x="22" y="28" width="25" height="2" fill="${colors.primary}" opacity="0.7" rx="1"/>
                <rect x="22" y="32" width="65" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
                <circle cx="15" cy="50" r="3" fill="${colors.accent}"/>
                <rect x="22" y="48" width="25" height="2" fill="${colors.primary}" opacity="0.7" rx="1"/>
                <rect x="22" y="52" width="60" height="1.2" fill="#64748b" opacity="0.3" rx="0.6"/>
                <circle cx="15" cy="70" r="3" fill="${colors.primary}" opacity="0.5"/>
            </svg>
        `
    };

    return thumbnails[templateId] || thumbnails['modern'];
}

// Initialize thumbnails on category pages
function initializeCategoryThumbnails() {
    const templateCards = document.querySelectorAll('.category-template-card');

    templateCards.forEach(card => {
        const templateId = card.getAttribute('data-template');
        const visualContainer = card.querySelector('.template-visual');

        if (visualContainer && templateId) {
            // Generate thumbnail with default colors
            const thumbnail = getTemplateThumbnail(templateId);
            visualContainer.innerHTML = thumbnail;
            visualContainer.classList.add('has-thumbnail');
        }
    });
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initializeCategoryThumbnails();
            initializePreviewModal();
        });
    } else {
        // DOM already loaded
        setTimeout(() => {
            initializeCategoryThumbnails();
            initializePreviewModal();
        }, 100);
    }
}

// ============================================
// PREVIEW MODAL SYSTEM
// ============================================

// Initialize preview modal
function initializePreviewModal() {
    // Create modal if it doesn't exist
    if (!document.getElementById('templatePreviewModal')) {
        const modalHTML = `
            <div id="templatePreviewModal" class="preview-modal">
                <div class="preview-modal-overlay" onclick="closePreviewModal()"></div>
                <div class="preview-modal-content">
                    <div class="preview-modal-header">
                        <h3 id="previewModalTitle">Template Preview</h3>
                        <button class="preview-modal-close" onclick="closePreviewModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="preview-modal-body">
                        <div id="previewModalTemplate" class="preview-template-container"></div>
                    </div>
                    <div class="preview-modal-footer">
                        <button class="btn btn-secondary" onclick="closePreviewModal()">
                            <i class="fas fa-times"></i> Close
                        </button>
                        <button id="usePreviewTemplate" class="btn btn-primary">
                            <i class="fas fa-edit"></i> Use This Template
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

// Open preview modal with template
function openPreviewModal(categoryId, templateId) {
    const modal = document.getElementById('templatePreviewModal');
    const container = document.getElementById('previewModalTemplate');
    const titleElement = document.getElementById('previewModalTitle');
    const useButton = document.getElementById('usePreviewTemplate');

    if (!modal || !container) return;

    // Get category data
    const category = getCategoryById(categoryId);
    const templateName = templateId.charAt(0).toUpperCase() + templateId.slice(1);

    // Update modal title
    if (titleElement) {
        titleElement.textContent = `${templateName} Template - ${category.name}`;
    }

    // Get example data
    let exampleData = null;
    if (typeof getCategoryExampleData === 'function') {
        exampleData = getCategoryExampleData(categoryId);
    }

    // Render template preview
    if (exampleData && typeof window.renderTemplatePreview === 'function') {
        // If renderTemplatePreview is available (from templates.js)
        container.innerHTML = `
            <div class="resume-preview-wrapper" data-template="${templateId}">
                ${window.renderTemplatePreview(templateId, exampleData)}
            </div>
        `;
    } else {
        // Fallback: show a message
        container.innerHTML = `
            <div class="preview-placeholder">
                <i class="fas fa-file-alt" style="font-size: 4rem; color: #94a3b8; margin-bottom: 1rem;"></i>
                <h3>Template Preview</h3>
                <p>Click "Use This Template" to see the full template with your data</p>
            </div>
        `;
    }

    // Set up use button
    if (useButton) {
        useButton.onclick = () => {
            closePreviewModal();
            if (typeof useTemplate === 'function') {
                useTemplate(categoryId, templateId);
            }
        };
    }

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close preview modal
function closePreviewModal() {
    const modal = document.getElementById('templatePreviewModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Make functions globally available
if (typeof window !== 'undefined') {
    window.openPreviewModal = openPreviewModal;
    window.closePreviewModal = closePreviewModal;

    // Global previewTemplate function (overrides inline versions)
    window.previewTemplate = function(categoryId, templateId) {
        openPreviewModal(categoryId, templateId);
    };
}

console.log(`Categories Loaded: ${getCategoryCount()} categories + Blank Template`);
