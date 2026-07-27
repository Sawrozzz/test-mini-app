import { useState } from "react";
import type { DriverLicense, Location, Camera, PermissionStatus } from "../../types";
import { usePlatformSDK } from "../../hooks/usePlatformSDK";
import { Header } from "./Header";
import { LicenseCard } from "./LicenseCard";
import { ChatAction } from "./ChatAction";
import { LocationSection } from "./LocationSection";
import { CameraSection } from "./CameraSection";

function MiniRevenueLicenseApp() {
  const { sdk, user } = usePlatformSDK();

  const [loading, setLoading] = useState(false);
  const [navResult, setNavResult] = useState("");
  const [navLoading, setNavLoading] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [loadLocation, setLoadLocation] = useState(false);
  const [error, setError] = useState("");
  const [cameraResponse, setCameraResponse] = useState<Camera | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [loadCamera, setLoadCamera] = useState(false);
  const [locationPermission, setLocationPermission] =
    useState<PermissionStatus | null>(null);
  const [cameraPermission, setCameraPermission] =
    useState<PermissionStatus | null>(null);
  const [license, setLicense] = useState<DriverLicense | null>(null);

  const userName = user?.name ?? user?.fullName ?? "Guest";

  const handleHttpGet = async () => {
    setLoading(true);
    try {
      const res = await sdk.http.post({
        endpoint: "/api/driving-license",
        body: { method: "GET", path: "/v1/license" },
        headers: { "x-app-id": "mini-revenue-app" },
      });

      if (res.data.data) {
        setLicense(res.data.data.driverLicense);
      } else {
        setError(res.data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = async () => {
    setNavLoading(true);
    setNavResult("");
    try {
      const payload = {
        purpose: "Want to chat with AI",
        sourceApp: "mini-revenue-app",
        timestamp: Date.now().toString(),
      };
      await sdk.navigation.navigate({
        route: "/",
        app: "chat-mini-app",
        params: payload,
      });
      setNavResult("Payment workflow initialized!");
    } catch (err) {
      setNavResult(
        `Error: ${err instanceof Error ? err.message : String(err)}`,
      );
    } finally {
      setNavLoading(false);
    }
  };
  const handleViewLocation = async () => {
    setLoadLocation(true);
    setError("");
    try {
      const res = await sdk.device.location({
        reason: "To view your current location",
      });
      setLocationPermission(res.status);
      switch (res.status) {
        case "granted":
          setLocation(res.data!);
          break;

        case "denied":
          setError("Location permission denied.");
          break;

        case "parmanentlyDenied":
          setError("Please enable location permission from device settings.");
          break;

        case "restricted":
          setError("Location access is restricted on this device.");
          break;
      }
    } catch (error) {
      setError((error as any).message);
      setLocationPermission("denied");
    } finally {
      setLoadLocation(false);
    }
  };

  const handleOpenCamera = async () => {
    setLoadCamera(true);
    setCameraResponse(null);
    setCameraError(null);
    try {
      const res = await sdk.device.camera({
        reason: "To capture a photo for verification",
      });
      setCameraPermission(res.status);
      switch (res.status) {
        case "granted":
          setCameraResponse(res.data!);
          break;

        case "denied":
          setCameraError("Camera permission denied.");
          break;

        case "parmanentlyDenied":
          setCameraError("Please enable camera permission from device settings.");
          break;

        case "restricted":
          setCameraError("Camera access is restricted on this device.");
          break;
      }
    } catch (error) {
      setCameraError(
        error instanceof Error ? error.message : "Failed to open camera.",
      );
      setCameraPermission("denied");
    } finally {
      setLoadCamera(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 md:p-8 antialiased">
      <div className="max-w-xl w-full space-y-6">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/80 border border-slate-200/60 overflow-hidden transition-all">
          <Header userName={userName} license={license} />
          <LicenseCard
            license={license}
            loading={loading}
            error={error}
            onFetchLicense={handleHttpGet}
          />
        </div>

        <ChatAction
          navLoading={navLoading}
          navResult={navResult}
          onNavigate={handleNavigate}
        />
      </div>

      <LocationSection
        loadLocation={loadLocation}
        location={location}
        error={error}
        locationPermission={locationPermission}
        onViewLocation={handleViewLocation}
      />

      <CameraSection
        loadCamera={loadCamera}
        cameraResponse={cameraResponse}
        cameraError={cameraError}
        cameraPermission={cameraPermission}
        onOpenCamera={handleOpenCamera}
      />
    </div>
  );
}

export default MiniRevenueLicenseApp;
