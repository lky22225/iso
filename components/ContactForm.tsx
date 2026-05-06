"use client";

import { useMemo, useRef, useState } from "react";
import {
  calculateQuote,
  type AuditType,
  type RegionCode,
  type RiskCategory,
  type StandardCode,
} from "@/lib/quote-calculator";

const standards = [
  { label: "ISO 9001", value: "iso9001" },
  { label: "ISO 14001", value: "iso14001" },
  { label: "ISO 45001", value: "iso45001" },
  { label: "ISO 27001", value: "iso27001" },
  { label: "ISO 27701", value: "iso27701" },
  { label: "ISO 42001", value: "iso42001" },
  { label: "기타", value: "etc" },
] as const;

const regionOptions: Array<{ label: string; value: RegionCode }> = [
  { label: "서울", value: "seoul" },
  { label: "경기", value: "gyeonggi" },
  { label: "충청", value: "chungcheong" },
  { label: "전북/전남", value: "jeonbuk-jeonnam" },
  { label: "경북/경남", value: "gyeongbuk-gyeongnam" },
  { label: "제주", value: "jeju" },
];

type Props = { defaultIntent: "consult" | "quote" };

export function ContactForm({ defaultIntent }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");
  const [simMessage, setSimMessage] = useState("");
  const [simStandard, setSimStandard] = useState<StandardCode>("iso9001");
  const [selectedAuditType, setSelectedAuditType] = useState<AuditType>("initial");
  const [simResultText, setSimResultText] = useState("");
  const [showRiskTip, setShowRiskTip] = useState(false);

  const needsRiskCategory = useMemo(
    () => simStandard === "iso14001" || simStandard === "iso45001",
    [simStandard],
  );

  function buildSimulationBody(text: string, bodyValue: string): string {
    const normalized = bodyValue.trim();
    const blockPattern = /(?:\n|^)\[시뮬레이션 내용\][\s\S]*$/m;
    if (!normalized) return text;
    if (blockPattern.test(normalized)) {
      return normalized.replace(blockPattern, `\n${text}`);
    }
    return `${normalized}\n\n${text}`;
  }

  function syncStandardCheckbox(form: HTMLFormElement, standardCode: StandardCode) {
    const label = standards.find((s) => s.value === standardCode)?.label;
    if (!label) return;
    const checkboxes = form.querySelectorAll<HTMLInputElement>('input[name="standards"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = checkbox.value === label;
    });
  }

  function onSimulate() {
    setSimMessage("");
    const form = formRef.current;
    if (!form) return;

    const fd = new FormData(form);
    const rawHeadcount = String(fd.get("headcount") || "").trim();
    const headcount = Number(rawHeadcount);
    if (!rawHeadcount || !Number.isFinite(headcount)) {
      setSimMessage("시뮬레이션을 위해 종업원 수를 숫자로 입력해 주세요.");
      return;
    }

    const auditType = (fd.get("auditType") as AuditType) || "initial";
    const region = (fd.get("simulationRegion") as RegionCode) || "seoul";
    const riskCategory = (fd.get("simulationRiskCategory") as RiskCategory | null) || undefined;

    const result = calculateQuote({
      standard: simStandard,
      headcount,
      auditType,
      region,
      riskCategory,
    });

    if (!result.ok) {
      setSimMessage(`시뮬레이션 실패: ${result.message}`);
      return;
    }

    syncStandardCheckbox(form, simStandard);

    const bodyField = form.elements.namedItem("body") as HTMLTextAreaElement | null;
    const simulationText = [
      "[시뮬레이션 내용]",
      `- 규격: ${result.standardLabel}`,
      `- 종업원수: ${result.headcount}명`,
      `- 심사종류: ${result.auditType === "initial" ? "최초" : result.auditType === "surveillance" ? "사후" : "갱신"}`,
      `- 지역: ${result.region}`,
      ...(result.riskCategory
        ? [`- 사업위험도: ${result.riskCategory === "high" ? "상" : result.riskCategory === "medium" ? "중" : result.riskCategory === "low" ? "하" : "제한"}`]
        : []),
      `- 심사기간: ${result.display.auditDays}`,
      `- 심사금액: ${result.formulas.auditAmount}`,
      `- 일비(교통비): ${result.formulas.travelAmount}`,
      `- 합계금액: ${result.formulas.total}`,
    ].join("\n");

    if (bodyField) {
      bodyField.value = buildSimulationBody(simulationText, bodyField.value);
    }

    setSimResultText(simulationText);
    setSimMessage("예상비용 시뮬레이션을 반영했습니다. 문의내용에 자동 입력되었습니다.");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const intent = (fd.get("intent") as string) || defaultIntent;
    const standardsSelected = fd.getAll("standards") as string[];
    const payload = {
      intent,
      company: fd.get("company"),
      contactName: fd.get("contactName"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      industry: fd.get("industry"),
      headcount: fd.get("headcount"),
      auditType: fd.get("auditType"),
      standards: standardsSelected,
      targetDate: fd.get("targetDate"),
      body: fd.get("body"),
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "전송 실패");
      setStatus("ok");
      setMessage("접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");
      form.reset();
    } catch {
      setStatus("err");
      setMessage("일시적으로 전송에 실패했습니다. 잠시 후 다시 시도하거나 전화로 문의해 주세요.");
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-ink-primary">문의 유형</legend>
        <div className="flex flex-wrap gap-4 text-sm">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="intent"
              value="consult"
              defaultChecked={defaultIntent === "consult"}
              className="text-accent focus:ring-accent"
            />
            무료 상담
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="intent"
              value="quote"
              defaultChecked={defaultIntent === "quote"}
              className="text-accent focus:ring-accent"
            />
            견적 요청
          </label>
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="company" className="block text-sm font-medium text-ink-primary">
            회사명 <span className="text-red-500">*</span>
          </label>
          <input
            id="company"
            name="company"
            required
            className="mt-1 w-full rounded-xl border border-black/10 bg-bg-primary px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <div>
          <label htmlFor="contactName" className="block text-sm font-medium text-ink-primary">
            담당자명 <span className="text-red-500">*</span>
          </label>
          <input
            id="contactName"
            name="contactName"
            required
            className="mt-1 w-full rounded-xl border border-black/10 bg-bg-primary px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-ink-primary">
            연락처 <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            required
            className="mt-1 w-full rounded-xl border border-black/10 bg-bg-primary px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium text-ink-primary">
            이메일 <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-xl border border-black/10 bg-bg-primary px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-ink-primary">
            업종
          </label>
          <input
            id="industry"
            name="industry"
            className="mt-1 w-full rounded-xl border border-black/10 bg-bg-primary px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <div>
          <label htmlFor="headcount" className="block text-sm font-medium text-ink-primary">
            인원수(대략)
          </label>
          <input
            id="headcount"
            name="headcount"
            className="mt-1 w-full rounded-xl border border-black/10 bg-bg-primary px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-ink-primary">희망 인증 (복수 선택)</legend>
        <div className="mt-2 flex flex-wrap gap-3 text-sm text-ink-secondary">
          {standards.map((s) => (
            <label key={s.value} className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                name="standards"
                value={s.label}
                className="rounded text-accent focus:ring-accent"
              />
              {s.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="auditType" className="block text-sm font-medium text-ink-primary">
          심사종류
        </label>
        <select
          id="auditType"
          name="auditType"
          value={selectedAuditType}
          onChange={(e) => setSelectedAuditType(e.target.value as AuditType)}
          className="mt-1 w-full rounded-xl border border-black/10 bg-bg-primary px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        >
          <option value="initial">최초</option>
          <option value="surveillance">사후</option>
          <option value="renewal">갱신</option>
        </select>
      </div>

      <fieldset className="space-y-4 rounded-2xl border border-black/10 bg-bg-primary p-4 sm:p-5">
        <legend className="px-1 text-sm font-semibold text-ink-primary">예상비용시뮬레이션</legend>
        <p className="text-sm text-ink-secondary">
          금액만 알아보시려면 이 버튼을 눌러 예상비용을 알아보세요.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="simulationStandard" className="block text-sm font-medium text-ink-primary">
              규격
            </label>
            <select
              id="simulationStandard"
              name="simulationStandard"
              value={simStandard}
              onChange={(e) => setSimStandard(e.target.value as StandardCode)}
              className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            >
              {standards
                .filter((s) => s.value !== "etc")
                .map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="simulationRegion" className="block text-sm font-medium text-ink-primary">
              지역
            </label>
            <select
              id="simulationRegion"
              name="simulationRegion"
              defaultValue="seoul"
              className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            >
              {regionOptions.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <div className="flex items-center gap-2">
              <label htmlFor="simulationRiskCategory" className="block text-sm font-medium text-ink-primary">
                사업위험도
              </label>
              <button
                type="button"
                aria-label="사업위험도 기준 보기"
                aria-expanded={showRiskTip}
                aria-controls="risk-tip-panel"
                onClick={() => setShowRiskTip((prev) => !prev)}
                className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-black/20 text-xs font-bold text-ink-secondary transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                ?
              </button>
            </div>
            {showRiskTip && (
              <div
                id="risk-tip-panel"
                className="absolute left-0 top-7 z-10 w-full rounded-xl border border-black/10 bg-white p-3 text-xs text-ink-secondary shadow-lg sm:w-[480px]"
              >
                <p className="font-semibold text-ink-primary">높음 (High) (위험도 상)</p>
                <p>기준: 환경 측면의 성격과 심각성이 매우 높음.</p>
                <p>
                  특징: 대규모 제조, 대량의 오염물질 배출, 위험한 폐기물 처리, 주요 환경 법규 적용 대상,
                  높은 화재/폭발 위험.
                </p>
                <p className="mb-2">
                  예시: 화학공장, 석유화학, 제철소, 발전소, 매립지, 유해 폐기물 처리업.
                </p>

                <p className="font-semibold text-ink-primary">중간 (Medium) (위험도 중)</p>
                <p>기준: 환경 측면의 성격과 심각성이 보통 수준.</p>
                <p>특징: 제조 활동이 포함되나 오염원이 제한적, 조립 위주, 일반적인 폐기물 발생.</p>
                <p className="mb-2">
                  예시: 기계 부품 조립, 섬유/의류 제조, 일반 인쇄, 식품 및 담배 가공, 일반 수송/물류,
                  일반 제조 현장.
                </p>

                <p className="font-semibold text-ink-primary">낮음 (Low) (위험도 하)</p>
                <p>기준: 환경 측면의 성격과 심각성이 낮음.</p>
                <p>특징: 오염 물질 발생이 적고, 주로 조립/조작 위주 활동.</p>
                <p className="mb-2">예시: 단순 조립, 일반적 창고업, 가구 제조(가공이 적은 경우).</p>

                <p className="font-semibold text-ink-primary">제한 (Limited) (위험도 최소)</p>
                <p>기준: 환경 측면이 거의 없거나 매우 제한적임.</p>
                <p>특징: 환경 위험이 거의 없는 사무직 위주.</p>
                <p>예시: 일반 사무실, 소프트웨어 개발, 컨설팅, 순수 서비스업.</p>
              </div>
            )}
            <select
              id="simulationRiskCategory"
              name="simulationRiskCategory"
              defaultValue="medium"
              disabled={!needsRiskCategory}
              className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              <option value="high">상</option>
              <option value="medium">중</option>
              <option value="low">하</option>
              <option value="limited">제한</option>
            </select>
          </div>
        </div>
        <button
          type="button"
          onClick={onSimulate}
          className="w-full rounded-full border border-accent/20 bg-white py-2.5 text-sm font-semibold text-accent transition hover:bg-accent/5"
        >
          예상비용시뮬레이션
        </button>
        {simMessage && <p className="text-sm text-ink-secondary">{simMessage}</p>}
        {simResultText && (
          <>
            <pre className="whitespace-pre-wrap rounded-xl bg-white p-3 text-xs text-ink-secondary ring-1 ring-black/5">
              {simResultText}
            </pre>
            <p className="text-sm font-medium text-ink-primary">
              예상금액은 실제 상담을 통해 확정 됩니다. 상담남겨주시는 고객께는 타사대비 경쟁력있는
              비용으로 제안드리겠습니다.
            </p>
          </>
        )}
      </fieldset>

      <div>
        <label htmlFor="targetDate" className="block text-sm font-medium text-ink-primary">
          목표 일정
        </label>
        <input
          id="targetDate"
          name="targetDate"
          placeholder="예: 2026년 3분기"
          className="mt-1 w-full rounded-xl border border-black/10 bg-bg-primary px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium text-ink-primary">
          문의 내용
        </label>
        <textarea
          id="body"
          name="body"
          rows={5}
          className="mt-1 w-full rounded-xl border border-black/10 bg-bg-primary px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {message && (
        <p
          className={`text-sm ${status === "ok" ? "text-emerald-600" : status === "err" ? "text-red-600" : "text-ink-secondary"}`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white transition hover:bg-accent-hover disabled:opacity-60"
      >
        {status === "loading" ? "전송 중…" : "제출하기"}
      </button>
      <p className="text-xs text-ink-secondary">제출하신 정보는 상담 목적으로만 사용됩니다.</p>
    </form>
  );
}
