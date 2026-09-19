# Project Instructions & Rules - GEMINI.md

## ⚠️ กฎสำคัญที่สุด (Crucial Project Rules)

1. **ห้ามแก้ไขโค้ดเองโดยพลการ (Strict Rule: Do not modify code without explicit user request / instructions)**
   - ห้ามทำการเปลี่ยนแปลงโครงสร้างไฟล์, ลบฟีเจอร์, หรือแก้ไขโค้ดเดิมโดยที่ผู้ใช้ไม่ได้สั่งการหรือไม่ได้รับความเห็นชอบ
   - ทุกครั้งก่อนการปรับเปลี่ยนสถาปัตยกรรมหรือแก้ไขโค้ดหลัก จะต้องปรึกษาหรือรับความเห็นชอบจากผู้ใช้ก่อนเสมอ
   - หากพบข้อผิดพลาด ให้รายงานปัญหาและแนวทางแก้ไขก่อนดำเนินการ
   - รักษาความต่อเนื่องของโค้ดเดิม (Preserve existing functionality, comments, and structure)

---

## 🚗 Project Overview & Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Lucide Icons
- **Database**: Supabase (PostgreSQL) with fallback mock data
- **Deployment**: Vercel ready
- **Theme & Design**: Modern luxury automotive rental & marketplace template (as per UI mockups)

---

## 📁 Project Architecture & Directory Structure

```
car4rent/
├── GEMINI.md                  # Project rules & guidelines
├── AGENTS.md                  # Next.js agents notes
├── .env.example               # Environment variables template
├── .env.local                 # Local environment credentials
├── supabase/
│   ├── schema.sql             # Supabase database table definitions
│   └── seed.sql               # Seed sample cars and records
├── public/
│   ├── favicon.ico            # Custom brand favicon
│   ├── icon.svg               # Brand SVG vector icon
│   └── images/                # Car assets and hero banners
└── src/
    ├── app/
    │   ├── globals.css        # Global CSS & Tailwind styling
    │   ├── layout.tsx         # Root layout with fonts & metadata
    │   ├── page.tsx           # Home car rental & marketplace page
    │   ├── icon.svg           # Dynamic app icon
    │   └── favicon.ico
    ├── components/
    │   ├── brand/
    │   │   └── Logo.tsx       # Custom SVG Brand Logo & Icon
    │   ├── layout/
    │   │   ├── Navbar.tsx     # Header navigation bar
    │   │   └── Footer.tsx     # Footer with links & copyright
    │   ├── home/
    │   │   └── HeroSection.tsx# Hero headline, photo collage & floating search bar
    │   ├── cars/
    │   │   ├── FilterBar.tsx  # Filter pills, car type, fuel, price, show map
    │   │   ├── CarCard.tsx    # Responsive car card (2-col layout)
    │   │   ├── CarGrid.tsx    # Grid container with interactive state
    │   │   ├── CarModal.tsx   # Detailed booking / inquiry modal
    │   │   └── MapView.tsx    # Interactive map view modal/section
    │   └── common/
    │       └── Pagination.tsx # Pagination bar matching design
    ├── lib/
    │   ├── supabase/
    │   │   ├── client.ts      # Supabase client initializer
    │   │   └── server.ts      # Supabase server client
    │   ├── data/
    │   │   └── mockCars.ts    # Rich mock dataset fallback
    │   └── utils.ts           # Helper functions (currency, dates, cn)
    └── types/
        └── index.ts           # Car, Filter, Booking TypeScript interfaces
```

---

## 🗄️ Database & Supabase Conventions

- Database schema is kept in `supabase/schema.sql`.
- When Supabase environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are present, data is fetched and mutated via Supabase.
- When credentials are absent or during offline development, the app automatically switches to `src/lib/data/mockCars.ts` so that all UI, filters, search, favorites, and booking interactions remain 100% functional.

---

## 🚀 Deployment (Vercel)

- Fully compatible with Vercel zero-config Next.js deployments.
- Build command: `npm run build`
- Always verify type checking and linting before pushing changes.
