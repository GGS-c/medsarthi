# MedSarthi Educational Consultancy — Official Web Platform

> **"Your Trust, Our Commitment"**  
> Established in 2022 | Founder & Chief Mentor: **Dr. Prasad Wani**

A premium, modern, multi-page web platform engineered for **MedSarthi Educational Consultancy**. Designed with an elegant academic visual identity (Warm Beige & Refined Brown), rich interactive student guidance tools, and high-conversion lead generation systems.

---

## 🌟 Executive Summary & Client Identity

| Detail | Specification |
| :--- | :--- |
| **Organization Name** | **MedSarthi Educational Consultancy** |
| **Tagline** | *"Your Trust, Our Commitment"* |
| **Established** | 2022 |
| **Leadership** | Dr. Prasad Wani (Founder & Chief Mentor) |
| **Primary Telephone** | `+91 7414974584` |
| **WhatsApp Contacts** | `+91 7414974584` & `+91 9203969292` |
| **Official Email** | [medsarthi.ms@gmail.com](mailto:medsarthi.ms@gmail.com) |
| **Regional Offices** | **Bhopal (MP):** Indra Vihar Colony, Lalghati<br>**Jamner (MH):** Navkar Plaza<br>**Warora (MH):** Opposite DCC Bank, Nagar Parishad Complex<br>**Baramati (MH):** Baramati Center |
| **Social Media** | **YouTube:** [youtube.com/@medsarthi_official](https://youtube.com/@medsarthi_official)<br>**Instagram:** [instagram.com/medsarthi_official](https://www.instagram.com/medsarthi_official/) |

---

## 🎨 Brand Identity & Design System

The platform reflects academic distinction, trust, and professional warmth using a bespoke **Beige & Brown** palette:

### 1. Color Palette
- **Primary Brown:** `#65452F` — *Primary buttons, major headings, key brand accents*
- **Dark Brown:** `#38291F` — *Top header bar, dark backgrounds, high-contrast text*
- **Warm Beige:** `#D9C3A5` — *Section accents, badges, subtle dividers*
- **Light Cream:** `#F8F5EF` — *Platform body background, warm page canvas*
- **Soft White:** `#FFFFFF` — *Card containers, input fields, modal dialogs*
- **Text Color:** `#35302B` — *High-legibility editorial paragraph text*
- **Accent Gold:** `#B79562` — *Star ratings, verification badges, icons, hover accents*

### 2. Typography
- **Headings & Hero Displays:** *Manrope* (Modern Geometric Sans) — Clean, contemporary, corporate, highly legible across desktop and mobile.
- **Body & Navigation Elements:** *DM Sans* (Clean, modern sans-serif) — Delivers optimal readability on mobile screens and desktop monitors.
- *Playfair Display and decorative serif fonts have been removed in favor of a clean, minimal corporate aesthetic.*

---

## 📁 Project Architecture & Sitemap

```
vk_sample2/
├── index.html                   # High-Conversion Homepage (13 Sections + Lead Systems)
├── pages/
│   ├── about.html               # Company History, Mission, Vision, Dr. Prasad Wani Profile, 4 Regional Hubs
│   ├── services.html            # 7 Courses (MBBS, BDS, BAMS, BHMS, BVSc, PT, Engg) & 7 Core Services
│   ├── universities.html        # Reference College Information Directory (MP & Maharashtra Search/Filter)
│   ├── admission.html           # 6-Step Admission Roadmap, AIQ vs. State 85% Quotas, Document Checklist
│   ├── gallery.html             # 5 Categories: Office, Counselling, Events, Activities, Experiences
│   ├── faq.html                 # 7 Interactive Accordion FAQs with Instant Keyword Search
│   ├── contact.html             # All 4 Office Locations, Interactive Enquiry Form, Dual WhatsApp Direct CTAs
│   └── destinations.html        # Clean HTML Redirect pointing to index.html (legacy routing protection)
├── assets/
│   ├── css/
│   │   └── style.css            # Custom Beige & Brown utilities, glassmorphism, animations, print/accessibility
│   ├── js/
│   │   └── script.js            # Vanilla JS engine: scroll popup, directory search, multi-WhatsApp, CSV lead manager
│   └── images/                  # Local folder for brand assets, logos, and high-res photography
└── README.md                    # Project documentation & client handover manual
```

---

## ⚡ High-Conversion Lead Capture Engine

The website incorporates purpose-built conversion architecture to assist Dr. Prasad Wani and his counselling team in capturing prospective student inquiries:

1. **100px First-Scroll Quick Enquiry Popup:**
   - Triggers when a new visitor scrolls past 100px on the homepage.
   - Captures **Student Name**, **Mobile Number**, and **NEET Score / Target Course**.
   - Utilizes `localStorage` (`medsarthi_first_scroll_enquiry_dismissed`) to ensure it only appears once per visitor session, preventing disruptive browsing.

2. **Dual-Number Floating WhatsApp Widget:**
   - Positioned at the bottom-right of every page.
   - Clicking opens a dual-contact picker for either **Dr. Prasad Wani (+91 7414974584)** or **Support Line (+91 9203969292)** with pre-filled WhatsApp inquiry text.

3. **Fast-Track Free Counselling Modal:**
   - Accessible via "Get Free Counselling" buttons across all navigation bars, hero sections, and service cards.
   - Includes validation for 10-digit Indian mobile numbers and course preferences.

4. **Self-Contained Student Lead Manager & CSV Export:**
   - Every form submission across the entire site is automatically appended to an internal client database in browser `localStorage` (`medsarthi_leads_db`).
   - Counselors can click **"View Student Enquiries"** in the footer of any page to open a password-protected modal listing all submitted student leads with date, phone, score, and branch preference.
   - **One-click "Export to CSV" button** allows instant download of inquiries directly into Microsoft Excel or Google Sheets.

---

## 🛡️ Ethical Consultancy & Compliance Standards

To ensure complete adherence to professional regulatory guidelines:
- **No Fabricated Partnerships:** MedSarthi does not claim official university partnerships. The directory is clearly titled and disclaimed as a **"Reference Directory for College Information"**, providing objective insights into seat matrix, cutoffs, and regulatory approvals without false affiliation claims.
- **No Fictitious Testimonials:** Testimonial cards are styled and explicitly marked as sample client placeholders until verified feedback is reviewed by the team.
- **NEET & NMC/AYUSH Alignment:** Guides clearly differentiate between All India Quota (AIQ 15%) and State Quotas (85%), counseling timelines, and mandatory documentation.

---

## 🚀 Connecting Forms to Live Backends / CRM

Currently, all forms save locally to `localStorage` and provide immediate visual confirmation with toast notifications. To route student leads directly into your email or CRM:

### Option A: Formspree (Zero Backend Required)
1. Register a free account at [formspree.io](https://formspree.io).
2. Create a new form with endpoint URL (e.g., `https://formspree.io/f/xyzaabcd`).
3. In `assets/js/script.js` or in individual form tags, update `action` attribute:
   ```html
   <form action="https://formspree.io/f/xyzaabcd" method="POST">
   ```

### Option B: Google Sheets via Apps Script (Free & Direct to Spreadsheet)
1. Open a new Google Sheet.
2. Go to **Extensions > Apps Script** and deploy a Web App that receives `doPost(e)` and appends row data.
3. Update `assets/js/script.js` inside `saveLeadLocally(leadData)` to perform a `fetch()` POST to your Apps Script Web App URL.

### Option C: Direct WhatsApp Lead Forwarding
The script already formats form submissions into an encoded WhatsApp URL:
```javascript
const whatsappUrl = `https://wa.me/917414974584?text=${encodeURIComponent(msg)}`;
window.open(whatsappUrl, '_blank');
```

---

## 🌐 Instant Vercel Deployment Guide

This project is 100% static (HTML, CSS, Vanilla JS) and requires **zero build steps** (`npm run build` is not required).

### Deploying via Vercel CLI
```bash
# 1. Install Vercel CLI (if not already installed)
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy from the project root
vercel --prod
```

### Deploying via GitHub & Vercel Dashboard
1. Initialize a git repository and push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "MedSarthi Educational Consultancy website release"
   git branch -M main
   git remote add origin https://github.com/your-username/medsarthi-website.git
   git push -u origin main
   ```
2. Navigate to [vercel.com/new](https://vercel.com/new).
3. Import your `medsarthi-website` repository.
4. Keep the default settings:
   - **Framework Preset:** `Other`
   - **Root Directory:** `./`
   - **Build Command:** *(Leave blank)*
   - **Output Directory:** `.`
5. Click **Deploy**. Your website will be live worldwide on a fast Global CDN in seconds!

---

## 🛠️ Adding or Editing College Listings

To add new colleges or update existing seat matrices in the directory:
1. Open [pages/universities.html](pages/universities.html).
2. Locate the container `#college-grid`.
3. Duplicate any `<div class="college-card ...">` block.
4. Customize the attributes:
   - `data-course="MBBS"` (or `BAMS`, `BDS`, `BHMS`, `BVSc`, `Physiotherapy`, `Engineering`)
   - `data-state="MP"` or `data-state="Maharashtra"`
   - `data-type="Government"` or `data-type="Private"`
   - College name, location, annual intake, and tuition fees.
5. Save the file. The search bar and state/course filter buttons will automatically index the new entry!

---

## 📞 Support & Contacts

For technical queries, brand updates, or CRM integrations, reach out to:

- **MedSarthi Official:** [medsarthi.ms@gmail.com](mailto:medsarthi.ms@gmail.com)
- **Direct Phone:** +91 7414974584 | +91 9203969292
- **Headquarters:** Indra Vihar Colony, Lalghati, Bhopal (MP)

*(c) 2022–2026 MedSarthi Educational Consultancy. "Your Trust, Our Commitment". All rights reserved.*
