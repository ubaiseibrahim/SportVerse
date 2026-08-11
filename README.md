# ScoreVerse – India's Smart Sports Booking Platform

A premium, production-ready React landing website built with:
- **React 18** + **Vite 5**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** – animations & transitions
- **Lucide React** + **React Icons** – icon libraries
- **React Router DOM** – routing
- **React CountUp** – animated stat counters
- **Clsx** – conditional class utilities

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── assets/              # Static assets
├── components/          # Reusable UI components
│   ├── Navbar.jsx       # Sticky navbar with glassmorphism
│   ├── Footer.jsx       # Footer with links & socials
│   ├── SectionTitle.jsx # Reusable section heading
│   └── AnimatedBlobs.jsx# Background ambient blobs
├── sections/            # Page sections
│   ├── HeroSection.jsx
│   ├── AboutSection.jsx
│   ├── FeaturesSection.jsx
│   ├── HowItWorksSection.jsx
│   ├── TournamentsSection.jsx
│   ├── AuctionSection.jsx
│   ├── OwnersSection.jsx
│   ├── ScreenshotsSection.jsx
│   ├── WhyChooseSection.jsx
│   ├── TestimonialsSection.jsx
│   ├── FAQSection.jsx
│   ├── DownloadSection.jsx
│   └── ContactSection.jsx
├── pages/
│   └── HomePage.jsx     # Main page assembling all sections
├── hooks/
│   ├── useInView.js     # IntersectionObserver hook
│   └── useScrolled.js   # Scroll detection hook
├── utils/
│   └── animations.js    # Framer Motion variants
├── App.jsx
├── main.jsx
└── index.css            # Global design system
```

## Design System

- **Colors**: Royal Blue (#2563EB), Emerald Green (#10B981), Dark (#111827)
- **Typography**: Inter (body) + Space Grotesk (display)
- **Style**: Glassmorphism, gradient borders, animated blobs, floating cards
- **Animations**: Framer Motion fade-up, fade-left/right, zoom, scroll reveal

## Sections

1. **Navbar** – sticky, glassmorphism on scroll, mobile menu
2. **Hero** – animated headline, floating UI cards, stats bar
3. **About** – platform overview, live stats dashboard
4. **Features** – 16 animated feature cards
5. **How It Works** – 4-step timeline
6. **Tournaments** – format cards + animated bracket
7. **Auction** – live bidding mockup + team budgets
8. **Owners** – feature grid + dashboard mockup
9. **Screenshots** – interactive phone carousel (7 screens)
10. **Why Choose** – animated counter stats
11. **Testimonials** – auto-sliding carousel
12. **FAQ** – animated accordion
13. **Download** – CTA with store buttons
14. **Contact** – contact cards + form
15. **Footer** – links + socials + copyright

© 2026 ScoreVerse. Powered by Decolz.
