import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { toRoutePath } from "../routes";

/**
 * The host can mount the mini app on a deep link via `mount(el, { initialPath })`.
 * With HashRouter the hash is the source of truth, so `initialPath` only seeds the
 * very first navigation — and only when the URL carries no hash of its own (e.g. a
 * refresh on `#/camera` wins). Subsequent in-app navigation is left untouched.
 */
export function useInitialPath(initialPath?: string) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const applied = useRef(false);

  useEffect(() => {
    if (applied.current || !initialPath) return;
    applied.current = true;

    const target = toRoutePath(initialPath);
    if (pathname === "/" && target !== "/") {
      navigate(target, { replace: true });
    }
  }, [initialPath, pathname, navigate]);
}
