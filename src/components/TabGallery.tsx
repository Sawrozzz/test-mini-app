import { Image, Clock } from "lucide-react";

export function TabGallery() {
  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14 flex items-center justify-center">
      <div className="max-w-lg w-full">
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

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 md:p-10">
          <div className="flex flex-col items-center">
            <div className="relative mb-8">
              <div className="w-36 h-36 bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500 rounded-3xl -rotate-3 shadow-xl shadow-violet-500/20 flex items-center justify-center">
                <Image size={56} className="text-white/90" />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <Clock size={20} className="text-violet-500" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Coming Soon
            </h2>
            <p className="text-slate-400 text-sm text-center max-w-xs">
              The gallery feature is under development. Check back later to
              browse your captured images.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
