// Firebase Configuration and Initialization
const firebaseConfig = {
  apiKey: "AIzaSyAurFY1ghJeFp1wxqiRd6Us-h45Bv6myoE",
  authDomain: "ieee-embs-vardhaman.firebaseapp.com",
  projectId: "ieee-embs-vardhaman",
  storageBucket: "ieee-embs-vardhaman.firebasestorage.app",
  messagingSenderId: "346658971107",
  appId: "1:346658971107:web:0361525837768845cd94d6",
  measurementId: "G-W1HX22X4YY"
};

// Initialize Firebase App & Services safely
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = typeof firebase !== 'undefined' ? firebase.firestore() : null;
const auth = typeof firebase !== 'undefined' ? firebase.auth() : null;
const storage = typeof firebase !== 'undefined' ? firebase.storage() : null;

// List of authorized admin emails (Strict Admin Access)
const AUTHORIZED_ADMIN_EMAILS = [
  "vuggidisaivarshith@gmail.com",
  "maruthisaiteja9@gmail.com",
  "challatanmay@gmail.com",
  "swethabharath27@vardhaman.org",
  "pollishettyswethavardhaman@gmail.com",
  "pollishetty.swetha@vardhaman.org"
];

// Check if email is authorized admin
function isAuthorizedAdmin(email) {
  if (!email) return false;
  const lower = email.toLowerCase().trim();
  return AUTHORIZED_ADMIN_EMAILS.some(a => a.toLowerCase().trim() === lower);
}

// Initial Team Dataset (Fallback if Firestore collection is empty)
const DEFAULT_TEAM_MEMBERS = [
  {
    id: "faculty-swetha",
    name: "Polisetty Swetha",
    role: "Faculty Co-ordinator (IEEE EMBS)",
    department: "Department of Information Technology",
    year: "Faculty",
    email: "swethabharath27@vardhaman.org",
    phone: "+91 7993136780",
    linkedin: "",
    photoUrl: "assets/faculty.jpeg",
    category: "faculty",
    order: 1,
    active: true
  },
  {
    id: "secretary-varshith",
    name: "Vuggidi Sai Varshith",
    role: "Secretary",
    department: "IT Dept",
    year: "4th Year",
    email: "vuggidisaivarshith@gmail.com",
    phone: "+91 9059573313",
    linkedin: "https://www.linkedin.com/in/vuggidisaivarshith/",
    photoUrl: "assets/secretary.png",
    category: "student",
    order: 2,
    active: true
  },
  {
    id: "chair-teja",
    name: "Maruthi Sai Teja",
    role: "Chairperson",
    department: "IT Dept",
    year: "4th Year",
    email: "maruthisaiteja9@gmail.com",
    phone: "+91 9490298994",
    linkedin: "https://www.linkedin.com/in/pillimaruthisaiteja/",
    photoUrl: "assets/chair.jpeg",
    category: "student",
    order: 3,
    active: true
  },
  {
    id: "vice-jahnavi",
    name: "Vigrahala Jahnavi",
    role: "Vice Chairperson",
    department: "IT Dept",
    year: "4th Year",
    email: "jahnavivigrahala@gmail.com",
    phone: "+91 8688909558",
    linkedin: "https://www.linkedin.com/in/jahnavi-vigrahala-94aa9034a/",
    photoUrl: "assets/vice.jpeg",
    category: "student",
    order: 4,
    active: true
  },
  {
    id: "treasurer-tanmay",
    name: "Tanmay Challa",
    role: "Treasurer & Webmaster",
    department: "IT Dept",
    year: "4th Year",
    email: "tanmaychalla@gmail.com",
    phone: "+91 7093811232",
    linkedin: "https://www.linkedin.com/in/tanmay-challa",
    photoUrl: "assets/treasurer.jpeg",
    category: "student",
    order: 5,
    active: true
  }
];

// Initial Site Stats Dataset (Fallback for siteConfig/homepage)
const DEFAULT_SITE_STATS = {
  membersCount: 85,
  eventsCount: 12,
  yearsActive: 3,
  awardsCount: 5
};

// Initial About Page Dataset (Fallback for aboutPage/main)
const DEFAULT_ABOUT_DATA = {
  missionStatement: "IEEE EMBS Student Branch Chapter at Vardhaman College of Engineering connects engineering students with the frontiers of biomedical innovation, digital health, and healthcare technology.",
  focusAreas: [
    "Digital Health & Telemedicine",
    "Biomedical Signal Processing",
    "Wearable Health Technologies",
    "AI & Machine Learning in Healthcare",
    "Medical Imaging & Diagnostic Systems",
    "Bio-sensors & Neural Engineering"
  ],
  foundedYear: "2023",
  foundingTeamCount: "15+",
  firstEventDetails: "Hands-on Workshop on Biomedical Signal Processing & AI (Feb 2024)",
  facultyAdvisor: {
    name: "Polisetty Swetha",
    role: "Faculty Co-ordinator (IEEE EMBS)",
    department: "Department of Information Technology, VCE",
    phone: "+91 7993136780",
    email: "swethabharath27@vardhaman.org",
    photoUrl: "assets/faculty.jpeg",
    quote: "IEEE EMBS Vardhaman provides a transformative environment where students apply technical problem-solving to real healthcare challenges. We encourage every engineering student to explore biomedical technology and lead impactful research."
  }
};

