# ISO 인증 파트너 홈페이지

`homepage-content-master.md`와 `homepage-ui-design.md`를 반영한 Next.js 14(App Router) + Tailwind CSS 정적 홈페이지입니다.

## 실행 방법

```bash
cd web
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## 빌드

```bash
npm run build
npm start
```

## 문의 API

`POST /api/inquiry`는 제출 내용을 `data/inquiries.json`에 누적 저장합니다. Vercel 등 서버리스 환경에서는 파일 쓰기가 유지되지 않을 수 있으므로, 운영 시에는 DB 또는 이메일/CRM 연동을 권장합니다.

## 커스터마이징

- 연락처·주소·사업자번호: `components/Footer.tsx`, `components/Header.tsx`, `components/HomeContent.tsx`의 예시 값을 수정하세요.
- 히어로 이미지: Unsplash URL은 `next.config.mjs`의 `images.remotePatterns`에 등록되어 있습니다.
