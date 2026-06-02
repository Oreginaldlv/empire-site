# Codex Instructions — Empire Sales Build

You are building the Empire revenue system for Oreginald.

Primary goal:
Turn the website into a working sales funnel for AI automation services so the business can collect leads and payments immediately.

Current offer:
LeadFlow Engine

Locked pricing:
- $297 setup fee
- $49/month maintenance

Core customer:
Small businesses that miss leads, respond too slowly, lose follow-up opportunities, or need automated booking/review/customer intake systems.

Primary CTA:
Start My LeadFlow Setup

Secondary CTA:
Book a Demo

Main product promise:
We install an AI-powered lead capture and follow-up system that helps small businesses respond faster, capture customer details, trigger follow-up, and move prospects toward booked appointments or paid invoices.

Build priorities:
1. Repair and improve the existing /ai-workflows sales page.
2. Add strong LeadFlow Engine offer copy.
3. Add a lead capture form.
4. Send form submissions to the n8n webhook URL from NEXT_PUBLIC_LEADFORM_WEBHOOK_URL.
5. Add Stripe Payment Link button using NEXT_PUBLIC_STRIPE_PAYMENT_LINK.
6. Add clear pricing: $297 setup + $49/month.
7. Add service sections:
   - AI Receptionist
   - Lead Capture
   - Follow-Up Automation
   - Appointment Booking
   - Review Requests
   - Customer Dashboard Coming Soon
8. Add honest trust-building copy. Do not claim clients, testimonials, guarantees, or results we do not have.
9. Make the page mobile-friendly.
10. Run build checks before final response.

Technical rules:
- Use existing Next.js app structure.
- Do not break existing pages.
- Prefer simple, working code over complex architecture.
- Do not create unnecessary dependencies.
- Do not expose secret keys.
- Keep all public URLs in environment variables.
- If a file or route already exists, improve it instead of duplicating it.
- After changes, run npm run build.

Success definition:
The site must have a working sales page where a visitor can:
- Understand the offer
- Submit their business info
- Click to pay through Stripe
- Know what happens next

Do not work on dashboards, auth, portals, credit repair, ebooks, blog posts, or visual polish until the sales page, lead form, payment link, and n8n webhook are working.
