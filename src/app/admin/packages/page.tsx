"use client";

import StatusBadge from "@/components/admin/StatusBadge";
import { formatMoney } from "@/lib/adminFormat";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

type Package = {
  id: number;
  name: string;
  duration_days: number;
  price_per_person: number;
  description: string;
  image_url: string;
  status: string;
};

export default function PackagesPage() {
  const [items, setItems] = useState<Package[]>([]);
  const [modal, setModal] = useState<null | Partial<Package>>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/packages");
    const data = await res.json();
    setItems(data.packages ?? []);
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
      duration_days: Number(form.get("duration_days")),
      price_per_person: Number(form.get("price_per_person")),
      description: form.get("description"),
      image_url: form.get("image_url"),
      status: form.get("status"),
    };
    const url = modal?.id ? `/api/admin/packages/${modal.id}` : "/api/admin/packages";
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
    if (!confirm("Delete this package?")) return;
    await fetch(`/api/admin/packages/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Safari Packages</h1>
          <p className="text-sm text-slate-500">Manage your tour packages.</p>
        </div>
        <button onClick={() => setModal({})} className="rounded-lg bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-black">
          + Add Package
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white p-4 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-slate-400">
            <tr>
              <th className="pb-3">#</th>
              <th className="pb-3">Image</th>
              <th className="pb-3">Package Name</th>
              <th className="pb-3">Duration</th>
              <th className="pb-3">Price (per person)</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p, i) => (
              <tr key={p.id} className="border-t border-slate-100">
                <td className="py-3 text-slate-400">{i + 1}</td>
                <td className="py-3">
                  <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-slate-100">
                    {p.image_url && <Image src={p.image_url} alt={p.name} fill className="object-cover" />}
                  </div>
                </td>
                <td className="py-3 font-medium">{p.name}</td>
                <td className="py-3">{p.duration_days} Days</td>
                <td className="py-3">{formatMoney(p.price_per_person)}</td>
                <td className="py-3">
                  <StatusBadge status={p.status} />
                </td>
                <td className="py-3 space-x-3">
                  <button onClick={() => setModal(p)} className="text-[var(--gold-dark)] hover:underline">
                    Edit
                  </button>
                  <button onClick={() => remove(p.id)} className="text-rose-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!items.length && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No packages yet. Add one or run the admin schema SQL.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={save} className="w-full max-w-md space-y-3 rounded-2xl bg-white p-6">
            <h2 className="text-lg font-semibold">{modal.id ? "Edit Package" : "Add Package"}</h2>
            <input name="name" defaultValue={modal.name} required placeholder="Package name" className="w-full rounded-lg border px-3 py-2 text-sm" />
            <div className="grid grid-cols-2 gap-3">
              <input name="duration_days" type="number" defaultValue={modal.duration_days || 3} className="rounded-lg border px-3 py-2 text-sm" />
              <input name="price_per_person" type="number" defaultValue={modal.price_per_person || 0} className="rounded-lg border px-3 py-2 text-sm" />
            </div>
            <input name="image_url" defaultValue={modal.image_url || "/images/serengeti.jpg"} className="w-full rounded-lg border px-3 py-2 text-sm" />
            <textarea name="description" defaultValue={modal.description} className="w-full rounded-lg border px-3 py-2 text-sm" />
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
