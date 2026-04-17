import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ContactForm } from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "인증신청·견적·상담 | ISO 인증 파트너",
  description: "무료 상담 및 견적 요청. 회사명, 희망 인증, 목표 일정을 남겨 주세요.",
};

type Props = { searchParams: { type?: string } };

export default function ContactPage({ searchParams }: Props) {
  const defaultIntent = searchParams?.type === "quote" ? "quote" : "consult";

  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-bg-primary py-[var(--section-y)]">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold text-ink-primary">인증신청 · 견적 · 상담</h1>
            <p className="mt-3 text-ink-secondary">
              아래 항목을 입력해 주시면 담당자가 검토 후 연락드립니다. 급하신 일정은 문의 내용에
              함께 적어 주세요.
            </p>
            <div className="mt-10 rounded-2xl bg-white p-6 shadow-card ring-1 ring-black/5 sm:p-8">
              <ContactForm defaultIntent={defaultIntent} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
