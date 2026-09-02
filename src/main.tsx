import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

export function mount(
  container: HTMLElement,
  runtime?: { initialPath?: string },
) {
  const root: Root = createRoot(container);
  void runtime?.initialPath;
  root.render(<App />);

  return {
    unmount() {
      root.unmount();
    },
  };
}
