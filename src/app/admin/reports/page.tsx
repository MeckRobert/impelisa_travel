"use client";

import StatusBadge from "@/components/admin/StatusBadge";
import { formatDate, formatMoney } from "@/lib/adminFormat";
import { useState } from "react";

type Report = {
  bookings: Array<{
    id: number;
    full_name: string;
    destination: string;
    start_date: string;
    status: string;
    amount: number;
  }>;
  revenue: Array<{ month: string; revenue: number; bookings: number }>;
  destinations: Array<{ destination: string; bookings: number; revenue: number }>;
  totals: { bookings: number; revenue: number };
};

export default function ReportsPage() {
  const [tab, setTab] = useState<"booking" | "revenue" | "destination">("booking");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (status) params.set("status", status);
    const res = await fetch(`/api/admin/reports?${params.toString()}`);
    const data = await res.json();
    setReport(data);
    setLoading(false);
  }

  function exportCsv() {
    if (!report) return;
    const rows =
      tab === "booking"
        ? [["Customer", "Destination", "Travel Date", "Status", "Amount"], ...report.bookings.map((b) => [b.full_name, b.destination, formatDate(b.start_date), b.status, b.amount])]
        : tab === "revenue"
          ? [["Month", "Bookings", "Revenue"], ...report.revenue.map((r) => [r.month, r.bookings, r.revenue])]
          : [["Destination", "Bookings", "Revenue"], ...report.destinations.map((d) => [d.destination, d.bookings, d.revenue])];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tab}-report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
        <p className="text-sm text-slate-500">View, print and export your booking reports.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          ["booking", "Booking Report"],
          ["revenue", "Revenue Report"],
          ["destination", "Destination Report"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id as typeof tab)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${tab === id ? "bg-[var(--gold)] text-black" : "bg-white text-slate-600"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-end gap-3 rounded-2xl bg-white p-4 shadow-sm">
        <label className="text-sm">
          From
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1 block rounded-lg border px-3 py-2" />
        </label>
        <label className="text-sm">
          To
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="mt-1 block rounded-lg border px-3 py-2" />
        </label>
        <label className="text-sm">
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 block rounded-lg border px-3 py-2">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
        <button onClick={generate} className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
          {loading ? "Generating..." : "Generate Report"}
        </button>
        <button onClick={exportCsv} disabled={!report} className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40">
          Export CSV
        </button>
        <button onClick={() => window.print()} disabled={!report} className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40">
          Print
        </button>
      </div>

      <div className="print-report rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              {tab === "booking" ? "Booking Report" : tab === "revenue" ? "Revenue Report" : "Destination Report"}
            </h2>
            <p className="text-sm text-slate-500">
              {from || "All dates"} — {to || "Present"}
            </p>
          </div>
          <div className="text-right text-sm">
            <div className="font-bold text-[var(--gold)]">IMPELISA</div>
            <div className="text-slate-400">Travel &amp; Tours Africa</div>
          </div>
        </div>

        {!report && <p className="text-sm text-slate-400">Choose filters and generate a report.</p>}

        {report && tab === "booking" && (
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-400">
              <tr>
                <th className="pb-3">#</th>
                <th className="pb-3">Customer Name</th>
                <th className="pb-3">Destination</th>
                <th className="pb-3">Travel Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {report.bookings.map((b, i) => (
                <tr key={b.id} className="border-t">
                  <td className="py-2">{i + 1}</td>
                  <td className="py-2">{b.full_name}</td>
                  <td className="py-2">{b.destination}</td>
                  <td className="py-2">{formatDate(b.start_date)}</td>
                  <td className="py-2">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="py-2">{formatMoney(b.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {report && tab === "revenue" && (
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-400">
              <tr>
                <th className="pb-3">Month</th>
                <th className="pb-3">Bookings</th>
                <th className="pb-3">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {report.revenue.map((r) => (
                <tr key={r.month} className="border-t">
                  <td className="py-2">{r.month}</td>
                  <td className="py-2">{r.bookings}</td>
                  <td className="py-2">{formatMoney(r.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {report && tab === "destination" && (
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-400">
              <tr>
                <th className="pb-3">Destination</th>
                <th className="pb-3">Bookings</th>
                <th className="pb-3">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {report.destinations.map((d) => (
                <tr key={d.destination} className="border-t">
                  <td className="py-2">{d.destination}</td>
                  <td className="py-2">{d.bookings}</td>
                  <td className="py-2">{formatMoney(d.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {report && (
          <div className="mt-6 flex justify-end gap-8 border-t pt-4 text-sm font-semibold">
            <span>Total Bookings: {report.totals.bookings}</span>
            <span>Total Revenue: {formatMoney(report.totals.revenue)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
