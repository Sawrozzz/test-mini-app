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
    <div className="p-6">
      {!license ? (
        <button
          onClick={onFetchLicense}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition shadow-sm"
        >
          {loading ? "Loading License..." : "Show My Driving License"}
        </button>
      ) : (
        <div className="space-y-6">
          <div className="relative bg-linear-to-br from-slate-50 to-slate-100/50 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row gap-5 items-center sm:items-start">
            <LicensePhoto license={license} />
            <LicenseQuickDetails license={license} />
          </div>

          <LicenseDetails license={license} />
          <SignatureBlock license={license} />
        </div>
      )}

      {error && <div className="border">{error}</div>}
    </div>
  );
}
