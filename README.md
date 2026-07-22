# IEEE EMBS VCE — Chapter Website

> Official website for the IEEE Engineering in Medicine and Biology Society (IEEE EMBS) Student Branch Chapter, Vardhaman College of Engineering, Hyderabad.

---

## 🌐 Site Structure

```
embs_website/
├── index.html                          ← Chapter Homepage (hub)
├── about.html                          ← About IEEE EMBS & the chapter
├── events.html                         ← All events listing (upcoming + past)
├── team.html                           ← Office bearers & faculty coordinator
├── contact.html                        ← Contact form, map, socials
├── join.html                           ← Join IEEE EMBS page
├── events/
│   └── digital-health-talk/
│       └── index.html                  ← Event: Digital Health (13 Aug 2026)
├── assets/
│   ├── college-logo.jpeg
│   ├── embs-logo.png
│   ├── vardhaman-logo.png
│   └── speaker.jpeg
├── css/
│   └── shared.css                      ← Global styles (navbar, footer, vars)
├── js/
│   └── shared.js                       ← Shared JS (navbar, animations)
├── style.css                           ← Event page specific styles
├── script.js                           ← Event page specific JS
├── sitemap.xml                         ← For Google indexing
├── robots.txt                          ← SEO crawler config
└── README.md
```

---

## 📄 Pages

| Page | Description |
|------|-------------|
| `index.html` | Chapter homepage with hero, featured event, stats, events preview |
| `about.html` | About IEEE EMBS globally + this chapter specifically |
| `events.html` | All events listing — filter by upcoming/past |
| `team.html` | Office bearers + faculty coordinator cards |
| `contact.html` | Contact form + info cards + Google Maps |
| `join.html` | Join IEEE EMBS — benefits, membership types, interest form |
| `events/digital-health-talk/` | Expert Talk on Digital Health — 13 Aug 2026 (registration page) |

---

## ✨ Features

- ⏱️ **Live Countdown Timer** on event page
- 📊 **Animated Stats Counter** on homepage
- 🗓️ **Event Agenda Timeline** on event page
- 📝 **Registration Form** → Google Sheets via Apps Script
- 🎓 **Join Interest Form** → Google Sheets via Apps Script
- 📱 **Fully Responsive** — mobile, tablet, desktop
- 🔗 **Open Graph Meta Tags** — rich WhatsApp/LinkedIn previews
- 🔍 **sitemap.xml + robots.txt** — Google indexable

---

## 🚀 Getting Started

```bash
git clone https://github.com/vuggidisaivarshith/ieee_embs-vce.git
cd ieee_embs-vce
start index.html   # Windows
```

---

## ➕ Adding a New Event

1. Create a new folder: `events/your-event-slug/`
2. Copy `events/digital-health-talk/index.html` as a template
3. Update the content (title, speaker, date, form URL)
4. Add the event to the `events` array in `events.html`
5. Add the event card to the homepage preview in `index.html`
6. Add URL to `sitemap.xml`

---

## 📡 Google Sheets Integration

Form submissions go to a Google Apps Script Web App. The URL is configured in `script.js` and `join.html`.

---

## 📬 Contact

| Role | Name | Contact |
|------|------|---------|
| Secretary, IEEE EMBS | Vuggidi Sai Varshith | 📞 9059573313 · ✉️ vuggidisaivarshith@gmail.com |
| Faculty Co-ordinator | Pollishetty Swetha | 📞 7993136780 |

---

## 🏫 Organization

**IEEE EMBS Student Branch Chapter**
Department of Information Technology, Vardhaman College of Engineering
Kacharam, Shamshabad, Hyderabad, Telangana – 501218

&copy; 2026 IEEE EMBS Vardhaman College of Engineering
