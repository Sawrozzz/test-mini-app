import { ArrowLeft, ChevronsDown, Layers, Radio, Smartphone } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

const ROUTER_ROOT = "/router";

export function TabRouter({
  depth,
  canGoBack,
  log,
  onBack,
}: {
  depth: number;
  canGoBack: boolean;
  log: string[];
  onBack: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Each push appends a segment, so the URL itself shows how deep the stack
  // is: /router -> /router/level-1 -> /router/level-1/level-2 -> ...
  const pushDeeper = () => {
    navigate(`${location.pathname.replace(/\/$/, "")}/level-${depth + 1}`);
  };

  return (
    <div className="min-h-full p-6 md:p-10 lg:p-14">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-medium mb-4">
            <Radio size={14} />
            navigation.router
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Native Back Button</h1>
          <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
            Push a few routes, then press the phone's back button. The host
            asks first; this app pops a route and answers{" "}
            <code className="font-mono text-slate-500">consumed=true</code>{" "}
            until there is nothing left to pop.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
              <Layers size={14} />
              Stack depth
            </div>
            <p className="text-3xl font-bold text-slate-800">{depth}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
              <Smartphone size={14} />
              Next back press
            </div>
            <p
              className={`text-sm font-semibold mt-2 ${
                canGoBack ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              {canGoBack ? "Handled here" : "Exits the mini app"}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
            Current route
          </p>
          <p className="font-mono text-sm text-slate-700 break-all mb-5">
            {location.pathname}
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={pushDeeper}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 hover:scale-[1.02]"
            >
              <ChevronsDown size={16} />
              Push a route
            </button>

            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all duration-200"
            >
              <ArrowLeft size={16} />
              Back (same path as the host)
            </button>

            {location.pathname !== ROUTER_ROOT && (
              <button
                onClick={() => navigate(ROUTER_ROOT, { replace: true })}
                className="inline-flex items-center gap-2 text-slate-400 px-3 py-2.5 rounded-xl font-medium text-sm hover:text-slate-600 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
            Bridge activity
          </p>
          {log.length === 0 ? (
            <p className="text-slate-600 text-sm font-mono">
              Nothing yet — push a route or press back.
            </p>
          ) : (
            <ul className="space-y-1.5 max-h-64 overflow-y-auto">
              {log.map((line, index) => (
                <li
                  key={`${line}-${index}`}
                  className={`font-mono text-xs break-all ${
                    index === 0 ? "text-emerald-400" : "text-slate-400"
                  }`}
                >
                  {line}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
