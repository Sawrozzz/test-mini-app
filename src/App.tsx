import MiniRevenueLicenseApp from "./components/MiniApp";
import { PlatformSDKProvider } from "./providers/PlatformSDKProvider";
import "./index.css";

export default function App() {
  return (
    <PlatformSDKProvider>
      <MiniRevenueLicenseApp />
    </PlatformSDKProvider>
  );
}
