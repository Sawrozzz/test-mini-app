import type { DriverLicense } from "../../types";

export function LicenseQuickDetails({ license }: { license: DriverLicense }) {
  return (
    <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-2 text-xs w-full">
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400">Class</p>
        <p className="font-semibold text-slate-700">{license.licenseClass}</p>
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400">Expires</p>
        <p className="font-semibold text-rose-600">{license.expiryDate}</p>
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400">DOB</p>
        <p className="font-semibold text-slate-700">{license.dateOfBirth}</p>
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400">Blood</p>
        <p className="font-semibold text-slate-700">{license.bloodGroup}</p>
      </div>
      <div className="col-span-2 pt-2 border-t border-slate-200/60 mt-1">
        <p className="text-[10px] uppercase font-bold text-slate-400">
          Categories
        </p>
        <p className="font-medium text-slate-600">
          {license.vehicleCategories.join(", ")}
        </p>
      </div>
    </div>
  );
}
