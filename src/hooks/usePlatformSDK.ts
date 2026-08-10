import { useContext } from "react";
import { SDKContext, type SDKContextValue } from "../context/SDKContext";

export function usePlatformSDK(): SDKContextValue & { sdk: MiniAppSdk } {
  const ctx = useContext(SDKContext);
  if (!ctx.sdk) {
    throw new Error("usePlatformSDK must be used within PlatformSdkProvider");
  }
  return { ...ctx, sdk: ctx.sdk };
}
