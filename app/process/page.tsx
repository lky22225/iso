import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "인증절차 상세 | ISO 인증 파트너",
  description: "ISO 인증 절차 상세 이미지",
};

export default function ProcessPage() {
  return (
    <>
      <Header />
      <main className="bg-bg-primary py-[var(--section-y)]">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <section className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-black/5 md:p-8">
            <div className="mb-6 flex items-center justify-between gap-3">
              <h1 className="text-2xl font-semibold text-ink-primary sm:text-3xl">인증절차 상세</h1>
              <Link
                href="/#process"
                className="rounded-full border border-ink-primary/15 px-4 py-2 text-sm font-semibold text-ink-primary transition hover:bg-bg-primary"
              >
                메인으로 돌아가기
              </Link>
            </div>
            <div className="mx-auto w-full max-w-[900px] overflow-hidden rounded-2xl ring-1 ring-black/5">
              <Image
                src="/images/process-10steps.png"
                alt="한눈에 보는 인증 취득 및 유지 10단계 프로세스"
                width={1400}
                height={780}
                className="h-auto w-full"
                priority
              />
            </div>
            <p className="mt-4 text-sm text-ink-secondary">
              EQ인증원의 10단계 프로세스를 준수하여 수행합니다.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
              >
                인증가능성진단받기
              </Link>
              <Link
                href="/#checklist"
                className="rounded-full border border-ink-primary/15 bg-white px-6 py-3 text-sm font-semibold text-ink-primary transition hover:shadow-card"
              >
                준비서류체크리스트
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

