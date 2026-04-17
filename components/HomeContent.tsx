 "use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const standards = [
  {
    slug: "iso-9001",
    code: "9001",
    title: "품질경영",
    desc: "고객 요구 충족과 프로세스 일관성으로 품질 신뢰를 확보합니다.",
    color: "bg-indigo-50",
  },
  {
    slug: "iso-14001",
    code: "14001",
    title: "환경경영",
    desc: "환경영향 관리와 법규 준수 체계로 지속가능 경영을 지원합니다.",
    color: "bg-sky-50",
  },
  {
    slug: "iso-45001",
    code: "45001",
    title: "안전보건",
    desc: "산업재해 예방과 안전보건 리스크 관리 체계를 구축합니다.",
    color: "bg-emerald-50",
  },
  {
    slug: "iso-27001",
    code: "27001",
    title: "정보보호",
    desc: "정보자산 보호와 위험 기반 통제로 보안 신뢰를 강화합니다.",
    color: "bg-violet-50",
  },
];

const whyUs = [
  {
    title: "빠르고 정확한 인증 지원",
    body: "범위·일정·심사일수를 명확히 안내하고 불필요한 반복을 줄입니다.",
  },
  {
    title: "검증 가능한 심사 체계",
    body: "국내 인정 기반의 신뢰성과 일관된 심사 기록으로 대외 신뢰를 높입니다.",
  },
  {
    title: "파격적인 비용 정책",
    body: "효율적인 심사비용 제시, 기관 이전시 특별정책 제공",
  },
  {
    title: "유지·갱신까지 함께",
    body: "사후심사·갱신심사 일정과 변경관리까지 운영 관점에서 안내합니다.",
  },
];

const faqs = [
  {
    q: "ISO 인증은 의무인가요?",
    a: "법적 의무가 아닌 경우가 많지만, 입찰이나 거래처 요구로 필요해지는 경우가 많습니다.",
  },
  {
    q: "준비 기간은 얼마나 걸리나요?",
    a: "조직 규모·준비도·범위에 따라 다릅니다. 목표 일정을 알려주시면 현실적인 로드맵을 제안합니다.",
  },
  {
    q: "비용은 왜 회사마다 다른가요?",
    a: "인원·사업장 수·범위·복잡도·표준 수·심사 공수에 따라 산정됩니다.",
  },
  {
    q: "문서만 잘 만들면 통과하나요?",
    a: "2단계 심사에서는 실제 운영 기록과 인터뷰로 실행 여부를 확인합니다.",
  },
  {
    q: "여러 ISO를 동시에 받을 수 있나요?",
    a: "가능합니다. 공통 요구사항을 통합하면 운영 효율이 좋아질 수 있습니다.",
  },
];

const processCards = [
  {
    step: 1,
    title: "상담부터 계약 및 예비심사",
    desc: "인증 신청과 동시에 계약이 체결되며, 희망 시 예비심사를 통해 개선 기회를 제공합니다.",
    tone: "from-indigo-100 to-violet-50",
  },
  {
    step: 2,
    title: "1·2단계 심사 및 부적합 시정",
    desc: "단계별 심사를 통해 적합성을 평가하며, 부적합 사항은 시정 조치 후 검증을 거칩니다.",
    tone: "from-sky-100 to-cyan-50",
  },
  {
    step: 3,
    title: "심의위원회 최종 승인 및 사후관리",
    desc: "심의 통과 시 인증서가 발급되며, 이후 주기적인 사후관리 및 점검 심사가 진행됩니다.",
    tone: "from-indigo-100 to-slate-50",
  },
];

