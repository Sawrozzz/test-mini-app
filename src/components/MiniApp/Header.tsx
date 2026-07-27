import type { DriverLicense } from "../../types";

export function Header({
  userName,
  license,
}: {
  userName: string;
  license: DriverLicense | null;
}) {
  return (
    <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-slate-800 p-2.5 rounded-xl text-xl border border-slate-700">
          🪪
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-wide uppercase text-slate-400">
            Digital ID Wallet
          </h1>
          <p className="text-xs text-slate-500">Welcome, {userName}</p>
        </div>
      </div>
      {license && (
        <span
          className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
            license.status === "Active"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
          }`}
        >
          ● {license.status}
        </span>
      )}
    </div>
  );
}
