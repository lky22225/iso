import { NextResponse } from "next/server";
import { createInquiry, readInquiries, writeInquiries } from "@/lib/inquiries";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body?.company || !body?.contactName || !body?.phone || !body?.email) {
      return NextResponse.json({ error: "필수 항목이 누락되었습니다." }, { status: 400 });
    }
    const list = await readInquiries();
    const inquiry = createInquiry({
      intent: body.intent === "quote" ? "quote" : "consult",
      company: String(body.company),
      contactName: String(body.contactName),
      phone: String(body.phone),
      email: String(body.email),
      industry: body.industry ? String(body.industry) : "",
      headcount: body.headcount ? String(body.headcount) : "",
      standards: Array.isArray(body.standards) ? body.standards.filter((x: unknown) => typeof x === "string") : [],
      targetDate: body.targetDate ? String(body.targetDate) : "",
      body: body.body ? String(body.body) : "",
      createdAt: body.createdAt ? String(body.createdAt) : new Date().toISOString(),
    });
    list.push(inquiry);
    await writeInquiries(list);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
