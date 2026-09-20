import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const USD_TO_THB_RATE = 35;

export function convertPriceByLang(basePriceUsd: number, lang: "th" | "en" = "th"): number {
  if (lang === "th") {
    // Round to nearest 1,000 for realistic Thai car pricing
    return Math.round((basePriceUsd * USD_TO_THB_RATE) / 1000) * 1000;
  }
  return basePriceUsd;
}

export function formatPriceByLang(basePriceUsd: number, lang: "th" | "en" = "th"): string {
  const converted = convertPriceByLang(basePriceUsd, lang);
  if (lang === "th") {
    return `฿${converted.toLocaleString()}`;
  }
  return `$${converted.toLocaleString()}`;
}

export function formatMonthlyByLang(basePriceUsd: number, baseMonthlyUsd?: number, lang: "th" | "en" = "th"): string {
  if (lang === "th") {
    const totalThb = convertPriceByLang(basePriceUsd, "th");
    // Standard 72-month installment formula rounded to nearest 100
    const monthlyThb = Math.round((totalThb / 72) / 100) * 100;
    return `~฿${monthlyThb.toLocaleString()} /เดือน`;
  }
  const monthlyUsd = baseMonthlyUsd || Math.round(basePriceUsd / 72);
  return `~$${monthlyUsd.toLocaleString()} /mo`;
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateRange(startDate?: string, endDate?: string): string {
  if (!startDate || !endDate) return "Sep 16 - Sep 19";
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const startMonth = start.toLocaleString("default", { month: "short" });
  const startDay = start.getDate();
  const endMonth = end.toLocaleString("default", { month: "short" });
  const endDay = end.getDate();

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} - ${endDay}`;
  }
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
}
