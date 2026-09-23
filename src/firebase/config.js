import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import {
  collegeLogo,
  embsLogo,
  vardhamanLogo,
  facultyPhoto,
  chairPhoto,
  secretaryPhoto,
  vicePhoto,
  treasurerPhoto,
  speakerPhoto,
  webmasterPhoto,
  eventSlide1,
  eventSlide2,
  eventSlide3,
  optiforgeFlyer
} from '../assets/images';

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

// Fallback initial dataset with Vite content-hashed image imports
export const DEFAULT_SITE_DATA = {
  siteSettings: {
    heroTitle: "IEEE EMBS Student Branch Chapter",
    heroSubtitle: "Vardhaman College of Engineering",
    heroDescription: "Empowering biomedical engineering innovation, medical signal processing, and digital health technology for humanity.",
    heroImage: embsLogo,
    welcomeTitle: "Welcome to IEEE EMBS Vardhaman",
    welcomeText: "The IEEE Engineering in Medicine and Biology Society (EMBS) Student Branch Chapter at Vardhaman College of Engineering connects engineering students with the frontiers of biomedical innovation, digital health, and healthcare technology.",
    missionStatement: "To advance healthcare technology through research, workshops, collaborative projects, and multidisciplinary engineering solutions.",
    facultyName: "Polisetty Swetha",
    facultyRole: "Faculty Co-ordinator (IEEE EMBS)",
    facultyDept: "Department of Information Technology, VCE",
    facultyEmail: "swethabharath27@vardhaman.org",
    facultyPhone: "+91 7993136780",
    facultyPhoto: facultyPhoto,
    facultyQuote: "IEEE EMBS Vardhaman provides a transformative environment where students apply technical problem-solving to real healthcare challenges. We encourage every engineering student to explore biomedical technology and lead impactful research.",
    contactEmail: "ieee.embs@vardhaman.org",
    contactPhone: "+91 9059573313",
    instagram: "https://www.instagram.com/ieee_embs_vce",
    linkedin: "https://www.linkedin.com/in/vuggidisaivarshith/",
    membersCount: 85,
    eventsCount: 13,
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
      photoUrl: facultyPhoto,
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
      photoUrl: chairPhoto,
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
      photoUrl: secretaryPhoto,
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
      photoUrl: vicePhoto,
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
      photoUrl: treasurerPhoto,
      category: "student",
      order: 5,
      active: true
    }
  ],

  events: [
    {
      id: "optiforge-2026",
      title: "OptiForge 2026 — Hackathon & Algorithm Design Challenge",
      topic: "Hackathon & Algorithm Design",
      description: "Flagship Hackathon & Algorithm Design Challenge organized by IEEE EMBS × IEEE CIS at Vardhaman College of Engineering. Featuring 10 innovation themes spanning Biomedical AI, EdTech, Digital Health, Neurotechnology, Medical Imaging, Signal Processing, Smart Healthcare IoT, Robotics, and Open Innovation.",
      date: "2026-09-30",
      time: "9:00 AM – 4:00 PM IST",
      venue: "Auditorium & Computing Labs, Vardhaman College of Engineering",
      speaker: "IEEE EMBS × IEEE CIS Technical Committee & Jury",
      speakerRole: "Domain Faculty Judges & Technical Evaluators",
      speakerPhotoUrl: optiforgeFlyer,
      speakerBio: "OptiForge 2026 brings together expert faculty judges from IEEE EMBS and IEEE CIS to evaluate live heuristic algorithms, multi-attempt convergence, and real-time live patching.",
      speakerEducation: [
        "Computational Intelligence Society (CIS) Technical Committee",
        "Engineering in Medicine & Biology Society (EMBS) Academic Board"
      ],
      speakerFocusAreas: [
        "Biomedical Artificial Intelligence & Heuristics",
        "Real-Time Algorithm Optimization & Dynamic Shift Handling",
        "Autonomous Medical IoT & Robotics",
        "Open Innovation on CIS and EMBS Only"
      ],
      speakerLinkedin: "https://optiforge-2026.vercel.app/",
      speakerUniversity: "https://optiforge-2026.vercel.app/",
      posterUrl: optiforgeFlyer,
      screenshots: [eventSlide1, eventSlide2, eventSlide3],
      registrationLink: "https://optiforge-2026.vercel.app/register",
      status: "upcoming",
      featured: true,
      agenda: [
        "09:00 AM - 10:00 AM: Problem Selection, Strategy & Starter Code Distribution",
        "10:00 AM - 12:30 PM: 1st Development & Automated AI Evaluation",
        "12:30 PM - 01:15 PM: Lunch Break & Strategy Discussion",
        "01:15 PM - 03:00 PM: 2nd Development & Live Patch Optimization",
        "03:00 PM - 04:00 PM: Final Panel Evaluation & Results Announcement"
      ]
    },
    {
      id: "digital-health-talk",
      title: "Expert Talk: Digital Health & Telemedicine",
      topic: "Biomedical Engineering & AI",
      description: "Successfully conducted expert session on Digital Health, Telemedicine, and Remote Patient Monitoring led by Dr. Ajit Kumar (XIMB). Explored AI, biological sensors, and healthcare innovation.",
      date: "2026-08-13",
      time: "6:00 PM IST",
      venue: "Online (Google Meet)",
      speaker: "Dr. Ajit Kumar",
      speakerRole: "Associate Professor of Information Systems, XIMB (XIM University)",
      speakerPhotoUrl: speakerPhoto,
      speakerBio: `Associate Professor of Information Systems at Xavier Institute of Management (XIMB), XIM University, Bhubaneswar. Ph.D. in Medical Informatics from Taipei Medical University, Taiwan; Postdoctoral Fellowship at National Central University, Taiwan. Over 18 years at the intersection of industry and academia specializing in Health IT, Telemedicine, EMR standards (SNOMED), and AI frameworks in healthcare.`,
      speakerEducation: [
        "Ph.D. in Medical Informatics — Taipei Medical University, Taiwan",
        "Postdoctoral Fellowship in HCI — Taiwan",
        "MCA (Master of Computer Applications) — India",
        "B.Sc. in Computer Science — India"
      ],
      speakerFocusAreas: [
        "Digital Health & Telemedicine Architectures",
        "Electronic Medical Records (EMR) & SNOMED Adoption",
        "Frameworks for Adopting Artificial Intelligence in Healthcare",
        "Academic Integrity & Health Informatics Policy"
      ],
      speakerLinkedin: "https://www.linkedin.com/in/drajitkumar-ai-dt/?originalSubdomain=in",
      speakerUniversity: "https://ximb.edu.in/faculty-research/faculty-profile/prof-ajit-kumar/",
      posterUrl: eventSlide1,
      screenshots: [eventSlide1, eventSlide2, eventSlide3],
      registrationLink: "",
      status: "past",
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
      speakerRole: "Faculty Coordinator & Industry Specialists",
      speakerBio: "Expert session on biomedical signal analytics, filtering, and machine learning models for biological signal classification.",
      speakerLinkedin: "",
      speakerUniversity: "",
      posterUrl: embsLogo,
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
      id: "ann-optiforge",
      title: "OptiForge 2026: Flagship Hackathon Scheduled for 30th September 2026",
      body: "Registrations are open for OptiForge 2026 — Hackathon & Algorithm Design Challenge on 30th September 2026 (9:00 AM – 4:00 PM IST). Featuring 10 innovation themes spanning Biomedical AI, EdTech, Telemedicine, Neurotechnology, Medical Imaging, Signals, Medical IoT, Robotics, and Open Innovation.",
      date: "2026-09-23",
      isPinned: true,
      imageUrl: optiforgeFlyer
    },
    {
      id: "ann-1",
      title: "Expert Talk on Digital Health & Telemedicine Completed Successfully",
      body: "IEEE EMBS Vardhaman extends sincere gratitude to Dr. Ajit Kumar (XIMB) for an inspiring expert session on August 13, 2026.",
      date: "2026-08-14",
      isPinned: false,
      imageUrl: eventSlide1
    },
    {
      id: "ann-2",
      title: "IEEE EMBS Membership Drive 2026",
      body: "Gain access to IEEE Xplore, global webinars, networking, and conference travel grants by joining IEEE EMBS today.",
      date: "2026-07-15",
      isPinned: false,
      imageUrl: embsLogo
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
      proofUrl: embsLogo
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
      id: "album-2",
      title: "Expert Talk on Digital Health & Telemedicine (13 Aug 2026)",
      date: "2026-08-13",
      images: [
        { id: "img-s1", url: eventSlide1, caption: "Dr. Ajit Kumar delivering expert talk on Digital Health" },
        { id: "img-s2", url: eventSlide2, caption: "Interactive session on Telemedicine Architectures" },
        { id: "img-s3", url: eventSlide3, caption: "Participant Q&A and IEEE EMBS vote of thanks" }
      ]
    },
    {
      id: "album-1",
      title: "Biomedical Signal Processing Workshop 2024",
      date: "2024-02-20",
      images: [
        { id: "img-1", url: speakerPhoto, caption: "Speaker presenting session" },
        { id: "img-2", url: facultyPhoto, caption: "Faculty coordinator addressing students" },
        { id: "img-3", url: embsLogo, caption: "Chapter logo presentation" }
      ]
    }
  ]
};

DEFAULT_SITE_DATA.team = DEFAULT_SITE_DATA.teamMembers;
