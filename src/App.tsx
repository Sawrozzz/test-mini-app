import TestMiniApp from "./components/MiniApp";
import { PlatformSDKProvider } from "./providers/PlatformSDKProvider";
import "./index.css";

export default function App({initialPath}: {initialPath?:string}) {
  return (
    <PlatformSDKProvider>
      <TestMiniApp initialPath= {initialPath} />
    </PlatformSDKProvider>
  );
}
