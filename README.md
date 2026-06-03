# Darshan BS — Portfolio (Next.js)

A modern, interactive, recruiter-focused portfolio for a **Data Engineer**.
Dark-mode SaaS aesthetic (Stripe/Vercel/Linear inspired) with blue→purple gradients,
glassmorphism, a Three.js particle background, and Framer Motion animations.

## ✨ Features

- **Hero** with typewriter role rotation, floating tech icons, and 3 CTAs
- **About**, animated **Skills dashboard** (proficiency bars), vertical **Experience timeline**
- **Featured Projects** as expandable interactive cards
- **Certifications** as animated Google Cloud badges
- **Interactive architecture diagram** (hover/tap each pipeline stage)
- **Animated achievement counters**
- **Contact form** with client-side validation (opens a prefilled email)
- Three.js particle field, scroll-triggered animations, pipeline loading screen
- SEO metadata + Open Graph, responsive, statically prerendered (fast Lighthouse)

## 🧱 Tech Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · Three.js + @react-three/fiber · react-icons

## 🚀 Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## ☁️ Deploy to Vercel (recommended, free)

**Option A — Git + Vercel dashboard (easiest):**
1. Create a GitHub repo (e.g. `portfolio-next`) and push this folder:
   ```bash
   git add .
   git commit -m "Next.js portfolio"
   git branch -M main
   git remote add origin https://github.com/darshandharu/portfolio-next.git
   git push -u origin main
   ```
2. Go to <https://vercel.com/new>, import the repo, and click **Deploy**.
   Vercel auto-detects Next.js — no config needed.
3. You'll get a live URL like `https://portfolio-next-xxxx.vercel.app`.
   Add a custom domain in **Project → Settings → Domains** if you want.

**Option B — Vercel CLI:**
```bash
npm i -g vercel
vercel          # follow prompts (link/create project)
vercel --prod   # deploy to production
```

## ✏️ Editing content

All text lives in **`src/lib/data.ts`** — profile, skills, experience, projects,
certifications, architecture stages, and achievement counters. Edit there; no need
to touch component code.

### ⚠️ Update before sharing
- **Certification verify links** in `data.ts` point to a placeholder
  `credly.com/users/darshan-bs`. Replace with your real Credly / Google Cloud
  credential URLs.
- **Resume** is at `public/resume.pdf` — replace to update the download.
- The `SITE_URL` in `src/app/layout.tsx` is set to `https://darshanbs.vercel.app`;
  change it to your final domain so Open Graph/SEO links are correct.
