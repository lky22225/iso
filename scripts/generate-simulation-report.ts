import { writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  calculateQuote,
  type AuditType,
  type RegionCode,
  type RiskCategory,
  type StandardCode,
} from "../lib/quote-calculator";

type Row = {
  standard: StandardCode;
  auditLabel: string;
  headcount: number;
  riskLabel: string;
  regionLabel: string;
};

const REGION_MAP: Record<string, RegionCode> = {
  서울: "seoul",
  충청: "chungcheong",
};

const RISK_MAP: Record<string, RiskCategory | undefined> = {
  "": undefined,
  하: "low",
  상: "high",
};

const rows: Row[] = [
  { standard: "iso9001", auditLabel: "최초", headcount: 10, riskLabel: "", regionLabel: "서울" },
  { standard: "iso9001", auditLabel: "최초", headcount: 10, riskLabel: "", regionLabel: "충청" },
  { standard: "iso9001", auditLabel: "최초", headcount: 100, riskLabel: "", regionLabel: "서울" },
  { standard: "iso9001", auditLabel: "최초", headcount: 100, riskLabel: "", regionLabel: "충청" },
  { standard: "iso9001", auditLabel: "최초", headcount: 1000, riskLabel: "", regionLabel: "서울" },
  { standard: "iso9001", auditLabel: "최초", headcount: 1000, riskLabel: "", regionLabel: "충청" },
  { standard: "iso14001", auditLabel: "최초", headcount: 10, riskLabel: "하", regionLabel: "서울" },
  { standard: "iso14001", auditLabel: "최초", headcount: 10, riskLabel: "하", regionLabel: "충청" },
  { standard: "iso14001", auditLabel: "최초", headcount: 10, riskLabel: "상", regionLabel: "충청" },
  { standard: "iso14001", auditLabel: "최초", headcount: 100, riskLabel: "하", regionLabel: "서울" },
  { standard: "iso14001", auditLabel: "최초", headcount: 100, riskLabel: "하", regionLabel: "충청" },
  { standard: "iso14001", auditLabel: "최초", headcount: 100, riskLabel: "상", regionLabel: "충청" },
  { standard: "iso14001", auditLabel: "최초", headcount: 1000, riskLabel: "하", regionLabel: "서울" },
  { standard: "iso14001", auditLabel: "최초", headcount: 1000, riskLabel: "하", regionLabel: "충청" },
  { standard: "iso14001", auditLabel: "최초", headcount: 1000, riskLabel: "상", regionLabel: "충청" },
  { standard: "iso45001", auditLabel: "최초", headcount: 10, riskLabel: "하", regionLabel: "서울" },
  { standard: "iso45001", auditLabel: "최초", headcount: 10, riskLabel: "하", regionLabel: "충청" },
  { standard: "iso45001", auditLabel: "최초", headcount: 10, riskLabel: "상", regionLabel: "충청" },
  { standard: "iso45001", auditLabel: "최초", headcount: 100, riskLabel: "하", regionLabel: "서울" },
  { standard: "iso45001", auditLabel: "최초", headcount: 100, riskLabel: "하", regionLabel: "충청" },
  { standard: "iso45001", auditLabel: "최초", headcount: 100, riskLabel: "상", regionLabel: "충청" },
  { standard: "iso45001", auditLabel: "최초", headcount: 1000, riskLabel: "하", regionLabel: "서울" },
  { standard: "iso45001", auditLabel: "최초", headcount: 1000, riskLabel: "하", regionLabel: "충청" },
  { standard: "iso45001", auditLabel: "최초", headcount: 1000, riskLabel: "상", regionLabel: "충청" },
  { standard: "iso27001", auditLabel: "최초", headcount: 10, riskLabel: "", regionLabel: "서울" },
  { standard: "iso27001", auditLabel: "최초", headcount: 10, riskLabel: "", regionLabel: "충청" },
  { standard: "iso27001", auditLabel: "최초", headcount: 100, riskLabel: "", regionLabel: "서울" },
  { standard: "iso27001", auditLabel: "최초", headcount: 100, riskLabel: "", regionLabel: "충청" },
  { standard: "iso27001", auditLabel: "최초", headcount: 1000, riskLabel: "", regionLabel: "서울" },
  { standard: "iso27001", auditLabel: "최초", headcount: 1000, riskLabel: "", regionLabel: "충청" },
];

