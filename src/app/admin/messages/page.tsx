"use client";

import StatusBadge from "@/components/admin/StatusBadge";
import { formatDate } from "@/lib/adminFormat";
import Link from "next/link";
import { useEffect, useState } from "react";

type Message = {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  body: string;
  status: string;
  created_at: string;
  bookingId: number;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then((data) => setMessages(data.messages ?? []));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
        <p className="text-sm text-slate-500">Trip enquiries from the public booking form.</p>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white p-4 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-slate-400">
            <tr>
              <th className="pb-3">From</th>
              <th className="pb-3">Subject</th>
              <th className="pb-3">Preview</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.id} className="border-t border-slate-100">
                <td className="py-3">
                  <div className="font-medium">{m.name || "Guest"}</div>
                  <div className="text-xs text-slate-400">{m.email}</div>
                </td>
                <td className="py-3">{m.subject}</td>
                <td className="py-3 max-w-xs truncate text-slate-500">{m.body}</td>
                <td className="py-3">
                  <StatusBadge status={m.status} />
                </td>
                <td className="py-3">{formatDate(m.created_at)}</td>
                <td className="py-3">
                  <Link href={`/admin/bookings/${m.bookingId}`} className="text-[var(--gold-dark)] hover:underline">
                    Open
                  </Link>
                </td>
              </tr>
            ))}
            {!messages.length && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  No messages yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
