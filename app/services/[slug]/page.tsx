import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { isoServices } from "@/lib/iso-services";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return isoServices.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const item = isoServices.find((service) => service.slug === params.slug);
  if (!item) return { title: "서비스 안내" };
  return {
    title: `ISO ${item.code} | ${item.title}`,
    description: item.summary,
  };
}

export default function IsoServiceDetailPage({ params }: Props) {
  const item = isoServices.find((service) => service.slug === params.slug);
  if (!item) {
    notFound();
  }
  const isIso9001 = item.slug === "iso-9001";
  const isIso14001 = item.slug === "iso-14001";
  const isIso45001 = item.slug === "iso-45001";
  const isIso27001 = item.slug === "iso-27001";

  return (
    <>
      <Header />
      <main className="bg-bg-primary py-[var(--section-y)]">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <section className="rounded-2xl bg-white p-8 shadow-card ring-1 ring-black/5 md:p-10">
            <p className="text-sm font-semibold text-accent">ISO {item.code}</p>
            <h1 className="mt-2 text-3xl font-bold text-ink-primary">{item.title}</h1>
            <p className="mt-5 leading-relaxed text-ink-secondary">{item.summary}</p>

            {isIso9001 ? (
              <div className="mt-8 space-y-8">
                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">1. ISO 9001이란?</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    ISO 9001은 국제표준화기구(ISO)가 제정한 품질경영시스템(QMS, Quality
                    Management System) 표준입니다.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    조직이 다음을 체계적으로 수행하도록 요구합니다:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-secondary">
                    <li>- 고객 요구사항 충족</li>
                    <li>- 프로세스 기반 운영</li>
                    <li>- 지속적인 개선</li>
                    <li>- 리스크 기반 사고</li>
                  </ul>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">2. 주요 적용 대상</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    다음과 같은 조직에 적합합니다:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-secondary">
                    <li>- 제조업 및 생산 기업</li>
                    <li>- IT/소프트웨어 기업</li>
                    <li>- 서비스 및 유통 기업</li>
                    <li>- 공공기관 및 스타트업</li>
                  </ul>
                  <p className="mt-3 text-sm font-medium text-ink-primary">
                    규모와 산업에 관계없이 적용 가능
                  </p>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">3. 도입 효과 (Benefits)</h2>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-secondary">
                    <p>
                      <span className="font-semibold text-ink-primary">① 고객 신뢰 확보</span>
                      <br />
                      인증을 통한 대외 신뢰도 상승
                      <br />
                      입찰 및 거래처 요구 대응
                    </p>
                    <p>
                      <span className="font-semibold text-ink-primary">② 내부 프로세스 개선</span>
                      <br />
                      업무 표준화 및 효율성 향상
                      <br />
                      불량 및 오류 감소
                    </p>
                    <p>
                      <span className="font-semibold text-ink-primary">③ 지속적 개선 체계 구축</span>
                      <br />
                      데이터 기반 의사결정
                      <br />
                      KPI 관리 및 성과 개선
                    </p>
                    <p>
                      <span className="font-semibold text-ink-primary">④ 리스크 관리 강화</span>
                      <br />
                      문제 예방 중심 운영
                      <br />
                      품질 사고 감소
                    </p>
                  </div>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">4. 주요 요구사항 (핵심 구조)</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    ISO 9001은 다음 구조를 중심으로 운영됩니다:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-secondary">
                    <li>- 조직 상황(Context of Organization)</li>
                    <li>- 리더십(Leadership)</li>
                    <li>- 기획(Planning)</li>
                    <li>- 지원(Support)</li>
                    <li>- 운영(Operation)</li>
                    <li>- 성과 평가(Performance Evaluation)</li>
                    <li>- 개선(Improvement)</li>
                  </ul>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">5. 준비해야 할 주요 자료</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    ISO 9001 인증을 위해 일반적으로 준비해야 할 항목:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-secondary">
                    <li>- 품질 방침 및 목표</li>
                    <li>- 프로세스 정의 문서</li>
                    <li>- 업무 절차서 및 기록</li>
                    <li>- 내부심사 결과</li>
                    <li>- 경영검토 자료</li>
                    <li>- 시정조치 기록</li>
                  </ul>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">8. 자주 발생하는 부적합</h2>
                  <ul className="mt-3 space-y-1 text-sm text-ink-secondary">
                    <li>- 문서와 실제 운영 불일치</li>
                    <li>- 내부심사 미흡</li>
                    <li>- 프로세스 정의 부족</li>
                    <li>- 개선 활동 증빙 부족</li>
                  </ul>
                  <p className="mt-3 text-sm font-medium text-ink-primary">
                    사전 준비가 인증 성공의 핵심입니다.
                  </p>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">6. 인증 절차 요약</h2>
                  <ul className="mt-3 space-y-1 text-sm text-ink-secondary">
                    <li>- 인증 신청</li>
                    <li>- 문서 심사 (Stage 1)</li>
                    <li>- 현장 심사 (Stage 2)</li>
                    <li>- 부적합 보완</li>
                    <li>- 인증서 발급</li>
                  </ul>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">7. 이런 기업에 특히 필요합니다</h2>
                  <ul className="mt-3 space-y-1 text-sm text-ink-secondary">
                    <li>- 거래처에서 ISO 인증을 요구하는 기업</li>
                    <li>- 품질 문제로 비용이 증가하는 기업</li>
                    <li>- 조직 운영 체계를 정립하고 싶은 기업</li>
                    <li>- 글로벌 시장 진출을 준비하는 기업</li>
                  </ul>
                </section>
              </div>
            ) : isIso14001 ? (
              <div className="mt-8 space-y-8">
                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">1. ISO 14001이란?</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    ISO 14001은 국제표준화기구(ISO)가 제정한 환경경영시스템(EMS, Environmental
                    Management System) 표준입니다.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    조직이 다음을 체계적으로 관리하도록 요구합니다:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-secondary">
                    <li>- 환경 영향 식별 및 관리</li>
                    <li>- 법적 요구사항 준수</li>
                    <li>- 오염 예방 및 자원 절감</li>
                    <li>- 지속적 환경 성과 개선</li>
                  </ul>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">2. 주요 적용 대상</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    다음과 같은 조직에 적합합니다:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-secondary">
                    <li>- 제조업 및 공장 운영 기업</li>
                    <li>- 건설 및 플랜트 기업</li>
                    <li>- 물류 및 유통 기업</li>
                    <li>- 환경 규제 대상 사업장</li>
                  </ul>
                  <p className="mt-3 text-sm font-medium text-ink-primary">
                    환경 영향을 발생시키는 모든 조직에 적용 가능
                  </p>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">3. 도입 효과 (Benefits)</h2>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-secondary">
                    <p>
                      <span className="font-semibold text-ink-primary">① 환경 리스크 관리 강화</span>
                      <br />
                      환경 사고 예방
                      <br />
                      규제 위반 리스크 감소
                    </p>
                    <p>
                      <span className="font-semibold text-ink-primary">② 비용 절감</span>
                      <br />
                      에너지 및 자원 효율 개선
                      <br />
                      폐기물 감소
                    </p>
                    <p>
                      <span className="font-semibold text-ink-primary">③ 대외 신뢰도 향상</span>
                      <br />
                      친환경 기업 이미지 구축
                      <br />
                      ESG 대응 강화
                    </p>
                    <p>
                      <span className="font-semibold text-ink-primary">④ 법규 준수 체계 구축</span>
                      <br />
                      환경 법규 대응 프로세스 확보
                      <br />
                      감사 및 점검 대응 용이
                    </p>
                  </div>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">4. 주요 요구사항 (핵심 구조)</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    ISO 14001은 다음 구조를 중심으로 운영됩니다:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-secondary">
                    <li>- 조직 상황(Context of Organization)</li>
                    <li>- 리더십(Leadership)</li>
                    <li>- 기획(Planning) – 환경 측면 및 리스크 평가</li>
                    <li>- 지원(Support)</li>
                    <li>- 운영(Operation)</li>
                    <li>- 성과 평가(Performance Evaluation)</li>
                    <li>- 개선(Improvement)</li>
                  </ul>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">5. 준비해야 할 주요 자료</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    ISO 14001 인증을 위해 일반적으로 준비해야 할 항목:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-secondary">
                    <li>- 환경 방침 및 목표</li>
                    <li>- 환경 영향 평가 자료</li>
                    <li>- 법규 준수 목록 및 관리 기록</li>
                    <li>- 운영 절차서 및 기록</li>
                    <li>- 내부심사 결과</li>
                    <li>- 경영검토 자료</li>
                  </ul>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">6. 자주 발생하는 부적합</h2>
                  <ul className="mt-3 space-y-1 text-sm text-ink-secondary">
                    <li>- 환경 영향 평가 미흡</li>
                    <li>- 법규 목록 최신화 부족</li>
                    <li>- 운영 기록 부족</li>
                    <li>- 실제 운영과 문서 불일치</li>
                  </ul>
                  <p className="mt-3 text-sm font-medium text-ink-primary">
                    환경 데이터와 운영 기록이 핵심입니다.
                  </p>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">7. 인증 절차 요약</h2>
                  <ul className="mt-3 space-y-1 text-sm text-ink-secondary">
                    <li>- 인증 신청</li>
                    <li>- 문서 심사 (Stage 1)</li>
                    <li>- 현장 심사 (Stage 2)</li>
                    <li>- 부적합 보완</li>
                    <li>- 인증서 발급</li>
                  </ul>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">8. 이런 기업에 특히 필요합니다</h2>
                  <ul className="mt-3 space-y-1 text-sm text-ink-secondary">
                    <li>- 환경 규제 대상 사업장을 운영하는 기업</li>
                    <li>- ESG 및 친환경 경영이 필요한 기업</li>
                    <li>- 글로벌 거래처 요구 대응이 필요한 기업</li>
                    <li>- 환경 사고 리스크를 줄이고 싶은 기업</li>
                  </ul>
                </section>
              </div>
            ) : isIso45001 ? (
              <div className="mt-8 space-y-8">
                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">1. ISO 45001이란?</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    ISO 45001은 국제표준화기구(ISO)가 제정한 안전보건경영시스템(OH&S,
                    Occupational Health & Safety Management System) 표준입니다.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    조직이 다음을 체계적으로 수행하도록 요구합니다:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-secondary">
                    <li>- 위험요인 식별 및 평가</li>
                    <li>- 산업재해 예방</li>
                    <li>- 법적 요구사항 준수</li>
                    <li>- 근로자 참여 기반 안전관리</li>
                    <li>- 지속적 개선</li>
                  </ul>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">2. 주요 적용 대상</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    다음과 같은 조직에 적합합니다:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-secondary">
                    <li>- 제조업 및 공장 운영 기업</li>
                    <li>- 건설 및 플랜트 기업</li>
                    <li>- 물류 및 운송 기업</li>
                    <li>- 현장 작업이 포함된 모든 조직</li>
                  </ul>
                  <p className="mt-3 text-sm font-medium text-ink-primary">
                    근로자 안전이 중요한 모든 조직에 적용 가능
                  </p>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">3. 도입 효과 (Benefits)</h2>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-secondary">
                    <p>
                      <span className="font-semibold text-ink-primary">① 산업재해 예방</span>
                      <br />
                      사고 및 부상 발생 감소
                      <br />
                      안전사고 리스크 최소화
                    </p>
                    <p>
                      <span className="font-semibold text-ink-primary">② 법규 준수 강화</span>
                      <br />
                      산업안전 관련 법규 대응
                      <br />
                      점검 및 감사 대응 용이
                    </p>
                    <p>
                      <span className="font-semibold text-ink-primary">③ 조직 신뢰도 향상</span>
                      <br />
                      안전 중심 기업 이미지 구축
                      <br />
                      대외 평가 및 입찰 경쟁력 강화
                    </p>
                    <p>
                      <span className="font-semibold text-ink-primary">④ 내부 운영 효율화</span>
                      <br />
                      체계적인 안전관리 프로세스 구축
                      <br />
                      작업 효율 및 생산성 향상
                    </p>
                  </div>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">4. 주요 요구사항 (핵심 구조)</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    ISO 45001은 다음 구조를 중심으로 운영됩니다:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-secondary">
                    <li>- 조직 상황(Context of Organization)</li>
                    <li>- 리더십(Leadership)</li>
                    <li>- 기획(Planning) – 위험요인 및 리스크 평가</li>
                    <li>- 지원(Support)</li>
                    <li>- 운영(Operation)</li>
                    <li>- 성과 평가(Performance Evaluation)</li>
                    <li>- 개선(Improvement)</li>
                  </ul>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">5. 준비해야 할 주요 자료</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    ISO 45001 인증을 위해 일반적으로 준비해야 할 항목:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-secondary">
                    <li>- 안전보건 방침 및 목표</li>
                    <li>- 위험성 평가 자료</li>
                    <li>- 법규 준수 목록 및 관리 기록</li>
                    <li>- 안전관리 절차서 및 작업지침</li>
                    <li>- 내부심사 결과</li>
                    <li>- 경영검토 자료</li>
                  </ul>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">6. 자주 발생하는 부적합</h2>
                  <ul className="mt-3 space-y-1 text-sm text-ink-secondary">
                    <li>- 위험성 평가 미흡</li>
                    <li>- 법규 관리 체계 부족</li>
                    <li>- 작업 현장과 문서 불일치</li>
                    <li>- 교육 및 훈련 기록 부족</li>
                  </ul>
                  <p className="mt-3 text-sm font-medium text-ink-primary">
                    현장 운영과 기록 관리가 핵심입니다.
                  </p>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">7. 인증 절차 요약</h2>
                  <ul className="mt-3 space-y-1 text-sm text-ink-secondary">
                    <li>- 인증 신청</li>
                    <li>- 문서 심사 (Stage 1)</li>
                    <li>- 현장 심사 (Stage 2)</li>
                    <li>- 부적합 보완</li>
                    <li>- 인증서 발급</li>
                  </ul>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">8. 이런 기업에 특히 필요합니다</h2>
                  <ul className="mt-3 space-y-1 text-sm text-ink-secondary">
                    <li>- 산업재해 예방이 중요한 기업</li>
                    <li>- 안전 관련 법규 대응이 필요한 기업</li>
                    <li>- 건설/제조 등 고위험 산업 기업</li>
                    <li>- ESG 및 안전경영을 강화하려는 기업</li>
                  </ul>
                </section>
              </div>
            ) : isIso27001 ? (
              <div className="mt-8 space-y-8">
                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">1. ISO 27001이란?</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    ISO 27001은 국제표준화기구(ISO)가 제정한 정보보호경영시스템(ISMS, Information
                    Security Management System) 표준입니다.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    조직이 다음을 체계적으로 수행하도록 요구합니다:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-secondary">
                    <li>- 정보자산 식별 및 분류</li>
                    <li>- 보안 리스크 평가 및 처리</li>
                    <li>- 보안 통제(Controls) 적용</li>
                    <li>- 사고 대응 및 예방</li>
                    <li>- 지속적 개선</li>
                  </ul>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">2. 주요 적용 대상</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    다음과 같은 조직에 적합합니다:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-secondary">
                    <li>- IT/소프트웨어 및 SaaS 기업</li>
                    <li>- 금융 및 핀테크 기업</li>
                    <li>- 클라우드 및 데이터 처리 기업</li>
                    <li>- 고객정보 및 민감정보를 처리하는 조직</li>
                  </ul>
                  <p className="mt-3 text-sm font-medium text-ink-primary">
                    정보자산을 보유·처리하는 모든 조직에 적용 가능
                  </p>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">3. 도입 효과 (Benefits)</h2>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-secondary">
                    <p>
                      <span className="font-semibold text-ink-primary">① 정보보호 수준 강화</span>
                      <br />
                      데이터 유출 및 해킹 사고 예방
                      <br />
                      보안 리스크 체계적 관리
                    </p>
                    <p>
                      <span className="font-semibold text-ink-primary">② 대외 신뢰도 확보</span>
                      <br />
                      고객 및 파트너 신뢰 강화
                      <br />
                      글로벌 거래 조건 충족
                    </p>
                    <p>
                      <span className="font-semibold text-ink-primary">③ 규제 및 컴플라이언스 대응</span>
                      <br />
                      개인정보 및 정보보호 법규 대응
                      <br />
                      감사 및 인증 요구 대응
                    </p>
                    <p>
                      <span className="font-semibold text-ink-primary">④ 내부 보안 체계 구축</span>
                      <br />
                      보안 정책 및 절차 표준화
                      <br />
                      조직 전반의 보안 인식 향상
                    </p>
                  </div>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">4. 주요 요구사항 (핵심 구조)</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    ISO 27001은 다음 구조를 중심으로 운영됩니다:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-secondary">
                    <li>- 조직 상황(Context of Organization)</li>
                    <li>- 리더십(Leadership)</li>
                    <li>- 기획(Planning) – 리스크 평가 및 처리</li>
                    <li>- 지원(Support)</li>
                    <li>- 운영(Operation)</li>
                    <li>- 성과 평가(Performance Evaluation)</li>
                    <li>- 개선(Improvement)</li>
                  </ul>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">5. 준비해야 할 주요 자료</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    ISO 27001 인증을 위해 일반적으로 준비해야 할 항목:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-secondary">
                    <li>- 정보보호 정책 및 목표</li>
                    <li>- 위험 평가 및 처리 계획</li>
                    <li>- 자산 목록 및 분류 기준</li>
                    <li>- 적용성 선언서(SoA)</li>
                    <li>- 보안 통제 운영 기록</li>
                    <li>- 내부심사 결과</li>
                    <li>- 경영검토 자료</li>
                  </ul>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">6. 자주 발생하는 부적합</h2>
                  <ul className="mt-3 space-y-1 text-sm text-ink-secondary">
                    <li>- 위험 평가 미흡 또는 형식적 수행</li>
                    <li>- SoA(적용성 선언서) 불명확</li>
                    <li>- 보안 통제 운영 증빙 부족</li>
                    <li>- 정책과 실제 운영 불일치</li>
                  </ul>
                  <p className="mt-3 text-sm font-medium text-ink-primary">
                    리스크 기반 관리와 운영 증빙이 핵심입니다.
                  </p>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">7. 인증 절차 요약</h2>
                  <ul className="mt-3 space-y-1 text-sm text-ink-secondary">
                    <li>- 인증 신청</li>
                    <li>- 문서 심사 (Stage 1)</li>
                    <li>- 현장 심사 (Stage 2)</li>
                    <li>- 부적합 보완</li>
                    <li>- 인증서 발급</li>
                  </ul>
                </section>

                <section className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-lg font-semibold text-ink-primary">8. 이런 기업에 특히 필요합니다</h2>
                  <ul className="mt-3 space-y-1 text-sm text-ink-secondary">
                    <li>- 고객정보 및 중요 데이터를 처리하는 기업</li>
                    <li>- 보안 요구가 높은 거래처와 협업하는 기업</li>
                    <li>- SaaS/클라우드 서비스를 제공하는 기업</li>
                    <li>- 정보보호 인증이 입찰 조건인 기업</li>
                  </ul>
                </section>
              </div>
            ) : (
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-base font-semibold text-ink-primary">적용 대상</h2>
                  <p className="mt-2 text-sm text-ink-secondary">{item.target}</p>
                </div>
                <div className="rounded-xl bg-bg-primary p-5 ring-1 ring-black/5">
                  <h2 className="text-base font-semibold text-ink-primary">기대 효과</h2>
                  <p className="mt-2 text-sm text-ink-secondary">{item.effect}</p>
                </div>
              </div>
            )}

            <div className="mt-8 rounded-xl border border-black/10 bg-bg-secondary p-5">
              <h2 className="text-base font-semibold text-ink-primary">진행 안내</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                상담 및 범위 설정 후 1단계(문서심사), 2단계(현장심사) 순으로 진행됩니다. 준비서류
                체크리스트와 일정은 상담 시 맞춤 안내해 드립니다.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
              >
                상담/문의
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-ink-primary/15 bg-white px-6 py-3 text-sm font-semibold text-ink-primary transition hover:shadow-card"
              >
                ISO 인증 개요로 돌아가기
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

