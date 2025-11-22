/* ============================================
   CATEGORY EXAMPLE DATA
   Pre-filled resume examples for each category
   ============================================ */

/**
 * Get example data for a specific category
 */
function getCategoryExampleData(categoryId) {
    return CATEGORY_EXAMPLES[categoryId] || null;
}

// Example data for all 45+ categories
const CATEGORY_EXAMPLES = {
    // ========== TECHNOLOGY & IT ==========
    'software-engineer': {
        personal: {
            fullName: 'Rahul Kumar',
            email: 'rahul.kumar@email.com',
            phone: '+91 98765 43210',
            location: 'Bengaluru, Karnataka',
            title: 'Software Engineer',
            linkedin: 'linkedin.com/in/rahulkumar',
            github: 'github.com/rahulkumar',
            portfolio: 'rahulkumar.dev',
            photo: ''
        },
        summary: 'Passionate Software Engineer with 3+ years of experience in full-stack development. Proficient in JavaScript, React, Node.js, and cloud technologies. Strong problem-solving skills with a track record of delivering scalable applications.',
        experience: [
            {
                company: 'Tech Solutions Pvt Ltd',
                position: 'Software Engineer',
                location: 'Bengaluru, Karnataka',
                startDate: '2021-07',
                endDate: 'Present',
                current: true,
                description: 'Developed and maintained web applications using React and Node.js\nImplemented RESTful APIs serving 100K+ daily requests\nOptimized database queries reducing response time by 40%\nCollaborated with cross-functional teams in Agile environment'
            },
            {
                company: 'Startup Innovation Labs',
                position: 'Junior Developer',
                location: 'Pune, Maharashtra',
                startDate: '2019-08',
                endDate: '2021-06',
                current: false,
                description: 'Built responsive web interfaces using React and TypeScript\nIntegrated third-party APIs and payment gateways\nParticipated in code reviews and sprint planning\nContributed to open-source projects'
            }
        ],
        education: [
            {
                degree: 'B.Tech in Computer Science',
                school: 'Indian Institute of Technology (IIT)',
                location: 'Mumbai, Maharashtra',
                graduationDate: '2019-05',
                gpa: '8.5/10'
            }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git', 'REST APIs', 'Microservices', 'Agile/Scrum'],
        projects: [
            {
                name: 'E-Commerce Platform',
                description: 'Built a full-stack e-commerce platform with React, Node.js, and MongoDB',
                technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                link: 'github.com/rahulkumar/ecommerce'
            },
            {
                name: 'Real-time Chat Application',
                description: 'Developed real-time messaging app using WebSockets and Redis',
                technologies: ['Socket.io', 'React', 'Redis', 'Express'],
                link: 'github.com/rahulkumar/chat-app'
            }
        ],
        certifications: [
            {
                name: 'AWS Certified Developer – Associate',
                issuer: 'Amazon Web Services',
                date: '2022-03'
            }
        ],
        languages: [
            { name: 'English', proficiency: 'Fluent' },
            { name: 'Hindi', proficiency: 'Native' }
        ]
    },

    'web-developer': {
        personal: {
            fullName: 'Priya Sharma',
            email: 'priya.sharma@email.com',
            phone: '+91 98765 43211',
            location: 'Noida, Uttar Pradesh',
            title: 'Web Developer',
            linkedin: 'linkedin.com/in/priyasharma',
            github: 'github.com/priyasharma',
            portfolio: 'priyasharma.dev',
            photo: ''
        },
        summary: 'Creative Web Developer with 2+ years of experience building responsive and user-friendly websites. Expert in HTML, CSS, JavaScript, and modern frameworks. Passionate about creating pixel-perfect designs.',
        experience: [
            {
                company: 'Digital Web Agency',
                position: 'Frontend Developer',
                location: 'Noida, Uttar Pradesh',
                startDate: '2022-01',
                endDate: 'Present',
                current: true,
                description: 'Developed responsive websites for 20+ clients using React and Next.js\nImplemented SEO best practices improving search rankings\nOptimized website performance achieving 95+ Lighthouse scores\nCollaborated with designers to implement pixel-perfect UIs'
            }
        ],
        education: [
            {
                degree: 'B.Sc in Computer Science',
                school: 'Delhi University',
                location: 'New Delhi',
                graduationDate: '2021-06',
                gpa: '8.2/10'
            }
        ],
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'SASS', 'Responsive Design', 'Git', 'SEO', 'Figma', 'WordPress'],
        projects: [
            {
                name: 'Portfolio Website Generator',
                description: 'Built a SaaS tool for creating professional portfolio websites',
                technologies: ['React', 'Next.js', 'Tailwind CSS'],
                link: 'github.com/priyasharma/portfolio-gen'
            }
        ],
        certifications: [],
        languages: [
            { name: 'English', proficiency: 'Fluent' },
            { name: 'Hindi', proficiency: 'Native' }
        ]
    },

    'data-scientist': {
        personal: {
            fullName: 'Arjun Patel',
            email: 'arjun.patel@email.com',
            phone: '+91 98765 43212',
            location: 'Hyderabad, Telangana',
            title: 'Data Scientist',
            linkedin: 'linkedin.com/in/arjunpatel',
            github: 'github.com/arjunpatel',
            portfolio: '',
            photo: ''
        },
        summary: 'Results-driven Data Scientist with 4+ years of experience in machine learning, statistical analysis, and data visualization. Proven ability to extract insights from complex datasets and build predictive models.',
        experience: [
            {
                company: 'Analytics Corp',
                position: 'Senior Data Scientist',
                location: 'Hyderabad, Telangana',
                startDate: '2021-03',
                endDate: 'Present',
                current: true,
                description: 'Built ML models achieving 92% accuracy for customer churn prediction\nAnalyzed large datasets using Python, SQL, and Spark\nCreated interactive dashboards using Tableau and Power BI\nMentored junior data scientists and analysts'
            }
        ],
        education: [
            {
                degree: 'M.Sc in Data Science',
                school: 'Indian Institute of Science (IISc)',
                location: 'Bengaluru, Karnataka',
                graduationDate: '2020-06',
                gpa: '9.0/10'
            }
        ],
        skills: ['Python', 'R', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn', 'Tableau', 'Power BI', 'Statistics', 'A/B Testing'],
        projects: [
            {
                name: 'Customer Segmentation System',
                description: 'Developed K-means clustering model for customer segmentation',
                technologies: ['Python', 'Scikit-learn', 'Pandas'],
                link: 'github.com/arjunpatel/customer-seg'
            }
        ],
        certifications: [
            {
                name: 'Google Data Analytics Professional Certificate',
                issuer: 'Google',
                date: '2020-09'
            }
        ],
        languages: [
            { name: 'English', proficiency: 'Fluent' },
            { name: 'Hindi', proficiency: 'Native' }
        ]
    },

    // ========== BUSINESS & MANAGEMENT ==========
    'digital-marketer': {
        personal: {
            fullName: 'Neha Gupta',
            email: 'neha.gupta@email.com',
            phone: '+91 98765 43213',
            location: 'Mumbai, Maharashtra',
            title: 'Digital Marketing Specialist',
            linkedin: 'linkedin.com/in/nehagupta',
            github: '',
            portfolio: 'nehagupta.marketing',
            photo: ''
        },
        summary: 'Strategic Digital Marketing Specialist with 5+ years of experience driving online growth. Expert in SEO, SEM, social media marketing, and content strategy. Proven track record of increasing ROI by 150%.',
        experience: [
            {
                company: 'Marketing Solutions India',
                position: 'Senior Digital Marketing Manager',
                location: 'Mumbai, Maharashtra',
                startDate: '2020-06',
                endDate: 'Present',
                current: true,
                description: 'Managed digital marketing campaigns with ₹50L+ monthly budget\nIncreased organic traffic by 200% through SEO optimization\nAchieved 3.5x ROI on paid advertising campaigns\nLed team of 5 marketing specialists'
            }
        ],
        education: [
            {
                degree: 'MBA in Marketing',
                school: 'Symbiosis Institute of Business Management',
                location: 'Pune, Maharashtra',
                graduationDate: '2019-06',
                gpa: '8.7/10'
            }
        ],
        skills: ['SEO', 'SEM', 'Google Ads', 'Facebook Ads', 'Content Marketing', 'Email Marketing', 'Analytics', 'Social Media Marketing', 'Google Analytics', 'Marketing Automation', 'Copywriting'],
        projects: [],
        certifications: [
            {
                name: 'Google Ads Certification',
                issuer: 'Google',
                date: '2022-01'
            },
            {
                name: 'HubSpot Content Marketing Certification',
                issuer: 'HubSpot',
                date: '2021-08'
            }
        ],
        languages: [
            { name: 'English', proficiency: 'Fluent' },
            { name: 'Hindi', proficiency: 'Native' }
        ]
    },

    // ========== HEALTHCARE ==========
    'doctor': {
        personal: {
            fullName: 'Dr. Anjali Verma',
            email: 'dr.anjali.verma@email.com',
            phone: '+91 98765 43214',
            location: 'Chennai, Tamil Nadu',
            title: 'MBBS, MD (Internal Medicine)',
            linkedin: '',
            github: '',
            portfolio: '',
            photo: ''
        },
        summary: 'Dedicated Internal Medicine Physician with 8+ years of experience providing comprehensive patient care. Specialized in diagnosis and treatment of chronic diseases. Committed to patient-centered healthcare.',
        experience: [
            {
                company: 'Apollo Hospitals',
                position: 'Consultant - Internal Medicine',
                location: 'Chennai, Tamil Nadu',
                startDate: '2018-07',
                endDate: 'Present',
                current: true,
                description: 'Provided comprehensive care to 30+ patients daily\nManaged complex medical cases and chronic diseases\nConducted health education seminars\nSupervised medical residents and interns'
            }
        ],
        education: [
            {
                degree: 'MD (Internal Medicine)',
                school: 'All India Institute of Medical Sciences (AIIMS)',
                location: 'New Delhi',
                graduationDate: '2018-05',
                gpa: ''
            },
            {
                degree: 'MBBS',
                school: 'Christian Medical College (CMC)',
                location: 'Vellore, Tamil Nadu',
                graduationDate: '2015-06',
                gpa: ''
            }
        ],
        skills: ['Internal Medicine', 'Patient Care', 'Diagnosis', 'Treatment Planning', 'Electronic Health Records', 'Medical Research', 'Patient Education'],
        projects: [],
        certifications: [
            {
                name: 'Board Certification - Internal Medicine',
                issuer: 'National Board of Examinations',
                date: '2018-07'
            }
        ],
        languages: [
            { name: 'English', proficiency: 'Fluent' },
            { name: 'Hindi', proficiency: 'Fluent' },
            { name: 'Tamil', proficiency: 'Native' }
        ]
    },

    // ========== CREATIVE & DESIGN ==========
    'graphic-designer': {
        personal: {
            fullName: 'Amit Singh',
            email: 'amit.singh@email.com',
            phone: '+91 98765 43215',
            location: 'Gurgaon, Haryana',
            title: 'Graphic Designer',
            linkedin: 'linkedin.com/in/amitsingh',
            github: '',
            portfolio: 'amitsingh.design',
            photo: ''
        },
        summary: 'Creative Graphic Designer with 4+ years of experience creating compelling visual content for brands. Proficient in Adobe Creative Suite and modern design tools. Strong understanding of branding and visual communication.',
        experience: [
            {
                company: 'Creative Design Studio',
                position: 'Senior Graphic Designer',
                location: 'Gurgaon, Haryana',
                startDate: '2021-01',
                endDate: 'Present',
                current: true,
                description: 'Designed brand identities for 50+ clients\nCreated marketing materials increasing engagement by 60%\nManaged multiple projects meeting tight deadlines\nMentored junior designers'
            }
        ],
        education: [
            {
                degree: 'Bachelor of Fine Arts (BFA)',
                school: 'National Institute of Design',
                location: 'Ahmedabad, Gujarat',
                graduationDate: '2020-06',
                gpa: '8.5/10'
            }
        ],
        skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Figma', 'Branding', 'Logo Design', 'Typography', 'Color Theory', 'UI/UX Design', 'Print Design', 'Digital Marketing'],
        projects: [
            {
                name: 'Brand Identity - TechStart',
                description: 'Complete brand identity design including logo, colors, and guidelines',
                technologies: ['Illustrator', 'Photoshop'],
                link: 'behance.net/amitsingh/techstart'
            }
        ],
        certifications: [],
        languages: [
            { name: 'English', proficiency: 'Fluent' },
            { name: 'Hindi', proficiency: 'Native' }
        ]
    },

    // ========== STUDENT & ENTRY LEVEL ==========
    'fresher': {
        personal: {
            fullName: 'Rohan Mehta',
            email: 'rohan.mehta@email.com',
            phone: '+91 98765 43216',
            location: 'Jaipur, Rajasthan',
            title: 'Recent Graduate - Computer Science',
            linkedin: 'linkedin.com/in/rohanmehta',
            github: 'github.com/rohanmehta',
            portfolio: '',
            photo: ''
        },
        summary: 'Motivated Computer Science graduate with strong foundation in programming and software development. Eager to apply theoretical knowledge to real-world projects. Quick learner with excellent problem-solving skills.',
        experience: [],
        education: [
            {
                degree: 'B.Tech in Computer Science',
                school: 'Manipal Institute of Technology',
                location: 'Manipal, Karnataka',
                graduationDate: '2024-06',
                gpa: '8.3/10'
            }
        ],
        skills: ['C++', 'Java', 'Python', 'Data Structures', 'Algorithms', 'SQL', 'HTML', 'CSS', 'JavaScript', 'Git', 'Problem Solving'],
        projects: [
            {
                name: 'Student Management System',
                description: 'Developed web-based system for managing student records using Java and MySQL',
                technologies: ['Java', 'MySQL', 'JSP', 'Servlets'],
                link: 'github.com/rohanmehta/student-mgmt'
            },
            {
                name: 'Weather Prediction App',
                description: 'Built Android app for weather forecasting using OpenWeather API',
                technologies: ['Java', 'Android', 'REST API'],
                link: 'github.com/rohanmehta/weather-app'
            }
        ],
        certifications: [
            {
                name: 'Python for Data Science',
                issuer: 'Coursera',
                date: '2023-12'
            }
        ],
        languages: [
            { name: 'English', proficiency: 'Fluent' },
            { name: 'Hindi', proficiency: 'Native' }
        ]
    },

    'intern': {
        personal: {
            fullName: 'Sneha Reddy',
            email: 'sneha.reddy@email.com',
            phone: '+91 98765 43217',
            location: 'Hyderabad, Telangana',
            title: 'Engineering Student',
            linkedin: 'linkedin.com/in/snehareddy',
            github: 'github.com/snehareddy',
            portfolio: '',
            photo: ''
        },
        summary: 'Enthusiastic Engineering student seeking internship opportunity to gain practical experience. Strong academic background with hands-on experience in college projects. Passionate about learning new technologies.',
        experience: [
            {
                company: 'College Technical Society',
                position: 'Web Development Volunteer',
                location: 'Hyderabad, Telangana',
                startDate: '2023-08',
                endDate: 'Present',
                current: true,
                description: 'Developed college event website using HTML, CSS, and JavaScript\nManaged website content and updates\nCollaborated with team of 5 students'
            }
        ],
        education: [
            {
                degree: 'B.Tech in Computer Science (Pursuing)',
                school: 'BITS Pilani',
                location: 'Hyderabad, Telangana',
                graduationDate: '2025-06',
                gpa: '8.5/10'
            }
        ],
        skills: ['Python', 'C', 'Java', 'HTML', 'CSS', 'JavaScript', 'MySQL', 'Data Structures', 'Git'],
        projects: [
            {
                name: 'Library Management System',
                description: 'Desktop application for managing library operations',
                technologies: ['Python', 'Tkinter', 'SQLite'],
                link: 'github.com/snehareddy/library-mgmt'
            }
        ],
        certifications: [],
        languages: [
            { name: 'English', proficiency: 'Fluent' },
            { name: 'Hindi', proficiency: 'Fluent' },
            { name: 'Telugu', proficiency: 'Native' }
        ]
    },

    // BLANK TEMPLATE
    'blank': {
        personal: {
            fullName: '',
            email: '',
            phone: '',
            location: '',
            title: '',
            linkedin: '',
            github: '',
            portfolio: '',
            photo: ''
        },
        summary: '',
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: []
    }
};

// Add simplified examples for remaining categories (to keep file size manageable)
// Users can customize these based on the detailed examples above

const SIMPLIFIED_EXAMPLES = {
    'mobile-developer': { ...CATEGORY_EXAMPLES['software-engineer'], personal: { ...CATEGORY_EXAMPLES['software-engineer'].personal, title: 'Mobile Developer' }},
    'devops-engineer': { ...CATEGORY_EXAMPLES['software-engineer'], personal: { ...CATEGORY_EXAMPLES['software-engineer'].personal, title: 'DevOps Engineer' }},
    'qa-engineer': { ...CATEGORY_EXAMPLES['software-engineer'], personal: { ...CATEGORY_EXAMPLES['software-engineer'].personal, title: 'QA Engineer' }},
    'uiux-designer': { ...CATEGORY_EXAMPLES['graphic-designer'], personal: { ...CATEGORY_EXAMPLES['graphic-designer'].personal, title: 'UI/UX Designer' }},
    'cybersecurity': { ...CATEGORY_EXAMPLES['software-engineer'], personal: { ...CATEGORY_EXAMPLES['software-engineer'].personal, title: 'Cybersecurity Specialist' }},
    'cloud-architect': { ...CATEGORY_EXAMPLES['software-engineer'], personal: { ...CATEGORY_EXAMPLES['software-engineer'].personal, title: 'Cloud Architect' }},
    'database-admin': { ...CATEGORY_EXAMPLES['software-engineer'], personal: { ...CATEGORY_EXAMPLES['software-engineer'].personal, title: 'Database Administrator' }},

    'nurse': { ...CATEGORY_EXAMPLES['doctor'], personal: { ...CATEGORY_EXAMPLES['doctor'].personal, title: 'Registered Nurse' }},
    'pharmacist': { ...CATEGORY_EXAMPLES['doctor'], personal: { ...CATEGORY_EXAMPLES['doctor'].personal, title: 'Pharmacist' }},
    'lab-technician': { ...CATEGORY_EXAMPLES['doctor'], personal: { ...CATEGORY_EXAMPLES['doctor'].personal, title: 'Lab Technician' }},
    'physiotherapist': { ...CATEGORY_EXAMPLES['doctor'], personal: { ...CATEGORY_EXAMPLES['doctor'].personal, title: 'Physiotherapist' }},

    'sales-manager': { ...CATEGORY_EXAMPLES['digital-marketer'], personal: { ...CATEGORY_EXAMPLES['digital-marketer'].personal, title: 'Sales Manager' }},
    'business-analyst': { ...CATEGORY_EXAMPLES['data-scientist'], personal: { ...CATEGORY_EXAMPLES['data-scientist'].personal, title: 'Business Analyst' }},
    'hr-manager': { ...CATEGORY_EXAMPLES['digital-marketer'], personal: { ...CATEGORY_EXAMPLES['digital-marketer'].personal, title: 'HR Manager' }},
    'project-manager': { ...CATEGORY_EXAMPLES['digital-marketer'], personal: { ...CATEGORY_EXAMPLES['digital-marketer'].personal, title: 'Project Manager' }},
    'product-manager': { ...CATEGORY_EXAMPLES['digital-marketer'], personal: { ...CATEGORY_EXAMPLES['digital-marketer'].personal, title: 'Product Manager' }},
    'operations-manager': { ...CATEGORY_EXAMPLES['digital-marketer'], personal: { ...CATEGORY_EXAMPLES['digital-marketer'].personal, title: 'Operations Manager' }},
    'customer-success': { ...CATEGORY_EXAMPLES['digital-marketer'], personal: { ...CATEGORY_EXAMPLES['digital-marketer'].personal, title: 'Customer Success Manager' }},

    'content-writer': { ...CATEGORY_EXAMPLES['graphic-designer'], personal: { ...CATEGORY_EXAMPLES['graphic-designer'].personal, title: 'Content Writer' }},
    'video-editor': { ...CATEGORY_EXAMPLES['graphic-designer'], personal: { ...CATEGORY_EXAMPLES['graphic-designer'].personal, title: 'Video Editor' }},
    'photographer': { ...CATEGORY_EXAMPLES['graphic-designer'], personal: { ...CATEGORY_EXAMPLES['graphic-designer'].personal, title: 'Photographer' }},
    '3d-animator': { ...CATEGORY_EXAMPLES['graphic-designer'], personal: { ...CATEGORY_EXAMPLES['graphic-designer'].personal, title: '3D Animator' }},

    'teacher': { ...CATEGORY_EXAMPLES['fresher'], personal: { ...CATEGORY_EXAMPLES['fresher'].personal, title: 'Teacher' }},
    'professor': { ...CATEGORY_EXAMPLES['doctor'], personal: { ...CATEGORY_EXAMPLES['doctor'].personal, title: 'Professor' }},
    'counselor': { ...CATEGORY_EXAMPLES['fresher'], personal: { ...CATEGORY_EXAMPLES['fresher'].personal, title: 'Counselor' }},
    'corporate-trainer': { ...CATEGORY_EXAMPLES['fresher'], personal: { ...CATEGORY_EXAMPLES['fresher'].personal, title: 'Corporate Trainer' }},

    'mechanical-engineer': { ...CATEGORY_EXAMPLES['software-engineer'], personal: { ...CATEGORY_EXAMPLES['software-engineer'].personal, title: 'Mechanical Engineer' }},
    'civil-engineer': { ...CATEGORY_EXAMPLES['software-engineer'], personal: { ...CATEGORY_EXAMPLES['software-engineer'].personal, title: 'Civil Engineer' }},
    'electrical-engineer': { ...CATEGORY_EXAMPLES['software-engineer'], personal: { ...CATEGORY_EXAMPLES['software-engineer'].personal, title: 'Electrical Engineer' }},
    'chemical-engineer': { ...CATEGORY_EXAMPLES['software-engineer'], personal: { ...CATEGORY_EXAMPLES['software-engineer'].personal, title: 'Chemical Engineer' }},
    'biomedical-engineer': { ...CATEGORY_EXAMPLES['software-engineer'], personal: { ...CATEGORY_EXAMPLES['software-engineer'].personal, title: 'Biomedical Engineer' }},

    'accountant': { ...CATEGORY_EXAMPLES['business-analyst'], personal: { ...CATEGORY_EXAMPLES['data-scientist'].personal, title: 'Accountant' }},
    'financial-analyst': { ...CATEGORY_EXAMPLES['data-scientist'], personal: { ...CATEGORY_EXAMPLES['data-scientist'].personal, title: 'Financial Analyst' }},
    'chartered-accountant': { ...CATEGORY_EXAMPLES['data-scientist'], personal: { ...CATEGORY_EXAMPLES['data-scientist'].personal, title: 'Chartered Accountant' }},
    'investment-banker': { ...CATEGORY_EXAMPLES['data-scientist'], personal: { ...CATEGORY_EXAMPLES['data-scientist'].personal, title: 'Investment Banker' }},

    'hotel-manager': { ...CATEGORY_EXAMPLES['digital-marketer'], personal: { ...CATEGORY_EXAMPLES['digital-marketer'].personal, title: 'Hotel Manager' }},
    'chef': { ...CATEGORY_EXAMPLES['graphic-designer'], personal: { ...CATEGORY_EXAMPLES['graphic-designer'].personal, title: 'Chef' }},
    'event-manager': { ...CATEGORY_EXAMPLES['digital-marketer'], personal: { ...CATEGORY_EXAMPLES['digital-marketer'].personal, title: 'Event Manager' }},
    'travel-consultant': { ...CATEGORY_EXAMPLES['digital-marketer'], personal: { ...CATEGORY_EXAMPLES['digital-marketer'].personal, title: 'Travel Consultant' }},

    'lawyer': { ...CATEGORY_EXAMPLES['doctor'], personal: { ...CATEGORY_EXAMPLES['doctor'].personal, title: 'Lawyer' }},
    'legal-advisor': { ...CATEGORY_EXAMPLES['doctor'], personal: { ...CATEGORY_EXAMPLES['doctor'].personal, title: 'Legal Advisor' }},
    'government-officer': { ...CATEGORY_EXAMPLES['doctor'], personal: { ...CATEGORY_EXAMPLES['doctor'].personal, title: 'Government Officer' }},

    'college-student': { ...CATEGORY_EXAMPLES['intern'], personal: { ...CATEGORY_EXAMPLES['intern'].personal, title: 'College Student' }},

    'architect': { ...CATEGORY_EXAMPLES['graphic-designer'], personal: { ...CATEGORY_EXAMPLES['graphic-designer'].personal, title: 'Architect' }},
    'real-estate-agent': { ...CATEGORY_EXAMPLES['digital-marketer'], personal: { ...CATEGORY_EXAMPLES['digital-marketer'].personal, title: 'Real Estate Agent' }},
    'fashion-designer': { ...CATEGORY_EXAMPLES['graphic-designer'], personal: { ...CATEGORY_EXAMPLES['graphic-designer'].personal, title: 'Fashion Designer' }},
    'journalist': { ...CATEGORY_EXAMPLES['content-writer'], personal: { ...CATEGORY_EXAMPLES['graphic-designer'].personal, title: 'Journalist' }},
    'social-worker': { ...CATEGORY_EXAMPLES['fresher'], personal: { ...CATEGORY_EXAMPLES['fresher'].personal, title: 'Social Worker' }}
};

// Merge simplified examples
Object.assign(CATEGORY_EXAMPLES, SIMPLIFIED_EXAMPLES);

// Export function
window.getCategoryExampleData = getCategoryExampleData;
