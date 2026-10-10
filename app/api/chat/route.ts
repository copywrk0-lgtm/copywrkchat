import { NextResponse } from "next/server";
import { aiReply, demoReply, limited, safeMessages } from "@/lib/chat-server";

export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    if (Number(request.headers.get("content-length") || 0) > 18000) return NextResponse.json({error:"Request too large."}, {status:413});
    const payload = await request.json() as {messages?:unknown};
    const messages = safeMessages(payload?.messages);
    if (!messages) return NextResponse.json({error:"Invalid chat messages."}, {status:400});
    if (!limited(request)) return NextResponse.json({error:"Too many requests. Please try again in a few minutes."}, {status:429});
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({reply:demoReply(messages),mode:"demo"},{headers:{"Cache-Control":"no-store"}});
    try {
      const reply = await aiReply(messages);
      return NextResponse.json({reply,mode:"ai"},{headers:{"Cache-Control":"no-store"}});
    } catch (error) {
      console.error("Copywrk Chat AI error",error);
      return NextResponse.json({error:"The AI assistant is temporarily unavailable. You can send a project brief instead."}, {status:502});
    }
  } catch {
    return NextResponse.json({error:"Invalid request body."},{status:400});
  }
}
