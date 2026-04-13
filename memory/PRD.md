# Chetna AI Studio - Landing Page PRD

## Original Problem Statement
Premium, minimalist, high-converting dark-themed landing page for "Chetna AI Studio" digital agency. Lead generation via WhatsApp for Website Design (main), Branding, Growth, Automation services.

## Architecture
- **Frontend**: React + Tailwind CSS, single-page landing
- **Backend**: FastAPI with MongoDB for lead storage & analytics
- **Design**: Dark theme (#0A0A0A), white text, blue accent (#3B82F6), Poppins + Inter fonts

## User Personas
- Small business owners with no website or non-converting website
- Professionals wanting digital presence
- Local businesses seeking growth

## Core Requirements
- WhatsApp-based lead generation (wa.me/919326505598)
- Lead capture form with DB storage + WhatsApp redirect
- Interactive chatbot popup (auto-opens after 4s)
- Analytics event tracking
- Responsive (320px to 1920px+)

## What's Been Implemented (Dec 2025)
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
- [x] Sticky header with glass effect
- [x] Sticky bottom CTA (mobile)
- [x] Analytics tracking (section views, CTA clicks)
- [x] Smooth scroll animations (fade-in, slide-up)
- [x] Footer with navigation

## Backend API Endpoints
- POST /api/leads - Create lead
- GET /api/leads - List leads
- POST /api/analytics - Track event
- GET /api/analytics/summary - Analytics overview

## Prioritized Backlog
### P0
- All features implemented ✅

### P1
- Admin dashboard for viewing leads
- Email notification on new lead
- A/B testing for CTAs

### P2
- Blog/content section for SEO
- Multi-language support (Hindi/English)
- Google Analytics integration
- Performance optimizations (lazy loading, image optimization)
