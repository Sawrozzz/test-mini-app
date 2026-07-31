import { Fingerprint, Loader, X, ShieldCheck, ShieldX } from "lucide-react";

export function TabBiometric({
  biometric,
  biometricLoading,
  biometricError,
  onAuthenticate,
  webBiometric,
  webBiometricLoading,
  webBiometricError,
  onAuthenticateWeb,
}: {
  biometric: SdkDeviceBiometricResult | null;
  biometricLoading: boolean;
  biometricError: string | null;
  onAuthenticate: () => void;
  webBiometric: SdkDeviceBiometricResult | null;
  webBiometricLoading: boolean;
  webBiometricError: string | null;
  onAuthenticateWeb: () => void;
}) {
  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-600 text-xs font-medium mb-4">
            <Fingerprint size={14} />
            Biometric
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Biometric Auth</h1>
          <p className="text-slate-400 text-sm mt-2">
            Authenticate with your fingerprint or face
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BiometricCard
            title="WITH SDK"
            icon={<Fingerprint size={14} />}
            color="emerald"
            biometric={biometric}
            isLoading={biometricLoading}
            error={biometricError}
            onAction={onAuthenticate}
            actionLabel="Authenticate with SDK"
            actionIcon={<Fingerprint size={16} />}
          />

          <BiometricCard
            title="WITHOUT SDK"
            icon={<ShieldCheck size={14} />}
            color="sky"
            biometric={webBiometric}
            isLoading={webBiometricLoading}
            error={webBiometricError}
            onAction={onAuthenticateWeb}
            actionLabel="Authenticate (WebAuthn)"
            actionIcon={<ShieldCheck size={16} />}
          />
        </div>
      </div>
    </div>
  );
}

function BiometricCard({
  title,
  icon,
  color,
  biometric,
  isLoading,
  error,
  onAction,
  actionLabel,
  actionIcon,
}: {
  title: string;
  icon: React.ReactNode;
  color: "emerald" | "sky";
  biometric: SdkDeviceBiometricResult | null;
  isLoading: boolean;
  error: string | null;
  onAction: () => void;
  actionLabel: string;
  actionIcon: React.ReactNode;
}) {
  const badge = color === "emerald"
    ? "bg-emerald-50 border-emerald-100 text-emerald-600"
    : "bg-sky-50 border-sky-100 text-sky-600";

  const loaderColor = color === "emerald" ? "text-emerald-500" : "text-sky-500";

  const btnGradient = color === "emerald"
    ? "from-emerald-600 to-teal-600 shadow-emerald-600/25 hover:shadow-emerald-600/40"
    : "from-sky-600 to-blue-600 shadow-sky-600/25 hover:shadow-sky-600/40";

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${badge}`}>
          {icon}
          {title}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center py-6">
          <Loader size={24} className={`${loaderColor} animate-spin mb-3`} />
          <p className="text-slate-400 text-xs">Authenticating...</p>
        </div>
      ) : (
        <>
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 mb-4">
              <span className="text-rose-500 mt-0.5 shrink-0">
                <X size={14} />
              </span>
              <p className="text-rose-600 text-xs">{error}</p>
            </div>
          )}
          {biometric && (
            <div className="space-y-4 mb-4">
              <div className={`rounded-2xl border p-6 flex flex-col items-center gap-3 ${
                biometric.success
                  ? "bg-emerald-50 border-emerald-100"
                  : "bg-rose-50 border-rose-100"
              }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  biometric.success
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-rose-100 text-rose-600"
                }`}>
                  {biometric.success ? (
                    <ShieldCheck size={32} />
                  ) : (
                    <ShieldX size={32} />
                  )}
                </div>
                <p className={`text-sm font-semibold ${
                  biometric.success ? "text-emerald-700" : "text-rose-700"
                }`}>
                  {biometric.success ? "Authentication successful" : "Authentication failed"}
                </p>
                {biometric.error && (
                  <p className="text-xs text-slate-500 text-center">
                    {biometric.error}
                  </p>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {!isLoading && (
        <button
          onClick={onAction}
          className={`w-full group bg-gradient-to-r ${btnGradient} text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2`}
        >
          {actionIcon}
          {actionLabel}
        </button>
      )}
    </div>
  );
}
