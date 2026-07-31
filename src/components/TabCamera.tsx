import { Camera, Loader, X, Image } from "lucide-react";

export function TabCamera({
  loadCamera,
  cameraResponse,
  cameraError,
  onOpenCamera,
  browserCamera,
  browserCameraLoading,
  browserCameraError,
  onOpenBrowserCamera,
}: {
  loadCamera: boolean;
  cameraResponse: SdkDeviceCameraResult | null;
  cameraError: string | null;
  onOpenCamera: () => void;
  browserCamera: SdkDeviceCameraResult | null;
  browserCameraLoading: boolean;
  browserCameraError: string | null;
  onOpenBrowserCamera: () => void;
}) {
  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14">
      <div className="max-w-4xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CameraCard
            title="WITH SDK"
            icon={<Camera size={14} />}
            color="amber"
            camera={cameraResponse}
            isLoading={loadCamera}
            error={cameraError}
            onAction={onOpenCamera}
            actionLabel="Open Camera"
            actionIcon={<Camera size={16} />}
          />

          <CameraCard
            title="WITHOUT SDK"
            icon={<Image size={14} />}
            color="pink"
            camera={browserCamera}
            isLoading={browserCameraLoading}
            error={browserCameraError}
            onAction={onOpenBrowserCamera}
            actionLabel="Capture Photo"
            actionIcon={<Camera size={16} />}
          />
        </div>
      </div>
    </div>
  );
}

function CameraCard({
  title,
  icon,
  color,
  camera,
  isLoading,
  error,
  onAction,
  actionLabel,
  actionIcon,
}: {
  title: string;
  icon: React.ReactNode;
  color: "amber" | "pink";
  camera: SdkDeviceCameraResult | null;
  isLoading: boolean;
  error: string | null;
  onAction: () => void;
  actionLabel: string;
  actionIcon: React.ReactNode;
}) {
  console.log("CAMERA FILE ", camera)
  const badge = color === "amber"
    ? "bg-amber-50 border-amber-100 text-amber-600"
    : "bg-pink-50 border-pink-100 text-pink-600";

  const loaderColor = color === "amber" ? "text-amber-500" : "text-pink-500";

  const btnGradient = color === "amber"
    ? "from-amber-600 to-orange-600 shadow-amber-600/25 hover:shadow-amber-600/40"
    : "from-pink-600 to-rose-600 shadow-pink-600/25 hover:shadow-pink-600/40";

  const imageSrc = camera?.url?.startsWith("data:") || camera?.url?.startsWith("blob:") || camera?.url?.startsWith("http://") || camera?.url?.startsWith("https://")
    ? camera.url
    : camera?.url
    ? `data:${camera.mimeType};base64,${camera.url}`
    : null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${badge}`}>
          {icon}
          {title}
        </div>
      </div>

      {isLoading && !camera ? (
        <div className="flex flex-col items-center py-6">
          <Loader size={24} className={`${loaderColor} animate-spin mb-3`} />
          <p className="text-slate-400 text-xs">Opening camera...</p>
        </div>
      ) : (
        <>
          {error && !camera && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 mb-4">
              <span className="text-rose-500 mt-0.5 shrink-0">
                <X size={14} />
              </span>
              <p className="text-rose-600 text-xs">{error}</p>
            </div>
          )}
          {camera && imageSrc && (
            <div className="space-y-4 mb-4">
              <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                <img
                  src={imageSrc}
                  alt={camera.fileName || "Camera preview"}
                  className="w-full max-h-56 object-contain mx-auto"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">
                    File
                  </p>
                  <p className="text-slate-700 font-semibold text-xs truncate">
                    {camera.fileName || "—"}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">
                    Type
                  </p>
                  <p className="text-slate-700 font-semibold text-xs truncate">
                    {camera.mimeType || "—"}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">
                    Size
                  </p>
                  <p className="text-slate-700 font-semibold text-xs">
                    {(camera.byteSize! / 1024).toFixed(1)} KB
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
          className={`w-full group bg-gradient-to-r ${btnGradient} text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2`}
        >
          {actionIcon}
          {camera ? "Capture Again" : actionLabel}
        </button>
      )}
    </div>
  );
}
