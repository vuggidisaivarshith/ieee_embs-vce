# IEEE EMBS VCE — Expert Talk Registration Website

> Official event registration website for the IEEE Engineering in Medicine and Biology Society (IEEE EMBS) Student Branch Chapter, Vardhaman College of Engineering, Hyderabad.

---

## 🎯 Event Details

| Detail | Info |
|--------|------|
| **Event** | Expert Talk on Digital Health, Telemedicine & Remote Patient Monitoring Systems |
| **Speaker** | Dr. Ajit Kumar, Ph.D. — Associate Professor, XIM University |
| **Date** | 13 August 2026 (Thursday) |
| **Time** | 6:00 PM – 7:00 PM IST |
| **Mode** | Online (Cisco Webex) |
| **Certificate** | E-Certificate for eligible participants (full attendance required) |

---

## 🌟 Website Features

- ⏱️ **Live Countdown Timer** — counts down to the event start time
- 📊 **Animated Stats Counter** — Members, Chapters, Events, Awards
- 📋 **Event Agenda / Timeline** — 4-step schedule breakdown
- 🧑‍💼 **Speaker Profile** — Bio, photo, LinkedIn & faculty profile links
- 📝 **Registration Form** — Integrated with Google Sheets via Apps Script
- 🔒 **Data Privacy Notice** — Transparent data usage policy
- 💬 **WhatsApp Group** — Link shared after successful registration
- 📱 **Fully Responsive** — Mobile, tablet, and desktop friendly
- 🔗 **Open Graph Meta Tags** — Rich previews when shared on WhatsApp/Instagram

---

## 🗂️ Project Structure

```
embs_website/
├── index.html          # Main HTML file with all sections
├── style.css           # All styles and responsive design
├── script.js           # Countdown, stats counter, form submission
└── assets/
    ├── college-logo.jpeg       # Vardhaman College of Engineering logo
    ├── embs-logo.png           # IEEE EMBS logo
    ├── vardhaman-logo.png      # Vardhaman Student Branch logo
    └── speaker.jpeg            # Dr. Ajit Kumar headshot
```

---

## 🚀 Getting Started

### Run Locally
Simply open `index.html` in your browser — no build step required.

```bash
# Clone the repository
git clone https://github.com/vuggidisaivarshith/ieee_embs-vce.git

# Open in browser
cd ieee_embs-vce
start index.html   # Windows
open index.html    # macOS
```

---

## 📡 Google Sheets Integration

Form submissions are sent to a Google Sheet via **Google Apps Script**.

- The Apps Script Web App URL is configured in `script.js`
- On successful submission, data is written to the connected Google Sheet
- The WhatsApp group join link is displayed to the user **after** successful registration

To update the script URL, edit this line in `script.js`:
```js
const scriptURL = 'YOUR_APPS_SCRIPT_WEB_APP_URL';
```

---

## 📬 Contact

| Role | Name | Contact |
|------|------|---------|
| Secretary, IEEE EMBS | Vuggidi Sai Varshith | 📞 9059573313 · ✉️ vuggidisaivarshith@gmail.com |
| Faculty Co-ordinator | Pollishetty Swetha | 📞 7993136780 |

---

## 🏫 About the Organization

**IEEE Engineering in Medicine and Biology Society (IEEE EMBS)**  
Student Branch Chapter  
Department of Information Technology  
Vardhaman College of Engineering  
Kacharam, Shamshabad, Ranga Reddy District  
Hyderabad, Telangana – 501218, India

🌐 [vardhaman.org](https://vardhaman.org) &nbsp;|&nbsp; 🔗 [Join IEEE](https://www.ieee.org/membership/join/)

---

## 📄 License

This project is created for internal IEEE EMBS Chapter use at Vardhaman College of Engineering.  
&copy; 2026 IEEE EMBS Vardhaman College of Engineering. All rights reserved.
