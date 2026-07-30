import { MapPin, Compass, Loader, Globe, Cpu } from "lucide-react";


export function TabLocation({
  loadLocation,
  location,
  sdkError,
  loadBrowserLocation,
  browserLocation,
  browserError,
  onViewSdkLocation,
  onViewBrowserLocation,
}: {
  loadLocation: boolean;
  location: SdkDeviceLocationResult | null;
  sdkError: string;
  loadBrowserLocation: boolean;
  browserLocation: SdkDeviceLocationResult | null;
  browserError: string | null;
  onViewSdkLocation: () => void;
  onViewBrowserLocation: () => void;
}) {
  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-600 text-xs font-medium mb-4">
            <Compass size={14} />
            Location Services
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Your Location</h1>
          <p className="text-slate-400 text-sm mt-2">
            View and manage your current location data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LocationCard
            title="WITH SDK"
            icon={<Cpu size={14} />}
            color="emerald"
            location={location}
            isLoading={loadLocation}
            error={sdkError}
            onView={onViewSdkLocation}
          />

          <LocationCard
            title="WITHOUT SDK"
            icon={<Globe size={14} />}
            color="indigo"
            location={browserLocation}
            isLoading={loadBrowserLocation}
            error={browserError || ""}
            onView={onViewBrowserLocation}
          />
        </div>
      </div>
    </div>
  );
}

function LocationCard({
  title,
  icon,
  color,
  location,
  isLoading,
  error,
  onView,
}: {
  title: string;
  icon: React.ReactNode;
  color: "emerald" | "indigo";
  location: SdkDeviceLocationResult | null;
  isLoading: boolean;
  error: string;
  onView: () => void;
}) {
  const badge = color === "emerald"
    ? "bg-emerald-50 border-emerald-100 text-emerald-600"
    : "bg-indigo-50 border-indigo-100 text-indigo-600";

  const loaderColor = color === "emerald" ? "text-emerald-500" : "text-indigo-500";

  const btnGradient = color === "emerald"
    ? "from-emerald-600 to-teal-600 shadow-emerald-600/25 hover:shadow-emerald-600/40"
    : "from-indigo-600 to-blue-600 shadow-indigo-600/25 hover:shadow-indigo-600/40";

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8">
      <div className="flex items-center gap-2 mb-6">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${badge}`}>
          {icon}
          {title}
        </div>
      </div>

      {isLoading && !location ? (
        <div className="flex flex-col items-center py-6">
          <Loader size={24} className={`${loaderColor} animate-spin mb-3`} />
          <p className="text-slate-400 text-xs">Fetching location...</p>
        </div>
      ) : (
        <>
          {error && !location && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 mb-4">
              <span className="text-rose-500 mt-0.5 shrink-0">
                <MapPin size={14} />
              </span>
              <p className="text-rose-600 text-xs">{error}</p>
            </div>
          )}
          {location && <LocationDataGrid location={location} />}
        </>
      )}

      {!isLoading && (
        <button
          onClick={onView}
          className={`w-full group bg-gradient-to-r ${btnGradient} text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2 mt-4`}
        >
          <MapPin size={16} />
          View Location
        </button>
      )}
    </div>
  );
}

function LocationDataGrid({ location }: { location: SdkDeviceLocationResult }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
          Latitude
        </p>
        <p className="text-slate-800 font-semibold text-sm font-mono">
          {location.latitude}
        </p>
      </div>
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
          Longitude
        </p>
        <p className="text-slate-800 font-semibold text-sm font-mono">
          {location.longitude}
        </p>
      </div>
      {location.accuracy !== undefined && (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
            Accuracy
          </p>
          <p className="text-slate-800 font-semibold text-sm font-mono">
            {location.accuracy}m
          </p>
        </div>
      )}
      {location.timestamp && (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
            Timestamp
          </p>
          <p className="text-slate-800 font-semibold text-sm font-mono truncate">
            {new Date(location.timestamp).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
