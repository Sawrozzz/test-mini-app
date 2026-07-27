import {
  FileText,
  MessageCircle,
  MapPin,
  Camera,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import type { TabId } from "../types";

const features: {
  icon: typeof FileText;
  label: string;
  desc: string;
  gradient: string;
  tab: TabId;
}[] = [
  {
    icon: FileText,
    label: "Test API",
    desc: "View your driving license",
    gradient: "from-blue-500 to-cyan-500",
    tab: "test-api",
  },
  {
    icon: MessageCircle,
    label: "Chat Here",
    desc: "Interact with AI assistant",
    gradient: "from-purple-500 to-pink-500",
    tab: "chat",
  },
  {
    icon: MapPin,
    label: "Location",
    desc: "Check your current location",
    gradient: "from-emerald-500 to-teal-500",
    tab: "location",
  },
  {
    icon: Camera,
    label: "Camera",
    desc: "Capture & preview photos",
    gradient: "from-amber-500 to-orange-500",
    tab: "camera",
  },
];

export function TabHome({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">
          <div className="flex-1 w-full max-w-md mx-auto lg:mx-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/10 to-pink-400/20 rounded-full blur-3xl" />
              <div className="relative flex items-center justify-center">
                <div className="w-56 h-56 md:w-64 md:h-64 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-3xl rotate-12 shadow-2xl shadow-blue-500/20 flex items-center justify-center">
                  <Sparkles size={72} className="text-white/80" />
                </div>
                <div className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl -rotate-12 shadow-lg shadow-amber-500/30 flex items-center justify-center">
                  <Zap size={32} className="text-white" />
                </div>
                <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl rotate-6 shadow-lg shadow-emerald-500/30 flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-medium mb-5">
              <Sparkles size={14} />
              Your Testing Playground
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight mb-4">
              Welcome to
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Mini App
              </span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Your all-in-one testing playground. Explore driving license
              lookup, AI chat, location services, and camera capture — all in
              one place.
            </p>
            <button
              onClick={() => onNavigate("test-api")}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 hover:scale-[1.02] inline-flex items-center gap-2"
            >
              Get Started
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            Explore Features
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Tap any card to jump right in
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {features.map(({ icon: Icon, label, desc, gradient, tab }) => (
            <button
              key={tab}
              onClick={() => onNavigate(tab)}
              className="group relative bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-300 text-left hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}
              >
                <Icon size={22} className="text-white" />
              </div>
              <h3 className="text-slate-800 font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                {label}
              </h3>
              <p className="text-slate-400 text-sm">{desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
