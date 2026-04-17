import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AdminLogin } from "@/components/admin/AdminLogin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "관리자 인증 | ISO 인증 파트너",
  description: "문의·견적·상담 접수 내역 확인을 위한 관리자 인증 페이지입니다.",
};

export default function AdminPage() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-bg-secondary py-[var(--section-y)]">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <AdminLogin />
        </div>
      </main>
      <Footer />
    </>
  );
}
