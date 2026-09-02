import { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router";
import { usePlatformSDK } from "./usePlatformSDK";

export const NAVIGATION_EVENTS = {
  BACK_REQUESTED: "navigation.back.requested",
  ROUTE_CHANGED: "navigation.route.changed",
} as const;

export function useHostRouter() {
  const { sdk, isReady } = usePlatformSDK();

  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();

  // For HashRouter the pathname *is* the hash path (e.g. "#/chat" -> "/chat").
  // Using it directly is robust for fast navigations where `location.key`
  // effects can be batched and `PUSH`/`POP` counting races. Any non-root
  // pathname means the mini-app has somewhere to go back to.
  const isRoot = location.pathname === "/" || location.pathname === "";
  const canGoBackRef = useRef(!isRoot);
  canGoBackRef.current = !isRoot;

  const lastKeyRef = useRef<string | null>(null);
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    if (lastKeyRef.current === location.key) {
      return;
    }

    const isFirstNavigation = lastKeyRef.current === null;
    lastKeyRef.current = location.key;

    if (isFirstNavigation) {
      previousPathRef.current = location.pathname;
      // Sync host immediately on first mount if not at root (e.g. deep link)
      if (!isRoot && sdk) {
        sdk.emit(NAVIGATION_EVENTS.ROUTE_CHANGED, {
          previous: previousPathRef.current,
          current: location.pathname,
          canGoBack: true,
        });
        void sdk.navigation.router?.push(true);
      }
      return;
    }

    if (!sdk) {
      return;
    }

    const canGoBack = !isRoot;

    // Keep the host's back-button policy in sync with this app's history,
    // otherwise the host never knows a route was pushed and exits on back.
    sdk.emit(NAVIGATION_EVENTS.ROUTE_CHANGED, {
      previous: previousPathRef.current,
      current: location.pathname,
      canGoBack,
    });

    previousPathRef.current = location.pathname;

    if (!isRoot && navigationType === "PUSH" && sdk.navigation.router.push) {
      void sdk.navigation.router?.push(true);
    }
    // On POP to root, the host will learn canGoBack=false via the emit above;
    // no need to call router.push. On POP to non-root, still canGoBack=true,
    // already emitted.
  }, [location.key, location.pathname, navigationType, sdk, isRoot]);

  const goBack = useCallback(async () => {
    const consumed = canGoBackRef.current;

    await sdk?.navigation.router?.back(consumed);
    if (consumed) {
      navigate(-1);
    }
  }, [navigate, sdk]);

  // Sync host when SDK becomes ready — pushes that happened before the
  // bridge was ready never informed the host.
  useEffect(() => {
    if (!sdk || !isReady) return;
    if (!isRoot) {
      sdk.emit(NAVIGATION_EVENTS.ROUTE_CHANGED, {
        previous: previousPathRef.current,
        current: location.pathname,
        canGoBack: true,
      });
      void sdk.navigation.router?.push(true);
    }
  }, [sdk, isReady, location.pathname, isRoot]);

  useEffect(() => {
    if (!sdk || !isReady) {
      return;
    }

    return sdk.on(NAVIGATION_EVENTS.BACK_REQUESTED, () => {
      void goBack();
    });
  }, [sdk, isReady, goBack]);
}
