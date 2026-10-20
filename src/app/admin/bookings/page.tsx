"use client";

import StatusBadge from "@/components/admin/StatusBadge";
import { DESTINATIONS, formatDate, formatMoney } from "@/lib/adminFormat";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";

type Booking = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  destination: string;
  start_date: string;
  end_date: string;
  status: string;
  amount: number;
  num_travellers: string;
  budget: string;
};

const PAGE_SIZE = 8;

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [destination, setDestination] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (destination) params.set("destination", destination);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    const res = await fetch(`/api/admin/bookings?${params.toString()}`);
    const data = await res.json();
    setBookings(data.bookings ?? []);
    setPage(1);
  }

  useEffect(() => {
    load().catch(() => setError("Failed to load bookings"));
  }, []);

  const pages = Math.max(1, Math.ceil(bookings.length / PAGE_SIZE));
  const rows = useMemo(
    () => bookings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [bookings, page]
  );

  async function createBooking(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: form.get("fullName"),
        email: form.get("email"),
        phone: form.get("phone"),
        destination: form.get("destination"),
        startDate: form.get("startDate"),
        endDate: form.get("endDate"),
        numTravellers: form.get("numTravellers"),
        budget: form.get("budget"),
        status: form.get("status"),
        amount: Number(form.get("amount") || 0),
      }),
    });
    setSaving(false);
    if (res.ok) {
      setModal(false);
      await load();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bookings</h1>
          <p className="text-sm text-slate-500">Manage all trip requests from your customers.</p>
        </div>
        <button
          onClick={() => setModal(true)}
          className="rounded-lg bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-black"
        >
          + New Booking
        </button>
      </div>

      <div className="flex flex-wrap gap-3 rounded-2xl bg-white p-4 shadow-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search bookings..."
          className="min-w-[180px] flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select value={destination} onChange={(e) => setDestination(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
          <option value="">All Destinations</option>
          {DESTINATIONS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        <button onClick={load} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Filter
        </button>
      </div>

      {error && <p className="text-sm text-rose-600">{error}</p>}

      <div className="overflow-x-auto rounded-2xl bg-white p-4 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-slate-400">
            <tr>
              <th className="pb-3">#</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Destination</th>
              <th className="pb-3">Travel Date</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((b, i) => (
              <tr key={b.id} className="border-t border-slate-100">
                <td className="py-3 text-slate-400">{(page - 1) * PAGE_SIZE + i + 1}</td>
                <td className="py-3 font-medium">{b.full_name || "—"}</td>
                <td className="py-3">{b.destination}</td>
                <td className="py-3">{formatDate(b.start_date)}</td>
                <td className="py-3">
                  <StatusBadge status={b.status} />
                </td>
                <td className="py-3">{formatMoney(b.amount)}</td>
                <td className="py-3">
                  <Link href={`/admin/bookings/${b.id}`} className="text-[var(--gold-dark)] hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span>
            Showing {rows.length ? (page - 1) * PAGE_SIZE + 1 : 0}-{Math.min(page * PAGE_SIZE, bookings.length)} of {bookings.length} bookings
          </span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="rounded border px-2 py-1 disabled:opacity-40">
              Prev
            </button>
            <button disabled={page === pages} onClick={() => setPage((p) => p + 1)} className="rounded border px-2 py-1 disabled:opacity-40">
              Next
            </button>
          </div>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={createBooking} className="w-full max-w-lg space-y-3 rounded-2xl bg-white p-6">
            <h2 className="text-lg font-semibold">New Booking</h2>
            <input name="fullName" required placeholder="Customer name" className="w-full rounded-lg border px-3 py-2 text-sm" />
            <div className="grid grid-cols-2 gap-3">
              <input name="email" type="email" required placeholder="Email" className="rounded-lg border px-3 py-2 text-sm" />
              <input name="phone" required placeholder="Phone" className="rounded-lg border px-3 py-2 text-sm" />
            </div>
            <select name="destination" required className="w-full rounded-lg border px-3 py-2 text-sm">
              {DESTINATIONS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-3">
              <input name="startDate" type="date" className="rounded-lg border px-3 py-2 text-sm" />
              <input name="endDate" type="date" className="rounded-lg border px-3 py-2 text-sm" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <input name="numTravellers" placeholder="Travellers" className="rounded-lg border px-3 py-2 text-sm" />
              <input name="amount" type="number" placeholder="Amount" className="rounded-lg border px-3 py-2 text-sm" />
              <select name="status" className="rounded-lg border px-3 py-2 text-sm">
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
              </select>
            </div>
            <input name="budget" placeholder="Budget notes" className="w-full rounded-lg border px-3 py-2 text-sm" />
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setModal(false)} className="rounded-lg border px-4 py-2 text-sm">
                Cancel
              </button>
              <button disabled={saving} className="rounded-lg bg-[var(--gold)] px-4 py-2 text-sm font-semibold">
                {saving ? "Saving..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
