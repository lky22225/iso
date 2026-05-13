import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const OG_SITE_NAME = "ISO 인증 파트너";

/** 공유 카드용 기본 이미지 (1200×630 권장) — 메인 히어로와 동일 출처 */
export const OG_DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&h=630&fit=crop&q=80";

const defaultOgImages = [
  { url: OG_DEFAULT_IMAGE, width: 1200, height: 630, alt: OG_SITE_NAME },
] as const;

export function absolutePageUrl(path: string): string {
  const base = getSiteUrl().replace(/\/+$/, "");
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** 페이지별 OG·Twitter 카드 (기본 이미지 공유) */
export function pageOgMeta(input: {
  title: string;
  description: string;
  path: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const url = absolutePageUrl(input.path);
  return {
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: OG_SITE_NAME,
      url,
      title: input.title,
      description: input.description,
      images: [...defaultOgImages],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [OG_DEFAULT_IMAGE],
    },
  };
}
