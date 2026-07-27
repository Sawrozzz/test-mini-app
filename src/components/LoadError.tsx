export function LoadError({
  message = "Failed to load the application.",
}: {
  message?: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center shadow-lg">
        <div className="mb-4 text-5xl">⚠️</div>

        <h1 className="mb-2 text-2xl font-semibold text-gray-900">
          Failed to Load
        </h1>

        <p className="mb-6 text-sm text-gray-600">{message}</p>

        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
