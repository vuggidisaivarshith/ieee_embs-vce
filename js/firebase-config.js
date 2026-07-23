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
