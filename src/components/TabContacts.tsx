import { Phone, Loader, X, User, Users } from "lucide-react";

export function TabContacts({
  contact,
  contactLoading,
  contactError,
  onOpenContactPicker,
  webContact,
  webContactLoading,
  webContactError,
  onOpenWebContactPicker,
}: {
  contact: SdkDeviceContactResult | null;
  contactLoading: boolean;
  contactError: string | null;
  onOpenContactPicker: () => void;
  webContact: SdkDeviceContactResult | null;
  webContactLoading: boolean;
  webContactError: string | null;
  onOpenWebContactPicker: () => void;
}) {
  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-medium mb-4">
            <Phone size={14} />
            Contacts
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Contacts</h1>
          <p className="text-slate-400 text-sm mt-2">
            Pick a contact and preview it instantly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactCard
            title="WITH SDK"
            icon={<Users size={14} />}
            color="indigo"
            contact={contact}
            isLoading={contactLoading}
            error={contactError}
            onAction={onOpenContactPicker}
            actionLabel="Open Contact Picker"
            actionIcon={<Users size={16} />}
          />

          <ContactCard
            title="WITHOUT SDK"
            icon={<User size={14} />}
            color="teal"
            contact={webContact}
            isLoading={webContactLoading}
            error={webContactError}
            onAction={onOpenWebContactPicker}
            actionLabel="Pick Contact"
            actionIcon={<User size={16} />}
          />
        </div>
      </div>
    </div>
  );
}

function ContactCard({
  title,
  icon,
  color,
  contact,
  isLoading,
  error,
  onAction,
  actionLabel,
  actionIcon,
}: {
  title: string;
  icon: React.ReactNode;
  color: "indigo" | "teal";
  contact: SdkDeviceContactResult | null;
  isLoading: boolean;
  error: string | null;
  onAction: () => void;
  actionLabel: string;
  actionIcon: React.ReactNode;
}) {
  const badge = color === "indigo"
    ? "bg-indigo-50 border-indigo-100 text-indigo-600"
    : "bg-teal-50 border-teal-100 text-teal-600";

  const loaderColor = color === "indigo" ? "text-indigo-500" : "text-teal-500";

  const btnGradient = color === "indigo"
    ? "from-indigo-600 to-blue-600 shadow-indigo-600/25 hover:shadow-indigo-600/40"
    : "from-teal-600 to-cyan-600 shadow-teal-600/25 hover:shadow-teal-600/40";

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${badge}`}>
          {icon}
          {title}
        </div>
      </div>

      {isLoading && !contact ? (
        <div className="flex flex-col items-center py-6">
          <Loader size={24} className={`${loaderColor} animate-spin mb-3`} />
          <p className="text-slate-400 text-xs">Opening contact picker...</p>
        </div>
      ) : (
        <>
          {error && !contact && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 mb-4">
              <span className="text-rose-500 mt-0.5 shrink-0">
                <X size={14} />
              </span>
              <p className="text-rose-600 text-xs">{error}</p>
            </div>
          )}
          {contact && (
            <div className="space-y-4 mb-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  color === "indigo" ? "bg-indigo-100 text-indigo-600" : "bg-teal-100 text-teal-600"
                }`}>
                  <User size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {contact.contactName || "—"}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {contact.number || "—"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {!isLoading && (
        <button
          onClick={onAction}
          className={`w-full group bg-linear-to-r ${btnGradient} text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2`}
        >
          {actionIcon}
          {contact ? "Pick Another Contact" : actionLabel}
        </button>
      )}
    </div>
  );
}
