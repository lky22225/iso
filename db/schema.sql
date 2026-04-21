-- Vercel Postgres(Neon): 대시보드 SQL Editor 또는 `psql $POSTGRES_URL -f db/schema.sql` 로 1회 실행
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  intent TEXT NOT NULL CHECK (intent IN ('consult', 'quote')),
  company TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  industry TEXT NOT NULL DEFAULT '',
  headcount TEXT NOT NULL DEFAULT '',
  standards JSONB NOT NULL DEFAULT '[]'::jsonb,
  target_date TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL,
  read_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries (created_at DESC);
