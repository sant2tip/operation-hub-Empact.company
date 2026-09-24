// Derived financial calculations. Never store these — always compute from
// revenue/expenses/goals so the numbers can never drift out of sync.

export function profit(revenue: number, expenses: number): number {
  return revenue - expenses;
}

export function margin(revenue: number, expenses: number): number | null {
  if (revenue === 0) return null; // undefined when there's no revenue yet
  return profit(revenue, expenses) / revenue;
}

export function targetProgress(revenue: number, target: number): number | null {
  if (!target || target <= 0) return null; // no target set
  return revenue / target;
}

export function remainingToTarget(revenue: number, target: number): number {
  return Math.max(target - revenue, 0);
}

/**
 * Simple run-rate forecast: current pace projected across the full month.
 * Always surface this in the UI as an estimate, never as a committed figure.
 */
export function projectedRevenue(
  currentRevenue: number,
  elapsedDays: number,
  totalDaysInMonth: number
): number {
  if (elapsedDays <= 0) return 0;
  return (currentRevenue / elapsedDays) * totalDaysInMonth;
}

export function formatCurrency(amount: number, currency = "EUR", locale = "es-ES"): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export function formatPercent(ratio: number, locale = "es-ES"): string {
  return new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 1 }).format(ratio);
}
