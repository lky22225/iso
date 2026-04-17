import { Header } from "@/components/Header";
import { AdminInquiryBoard } from "@/components/admin/AdminInquiryBoard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "관리자 문의 내역 | ISO 인증 파트너",
  description: "문의·견적·상담 접수 내역을 확인하는 관리자 페이지입니다.",
};

export default function AdminInquiriesPage() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-bg-secondary">
        <AdminInquiryBoard />
      </main>
    </>
  );
}
