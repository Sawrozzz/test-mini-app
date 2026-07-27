import { LicenseCard } from "./MiniApp/LicenseCard";
import type { DriverLicense } from "../types";
import { FileText, ShieldCheck } from "lucide-react";

export function TabTestApi({
  license,
  loading,
  error,
  onFetchLicense,
}: {
  license: DriverLicense | null;
  loading: boolean;
  error: string;
  onFetchLicense: () => void;
}) {
  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-medium mb-4">
            <ShieldCheck size={14} />
            API Integration
          </div>
          <h1 className="text-3xl font-bold text-slate-800">
            Driving License API
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Fetch & view your driving license details
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <LicenseCard
            license={license}
            loading={loading}
            error={error}
            onFetchLicense={onFetchLicense}
          />
        </div>

        {error && (
          <div className="mt-4 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3">
            <span className="text-rose-500 mt-0.5 shrink-0">
              <FileText size={16} />
            </span>
            <p className="text-rose-600 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
