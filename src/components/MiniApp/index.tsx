import { useState } from "react";
import { Menu, ChevronLeft } from "lucide-react";
import type {
  DriverLicense,
  Location,
  Camera,
  PermissionStatus,
  TabId,
} from "../../types";
import { usePlatformSDK } from "../../hooks/usePlatformSDK";
import { Sidebar } from "../Sidebar";
import { TabHome } from "../TabHome";
import { TabTestApi } from "../TabTestApi";
import { TabChat } from "../TabChat";
import { TabLocation } from "../TabLocation";
import { TabCamera } from "../TabCamera";
import { TabGallery } from "../TabGallery";
import { TabFiles } from "../TabFiles";

function MiniRevenueLicenseApp() {
  const { sdk, user } = usePlatformSDK();
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 to-slate-100 relative">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userName={userName}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
      />

      <main className="flex-1 overflow-y-auto min-w-0">
        <div className="sticky top-0 z-30 h-0">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="hidden md:flex absolute top-3 w-8 h-8 rounded-xl items-center justify-center transition-all duration-300 shadow-lg bg-white/90 backdrop-blur-sm border border-slate-200/80 text-slate-500 hover:text-slate-700 hover:bg-white hover:shadow-xl active:scale-95"
            style={{
              left: sidebarOpen ? "calc(2rem - 16px)" : "12px",
            }}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <ChevronLeft
              size={15}
              className={`transition-transform duration-300 ${sidebarOpen ? "" : "rotate-180"}`}
            />
          </button>

          <button
            onClick={() => setSidebarOpen(true)}
            className={`md:hidden absolute top-3 left-3 w-9 h-9 rounded-xl items-center justify-center shadow-lg bg-white/90 backdrop-blur-sm border border-slate-200/80 text-slate-500 hover:text-slate-700 hover:bg-white transition-all duration-200 ${sidebarOpen ? "hidden" : "flex"}`}
            title="Open sidebar"
          >
            <Menu size={18} />
          </button>
        </div>

        <div className="pt-2">
          {activeTab === "home" && <TabHome onNavigate={setActiveTab} />}
          {activeTab === "test-api" && (
            <TabTestApi
              license={license}
              loading={loading}
              error={error}
              onFetchLicense={handleHttpGet}
            />
          )}
          {activeTab === "chat" && (
            <TabChat
              navLoading={navLoading}
              navResult={navResult}
              onNavigate={handleNavigate}
            />
          )}
          {activeTab === "location" && (
            <TabLocation
              loadLocation={loadLocation}
              location={location}
              error={error}
              locationPermission={locationPermission}
              onViewLocation={handleViewLocation}
            />
          )}
          {activeTab === "camera" && (
            <TabCamera
              loadCamera={loadCamera}
              cameraResponse={cameraResponse}
              cameraError={cameraError}
              cameraPermission={cameraPermission}
              onOpenCamera={handleOpenCamera}
            />
          )}
          {activeTab === "gallery" && <TabGallery />}
          {activeTab === "files" && <TabFiles />}
        </div>
      </main>
    </div>
  );
}

export default MiniRevenueLicenseApp;
