import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "inquiries.json");

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

type InquiryInput = Omit<InquiryRecord, "id" | "readAt">;

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((x): x is string => typeof x === "string") : [];
}

function normalizeInquiry(value: unknown, index: number): InquiryRecord {
  const item = typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
  const createdAt = asString(item.createdAt) || new Date().toISOString();
  const intent = asString(item.intent) === "quote" ? "quote" : "consult";

  return {
    id: asString(item.id) || `legacy-${index}-${createdAt}`,
    intent,
    company: asString(item.company),
    contactName: asString(item.contactName),
    phone: asString(item.phone),
    email: asString(item.email),
    industry: asString(item.industry),
    headcount: asString(item.headcount),
    standards: asStringArray(item.standards),
    targetDate: asString(item.targetDate),
    body: asString(item.body),
    createdAt,
    readAt: asString(item.readAt) || null,
  };
}

export async function readInquiries(): Promise<InquiryRecord[]> {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeInquiry);
  } catch {
    return [];
  }
}

export async function writeInquiries(list: InquiryRecord[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf8");
}

export function createInquiry(input: InquiryInput): InquiryRecord {
  return {
    ...input,
    id: randomUUID(),
    readAt: null,
  };
}
