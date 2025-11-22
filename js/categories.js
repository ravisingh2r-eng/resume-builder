/* ============================================
   RESUME CATEGORIES & INDUSTRY TEMPLATES
   40+ High-Demand Categories with 5 Templates Each
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
        templates: ['modern', 'tech', 'ats', 'professional', 'creative'],
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
        templates: ['modern', 'tech', 'creative', 'ats', 'professional'],
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
        templates: ['tech', 'modern', 'ats', 'professional', 'creative'],
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
        templates: ['professional', 'ats', 'modern', 'tech', 'student'],
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
        templates: ['tech', 'professional', 'ats', 'modern', 'creative'],
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
        templates: ['ats', 'professional', 'modern', 'tech', 'student'],
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
        templates: ['creative', 'modern', 'professional', 'ats', 'tech'],
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
        templates: ['professional', 'tech', 'ats', 'modern', 'student'],
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
        templates: ['professional', 'tech', 'ats', 'modern', 'creative'],
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
        templates: ['professional', 'ats', 'tech', 'modern', 'student'],
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
        templates: ['professional', 'ats', 'modern', 'student', 'creative'],
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
        templates: ['professional', 'ats', 'modern', 'student', 'creative'],
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
        templates: ['professional', 'ats', 'modern', 'student', 'tech'],
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
        templates: ['professional', 'ats', 'modern', 'student', 'tech'],
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
        templates: ['professional', 'modern', 'ats', 'student', 'creative'],
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
        templates: ['creative', 'modern', 'professional', 'ats', 'tech'],
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
        templates: ['professional', 'modern', 'ats', 'creative', 'student'],
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
        templates: ['professional', 'ats', 'modern', 'tech', 'student'],
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
        templates: ['professional', 'modern', 'ats', 'creative', 'student'],
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
        templates: ['professional', 'ats', 'modern', 'tech', 'creative'],
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
        templates: ['modern', 'professional', 'tech', 'ats', 'creative'],
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
        templates: ['professional', 'ats', 'modern', 'tech', 'student'],
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
        templates: ['modern', 'professional', 'ats', 'creative', 'student'],
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
        templates: ['creative', 'modern', 'professional', 'ats', 'tech'],
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
        templates: ['creative', 'modern', 'professional', 'ats', 'student'],
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
        templates: ['creative', 'modern', 'tech', 'professional', 'ats'],
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
        templates: ['creative', 'modern', 'professional', 'ats', 'student'],
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
        templates: ['creative', 'tech', 'modern', 'professional', 'ats'],
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
        templates: ['professional', 'modern', 'ats', 'student', 'creative'],
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
        templates: ['professional', 'ats', 'modern', 'student', 'tech'],
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
        templates: ['professional', 'modern', 'ats', 'student', 'creative'],
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
        templates: ['professional', 'modern', 'ats', 'creative', 'tech'],
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
        templates: ['professional', 'ats', 'modern', 'tech', 'student'],
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
        templates: ['professional', 'ats', 'modern', 'student', 'tech'],
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
        templates: ['professional', 'ats', 'tech', 'modern', 'student'],
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
        templates: ['professional', 'ats', 'modern', 'tech', 'student'],
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
        templates: ['professional', 'ats', 'modern', 'tech', 'student'],
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
        templates: ['professional', 'ats', 'modern', 'student', 'tech'],
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
        templates: ['professional', 'ats', 'modern', 'tech', 'student'],
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
        templates: ['professional', 'ats', 'modern', 'student', 'tech'],
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
        templates: ['professional', 'ats', 'modern', 'tech', 'creative'],
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
        templates: ['professional', 'modern', 'ats', 'creative', 'student'],
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
        templates: ['creative', 'professional', 'modern', 'ats', 'student'],
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
        templates: ['creative', 'modern', 'professional', 'ats', 'student'],
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
        templates: ['modern', 'professional', 'ats', 'creative', 'student'],
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
        templates: ['professional', 'ats', 'modern', 'student', 'tech'],
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
        templates: ['professional', 'ats', 'modern', 'tech', 'student'],
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
        templates: ['professional', 'ats', 'modern', 'student', 'tech'],
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
        templates: ['student', 'modern', 'ats', 'professional', 'creative'],
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
        templates: ['student', 'modern', 'ats', 'professional', 'creative'],
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
        templates: ['student', 'modern', 'creative', 'ats', 'professional'],
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
        templates: ['creative', 'professional', 'ats', 'modern', 'tech'],
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
        templates: ['professional', 'modern', 'ats', 'creative', 'student'],
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
        templates: ['creative', 'modern', 'professional', 'ats', 'student'],
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
        templates: ['creative', 'modern', 'professional', 'ats', 'student'],
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
        templates: ['professional', 'modern', 'ats', 'student', 'creative'],
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
    templates: ['modern', 'ats', 'professional', 'creative', 'tech', 'student'],
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

console.log(`Categories Loaded: ${getCategoryCount()} categories + Blank Template`);
