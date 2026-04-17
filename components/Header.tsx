"use client";

import Link from "next/link";
import { useState } from "react";

const isoMenu = [
  { href: "/services", label: "ISO 인증 개요" },
  { href: "/services/iso-9001", label: "ISO 9001" },
  { href: "/services/iso-14001", label: "ISO 14001" },
  { href: "/services/iso-45001", label: "ISO 45001" },
  { href: "/services/iso-27001", label: "ISO 27001" },
  { href: "/contact", label: "기타 표준(선택)" },
];

const nav = [
  { href: "/#process", label: "인증 절차" },
  { href: "/#guide", label: "입문 가이드" },
  { href: "/#faq", label: "FAQ" },
  { href: "/admin", label: "관리자" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-bg-primary/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white">
            ISO
          </span>
          <span className="text-sm font-semibold text-ink-primary sm:text-base">
            인증 파트너
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/#about"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink-secondary transition hover:bg-bg-secondary hover:text-ink-primary"
          >
            EQ인증원소개
          </Link>
          <div className="group relative">
            <Link
              href="/services"
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink-secondary transition hover:bg-bg-secondary hover:text-ink-primary"
            >
              ISO 인증서비스
              <span className="text-xs">▾</span>
            </Link>
            <div className="invisible absolute left-0 top-full z-30 mt-2 w-56 rounded-xl border border-black/5 bg-white p-2 opacity-0 shadow-card transition-all group-hover:visible group-hover:opacity-100">
              {isoMenu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm text-ink-secondary transition hover:bg-bg-secondary hover:text-ink-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-secondary transition hover:bg-bg-secondary hover:text-ink-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:010-2432-5446"
            className="hidden text-sm font-medium text-ink-secondary sm:block lg:hidden xl:block"
          >
            010-2432-5446
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-card transition hover:bg-accent-hover hover:shadow-cardHover"
          >
            무료 상담
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-ink-primary md:hidden"
            aria-expanded={open}
            aria-label="메뉴"
            onClick={() => setOpen((v) => !v)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-bg-primary px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            <Link href="/#about" className="rounded-lg px-3 py-2 text-sm font-medium" onClick={() => setOpen(false)}>
              EQ인증원소개
            </Link>
            <Link href="/services" className="rounded-lg px-3 py-2 text-sm font-medium" onClick={() => setOpen(false)}>
              ISO 인증서비스
            </Link>
            <div className="ml-3 flex flex-col border-l border-black/10 pl-3">
              {isoMenu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-ink-secondary"
                  onClick={() => setOpen(false)}
                >
                  - {item.label}
                </Link>
              ))}
            </div>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