function main() {
  const auditType: AuditType = "initial";
  const lines: string[] = [
    "# 예상비용 시뮬레이션 보고서",
    "",
    "생성: `lib/quote-calculator.ts`의 `calculateQuote`를 그대로 호출하여 산출했습니다.",
    "",
    "## 계산 규칙 요약",
    "",
    "1. **심사 M/D**: 규격별 `data/*-audit-days.json`에서 종업원 수 구간과 심사종류(여기서는 모두 **최초** = `initial`)로 M/D를 조회합니다. ISO 14001·45001은 **사업위험도**(하→`low`, 상→`high`)에 따라 M/D가 달라집니다.",
    "2. **노임 일당**: `data/daily-labor-rates.json`의 규격별 `dailyRate`.",
    "3. **일비(일당, amount)**: `data/daily-travel-expenses.json`의 지역별 `amount` (예: 서울·경기 50,000원/M/D, 충청 120,000원/M/D).",
    "4. **왕복교통비(vehicle)**: 동일 파일의 지역별 `vehicle` (예: 서울·경기 0원, 충청 100,000원).",
    "5. **심사금액** = M/D × 노임 일당.",
    "6. **일비(교통비)** = M/D × amount(일비) + vehicle(왕복교통비).",
    "7. **합계(VAT 별도)** = 심사금액 + 일비(교통비).",
    "",
    "## 입력 매핑",
    "",
    "| 화면 지역 | 내부 코드 |",
    "|---|---|",
    "| 서울 | `seoul` → 서울지역 |",
    "| 충청 | `chungcheong` → 충청지역 |",
    "",
    "## 시나리오별 결과",
    "",
  ];

  let i = 0;
  for (const r of rows) {
    i += 1;
    const region = REGION_MAP[r.regionLabel];
    if (!region) throw new Error(`Unknown region: ${r.regionLabel}`);
    const riskCategory = RISK_MAP[r.riskLabel];

    lines.push(`### ${i}. ${r.standard}, ${r.auditLabel}, ${r.headcount}명, ${r.riskLabel || "(해당 없음)"}, ${r.regionLabel}`);
    lines.push("");
    lines.push("**입력**");
    lines.push("");
    lines.push("```json");
    lines.push(
      JSON.stringify(
        {
          standard: r.standard,
          auditType,
          headcount: r.headcount,
          riskCategory: riskCategory ?? null,
          region,
        },
        null,
        2,
      ),
    );
    lines.push("```");
    lines.push("");

    const result = calculateQuote({
      standard: r.standard,
      headcount: r.headcount,
      auditType,
      region,
      riskCategory,
    });

    if (!result.ok) {
      lines.push("**결과**: 계산 불가");
      lines.push("");
      lines.push(`- 사유: ${result.message}`);
      lines.push("");
      continue;
    }

    lines.push("**계산 과정 (표시 문자열)**");
    lines.push("");
    lines.push(`- ${result.formulas.auditDays}`);
    lines.push(`- ${result.formulas.auditAmount}`);
    lines.push(`- ${result.formulas.vehicleAmount}`);
    lines.push(`- ${result.formulas.travelAmount}`);
    lines.push(`- ${result.formulas.total}`);
    lines.push("");
    lines.push("**숫자 요약**");
    lines.push("");
    lines.push("| 항목 | 값 |");
    lines.push("|---|---|");
    lines.push(`| M/D | ${result.auditDaysMd} |`);
    lines.push(`| 노임 일당 | ${result.laborDailyRate.toLocaleString("ko-KR")}원 |`);
    lines.push(`| 일비 단가(M/D) | ${result.travelPerMdAmount.toLocaleString("ko-KR")}원 |`);
    lines.push(`| 왕복교통비 | ${result.vehicleAmount.toLocaleString("ko-KR")}원 |`);
    lines.push(`| 심사금액 | ${result.auditAmount.toLocaleString("ko-KR")}원 |`);
    lines.push(`| 일비(교통비) | ${result.travelAmount.toLocaleString("ko-KR")}원 |`);
    lines.push(`| 합계(VAT 별도) | ${result.totalAmountVatExcluded.toLocaleString("ko-KR")}원 |`);
    lines.push("");
  }

  const outPath = join(process.cwd(), "simulation_report.md");
  writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log("Wrote", outPath);
}

main();
