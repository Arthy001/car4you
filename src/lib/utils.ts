import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
