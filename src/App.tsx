import { HashRouter } from "react-router";
import { ErrorBoundary } from "./components/ErrorBoundary";
import TestMiniApp from "./components/MiniApp";
import { PlatformSDKProvider } from "./providers/PlatformSDKProvider";
import "./index.css";

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <PlatformSDKProvider>
          <TestMiniApp />
        </PlatformSDKProvider>
      </HashRouter>
    </ErrorBoundary>
  );
}
