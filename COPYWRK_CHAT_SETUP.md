# Copywrk floating chatbot — integration notes

This modifies only the **uploaded archive**. There is **no separate landing page**, no GitHub changes and no Vercel changes.

## What's changed
- `app/layout.tsx` mounts a lazy-loaded floating chat launcher across the website.
- Floating WhatsApp CTA is **replaced**, not doubled. Header WhatsApp link is unchanged.
- `app/copywrk-chat-widget.tsx` and `app/copywrk-chat-widget.css` create a self-contained corner popup.
- `public/copywrk-chat/` contains the chat panel served in an iframe (not a standalone marketing page).
- `app/api/chat`, `app/api/chat-config`, and `app/api/lead` implement same-origin backend routes.
- `lib/chat-server.ts` implements scripted demo replies, optional OpenAI Responses API, lead validation, optional Supabase delivery and email notification.

## Quickstart
Requires Node.js 20.9+ (Node 22 LTS recommended).

```bash
npm ci
npm run dev
```

Visit http://localhost:3000, and click **ASK COPYWRK** in the lower-right corner. Try "See pricing", "I need a portfolio", and "AI chatbot", then **Send a project brief**.

## Safety and expectations
- Without `OPENAI_API_KEY`, this is clearly marked **SCRIPTED DEMO**, not real AI.
- Without Supabase or Resend, production submission returns an explicit error; it **never falsely confirms** a received lead. In development, briefs are written to `data/chat-leads.jsonl` (ignored by Git).
- On failed submissions, customers can send the filled brief to the public WhatsApp number manually, or send an email if WhatsApp is disabled.
- For real AI and persistent leads, copy `.env.example` to `.env.local` and add **server-side only** secrets. Do not put those keys in the frontend or a public repository.
- Configure `sql/chat_leads.sql` in Supabase first; use a verified domain for Resend notification emails.
- A simple in-memory limit protects demos but **is not sufficient for commercial production**. Add provider/WAF rate limiting and abuse controls before public release.
- Conversation history is stored temporarily in browser session storage; no server-side chat transcript inbox or multi-tenant features yet.
- WhatsApp is **manual click-to-chat only**, with no migration and no WhatsApp Cloud API.
