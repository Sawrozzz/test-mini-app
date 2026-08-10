import {
  Check,
  Download,
  ExternalLink,
  FileText,
  Image,
  Loader,
  Save,
  X,
} from "lucide-react";
import type { SdkDeviceDownloadResult } from "../types";

export function DownloadTab({
  imageDownload,
  imageLoading,
  imageError,
  onDownloadImage,
  imageDownloadWeb,
  imageLoadingWeb,
  imageErrorWeb,
  onDownloadImageWeb,
  fileDownload,
  fileLoading,
  fileError,
  onDownloadFile,
  fileDownloadWeb,
  fileLoadingWeb,
  fileErrorWeb,
  onDownloadFileWeb,
}: {
  imageDownload: SdkDeviceDownloadResult | null;
  imageLoading: boolean;
  imageError: string | null;
  onDownloadImage: () => void;
  imageDownloadWeb: boolean;
  imageLoadingWeb: boolean;
  imageErrorWeb: string | null;
  onDownloadImageWeb: () => void;
  fileDownload: SdkDeviceDownloadResult | null;
  fileLoading: boolean;
  fileError: string | null;
  onDownloadFile: () => void;
  fileDownloadWeb: boolean;
  fileLoadingWeb: boolean;
  fileErrorWeb: string | null;
  onDownloadFileWeb: () => void;
}) {
  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-medium mb-4">
            <Download size={14} />
            Download Feature
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Download</h1>
          <p className="text-slate-400 text-sm mt-2">
            Download files and preview them instantly
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image className="text-slate-600" size={16} />
              <h2 className="text-lg font-semibold text-slate-800">
                Image Download
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DownloadCard
                actionIcon={<Download size={16} />}
                actionLabel="Download Image"
                color="blue"
                download={imageDownload}
                error={imageError}
                icon={<Download size={14} />}
                isLoading={imageLoading}
                onAction={onDownloadImage}
                title="WITH SDK"
              />
              <BrowserDownloadCard
                actionIcon={<Save size={16} />}
                actionLabel="Download Image"
                color="green"
                downloaded={imageDownloadWeb}
                error={imageErrorWeb}
                fileName="sample-image.jpg"
                icon={<Save size={14} />}
                isLoading={imageLoadingWeb}
                onAction={onDownloadImageWeb}
                title="WITHOUT SDK"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="text-slate-600" size={16} />
              <h2 className="text-lg font-semibold text-slate-800">
                File Download
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DownloadCard
                actionIcon={<Download size={16} />}
                actionLabel="Download File"
                color="blue"
                download={fileDownload}
                error={fileError}
                icon={<Download size={14} />}
                isLoading={fileLoading}
                onAction={onDownloadFile}
                title="WITH SDK"
              />
              <BrowserDownloadCard
                actionIcon={<Save size={16} />}
                actionLabel="Download File"
                color="green"
                downloaded={fileDownloadWeb}
                error={fileErrorWeb}
                fileName="sample.pdf"
                icon={<Save size={14} />}
                isLoading={fileLoadingWeb}
                onAction={onDownloadFileWeb}
                title="WITHOUT SDK"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DownloadCard({
  title,
  icon,
  color,
  download,
  isLoading,
  error,
  onAction,
  actionLabel,
  actionIcon,
}: {
  title: string;
  icon: React.ReactNode;
  color: "blue" | "green";
  download: SdkDeviceDownloadResult | null;
  isLoading: boolean;
  error: string | null;
  onAction: () => void;
  actionLabel: string;
  actionIcon: React.ReactNode;
}) {
  const badge =
    color === "blue"
      ? "bg-blue-50 border-blue-100 text-blue-600"
      : "bg-green-50 border-green-100 text-green-600";

  const loaderColor = color === "blue" ? "text-blue-500" : "text-green-500";

  const btnGradient =
    color === "blue"
      ? "from-blue-600 to-indigo-600 shadow-blue-600/25 hover:shadow-blue-600/40"
      : "from-green-600 to-emerald-600 shadow-green-600/25 hover:shadow-green-600/40";

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${badge}`}
        >
          {icon}
          {title}
        </div>
      </div>

      {isLoading && !download ? (
        <div className="flex flex-col items-center py-6">
          <Loader className={`${loaderColor} animate-spin mb-3`} size={24} />
          <p className="text-slate-400 text-xs">Downloading...</p>
        </div>
      ) : (
        <>
          {error && !download && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 mb-4">
              <span className="text-rose-500 mt-0.5 shrink-0">
                <X size={14} />
              </span>
              <p className="text-rose-600 text-xs">{error}</p>
            </div>
          )}
          {!!download && (
            <div className="space-y-4 mb-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">
                    File
                  </p>
                  <p className="text-slate-700 font-semibold text-xs truncate">
                    {download.file.fileName || "—"}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">
                    Type
                  </p>
                  <p className="text-slate-700 font-semibold text-xs truncate">
                    {download.file.mimeType || "—"}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">
                    Size
                  </p>
                  <p className="text-slate-700 font-semibold text-xs">
                    {download.file.byteSize
                      ? `${(download.file.byteSize / 1024).toFixed(1)} KB`
                      : "—"}
                  </p>
                </div>
              </div>
              {!!download.file.url && (
                <div className="flex justify-center">
                  <a
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    href={download.file.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <ExternalLink size={14} />
                    Open downloaded file
                  </a>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {!isLoading && (
        <button
          className={`w-full group bg-linear-to-r ${btnGradient} text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2`}
          onClick={onAction}
          type="button"
        >
          {actionIcon}
          {download ? "Download Again" : `${actionLabel}`}
        </button>
      )}
    </div>
  );
}

function BrowserDownloadCard({
  title,
  icon,
  color,
  downloaded,
  isLoading,
  error,
  onAction,
  actionLabel,
  actionIcon,
  fileName,
}: {
  title: string;
  icon: React.ReactNode;
  color: "blue" | "green";
  downloaded: boolean;
  isLoading: boolean;
  error: string | null;
  onAction: () => void;
  actionLabel: string;
  actionIcon: React.ReactNode;
  fileName: string;
}) {
  const badge =
    color === "blue"
      ? "bg-blue-50 border-blue-100 text-blue-600"
      : "bg-green-50 border-green-100 text-green-600";

  const loaderColor = color === "blue" ? "text-blue-500" : "text-green-500";

  const btnGradient =
    color === "blue"
      ? "from-blue-600 to-indigo-600 shadow-blue-600/25 hover:shadow-blue-600/40"
      : "from-green-600 to-emerald-600 shadow-green-600/25 hover:shadow-green-600/40";

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${badge}`}
        >
          {icon}
          {title}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center py-6">
          <Loader className={`${loaderColor} animate-spin mb-3`} size={24} />
          <p className="text-slate-400 text-xs">Downloading...</p>
        </div>
      ) : (
        <>
          {!!error && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 mb-4">
              <span className="text-rose-500 mt-0.5 shrink-0">
                <X size={14} />
              </span>
              <p className="text-rose-600 text-xs">{error}</p>
            </div>
          )}
          {downloaded ? (
            <div className="space-y-4 mb-4">
              <div className="flex items-center justify-center py-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="text-green-600" size={24} />
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">
                  File
                </p>
                <p className="text-slate-700 font-semibold text-xs truncate">
                  {fileName}
                </p>
              </div>
              <p className="text-slate-400 text-xs text-center">
                Download completed successfully
              </p>
            </div>
          ) : null}
        </>
      )}

      {!isLoading && (
        <button
          className={`w-full group bg-linear-to-r ${btnGradient} text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2`}
          onClick={onAction}
          type="button"
        >
          {actionIcon}
          {downloaded ? "Download Again" : `${actionLabel}`}
        </button>
      )}
    </div>
  );
}
