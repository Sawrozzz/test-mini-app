import { createRoot, type Root } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

export function mount(
  container: HTMLElement,
  runtime?: { initialPath?: string; basename?: string },
) {
  const root: Root = createRoot(container);
  root.render(
    <App initialPath={runtime?.initialPath} basename={runtime?.basename} />,
  );

  return {
    unmount() {
      root.unmount();

    },
  };
}
