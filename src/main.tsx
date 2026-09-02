import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/** Sets the initial hash so HashRouter starts at the host-provided path. */
function applyInitialHash(initialPath?: string) {
  if (!initialPath) return;
  const normalized = initialPath.startsWith("/")
    ? initialPath
    : `/${initialPath}`;
  if (
    !window.location.hash ||
    window.location.hash === "#" ||
    !window.location.hash.startsWith("#/")
  ) {
    window.location.replace(`#${normalized}`);
  }
  // If the host already set the hash (e.g. deep link), leave it alone.
}

export function mount(
  container: HTMLElement,
  runtime?: { initialPath?: string },
) {
  const root: Root = createRoot(container);
  applyInitialHash(runtime?.initialPath);

  root.render(<App />);

  return {
    unmount() {
      root.unmount();
    },
  };
}
