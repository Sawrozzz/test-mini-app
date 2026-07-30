import { Loader } from "../Loader";

export function LocationSection({
  loadLocation,
  location,
  error,
  locationPermission,
  onViewLocation,
}: {
  loadLocation: boolean;
  location: SdkDeviceLocationResult | null;
  error: string;
  locationPermission: SdkDevicePermissionStatus | null;
  onViewLocation: () => void;
}) {
  return (
    <>
      <button
        className="rounded border py-2 px-4 disabled:cursor-not-allowed disabled:opacity-50 mt-4"
        onClick={onViewLocation}
        disabled={loadLocation}
      >
        Your location
      </button>

      {loadLocation && (
        <div className="mt-2">
          <Loader />
        </div>
      )}

      {error && !loadLocation && locationPermission !== "granted" && (
        <div className="mt-2 text-sm text-rose-600">{error}</div>
      )}

      {!loadLocation && location && (
        <div className="mt-2 text-sm text-slate-600">
          Lat: {location.latitude}, Lng: {location.longitude}, Accuracy:{" "}
          {location.accuracy},
          Time: {location?.timestamp ? String(location.timestamp) : ""}
        </div>
      )}
    </>
  );
}
