import { BrowserRouter } from "react-router";
import TestMiniApp from "./components/MiniApp";
import { PlatformSDKProvider } from "./providers/PlatformSDKProvider";
import "./index.css";

export default function App({
  initialPath,
  basename,
}: {
  initialPath?: string;
  basename?: string;
}) {
  return (
    <BrowserRouter basename={basename}>
      <PlatformSDKProvider>
        <TestMiniApp initialPath={initialPath} />
      </PlatformSDKProvider>
    </BrowserRouter>
  );
}
