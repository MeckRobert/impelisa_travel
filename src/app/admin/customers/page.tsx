"use client";

import { formatDate } from "@/lib/adminFormat";
import Link from "next/link";
import { useEffect, useState } from "react";

type Customer = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  total_bookings: number;
  last_booking: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  async function load(q = search) {
    const params = q ? `?search=${encodeURIComponent(q)}` : "";
    const res = await fetch(`/api/admin/customers${params}`);
    const data = await res.json();
    setCustomers(data.customers ?? []);
  }

  useEffect(() => {
    load("");
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
          <p className="text-sm text-slate-500">Manage your customer database.</p>
        </div>
      </div>

      <div className="flex gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
        />
        <button onClick={() => load()} className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
          Search
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white p-4 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-slate-400">
            <tr>
              <th className="pb-3">#</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Phone</th>
              <th className="pb-3">Total Bookings</th>
              <th className="pb-3">Last Booking</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={c.email} className="border-t border-slate-100">
                <td className="py-3 text-slate-400">{i + 1}</td>
                <td className="py-3 font-medium">{c.full_name || "—"}</td>
                <td className="py-3">{c.email}</td>
                <td className="py-3">{c.phone || "—"}</td>
                <td className="py-3">{c.total_bookings}</td>
                <td className="py-3">{formatDate(c.last_booking)}</td>
                <td className="py-3">
                  <Link href={`/admin/bookings?search=${encodeURIComponent(c.email)}`} className="text-[var(--gold-dark)] hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {!customers.length && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No customers yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <p className="mt-4 text-sm text-slate-400">Showing {customers.length} customers</p>
      </div>
    </div>
  );
}
