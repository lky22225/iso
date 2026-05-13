/**
 * 절대 URL 생성용 베이스 (sitemap, robots 등).
 * 프로덕션: Vercel 대시보드에 NEXT_PUBLIC_SITE_URL=https://실제도메인 권장.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "")}`;
  return "http://localhost:3000";
}
