import type { DriverLicense } from "../../types";

export function SignatureBlock({ license }: { license: DriverLicense }) {
  return (
    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Official Signature
        </p>
        <p className="text-xs text-slate-400 mt-0.5">Digitally Verified ID</p>
      </div>
      <img
        src={license.signatureUrl}
        alt="Signature"
        className="h-10 object-contain mix-blend-multiply opacity-80"
      />
    </div>
  );
}
