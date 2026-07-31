import { Home, FileText, MessageCircle, MapPin, Camera, Image, Folder, X, DownloadIcon, Contact, Fingerprint } from "lucide-react";
import type { TabId } from "../types";

const tabs: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "test-api", label: "Test Api", icon: FileText },
  { id: "chat", label: "Chat Here", icon: MessageCircle },
  { id: "location", label: "Location", icon: MapPin },
  { id: "camera", label: "Camera", icon: Camera },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "files", label: "Files", icon: Folder },
  { id: "download", label: "Download", icon: DownloadIcon },
  { id: "contact", label: "Contact", icon: Contact },
  { id: "biometric", label: "Biometric", icon: Fingerprint },
];

export function Sidebar({
  activeTab,
  onTabChange,
  userName,
  open,
  onToggle,
}: {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  userName: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      {open && (
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`
          flex flex-col shrink-0 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/30

          absolute inset-y-0 left-0 z-50
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}

          md:sticky md:inset-auto md:z-auto
          md:transform-none md:transition-all md:duration-300
          ${open ? "md:w-64" : "md:w-0 md:min-w-0 md:overflow-hidden md:border-r-0"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700/30 md:pt-4">
          <div className={`flex items-center gap-3 ${!open && "md:hidden"}`}>
            <div className="w-9 h-9 bg-linear-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 ring-1 ring-white/10 shrink-0">
              <span className="text-white font-bold text-xs tracking-tight">
                MP
              </span>
            </div>
            <div className="min-w-0">
              <h1 className="text-white font-bold text-sm tracking-tight leading-tight">
                Mini App
              </h1>
              <p className="text-slate-500 text-[10px] font-medium">
                Playground
              </p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="md:hidden w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <p className={`px-4 pb-2 text-[10px] uppercase font-bold tracking-widest text-slate-600 ${!open && "md:hidden"}`}>
            Navigation
          </p>
          <nav className="space-y-0.5">
            {tabs.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => {
                    onTabChange(id);
                    if (window.innerWidth < 768) onToggle();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-200"
                  } ${!open && "md:justify-center md:px-2"}`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-linear-to-r from-blue-600/25 via-purple-600/20 to-transparent rounded-xl border border-blue-500/20 shadow-sm shadow-blue-500/10" />
                  )}
                  <span
                    className={`relative flex items-center justify-center w-8 h-8 rounded-lg shrink-0 transition-all duration-200 ${
                      isActive
                        ? "bg-linear-to-br from-blue-500 to-purple-600 shadow-md shadow-blue-500/25"
                        : "bg-slate-800/50 group-hover:bg-slate-700/50"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={`transition-colors duration-200 ${
                        isActive
                          ? "text-white"
                          : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    />
                  </span>
                  <span className={`relative ${!open && "md:hidden"}`}>
                    {label}
                  </span>
                  {isActive && (
                    <span className={`relative ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-sm shadow-blue-400/50 ${!open && "md:hidden"}`} />
                  )}
                  {!isActive && (
                    <span className={`relative ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-1 h-1 rounded-full bg-slate-600 ${!open && "md:hidden"}`} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className={`p-4 border-t border-slate-700/30 bg-slate-800/30 ${!open && "md:hidden"}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-linear-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-xs text-slate-300 font-semibold ring-2 ring-slate-600/30 shrink-0">
              {userName[0]?.toUpperCase() || "G"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-200 text-sm font-medium truncate leading-tight">
                {userName}
              </p>
              <p className="text-slate-500 text-xs flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50 inline-block" />
                Online
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
