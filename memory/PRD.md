# Chetna AI Studio - Landing Page PRD

## Original Problem Statement
Premium, minimalist, high-converting dark-themed landing page for "Chetna AI Studio" digital agency. Lead generation via WhatsApp for Website Design (main), Branding, Growth, Automation services.

## Architecture
- **Frontend**: React + Tailwind CSS, single-page landing + admin + blog
- **Backend**: FastAPI with MongoDB for lead storage, analytics, blog CMS
- **Design**: Dark theme (#0A0A0A), white text, blue accent (#3B82F6), Poppins + Inter fonts

## User Personas
- Small business owners with no website or non-converting website
- Professionals wanting digital presence
- Local businesses seeking growth

## Core Requirements
- WhatsApp-based lead generation (wa.me/919326505598)
- Lead capture form with DB storage + WhatsApp redirect
- Interactive chatbot popup (auto-opens after 4s)
- Analytics event tracking + Google Analytics integration
- Admin dashboard for leads, analytics, blog management
- Blog section for SEO content marketing
- Responsive (320px to 1920px+)

## What's Been Implemented (Dec 2025)

### Phase 1 - Landing Page
- [x] Hero section with animated mockup + CTAs
- [x] Problem scroll story section
- [x] 3-step Solution system
- [x] Before/After case study slider
- [x] Services bento grid (Core/Branding/Growth/Automation)
- [x] Portfolio gallery (6 projects)
- [x] Offer section (₹15,000 → ₹4,999)
- [x] Testimonials section (5 reviews)
- [x] Lead form with DB storage + WhatsApp redirect
- [x] Final CTA section
- [x] Interactive chatbot with conversation flow
- [x] Floating WhatsApp button with pulse animation
- [x] Sticky header with glass effect + Blog link
- [x] Sticky bottom CTA (mobile)
- [x] Footer with navigation + Blog link

### Phase 2 - Admin, Analytics, Blog
- [x] Admin dashboard at /admin with password protection
- [x] Admin Leads tab (table, search, filter, pagination, CSV export, delete)
- [x] Admin Analytics tab (stats cards, bar charts, recent activity)
- [x] Admin Blog tab (create, edit, delete, toggle publish)
- [x] Google Analytics integration (placeholder for REACT_APP_GA_MEASUREMENT_ID)
- [x] Blog listing page at /blog with tag filtering
- [x] Individual blog post page at /blog/:slug with markdown rendering
- [x] 3 seed blog posts created

## Routes
- `/` - Landing page
- `/admin` - Admin dashboard (password protected)
- `/blog` - Blog listing
- `/blog/:slug` - Individual blog post

## Backend API Endpoints
- POST /api/leads - Create lead
- GET /api/leads - List leads
- POST /api/analytics - Track event
- GET /api/analytics/summary - Analytics overview
- POST /api/admin/auth - Verify admin password
- GET /api/admin/leads - Admin leads (search, filter, paginate)
- GET /api/admin/leads/export - Export leads CSV
- DELETE /api/admin/leads/:id - Delete lead
- GET /api/admin/analytics - Detailed analytics
- GET /api/admin/blog - All blog posts (admin)
- POST /api/admin/blog - Create blog post
- PUT /api/admin/blog/:id - Update blog post
- DELETE /api/admin/blog/:id - Delete blog post
- GET /api/blog - Public published posts
- GET /api/blog/:slug - Public single post

## Prioritized Backlog
### P1
- Email notification on new lead (SendGrid/Resend)
- Rich text editor for blog (instead of plain textarea)
- Image upload for blog posts

### P2
- Multi-language support (Hindi/English)
- A/B testing for CTAs
- Social sharing for blog posts
- Blog comment system
