export type IsoService = {
  slug: "iso-9001" | "iso-14001" | "iso-45001" | "iso-27001";
  code: string;
  title: string;
  summary: string;
  target: string;
  effect: string;
};

export const isoOverviewText =
  "ISO 인증은 국제표준화기구(ISO)에서 정한 경영시스템 규격에 따라 조직의 적합성을 평가하는 제3자 증명 활동입니다. 이큐인증원(주)을 통해 ISO 9001 품질경영시스템, ISO 14001 환경경영시스템, ISO 45001 보건안전경영시스템, ISO 27001 정보보안경영시스템, ISO 27701 개인정보경영시스템, ISO 20000-1 IT서비스 경영시스템, ISO 22000 식품안전경영시스템, ISO 13485 의료 용구 경영시스템, ISO 37000 부패방지경영시스템 등의 ISO 인증을 진행하고 있습니다.";

export const isoServices: IsoService[] = [
  {
    slug: "iso-9001",
    code: "9001",
    title: "품질경영시스템",
    summary: "고객 요구사항 충족과 품질 일관성 확보를 위한 국제 표준입니다.",
    target: "제조, 서비스, 공공, 스타트업 등 전 업종",
    effect: "불량 감소, 프로세스 표준화, 고객 신뢰도 향상",
  },
  {
    slug: "iso-14001",
    code: "14001",
    title: "환경경영시스템",
    summary: "환경영향을 체계적으로 관리하고 규제 대응력을 강화하는 표준입니다.",
    target: "제조, 건설, 물류, 환경 영향이 있는 조직",
    effect: "환경 리스크 저감, ESG 대응 기반 강화",
  },
  {
    slug: "iso-45001",
    code: "45001",
    title: "보건안전경영시스템",
    summary: "산업재해 예방과 안전보건 리스크 관리를 위한 경영 표준입니다.",
    target: "현장 작업이 있는 제조, 건설, 물류, 서비스 조직",
    effect: "사고 예방, 안전 문화 정착, 법규 대응 강화",
  },
  {
    slug: "iso-27001",
    code: "27001",
    title: "정보보안경영시스템",
    summary: "정보자산 보호를 위한 위험 기반 통제 체계를 수립하는 표준입니다.",
    target: "IT, SaaS, 금융, 개인정보 처리 조직",
    effect: "보안사고 예방, 거래처 신뢰 확보, 대외 대응력 강화",
  },
];

