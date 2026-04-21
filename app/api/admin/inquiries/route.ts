import { NextResponse } from "next/server";
import { readInquiries, updateInquiryReadAt } from "@/lib/inquiries";

const ADMIN_PASSWORD = "iso_admin";

function isAuthorized(req: Request) {
  const password = req.headers.get("x-admin-password");
  return password === ADMIN_PASSWORD;
}

function compareByUnreadAndRecent(a: { readAt: string | null; createdAt: string }, b: { readAt: string | null; createdAt: string }) {
  if (a.readAt === null && b.readAt !== null) return -1;
  if (a.readAt !== null && b.readAt === null) return 1;
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "인증 실패" }, { status: 401 });
  }

  const list = await readInquiries();
  const sorted = [...list].sort(compareByUnreadAndRecent);
  return NextResponse.json({ items: sorted });
}

export async function PATCH(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "인증 실패" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const id = typeof body?.id === "string" ? body.id : "";
    if (!id) return NextResponse.json({ error: "id가 필요합니다." }, { status: 400 });

    const list = await readInquiries();
    const current = list.find((item) => item.id === id);
    if (!current) return NextResponse.json({ error: "대상을 찾을 수 없습니다." }, { status: 404 });

    const read = typeof body?.read === "boolean" ? body.read : true;
    const result = await updateInquiryReadAt(id, read);
    if (!result.ok) return NextResponse.json({ error: "대상을 찾을 수 없습니다." }, { status: 404 });

    const item = { ...current, readAt: result.readAt };
    return NextResponse.json({ ok: true, item });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
