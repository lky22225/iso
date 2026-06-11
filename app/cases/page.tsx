import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { pageOgMeta } from "@/lib/open-graph";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const title = "실제 사례 | ISO 인증 파트너";
const description = "도소매·서비스·제조업 ISO 9001 인증 성공 사례와 실제 심사 과정 영상을 확인하세요.";

const caseVideos = [
  {
    href: "https://youtu.be/1_fxO3k3SIQ",
    thumbnail: "/images/iso-case-youtube-1.png",
    alt: "ISO9001 인증 사례: 1. 도소매업 ISO 9001 구축 성공사례",
    ariaLabel: "도소매업 ISO 9001 구축 성공사례 동영상 보기",
  },
  {
    href: "https://youtu.be/YdnW6gVdwBY",
    thumbnail: "/images/iso-case-youtube-2.png",
    alt: "ISO9001 인증 사례: 2. 서비스업 ISO 9001 구축 성공사례",
    ariaLabel: "서비스업 ISO 9001 구축 성공사례 동영상 보기",
  },
  {
    href: "https://youtu.be/LsNhgLwvpKM",
    thumbnail: "/images/iso-case-youtube-3.png",
    alt: "ISO9001 인증 사례: 3. 제조업 ISO 9001 구축 성공사례",
    ariaLabel: "제조업 ISO 9001 구축 성공사례 동영상 보기",
  },
  {
    href: "https://youtu.be/Diecd8zDQL8",
    thumbnail: "/images/iso-case-youtube-4.png",
    alt: "ISO9001 실제 심사 과정 재현: 심사원은 실제로 무엇을 질문할까?",
    ariaLabel: "ISO9001 실제 심사 과정 재현 동영상 보기",
  },
];

export const metadata: Metadata = {
  title,
  description,
  ...pageOgMeta({ title, description, path: "/cases" }),
};

export default function CasesPage() {
  return (
    <>
      <Header />
      <main className="bg-bg-primary py-[var(--section-y)]">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <section className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-black/5 md:p-8">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-2xl font-semibold text-ink-primary sm:text-3xl">실제 사례 보기</h1>
              <Link
                href="/"
                className="rounded-full border border-ink-primary/15 px-4 py-2 text-sm font-semibold text-ink-primary transition hover:bg-bg-primary"
              >
                메인으로 돌아가기
              </Link>
            </div>
            <p className="max-w-3xl text-sm leading-relaxed text-ink-secondary">
              제조·IT·서비스·유통 등 다양한 업종의 ISO 9001 인증 구축 사례와 실제 심사 과정을 영상으로
              확인해 보세요.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {caseVideos.map((video) => (
                <a
                  key={video.href}
                  href={video.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-2xl ring-1 ring-black/5 transition hover:shadow-cardHover"
                  aria-label={video.ariaLabel}
                >
                  <div className="relative aspect-video w-full">
                    <Image
                      src={video.thumbnail}
                      alt={video.alt}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-ink-primary/0 transition group-hover:bg-ink-primary/10">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/90 text-white shadow-card transition group-hover:scale-110">
                        ▶
                      </span>
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
              >
                사례 상담 요청
              </Link>
              <Link
                href="/services/iso-9001"
                className="rounded-full border border-ink-primary/15 bg-white px-6 py-3 text-sm font-semibold text-ink-primary transition hover:shadow-card"
              >
                ISO 9001 안내 보기
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
