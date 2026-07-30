import { useState } from "react";
import { Download, Loader, X, ExternalLink } from "lucide-react";
import type { SdkDeviceDownloadResult } from "../types";

interface DownloadFile {
  name: string;
  type: string;
  url: string;
  fileName: string;
  mimeType?: string;
}

interface DownloadState {
  result: SdkDeviceDownloadResult | null;
  loading: boolean;
  error: string | null;
}

export function DownloadTab({ sdk }: { sdk: MiniAppSdk }) {
  const downloads: DownloadFile[] = [
    {
      name: "Sample Image",
      type: "Image",
      url: "https://picsum.photos/1200/800",
      fileName: "sample-image.jpg",
      mimeType: "image/jpeg",
    },
    {
      name: "Sample PDF",
      type: "PDF",
      url: "https://pdfobject.com/pdf/sample.pdf",
      fileName: "sample.pdf",
      mimeType: "application/pdf",
    },
  ];

  const [downloadStates, setDownloadStates] = useState<Record<string, DownloadState>>({});

  const handleDownload = async (file: DownloadFile) => {
    setDownloadStates(prev => ({
      ...prev,
      [file.fileName]: { result: null, loading: true, error: null },
    }));

    try {
      const res = await sdk.device.download({
        url: file.url,
        fileName: file.fileName,
        mimeType: file.mimeType,
        reason: "To download the selected file",
      });

      switch (res.status) {
        case "granted":
          setDownloadStates(prev => ({
            ...prev,
            [file.fileName]: { result: res.data!, loading: false, error: null },
          }));
          break;
        case "denied":
          setDownloadStates(prev => ({
            ...prev,
            [file.fileName]: { result: null, loading: false, error: "Download permission denied." },
          }));
          break;
        case "permanentlyDenied":
          setDownloadStates(prev => ({
            ...prev,
            [file.fileName]: { result: null, loading: false, error: "Please enable download permission from device settings." },
          }));
          break;
        case "restricted":
          setDownloadStates(prev => ({
            ...prev,
            [file.fileName]: { result: null, loading: false, error: "Download is restricted on this device." },
          }));
          break;
      }
    } catch (error) {
      setDownloadStates(prev => ({
        ...prev,
        [file.fileName]: { result: null, loading: false, error: error instanceof Error ? error.message : "Failed to download file." },
      }));
    }
  };

  const getState = (fileName: string): DownloadState => {
    return downloadStates[fileName] || { result: null, loading: false, error: null };
  };

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

        <div className="space-y-6">
          {downloads.map((file) => {
            const state = getState(file.fileName);
            return (
              <DownloadCard
                key={file.fileName}
                title={file.name}
                icon={<Download size={14} />}
                download={state.result}
                isLoading={state.loading}
                error={state.error}
                onAction={() => handleDownload(file)}
                actionLabel="Download File"
                actionIcon={<Download size={16} />}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DownloadCard({
  title,
  icon,
  download,
  isLoading,
  error,
  onAction,
  actionLabel,
  actionIcon,
}: {
  title: string;
  icon: React.ReactNode;
  download: SdkDeviceDownloadResult | null;
  isLoading: boolean;
  error: string | null;
  onAction: () => void;
  actionLabel: string;
  actionIcon: React.ReactNode;
}) {
  const badge = "bg-blue-50 border-blue-100 text-blue-600";
  const loaderColor = "text-blue-500";
  const btnGradient = "from-blue-600 to-indigo-600 shadow-blue-600/25 hover:shadow-blue-600/40";

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${badge}`}>
          {icon}
          {title}
        </div>
      </div>

      {isLoading && !download ? (
        <div className="flex flex-col items-center py-6">
          <Loader size={24} className={`${loaderColor} animate-spin mb-3`} />
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
          {download && (
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
                    {download.file.byteSize ? (download.file.byteSize / 1024).toFixed(1) + " KB" : "—"}
                  </p>
                </div>
              </div>
              {download.file.url && (
                <div className="flex justify-center">
                  <a
                    href={download.file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline"
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
          onClick={onAction}
          className={`w-full group bg-linear-to-r ${btnGradient} text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2`}
        >
          {actionIcon}
          {download ? "Download Again" : actionLabel}
        </button>
      )}
    </div>
  );
}