export function HomeContent() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bg-bg-secondary via-bg-bg-primary to-accent-soft/30">
        <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute left-10 top-40 h-48 w-48 rounded-full bg-accent-soft/40 blur-2xl" />

        <div className="relative mx-auto grid max-w-content gap-10 px-4 py-[var(--section-y)] sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="mb-3 text-sm font-semibold text-accent">
              국내 실무 신뢰 · 국제 기준 역량
            </p>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-ink-primary sm:text-4xl lg:text-5xl">
              조직의 신뢰를 완성하는
              <br />
              <span className="text-accent">ISO 인증</span> 파트너
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-secondary">
              인증은 명확하게, 준비는 체계적으로. EQ인증원 소속의 국제역량의 심사원을 통해 ISO
              9001·14001·45001·27001 상담부터 견적·심사 준비까지 원스톱으로 안내합니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-accent-hover hover:shadow-cardHover"
              >
                무료 상담 신청
              </Link>
              <Link
                href="/contact?type=quote"
                className="rounded-full border border-ink-primary/15 bg-white px-6 py-3 text-sm font-semibold text-ink-primary shadow-sm transition hover:border-accent/30 hover:shadow-card"
              >
                견적 요청
              </Link>
            </div>
            <p className="mt-6 text-sm text-ink-secondary">
              보조 안내:{" "}
              <Link
                href="#guide"
                className="font-medium text-accent underline-offset-2 hover:underline"
              >
                ISO 입문 가이드
              </Link>
              {" · "}
              <Link href="#faq" className="font-medium text-accent underline-offset-2 hover:underline">
                FAQ
              </Link>
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-cardHover ring-1 ring-black/5">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=640&h=800&fit=crop&q=80"
                alt="전문 상담 이미지"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/40 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white">
                심사·컨설팅 하이브리드 레이아웃으로 처음부터 끝까지 동행합니다.
              </p>
            </div>
            <div className="absolute -bottom-4 -left-4 hidden h-24 w-24 rounded-2xl bg-accent-soft/80 blur-sm lg:block" />
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-y border-black/5 bg-white py-10">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            <div>
              <p className="text-3xl font-bold text-accent">KAB</p>
              <p className="mt-1 text-sm text-ink-secondary">인정 기반 인증심사</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-ink-primary">Global Exemplar</p>
              <p className="mt-1 text-sm text-ink-secondary">호주 인정 평가원</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-ink-primary">98%</p>
              <p className="mt-1 text-sm text-ink-secondary">고객 만족도(예시)</p>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-ink-secondary">
            기업의 ISO 인증은 인증기관의 심사를 통해 이루어지며, 심사원 역량은 글로벌 자격 체계와
            연계될 수 있습니다. 국내 인정 기반의 신뢰성과 역량 기준을 함께 설명드립니다.
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-[var(--section-y)]">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-semibold text-ink-primary sm:text-3xl">주요 ISO 인증서비스</h2>
            <p className="mx-auto mt-3 max-w-2xl text-ink-secondary">
              ISO 인증 개요 페이지에서 규격을 선택하고, 상세 기준을 확인할 수 있습니다.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {standards.map((s) => (
              <article
                key={s.code}
                className={`group rounded-2xl p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-cardHover ${s.color} ring-1 ring-black/5`}
              >
                <p className="text-sm font-semibold text-accent">ISO {s.code}</p>
                <h3 className="mt-2 text-lg font-semibold text-ink-primary">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{s.desc}</p>
                <Link
                  href={`/services/${s.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-accent transition group-hover:gap-1"
                >
                  상세 보기
                  <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="mr-2 inline-flex rounded-full border border-accent/20 bg-white px-5 py-2.5 text-sm font-semibold text-accent shadow-sm transition hover:bg-accent/5"
            >
              ISO 인증 개요 보기
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full border border-accent/20 bg-white px-5 py-2.5 text-sm font-semibold text-accent shadow-sm transition hover:bg-accent/5"
            >
              기타 표준(22000·37001 등) 문의
            </Link>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section id="about" className="bg-bg-secondary py-[var(--section-y)]">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-semibold text-ink-primary sm:text-3xl">EQ인증원소개</h2>
            <p className="mx-auto mt-3 max-w-3xl text-ink-secondary">
              이큐 인증원(주)은 한국인정지원센터(KAB)으로부터 인정받은 제 3자 인증 심사기관으로서 품질(ISO9001),
              환경(ISO14001), 등 ISO 경영시스템 인증 서비스를 제공하고 있습니다.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-8 shadow-card ring-1 ring-black/5 transition hover:shadow-cardHover"
              >
                <h3 className="text-lg font-semibold text-ink-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://eq2018.cafe24.com/m11.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent underline-offset-2 transition hover:underline"
            >
              EQ인증원 가기
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Feature icons row */}
      <section className="py-12">
        <div className="mx-auto grid max-w-content gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { t: "표준 선택", d: "업종·요구에 맞는 규격을 빠르게 제안", bg: "bg-violet-100/80" },
            { t: "절차 안내", d: "1·2단계·사후까지 한눈에", bg: "bg-sky-100/80" },
            { t: "준비 체크", d: "필수·권장 서류 체크리스트", bg: "bg-emerald-100/80" },
            { t: "문의·견적", d: "최소 입력으로 맞춤 회신", bg: "bg-amber-100/80" },
          ].map((f) => (
            <div key={f.t} className={`rounded-2xl p-6 ${f.bg} ring-1 ring-black/5`}>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-bold text-accent">
                ✓
              </div>
              <h3 className="font-semibold text-ink-primary">{f.t}</h3>
              <p className="mt-2 text-sm text-ink-secondary">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-white py-[var(--section-y)]">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-semibold text-ink-primary sm:text-3xl">인증 절차 한눈에 보기</h2>
            <p className="mx-auto mt-3 max-w-2xl text-ink-secondary">
              핵심 절차를 단계별로 진행하고, 전체 흐름을 파악할 수 있습니다
            </p>
          </div>
          <div className="mx-auto max-w-4xl space-y-4">
            {processCards.map((card) => (
              <Link
                key={card.step}
                href="/process"
                className={`group block rounded-2xl bg-gradient-to-r ${card.tone} p-5 shadow-card ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-cardHover sm:p-6`}
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-xl font-bold text-white shadow-sm">
                    {card.step}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink-primary sm:text-2xl">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-secondary sm:text-base">{card.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
            <div className="pt-2 text-center">
              <Link
                href="/process"
                className="text-sm font-semibold text-accent underline-offset-2 transition hover:underline"
              >
                인증절차 상세페이지 보기 →
              </Link>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
            >
              인증 가능성 진단 받기
            </Link>
            <Link
              href="#checklist"
              className="rounded-full border border-ink-primary/15 bg-white px-6 py-3 text-sm font-semibold text-ink-primary transition hover:shadow-card"
            >
              준비서류 체크리스트
            </Link>
            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="rounded-full border border-accent/20 bg-white px-6 py-3 text-sm font-semibold text-accent transition hover:bg-accent/5"
            >
              인증절차 진행 동영상 보기
            </button>
          </div>
        </div>
      </section>

      {/* Horizontal content card */}
      <section className="py-[var(--section-y)]">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5 md:flex">
            <div className="relative aspect-video md:w-2/5 md:aspect-auto md:min-h-[280px]">
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80"
                alt="회의 및 심사 준비"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
              <h2 className="text-xl font-semibold text-ink-primary sm:text-2xl">업종별 사례와 후기</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                제조·IT·서비스 등 다양한 업종에서 인증 범위 설정과 심사 대응을 지원했습니다. 실제
                프로젝트명은 비공개 원칙을 따르며, 상담 시 유사 사례를 안내해 드립니다.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex w-fit rounded-full bg-ink-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-primary/90"
              >
                사례 상담 요청
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials carousel-like static cards */}
      <section className="bg-bg-secondary py-[var(--section-y)]">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-semibold text-ink-primary sm:text-3xl">고객 후기</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "김○○ 팀장",
                co: "제조 A사",
                q: "처음 인증이라 막막했는데, 단계별 체크리스트 덕분에 2단계까지 수월했습니다.",
              },
              {
                name: "이○○ 실장",
                co: "IT B사",
                q: "27001 범위와 SoA 정리를 구체적으로 짚어줘서 심사 질문에 답하기 편했습니다.",
              },
              {
                name: "박○○ 이사",
                co: "서비스 C사",
                q: "일정 압박이 있었는데, 범위·일정 협의가 빨라 내부 설득이 쉬웠습니다.",
              },
            ].map((t) => (
              <blockquote
                key={t.name}
                className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-black/5 transition hover:shadow-cardHover"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-bg-secondary text-sm font-bold text-accent">
                  {t.name[0]}
                </div>
                <p className="text-sm leading-relaxed text-ink-primary">&ldquo;{t.q}&rdquo;</p>
                <footer className="mt-4 text-xs text-ink-secondary">
                  {t.name} · {t.co}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Guide */}
      <section id="guide" className="py-[var(--section-y)]">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold text-ink-primary sm:text-3xl">ISO 입문 가이드</h2>
            <p className="mx-auto mt-3 max-w-2xl text-ink-secondary">
              초보자 친화 설명과 실무자용 자료실을 함께 운영합니다.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "ISO란?", href: "#faq" },
              { title: "표준 vs 인증", href: "#faq" },
              { title: "기간·비용 요인", href: "#process" },
              { title: "사용자 여정별 안내", href: "#checklist" },
            ].map((g) => (
              <Link
                key={g.title}
                href={g.href}
                className="group rounded-2xl bg-gradient-to-br from-bg-bg-secondary to-white p-6 ring-1 ring-black/5 transition hover:shadow-cardHover"
              >
                <span className="text-lg font-semibold text-ink-primary group-hover:text-accent">{g.title}</span>
                <p className="mt-2 text-sm text-ink-secondary">자세히 보기 →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist" className="bg-white py-[var(--section-y)]">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-ink-primary sm:text-3xl">준비서류 체크리스트</h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-black/5 bg-bg-primary p-8">
              <h3 className="text-lg font-semibold text-ink-primary">필수</h3>
              <ul className="mt-4 space-y-2 text-sm text-ink-secondary">
                {[
                  "인증신청서",
                  "조직·사업장·범위 정보",
                  "시스템 문서(방침·목표·절차·기록)",
                  "내부심사·경영검토 결과",
                  "시정조치 계획 및 증빙",
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-accent">●</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-black/5 p-8 ring-1 ring-accent/10">
              <h3 className="text-lg font-semibold text-ink-primary">권장</h3>
              <ul className="mt-4 space-y-2 text-sm text-ink-secondary">
                {[
                  "인터뷰 일정표",
                  "KPI·개선활동 요약",
                  "문서 개정이력 목록",
                  "증빙 인덱스",
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-accent-soft">○</span>
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-ink-secondary">
                ISO 9001은 품질성과·고객만족·개선 증빙을, ISO 27001은 위험평가·SoA·정보보호 통제
                운영기록을 중점 확인합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-[var(--section-y)]">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-semibold text-ink-primary sm:text-3xl">자주 묻는 질문</h2>
          <div className="mx-auto max-w-3xl divide-y divide-black/10 rounded-2xl border border-black/5 bg-white shadow-card">
            {faqs.map((f) => (
              <details key={f.q} className="group px-6 py-4">
                <summary className="cursor-pointer list-none text-sm font-semibold text-ink-primary [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {f.q}
                    <span className="text-accent transition group-open:rotate-180">▼</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent underline-offset-2 transition hover:underline"
            >
              FAQ 더보기
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="pb-[var(--section-y)]">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-accent to-indigo-600 px-8 py-12 text-center text-white shadow-cardHover">
            <h2 className="text-2xl font-semibold sm:text-3xl">지금 바로 무료 상담을 신청하세요</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/90">
              회사명·연락처·희망 규격만 알려주셔도 1영업일 내 1차 안내를 드립니다.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-accent transition hover:bg-bg-primary"
              >
                문의·견적 폼 열기
              </Link>
              <a
                href="tel:010-2432-5446"
                className="rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                010-2432-5446
              </a>
              <a
                href="mailto:lky22225@gmail.com"
                className="rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                이메일 문의
              </a>
            </div>
          </div>
        </div>
      </section>

      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="w-full max-w-4xl rounded-2xl bg-white p-4 shadow-cardHover sm:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-ink-primary sm:text-lg">인증절차 진행 동영상</h3>
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-ink-secondary transition hover:bg-bg-primary hover:text-ink-primary"
              >
                닫기
              </button>
            </div>
            <div className="overflow-hidden rounded-xl bg-black">
              <video
                controls
                autoPlay
                playsInline
                className="h-auto w-full"
                src="/videos/iso-process-overview.mp4"
              >
                브라우저가 video 태그를 지원하지 않습니다.
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
