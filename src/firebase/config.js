import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAurFY1ghJeFp1wxqiRd6Us-h45Bv6myoE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ieee-embs-vardhaman.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ieee-embs-vardhaman",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ieee-embs-vardhaman.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "346658971107",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:346658971107:web:0361525837768845cd94d6",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-W1HX22X4YY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Whitelisted Admin Emails
export const AUTHORIZED_ADMIN_EMAILS = [
  "vuggidisaivarshith@gmail.com",
  "maruthisaiteja9@gmail.com",
  "challatanmay@gmail.com",
  "swethabharath27@vardhaman.org",
  "pollishettyswethavardhaman@gmail.com",
  "pollishetty.swetha@vardhaman.org"
];

export function isAuthorizedAdmin(email) {
  if (!email) return false;
  const cleanEmail = email.toLowerCase().trim();
  return AUTHORIZED_ADMIN_EMAILS.some(a => a.toLowerCase().trim() === cleanEmail);
}

// Fallback initial dataset (used when Firestore collections are empty)
export const DEFAULT_SITE_DATA = {
  siteSettings: {
    heroTitle: "IEEE EMBS Student Branch Chapter",
    heroSubtitle: "Vardhaman College of Engineering",
    heroDescription: "Empowering biomedical engineering innovation, medical signal processing, and digital health technology for humanity.",
    heroImage: "/assets/embs-logo.png",
    welcomeTitle: "Welcome to IEEE EMBS Vardhaman",
    welcomeText: "The IEEE Engineering in Medicine and Biology Society (EMBS) Student Branch Chapter at Vardhaman College of Engineering connects engineering students with the frontiers of biomedical innovation, digital health, and healthcare technology.",
    missionStatement: "To advance healthcare technology through research, workshops, collaborative projects, and multidisciplinary engineering solutions.",
    facultyName: "Polisetty Swetha",
    facultyRole: "Faculty Co-ordinator (IEEE EMBS)",
    facultyDept: "Department of Information Technology, VCE",
    facultyEmail: "swethabharath27@vardhaman.org",
    facultyPhone: "+91 7993136780",
    facultyPhoto: "/assets/faculty.jpeg",
    facultyQuote: "IEEE EMBS Vardhaman provides a transformative environment where students apply technical problem-solving to real healthcare challenges. We encourage every engineering student to explore biomedical technology and lead impactful research.",
    contactEmail: "ieee.embs@vardhaman.org",
    contactPhone: "+91 9059573313",
    instagram: "https://www.instagram.com/ieee_embs_vce",
    linkedin: "https://www.linkedin.com/in/vuggidisaivarshith/",
    membersCount: 85,
    eventsCount: 12,
    yearsActive: 3,
    awardsCount: 5
  },

  teamMembers: [
    {
      id: "faculty-swetha",
      name: "Polisetty Swetha",
      role: "Faculty Co-ordinator (IEEE EMBS)",
      department: "Information Technology",
      year: "Faculty",
      email: "swethabharath27@vardhaman.org",
      phone: "+91 7993136780",
      linkedin: "",
      photoUrl: "/assets/faculty.jpeg",
      category: "faculty",
      order: 1,
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
      photoUrl: "/assets/chair.jpeg",
      category: "student",
      order: 2,
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
      photoUrl: "/assets/secretary.png",
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
      photoUrl: "/assets/vice.jpeg",
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
      photoUrl: "/assets/treasurer.jpeg",
      category: "student",
      order: 5,
      active: true
    }
  ],

  events: [
    {
      id: "digital-health-talk",
      title: "Expert Talk: Digital Health & Telemedicine",
      topic: "Biomedical Engineering & AI",
      description: "Join us for an enlightening expert talk on Digital Health, Telemedicine, and Remote Patient Monitoring. Explore how AI and modern sensors are revolutionizing healthcare delivery.",
      date: "2026-08-13",
      time: "6:00 PM IST",
      venue: "Online (Google Meet)",
      speaker: "Dr. Ajit Kumar (Biomedical Innovation Specialist)",
      posterUrl: "/assets/speaker.jpeg",
      registrationLink: "https://forms.google.com/",
      status: "upcoming",
      featured: true,
      agenda: [
        "18:00 - Introduction & Welcome",
        "18:15 - Overview of Telemedicine Architectures",
        "18:45 - AI for Remote Patient Monitoring",
        "19:15 - Q&A and Interactive Session"
      ]
    },
    {
      id: "signal-processing-workshop",
      title: "Hands-on Workshop: Biomedical Signal Processing",
      topic: "ECG & EEG Analytics",
      description: "Comprehensive hands-on training session on filtering, feature extraction, and analyzing ECG and EEG signals using MATLAB and Python.",
      date: "2024-02-20",
      time: "10:00 AM IST",
      venue: "Auditorium Hall, Vardhaman College",
      speaker: "Pollishetty Swetha & Guest Experts",
      posterUrl: "/assets/embs-logo.png",
      registrationLink: "https://forms.google.com/",
      status: "past",
      featured: false,
      agenda: [
        "10:00 - Fundamentals of Biological Signals",
        "11:30 - Noise Reduction Algorithms",
        "14:00 - Hands-on Signal Analysis Lab"
      ]
    }
  ],

  announcements: [
    {
      id: "ann-1",
      title: "Registrations Open for Digital Health Expert Talk",
      body: "IEEE EMBS Vardhaman invites all students to register for the upcoming expert session on Telemedicine and Digital Health Systems.",
      date: "2026-07-28",
      isPinned: true,
      imageUrl: "/assets/speaker.jpeg"
    },
    {
      id: "ann-2",
      title: "IEEE EMBS Membership Drive 2026",
      body: "Gain access to IEEE Xplore, global webinars, networking, and conference travel grants by joining IEEE EMBS today.",
      date: "2026-07-15",
      isPinned: false,
      imageUrl: "/assets/embs-logo.png"
    }
  ],

  achievements: [
    {
      id: "ach-1",
      category: "IEEE Section Recognition",
      categoryColor: "#F5821F",
      title: "Active Student Branch Chapter Status",
      description: "Recognized as an active, high-performing IEEE EMBS Student Branch Chapter under IEEE Hyderabad Section.",
      date: "2024-03-15",
      proofUrl: "/assets/embs-logo.png"
    },
    {
      id: "ach-2",
      category: "Student Research",
      categoryColor: "#00629B",
      title: "National Level Paper Presentations",
      description: "Chapter members presented research papers in Digital Health & Medical Image Processing at national symposia.",
      date: "2024-05-10",
      proofUrl: ""
    },
    {
      id: "ach-3",
      category: "Hackathon Excellence",
      categoryColor: "#0DA6A0",
      title: "Biomedical Hackathon Winners",
      description: "Student teams secured top positions in healthcare innovation hackathons for remote patient tracking prototypes.",
      date: "2024-09-22",
      proofUrl: ""
    }
  ],

  resources: [
    { id: "res-1", title: "IEEE Xplore Digital Library", category: "Research & Papers", description: "Access millions of research papers, journals, standards, and technical publications.", url: "https://ieeexplore.ieee.org/", active: true },
    { id: "res-2", title: "IEEE Membership Portal", category: "Membership", description: "Become an IEEE member to access technical resources, networking, and discounts.", url: "https://www.ieee.org/membership/", active: true },
    { id: "res-3", title: "IEEE EMBS Publications", category: "Publications", description: "Journals, magazines, and technical newsletters from IEEE EMBS.", url: "https://www.embs.org/publications/", active: true },
    { id: "res-4", title: "IEEE Student Scholarships & Grants", category: "Funding & Grants", description: "Explore travel grants, fellowships, and project funding for IEEE students.", url: "https://students.ieee.org/membership-benefits/ieee-benefits/funds-and-awards/", active: true }
  ],

  gallery: [
    {
      id: "album-1",
      title: "Biomedical Signal Processing Workshop 2024",
      date: "2024-02-20",
      images: [
        { id: "img-1", url: "/assets/speaker.jpeg", caption: "Speaker presenting session" },
        { id: "img-2", url: "/assets/faculty.jpeg", caption: "Faculty coordinator addressing students" },
        { id: "img-3", url: "/assets/embs-logo.png", caption: "Chapter logo presentation" }
      ]
    }
  ]
};
