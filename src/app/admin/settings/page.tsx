"use client";

import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">Admin account and workspace preferences.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Administrator</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-slate-400">Name</dt>
              <dd className="font-medium">Admin Administrator</dd>
            </div>
            <div>
              <dt className="text-slate-400">Role</dt>
              <dd className="font-medium">Administrator</dd>
            </div>
            <div>
              <dt className="text-slate-400">Session</dt>
              <dd className="font-medium">Signed in with secure admin cookie</dd>
            </div>
          </dl>
          <button onClick={logout} className="mt-6 rounded-lg border px-4 py-2 text-sm">
            Logout
          </button>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Workspace</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-slate-400">Brand</dt>
              <dd className="font-medium">Impelisa Travel &amp; Tours Africa</dd>
            </div>
            <div>
              <dt className="text-slate-400">Currency</dt>
              <dd className="font-medium">USD</dd>
            </div>
            <div>
              <dt className="text-slate-400">Default country</dt>
              <dd className="font-medium">Tanzania</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
