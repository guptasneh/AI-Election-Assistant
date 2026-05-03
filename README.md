<div align="center">

<img src="https://img.shields.io/badge/⚡_HACKATHON_PROJECT-2026-emerald?style=for-the-badge&color=10b981" />

# 🗳️ AI Election Assistant

### *The Future of Democratic Participation — Powered by AI*

<p align="center">
  <strong>An intelligent, real-time election intelligence platform that empowers every citizen with AI-driven insights, secure verification, and transparent governance.</strong>
</p>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)](https://expressjs.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)](https://www.docker.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

<br/>

> 🏆 **Built for the National AI Hackathon 2026** — Transforming how 900M+ voters engage with democracy

<br/>

[🚀 Live Demo](#-quick-start) · [✨ Features](#-core-modules) · [🛠 Tech Stack](#-tech-stack) · [📦 Docker Deploy](#-docker-deployment)

</div>

---

## 🌟 What is AI Election Assistant?

AI Election Assistant is a **production-grade, full-stack web platform** designed to solve the most critical problems in modern democracy:

- 📰 **Misinformation** spreading on social media and WhatsApp
- 🗺️ **Polling booth confusion** leading to voter drop-off
- 🤷 **Policy illiteracy** — voters not knowing what candidates truly stand for
- 🔐 **Authentication barriers** — complex voter verification processes
- 🌐 **Language barriers** — non-English speaking citizens left behind

We built an end-to-end solution that addresses every one of these with purpose-built AI modules, wrapped in a stunning dark-themed UI with glassmorphism, micro-animations, and full bilingual support.

---

## ✨ Core Modules

### 🛡️ TruthShield™ — AI Fact Checker
> *Stop misinformation before it spreads*

Paste any news headline, WhatsApp forward, or political claim and TruthShield instantly cross-references it against verified sources. Get a confidence-scored verdict:
- ✅ **Verified True** — backed by official records
- ❌ **Misinformation Detected** — debunked with source citations
- ⚠️ **Inconclusive** — insufficient data, caution advised

---

### 🎯 VoteMatch AI™ — Policy Alignment Engine
> *Find the candidate who truly shares your values*

A 3-question adaptive quiz that maps your personal policy priorities against verified candidate manifestos using semantic matching. Get a percentage match score and direct links to compare manifestos side-by-side.

---

### 🗺️ BoothNav™ — Smart Polling Station Navigator
> *Never miss your vote due to confusion*

Real-time interactive map (powered by Leaflet + OpenStreetMap) showing:
- 📍 Your assigned polling booth with GPS routing
- ⏱️ Live queue wait times via **QueueSense™**
- ♿ Accessibility features (wheelchair ramps, sign language)
- 🔴 Crowd density heatmaps with officer dispatch alerts

---

### 📊 LiveElectionInsights™ — Real-Time Analytics
> *Democracy in data*

Live election turnout dashboards with:
- Area charts tracking voter turnout timeline (0→100%)
- Regional turnout bar charts by constituency
- Demographic breakdown and sentiment indexing
- **TrustIndex™** scoring for candidates

---

### 🎙️ AI Voice Assistant — Multilingual Election Guide
> *Voting guidance in your language, with your voice*

A fully voice-enabled chatbot with:
- 🎤 **Speech-to-Text** (Web Speech API) — speak your questions
- 🔊 **Text-to-Speech** — hear answers read back to you
- 🌐 **Bilingual** — full English + Hindi (हिंदी) support
- 👶 **ELI5 Mode** — "Explain Like I'm 10" for complex concepts like NOTA, EVM, and electoral rolls

---

### 📈 Sentiment Analyzer — Speech Trust Scorer
> *Hold candidates accountable to their words*

Paste any political speech or debate transcript and get:
- 🧠 **Emotion Detection** — optimistic, defensive, aggressive?
- ⭐ **Trust Score** (0–100) based on linguistic patterns
- 🏷️ **Key Theme Extraction** — what did they actually talk about?

---

### 📚 Voter Education Hub — First-Timer's Complete Guide
> *No voter left behind*

A beautifully illustrated step-by-step guide covering:
1. Voter registration (NVSP Form 6)
2. Finding your polling booth
3. Required identity documents
4. How to cast your vote on an EVM

Plus an interactive **EVM + VVPAT Simulator** — practice voting before election day!

---

### 🔐 Role-Based Authentication System
> *Secure access for every stakeholder*

| Role | Access |
|------|--------|
| 🧑‍💼 **Voter** | Aadhaar eKYC simulation, personalized dashboard, booth assignment |
| 🛠️ **Admin** | Live election ops dashboard, Recharts analytics, complaint resolution |
| 👮 **Election Officer** | Booth management, incident reporting, officer dispatch |

---

### 📋 Manifesto Comparator
> *Cut through campaign promises*

Side-by-side structured comparison of candidates across key policy areas:
- Healthcare • Economy & Jobs • Infrastructure • Education • Technology

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 19 + Vite 8 |
| **Routing** | React Router DOM v7 |
| **Animations** | Framer Motion 12 |
| **UI Icons** | Lucide React |
| **Charts & Analytics** | Recharts |
| **Maps** | React Leaflet + OpenStreetMap |
| **Styling** | Vanilla CSS + Custom Design System |
| **Voice AI** | Web Speech API (STT + TTS) |
| **Backend Server** | Node.js + Express 5 |
| **Containerization** | Docker (node:20-alpine) |
| **Deployment** | CodeSandbox / Docker / Any Node host |

---

## 🏗️ Project Architecture

```
src/
├── components/
│   ├── ai-voice/              # Voice Assistant + hooks
│   │   ├── AIVoiceAssistant.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── VoiceVisualizer.jsx
│   │   └── hooks/
│   │       ├── useSpeechRecognition.js
│   │       └── useSpeechSynthesis.js
│   └── layout/               # Navbar, Footer, Layout
├── context/
│   ├── AuthContext.jsx        # Role-based auth state
│   ├── DataContext.jsx        # Candidates, booths, complaints
│   └── LanguageContext.jsx    # EN/HI bilingual support
└── pages/
    ├── Home.jsx               # Landing page
    ├── ai/                    # TruthShield, VoteMatch, Insights, Sentiment
    ├── auth/                  # Login, Aadhaar Verification
    ├── dashboard/             # Voter & Admin dashboards
    ├── education/             # Education Hub, EVM Simulator
    ├── election/              # Manifesto Comparator, Candidate Profile
    └── map/                   # BoothNav interactive map
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js **20.19+** or **22.12+**
- npm 9+

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/guptasneh/AI-Election-Assistant.git
cd AI-Election-Assistant

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Demo Credentials
| Role | How to Login |
|------|-------------|
| 🧑‍💼 Voter | Click "Login / Verify" → Select Voter → Enter any 12-digit number → Enter any 6-digit OTP |
| 🛠️ Admin | Click "Login / Verify" → Select System Admin → Enter any credentials |

---

## 📦 Docker Deployment

```bash
# Build the production Docker image
docker build -t election-app .

# Run the container
docker run -p 5174:5174 election-app

# Open http://localhost:5174
```

The Dockerfile uses a **multi-stage optimized build**:
1. Installs all dependencies (including devDeps for build)
2. Runs `vite build` to produce optimized static assets
3. Prunes devDependencies for a slim final image
4. Serves via Express on port 5174

---

## 🌐 CodeSandbox

[![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/github/guptasneh/AI-Election-Assistant)

The `.codesandbox/tasks.json` configuration automatically:
1. Installs dependencies
2. Builds the Vite app
3. Starts the Express server

---

## 🎨 Design System

The platform features a **premium dark-mode glassmorphism UI** with:
- `#0f172a` (Slate 950) base with layered transparency
- Emerald / Blue / Purple accent gradient palette
- `font-heading` — bold tracking for display text
- Smooth Framer Motion page transitions and hover micro-animations
- Fully responsive from mobile to 4K

---

## 🔑 Key Innovations

| Innovation | Description |
|-----------|-------------|
| **QueueSense™** | Predicted booth wait times based on crowd density signals |
| **TrustIndex™** | Composite scoring of candidate credibility from public records |
| **PromisePulse™** | Tracks campaign promises and maps them to government actions |
| **ELI5 Mode** | Simplifies complex democratic concepts for first-time voters |
| **Voice-First UX** | Complete voice navigation in both English and Hindi |

---

## 📸 Screenshots

> *Dark glassmorphism UI with emerald/blue gradient accents*

| Home Page | Voter Dashboard | TruthShield™ |
|-----------|----------------|--------------|
| Hero with live election ticker | Personalized constituency data | AI fact-check with source citations |

| BoothNav™ Map | VoteMatch AI™ | Admin Dashboard |
|---------------|---------------|-----------------|
| Interactive Leaflet map | 3-question policy quiz | Recharts live turnout analytics |

---

## 🛣️ Roadmap

- [ ] Real Aadhaar eKYC API integration (UIDAI sandbox)
- [ ] Live election results via ECI API
- [ ] Push notifications for booth queue alerts
- [ ] Offline-first PWA support
- [ ] ML-based deepfake detection in TruthShield™
- [ ] WhatsApp bot integration for rural voters

---

## 👩‍💻 Author

**Sneha Gupta**
- GitHub: [@guptasneh](https://github.com/guptasneh)
- Project: [AI-Election-Assistant](https://github.com/guptasneh/AI-Election-Assistant)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for Indian Democracy**

*Every vote matters. Every voice counts.*

⭐ **Star this repo** if you believe in transparent, AI-powered elections!

</div>
