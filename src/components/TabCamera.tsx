import { useMemo } from "react";
import { Camera, Image } from "lucide-react";
import type { Camera as CameraType, PermissionStatus } from "../types";

function createFallbackCameraData(): CameraType {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f8fafc"/>
        <stop offset="100%" stop-color="#e2e8f0"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#bg)" rx="16"/>
    <g transform="translate(200,100)">
      <rect x="-60" y="-40" width="120" height="80" rx="16" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
      <circle cx="0" cy="0" r="28" fill="#94a3b8"/>
      <circle cx="0" cy="0" r="14" fill="#64748b"/>
      <circle cx="18" cy="-18" r="4" fill="#f1f5f9"/>
    </g>
    <rect x="140" y="200" width="120" height="10" rx="5" fill="#94a3b8"/>
    <rect x="160" y="218" width="80" height="8" rx="4" fill="#94a3b8"/>
    <rect x="145" y="234" width="110" height="8" rx="4" fill="#cbd5e1"/>
    <path d="M185 95 L200 78 L215 95" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="175" y="100" width="50" height="2" rx="1" fill="#cbd5e1"/>
    <text x="200" y="275" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="sans-serif">Camera Preview</text>
  </svg>`;

  return {
    url: `data:image/svg+xml;base64,${btoa(svg)}`,
    fileName: "camera-preview.svg",
    mimeType: "image/svg+xml",
    byteSize: new Blob([svg]).size,
  };
}

export function TabCamera({
  loadCamera,
  cameraResponse,
  cameraError,
  cameraPermission,
  onOpenCamera,
}: {
  loadCamera: boolean;
  cameraResponse: CameraType | null;
  cameraError: string | null;
  cameraPermission: PermissionStatus | null;
  onOpenCamera: () => void;
}) {
  const fallbackData = useMemo(() => createFallbackCameraData(), []);

  const isRealData = cameraResponse !== null;
  const hasClicked =
    cameraPermission !== null ||
    cameraError !== null ||
    loadCamera ||
    cameraResponse !== null;

  const displayData = isRealData ? cameraResponse : fallbackData;

  const imageSrc = displayData.url.startsWith("data:")
    ? displayData.url
    : displayData.url.startsWith("http://") ||
      displayData.url.startsWith("https://")
    ? displayData.url
    : `data:${displayData.mimeType};base64,${displayData.url}`;

  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14 flex items-center justify-center">
      <div className="max-w-lg w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-full text-amber-600 text-xs font-medium mb-4">
            <Camera size={14} />
            Camera Feature
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Camera</h1>
          <p className="text-slate-400 text-sm mt-2">
            Capture photos and preview them instantly
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 md:p-8">
          {hasClicked ? (
            <>
              <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 mb-6">
                {loadCamera ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mb-4" />
                    <p className="text-slate-500 text-sm">Opening camera...</p>
                  </div>
                ) : (
                  <img
                    src={imageSrc}
                    alt={displayData.fileName || "Camera preview"}
                    className="w-full max-h-72 object-contain mx-auto"
                  />
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">
                    File
                  </p>
                  <p className="text-slate-700 font-semibold text-xs truncate">
                    {displayData.fileName || "—"}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">
                    Type
                  </p>
                  <p className="text-slate-700 font-semibold text-xs truncate">
                    {displayData.mimeType || "—"}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">
                    Size
                  </p>
                  <p className="text-slate-700 font-semibold text-xs">
                    {(displayData.byteSize / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              {!isRealData && !loadCamera && (
                <p className="text-center text-xs text-slate-400 mb-4">
                  Using preview — no camera data received
                </p>
              )}

              {(cameraPermission === "denied" ||
                cameraPermission === "parmanentlyDenied" ||
                cameraPermission === "restricted") && (
                <div className="p-3 mb-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-2.5">
                  <Camera size={14} className="text-rose-500 mt-0.5 shrink-0" />
                  <p className="text-rose-600 text-xs leading-relaxed">
                    {cameraError || "Camera access was not granted."}
                  </p>
                </div>
              )}

              {cameraError && cameraPermission === null && (
                <div className="p-3 mb-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-2.5">
                  <Camera size={14} className="text-rose-500 mt-0.5 shrink-0" />
                  <p className="text-rose-600 text-xs leading-relaxed">
                    {cameraError}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center py-4">
              <div className="relative mb-8">
                <div className="w-36 h-36 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-3xl rotate-6 shadow-xl shadow-amber-500/20 flex items-center justify-center">
                  <Camera size={56} className="text-white/90" />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <Image size={20} className="text-amber-500" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Open Camera
              </h2>
              <p className="text-slate-400 text-sm text-center mb-8 max-w-xs">
                Tap the button below to capture a photo using your device
                camera.
              </p>
            </div>
          )}

          <button
            onClick={onOpenCamera}
            disabled={loadCamera}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-amber-600/25 hover:shadow-amber-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            <Camera size={16} />
            {isRealData ? "Retake Photo" : hasClicked ? "Try Again" : "Open Camera"}
          </button>
        </div>
      </div>
    </div>
  );
}
