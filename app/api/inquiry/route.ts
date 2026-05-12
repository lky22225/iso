import { NextResponse } from "next/server";
import { sendInquiryNotificationEmail } from "@/lib/inquiry-email";
import { insertInquiry } from "@/lib/inquiries";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body?.company || !body?.contactName || !body?.phone || !body?.email) {
      return NextResponse.json({ error: "필수 항목이 누락되었습니다." }, { status: 400 });
    }

    const auditType =
      body.auditType != null && typeof body.auditType === "string" ? body.auditType : undefined;

    const record = await insertInquiry({
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

    const emailOn =
      process.env.INQUIRY_EMAIL_ENABLED === "true" || process.env.INQUIRY_EMAIL_ENABLED === "1";
    if (emailOn) {
      try {
        await sendInquiryNotificationEmail(record, { auditType });
      } catch (mailErr) {
        console.error("[inquiry] 메일 발송 실패:", mailErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
