import iso9001Table from "@/data/iso9001-audit-days.json";
import iso14001Table from "@/data/iso14001-audit-days.json";
import iso45001Table from "@/data/iso45001-audit-days.json";
import iso27001Table from "@/data/iso27001-audit-days.json";
import iso27701Table from "@/data/iso27701-audit-days.json";
import iso42001Table from "@/data/iso42001-audit-days.json";
import dailyLaborRates from "@/data/daily-labor-rates.json";
import dailyTravelExpenses from "@/data/daily-travel-expenses.json";

export type StandardCode =
  | "iso9001"
  | "iso14001"
  | "iso45001"
  | "iso27001"
  | "iso27701"
  | "iso42001";

export type AuditType = "initial" | "surveillance" | "renewal";
export type RiskCategory = "high" | "medium" | "low" | "limited";
export type RegionCode =
  | "seoul"
  | "gyeonggi"
  | "chungcheong"
  | "jeonbuk-jeonnam"
  | "gyeongbuk-gyeongnam"
  | "jeju";

export type QuoteInput = {
  standard: StandardCode;
  headcount: number;
  auditType: AuditType;
  region: RegionCode | string;
  riskCategory?: RiskCategory;
};

type MdByType = Record<AuditType, number>;
type RangeRow = { min: number; max: number | null } & Partial<MdByType>;
type RiskRangeRow = RangeRow & {
  high: MdByType;
  medium: MdByType;
  low: MdByType;
  limited: MdByType;
};

type Table = {
  standard: string;
  headcountBrackets: Array<RangeRow | RiskRangeRow>;
  overMaxRule?: { min: number; message: string };
};

const TABLE_BY_STANDARD: Record<StandardCode, Table> = {
  iso9001: iso9001Table as Table,
  iso14001: iso14001Table as Table,
  iso45001: iso45001Table as Table,
  iso27001: iso27001Table as Table,
  iso27701: iso27701Table as Table,
  iso42001: iso42001Table as Table,
};

const REGION_NAME_BY_CODE: Record<RegionCode, string> = {
  seoul: "서울지역",
  gyeonggi: "경기지역",
  chungcheong: "충청지역",
  "jeonbuk-jeonnam": "전북/전남지역",
  "gyeongbuk-gyeongnam": "경북/경남지역",
  jeju: "제주지역",
};

function formatKrw(amount: number): string {
  return `${new Intl.NumberFormat("ko-KR").format(amount)}원`;
}

function resolveRegionName(region: RegionCode | string): string {
  if (region in REGION_NAME_BY_CODE) {
    return REGION_NAME_BY_CODE[region as RegionCode];
  }
  return region;
}

function findBracket(table: Table, headcount: number): RangeRow | RiskRangeRow | null {
  return (
    table.headcountBrackets.find((row) => {
      const max = row.max ?? Number.POSITIVE_INFINITY;
      return headcount >= row.min && headcount <= max;
    }) ?? null
  );
}

function getLaborDailyRate(standard: StandardCode): number {
  const rateRow = dailyLaborRates.rates.find((row) => row.code === standard);
  if (!rateRow) {
    throw new Error(`노임단가 기준이 없습니다: ${standard}`);
  }
  return rateRow.dailyRate;
}

function getRegionTravelExpense(region: string): { travelPerMdAmount: number; vehicleAmount: number } {
  const regionRow = dailyTravelExpenses.regions.find((row) => row.region === region);
  if (!regionRow) {
    throw new Error(`일비(교통비) 기준이 없습니다: ${region}`);
  }
  const v = (regionRow as { vehicle?: number }).vehicle;
  const vehicleAmount = typeof v === "number" ? v : 0;
  return { travelPerMdAmount: regionRow.amount, vehicleAmount };
}

