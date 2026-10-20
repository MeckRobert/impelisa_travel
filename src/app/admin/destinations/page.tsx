"use client";

import StatusBadge from "@/components/admin/StatusBadge";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

type Destination = {
  id: number;
  name: string;
  country: string;
  description: string;
  image_url: string;
  status: string;
};

export default function DestinationsPage() {
  const [items, setItems] = useState<Destination[]>([]);
  const [modal, setModal] = useState<null | Partial<Destination>>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/destinations");
    const data = await res.json();
    setItems(data.destinations ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      country: form.get("country"),
      description: form.get("description"),
      image_url: form.get("image_url"),
      status: form.get("status"),
    };
    const url = modal?.id ? `/api/admin/destinations/${modal.id}` : "/api/admin/destinations";
    await fetch(url, {
      method: modal?.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    setModal(null);
    await load();
  }

  async function remove(id: number) {
    if (!confirm("Delete this destination?")) return;
    await fetch(`/api/admin/destinations/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Destinations</h1>
          <p className="text-sm text-slate-500">Manage your tour destinations.</p>
        </div>
        <button onClick={() => setModal({})} className="rounded-lg bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-black">
          + Add Destination
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white p-4 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-slate-400">
            <tr>
              <th className="pb-3">Image</th>
              <th className="pb-3">Destination</th>
              <th className="pb-3">Country</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr key={d.id} className="border-t border-slate-100">
                <td className="py-3">
                  <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-slate-100">
                    {d.image_url && (
                      <Image src={d.image_url} alt={d.name} fill className="object-cover" />
                    )}
                  </div>
                </td>
                <td className="py-3 font-medium">{d.name}</td>
                <td className="py-3">{d.country}</td>
                <td className="py-3">
                  <StatusBadge status={d.status} />
                </td>
                <td className="py-3 space-x-3">
                  <button onClick={() => setModal(d)} className="text-[var(--gold-dark)] hover:underline">
                    Edit
                  </button>
                  <button onClick={() => remove(d.id)} className="text-rose-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!items.length && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400">
                  No destinations yet. Add one or run the admin schema SQL.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={save} className="w-full max-w-md space-y-3 rounded-2xl bg-white p-6">
            <h2 className="text-lg font-semibold">{modal.id ? "Edit Destination" : "Add Destination"}</h2>
            <input name="name" defaultValue={modal.name} required placeholder="Name" className="w-full rounded-lg border px-3 py-2 text-sm" />
            <input name="country" defaultValue={modal.country || "Tanzania"} placeholder="Country" className="w-full rounded-lg border px-3 py-2 text-sm" />
            <input name="image_url" defaultValue={modal.image_url || "/images/serengeti.jpg"} placeholder="Image URL" className="w-full rounded-lg border px-3 py-2 text-sm" />
            <textarea name="description" defaultValue={modal.description} placeholder="Description" className="w-full rounded-lg border px-3 py-2 text-sm" />
            <select name="status" defaultValue={modal.status || "active"} className="w-full rounded-lg border px-3 py-2 text-sm">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setModal(null)} className="rounded-lg border px-4 py-2 text-sm">
                Cancel
              </button>
              <button disabled={saving} className="rounded-lg bg-[var(--gold)] px-4 py-2 text-sm font-semibold">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
