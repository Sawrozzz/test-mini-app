import { createRoot, type Root } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

export function mount(container: HTMLElement) {
  const root: Root = createRoot(container);
  root.render(
      <App />
  );

  return {
    unmount() {
      root.unmount();
    },
  };
}
