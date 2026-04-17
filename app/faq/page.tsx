import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { Metadata } from "next";

type FaqItem = {
  q: string;
  a: string;
};

type FaqSection = {
  title: string;
  items: FaqItem[];
};

const faqSections: FaqSection[] = [
  {
    title: "1. ISO란?",
    items: [
      {
        q: "1. ISO 인증이란 무엇인가요?",
        a: "ISO 인증은 조직의 경영시스템이 국제 표준 요구사항을 충족하는지 제3자 인증기관이 평가하는 과정입니다.",
      },
      {
        q: "2. ISO는 어떤 기관인가요?",
        a: "ISO는 국제 표준을 개발하는 비정부 국제기구입니다.",
      },
      {
        q: "3. ISO 인증을 받으면 무엇이 달라지나요?",
        a: "품질, 효율성, 신뢰도가 향상되고 거래처 요구 대응이 가능해집니다.",
      },
      {
        q: "4. ISO 인증은 의무인가요?",
        a: "의무는 아니지만 입찰, 거래 조건 등에서 요구되는 경우가 많습니다.",
      },
      {
        q: "5. 어떤 ISO 표준이 가장 많이 사용되나요?",
        a: "ISO 9001, 14001, 45001, 27001 등이 대표적입니다.",
      },
    ],
  },
  {
    title: "2. 적용 대상 및 필요성",
    items: [
      {
        q: "6. 중소기업도 ISO 인증이 필요한가요?",
        a: "규모와 관계없이 모든 조직이 인증을 받을 수 있습니다.",
      },
      {
        q: "7. 서비스 기업도 ISO 인증이 가능한가요?",
        a: "제조뿐 아니라 IT, 서비스, 공공기관 모두 적용 가능합니다.",
      },
      {
        q: "8. 스타트업도 인증이 가능한가요?",
        a: "가능하며 투자 및 B2B 거래에서 신뢰 확보에 도움이 됩니다.",
      },
      {
        q: "9. ISO 인증은 왜 필요한가요?",
        a: "고객 요구, 입찰 조건, 글로벌 진출, 내부 관리 개선 등의 이유로 필요합니다.",
      },
    ],
  },
  {
    title: "3. 인증 절차 및 기간",
    items: [
      {
        q: "10. ISO 인증 절차는 어떻게 되나요?",
        a: "신청 -> 문서심사 -> 현장심사 -> 보완 -> 인증서 발급 순으로 진행됩니다.",
      },
      {
        q: "11. Stage 1과 Stage 2 심사의 차이는 무엇인가요?",
        a: "Stage 1은 문서검토, Stage 2는 현장 심사입니다.",
      },
      {
        q: "12. 인증까지 얼마나 걸리나요?",
        a: "보통 1~3개월이며, 조직 규모·준비도·범위에 따라 달라집니다. 목표 일정을 알려주시면 현실적인 로드맵을 제안합니다.",
      },
      {
        q: "13. 인증 이후에도 심사를 받나요?",
        a: "네, 매년 사후심사(유지심사)를 받으며 일반적으로 3년 주기로 관리됩니다.",
      },
    ],
  },
  {
    title: "4. 비용 및 조건",
    items: [
      {
        q: "14. ISO 인증 비용은 얼마나 드나요?",
        a: "인원·사업장 수·범위·복잡도·표준 수·심사 공수에 따라 산정됩니다.",
      },
      {
        q: "15. 비용을 결정하는 주요 요소는 무엇인가요?",
        a: "직원 수, 사업장 수, 인증 범위, 심사일수가 주요 산정 요소입니다.",
      },
      {
        q: "16. 가장 저렴한 인증기관을 선택해도 되나요?",
        a: "비인가 기관일 경우 인증이 인정되지 않을 수 있어 공인 여부를 먼저 확인해야 합니다.",
      },
    ],
  },
  {
    title: "5. 인증기관 및 신뢰성",
    items: [
      {
        q: "17. ISO 인증서는 누가 발급하나요?",
        a: "공인된 인증기관(Certification Body)이 발급합니다.",
      },
      {
        q: "18. 인증기관과 인정기관의 차이는 무엇인가요?",
        a: "인증기관은 심사를 수행하고, 인정기관은 인증기관의 역량과 운영을 평가합니다.",
      },
      {
        q: "19. 인증서 진위는 어떻게 확인하나요?",
        a: "인증기관 또는 인정기관 등록 시스템에서 확인 가능합니다.",
      },
      {
        q: "20. 모든 ISO 인증이 동일한 효력을 가지나요?",
        a: "아니며, 공인 여부에 따라 인정 수준이 달라집니다.",
      },
    ],
  },
  {
    title: "6. 준비 및 운영",
    items: [
      {
        q: "21. 인증을 위해 무엇을 준비해야 하나요?",
        a: "정책 및 목표, 절차서, 기록, 내부심사 및 경영검토 자료를 준비해야 합니다.",
      },
      {
        q: "22. 문서만 준비하면 인증이 가능한가요?",
        a: "1단계는 문서 중심으로 심사하고, 2단계는 실제 운영 기록과 인터뷰로 실행 여부를 확인합니다.",
      },
      {
        q: "23. 내부심사는 꼭 해야 하나요?",
        a: "네, 내부심사는 필수 요구사항입니다.",
      },
      {
        q: "24. 부적합이 발생하면 어떻게 되나요?",
        a: "시정조치를 완료하면 재확인 후 인증 진행이 가능합니다.",
      },
    ],
  },
  {
    title: "7. 효과 및 오해",
    items: [
      {
        q: "25. ISO 인증을 받으면 품질이 보장되나요?",
        a: "품질 자체를 보장하는 것이 아니라 품질을 관리하는 시스템을 인증하는 것입니다.",
      },
      {
        q: "26. ISO 인증은 한번 받으면 끝인가요?",
        a: "아니며 지속적인 유지 및 개선 활동이 필요합니다.",
      },
      {
        q: "27. 인증이 있으면 무조건 신뢰할 수 있나요?",
        a: "인증은 기준 준수의 증거이지만 모든 결과를 완전히 보증하는 것은 아닙니다.",
      },
    ],
  },
  {
    title: "8. 기타 실무 질문",
    items: [
      {
        q: "28. 여러 ISO를 동시에 인증받을 수 있나요?",
        a: "가능합니다. 공통 요구사항을 통합하면 심사 운영 효율이 좋아질 수 있습니다.",
      },
      {
        q: "29. 인증 범위는 어떻게 정하나요?",
        a: "사업 범위 및 제품/서비스 특성을 기준으로 인증 범위를 설정합니다.",
      },
      {
        q: "30. 인증이 취소될 수도 있나요?",
        a: "유지 조건을 충족하지 못하면 인증이 정지되거나 취소될 수 있습니다.",
      },
    ],
  },
];

export const metadata: Metadata = {
  title: "FAQ | ISO 인증 파트너",
  description: "ISO 인증 FAQ 30문항. 기본 개념부터 절차, 비용, 운영 실무까지 한 번에 확인하세요.",
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
                ISO 인증 준비부터 운영까지 자주 질문하시는 핵심 내용을 정리했습니다.
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
                            <span className="text-accent transition group-open:rotate-180">▼</span>
                          </span>
                        </summary>
                        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{item.a}</p>
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
