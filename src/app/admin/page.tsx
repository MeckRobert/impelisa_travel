"use client";

import StatusBadge from "@/components/admin/StatusBadge";
import { formatDate, formatMoney } from "@/lib/adminFormat";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Stats = {
  totalBookings: number;
  totalCustomers: number;
  activeTours: number;
  totalRevenue: number;
  bookingChange: number;
  recentBookings: Array<{
    id: number;
    full_name: string;
    destination: string;
    start_date: string;
    status: string;
    amount: number;
  }>;
  monthlyData: Array<{ month: string; bookings: number }>;
  destinationBreakdown: Array<{ destination: string; count: number }>;
};

const COLORS = ["#C8972A", "#2F6B4F", "#3B82F6", "#F59E0B", "#8B5CF6", "#EF4444"];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setStats(data);
      })
      .catch(() => setError("Failed to load dashboard"));
  }, []);

  const maxMonth = Math.max(1, ...(stats?.monthlyData.map((m) => m.bookings) ?? [1]));
  const destTotal = stats?.destinationBreakdown.reduce((s, d) => s + d.count, 0) || 1;

  const donut = useMemo(() => {
    const rows = stats?.destinationBreakdown ?? [];
    let offset = 0;
    return rows.map((row, i) => {
      const pct = row.count / destTotal;
      const dash = pct * 100;
      const item = { ...row, dash, offset, color: COLORS[i % COLORS.length], pct };
      offset += dash;
      return item;
    });
  }, [stats, destTotal]);

  if (!stats && !error) {
    return <p className="text-sm text-slate-500">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">Welcome back. Here&apos;s what&apos;s happening with your tours.</p>
        </div>
        <p className="text-sm text-slate-500">
          {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {error && <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Bookings" value={String(stats?.totalBookings ?? 0)} delta={stats?.bookingChange} />
        <StatCard label="Total Customers" value={String(stats?.totalCustomers ?? 0)} />
        <StatCard label="Active Tours" value={String(stats?.activeTours ?? 0)} />
        <StatCard label="Revenue" value={formatMoney(stats?.totalRevenue ?? 0)} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Bookings Overview</h2>
            <span className="text-xs text-slate-400">Last 6 months</span>
          </div>
          <div className="flex h-48 items-end gap-3">
            {(stats?.monthlyData.length ? stats.monthlyData : [{ month: "—", bookings: 0 }]).map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-40 w-full items-end rounded-md bg-slate-50">
                  <div
                    className="w-full rounded-md bg-[var(--gold)]/80"
                    style={{ height: `${Math.max(8, (m.bookings / maxMonth) * 100)}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-slate-900">Bookings by Destination</h2>
          <div className="flex items-center gap-6">
            <svg viewBox="0 0 36 36" className="h-32 w-32 -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#eef2f7" strokeWidth="4" />
              {donut.map((d) => (
                <circle
                  key={d.destination}
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke={d.color}
                  strokeWidth="4"
                  strokeDasharray={`${d.dash} ${100 - d.dash}`}
                  strokeDashoffset={-d.offset}
                />
              ))}
            </svg>
            <ul className="space-y-2 text-xs">
              {donut.map((d) => (
                <li key={d.destination} className="flex items-center gap-2 text-slate-600">
                  <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                  {d.destination} ({Math.round(d.pct * 100)}%)
                </li>
              ))}
              {!donut.length && <li className="text-slate-400">No booking data yet</li>}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-sm font-medium text-[var(--gold-dark)] hover:underline">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-400">
                <tr>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Destination</th>
                  <th className="pb-3 font-medium">Travel Date</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(stats?.recentBookings ?? []).map((b) => (
                  <tr key={b.id} className="border-t border-slate-100">
                    <td className="py-3 font-medium text-slate-800">{b.full_name || "—"}</td>
                    <td className="py-3">{b.destination}</td>
                    <td className="py-3">{formatDate(b.start_date)}</td>
                    <td className="py-3">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="py-3">
                      <Link href={`/admin/bookings/${b.id}`} className="text-[var(--gold-dark)] hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
                {!stats?.recentBookings?.length && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-400">
                      No bookings yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-slate-900">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/bookings" className="block rounded-xl bg-[var(--gold)] px-4 py-3 text-center text-sm font-semibold text-black">
              + New Booking
            </Link>
            <Link href="/admin/packages" className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-medium hover:bg-slate-50">
              Manage Tour Packages
            </Link>
            <Link href="/admin/reports" className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-medium hover:bg-slate-50">
              View Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, delta }: { label: string; value: string; delta?: number }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      {typeof delta === "number" && Number.isFinite(delta) && (
        <p className={`mt-1 text-xs ${delta >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
          {delta >= 0 ? "+" : ""}
          {delta.toFixed(1)}% vs last month
        </p>
      )}
    </div>
  );
}
