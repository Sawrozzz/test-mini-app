import { createContext } from "react";

export interface SDKContextValue {
  sdk: any | null;
  user: any | null;
  isReady: boolean;
  error: Error | null;
}

export const SDKContext = createContext<SDKContextValue>({
  sdk: null,
  user: null,
  isReady: false,
  error: null,
});
