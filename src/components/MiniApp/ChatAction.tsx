export function ChatAction({
  navLoading,
  navResult,
  onNavigate,
}: {
  navLoading: boolean;
  navResult: string;
  onNavigate: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
      <button
        onClick={onNavigate}
        disabled={navLoading}
        className="bg-blue-600 text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-50 w-full transition shadow-md shadow-blue-500/10 flex items-center justify-center gap-2"
      >
        {navLoading ? (
          "Processing..."
        ) : (
          <>
            <span>🤖</span>
            <span>Chat With AI</span>
          </>
        )}
      </button>

      {navResult && (
        <pre
          className={`text-left font-mono text-[11px] p-4 rounded-xl overflow-auto max-h-40 border ${
            navResult.startsWith("Error")
              ? "bg-rose-50 text-rose-700 border-rose-100"
              : "bg-emerald-50 text-emerald-700 border-emerald-100"
          }`}
        >
          {navResult}
        </pre>
      )}
    </div>
  );
}
