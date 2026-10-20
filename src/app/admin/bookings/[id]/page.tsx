"use client";

import StatusBadge from "@/components/admin/StatusBadge";
import { formatDate, formatMoney } from "@/lib/adminFormat";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Booking = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  destination: string;
  start_date: string;
  end_date: string;
  num_travellers: string;
  budget: string;
  status: string;
  amount: number;
  notes: string;
  created_at: string;
};

export default function BookingDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [tab, setTab] = useState<"trip" | "customer" | "itinerary" | "notes">("trip");
  const [status, setStatus] = useState("pending");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/bookings/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.booking) {
          setBooking(data.booking);
          setStatus(data.booking.status || "pending");
          setAmount(String(data.booking.amount ?? 0));
          setNotes(data.booking.notes || "");
        }
      });
  }, [id]);

  async function save(extra: Partial<{ status: string; amount: number; notes: string }> = {}) {
    setSaving(true);
    const res = await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: extra.status ?? status,
        amount: extra.amount ?? Number(amount),
        notes: extra.notes ?? notes,
      }),
    });
    const data = await res.json();
    setSaving(false);
    if (data.booking) setBooking(data.booking);
  }

  async function remove() {
    if (!confirm("Delete this booking?")) return;
    await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
    router.push("/admin/bookings");
  }

  if (!booking) return <p className="text-sm text-slate-500">Loading booking...</p>;

  const wa = booking.phone?.replace(/[^\d]/g, "");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin/bookings" className="text-sm text-slate-500 hover:text-slate-800">
            ← Back to Bookings
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Booking Details</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="rounded-lg border px-4 py-2 text-sm">
            Print
          </button>
          <button
            onClick={() => save({ status: "confirmed" })}
            className="rounded-lg bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-black"
          >
            Confirm
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">{booking.full_name || "Guest"}</h2>
                <p className="text-sm text-slate-500">{booking.email}</p>
              </div>
              <StatusBadge status={booking.status} />
            </div>
            <div className="mt-4 flex gap-2 border-b border-slate-100 pb-2 text-sm">
              {(["trip", "customer", "itinerary", "notes"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-md px-3 py-1.5 capitalize ${tab === t ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"}`}
                >
                  {t === "trip" ? "Trip Details" : t === "customer" ? "Customer Information" : t}
                </button>
              ))}
            </div>
            <div className="mt-4 text-sm">
              {tab === "trip" && (
                <dl className="grid grid-cols-2 gap-4">
                  <Info label="Destination" value={booking.destination} />
                  <Info label="Package" value={booking.destination} />
                  <Info label="Start Date" value={formatDate(booking.start_date)} />
                  <Info label="End Date" value={formatDate(booking.end_date)} />
                  <Info label="Special Requests" value={booking.notes || "Window seat, vegetarian meals"} />
                  <Info label="Travellers" value={booking.num_travellers || "—"} />
                  <Info label="Budget" value={booking.budget || "—"} />
                  <Info label="Amount" value={formatMoney(booking.amount)} />
                </dl>
              )}
              {tab === "customer" && (
                <dl className="grid grid-cols-2 gap-4">
                  <Info label="Name" value={booking.full_name} />
                  <Info label="Email" value={booking.email} />
                  <Info label="Phone" value={booking.phone} />
                  <Info label="Created" value={formatDate(booking.created_at)} />
                </dl>
              )}
              {tab === "itinerary" && (
                <ol className="space-y-3">
                  <li className="rounded-lg bg-slate-50 p-3">Day 1 — Arrival and briefing at {booking.destination}</li>
                  <li className="rounded-lg bg-slate-50 p-3">Day 2 — Game drives / guided activity</li>
                  <li className="rounded-lg bg-slate-50 p-3">Final day — Departure</li>
                </ol>
              )}
              {tab === "notes" && (
                <div className="space-y-3">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={5}
                    className="w-full rounded-lg border px-3 py-2"
                    placeholder="Internal notes"
                  />
                  <button onClick={() => save({ notes })} className="rounded-lg bg-slate-900 px-4 py-2 text-white">
                    Save notes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="mb-3 font-semibold">Quick Actions</h3>
            <div className="space-y-2 text-sm">
              <a href={`tel:${booking.phone}`} className="block rounded-lg border px-3 py-2 hover:bg-slate-50">
                Call Customer
              </a>
              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border px-3 py-2 hover:bg-slate-50"
              >
                WhatsApp Message
              </a>
              <a href={`mailto:${booking.email}`} className="block rounded-lg border px-3 py-2 hover:bg-slate-50">
                Send Email
              </a>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm space-y-3">
            <h3 className="font-semibold">Update Status</h3>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm">
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              className="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Amount"
            />
            <button
              disabled={saving}
              onClick={() => save()}
              className="w-full rounded-lg bg-[var(--gold)] py-2 text-sm font-semibold text-black"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
            <button onClick={remove} className="w-full rounded-lg border border-rose-200 py-2 text-sm text-rose-600">
              Delete booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-1 font-medium text-slate-800">{value || "—"}</dd>
    </div>
  );
}
