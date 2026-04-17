"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "isoAdminPassword";

type InquiryItem = {
  id: string;
  intent: "consult" | "quote";
  company: string;
  contactName: string;
  phone: string;
  email: string;
  industry?: string;
  headcount?: string;
  standards: string[];
  targetDate?: string;
  body?: string;
  createdAt: string;
  readAt: string | null;
};

function compareByUnreadAndRecent(a: InquiryItem, b: InquiryItem) {
  if (a.readAt === null && b.readAt !== null) return -1;
  if (a.readAt !== null && b.readAt === null) return 1;
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("ko-KR");
}

export function AdminInquiryBoard() {
  const router = useRouter();
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [onlyUnread, setOnlyUnread] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selected = useMemo(() => items.find((x) => x.id === selectedId) ?? null, [items, selectedId]);
  const filteredItems = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return items.filter((item) => {
      if (onlyUnread && item.readAt !== null) return false;
      if (!keyword) return true;
      return item.company.toLowerCase().includes(keyword) || item.contactName.toLowerCase().includes(keyword);
    });
  }, [items, onlyUnread, search]);

  useEffect(() => {
    const adminPassword = sessionStorage.getItem(STORAGE_KEY);
    if (!adminPassword) {
      router.replace("/admin");
      return;
    }

    async function load(password: string) {
      setLoading(true);
      setError("");
      const res = await fetch("/api/admin/inquiries", {
        headers: { "x-admin-password": password },
      });

      if (res.status === 401) {
        sessionStorage.removeItem(STORAGE_KEY);
        router.replace("/admin");
        return;
      }
      if (!res.ok) {
        setError("목록을 불러오지 못했습니다.");
        setLoading(false);
        return;
      }

      const data = (await res.json()) as { items: InquiryItem[] };
      setItems([...(data.items ?? [])].sort(compareByUnreadAndRecent));
      if ((data.items ?? []).length > 0) {
        setSelectedId((prev) => prev || data.items[0].id);
      }
      setLoading(false);
    }

    void load(adminPassword);
  }, [router]);

  async function markAsReadIfNeeded(item: InquiryItem) {
    if (item.readAt) return;
    const password = sessionStorage.getItem(STORAGE_KEY);
    if (!password) return;

    const res = await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ id: item.id }),
    });

    if (!res.ok) return;

    setItems((prev) =>
      prev
        .map((x) =>
          x.id === item.id
            ? {
                ...x,
                readAt: new Date().toISOString(),
              }
            : x,
        )
        .sort(compareByUnreadAndRecent),
    );
  }

  async function updateReadState(item: InquiryItem, read: boolean) {
    const password = sessionStorage.getItem(STORAGE_KEY);
    if (!password) return;

    const res = await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ id: item.id, read }),
    });
    if (!res.ok) return;

    setItems((prev) =>
      prev
        .map((x) =>
          x.id === item.id
            ? {
                ...x,
                readAt: read ? new Date().toISOString() : null,
              }
            : x,
        )
        .sort(compareByUnreadAndRecent),
    );
  }

  function onSelect(item: InquiryItem) {
    setSelectedId(item.id);
    void markAsReadIfNeeded(item);
  }

  function onLogout() {
    sessionStorage.removeItem(STORAGE_KEY);
    router.push("/admin");
  }

  return (
    <div className="mx-auto max-w-content px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink-primary sm:text-3xl">문의/견적/상담 관리자</h1>
          <p className="mt-2 text-sm text-ink-secondary">안읽음 우선, 같은 상태에서는 최근 문의가 먼저 보입니다.</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-ink-secondary transition hover:bg-bg-secondary"
        >
          로그아웃
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-card">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="회사명 또는 담당자 검색"
          className="w-full rounded-xl border border-black/10 bg-bg-primary px-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 sm:w-80"
        />
        <label className="inline-flex items-center gap-2 text-sm text-ink-secondary">
          <input
            type="checkbox"
            checked={onlyUnread}
            onChange={(e) => setOnlyUnread(e.target.checked)}
            className="rounded text-accent focus:ring-accent"
          />
          미확인만 보기
        </label>
        <span className="text-xs text-ink-secondary">표시 {filteredItems.length}건 / 전체 {items.length}건</span>
      </div>

      {loading && <p className="text-sm text-ink-secondary">목록을 불러오는 중입니다...</p>}
      {!loading && error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="rounded-2xl border border-black/5 bg-white shadow-card">
            <div className="border-b border-black/5 px-5 py-4">
              <h2 className="font-semibold text-ink-primary">접수 목록 ({filteredItems.length})</h2>
            </div>
            <div className="max-h-[65vh] divide-y divide-black/5 overflow-y-auto">
              {filteredItems.length === 0 && (
                <p className="px-5 py-6 text-sm text-ink-secondary">조건에 맞는 문의가 없습니다.</p>
              )}
              {filteredItems.map((item) => {
                const selectedClass = item.id === selectedId ? "bg-accent/5" : "hover:bg-bg-secondary";
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelect(item)}
                    className={`w-full px-5 py-4 text-left transition ${selectedClass}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-semibold text-ink-primary">{item.company}</p>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                          item.readAt ? "bg-slate-100 text-slate-600" : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {item.readAt ? "읽음" : "미확인"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-ink-secondary">
                      {item.intent === "quote" ? "견적 요청" : "무료 상담"} · {item.contactName}
                    </p>
                    <p className="mt-1 text-xs text-ink-secondary">{formatDate(item.createdAt)}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-card">
            {!selected && <p className="text-sm text-ink-secondary">왼쪽 목록에서 항목을 선택하면 상세내용이 표시됩니다.</p>}

            {selected && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/5 pb-4">
                  <h2 className="text-xl font-semibold text-ink-primary">{selected.company}</h2>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-bg-secondary px-2.5 py-1 text-ink-secondary">
                      {selected.intent === "quote" ? "견적 요청" : "무료 상담"}
                    </span>
                    <span className="rounded-full bg-bg-secondary px-2.5 py-1 text-ink-secondary">
                      접수: {formatDate(selected.createdAt)}
                    </span>
                    <button
                      type="button"
                      onClick={() => void updateReadState(selected, !selected.readAt)}
                      className="rounded-full border border-black/10 px-2.5 py-1 font-medium text-ink-secondary transition hover:bg-bg-secondary"
                    >
                      {selected.readAt ? "미확인으로 되돌리기" : "읽음 처리"}
                    </button>
                  </div>
                </div>

                <dl className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold text-ink-secondary">담당자</dt>
                    <dd className="mt-1 text-sm text-ink-primary">{selected.contactName || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-ink-secondary">연락처</dt>
                    <dd className="mt-1 text-sm text-ink-primary">{selected.phone || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-ink-secondary">이메일</dt>
                    <dd className="mt-1 text-sm text-ink-primary">{selected.email || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-ink-secondary">업종</dt>
                    <dd className="mt-1 text-sm text-ink-primary">{selected.industry || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-ink-secondary">인원수</dt>
                    <dd className="mt-1 text-sm text-ink-primary">{selected.headcount || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-ink-secondary">목표 일정</dt>
                    <dd className="mt-1 text-sm text-ink-primary">{selected.targetDate || "-"}</dd>
                  </div>
                </dl>

                <div>
                  <h3 className="text-xs font-semibold text-ink-secondary">희망 인증</h3>
                  <p className="mt-1 text-sm text-ink-primary">{selected.standards?.length ? selected.standards.join(", ") : "-"}</p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-ink-secondary">문의 내용</h3>
                  <p className="mt-1 whitespace-pre-wrap rounded-xl bg-bg-secondary p-4 text-sm leading-relaxed text-ink-primary">
                    {selected.body || "(문의 내용 없음)"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
