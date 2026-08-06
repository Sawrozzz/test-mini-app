import { HashRouter } from "react-router";
import TestMiniApp from "./components/MiniApp";
import { PlatformSDKProvider } from "./providers/PlatformSDKProvider";
import "./index.css";

export default function App({ initialPath }: { initialPath?: string }) {
  return (
    <HashRouter>
      <PlatformSDKProvider>
        <TestMiniApp initialPath={initialPath} />
      </PlatformSDKProvider>
    </HashRouter>
  );
}
