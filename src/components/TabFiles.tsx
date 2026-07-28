import { Folder, Loader, Upload, X, FileText, HardDrive, FileImage, Film, FileArchive, FileCode, FileSpreadsheet } from "lucide-react";
import type { FileModule } from "../types";

export function TabFiles({
  documents,
  documentsLoading,
  documentsError,
  onOpenFilePicker,
  webDocuments,
  webDocumentsLoading,
  webDocumentsError,
  onUploadWebFiles,
}: {
  documents: FileModule[] | null;
  documentsLoading: boolean;
  documentsError: string | null;
  onOpenFilePicker: () => void;
  webDocuments: FileModule[] | null;
  webDocumentsLoading: boolean;
  webDocumentsError: string | null;
  onUploadWebFiles: () => void;
}) {
  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-50 border border-cyan-100 rounded-full text-cyan-600 text-xs font-medium mb-4">
            <Folder size={14} />
            Files
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Files</h1>
          <p className="text-slate-400 text-sm mt-2">
            Manage your documents and files
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileCard
            title="WITH SDK"
            icon={<Folder size={14} />}
            color="cyan"
            files={documents}
            isLoading={documentsLoading}
            error={documentsError}
            onAction={onOpenFilePicker}
            actionLabel="Open File Picker"
            actionIcon={<Folder size={16} />}
          />

          <FileCard
            title="WITHOUT SDK"
            icon={<Upload size={14} />}
            color="amber"
            files={webDocuments}
            isLoading={webDocumentsLoading}
            error={webDocumentsError}
            onAction={onUploadWebFiles}
            actionLabel="Upload Files"
            actionIcon={<Upload size={16} />}
          />
        </div>
      </div>
    </div>
  );
}

function FileCard({
  title,
  icon,
  color,
  files,
  isLoading,
  error,
  onAction,
  actionLabel,
  actionIcon,
}: {
  title: string;
  icon: React.ReactNode;
  color: "cyan" | "amber";
  files: FileModule[] | null;
  isLoading: boolean;
  error: string | null;
  onAction: () => void;
  actionLabel: string;
  actionIcon: React.ReactNode;
}) {
  const badge = color === "cyan"
    ? "bg-cyan-50 border-cyan-100 text-cyan-600"
    : "bg-amber-50 border-amber-100 text-amber-600";

  const loaderColor = color === "cyan" ? "text-cyan-500" : "text-amber-500";

  const btnGradient = color === "cyan"
    ? "from-cyan-600 to-teal-600 shadow-cyan-600/25 hover:shadow-cyan-600/40"
    : "from-amber-600 to-orange-600 shadow-amber-600/25 hover:shadow-amber-600/40";

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${badge}`}>
          {icon}
          {title}
        </div>
      </div>

      {isLoading && !files ? (
        <div className="flex flex-col items-center py-6">
          <Loader size={24} className={`${loaderColor} animate-spin mb-3`} />
          <p className="text-slate-400 text-xs">Loading...</p>
        </div>
      ) : (
        <>
          {error && !files && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 mb-4">
              <span className="text-rose-500 mt-0.5 shrink-0">
                <X size={14} />
              </span>
              <p className="text-rose-600 text-xs">{error}</p>
            </div>
          )}
          {files && files.length > 0 && (
            <div className="space-y-4 mb-4">
              <div className="space-y-2">
                {files.map((file, i) => (
                  <FilePreview key={i} file={file} />
                ))}
              </div>
              <p className="text-slate-400 text-xs text-center">
                {files.length} file{files.length !== 1 ? "s" : ""} selected
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

function FilePreview({ file }: { file: FileModule }) {
  const ext = file.extension || file.fileName.split(".").pop()?.toLowerCase() || "?";
  const size = formatBytes(file.byteSize);
  const isImage = file.mimeType?.startsWith("image/");
  const Icon = getFileIcon(ext);

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 flex items-center gap-3">
      {isImage && (file.previewUrl || file.url) ? (
        <div className="w-12 h-12 rounded-lg bg-slate-200 overflow-hidden shrink-0">
          <img
            src={file.previewUrl || file.url}
            alt={file.fileName}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center shrink-0">
          <Icon size={22} className="text-slate-500" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-700 truncate" title={file.fileName}>
          {file.fileName}
        </p>
        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
          <span className="inline-flex items-center gap-0.5">
            <FileText size={9} />
            {ext.toUpperCase()}
          </span>
          <span className="inline-flex items-center gap-0.5">
            <HardDrive size={9} />
            {size}
          </span>
        </div>
      </div>
    </div>
  );
}

function getFileIcon(ext: string) {
  const imageExts = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico"];
  const videoExts = ["mp4", "webm", "avi", "mov", "mkv", "flv"];
  const archiveExts = ["zip", "rar", "7z", "tar", "gz", "bz2"];
  const codeExts = ["js", "ts", "jsx", "tsx", "json", "html", "css", "py", "java", "cpp", "c", "go", "rs"];

  if (imageExts.includes(ext)) return FileImage;
  if (videoExts.includes(ext)) return Film;
  if (archiveExts.includes(ext)) return FileArchive;
  if (codeExts.includes(ext)) return FileCode;
  if (ext === "pdf" || ext === "doc" || ext === "docx" || ext === "xls" || ext === "xlsx") return FileSpreadsheet;
  return FileText;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
