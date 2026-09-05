# AfyaDesk — Your Healthcare Team, Virtually.

Premium, modern, conversion-focused website for AfyaDesk — Kenyan medical virtual assistant & healthcare support platform.

**Stack:** Next.js 16 (App Router) • TypeScript • Tailwind CSS v4 • PostgreSQL • Prisma ORM • Jose (JWT) • bcryptjs

## Quick Start

```bash
npm install
cp .env.example .env
# edit DATABASE_URL and AUTH_SECRET
npx prisma generate
npx prisma db push
npx prisma db seed   # or: npx tsx prisma/seed.ts
npm run dev
```

Open http://localhost:3000

## Environment

```
DATABASE_URL="postgresql://user:password@localhost:5432/afyadesk?schema=public"
AUTH_SECRET="replace-with-32+char-random-secret"
ADMIN_EMAIL="admin@afyadesk.co.ke"
ADMIN_PASSWORD="Admin123!"
```

If `DATABASE_URL` is not set, forms still succeed in demo mode (logged to console) and admin shows demo stats.

## Features

- **Homepage:** Hero, Problem, Solution, Services, How It Works, Why AfyaDesk, Security, Kenya/International, Pricing, Testimonials, FAQ, CTA — all premium SaaS-style, mobile-first
- **Services:** 7 dedicated pages `/services/[slug]` (VA, Receptionist, Transcription, Billing, Patient Support, Data & Admin, Telehealth)
- **Industries, About, Careers, Contact, Blog, Legal** (Privacy, Terms, Data Protection, Cookies)
- **Lead generation:** Contact form → `Lead` model (status: NEW→WON, notes, assignment, export CSV) + WhatsApp CTA + sticky mobile CTA
- **Careers:** Application form → `JobApplication` model
- **Blog CMS:** Static + DB-backed, SEO keywords, `/blog` + `/blog/[slug]`
- **Admin Dashboard** `/admin` (protected):
  - Dashboard stats (total/new/qualified/won, conversion)
  - Leads CRUD (status, notes, assign, soft delete, export)
  - Applications (status)
  - Services / Blog / Testimonials / FAQs / Settings management (DB-backed)
- **Auth:** httpOnly JWT cookie (`afyadesk_session`), bcrypt, middleware protection, roles ADMIN/STAFF/CLIENT/APPLICANT
- **DB Schema:** User, Lead, Client, Service, JobApplication, Testimonial, BlogPost, FAQ, ContactMessage, ActivityLog, SiteSetting — indexes, timestamps, soft delete
- **SEO:** Metadata, OpenGraph, sitemap.ts, robots.ts, semantic headings
- **Security:** Least-privilege, confidentiality messaging, no false HIPAA/GDPR claims

## Admin Access

- Visit `/admin/login`
- Demo: `admin@afyadesk.co.ke` / `Admin123!`
- Or create user via DB and login

## Prisma

```bash
npx prisma generate
npx prisma db push
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
```

## Deployment

- Works on Vercel / any Node host with Postgres (Supabase, Neon, RDS)
- Set env vars in host
- Build: `npm run build`

## Design System

- Navy #0B1F33, Teal #0F8B8D, Blue #2563EB, Light Blue #EAF6FF
- Rounded 20-28px cards, subtle shadows, generous spacing
- Inter font, premium healthcare-SaaS aesthetic, no generic templates

## Non-clinical Disclaimer

AfyaDesk provides administrative & support services only — not diagnosis, prescribing, clinical decision-making or emergency care.
