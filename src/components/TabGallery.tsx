import { Image, FolderOpen, Loader, Upload, X, FileImage, HardDrive } from "lucide-react";
import type { FileModule } from "../types";

export function TabGallery({
  gallery,
  galleryLoading,
  galleryError,
  onOpenGallery,
  webImages,
  webImagesLoading,
  webImagesError,
  onUploadWebImages,
}: {
  gallery: FileModule[] | null;
  galleryLoading: boolean;
  galleryError: string | null;
  onOpenGallery: () => void;
  webImages: FileModule[] | null;
  webImagesLoading: boolean;
  webImagesError: string | null;
  onUploadWebImages: () => void;
}) {
  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-50 border border-violet-100 rounded-full text-violet-600 text-xs font-medium mb-4">
            <Image size={14} />
            Gallery
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Gallery</h1>
          <p className="text-slate-400 text-sm mt-2">
            Browse your captured images
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageCard
            title="WITH SDK"
            icon={<FolderOpen size={14} />}
            color="violet"
            images={gallery}
            isLoading={galleryLoading}
            error={galleryError}
            onAction={onOpenGallery}
            actionLabel="Open Gallery"
            actionIcon={<FolderOpen size={16} />}
          />

          <ImageCard
            title="WITHOUT SDK"
            icon={<Upload size={14} />}
            color="rose"
            images={webImages}
            isLoading={webImagesLoading}
            error={webImagesError}
            onAction={onUploadWebImages}
            actionLabel="Upload Images"
            actionIcon={<Upload size={16} />}
          />
        </div>
      </div>
    </div>
  );
}

function ImageCard({
  title,
  icon,
  color,
  images,
  isLoading,
  error,
  onAction,
  actionLabel,
  actionIcon,
}: {
  title: string;
  icon: React.ReactNode;
  color: "violet" | "rose";
  images: FileModule[] | null;
  isLoading: boolean;
  error: string | null;
  onAction: () => void;
  actionLabel: string;
  actionIcon: React.ReactNode;
}) {
  const badge = color === "violet"
    ? "bg-violet-50 border-violet-100 text-violet-600"
    : "bg-rose-50 border-rose-100 text-rose-600";

  const loaderColor = color === "violet" ? "text-violet-500" : "text-rose-500";

  const btnGradient = color === "violet"
    ? "from-violet-600 to-purple-600 shadow-violet-600/25 hover:shadow-violet-600/40"
    : "from-rose-600 to-pink-600 shadow-rose-600/25 hover:shadow-rose-600/40";

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${badge}`}>
          {icon}
          {title}
        </div>
      </div>

      {isLoading && !images ? (
        <div className="flex flex-col items-center py-6">
          <Loader size={24} className={`${loaderColor} animate-spin mb-3`} />
          <p className="text-slate-400 text-xs">Loading...</p>
        </div>
      ) : (
        <>
          {error && !images && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 mb-4">
              <span className="text-rose-500 mt-0.5 shrink-0">
                <X size={14} />
              </span>
              <p className="text-rose-600 text-xs">{error}</p>
            </div>
          )}
          {images && images.length > 0 && (
            <div className="space-y-4 mb-4">
              <div className="grid grid-cols-2 gap-3">
                {images.map((file, i) => (
                  <ImagePreview key={i} file={file} />
                ))}
              </div>
              <p className="text-slate-400 text-xs text-center">
                {images.length} image{images.length !== 1 ? "s" : ""} selected
              </p>
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
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function ImagePreview({ file }: { file: FileModule }) {
  const previewUrl = file.previewUrl || file.url;
  const ext = file.extension || file.fileName.split(".").pop()?.toLowerCase() || "?";
  const size = formatBytes(file.byteSize);

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
      <div className="aspect-square bg-slate-200 flex items-center justify-center overflow-hidden">
        <img
          src={previewUrl}
          alt={file.fileName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 space-y-1.5">
        <p className="text-[10px] font-medium text-slate-700 truncate leading-tight" title={file.fileName}>
          {file.fileName}
        </p>
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span className="inline-flex items-center gap-0.5">
            <FileImage size={10} />
            {ext.toUpperCase()}
          </span>
          <span className="inline-flex items-center gap-0.5">
            <HardDrive size={10} />
            {size}
          </span>
        </div>
        {file.mimeType && (
          <p className="text-[9px] text-slate-300 truncate">{file.mimeType}</p>
        )}
      </div>
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
