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

// List of authorized admin emails
const AUTHORIZED_ADMIN_EMAILS = [
  "vuggidisaivarshith@gmail.com",
  "maruthisaiteja9@gmail.com",
  "challatanmay@gmail.com",
  "swethabharath27@vardhaman.org",
  "pollishettyswethavardhaman@gmail.com",
  "pollishetty.swetha@vardhaman.org"
];

// Check if email is admin
function isAuthorizedAdmin(email) {
  if (!email) return false;
  // If list is non-empty, check against allowed list (case-insensitive)
  const lower = email.toLowerCase().trim();
  return AUTHORIZED_ADMIN_EMAILS.some(a => a.toLowerCase().trim() === lower);
}
