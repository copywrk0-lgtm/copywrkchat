# Copywrk Chat — working V1

A lightweight, reusable website assistant. **No npm dependencies, no WhatsApp API, no number migration.** Built with Node.js 20+, the browser platform, and optional hosted APIs. The interface is a website component, not a mockup.

## What's included

- Editorial product/preview page at `/`, working assistant at `/embed`.
- Universal floating widget loader at `/widget.js`, which can be embedded on virtually any website, including WordPress and Next.js.
- `/api/chat`: scripted **demo mode** with no key, or real OpenAI Responses API chat when a key is configured.
- `/api/lead`: validated, consent-based project brief collection; local JSONL in development or Supabase in production.
- Optional owner notifications through Resend email and/or an n8n webhook.
- Optional WhatsApp **click-to-chat handoff** using your existing WhatsApp Business app; no Cloud API required.
- Basic abuse protection, limited context, server-only secrets, bot honeypot, mobile UI, keyboard support, reduced-motion support, no user-generated HTML rendering.
- Editable business facts in `config/business.json`. No fabricated quotes, testimonials or prices.

## Start locally

1. Install **Node.js 20 or newer**.
2. In this folder, run `npm run dev` or `node server.mjs`.
3. Open `http://localhost:3000` (live working preview).
4. To see submissions, inspect `data/leads.jsonl` after sending a test brief. It is gitignored.
5. Run `npm test` to check API validation and endpoints.

**No API key needed for initial testing.** The assistant prominently says `SCRIPTED DEMO` in this mode. The demo uses simple rules and should not be sold as AI.

## Enable actual AI

1. Copy `.env.example` to `.env`.
2. Add `OPENAI_API_KEY=...`. OpenAI API billing is separate from ChatGPT subscription.
3. Optionally set `OPENAI_MODEL` to an available API model. Default is `gpt-4.1-mini`.
4. Restart Node; the label changes to `AI ASSISTANT` and answers use the OpenAI Responses API with `store:false`.

The AI instructions incorporate only your business facts, ask one question at a time, and avoid inventing prices and delivery timelines. Update the facts before showing this to prospects. Requests cost money: configure budget alerts and consider lower usage thresholds.

## Real lead capture (production)

1. Create a Supabase project. Run `sql/supabase.sql` in its SQL editor.
2. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` on the server only (never in browser code), and a long random `IP_HASH_SECRET`.
3. The API writes directly to `chat_leads`; Row Level Security denies the public role any access. View submissions in Supabase Table Editor.
4. For emails, configure `RESEND_API_KEY`, `OWNER_EMAIL`, `FROM_EMAIL` (verified sender domain). For n8n, configure `N8N_LEAD_WEBHOOK_URL` (secure private webhook URL).
5. Test with a fake enquiry and confirm the row and notification. A successful API response distinguishes saved vs notified.

In local development, when Supabase is absent, leads are stored in `data/leads.jsonl`. On Vercel/serverless, local file storage is not persistent; **configure Supabase**. In production without Supabase, a notification-only mode can deliver leads if your notification provider is configured, but a database is strongly recommended for reliable records.

## WhatsApp without coexistence

Put your **existing WhatsApp Business number**, with country code and digits only, into `whatsappNumber` in `config/business.json` (example format only: `919999999999`). A WhatsApp handoff link will then appear in the chat. The visitor decides whether to send the prefilled WhatsApp message. The chatbot cannot automatically send or follow up over WhatsApp without the Cloud API. **Do not deregister or migrate the number.**

## Embed on another website

After hosting the service, add this single tag before `</body>`:

```html
<script src="https://YOUR-CHAT-HOST.example/widget.js" data-label="Ask us anything" defer></script>
```

If the chat is hosted at `chat.copywrk.website`, the script automatically loads `https://chat.copywrk.website/embed` in its iframe. The chat backend stays on the chat host, so the installed website requires no API key. Use `EMBED_ALLOWED_ORIGINS` to allow trusted parent domains (comma-separated, e.g. `https://copywrk.website,https://www.copywrk.website`); ensure the host's own custom security headers don't block the iframe. The loader cannot be used directly from `file://`; run the server first.

## Deploy

- **Vercel:** `vercel.json` and `api/index.mjs` provide rewrites for the static site and serverless API. Use a plan that permits commercial activity; set all env vars in the project settings. Run Supabase SQL before accepting leads.
- **Traditional Node hosting (Render, Railway, VPS, etc.):** Run `npm start` with `PORT` set by the host. If using file storage, mount a persistent volume; Supabase is recommended.
- Use HTTPS, configure allowed embedding origins, and add your own website Privacy Policy/retention terms.

### Important operational limits of V1

- Intended as **one business per deployment**, not a multi-tenant SaaS. To serve a client, deploy their copy with their own knowledge and data environment. Before multi-client hosting, add tenant authentication, explicit authorization, per-tenant isolated storage, billing and domain verification.
- Rate limit: 25 requests per IP per 15-minute window. With Supabase configured, it uses a database RPC to make the limit durable. Without Supabase, the in-memory limiter is suitable only for demos and single-process local hosting, not production serverless. When on Vercel, set `TRUST_PROXY=true` and verify upstream request header handling, or use the hosting provider's trusted IP header. For higher volume, add a dedicated bot/WAF layer and quota monitoring.
- No admin interface yet: use Supabase Table Editor for leads. No messaging history is stored on the server; chat history is saved temporarily in browser session storage. Do not promise long-term transcript storage.
- The optional AI API transmits chat text to the model provider. Disclose this in your site policy. Avoid collecting sensitive data and set appropriate retention policies for submitted leads.
- Email sending requires a verified sender domain. n8n server must be always-on for its webhook to work. Lead storage remains independent of n8n.
- This V1 doesn't do autonomous scheduling, SMS, WhatsApp automation, CRM integrations or document RAG. Those can be later phases.

## Project structure

```
public/index.html         Product & preview page
public/embed.html         Chat panel UI
public/chat.js            Chat + brief interaction logic
public/chat.css           Chat UI styles
public/style.css          Editorial home styles
public/widget.js          Embeddable launcher
server.mjs                All APIs + local static server
api/index.mjs             Vercel serverless adapter
config/business.json      Editable business facts, brand, WhatsApp number
sql/supabase.sql          Production tables, RLS & rate limiting
.env.example              Optional integrations, secrets
```
