import { MessageCircle, Sparkles, Send, ArrowRight } from "lucide-react";

export function TabChat({
  navLoading,
  navResult,
  onNavigate,
}: {
  navLoading: boolean;
  navResult: string;
  onNavigate: () => void;
}) {
  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14 flex items-center justify-center">
      <div className="max-w-lg w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-100 rounded-full text-purple-600 text-xs font-medium mb-4">
            <Sparkles size={14} />
            Chat Feature
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Chat Here</h1>
          <p className="text-slate-400 text-sm mt-2">
            Start a conversation with our AI assistant
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 md:p-10">
          <div className="flex flex-col items-center">
            <div className="relative mb-8">
              <div className="w-36 h-36 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-3xl rotate-6 shadow-xl shadow-purple-500/20 flex items-center justify-center">
                <MessageCircle size={56} className="text-white/90" />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <Sparkles size={20} className="text-purple-500" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                <Send size={16} className="text-purple-400" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mb-2">
              AI Chat Assistant
            </h2>
            <p className="text-slate-400 text-sm text-center mb-8 max-w-xs">
              Tap the button below to start chatting with our intelligent AI
              assistant.
            </p>

            <button
              onClick={onNavigate}
              disabled={navLoading}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              {navLoading ? (
                "Processing..."
              ) : (
                <>
                  Chat Now
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </div>

          {navResult && (
            <div
              className={`mt-6 p-4 rounded-2xl text-sm font-mono border ${
                navResult.startsWith("Error")
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              {navResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
