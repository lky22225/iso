import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { pageOgMeta } from "@/lib/open-graph";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = "ISO 인증 파트너 | 경영시스템 인증";
const description =
  "국내 인정 기반 인증심사와 체계적인 준비 지원. ISO 9001·14001·45001·27001 상담 및 견적.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title,
  description,
  ...pageOgMeta({ title, description, path: "/" }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
