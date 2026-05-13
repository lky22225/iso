import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { FaqBlock } from "@/lib/faq-data";
import { faqSections } from "@/lib/faq-data";
import { pageOgMeta } from "@/lib/open-graph";
import type { Metadata } from "next";

function FaqAnswer({ blocks }: { blocks: FaqBlock[] }) {
  return (
    <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-secondary">
      {blocks.map((block, i) => {
        const key = `${block.type}-${i}`;
        switch (block.type) {
          case "p":
            return (
              <p key={key} className="[&:empty]:hidden">
                {block.text}
              </p>
            );
          case "h3":
            return (
              <h3 key={key} className="text-sm font-semibold text-ink-primary">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={key} className="list-disc space-y-1.5 pl-5">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={key} className="list-decimal space-y-1.5 pl-5">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

const title = "FAQ | ISO 인증 파트너";
const description =
  "ISO 인증 FAQ 20문항. 기본 개념부터 절차, 비용, 심사, 범위, 인증기관 선택, 준비 실수까지 상세히 정리했습니다.";

export const metadata: Metadata = {
  title,
  description,
  ...pageOgMeta({ title, description, path: "/faq" }),
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-bg-secondary py-[var(--section-y)]">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-ink-primary sm:text-4xl">자주 묻는 질문(FAQ)</h1>
              <p className="mx-auto mt-3 max-w-2xl text-ink-secondary">
                ISO 인증 준비부터 운영까지 자주 질문하시는 핵심 내용을 20문항으로 정리했습니다.
              </p>
            </div>

            <div className="mt-12 space-y-8">
              {faqSections.map((section) => (
                <section key={section.title} className="rounded-2xl border border-black/5 bg-white p-5 shadow-card sm:p-7">
                  <h2 className="text-xl font-semibold text-ink-primary">{section.title}</h2>
                  <div className="mt-4 divide-y divide-black/10 rounded-xl border border-black/5 bg-bg-primary/40">
                    {section.items.map((item) => (
                      <details key={item.q} className="group px-5 py-4">
                        <summary className="cursor-pointer list-none text-sm font-semibold text-ink-primary [&::-webkit-details-marker]:hidden">
                          <span className="flex items-center justify-between gap-4">
                            {item.q}
                            <span className="shrink-0 text-accent transition group-open:rotate-180">▼</span>
                          </span>
                        </summary>
                        <FaqAnswer blocks={item.blocks} />
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
