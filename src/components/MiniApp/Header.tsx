import type { DriverLicense } from "../../types";
import { useAppearance } from "../../hooks/useAppearance";
import { useT } from "../../hooks/useT";

export function Header({
  userName,
  license,
}: {
  userName: string;
  license: DriverLicense | null;
}) {
  const { theme } = useAppearance();
  const { language, t } = useT();
  return (
    <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-slate-800 p-2.5 rounded-xl text-xl border border-slate-700">
          🪪
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-wide uppercase text-slate-400">
            {t("app.title")}
          </h1>
          <p className="text-xs text-slate-500">{t("app.greeting", { name: userName })}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300">
          {language}
        </span>
        <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300">
          {theme.mode}
        </span>
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
