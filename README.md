# Devanand B — Developer Portfolio

A modern, animated developer portfolio built with React, featuring smooth Framer Motion animations, a Netflix-style project carousel, and a fully functional contact form.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)

## ✨ Features

- **Splash Screen** — Animated intro on first visit
- **Typewriter Hero** — Dynamic role titles with typing/deleting animation
- **Project Carousel** — Netflix-style horizontally scrollable project cards grouped by category
- **Project Modal** — Detailed project view with tech stack, features, and links
- **About & Expertise** — Skills showcase with proficiency indicators
- **Experience Timeline** — Professional and academic history
- **Certifications** — Visual certification cards
- **Contact Form** — Functional email delivery via Resend
- **Floating Orbs** — Ambient animated background elements
- **Fully Responsive** — Optimized for desktop, tablet, and mobile

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | Framer Motion |
| Backend | Supabase (Database, Edge Functions) |
| Email | Resend API |
| Data Fetching | TanStack React Query |
| Routing | React Router v6 |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm or bun

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## 📁 Project Structure

```
src/
├── assets/              # Images (profile, projects, certifications)
├── components/
│   ├── animations/      # Reusable animation components
│   │   ├── FloatingOrbs.tsx
│   │   ├── TypewriterText.tsx
│   │   ├── GlowingCard.tsx
│   │   ├── ParallaxSection.tsx
│   │   └── ...
│   ├── ui/              # shadcn/ui primitives
│   ├── Navbar.tsx
│   ├── HeroBanner.tsx
│   ├── ProjectCarousel.tsx
│   ├── ProjectModal.tsx
│   ├── AboutExpertise.tsx
│   ├── ExperienceSection.tsx
│   ├── CertificationsSection.tsx
│   ├── ContactForm.tsx
│   └── Footer.tsx
├── hooks/               # Custom React hooks
├── integrations/        # Supabase client & types
├── pages/
│   └── Index.tsx        # Main portfolio page
└── index.css            # Global styles & design tokens
```

## 📬 Contact Form Setup

The contact form uses a Supabase Edge Function with [Resend](https://resend.com) for email delivery. To enable it:

1. Sign up at [resend.com](https://resend.com) and create an API key
2. Add `RESEND_API_KEY` as an environment secret in your project settings

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using [Lovable](https://lovable.dev)
