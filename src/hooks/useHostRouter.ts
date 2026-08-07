import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router";
import { usePlatformSDK } from "./usePlatformSDK";

/**
 * Mirrors `NAVIGATION_EVENTS` in the SDK. This app reaches the SDK through
 * `window.__GSA_SDK__` instead of importing the package, so the names are
 * repeated here — they are part of the wire contract and must not drift
 * from the SDK's copy.
 */
export const NAVIGATION_EVENTS = {
  /** host -> mini app: the native back button was pressed. */
  BACK_REQUESTED: "navigation.back.requested",
  /** mini app -> host: this app's own router moved. */
  ROUTE_CHANGED: "navigation.route.changed",
} as const;

const MAX_LOG_ENTRIES = 15;

export interface HostRouterState {
  /** Entries this app has pushed and not yet popped. 0 = on the entry route. */
  depth: number;
  canGoBack: boolean;
  /** Newest-first trace of what crossed the bridge, for the Router tab. */
  log: string[];
  /** The exact routine the native back button triggers, exposed for manual testing. */
  goBack: () => void;
}

/**
 * Bridges this app's `MemoryRouter` to the host's back button.
 *
 * The host holds the native back press and publishes
 * `navigation.back.requested` instead of closing the WebView. This hook
 * answers it with `navigation.router.back(consumed)`: `true` when there was
 * a route to pop (the host keeps the container open), `false` when the app
 * is on its entry route (the host takes the press back and exits). Forward
 * moves are reported with `navigation.router.push()` so the host knows the
 * app has history before the next press arrives.
 *
 * Call this once, inside both the router and the SDK provider.
 */
export function useHostRouter(): HostRouterState {
  const { sdk, isReady } = usePlatformSDK();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();

  const [depth, setDepth] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  // The stack depth as of *right now*: the back handler runs from an event
  // callback, where a state value would be a stale closure.
  const depthRef = useRef(0);
  const countedKeyRef = useRef<string | null>(null);
  const previousPathRef = useRef<string | null>(null);

  const append = useCallback((line: string) => {
    const stamp = new Date().toLocaleTimeString();
    setLog((prev) => [`${stamp}  ${line}`, ...prev].slice(0, MAX_LOG_ENTRIES));
  }, []);

  /**
   * `MemoryRouter` keeps its stack private, so depth is counted here: PUSH
   * adds an entry, POP removes one, REPLACE swaps in place. Keyed on
   * `location.key` so a re-run of this effect can never double-count the
   * same navigation.
   */
  useEffect(() => {
    if (countedKeyRef.current === location.key) return;
    const isFirstRender = countedKeyRef.current === null;
    countedKeyRef.current = location.key;

    if (!isFirstRender) {
      if (navigationType === "PUSH") depthRef.current += 1;
      else if (navigationType === "POP") {
        depthRef.current = Math.max(0, depthRef.current - 1);
      }
      setDepth(depthRef.current);
    }

    const previous = previousPathRef.current;
    previousPathRef.current = location.pathname;
    if (isFirstRender || !sdk) return;

    // Tell the host where this app now is, so its back-button policy stays
    // in sync without polling `navigation.getCurrent()`.
    sdk.emit(NAVIGATION_EVENTS.ROUTE_CHANGED, {
      previous,
      current: location.pathname,
      canGoBack: depthRef.current > 0,
    });

    if (navigationType !== "PUSH") return;

    // A host still shipping an SDK build from before `navigation.router`
    // exists — degrade to a log line instead of throwing on every push.
    if (!sdk.navigation.router) {
      append("navigation.router missing — host is on an older SDK build");
      return;
    }

    void sdk.navigation.router
      .push(true)
      .then((result) =>
        append(`push("${location.pathname}") -> consumed=${result.consumed}`),
      )
      .catch((error: unknown) =>
        append(
          `push("${location.pathname}") failed: ${error instanceof Error ? error.message : String(error)}`,
        ),
      );
  }, [location.key, location.pathname, navigationType, sdk, append]);

  const goBack = useCallback(async () => {
    const consumed = depthRef.current > 0;

    // Pop first so the app is already on the previous route by the time the
    // host acts on the answer.
    if (consumed) navigate(-1);

    if (!sdk) {
      append(`back(${consumed}) skipped — SDK not ready`);
      return;
    }

    if (!sdk.navigation.router) {
      append("navigation.router missing — host is on an older SDK build");
      return;
    }

    try {
      const result = await sdk.navigation.router.back(consumed);
      append(
        `back(${consumed}) -> consumed=${result.consumed}${
          result.consumed ? "" : " (host exits the mini app)"
        }`,
      );
    } catch (error) {
      append(
        `back(${consumed}) failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }, [sdk, navigate, append]);

  // Subscribe once per SDK instance; the handler always reads the latest
  // `goBack` so the subscription doesn't churn on every render.
  const goBackRef = useRef(goBack);
  useEffect(() => {
    goBackRef.current = goBack;
  }, [goBack]);

  useEffect(() => {
    if (!sdk || !isReady) return;
    return sdk.on(NAVIGATION_EVENTS.BACK_REQUESTED, () => {
      append("host -> navigation.back.requested");
      void goBackRef.current();
    });
  }, [sdk, isReady, append]);

  return {
    depth,
    canGoBack: depth > 0,
    log,
    goBack: () => void goBackRef.current(),
  };
}
