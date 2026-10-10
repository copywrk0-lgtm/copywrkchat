import { NextResponse } from "next/server";
import { deliverLead, limited, validateLead } from "@/lib/chat-server";

export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    if (Number(request.headers.get("content-length") || 0) > 18000) return NextResponse.json({error:"Request too large."}, {status:413});
    const payload = await request.json() as unknown;
    const parsed = validateLead(payload);
    if (!parsed.lead) return NextResponse.json({error:parsed.error || "Invalid lead."}, {status:400});
    if (!limited(request)) return NextResponse.json({error:"Too many submissions. Please try again later."}, {status:429});
    try {
      const delivery=await deliverLead(parsed.lead);
      return NextResponse.json({ok:true,...delivery},{headers:{"Cache-Control":"no-store"}});
    } catch (error) {
      console.error("Copywrk Chat lead delivery error",error);
      return NextResponse.json({error:"The enquiry form is not connected yet. Please use WhatsApp or email copywrk0@gmail.com directly."},{status:503});
    }
  } catch {
    return NextResponse.json({error:"Invalid request body."}, {status:400});
  }
}
