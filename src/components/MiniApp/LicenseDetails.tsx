import type { DriverLicense } from "../../types";
import { Info } from "../Info";

export function LicenseDetails({ license }: { license: DriverLicense }) {
  return (
    <div className="divide-y divide-slate-100 border-t border-b border-slate-100 py-2">
      <div className="grid grid-cols-2 gap-x-4">
        <Info label="Gender" value={license.gender} />
        <Info label="Issue Date" value={license.issueDate} />
      </div>
      <Info
        label="Address"
        value={`${license.address.street}, ${license.address.city}, ${license.address.state}`}
      />
      <Info label="Issuing Authority" value={license.issuingAuthority} />
      <div className="grid grid-cols-2 gap-x-4">
        <Info label="Restrictions" value={license.restrictions || "None"} />
        <Info label="Organ Donor" value={license.isOrganDonor ? "❤️ Yes" : "No"} />
      </div>
    </div>
  );
}
