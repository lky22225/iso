import nodemailer from "nodemailer";
import type { InquiryRecord } from "@/lib/inquiries";

/** 웹 문의 알림 수신 주소 기본값 */
const DEFAULT_NOTIFY_TO = "isopartner5446@gmail.com";

function auditTypeLabel(code: string | undefined): string | undefined {
  if (!code) return undefined;
  const map: Record<string, string> = {
    initial: "최초",
    surveillance: "사후",
    renewal: "갱신",
  };
  return map[code] ?? code;
}

function formatInquiryText(record: InquiryRecord, extras?: { auditType?: string }): string {
  const intentLabel = record.intent === "quote" ? "견적 요청" : "무료 상담";
  const lines = [
    "웹사이트 문의가 접수되었습니다.",
    "",
    `접수 ID: ${record.id}`,
    `유형: ${intentLabel}`,
    `회사명: ${record.company}`,
    `담당자: ${record.contactName}`,
    `전화: ${record.phone}`,
    `문의자 이메일: ${record.email}`,
  ];
  if (record.industry) lines.push(`업종: ${record.industry}`);
  if (record.headcount) lines.push(`종업원 수: ${record.headcount}`);
  const at = auditTypeLabel(extras?.auditType);
  if (at) lines.push(`심사 종류(폼): ${at}`);
  if (record.standards?.length) lines.push(`희망 규격: ${record.standards.join(", ")}`);
  if (record.targetDate) lines.push(`목표 일정: ${record.targetDate}`);
  lines.push("", "— 상세 내용 —", record.body?.trim() || "(없음)");
  lines.push("", `접수 시각: ${record.createdAt}`);
  return lines.join("\n");
}

/**
 * SMTP 환경 변수가 있으면 알림 메일을 보냅니다.
 * 라우트에서 `INQUIRY_EMAIL_ENABLED=true` 일 때만 호출됩니다.
 * SMTP 미설정 시 아무 것도 하지 않으며, 콘솔에 안내만 남깁니다.
 * 수신: 기본 isopartner5446@gmail.com (INQUIRY_NOTIFY_TO 로 변경 가능)
 */
export async function sendInquiryNotificationEmail(
  record: InquiryRecord,
  extras?: { auditType?: string },
): Promise<void> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    console.warn(
      "[inquiry-email] SMTP_HOST / SMTP_USER / SMTP_PASS 가 없어 메일을 보내지 않았습니다. .env.example 을 참고하세요.",
    );
    return;
  }

  const port = Number(process.env.SMTP_PORT || "587");
  const secure =
    process.env.SMTP_SECURE === "true" || process.env.SMTP_SECURE === "1" || port === 465;
  const from = process.env.SMTP_FROM?.trim() || `ISO 인증 파트너 <${user}>`;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const intentShort = record.intent === "quote" ? "견적" : "상담";
  const subject = `[ISO 웹문의] ${intentShort} — ${record.company}`;

  const to = process.env.INQUIRY_NOTIFY_TO?.trim() || DEFAULT_NOTIFY_TO;

  await transporter.sendMail({
    from,
    to,
    replyTo: record.email,
    subject,
    text: formatInquiryText(record, extras),
  });
}
