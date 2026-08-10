import { ChevronLeft, Menu } from "lucide-react";
import { useCallback, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { useAppearance } from "../../hooks/useAppearance";
import { usePlatformSDK } from "../../hooks/usePlatformSDK";
import type { DriverLicense, SdkDeviceDownloadResult, User } from "../../types";
import { Sidebar } from "../Sidebar";
import { TabBiometric } from "../TabBiometric";
import { TabCamera } from "../TabCamera";
import { TabChat } from "../TabChat";
import { TabContacts } from "../TabContacts";
import { DownloadTab } from "../TabDownload";
import { TabFiles } from "../TabFiles";
import { TabGallery } from "../TabGallery";
import { TabHome } from "../TabHome";
import { TabLocation } from "../TabLocation";
import { TabTestApi } from "../TabTestApi";

function TestMiniApp() {
  const { sdk, user } = usePlatformSDK();
  const { theme } = useAppearance();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [loading, setLoading] = useState(false);
  const [navResult, setNavResult] = useState("");
  const [navLoading, setNavLoading] = useState(false);
  const [location, setLocation] = useState<SdkDeviceLocationResult | null>(
    null,
  );
  const [loadLocation, setLoadLocation] = useState(false);
  const [error, setError] = useState("");
  const [browserLocation, setBrowserLocation] =
    useState<SdkDeviceLocationResult | null>(null);
  const [browserError, setBrowserError] = useState<string | null>(null);
  const [loadBrowserLocation, setLoadBrowserLocation] = useState(false);
  const [cameraResponse, setCameraResponse] =
    useState<SdkDeviceCameraResult | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [loadCamera, setLoadCamera] = useState(false);
  const [license, setLicense] = useState<DriverLicense | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loadUser, setLoadUser] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  const [gallery, setGallery] = useState<SdkFileModule[] | null>(null);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [webImages, setWebImages] = useState<SdkFileModule[] | null>(null);
  const [webImagesLoading, setWebImagesLoading] = useState(false);
  const [webImagesError, setWebImagesError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<SdkFileModule[] | null>(null);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [documentsError, setDocumentsError] = useState<string | null>(null);
  const [webDocuments, setWebDocuments] = useState<SdkFileModule[] | null>(
    null,
  );
  const [webDocumentsLoading, setWebDocumentsLoading] = useState(false);
  const [webDocumentsError, setWebDocumentsError] = useState<string | null>(
    null,
  );
  const [browserCamera, setBrowserCamera] =
    useState<SdkDeviceCameraResult | null>(null);
  const [browserCameraLoading, setBrowserCameraLoading] = useState(false);
  const [browserCameraError, setBrowserCameraError] = useState<string | null>(
    null,
  );
  const [imageDownload, setImageDownload] =
    useState<SdkDeviceDownloadResult | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageDownloadWeb, setImageDownloadWeb] = useState<boolean>(false);
  const [imageLoadingWeb, setImageLoadingWeb] = useState(false);
  const [imageErrorWeb, setImageErrorWeb] = useState<string | null>(null);
  const [fileDownload, setFileDownload] =
    useState<SdkDeviceDownloadResult | null>(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileDownloadWeb, setFileDownloadWeb] = useState<boolean>(false);
  const [fileLoadingWeb, setFileLoadingWeb] = useState(false);
  const [fileErrorWeb, setFileErrorWeb] = useState<string | null>(null);
  const [contact, setContact] = useState<SdkDeviceContactResult | null>(null);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [webContact, setWebContact] = useState<SdkDeviceContactResult | null>(
    null,
  );
  const [webContactLoading, setWebContactLoading] = useState(false);
  const [webContactError, setWebContactError] = useState<string | null>(null);
  const [biometric, setBiometric] = useState<SdkDeviceBiometricResult | null>(
    null,
  );
  const [biometricLoading, setBiometricLoading] = useState(false);
  const [biometricError, setBiometricError] = useState<string | null>(null);
  const [webBiometric, setWebBiometric] =
    useState<SdkDeviceBiometricResult | null>(null);
  const [webBiometricLoading, setWebBiometricLoading] = useState(false);
  const [webBiometricError, setWebBiometricError] = useState<string | null>(
    null,
  );

  const userName = user?.name ?? user?.fullName ?? "Guest";

  const handleHttpGet = useCallback(async () => {
    setLoading(true);
    try {
      const res = await sdk.http.post<{
        data: { driverLicense: DriverLicense };
        error?: string;
      }>({
        endpoint: "/api/driving-license",
        // method: "POST",
        body: { method: "GET", path: "/v1/license" },
        headers: { "x-app-id": "mini-revenue-app" },
      });

      if (res.data) {
        setLicense(res.data.data.driverLicense);
      } else {
        setError("Unknown error");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [sdk.http.post]);

  const handleNavigate = useCallback(async () => {
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
  }, [sdk.navigation.navigate]);

  const handleViewSdkLocation = useCallback(async () => {
    setLoadLocation(true);
    setError("");
    setLocation(null);

    try {
      const res = await sdk.device.location({
        reason: "To view your current location",
      });

      switch (res.status) {
        case "granted":
          setLocation(res.data ?? null);
          break;
        case "denied":
          setError("Location permission denied.");
          break;
        case "permanentlyDenied":
          setError("Please enable location permission from device settings.");
          break;
        case "restricted":
          setError("Location access is restricted on this device.");
          break;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to get location via SDK",
      );
    } finally {
      setLoadLocation(false);
    }
  }, [sdk.device.location]);

  const handleViewBrowserLocation = useCallback(() => {
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
  }, []);

  const handleFetchUser = useCallback(async () => {
    setLoadUser(true);
    setUserError(null);
    setUserData(null);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: User = await res.json();
      setUserData(data);
    } catch (err) {
      setUserError(
        err instanceof Error ? err.message : "Failed to fetch user data",
      );
    } finally {
      setLoadUser(false);
    }
  }, []);

  const handleOpenCamera = useCallback(async () => {
    setLoadCamera(true);
    setCameraResponse(null);
    setCameraError(null);
    try {
      const res = await sdk.device.camera({
        reason: "To capture a photo for verification",
      });
      switch (res.status) {
        case "granted":
          setCameraResponse(res.data ?? null);
          break;
        case "denied":
          setCameraError("Camera permission denied.");
          break;
        case "permanentlyDenied":
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
  }, [sdk.device.camera]);

  const handleOpenBrowserCamera = useCallback(() => {
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
  }, []);

  const handleImages = useCallback(async () => {
    setGalleryLoading(true);
    setGalleryError(null);

    try {
      const res = await sdk.device.gallery({
        reason: "To select images",
        multiple: true,
      });
      switch (res.status) {
        case "granted": {
          const galleryData = res.data;
          setGallery(
            Array.isArray(galleryData)
              ? galleryData
              : (galleryData?.images ?? null),
          );
          break;
        }
        case "denied":
          setGalleryError("Image upload cancelled.");
          break;
        case "permanentlyDenied":
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
  }, [sdk.device.gallery]);

  const handleImageUploadByWebOnly = useCallback(() => {
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

      const files: SdkFileModule[] = Array.from(input.files).map((file) => {
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
  }, []);

  const handleFileUpload = useCallback(async () => {
    setDocumentsLoading(true);
    setDocumentsError(null);

    try {
      const res = await sdk.device.files({
        reason: "To select documents",
        multiple: true,
      });

      switch (res.status) {
        case "granted": {
          const filesData = res.data;
          setDocuments(
            Array.isArray(filesData) ? filesData : (filesData?.files ?? null),
          );
          break;
        }
        case "denied":
          setDocumentsError("File access denied.");
          break;
        case "permanentlyDenied":
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
  }, [sdk.device.files]);

  const handleFileUploadByWeb = useCallback(() => {
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

      const files: SdkFileModule[] = Array.from(input.files).map((file) => {
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
  }, []);

  const handleDownloadImage = useCallback(async () => {
    setImageLoading(true);
    setImageError(null);
    setImageDownload(null);
    try {
      const res = await sdk.device.download({
        url: "https://picsum.photos/1200/800",
        fileName: "sample-image.jpg",
        mimeType: "image/jpeg",
        reason: "To download the selected image",
      });
      switch (res.status) {
        case "granted":
          setImageDownload(res.data ?? null);
          break;
        case "denied":
          setImageError("Download permission denied.");
          break;
        case "permanentlyDenied":
          setImageError(
            "Please enable download permission from device settings.",
          );
          break;
        case "restricted":
          setImageError("Download is restricted on this device.");
          break;
      }
    } catch (error) {
      setImageError(
        error instanceof Error ? error.message : "Failed to download file.",
      );
    } finally {
      setImageLoading(false);
    }
  }, [sdk.device.download]);

  const handleDownloadImageWeb = useCallback(async () => {
    setImageLoadingWeb(true);
    setImageErrorWeb(null);
    setImageDownloadWeb(false);

    try {
      const response = await fetch("https://picsum.photos/1200/800");

      if (!response.ok) {
        throw new Error("Failed to fetch image.");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "sample-image.jpg";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      setImageDownloadWeb(true);
    } catch (error) {
      setImageErrorWeb(
        error instanceof Error ? error.message : "Failed to download image.",
      );
    } finally {
      setImageLoadingWeb(false);
    }
  }, []);

  const handleDownloadFile = useCallback(async () => {
    setFileLoading(true);
    setFileError(null);
    setFileDownload(null);
    try {
      const res = await sdk.device.download({
        url: "https://pdfobject.com/pdf/sample.pdf",
        fileName: "sample.pdf",
        mimeType: "application/pdf",
        reason: "To download the selected file",
      });
      switch (res.status) {
        case "granted":
          setFileDownload(res.data ?? null);
          break;
        case "denied":
          setFileError("Download permission denied.");
          break;
        case "permanentlyDenied":
          setFileError(
            "Please enable download permission from device settings.",
          );
          break;
        case "restricted":
          setFileError("Download is restricted on this device.");
          break;
      }
    } catch (error) {
      setFileError(
        error instanceof Error ? error.message : "Failed to download file.",
      );
    } finally {
      setFileLoading(false);
    }
  }, [sdk.device.download]);

  const handleDownloadFileWeb = useCallback(async () => {
    setFileLoadingWeb(true);
    setFileErrorWeb(null);
    setFileDownloadWeb(false);

    try {
      const response = await fetch("https://pdfobject.com/pdf/sample.pdf");

      if (!response.ok) {
        throw new Error("Failed to fetch file.");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "sample.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      setFileDownloadWeb(true);
    } catch (error) {
      setFileErrorWeb(
        error instanceof Error ? error.message : "Failed to download file.",
      );
    } finally {
      setFileLoadingWeb(false);
    }
  }, []);

  const handleOpenContactPicker = useCallback(async () => {
    setContactLoading(true);
    setContactError(null);
    setContact(null);
    try {
      const res = await sdk.device.contact({
        reason: "To select a contact",
      });
      switch (res.status) {
        case "granted":
          setContact(res.data ?? null);
          break;
        case "denied":
          setContactError("Contact access denied.");
          break;
        case "permanentlyDenied":
          setContactError("Please enable contact access from device settings.");
          break;
        case "restricted":
          setContactError("Contact access is restricted on this device.");
          break;
      }
    } catch (error) {
      setContactError(
        error instanceof Error
          ? error.message
          : "Failed to open contact picker.",
      );
    } finally {
      setContactLoading(false);
    }
  }, [sdk.device.contact]);

  const handleOpenWebContactPicker = useCallback(async () => {
    setWebContactLoading(true);
    setWebContactError(null);
    setWebContact(null);

    try {
      const nav = navigator as Navigator & {
        contacts?: {
          select: (
            properties: string[],
            options?: { multiple?: boolean },
          ) => Promise<Array<{ name?: string[]; tel?: string[] }>>;
        };
      };

      if (!nav.contacts || !("ContactsManager" in window)) {
        throw new Error("Contact Picker API is not supported.");
      }

      const selected = await nav.contacts.select(["name", "tel"], {
        multiple: false,
      });

      if (selected.length === 0) {
        return;
      }

      const number = selected[0].tel?.find((t) => t.trim())?.trim();

      if (!number) {
        throw new Error("The selected contact has no phone number.");
      }

      setWebContact({
        contactName: selected[0].name?.find((n) => n.trim())?.trim(),
        number,
      });
    } catch (error) {
      setWebContactError(
        error instanceof Error
          ? error.message
          : "Failed to open contact picker.",
      );
    } finally {
      setWebContactLoading(false);
    }
  }, []);

  const handleAuthenticateBiometric = useCallback(async () => {
    setBiometricLoading(true);
    setBiometricError(null);
    setBiometric(null);
    try {
      const res = await sdk.device.biometric({
        reason: "To verify your identity",
      });
      if (!res.data?.success) {
        setBiometricError(res.error || "Biometric authentication failed.");
      }
      setBiometric(res.data || null);
    } catch (error) {
      setBiometricError(
        error instanceof Error
          ? error.message
          : "Biometric authentication failed.",
      );
    } finally {
      setBiometricLoading(false);
    }
  }, [sdk.device.biometric]);

  const handleAuthenticateBiometricWeb = useCallback(async () => {
    setWebBiometricLoading(true);
    setWebBiometricError(null);
    setWebBiometric(null);
    try {
      if (!window.PublicKeyCredential) {
        setWebBiometricError("WebAuthn is not supported by this browser.");
        return;
      }
      const res = await sdk.device.biometric({
        reason: "To verify your identity",
      });
      if (!res.data?.success) {
        setWebBiometricError(res.error || "Biometric authentication failed.");
      }
      setWebBiometric(res.data || null);
    } catch (error) {
      setWebBiometricError(
        error instanceof Error
          ? error.message
          : "Biometric authentication failed.",
      );
    } finally {
      setWebBiometricLoading(false);
    }
  }, [sdk.device.biometric]);

  const handleSidebarOpen = useCallback(() => {
    setSidebarOpen((v) => !v);
  }, []);

  return (
    <div
      className={`flex min-h-screen relative transition-colors duration-300 ${
        theme.mode === "dark"
          ? "bg-linear-to-br from-slate-900 to-slate-800"
          : "bg-linear-to-br from-slate-50 to-slate-100"
      }`}
    >
      <Sidebar
        onToggle={handleSidebarOpen}
        open={sidebarOpen}
        userName={userName}
      />

      <main className="flex-1 overflow-y-auto min-w-0">
        <div className="sticky top-0 z-30 h-0">
          <button
            className="hidden md:flex absolute top-3 w-8 h-8 rounded-xl items-center justify-center transition-all duration-300 shadow-lg bg-white/90 backdrop-blur-sm border border-slate-200/80 text-slate-500 hover:text-slate-700 hover:bg-white hover:shadow-xl active:scale-95"
            onClick={handleSidebarOpen}
            style={{
              left: sidebarOpen ? "calc(2rem - 16px)" : "12px",
            }}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            type="button"
          >
            <ChevronLeft
              className={`transition-transform duration-300 ${sidebarOpen ? "" : "rotate-180"}`}
              size={15}
            />
          </button>

          <button
            className={`md:hidden absolute top-3 left-3 w-9 h-9 rounded-xl items-center justify-center shadow-lg bg-white/90 backdrop-blur-sm border border-slate-200/80 text-slate-500 hover:text-slate-700 hover:bg-white transition-all duration-200 ${sidebarOpen ? "hidden" : "flex"}`}
            onClick={handleSidebarOpen}
            title="Open sidebar"
            type="button"
          >
            <Menu size={18} />
          </button>
        </div>

        <div className="pt-2">
          <Routes>
            <Route element={<TabHome />} path="/" />
            <Route
              element={
                <TabTestApi
                  error={error}
                  license={license}
                  loading={loading}
                  loadUser={loadUser}
                  onFetchLicense={handleHttpGet}
                  onFetchUser={handleFetchUser}
                  userData={userData}
                  userError={userError}
                />
              }
              path="/test-api"
            />
            <Route
              element={
                <TabChat
                  navLoading={navLoading}
                  navResult={navResult}
                  onNavigate={handleNavigate}
                />
              }
              path="/chat"
            />
            <Route
              element={
                <TabLocation
                  browserError={browserError}
                  browserLocation={browserLocation}
                  loadBrowserLocation={loadBrowserLocation}
                  loadLocation={loadLocation}
                  location={location}
                  onViewBrowserLocation={handleViewBrowserLocation}
                  onViewSdkLocation={handleViewSdkLocation}
                  sdkError={error}
                />
              }
            />
            <Route
              element={
                <TabCamera
                  browserCamera={browserCamera}
                  browserCameraError={browserCameraError}
                  browserCameraLoading={browserCameraLoading}
                  cameraError={cameraError}
                  cameraResponse={cameraResponse}
                  loadCamera={loadCamera}
                  onOpenBrowserCamera={handleOpenBrowserCamera}
                  onOpenCamera={handleOpenCamera}
                />
              }
            />
            <Route
              element={
                <TabGallery
                  gallery={gallery}
                  galleryError={galleryError}
                  galleryLoading={galleryLoading}
                  onOpenGallery={handleImages}
                  onUploadWebImages={handleImageUploadByWebOnly}
                  webImages={webImages}
                  webImagesError={webImagesError}
                  webImagesLoading={webImagesLoading}
                />
              }
            />
            <Route
              element={
                <TabFiles
                  documents={documents}
                  documentsError={documentsError}
                  documentsLoading={documentsLoading}
                  onOpenFilePicker={handleFileUpload}
                  onUploadWebFiles={handleFileUploadByWeb}
                  webDocuments={webDocuments}
                  webDocumentsError={webDocumentsError}
                  webDocumentsLoading={webDocumentsLoading}
                />
              }
            />
            <Route
              element={
                <DownloadTab
                  fileDownload={fileDownload}
                  fileDownloadWeb={fileDownloadWeb}
                  fileError={fileError}
                  fileErrorWeb={fileErrorWeb}
                  fileLoading={fileLoading}
                  fileLoadingWeb={fileLoadingWeb}
                  imageDownload={imageDownload}
                  imageDownloadWeb={imageDownloadWeb}
                  imageError={imageError}
                  imageErrorWeb={imageErrorWeb}
                  imageLoading={imageLoading}
                  imageLoadingWeb={imageLoadingWeb}
                  onDownloadFile={handleDownloadFile}
                  onDownloadFileWeb={handleDownloadFileWeb}
                  onDownloadImage={handleDownloadImage}
                  onDownloadImageWeb={handleDownloadImageWeb}
                />
              }
              path="/download"
            />
            <Route
              element={
                <TabContacts
                  contact={contact}
                  contactError={contactError}
                  contactLoading={contactLoading}
                  onOpenContactPicker={handleOpenContactPicker}
                  onOpenWebContactPicker={handleOpenWebContactPicker}
                  webContact={webContact}
                  webContactError={webContactError}
                  webContactLoading={webContactLoading}
                />
              }
              path="/contact"
            />
            <Route
              element={
                <TabBiometric
                  biometric={biometric}
                  biometricError={biometricError}
                  biometricLoading={biometricLoading}
                  onAuthenticate={handleAuthenticateBiometric}
                  onAuthenticateWeb={handleAuthenticateBiometricWeb}
                  webBiometric={webBiometric}
                  webBiometricError={webBiometricError}
                  webBiometricLoading={webBiometricLoading}
                />
              }
            />
            <Route element={<Navigate replace to="/" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default TestMiniApp;
