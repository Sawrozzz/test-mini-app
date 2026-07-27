import { Loader } from "../Loader";
import type { Camera, PermissionStatus } from "../../types";

export function CameraSection({
  loadCamera,
  cameraResponse,
  cameraError,
  cameraPermission,
  onOpenCamera,
}: {
  loadCamera: boolean;
  cameraResponse: Camera | null;
  cameraError: string | null;
  cameraPermission: PermissionStatus | null;
  onOpenCamera: () => void;
}) {
  const imageSrc = cameraResponse?.url.startsWith("data:")
    ? cameraResponse.url
    : cameraResponse?.url.startsWith("http://") ||
      cameraResponse?.url.startsWith("https://")
    ? cameraResponse.url
    : `data:${cameraResponse?.mimeType};base64,${cameraResponse?.url}`;

  return (
    <>
      <button
        className="rounded border py-2 px-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 mt-4"
        onClick={onOpenCamera}
        disabled={loadCamera}
      >
        Open Camera
      </button>

      {loadCamera && (
        <div className="mt-2">
          <Loader />
        </div>
      )}

      {cameraError && !loadCamera && cameraPermission !== "granted" && (
        <div className="mt-2 text-sm text-rose-600">{cameraError}</div>
      )}

      {!loadCamera && cameraResponse && (
        <div className="mt-4 rounded-lg border bg-slate-50 p-4">
          <img
            src={imageSrc}
            alt={cameraResponse.fileName}
            className="mx-auto max-h-80 max-w-full rounded border object-contain"
          />

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <div className="rounded bg-white border px-3 py-2">
              <span className="font-medium">File:</span>{" "}
              {cameraResponse.fileName}
            </div>

            <div className="rounded bg-white border px-3 py-2">
              <span className="font-medium">Type:</span>{" "}
              {cameraResponse.mimeType}
            </div>

            <div className="rounded bg-white border px-3 py-2">
              <span className="font-medium">Size:</span>{" "}
              {(cameraResponse.byteSize / 1024).toFixed(2)} KB
            </div>
          </div>

          <details className="mt-5">
            <summary className="cursor-pointer font-medium text-slate-700">
              View Raw Response
            </summary>

            <pre className="mt-3 max-h-64 overflow-auto rounded-lg border bg-slate-900 p-4 text-xs text-slate-100">
              {JSON.stringify(cameraResponse, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </>
  );
}
