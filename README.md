# LeMultiservice — Next.js 14 + Firebase

Stack : **Next.js 14 App Router · TypeScript · Tailwind CSS · Framer Motion · GSAP · Firebase**

---

## 🚀 Installation

```bash
npm install
```

## ⚙️ Configuration Firebase

1. Crée un projet sur [firebase.google.com](https://firebase.google.com)
2. Active **Firestore Database** (mode production)
3. Copie `.env.local.example` → `.env.local`
4. Remplis les variables avec les clés de ton projet Firebase

```bash
cp .env.local.example .env.local
```

### Collections Firestore créées automatiquement

| Collection          | Déclencheur                        |
|---------------------|------------------------------------|
| `contact_requests`  | Soumission du formulaire Contact   |
| `partner_leads`     | Soumission du formulaire Partenaire|

### Règles Firestore recommandées (Console → Firestore → Rules)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contact_requests/{id} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /partner_leads/{id} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## 🖼️ Images

Place les images dans `/public/images/` :

| Fichier          | Usage                        |
|------------------|------------------------------|
| `logo.jpg`       | Logo navbar & footer         |
| `borne.jpg`      | Photo de la borne            |
| `cap2.jpg`       | Screenshot app (slide 1)     |
| `cap3.jpg`       | Screenshot app (slide 2)     |
| `cap4.jpg`       | Screenshot app (slide 3)     |
| `cap5.jpg`       | Screenshot app (slide 4)     |
| `cap6.jpg`       | Screenshot app (slide 5)     |
| `cap7.jpg`       | Screenshot app (slide 6)     |
| `cap8.jpg`       | Screenshot app (slide 7)     |
| `cap9.jpg`       | Screenshot app (slide 8)     |
| `cap10.jpg`      | Screenshot app (slide 9)     |

> Les images du dossier Magic Patterns sont déjà nommées correctement — copie-les depuis `/public/` de l'ancien projet.

## 🧑‍💻 Dev

```bash
npm run dev      # localhost:3000
npm run build    # build production
npm run start    # serve build
```

## 📁 Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + fonts + metadata
│   ├── page.tsx            # Page principale (composition des sections)
│   └── globals.css         # Design tokens + Tailwind base
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky, scroll-aware, mobile drawer
│   │   └── Footer.tsx
│   └── sections/
│       ├── HeroSection.tsx      # Phone carousel + GSAP orbs parallax
│       ├── StatsSection.tsx     # Animated counters (IntersectionObserver)
│       ├── ServicesSection.tsx  # 6 cards + GSAP scroll stagger
│       ├── ExperienceSection.tsx # App carousel + borne + PDV revenue
│       ├── HowItWorks.tsx       # 3 steps + tech stack
│       ├── SocialProof.tsx      # Testimonials + partners marquee + vision 2026
│       └── ContactSection.tsx   # react-hook-form + zod + Firebase write
├── lib/
│   ├── firebase/
│   │   ├── config.ts       # Firebase init (singleton safe)
│   │   ├── contact.ts      # Firestore write — contact_requests
│   │   └── partners.ts     # Firestore write — partner_leads
│   ├── hooks/
│   │   ├── useScrollReveal.ts  # GSAP ScrollTrigger stagger
│   │   └── useCounter.ts       # Animated number counter
│   └── utils.ts            # cn() helper
├── data/
│   └── index.ts            # Toutes les données statiques centralisées
└── types/                  # (extensible)
```

## 🚢 Déploiement

**Vercel (recommandé)**
```bash
npx vercel
```
Ajoute les variables d'env Firebase dans le dashboard Vercel.

---

Développé par **Jokko Tech AI SAS** — Dirigé par Lamine Cissé  
© 2025 LeMultiservice by Digital Assur
