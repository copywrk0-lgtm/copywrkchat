# Copywrk — ERA-inspired rebuild

A full Next.js prototype translating the pacing and interaction grammar of ERA Residence into Copywrk's own identity. It is intentionally **not a pixel clone**: the typography, copy, project structure, palette and interaction concept are Copywrk-specific.

## Stack

- Next.js App Router
- TypeScript
- React
- GSAP + ScrollTrigger
- Lenis smooth scrolling
- `next/image`

## Included experience

- Oversized editorial hero
- Scroll-driven type and image choreography
- Fullscreen index/menu
- DESIGN ↔ BUILD global-state section
- Full-screen project chapters with sticky cinematic media
- Horizontal capabilities rail on desktop
- Mobile-specific stacked treatment
- Evolution / before-after brand section
- Fullscreen contact close
- Scroll progress
- Reduced-motion handling
- App Router metadata, manifest, robots and sitemap
- Custom 404

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Production check:

```bash
npm run typecheck
npm run build
```

## Project content

Edit the work entries in `data/projects.ts`. The three current image sources live in `public/images/` and can be replaced without changing the component architecture.

## Important

This is a standalone prototype. Nothing in this folder changes or deploys `copywrk.website` automatically.

## Built-in floating Copywrk Chat (local ZIP version)

The chatbot is installed **inside this site**, not as a new landing page. A compact bottom-right launcher expands into a small conversation panel. Desktop and mobile are supported. The original project sections and animations are unchanged. Closing the panel returns you to the same scroll position.

- Component: `components/ui/CopywrkChatWidget.tsx` and `copywrk-chat-widget.css`.
- Embedded mini assistant: `public/copywrk-chat/embed.html`, `chat.js`, `chat.css`.
- Next.js APIs: `/api/chat-config`, `/api/chat`, `/api/lead`.
- **Without any credentials**, chat runs in clearly labelled scripted demo mode; in local development, fake project briefs are written to `data/chat-leads.jsonl` (gitignored).
- To use live AI, add `OPENAI_API_KEY` to `.env.local`, optional `OPENAI_MODEL` (default `gpt-4.1-mini`). API usage incurs separate charges. Restart the dev server.
- For **production leads**, configure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`, then run `sql/chat_leads.sql` in your Supabase SQL editor. Or configure `RESEND_API_KEY`, `OWNER_EMAIL` and `FROM_EMAIL` for verified email delivery. Without those, the form returns a clear error rather than pretending a lead was delivered.
- WhatsApp is a **manual click-to-chat link**, not Cloud API or coexistence. `COPYWRK_WHATSAPP_NUMBER` may be set in `.env.local` (currently defaults to the studio's public contact number).
- AI is not trained on private business data. Edit `lib/chat-server.ts` for accurate business answers; do not invent prices, timelines or portfolio proof.
- The in-memory IP limiter is suitable for basic local/demo testing only. Before public use, add provider/WAF bot protection and durable quotas, and confirm your privacy and retention policies.

**No GitHub or Vercel connections were accessed or updated by this ZIP editing step.** This modified project stays local until you choose to deploy it.
