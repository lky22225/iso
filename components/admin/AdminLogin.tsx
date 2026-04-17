"use client";

import { useState } from "react";

const STORAGE_KEY = "isoAdminPassword";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const normalizedPassword = password.trim();

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "GET",
        headers: {
          "x-admin-password": normalizedPassword,
        },
      });

      if (!res.ok) {
        setError("암호를 확인하세요");
        return;
      }

      sessionStorage.setItem(STORAGE_KEY, normalizedPassword);
      window.location.assign("/admin/inquiries");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-card ring-1 ring-black/5 sm:p-8">
      <h1 className="text-2xl font-semibold text-ink-primary">관리자 인증</h1>
      <p className="mt-2 text-sm text-ink-secondary">관리자 암호를 입력하면 문의/견적/상담 내역을 확인할 수 있습니다.</p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div>
          <label htmlFor="admin-password" className="block text-sm font-medium text-ink-primary">
            암호
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-xl border border-black/10 bg-bg-primary px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white transition hover:bg-accent-hover disabled:opacity-60"
        >
          {loading ? "확인 중..." : "관리자 페이지 입장"}
        </button>
      </form>
    </div>
  );
}
