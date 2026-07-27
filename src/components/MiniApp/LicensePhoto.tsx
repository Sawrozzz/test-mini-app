import type { DriverLicense } from "../../types";

export function LicensePhoto({ license }: { license: DriverLicense }) {
  return (
    <div className="flex flex-col items-center text-center sm:text-left">
      <div className="w-28 h-36 bg-slate-200 rounded-xl overflow-hidden shadow-sm border-2 border-white ring-1 ring-slate-200">
        <img
          src={
            license.photoUrl ||
            "https://thumbs.dreamstime.com/b/man-feeling-suspicious-face-expression-emotion-hesitating-facial-studio-shot-white-isolated-background-copy-space-90927117.jpg"
          }
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="mt-3 font-bold text-slate-800 text-sm leading-tight">
        {license.firstName} {license.lastName}
      </p>
      <p className="text-[11px] text-slate-400 font-medium">
        {license.licenseNumber}
      </p>
    </div>
  );
}
