import { FileText } from "lucide-react";
import type { DriverLicense } from "../../types";
import { LicensePhoto } from "./LicensePhoto";
import { LicenseQuickDetails } from "./LicenseQuickDetails";
import { LicenseDetails } from "./LicenseDetails";
import { SignatureBlock } from "./SignatureBlock";

export function LicenseCard({
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
    <div>
      {loading && !license ? (
        <button
          disabled
          className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold shadow-sm opacity-50 cursor-not-allowed"
        >
          Loading License...
        </button>
      ) : (
        <>
          {error && !license && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 mb-4">
              <span className="text-rose-500 mt-0.5 shrink-0">
                <FileText size={14} />
              </span>
              <p className="text-rose-600 text-xs">{error}</p>
            </div>
          )}
          {license && (
            <div className="space-y-6 mb-4">
              <div className="relative bg-linear-to-br from-slate-50 to-slate-100/50 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                <LicensePhoto license={license} />
                <LicenseQuickDetails license={license} />
              </div>
              <LicenseDetails license={license} />
              <SignatureBlock license={license} />
            </div>
          )}
        </>
      )}

      {!loading && (
        <button
          onClick={onFetchLicense}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold shadow-sm transition"
        >
          {license ? "Refresh License" : "Show My Driving License"}
        </button>
      )}
    </div>
  );
}
