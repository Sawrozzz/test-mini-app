import { Folder, Clock } from "lucide-react";

export function TabFiles() {
  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14 flex items-center justify-center">
      <div className="max-w-lg w-full">
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

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 md:p-10">
          <div className="flex flex-col items-center">
            <div className="relative mb-8">
              <div className="w-36 h-36 bg-gradient-to-br from-cyan-400 via-teal-500 to-emerald-500 rounded-3xl rotate-6 shadow-xl shadow-cyan-500/20 flex items-center justify-center">
                <Folder size={56} className="text-white/90" />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <Clock size={20} className="text-cyan-500" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Coming Soon
            </h2>
            <p className="text-slate-400 text-sm text-center max-w-xs">
              The files feature is under development. Check back later to
              manage your documents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
