import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-ink-primary text-white">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-bold">
                ISO
              </span>
              <span className="font-semibold">인증 파트너</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              조직의 신뢰를 완성하는 ISO 인증 파트너. 인증은 명확하게, 준비는 체계적으로.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent-soft">
              서비스
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/#services" className="hover:text-white">
                  ISO 인증서비스
                </Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-white">
                  인증 절차·비용
                </Link>
              </li>
              <li>
                <Link href="/#checklist" className="hover:text-white">
                  준비서류 체크리스트
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent-soft">
              고객지원
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/contact" className="hover:text-white">
                  인증신청·견적
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <span className="text-white/60">이의제기·불만: lky22225@gmail.com</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent-soft">
              연락처
            </h3>
            <p className="text-sm text-white/80">
              인천광역시 중구 제물량로
              <br />
              Tel: 010-2432-5446
              <br />
              msg: 010-2432-5446
              <br />
              Email: lky22225@gmail.com
            </p>
            <p className="mt-4 text-xs text-white/50">
              사업자등록번호 000-00-00000
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-8 text-center text-xs text-white/50">
          © {new Date().getFullYear()} ISO 인증 파트너. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