// Default Achievements Dataset (Fallback for achievements collection)
const DEFAULT_ACHIEVEMENTS = [
  {
    id: "ach-1",
    category: "IEEE Section Recognition",
    categoryColor: "#F59E0B",
    title: "Active Student Branch Chapter Status",
    description: "Recognized as an active, high-performing IEEE EMBS Student Branch Chapter under IEEE Hyderabad Section and IEEE India Council.",
    order: 1,
    active: true
  },
  {
    id: "ach-2",
    category: "Student Research",
    categoryColor: "#00629B",
    title: "National Level Paper Presentations",
    description: "Chapter members presented research papers in Digital Health, Medical Image Processing, and IoT Health Monitoring at national symposia.",
    order: 2,
    active: true
  },
  {
    id: "ach-3",
    category: "Hackathon Excellence",
    categoryColor: "#10B981",
    title: "Biomedical Hackathon Winners",
    description: "Student teams secured top positions in healthcare innovation hackathons for prototype designs in remote patient tracking.",
    order: 3,
    active: true
  },
  {
    id: "ach-4",
    category: "Community Impact",
    categoryColor: "#F97316",
    title: "12+ Successful Events & Workshops",
    description: "Impacted 500+ engineering students across departments with specialized training in biomedical engineering and telemetry systems.",
    order: 4,
    active: true
  }
];

// Default Resources Dataset (Fallback for resources collection)
const DEFAULT_RESOURCES = [
  { id: "res-1", title: "IEEE Xplore Digital Library", icon: "fa-book-open", category: "Research & Papers", description: "Access millions of research papers, journals, conference proceedings, standards, and technical publications published by IEEE.", url: "https://ieeexplore.ieee.org/", active: true, order: 1 },
  { id: "res-2", title: "IEEE Membership Portal", icon: "fa-id-card", category: "Membership", description: "Become an IEEE member to access exclusive technical resources, networking opportunities, discounts, publications, and professional development programs.", url: "https://www.ieee.org/membership/", active: true, order: 2 },
  { id: "res-3", title: "IEEE Scholarships, Awards & Funding", icon: "fa-graduation-cap", category: "Funding & Grants", description: "Explore scholarships, grants, fellowships, travel grants, awards, and funding opportunities available for IEEE student members.", url: "https://students.ieee.org/membership-benefits/ieee-benefits/funds-and-awards/", active: true, order: 3 },
  { id: "res-4", title: "IEEE Conferences Search", icon: "fa-calendar-alt", category: "Research & Papers", description: "Search upcoming IEEE international conferences, symposiums, workshops, and technical events across various engineering disciplines.", url: "https://conferences.ieee.org/", active: true, order: 4 },
  { id: "res-5", title: "IEEE EMBS Publications", icon: "fa-microscope", category: "Publications", description: "Explore journals, magazines, newsletters, books, and publications from the IEEE Engineering in Medicine and Biology Society.", url: "https://www.embs.org/publications/", active: true, order: 5 },
  { id: "res-6", title: "IEEE Career Center", icon: "fa-briefcase", category: "Careers & Internships", description: "Search internships, jobs, research positions, and career opportunities for engineers worldwide.", url: "https://jobs.ieee.org/", active: true, order: 6 },
  { id: "res-7", title: "IEEE Students Portal", icon: "fa-users", category: "Membership", description: "Discover student benefits, competitions, scholarships, volunteering opportunities, and leadership programs.", url: "https://students.ieee.org/", active: true, order: 7 },
  { id: "res-8", title: "IEEE Learning Network", icon: "fa-laptop-code", category: "Learning & Courses", description: "Access online technical courses, webinars, certifications, and professional learning resources.", url: "https://iln.ieee.org/", active: true, order: 8 },
  { id: "res-9", title: "IEEE Standards Association", icon: "fa-shield-alt", category: "Research & Papers", description: "Explore IEEE standards, industry best practices, standards development activities, and technical specifications.", url: "https://standards.ieee.org/", active: true, order: 9 },
  { id: "res-10", title: "IEEE Spectrum Technology News", icon: "fa-newspaper", category: "Publications", description: "Read the latest technology news, engineering innovations, AI developments, healthcare technology, robotics, electronics, and industry insights.", url: "https://spectrum.ieee.org/", active: true, order: 10 },
  { id: "res-11", title: "IEEE Collabratec Network", icon: "fa-network-wired", category: "Membership", description: "Network with researchers, students, professionals, authors, and IEEE members through IEEE's professional collaboration platform.", url: "https://ieeecollabratec.ieee.org/", active: true, order: 11 },
  { id: "res-12", title: "IEEE Student Competitions", icon: "fa-trophy", category: "Funding & Grants", description: "Participate in IEEE technical competitions, coding challenges, design contests, and innovation programs.", url: "https://students.ieee.org/competitions/", active: true, order: 12 },
  { id: "res-13", title: "IEEE Funding Opportunities", icon: "fa-hand-holding-usd", category: "Funding & Grants", description: "Find grants, travel funding, scholarships, fellowships, and financial support programs offered by IEEE.", url: "https://students.ieee.org/membership-benefits/ieee-benefits/funds-and-awards/", active: true, order: 13 },
  { id: "res-14", title: "IEEE Internship & Career Opportunities", icon: "fa-user-graduate", category: "Careers & Internships", description: "Explore internships, graduate programs, research opportunities, and early-career resources through IEEE Student Programs and the IEEE Career Center.", url: "https://jobs.ieee.org/", active: true, order: 14 },
  { id: "res-15", title: "IEEE EMBS Society Official Site", icon: "fa-heartbeat", category: "Publications", description: "Learn about IEEE Engineering in Medicine and Biology Society, its conferences, publications, technical committees, membership benefits, and global activities.", url: "https://www.embs.org/", active: true, order: 15 }
];