export type QuoteResult =
  | {
      ok: false;
      message: string;
    }
  | {
      ok: true;
      standard: StandardCode;
      standardLabel: string;
      region: string;
      headcount: number;
      auditType: AuditType;
      riskCategory?: RiskCategory;
      auditDaysMd: number;
      laborDailyRate: number;
      travelPerMdAmount: number;
      vehicleAmount: number;
      auditAmount: number;
      travelAmount: number;
      totalAmountVatExcluded: number;
      formulas: {
        auditDays: string;
        auditAmount: string;
        vehicleAmount: string;
        travelAmount: string;
        total: string;
      };
      display: {
        auditDays: string;
        auditAmount: string;
        vehicleAmount: string;
        travelAmount: string;
        totalAmountVatExcluded: string;
      };
    };

export function calculateQuote(input: QuoteInput): QuoteResult {
  const table = TABLE_BY_STANDARD[input.standard];
  const regionName = resolveRegionName(input.region);

  if (!Number.isFinite(input.headcount) || input.headcount < 1) {
    return { ok: false, message: "종업원 수는 1명 이상이어야 합니다." };
  }

  if (table.overMaxRule && input.headcount >= table.overMaxRule.min) {
    return { ok: false, message: table.overMaxRule.message };
  }

  const bracket = findBracket(table, input.headcount);
  if (!bracket) {
    return { ok: false, message: "해당 종업원 수의 기준표가 없습니다." };
  }

  const usesRiskCategory = input.standard === "iso14001" || input.standard === "iso45001";
  let auditDaysMd = 0;

  if (usesRiskCategory) {
    if (!input.riskCategory) {
      return { ok: false, message: "해당 규격은 사업위험도 선택이 필요합니다." };
    }
    const riskBracket = bracket as RiskRangeRow;
    auditDaysMd = riskBracket[input.riskCategory][input.auditType];
  } else {
    const simpleBracket = bracket as RangeRow;
    const md = simpleBracket[input.auditType];
    if (typeof md !== "number") {
      return { ok: false, message: "심사일수 기준을 찾지 못했습니다." };
    }
    auditDaysMd = md;
  }

  const laborDailyRate = getLaborDailyRate(input.standard);
  const { travelPerMdAmount, vehicleAmount } = getRegionTravelExpense(regionName);

  const auditAmount = auditDaysMd * laborDailyRate;
  const travelAmount = auditDaysMd * travelPerMdAmount + vehicleAmount;
  const totalAmountVatExcluded = auditAmount + travelAmount;

  return {
    ok: true,
    standard: input.standard,
    standardLabel: table.standard,
    region: regionName,
    headcount: input.headcount,
    auditType: input.auditType,
    riskCategory: input.riskCategory,
    auditDaysMd,
    laborDailyRate,
    travelPerMdAmount,
    vehicleAmount,
    auditAmount,
    travelAmount,
    totalAmountVatExcluded,
    formulas: {
      auditDays: `기준표 매칭 결과 = ${auditDaysMd} M/D`,
      auditAmount: `${auditDaysMd} M/D × ${formatKrw(laborDailyRate)}/MD = ${formatKrw(auditAmount)}`,
      vehicleAmount: `왕복교통비 = ${formatKrw(vehicleAmount)}`,
      travelAmount: `${auditDaysMd} M/D × ${formatKrw(travelPerMdAmount)}(일비) + ${formatKrw(vehicleAmount)}(왕복교통비) = ${formatKrw(travelAmount)}`,
      total: `${formatKrw(auditAmount)} + ${formatKrw(travelAmount)} = ${formatKrw(totalAmountVatExcluded)} (VAT 별도)`,
    },
    display: {
      auditDays: `${auditDaysMd} M/D`,
      auditAmount: formatKrw(auditAmount),
      vehicleAmount: formatKrw(vehicleAmount),
      travelAmount: formatKrw(travelAmount),
      totalAmountVatExcluded: `${formatKrw(totalAmountVatExcluded)} (VAT 별도)`,
    },
  };
}

