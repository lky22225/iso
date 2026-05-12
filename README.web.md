# ISO 인증 파트너 홈페이지

`homepage-content-master.md`와 `homepage-ui-design.md`를 반영한 Next.js 14(App Router) + Tailwind CSS 정적 홈페이지입니다.

## 실행 방법

프로젝트 루트(`package.json`이 있는 폴더)에서 실행합니다.

### 1) 로컬 Postgres (문의·관리자 API 테스트 시)

```bash
docker compose up -d
```

초기 1회, DB에 테이블을 만듭니다(Postgres가 뜬 뒤).

```bash
docker compose cp db/schema.sql postgres:/tmp/schema.sql
docker compose exec postgres psql -U iso -d iso -f /tmp/schema.sql
```

`.env.example`을 참고해 `.env.local`을 만들고 `POSTGRES_URL`을 넣습니다.

### 2) Next.js 개발 서버

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

Postgres 없이도 정적 페이지·UI는 대부분 열리지만, `POST /api/inquiry`·관리자 문의 목록 등 DB를 쓰는 기능은 `POSTGRES_URL` 설정 후에만 동작합니다.

## 빌드

```bash
npm run build
npm start
```

## 문의 API

`POST /api/inquiry`는 Postgres(`inquiries` 테이블, `db/schema.sql`)에 저장합니다. Vercel에서는 Vercel Postgres 연결 문자열이 자동 주입되며, 로컬에서는 `.env.local`의 `POSTGRES_URL`을 사용합니다.

문의 알림 메일은 **기본 비활성**입니다. 사용할 때 `.env.local`에 `INQUIRY_EMAIL_ENABLED=true`와 SMTP 변수(`.env.example` 참고)를 설정하면 접수 시 `isopartner5446@gmail.com`(기본 수신, `INQUIRY_NOTIFY_TO`로 변경 가능)으로 발송됩니다.

## 커스터마이징

- 연락처·주소·사업자번호: `components/Footer.tsx`, `components/Header.tsx`, `components/HomeContent.tsx`의 예시 값을 수정하세요.
- 히어로 이미지: Unsplash URL은 `next.config.mjs`의 `images.remotePatterns`에 등록되어 있습니다.
