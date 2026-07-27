import { MapPin, Navigation, Crosshair, Compass, Loader } from "lucide-react";
import type { Location, PermissionStatus } from "../types";

export function TabLocation({
  loadLocation,
  location,
  error,
  locationPermission,
  onViewLocation,
}: {
  loadLocation: boolean;
  location: Location | null;
  error: string;
  locationPermission: PermissionStatus | null;
  onViewLocation: () => void;
}) {
  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14 flex items-center justify-center">
      <div className="max-w-lg w-full">
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

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 md:p-10">
          {loadLocation ? (
            <div className="flex flex-col items-center py-8">
              <Loader size={32} className="text-emerald-500 animate-spin mb-4" />
              <p className="text-slate-500 text-sm">Fetching location...</p>
            </div>
          ) : location ? (
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4">
                  <MapPin size={40} className="text-white" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">
                  Location Found
                </h2>
                <p className="text-emerald-600 text-sm font-medium mt-1">
                  {locationPermission === "granted" && "Permission Granted"}
                </p>
              </div>

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
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="relative mb-8">
                <div className="w-36 h-36 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-3xl -rotate-6 shadow-xl shadow-emerald-500/20 flex items-center justify-center">
                  <Navigation size={56} className="text-white/90" />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <Crosshair size={20} className="text-emerald-500" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-800 mb-2">
                View Your Location
              </h2>
              <p className="text-slate-400 text-sm text-center mb-8 max-w-xs">
                Tap the button below to retrieve your current geographic
                location.
              </p>

              <button
                onClick={onViewLocation}
                disabled={loadLocation}
                className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                <MapPin size={16} />
                View My Location
              </button>
            </div>
          )}

          {error && locationPermission !== "granted" && !loadLocation && (
            <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3">
              <span className="text-rose-500 mt-0.5 shrink-0">
                <MapPin size={16} />
              </span>
              <p className="text-rose-600 text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
