"use client";

import { useState } from "react";

const standards = ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001", "기타"];

type Props = { defaultIntent: "consult" | "quote" };

export function ContactForm({ defaultIntent }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

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
    <form onSubmit={onSubmit} className="space-y-6">
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
            <label key={s} className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" name="standards" value={s} className="rounded text-accent focus:ring-accent" />
              {s}
            </label>
          ))}
        </div>
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
      <p className="text-xs text-ink-secondary">
        제출하신 정보는 상담 목적으로만 사용됩니다. 자세한 내용은 개인정보처리방침을 참고해 주세요.
      </p>
    </form>
  );
}
