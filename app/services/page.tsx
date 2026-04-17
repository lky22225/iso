import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { isoOverviewText, isoServices } from "@/lib/iso-services";

export const metadata: Metadata = {
  title: "ISO 인증 개요 | ISO 인증서비스",
  description: "ISO 인증 개요 및 ISO 9001, 14001, 45001, 27001 안내",
};

export default function ServicesOverviewPage() {
  return (
    <>
      <Header />
      <main className="bg-bg-primary py-[var(--section-y)]">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <section className="rounded-2xl bg-white p-8 shadow-card ring-1 ring-black/5 md:p-10">
            <p className="mb-3 text-sm font-semibold text-accent">ISO 인증서비스</p>
            <h1 className="text-3xl font-bold text-ink-primary">ISO 인증 개요</h1>
            <p className="mt-5 leading-relaxed text-ink-secondary">{isoOverviewText}</p>
          </section>

          <section className="mt-10">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-ink-primary">규격 선택</h2>
                <p className="mt-2 text-sm text-ink-secondary">
                  대표 4개 규격을 선택하면 상세 페이지로 이동합니다.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {isoServices.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-cardHover"
                >
                  <p className="text-sm font-semibold text-accent">ISO {item.code}</p>
                  <h3 className="mt-2 text-lg font-semibold text-ink-primary">{item.title}</h3>
                  <p className="mt-3 text-sm text-ink-secondary">{item.summary}</p>
                  <p className="mt-4 text-sm font-semibold text-accent">상세 보기 →</p>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/contact"
                className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
              >
                기타 표준(선택) 상담/문의
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

