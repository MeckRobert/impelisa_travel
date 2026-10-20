export function formatMoney(n: number | string | null | undefined) {
  const value = typeof n === "string" ? parseFloat(n) : n ?? 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatDate(d: string | Date | null | undefined) {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return "—";
  return date.toISOString().slice(0, 10);
}

export function parseBudgetAmount(budget: string | null | undefined): number {
  if (!budget) return 0;
  const nums = budget.replace(/,/g, "").match(/(\d+(\.\d+)?)/g);
  if (!nums?.length) return 0;
  return parseFloat(nums[0]);
}

export const DESTINATIONS = [
  "Serengeti National Park",
  "Ngorongoro Crater",
  "Zanzibar",
  "Mount Kilimanjaro",
  "Mikumi National Park",
  "Lake Manyara",
  "Ruaha National Park",
  "Tarangire National Park",
];
