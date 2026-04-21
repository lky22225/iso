import { sql } from "@vercel/postgres";
import { randomUUID } from "crypto";

export type InquiryIntent = "consult" | "quote";

export type InquiryRecord = {
  id: string;
  intent: InquiryIntent;
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

type InquiryRow = {
  id: string;
  intent: string;
  company: string;
  contact_name: string;
  phone: string;
  email: string;
  industry: string;
  headcount: string;
  standards: unknown;
  target_date: string;
  body: string;
  created_at: Date | string;
  read_at: Date | string | null;
};

function toIso(value: Date | string): string {
  if (value instanceof Date) return value.toISOString();
  return value;
}

function parseStandards(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((x): x is string => typeof x === "string");
}

function rowToRecord(row: InquiryRow): InquiryRecord {
  return {
    id: row.id,
    intent: row.intent === "quote" ? "quote" : "consult",
    company: row.company,
    contactName: row.contact_name,
    phone: row.phone,
    email: row.email,
    industry: row.industry || undefined,
    headcount: row.headcount || undefined,
    standards: parseStandards(row.standards),
    targetDate: row.target_date || undefined,
    body: row.body || undefined,
    createdAt: toIso(row.created_at),
    readAt: row.read_at ? toIso(row.read_at) : null,
  };
}

export async function readInquiries(): Promise<InquiryRecord[]> {
  const { rows } = await sql`
    SELECT
      id,
      intent,
      company,
      contact_name,
      phone,
      email,
      industry,
      headcount,
      standards,
      target_date,
      body,
      created_at,
      read_at
    FROM inquiries
    ORDER BY created_at DESC
  `;
  return (rows as InquiryRow[]).map(rowToRecord);
}

type InquiryInsert = Omit<InquiryRecord, "id" | "readAt">;

export async function insertInquiry(input: InquiryInsert): Promise<InquiryRecord> {
  const id = randomUUID();
  const createdAt = input.createdAt || new Date().toISOString();
  const standardsJson = JSON.stringify(input.standards ?? []);

  await sql`
    INSERT INTO inquiries (
      id,
      intent,
      company,
      contact_name,
      phone,
      email,
      industry,
      headcount,
      standards,
      target_date,
      body,
      created_at,
      read_at
    )
    VALUES (
      ${id},
      ${input.intent},
      ${input.company},
      ${input.contactName},
      ${input.phone},
      ${input.email},
      ${input.industry ?? ""},
      ${input.headcount ?? ""},
      ${standardsJson}::jsonb,
      ${input.targetDate ?? ""},
      ${input.body ?? ""},
      ${createdAt}::timestamptz,
      NULL
    )
  `;

  return {
    ...input,
    id,
    readAt: null,
    createdAt,
  };
}

export async function updateInquiryReadAt(
  id: string,
  read: boolean,
): Promise<{ ok: boolean; readAt: string | null }> {
  const readAt: string | null = read ? new Date().toISOString() : null;
  const { rows } = await sql`
    UPDATE inquiries
    SET read_at = ${readAt}
    WHERE id = ${id}
    RETURNING read_at
  `;
  if (rows.length === 0) return { ok: false, readAt: null };
  const row = rows[0] as { read_at: Date | string | null };
  return {
    ok: true,
    readAt: row.read_at ? toIso(row.read_at) : null,
  };
}
