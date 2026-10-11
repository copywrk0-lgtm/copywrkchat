import { NextResponse } from "next/server";

export const runtime = "nodejs";
export function GET() {
  // This is the existing public studio WhatsApp number; change in .env.local if needed.
  const number=(process.env.COPYWRK_WHATSAPP_NUMBER || "919711170297").replace(/\D/g, "");
  return NextResponse.json({
    brand: "Copywrk", agentName: "Studio assistant",
    welcome: "Hey! I’m the Copywrk assistant. Looking for a new website, a redesign, or something else?",
    quickReplies: ["I need a website", "Redesign my site", "See pricing", "AI chatbots"],
    privacyNotice: "Chat replies are automated. For project enquiries, we will use your details to follow up. Please don't share passwords or payment details.",
    website: "https://copywrk.website",
    hasWhatsApp: Boolean(number),
    handoffUrl: number ? `https://wa.me/${number}?text=${encodeURIComponent("Hi Copywrk, I would like to discuss a website project.")}` : null,
    mode: process.env.GEMINI_API_KEY ? "ai" : "demo",
  }, { headers: { "Cache-Control": "no-store" } });
}
