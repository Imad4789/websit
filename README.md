# Center Tyani

A premium modern educational website for **CENTER TYANI** — a tutoring and academic support center based in Belfaa, Morocco.

## Overview

Center Tyani offers professional tutoring and academic support for Collège, Lycée, and BAC students across core subjects: Mathématiques, Physique, SVT, Français, and English.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start (SSR-capable React meta-framework) |
| Routing | TanStack Router v1 (file-based) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion v11 |
| Icons | Lucide React |
| Build | Vite 7 |
| Deployment | Netlify |

## Running Locally

```bash
npm install
npm run dev
```

The development server starts on [http://localhost:3000](http://localhost:3000). The Netlify dev server (port 8888) is also available via:

```bash
netlify dev
```

## Building for Production

```bash
npm run build
```

Output goes to `dist/client` (configured in `netlify.toml`).

## Admin Dashboard

The CMS dashboard is available at `/admin`.

- Default admin password: `Ixvm67@@tyani`
- Student registrations include full name, phone, parent phone, academic level, subject, and optional message
- CMS content is saved to Supabase `cms_data` with the browser client and `.upsert()`
- Registrations and contact messages are sent through the server API to Resend and stored in Supabase
- Admin can edit sections, text, announcements, promotions, images, galleries, levels, subjects, teachers, contact details, and design settings
- Section order supports drag and drop; CMS changes auto-save and update the public site

Create a Supabase project, run `database/supabase-schema.sql`, then add the values from `.env.example` in Netlify environment variables. `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` power live CMS reads/writes in the browser. Keep `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` server-side only.

## Project Structure

```
src/
  components/
    Navbar.tsx              # Fixed navigation with scroll-aware styling
    sections/
      Hero.tsx              # Full-screen hero with logo, CTAs, and stats
      About.tsx             # About section with image and feature cards
      Levels.tsx            # Collège / Lycée / BAC level cards
      Subjects.tsx          # Subject cards (Math, Physics, SVT, French, English)
      Gallery.tsx           # Photo gallery with lightbox
      WhyUs.tsx             # Animated counters + differentiators
      Registration.tsx      # Glassmorphism registration form
      Contact.tsx           # Contact info + Google Maps embed
      Footer.tsx            # Footer with navigation and social links
    ui/
      WhatsAppButton.tsx    # Floating WhatsApp CTA button
  routes/
    __root.tsx              # HTML shell with SEO meta and Poppins font
    index.tsx               # Main page assembling all sections
  styles.css                # Tailwind + custom CSS variables and utilities
public/
  gallery/                  # Uploaded center photos
```

## Contact Information

- **Phone**: +212 6 64 22 69 60
- **Email**: centretyanibelfaa@gmail.com
- **Facebook**: https://www.facebook.com/profile.php?id=100065477044363
- **Instagram**: centretyanibelfaa
