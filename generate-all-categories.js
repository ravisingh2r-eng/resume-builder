#!/usr/bin/env node

/**
 * Comprehensive Category Pages Generator
 * Generates SEO-friendly pages for ALL 45+ categories
 */

const fs = require('fs');
const path = require('path');

// Complete list of all 45+ categories with SEO metadata
const ALL_CATEGORIES_DATA = {
    // TECHNOLOGY & IT
    'software-engineer': { name: 'Software Engineer', category: 'Technology & IT', icon: 'fa-code', demand: 'Very High', avgSalary: '₹8-25 LPA', description: 'Full-stack, Backend, Frontend developers building scalable applications', metaDescription: 'Create professional Software Engineer resume in 2 minutes. Choose from 10 ATS-friendly templates with pre-filled examples. Free download as PDF.', keywords: 'software engineer resume, developer resume, programming resume, tech resume, ATS resume', skills: ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'Git', 'AWS'] },
    'web-developer': { name: 'Web Developer', category: 'Technology & IT', icon: 'fa-laptop-code', demand: 'Very High', avgSalary: '₹6-18 LPA', description: 'Frontend and full-stack web developers creating responsive websites', metaDescription: 'Build professional Web Developer resume quickly. 10 modern templates with sample content. Free, ATS-friendly, and easy to customize.', keywords: 'web developer resume, frontend resume, HTML CSS resume, React developer resume', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Git', 'Responsive Design'] },
    'mobile-developer': { name: 'Mobile App Developer', category: 'Technology & IT', icon: 'fa-mobile-alt', demand: 'Very High', avgSalary: '₹7-20 LPA', description: 'Android and iOS developers building mobile applications', metaDescription: 'Create Mobile Developer resume in minutes. Professional templates for Android, iOS, React Native developers. Free PDF download.', keywords: 'mobile developer resume, android developer resume, ios developer resume, app developer resume', skills: ['Java', 'Kotlin', 'Swift', 'React Native', 'Flutter', 'Android Studio', 'Xcode', 'Git'] },
    'data-scientist': { name: 'Data Scientist', category: 'Technology & IT', icon: 'fa-chart-line', demand: 'Very High', avgSalary: '₹10-30 LPA', description: 'Data scientists building ML models and analyzing complex datasets', metaDescription: 'Professional Data Scientist resume templates with pre-filled examples. Showcase your ML, Python, and analytics skills effectively.', keywords: 'data scientist resume, machine learning resume, AI resume, analytics resume, python resume', skills: ['Python', 'R', 'Machine Learning', 'TensorFlow', 'SQL', 'Pandas', 'Statistics', 'Tableau'] },
    'devops-engineer': { name: 'DevOps Engineer', category: 'Technology & IT', icon: 'fa-server', demand: 'Very High', avgSalary: '₹8-25 LPA', description: 'DevOps engineers automating deployment pipelines and infrastructure', metaDescription: 'DevOps Engineer resume templates with CI/CD, Docker, Kubernetes examples. ATS-friendly. Free download.', keywords: 'devops resume, kubernetes resume, docker resume, cloud resume, automation resume', skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Terraform', 'CI/CD', 'Linux', 'Python'] },
    'qa-engineer': { name: 'QA Engineer', category: 'Technology & IT', icon: 'fa-bug', demand: 'High', avgSalary: '₹5-15 LPA', description: 'Quality assurance engineers ensuring software quality', metaDescription: 'QA Engineer resume templates highlighting testing skills, automation, and quality processes. Free PDF download.', keywords: 'qa engineer resume, test engineer resume, quality assurance resume, automation testing resume', skills: ['Manual Testing', 'Automation Testing', 'Selenium', 'JIRA', 'Test Plans', 'API Testing', 'Cypress'] },
    'uiux-designer': { name: 'UI/UX Designer', category: 'Technology & IT', icon: 'fa-palette', demand: 'Very High', avgSalary: '₹6-18 LPA', description: 'UI/UX designers creating user-centric interfaces', metaDescription: 'UI/UX Designer resume templates showcasing design thinking and user research skills. Modern templates.', keywords: 'ui ux designer resume, product designer resume, user experience resume, interface design resume', skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'] },
    'cybersecurity': { name: 'Cybersecurity Specialist', category: 'Technology & IT', icon: 'fa-shield-alt', demand: 'Very High', avgSalary: '₹8-28 LPA', description: 'Security professionals protecting systems and data', metaDescription: 'Cybersecurity resume templates highlighting penetration testing, security audits, and compliance skills.', keywords: 'cybersecurity resume, security engineer resume, ethical hacking resume, infosec resume', skills: ['Network Security', 'Penetration Testing', 'SIEM', 'Firewall', 'Compliance', 'Incident Response'] },
    'cloud-architect': { name: 'Cloud Architect', category: 'Technology & IT', icon: 'fa-cloud', demand: 'Very High', avgSalary: '₹12-35 LPA', description: 'Cloud architects designing scalable cloud solutions', metaDescription: 'Cloud Architect resume templates for AWS, Azure, GCP professionals. Highlight certifications and projects.', keywords: 'cloud architect resume, AWS resume, Azure resume, cloud engineer resume, solution architect resume', skills: ['AWS', 'Azure', 'GCP', 'Cloud Migration', 'Terraform', 'Architecture Design', 'Cost Optimization'] },
    'database-admin': { name: 'Database Administrator', category: 'Technology & IT', icon: 'fa-database', demand: 'High', avgSalary: '₹6-18 LPA', description: 'DBAs managing and optimizing database systems', metaDescription: 'Database Administrator resume templates for SQL, Oracle, MongoDB professionals. Free ATS-friendly templates.', keywords: 'database administrator resume, DBA resume, SQL resume, database engineer resume', skills: ['SQL', 'Oracle', 'PostgreSQL', 'MongoDB', 'Performance Tuning', 'Backup & Recovery', 'MySQL'] },

    // HEALTHCARE
    'doctor': { name: 'Doctor (MBBS, MD)', category: 'Healthcare', icon: 'fa-user-md', demand: 'Very High', avgSalary: '₹8-50 LPA', description: 'Medical professionals providing comprehensive patient care', metaDescription: 'Create professional Doctor resume/CV. Medical templates for MBBS, MD, specialists. ATS-friendly format. Free download.', keywords: 'doctor resume, medical resume, physician CV, MBBS resume, MD resume, hospital resume', skills: ['Patient Care', 'Diagnosis', 'Treatment', 'Medical Research', 'Clinical Skills', 'EMR'] },
    'nurse': { name: 'Nurse (RN, BSc Nursing)', category: 'Healthcare', icon: 'fa-heartbeat', demand: 'Very High', avgSalary: '₹3-10 LPA', description: 'Registered nurses providing patient care', metaDescription: 'Professional Nurse resume templates for RN, BSc Nursing. Healthcare-focused designs. Free download.', keywords: 'nurse resume, nursing resume, RN resume, healthcare resume, medical resume', skills: ['Patient Care', 'Clinical Skills', 'Medical Records', 'Emergency Care', 'IV Administration', 'Wound Care'] },
    'pharmacist': { name: 'Pharmacist', category: 'Healthcare', icon: 'fa-pills', demand: 'High', avgSalary: '₹3-10 LPA', description: 'Pharmacists dispensing medications and counseling patients', metaDescription: 'Pharmacist resume templates highlighting drug knowledge, patient counseling, and pharmacy management.', keywords: 'pharmacist resume, pharmacy resume, clinical pharmacist resume, retail pharmacy resume', skills: ['Drug Dispensing', 'Patient Counseling', 'Inventory Management', 'Pharmacy Software', 'Regulatory Compliance'] },
    'lab-technician': { name: 'Medical Lab Technician', category: 'Healthcare', icon: 'fa-microscope', demand: 'High', avgSalary: '₹2.5-8 LPA', description: 'Lab technicians conducting medical tests and analyses', metaDescription: 'Lab Technician resume templates for medical laboratory professionals. Highlight technical skills and certifications.', keywords: 'lab technician resume, medical lab resume, pathology resume, diagnostic resume', skills: ['Laboratory Testing', 'Sample Collection', 'Equipment Operation', 'Quality Control', 'Safety Protocols'] },
    'physiotherapist': { name: 'Physiotherapist', category: 'Healthcare', icon: 'fa-walking', demand: 'Medium', avgSalary: '₹3-10 LPA', description: 'Physiotherapists helping patients recover through therapy', metaDescription: 'Physiotherapist resume templates showcasing treatment techniques, patient outcomes, and certifications.', keywords: 'physiotherapist resume, physical therapy resume, rehabilitation resume, sports therapy resume', skills: ['Manual Therapy', 'Exercise Prescription', 'Patient Assessment', 'Rehabilitation', 'Sports Injuries'] },

    // BUSINESS & MANAGEMENT
    'digital-marketer': { name: 'Digital Marketing Specialist', category: 'Business & Management', icon: 'fa-bullhorn', demand: 'Very High', avgSalary: '₹4-15 LPA', description: 'Digital marketers driving online growth through SEO, SEM, and social media', metaDescription: 'Create winning Digital Marketing resume. 10 professional templates highlighting SEO, SEM, and social media skills. Free download.', keywords: 'digital marketing resume, SEO resume, social media marketing resume, marketing specialist resume', skills: ['SEO', 'SEM', 'Google Ads', 'Facebook Ads', 'Content Marketing', 'Analytics', 'Email Marketing'] },
    'sales-manager': { name: 'Sales Manager', category: 'Business & Management', icon: 'fa-handshake', demand: 'High', avgSalary: '₹5-20 LPA', description: 'Sales managers driving revenue and team performance', metaDescription: 'Sales Manager resume templates showcasing targets achieved and team leadership. Professional designs.', keywords: 'sales manager resume, sales executive resume, business development resume, account manager resume', skills: ['Sales Strategy', 'Team Management', 'CRM', 'Negotiation', 'Client Relations', 'Revenue Growth'] },
    'business-analyst': { name: 'Business Analyst', category: 'Business & Management', icon: 'fa-chart-bar', demand: 'Very High', avgSalary: '₹6-18 LPA', description: 'Business analysts bridging business needs and IT solutions', metaDescription: 'Business Analyst resume templates with requirements gathering, data analysis, and stakeholder management examples.', keywords: 'business analyst resume, BA resume, requirements analyst resume, data analyst resume', skills: ['Requirements Gathering', 'Data Analysis', 'SQL', 'Stakeholder Management', 'Process Mapping', 'JIRA'] },
    'hr-manager': { name: 'HR Manager', category: 'Business & Management', icon: 'fa-users', demand: 'High', avgSalary: '₹5-18 LPA', description: 'HR managers handling recruitment and employee relations', metaDescription: 'HR Manager resume templates highlighting recruitment, employee engagement, and HRIS skills.', keywords: 'hr manager resume, human resources resume, recruitment resume, talent acquisition resume', skills: ['Recruitment', 'Employee Relations', 'HRIS', 'Performance Management', 'Training', 'Policy Development'] },
    'project-manager': { name: 'Project Manager', category: 'Business & Management', icon: 'fa-tasks', demand: 'Very High', avgSalary: '₹8-25 LPA', description: 'Project managers leading cross-functional teams', metaDescription: 'Project Manager resume templates showcasing Agile, Scrum, and PMP certifications. Professional format.', keywords: 'project manager resume, program manager resume, agile resume, scrum master resume, PMP resume', skills: ['Project Management', 'Agile', 'Scrum', 'Risk Management', 'Stakeholder Management', 'JIRA'] },
    'product-manager': { name: 'Product Manager', category: 'Business & Management', icon: 'fa-cube', demand: 'Very High', avgSalary: '₹10-30 LPA', description: 'Product managers defining vision and roadmap', metaDescription: 'Product Manager resume templates highlighting product strategy, user research, and metrics. Modern designs.', keywords: 'product manager resume, PM resume, product owner resume, product lead resume', skills: ['Product Strategy', 'User Research', 'Roadmap Planning', 'Data Analysis', 'A/B Testing', 'Agile'] },
    'operations-manager': { name: 'Operations Manager', category: 'Business & Management', icon: 'fa-cogs', demand: 'High', avgSalary: '₹6-20 LPA', description: 'Operations managers optimizing processes and efficiency', metaDescription: 'Operations Manager resume templates showcasing process improvement, supply chain, and team management.', keywords: 'operations manager resume, ops manager resume, supply chain resume, logistics resume', skills: ['Operations Management', 'Process Improvement', 'Supply Chain', 'Budgeting', 'Team Leadership'] },
    'customer-success': { name: 'Customer Success Manager', category: 'Business & Management', icon: 'fa-user-check', demand: 'High', avgSalary: '₹5-18 LPA', description: 'CSMs ensuring customer satisfaction and retention', metaDescription: 'Customer Success Manager resume templates highlighting retention rates, customer satisfaction, and account growth.', keywords: 'customer success resume, CSM resume, account manager resume, client success resume', skills: ['Customer Retention', 'Relationship Management', 'CRM', 'Product Knowledge', 'Communication', 'Analytics'] },

    // CREATIVE & DESIGN
    'graphic-designer': { name: 'Graphic Designer', category: 'Creative & Design', icon: 'fa-paint-brush', demand: 'High', avgSalary: '₹3-12 LPA', description: 'Creative designers crafting visual content and brand identities', metaDescription: 'Professional Graphic Designer resume templates showcasing your creative portfolio. Modern, visual designs. Free PDF download.', keywords: 'graphic designer resume, creative resume, design resume, portfolio resume, adobe resume', skills: ['Adobe Photoshop', 'Illustrator', 'Figma', 'Branding', 'Typography', 'UI/UX', 'Print Design'] },
    'content-writer': { name: 'Content Writer', category: 'Creative & Design', icon: 'fa-pen-fancy', demand: 'High', avgSalary: '₹3-10 LPA', description: 'Content writers creating engaging written content', metaDescription: 'Content Writer resume templates highlighting writing portfolio and SEO skills. Creative designs.', keywords: 'content writer resume, copywriter resume, technical writer resume, blog writer resume', skills: ['Content Writing', 'SEO Writing', 'Copywriting', 'Research', 'Editing', 'CMS', 'WordPress'] },
    'video-editor': { name: 'Video Editor', category: 'Creative & Design', icon: 'fa-film', demand: 'High', avgSalary: '₹3-12 LPA', description: 'Video editors creating compelling visual stories', metaDescription: 'Video Editor resume templates showcasing editing portfolio, software proficiency, and creative projects.', keywords: 'video editor resume, video production resume, motion graphics resume, premiere pro resume', skills: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Color Grading', 'Motion Graphics'] },
    'photographer': { name: 'Photographer', category: 'Creative & Design', icon: 'fa-camera', demand: 'Medium', avgSalary: '₹2.5-10 LPA', description: 'Photographers capturing moments and creating visual art', metaDescription: 'Photographer resume templates highlighting portfolio, equipment expertise, and client projects.', keywords: 'photographer resume, photography resume, creative portfolio resume, visual artist resume', skills: ['Photography', 'Adobe Lightroom', 'Photoshop', 'Composition', 'Lighting', 'Photo Editing'] },
    '3d-animator': { name: '3D Animator', category: 'Creative & Design', icon: 'fa-cube', demand: 'High', avgSalary: '₹4-15 LPA', description: '3D animators creating visual effects and animations', metaDescription: '3D Animator resume templates showcasing animation portfolio, software skills, and creative projects.', keywords: '3d animator resume, animator resume, VFX resume, motion graphics resume, maya resume', skills: ['Maya', 'Blender', '3ds Max', 'Animation', 'Modeling', 'Rigging', 'After Effects'] },

    // EDUCATION
    'teacher': { name: 'Teacher', category: 'Education', icon: 'fa-chalkboard-teacher', demand: 'High', avgSalary: '₹3-10 LPA', description: 'Educators teaching and mentoring students', metaDescription: 'Professional Teacher resume templates. Highlight teaching experience, certifications, and methodologies. Free download.', keywords: 'teacher resume, educator resume, teaching resume, school teacher CV, professor resume', skills: ['Classroom Management', 'Curriculum Design', 'Student Assessment', 'Communication', 'Educational Technology'] },
    'professor': { name: 'Professor / Lecturer', category: 'Education', icon: 'fa-university', demand: 'Medium', avgSalary: '₹5-20 LPA', description: 'University professors teaching and conducting research', metaDescription: 'Professor resume templates for academic positions. Highlight publications, research, and teaching experience.', keywords: 'professor resume, lecturer CV, academic resume, university professor resume, PhD resume', skills: ['Research', 'Academic Writing', 'Teaching', 'Mentoring', 'Publication', 'Grant Writing'] },
    'counselor': { name: 'Career Counselor', category: 'Education', icon: 'fa-comments', demand: 'Medium', avgSalary: '₹3-10 LPA', description: 'Counselors guiding students and professionals', metaDescription: 'Career Counselor resume templates highlighting counseling techniques, student success, and career guidance.', keywords: 'career counselor resume, guidance counselor resume, student counselor resume, therapist resume', skills: ['Career Guidance', 'Counseling', 'Assessment', 'Communication', 'Empathy', 'Psychology'] },
    'corporate-trainer': { name: 'Corporate Trainer', category: 'Education', icon: 'fa-user-tie', demand: 'Medium', avgSalary: '₹4-15 LPA', description: 'Corporate trainers conducting employee training programs', metaDescription: 'Corporate Trainer resume templates showcasing training programs, employee development, and facilitation skills.', keywords: 'corporate trainer resume, training specialist resume, L&D resume, instructional designer resume', skills: ['Training Delivery', 'Instructional Design', 'Facilitation', 'E-Learning', 'Assessment', 'Presentation'] },

    // ENGINEERING
    'mechanical-engineer': { name: 'Mechanical Engineer', category: 'Engineering', icon: 'fa-cog', demand: 'High', avgSalary: '₹4-15 LPA', description: 'Mechanical engineers designing and manufacturing products', metaDescription: 'Mechanical Engineer resume templates highlighting CAD, design, and manufacturing skills.', keywords: 'mechanical engineer resume, engineering resume, CAD resume, design engineer resume', skills: ['CAD', 'SolidWorks', 'AutoCAD', 'Manufacturing', 'Product Design', 'FEA', 'Quality Control'] },
    'civil-engineer': { name: 'Civil Engineer', category: 'Engineering', icon: 'fa-hard-hat', demand: 'High', avgSalary: '₹4-15 LPA', description: 'Civil engineers managing construction and infrastructure projects', metaDescription: 'Civil Engineer resume templates for construction, site management, and structural design roles.', keywords: 'civil engineer resume, construction resume, site engineer resume, structural engineer resume', skills: ['AutoCAD', 'Site Management', 'Project Planning', 'Structural Design', 'Estimation', 'Quality Control'] },
    'electrical-engineer': { name: 'Electrical Engineer', category: 'Engineering', icon: 'fa-bolt', demand: 'High', avgSalary: '₹4-15 LPA', description: 'Electrical engineers designing electrical systems', metaDescription: 'Electrical Engineer resume templates highlighting circuit design, power systems, and automation skills.', keywords: 'electrical engineer resume, electronics resume, power systems resume, automation resume', skills: ['Circuit Design', 'AutoCAD Electrical', 'PLC', 'Power Systems', 'Control Systems', 'Troubleshooting'] },
    'chemical-engineer': { name: 'Chemical Engineer', category: 'Engineering', icon: 'fa-flask', demand: 'Medium', avgSalary: '₹4-15 LPA', description: 'Chemical engineers designing chemical processes', metaDescription: 'Chemical Engineer resume templates for process engineering, R&D, and manufacturing roles.', keywords: 'chemical engineer resume, process engineer resume, chemical process resume, R&D engineer resume', skills: ['Process Design', 'Chemical Engineering', 'Process Simulation', 'Safety', 'R&D', 'Quality Control'] },
    'biomedical-engineer': { name: 'Biomedical Engineer', category: 'Engineering', icon: 'fa-dna', demand: 'Medium', avgSalary: '₹4-15 LPA', description: 'Biomedical engineers developing medical devices', metaDescription: 'Biomedical Engineer resume templates highlighting medical device design, regulatory compliance, and testing.', keywords: 'biomedical engineer resume, medical device resume, healthcare engineering resume', skills: ['Medical Device Design', 'Regulatory Compliance', 'Testing', 'CAD', 'Biomechanics', 'Quality Assurance'] },

    // FINANCE & ACCOUNTING
    'accountant': { name: 'Accountant', category: 'Finance & Accounting', icon: 'fa-calculator', demand: 'High', avgSalary: '₹3-12 LPA', description: 'Accountants managing financial records and compliance', metaDescription: 'Professional Accountant resume templates. Highlight Tally, GST, and accounting skills. ATS-friendly.', keywords: 'accountant resume, accounting resume, finance resume, tally resume, GST resume', skills: ['Tally', 'GST', 'Accounting', 'Excel', 'Financial Reporting', 'Taxation', 'Auditing'] },
    'financial-analyst': { name: 'Financial Analyst', category: 'Finance & Accounting', icon: 'fa-chart-pie', demand: 'High', avgSalary: '₹5-18 LPA', description: 'Financial analysts providing insights and forecasting', metaDescription: 'Financial Analyst resume templates showcasing financial modeling, analysis, and forecasting skills.', keywords: 'financial analyst resume, finance analyst resume, investment analyst resume, equity research resume', skills: ['Financial Modeling', 'Excel', 'Data Analysis', 'Forecasting', 'Valuation', 'SQL', 'PowerPoint'] },
    'chartered-accountant': { name: 'Chartered Accountant (CA)', category: 'Finance & Accounting', icon: 'fa-file-invoice-dollar', demand: 'Very High', avgSalary: '₹8-30 LPA', description: 'Chartered accountants providing audit and tax services', metaDescription: 'CA resume templates for Chartered Accountants. Highlight articleship, certifications, and expertise.', keywords: 'CA resume, chartered accountant resume, audit resume, tax consultant resume, ICAI resume', skills: ['Auditing', 'Taxation', 'GST', 'Financial Reporting', 'Compliance', 'Tally', 'SAP'] },
    'investment-banker': { name: 'Investment Banker', category: 'Finance & Accounting', icon: 'fa-briefcase', demand: 'High', avgSalary: '₹10-50 LPA', description: 'Investment bankers managing M&A and capital raising', metaDescription: 'Investment Banker resume templates highlighting M&A, financial modeling, and deal execution.', keywords: 'investment banker resume, investment banking resume, M&A resume, corporate finance resume', skills: ['Financial Modeling', 'Valuation', 'M&A', 'DCF', 'Deal Execution', 'Excel', 'PowerPoint'] },

    // HOSPITALITY & TOURISM
    'hotel-manager': { name: 'Hotel Manager', category: 'Hospitality & Tourism', icon: 'fa-hotel', demand: 'Medium', avgSalary: '₹4-15 LPA', description: 'Hotel managers overseeing operations and guest services', metaDescription: 'Hotel Manager resume templates highlighting operations, guest services, and hospitality management.', keywords: 'hotel manager resume, hospitality manager resume, front office manager resume, hotel resume', skills: ['Hotel Operations', 'Guest Services', 'Revenue Management', 'Staff Training', 'Event Management'] },
    'chef': { name: 'Chef', category: 'Hospitality & Tourism', icon: 'fa-utensils', demand: 'Medium', avgSalary: '₹3-12 LPA', description: 'Professional chefs creating culinary experiences', metaDescription: 'Chef resume templates showcasing culinary skills, cuisine expertise, and kitchen management.', keywords: 'chef resume, cook resume, culinary resume, kitchen manager resume, hospitality resume', skills: ['Culinary Arts', 'Menu Planning', 'Food Safety', 'Kitchen Management', 'Inventory Management', 'Creativity'] },
    'event-manager': { name: 'Event Manager', category: 'Hospitality & Tourism', icon: 'fa-calendar-check', demand: 'Medium', avgSalary: '₹4-12 LPA', description: 'Event managers planning and executing events', metaDescription: 'Event Manager resume templates highlighting event planning, vendor management, and successful events.', keywords: 'event manager resume, event planner resume, wedding planner resume, event coordinator resume', skills: ['Event Planning', 'Vendor Management', 'Budgeting', 'Project Management', 'Coordination', 'Creativity'] },
    'travel-consultant': { name: 'Travel Consultant', category: 'Hospitality & Tourism', icon: 'fa-plane', demand: 'Medium', avgSalary: '₹2.5-8 LPA', description: 'Travel consultants planning trips and tours', metaDescription: 'Travel Consultant resume templates showcasing destination knowledge, booking systems, and customer service.', keywords: 'travel consultant resume, travel agent resume, tour operator resume, tourism resume', skills: ['Travel Planning', 'Booking Systems', 'Destination Knowledge', 'Customer Service', 'Sales'] },

    // LEGAL & GOVERNMENT
    'lawyer': { name: 'Lawyer / Advocate', category: 'Legal & Government', icon: 'fa-gavel', demand: 'High', avgSalary: '₹5-30 LPA', description: 'Lawyers providing legal counsel and representation', metaDescription: 'Professional Lawyer resume templates. Highlight case wins, legal expertise, and LLB credentials.', keywords: 'lawyer resume, advocate resume, legal resume, attorney CV, law resume', skills: ['Legal Research', 'Court Representation', 'Contract Law', 'Litigation', 'Legal Writing', 'Client Counseling'] },
    'legal-advisor': { name: 'Legal Advisor', category: 'Legal & Government', icon: 'fa-balance-scale', demand: 'High', avgSalary: '₹5-20 LPA', description: 'Legal advisors providing corporate legal guidance', metaDescription: 'Legal Advisor resume templates highlighting corporate law, compliance, and contract management.', keywords: 'legal advisor resume, corporate lawyer resume, legal counsel resume, compliance resume', skills: ['Corporate Law', 'Contract Management', 'Compliance', 'Legal Drafting', 'Risk Assessment'] },
    'government-officer': { name: 'Government Officer (IAS/IPS)', category: 'Legal & Government', icon: 'fa-landmark', demand: 'High', avgSalary: '₹8-25 LPA', description: 'Government officers serving in civil services', metaDescription: 'Government Officer resume templates for IAS, IPS, and civil services. Highlight administrative experience.', keywords: 'government officer resume, IAS resume, IPS resume, civil services resume, administrative resume', skills: ['Public Administration', 'Policy Making', 'Leadership', 'Governance', 'Law Enforcement'] },

    // STUDENT & ENTRY LEVEL
    'fresher': { name: 'Fresher / Recent Graduate', category: 'Student & Entry Level', icon: 'fa-graduation-cap', demand: 'High', avgSalary: '₹2.5-6 LPA', description: 'Recent graduates seeking entry-level positions', metaDescription: 'Fresher resume templates for recent graduates. Highlight education, projects, and skills effectively. Free, ATS-friendly templates.', keywords: 'fresher resume, recent graduate resume, entry level resume, college student resume, beginner resume', skills: ['Quick Learner', 'Team Player', 'Problem Solving', 'Communication', 'MS Office', 'Time Management'] },
    'intern': { name: 'Internship', category: 'Student & Entry Level', icon: 'fa-user-graduate', demand: 'High', avgSalary: '₹10k-25k/month', description: 'Students seeking internship opportunities', metaDescription: 'Internship resume templates for students. Showcase your skills, projects, and academic achievements. Free download.', keywords: 'internship resume, student resume, intern CV, summer internship resume, college intern resume', skills: ['Eager to Learn', 'Academic Projects', 'Technical Skills', 'Communication', 'Research'] },
    'college-student': { name: 'College Student', category: 'Student & Entry Level', icon: 'fa-user-graduate', demand: 'Medium', avgSalary: 'Entry Level', description: 'College students building their first resume', metaDescription: 'College Student resume templates highlighting education, extracurriculars, and skills. Perfect for first resume.', keywords: 'college student resume, student CV, university student resume, academic resume', skills: ['Academic Excellence', 'Leadership', 'Team Work', 'Communication', 'Organization'] },

    // OTHER PROFESSIONS
    'architect': { name: 'Architect', category: 'Other Professions', icon: 'fa-drafting-compass', demand: 'Medium', avgSalary: '₹4-18 LPA', description: 'Architects designing buildings and structures', metaDescription: 'Architect resume templates showcasing design portfolio, AutoCAD, and project management skills.', keywords: 'architect resume, architectural resume, design resume, AutoCAD resume, building design resume', skills: ['AutoCAD', 'Revit', 'SketchUp', 'Building Design', 'Project Management', '3D Modeling', 'Site Planning'] },
    'real-estate-agent': { name: 'Real Estate Agent', category: 'Other Professions', icon: 'fa-home', demand: 'Medium', avgSalary: '₹3-15 LPA', description: 'Real estate agents selling and leasing properties', metaDescription: 'Real Estate Agent resume templates highlighting sales achievements, property knowledge, and client management.', keywords: 'real estate agent resume, property agent resume, realtor resume, real estate sales resume', skills: ['Property Sales', 'Client Relations', 'Negotiation', 'Market Analysis', 'CRM', 'Communication'] },
    'fashion-designer': { name: 'Fashion Designer', category: 'Other Professions', icon: 'fa-tshirt', demand: 'Medium', avgSalary: '₹3-12 LPA', description: 'Fashion designers creating clothing and accessories', metaDescription: 'Fashion Designer resume templates showcasing design portfolio, fashion trends, and creative projects.', keywords: 'fashion designer resume, designer resume, fashion portfolio resume, apparel designer resume', skills: ['Fashion Design', 'Sketching', 'Pattern Making', 'Textile Knowledge', 'Adobe Illustrator', 'Trend Analysis'] },
    'journalist': { name: 'Journalist', category: 'Other Professions', icon: 'fa-newspaper', demand: 'Medium', avgSalary: '₹3-12 LPA', description: 'Journalists reporting news and creating content', metaDescription: 'Journalist resume templates highlighting writing portfolio, reporting skills, and media experience.', keywords: 'journalist resume, reporter resume, media resume, news reporter resume, writer resume', skills: ['News Reporting', 'Writing', 'Research', 'Interviewing', 'Editing', 'Media Ethics'] },
    'social-worker': { name: 'Social Worker', category: 'Other Professions', icon: 'fa-hands-helping', demand: 'Medium', avgSalary: '₹2.5-8 LPA', description: 'Social workers helping communities and individuals', metaDescription: 'Social Worker resume templates highlighting community work, counseling, and program management.', keywords: 'social worker resume, community worker resume, NGO resume, counselor resume', skills: ['Community Outreach', 'Counseling', 'Case Management', 'Program Development', 'Advocacy', 'Empathy'] }
};

// Template styles (10 variations)
const TEMPLATE_STYLES = [
    { id: 'modern', name: 'Modern Professional', description: 'Clean and contemporary design with modern fonts' },
    { id: 'ats', name: 'ATS-Friendly', description: 'Optimized for applicant tracking systems' },
    { id: 'professional', name: 'Classic Professional', description: 'Traditional and formal layout' },
    { id: 'creative', name: 'Creative Bold', description: 'Eye-catching design for creative roles' },
    { id: 'tech', name: 'Tech Minimalist', description: 'Modern minimalist for tech professionals' },
    { id: 'executive', name: 'Executive Premium', description: 'Premium design for senior-level roles' },
    { id: 'student', name: 'Fresh Graduate', description: 'Perfect for students and freshers' },
    { id: 'compact', name: 'Compact Single Page', description: 'Everything fits in one clean page' },
    { id: 'timeline', name: 'Timeline Style', description: 'Career progression timeline focused' },
    { id: 'infographic', name: 'Visual Infographic', description: 'Charts, graphs, and visual elements' }
];

/**
 * Generate category page HTML
 */
function generateCategoryPageHTML(categoryId, categoryData) {
    const { name, category, description, metaDescription, keywords, avgSalary, demand, skills, icon } = categoryData;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- SEO Meta Tags -->
    <title>${name} Resume Templates - Free Download | Professional ${name} CV 2025</title>
    <meta name="description" content="${metaDescription}">
    <meta name="keywords" content="${keywords}">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Resume Builder">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${name} Resume Templates - Free Download 2025">
    <meta property="og:description" content="${metaDescription}">
    <meta property="og:url" content="https://yoursite.com/categories/${categoryId}.html">
    <meta property="og:image" content="https://yoursite.com/assets/images/og-${categoryId}.jpg">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${name} Resume Templates">
    <meta name="twitter:description" content="${metaDescription}">

    <!-- Canonical URL -->
    <link rel="canonical" href="https://yoursite.com/categories/${categoryId}.html">

    <!-- Structured Data / Schema.org -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "${name} Resume Templates",
        "description": "${metaDescription}",
        "url": "https://yoursite.com/categories/${categoryId}.html",
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
                    "item": "https://yoursite.com/categories/${categoryId}.html"
                }
            ]
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
        }
    }
    </script>

    <!-- Stylesheets -->
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/templates.css">
    <link rel="stylesheet" href="../css/themes.css">
    <link rel="stylesheet" href="../css/category-pages.css">
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
                <a href="../index.html" class="logo">
                    <i class="fas fa-file-alt"></i>
                    <span>Resume Builder</span>
                </a>
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
            <a href="../index.html"><i class="fas fa-home"></i> Home</a>
            <i class="fas fa-chevron-right"></i>
            <a href="./index.html">Categories</a>
            <i class="fas fa-chevron-right"></i>
            <span>${name}</span>
        </div>
    </div>

    <!-- Category Hero Section -->
    <section class="category-hero-section">
        <div class="container">
            <div class="category-hero-grid">
                <div class="category-hero-content">
                    <h1 class="category-title">${name} Resume Templates</h1>
                    <p class="category-description">${description}</p>

                    <div class="category-stats-badges">
                        <div class="stat-badge-item stat-demand">
                            <i class="fas fa-fire"></i>
                            <div class="stat-badge-content">
                                <span class="stat-label">Market Demand</span>
                                <strong class="stat-value">${demand}</strong>
                            </div>
                        </div>
                        <div class="stat-badge-item stat-salary">
                            <i class="fas fa-rupee-sign"></i>
                            <div class="stat-badge-content">
                                <span class="stat-label">Average Salary</span>
                                <strong class="stat-value">${avgSalary}</strong>
                            </div>
                        </div>
                        <div class="stat-badge-item stat-templates">
                            <i class="fas fa-file-alt"></i>
                            <div class="stat-badge-content">
                                <span class="stat-label">Templates Available</span>
                                <strong class="stat-value">10 Designs</strong>
                            </div>
                        </div>
                    </div>

                    <div class="category-cta-buttons">
                        <button class="btn btn-primary btn-lg" onclick="scrollToTemplates()">
                            <i class="fas fa-arrow-down"></i>
                            Browse Templates
                        </button>
                        <button class="btn btn-secondary btn-lg" onclick="window.location.href='./index.html'">
                            <i class="fas fa-th"></i>
                            All Categories
                        </button>
                    </div>
                </div>

                <div class="category-hero-visual">
                    <div class="category-icon-display">
                        <i class="fas ${icon}"></i>
                    </div>
                </div>
            </div>

            <!-- Key Skills Section -->
            <div class="key-skills-section">
                <h3 class="skills-heading">
                    <i class="fas fa-star"></i>
                    Key Skills to Highlight in Your ${name} Resume
                </h3>
                <div class="skills-tags-grid">
                    ${skills.map(skill => `<span class="skill-tag-display">${skill}</span>`).join('')}
                </div>
            </div>
        </div>
    </section>

    <!-- Templates Grid Section -->
    <section class="category-templates-section" id="templates">
        <div class="container">
            <h2 class="section-title">10 Professional ${name} Resume Templates</h2>
            <p class="section-subtitle">All templates include pre-filled ${name} examples. Click "Use Template" to customize in 2 minutes!</p>

            <div class="category-templates-grid">
                ${TEMPLATE_STYLES.map((template, index) => `
                <div class="category-template-card" data-template="${template.id}" data-category="${categoryId}">
                    <div class="template-card-preview">
                        <div class="template-visual">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <span class="template-number">Template ${index + 1}</span>
                        ${index < 3 ? '<span class="popular-badge">Most Popular</span>' : ''}
                    </div>
                    <div class="template-card-content">
                        <h3 class="template-card-title">${template.name}</h3>
                        <p class="template-card-description">${template.description}</p>
                        <button class="btn btn-primary btn-block" onclick="useTemplate('${categoryId}', '${template.id}')">
                            <i class="fas fa-edit"></i>
                            Use This Template
                        </button>
                        <button class="btn btn-secondary-outline btn-block btn-sm" onclick="previewTemplate('${categoryId}', '${template.id}')">
                            <i class="fas fa-eye"></i>
                            Preview
                        </button>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Quick Tips Section -->
    <section class="category-tips-section">
        <div class="container">
            <h2 class="section-title">
                <i class="fas fa-lightbulb"></i>
                Expert Tips for Your ${name} Resume
            </h2>
            <div class="tips-grid-layout">
                <div class="tip-card-item tip-highlight">
                    <div class="tip-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h4>Highlight Relevant Skills</h4>
                    <p>Focus on ${skills.slice(0, 3).join(', ')} and other industry-specific skills. Use these keywords to pass ATS screening.</p>
                </div>
                <div class="tip-card-item tip-metrics">
                    <div class="tip-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h4>Quantify Your Achievements</h4>
                    <p>Use numbers, percentages, and metrics. For example: "Increased efficiency by 30%" or "Managed team of 10 people".</p>
                </div>
                <div class="tip-card-item tip-concise">
                    <div class="tip-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <h4>Keep It Concise</h4>
                    <p>1-2 pages maximum. Focus on your most recent and relevant experience. Recruiters spend only 6 seconds on initial scan.</p>
                </div>
                <div class="tip-card-item tip-ats">
                    <div class="tip-icon">
                        <i class="fas fa-robot"></i>
                    </div>
                    <h4>Make It ATS-Friendly</h4>
                    <p>Use standard fonts (Arial, Calibri, Times New Roman), avoid images in main content, and use clear section headings.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works-section">
        <div class="container">
            <h2 class="section-title">How to Create Your ${name} Resume in 2 Minutes</h2>
            <div class="steps-grid">
                <div class="step-item">
                    <div class="step-number">1</div>
                    <i class="fas fa-mouse-pointer step-icon"></i>
                    <h4>Choose Template</h4>
                    <p>Select from 10 professional designs above</p>
                </div>
                <div class="step-arrow"><i class="fas fa-arrow-right"></i></div>
                <div class="step-item">
                    <div class="step-number">2</div>
                    <i class="fas fa-edit step-icon"></i>
                    <h4>Edit Content</h4>
                    <p>Customize pre-filled examples with your details</p>
                </div>
                <div class="step-arrow"><i class="fas fa-arrow-right"></i></div>
                <div class="step-item">
                    <div class="step-number">3</div>
                    <i class="fas fa-download step-icon"></i>
                    <h4>Download</h4>
                    <p>Export as PDF and start applying</p>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="category-faq-section">
        <div class="container">
            <h2 class="section-title">
                <i class="fas fa-question-circle"></i>
                Frequently Asked Questions
            </h2>
            <div class="faq-grid">
                <div class="faq-item-card">
                    <h4>Are these ${name} resume templates really free?</h4>
                    <p>Yes! All 10 templates are completely free to use and download as PDF. No hidden charges or watermarks.</p>
                </div>
                <div class="faq-item-card">
                    <h4>Can I customize the pre-filled content?</h4>
                    <p>Absolutely! The pre-filled content is just an example. You can edit everything - text, formatting, colors, and sections.</p>
                </div>
                <div class="faq-item-card">
                    <h4>Are these templates ATS-friendly?</h4>
                    <p>Yes! All our templates are designed to pass Applicant Tracking Systems (ATS) used by companies for screening resumes.</p>
                </div>
                <div class="faq-item-card">
                    <h4>How quickly can I create my resume?</h4>
                    <p>With our pre-filled examples, you can customize and download your ${name} resume in just 2-3 minutes!</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>Resume Builder</h4>
                    <p>Create professional resumes in minutes. Free, fast, and ATS-friendly.</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="../index.html">Home</a></li>
                        <li><a href="./index.html">All Categories</a></li>
                        <li><a href="../index.html#templates">Templates</a></li>
                        <li><a href="../index.html#features">Features</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Popular Categories</h4>
                    <ul>
                        <li><a href="./software-engineer.html">Software Engineer</a></li>
                        <li><a href="./web-developer.html">Web Developer</a></li>
                        <li><a href="./digital-marketer.html">Digital Marketer</a></li>
                        <li><a href="./graphic-designer.html">Graphic Designer</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
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
            } else {
                alert('Example data not available. Redirecting to editor with blank template.');
                localStorage.setItem('selectedTemplate', templateId);
                window.location.href = '../index.html#editor';
            }
        }

        function previewTemplate(categoryId, templateId) {
            // TODO: Open preview modal
            alert('Preview feature coming soon! Click "Use This Template" to start editing.');
        }

        function scrollToTemplates() {
            document.getElementById('templates').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function toggleMobileMenu() {
            const nav = document.querySelector('.nav');
            nav.classList.toggle('active');
        }
    </script>
</body>
</html>`;
}

/**
 * Generate categories index page
 */
function generateCategoriesIndexHTML() {
    const categoryTypes = {
        'Technology & IT': [],
        'Healthcare': [],
        'Business & Management': [],
        'Creative & Design': [],
        'Education': [],
        'Engineering': [],
        'Finance & Accounting': [],
        'Hospitality & Tourism': [],
        'Legal & Government': [],
        'Student & Entry Level': [],
        'Other Professions': []
    };

    // Group categories by type
    for (const [id, cat] of Object.entries(ALL_CATEGORIES_DATA)) {
        if (categoryTypes[cat.category]) {
            categoryTypes[cat.category].push({ id, ...cat });
        }
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>45+ Resume Categories - Professional Resume Templates for Every Career</title>
    <meta name="description" content="Browse 45+ professional resume categories. Find industry-specific templates with pre-filled examples. Software Engineer, Doctor, Digital Marketer, and more. Free download.">
    <meta name="keywords" content="resume categories, professional resume templates, career resumes, industry-specific resumes, ATS-friendly templates">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/category-pages.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-content">
                <a href="../index.html" class="logo">
                    <i class="fas fa-file-alt"></i>
                    <span>Resume Builder</span>
                </a>
                <nav class="nav">
                    <a href="../index.html">Home</a>
                    <a href="../index.html#templates">Templates</a>
                    <a href="../index.html#features">Features</a>
                    <a href="./index.html" class="active">Categories</a>
                </nav>
            </div>
        </div>
    </header>

    <section class="page-hero">
        <div class="container">
            <h1 class="page-title">Browse All Resume Categories</h1>
            <p class="page-subtitle">45+ professional categories with 10 templates each - Find your perfect match!</p>
        </div>
    </section>

    <section class="categories-listing">
        <div class="container">
            ${Object.entries(categoryTypes).map(([typeName, categories]) => `
                ${categories.length > 0 ? `
                <div class="category-type-section">
                    <h2 class="category-type-heading">
                        <i class="fas fa-folder"></i>
                        ${typeName}
                        <span class="count-badge">${categories.length} Categories</span>
                    </h2>
                    <div class="categories-index-grid">
                        ${categories.map(cat => `
                        <a href="./${cat.id}.html" class="category-index-card">
                            <div class="category-card-icon">
                                <i class="fas ${cat.icon}"></i>
                            </div>
                            <h3 class="category-card-title">${cat.name}</h3>
                            <div class="category-card-meta">
                                <span class="salary-badge">
                                    <i class="fas fa-rupee-sign"></i>
                                    ${cat.avgSalary}
                                </span>
                                <span class="demand-badge demand-${cat.demand.toLowerCase().replace(' ', '-')}">
                                    <i class="fas fa-fire"></i>
                                    ${cat.demand}
                                </span>
                            </div>
                            <p class="category-card-desc">${cat.description}</p>
                            <span class="templates-count">10 Templates Available</span>
                        </a>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            `).join('')}
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <div class="footer-bottom">
                <p>&copy; 2025 Resume Builder. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;
}

/**
 * Main function
 */
function main() {
    const categoriesDir = path.join(__dirname, 'categories');

    // Create categories directory
    if (!fs.existsSync(categoriesDir)) {
        fs.mkdirSync(categoriesDir, { recursive: true });
    }

    console.log('🚀 Generating SEO-friendly category pages...\n');

    let count = 0;

    // Generate individual category pages
    for (const [id, categoryData] of Object.entries(ALL_CATEGORIES_DATA)) {
        const html = generateCategoryPageHTML(id, categoryData);
        const filePath = path.join(categoriesDir, `${id}.html`);

        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`✓ Generated: ${id}.html`);
        count++;
    }

    // Generate index page
    const indexHtml = generateCategoriesIndexHTML();
    const indexPath = path.join(categoriesDir, 'index.html');
    fs.writeFileSync(indexPath, indexHtml, 'utf8');
    console.log(`✓ Generated: index.html`);

    console.log(`\n✅ Successfully generated ${count} category pages + 1 index page!`);
    console.log(`📁 All files created in: ${categoriesDir}`);
}

// Run the generator
main();
