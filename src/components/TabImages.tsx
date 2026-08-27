import { Images } from "lucide-react";

const publicImages = [
  { fileName: "pngwing.com.png", src: "/pngwing.com.png" },
  { fileName: "pngwing.com (1).png", src: "/pngwing.com%20(1).png" },
  { fileName: "pngwing.com (2).png", src: "/pngwing.com%20(2).png" },
  { fileName: "pngwing.com (3).png", src: "/pngwing.com%20(3).png" },
  { fileName: "favicon.svg", src: "/favicon.svg" },
  { fileName: "icons.svg", src: "/icons.svg" },
];

export function TabImages() {
  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-50 border border-sky-100 rounded-full text-sky-600 text-xs font-medium mb-4">
            <Images size={14} />
            Images
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Images</h1>
          <p className="text-slate-400 text-sm mt-2">
            Images from the public folder
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {publicImages.map((image) => (
            <div
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden"
              key={image.fileName}
            >
              <div className="aspect-square bg-slate-50 flex items-center justify-center overflow-hidden p-4">
                <img
                  alt={image.fileName}
                  className="w-full h-full object-contain"
                  src={image.src}
                />
              </div>
              <div className="p-3 border-t border-slate-100">
                <p
                  className="text-xs font-medium text-slate-700 truncate text-center"
                  title={image.fileName}
                >
                  {image.fileName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
