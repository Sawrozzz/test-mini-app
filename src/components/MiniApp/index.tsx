import { useEffect, useState } from "react";
import { Menu, ChevronLeft } from "lucide-react";
import type {
  DriverLicense,
  Location,
  Camera,
  TabId,
  User,
  FileModule,
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

function TestMiniApp({ initialPath }: { initialPath?: string }) {
  const { sdk, user } = usePlatformSDK();
  const [activeTab, setActiveTab] = useState<TabId>(
    () =>
      (initialPath as TabId) ||
      (window.location.hash.slice(1) as TabId) ||
      "home",
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [loading, setLoading] = useState(false);
  const [navResult, setNavResult] = useState("");
  const [navLoading, setNavLoading] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [loadLocation, setLoadLocation] = useState(false);
  const [error, setError] = useState("");
  const [browserLocation, setBrowserLocation] = useState<Location | null>(null);
  const [browserError, setBrowserError] = useState<string | null>(null);
  const [loadBrowserLocation, setLoadBrowserLocation] = useState(false);
  const [cameraResponse, setCameraResponse] = useState<Camera | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [loadCamera, setLoadCamera] = useState(false);
  const [license, setLicense] = useState<DriverLicense | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loadUser, setLoadUser] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  const [gallery, setGallery] = useState<FileModule[] | null>(null);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [webImages, setWebImages] = useState<FileModule[] | null>(null);
  const [webImagesLoading, setWebImagesLoading] = useState(false);
  const [webImagesError, setWebImagesError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<FileModule[] | null>(null);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [documentsError, setDocumentsError] = useState<string | null>(null);
  const [webDocuments, setWebDocuments] = useState<FileModule[] | null>(null);
  const [webDocumentsLoading, setWebDocumentsLoading] = useState(false);
  const [webDocumentsError, setWebDocumentsError] = useState<string | null>(
    null,
  );
  const [browserCamera, setBrowserCamera] = useState<Camera | null>(null);
  const [browserCameraLoading, setBrowserCameraLoading] = useState(false);
  const [browserCameraError, setBrowserCameraError] = useState<string | null>(
    null,
  );

  const userName = user?.name ?? user?.fullName ?? "Guest";

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  const handleHttpGet = async () => {
    setLoading(true);
    try {
      // const res = await sdk.http.post({
      //   endpoint: "/api/driving-license",
      //   body: { method: "GET", path: "/v1/license" },
      //   headers: { "x-app-id": "mini-revenue-app" },
      // });

      const response = await sdk.api.request({
        endpoint: "/api/driving-license",
        // method: "POST",
        body: { method: "GET", path: "/v1/license" },
        headers: { "x-app-id": "mini-revenue-app" },
      });

      if (response.data) {
        setLicense(response.data.driverLicense);
      } else {
        setError(response.data.error);
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
  const handleViewSdkLocation = async () => {
    setLoadLocation(true);
    setError("");
    setLocation(null);
    try {
      const res = (await (sdk.device as any).location({
        reason: "To view your current location",
      })) as any;

      switch (res.status) {
        case "granted":
          setLocation(res.data.location);
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
    } catch (err: any) {
      setError(
        err instanceof Error ? err.message : "Failed to get location via SDK",
      );
    } finally {
      setLoadLocation(false);
    }
  };

  const handleViewBrowserLocation = () => {
    setLoadBrowserLocation(true);
    setBrowserError(null);
    setBrowserLocation(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setBrowserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date(position.timestamp).toISOString(),
          });
          setLoadBrowserLocation(false);
        },
        (err) => {
          setBrowserError(err.message);
          setLoadBrowserLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      );
    } else {
      setBrowserError("Geolocation is not supported by this browser.");
      setLoadBrowserLocation(false);
    }
  };

  const handleFetchUser = async () => {
    setLoadUser(true);
    setUserError(null);
    setUserData(null);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: User = await res.json();
      setUserData(data);
    } catch (err: any) {
      setUserError(err.message || "Failed to fetch user data");
    } finally {
      setLoadUser(false);
    }
  };

  const handleOpenCamera = async () => {
    setLoadCamera(true);
    setCameraResponse(null);
    setCameraError(null);
    try {
      const res = (await sdk.device.camera({
        reason: "To capture a photo for verification",
      })) as any;

      switch (res.status) {
        case "granted":
          setCameraResponse(res.data!);
          break;
        case "denied":
          setCameraError("Camera permission denied.");
          break;
        case "parmanentlyDenied":
          setCameraError(
            "Please enable camera permission from device settings.",
          );
          break;
        case "restricted":
          setCameraError("Camera access is restricted on this device.");
          break;
      }
    } catch (error) {
      setCameraError(
        error instanceof Error ? error.message : "Failed to open camera.",
      );
    } finally {
      setLoadCamera(false);
    }
  };

  const handleOpenBrowserCamera = () => {
    setBrowserCameraLoading(true);
    setBrowserCameraError(null);
    setBrowserCamera(null);

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    let cancelled = true;

    const finish = (err?: string) => {
      if (err) setBrowserCameraError(err);
      setBrowserCameraLoading(false);
      window.removeEventListener("focus", onWindowFocus);
    };

    const onWindowFocus = () => {
      setTimeout(() => {
        if (cancelled) finish("Camera capture cancelled.");
      }, 300);
    };

    window.addEventListener("focus", onWindowFocus);

    input.onchange = () => {
      cancelled = false;
      window.removeEventListener("focus", onWindowFocus);

      if (!input.files || input.files.length === 0) {
        finish("No image captured.");
        return;
      }

      const file = input.files[0];
      const blobUrl = URL.createObjectURL(file);
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";

      setBrowserCamera({
        url: blobUrl,
        fileName: file.name || `capture-${Date.now()}.${ext}`,
        mimeType: file.type || "image/jpeg",
        byteSize: file.size,
      });
      finish();
    };

    input.click();
  };

  const handleImages = async () => {
    setGalleryLoading(true);
    setGalleryError(null);

    try {
      const res = await (sdk.device as any).gallery({
        reason: "To select images",
        multiple: true,
      });
      switch (res.status) {
        case "granted":
          setGallery(res.data!.images ?? res.data!);
          break;
        case "denied":
          setGalleryError("Image upload cancelled.");
          break;
        case "parmanentlyDenied":
          setGalleryError(
            "Please enable gallery permission from device settings.",
          );
          break;
        case "restricted":
          setGalleryError("Gallery access is restricted on this device.");
          break;
      }
    } catch (error) {
      setGalleryError(
        error instanceof Error ? error.message : "Failed to open gallery.",
      );
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleImageUploadByWebOnly = () => {
    setWebImagesLoading(true);
    setWebImagesError(null);

    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*";

    let cancelled = true;

    const finish = (err?: string) => {
      if (err) setWebImagesError(err);
      setWebImagesLoading(false);
      window.removeEventListener("focus", onWindowFocus);
    };

    const onWindowFocus = () => {
      setTimeout(() => {
        if (cancelled) finish("No files selected.");
      }, 300);
    };

    window.addEventListener("focus", onWindowFocus);

    input.onchange = () => {
      cancelled = false;
      window.removeEventListener("focus", onWindowFocus);

      if (!input.files || input.files.length === 0) {
        finish("No files selected.");
        return;
      }

      const files: FileModule[] = Array.from(input.files).map((file) => {
        const blobUrl = URL.createObjectURL(file);
        const ext = file.name.split(".").pop()?.toLowerCase() || "";
        return {
          url: blobUrl,
          previewUrl: blobUrl,
          fileName: file.name,
          mimeType: file.type || "image/jpeg",
          extension: ext,
          byteSize: file.size,
        };
      });

      setWebImages(files);
      finish();
    };

    input.click();
  };

  const handleFileUpload = async () => {
    setDocumentsLoading(true);
    setDocumentsError(null);

    try {
      const res = await (sdk.device as any).files({
        reason: "To select documents",
        multiple: true,
      });
      switch (res.status) {
        case "granted":
          setDocuments(res.data!.files ?? res.data!);
          break;
        case "denied":
          setDocumentsError("File access denied.");
          break;
        case "parmanentlyDenied":
          setDocumentsError("Please enable file access from device settings.");
          break;
        case "restricted":
          setDocumentsError("File access is restricted on this device.");
          break;
      }
    } catch (error) {
      setDocumentsError(
        error instanceof Error ? error.message : "Failed to open file picker.",
      );
    } finally {
      setDocumentsLoading(false);
    }
  };

  const handleFileUploadByWeb = () => {
    setWebDocumentsLoading(true);
    setWebDocumentsError(null);

    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;

    let cancelled = true;

    const finish = (err?: string) => {
      if (err) setWebDocumentsError(err);
      setWebDocumentsLoading(false);
      window.removeEventListener("focus", onWindowFocus);
    };

    const onWindowFocus = () => {
      setTimeout(() => {
        if (cancelled) finish("No files selected.");
      }, 300);
    };

    window.addEventListener("focus", onWindowFocus);

    input.onchange = () => {
      cancelled = false;
      window.removeEventListener("focus", onWindowFocus);

      if (!input.files || input.files.length === 0) {
        finish("No files selected.");
        return;
      }

      const files: FileModule[] = Array.from(input.files).map((file) => {
        const blobUrl = URL.createObjectURL(file);
        const ext = file.name.split(".").pop()?.toLowerCase() || "";
        return {
          url: blobUrl,
          previewUrl: file.type?.startsWith("image/") ? blobUrl : undefined,
          fileName: file.name,
          mimeType: file.type || "application/octet-stream",
          extension: ext,
          byteSize: file.size,
        };
      });

      setWebDocuments(files);
      finish();
    };

    input.click();
  };

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1) as TabId;
      if (hash && hash! != activeTab) setActiveTab(hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [activeTab]);

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 to-slate-100 relative">
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
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
              userData={userData}
              loadUser={loadUser}
              userError={userError}
              onFetchUser={handleFetchUser}
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
              sdkError={error}
              loadBrowserLocation={loadBrowserLocation}
              browserLocation={browserLocation}
              browserError={browserError}
              onViewSdkLocation={handleViewSdkLocation}
              onViewBrowserLocation={handleViewBrowserLocation}
            />
          )}
          {activeTab === "camera" && (
            <TabCamera
              loadCamera={loadCamera}
              cameraResponse={cameraResponse}
              cameraError={cameraError}
              onOpenCamera={handleOpenCamera}
              browserCamera={browserCamera}
              browserCameraLoading={browserCameraLoading}
              browserCameraError={browserCameraError}
              onOpenBrowserCamera={handleOpenBrowserCamera}
            />
          )}
          {activeTab === "gallery" && (
            <TabGallery
              gallery={gallery}
              galleryLoading={galleryLoading}
              galleryError={galleryError}
              onOpenGallery={handleImages}
              webImages={webImages}
              webImagesLoading={webImagesLoading}
              webImagesError={webImagesError}
              onUploadWebImages={handleImageUploadByWebOnly}
            />
          )}
          {activeTab === "files" && (
            <TabFiles
              documents={documents}
              documentsLoading={documentsLoading}
              documentsError={documentsError}
              onOpenFilePicker={handleFileUpload}
              webDocuments={webDocuments}
              webDocumentsLoading={webDocumentsLoading}
              webDocumentsError={webDocumentsError}
              onUploadWebFiles={handleFileUploadByWeb}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default TestMiniApp;
