import { LicenseCard } from "./MiniApp/LicenseCard";
import type { DriverLicense, User } from "../types";
import { FileText, ShieldCheck, Globe, Loader, MapPin, Building, Phone, Mail, User as UserIcon, Link2 } from "lucide-react";

export function TabTestApi({
  license,
  loading,
  error,
  onFetchLicense,
  userData,
  loadUser,
  userError,
  onFetchUser,
}: {
  license: DriverLicense | null;
  loading: boolean;
  error: string;
  onFetchLicense: () => void;
  userData: User | null;
  loadUser: boolean;
  userError: string | null;
  onFetchUser: () => void;
}) {
  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-medium mb-4">
            <ShieldCheck size={14} />
            API Integration
          </div>
          <h1 className="text-3xl font-bold text-slate-800">
            Data Fetch
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Fetch data via SDK or public API
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-medium mb-6">
                <ShieldCheck size={14} />
                WITH SDK
              </div>
              <LicenseCard
                license={license}
                loading={loading}
                error={error}
                onFetchLicense={onFetchLicense}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-50 border border-cyan-100 rounded-full text-cyan-600 text-xs font-medium mb-6">
              <Globe size={14} />
              WITHOUT SDK
            </div>

            {loadUser && !userData ? (
              <div className="flex flex-col items-center py-6">
                <Loader size={24} className="text-cyan-500 animate-spin mb-3" />
                <p className="text-slate-400 text-xs">Fetching user data...</p>
              </div>
            ) : userError && !userData ? (
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3">
                <span className="text-rose-500 mt-0.5 shrink-0">
                  <FileText size={14} />
                </span>
                <p className="text-rose-600 text-xs">{userError}</p>
              </div>
            ) : userData ? (
              <UserDataGrid user={userData} />
            ) : null}

            {!userData && !loadUser && !userError && (
              <button
                onClick={onFetchUser}
                className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-cyan-600/25 hover:shadow-cyan-600/40 transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2"
              >
                <Globe size={16} />
                Fetch User
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function UserDataGrid({ user }: { user: User }) {
  return (
    <div className="space-y-3">
      <div className="relative bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-5 border border-cyan-200 flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <UserIcon size={32} className="text-white" />
        </div>
        <div>
          <p className="text-lg font-bold text-slate-800">{user.name}</p>
          <p className="text-cyan-600 text-sm font-medium">@{user.username}</p>
        </div>
      </div>

      <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
        <div className="grid grid-cols-2 gap-x-4">
          <DetailItem icon={<Mail size={12} />} label="Email" value={user.email} />
          <DetailItem icon={<Phone size={12} />} label="Phone" value={user.phone} />
        </div>
        <DetailItem
          icon={<Link2 size={12} />}
          label="Website"
          value={user.website}
        />
        <DetailItem
          icon={<MapPin size={12} />}
          label="Address"
          value={`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
        />
        <DetailItem
          icon={<Building size={12} />}
          label="Company"
          value={`${user.company.name} — ${user.company.catchPhrase}`}
        />
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="py-2.5">
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
        {icon}
        {label}
      </p>
      <p className="font-medium text-slate-800 mt-0.5 text-sm">{value}</p>
    </div>
  );
}
