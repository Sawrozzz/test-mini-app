import { useMemo } from "react";
import { useAppearance } from "./useAppearance";
import en from "../i18n/en.json";
import si from "../i18n/si.json";
import tam from "../i18n/tam.json";

const DICTIONARIES: Record<string, Record<string, string>> = { en, si, ta: tam };

export interface UseTResult {
  language: string;
  /**
   * Looks up `key` in the active locale's dictionary, falling back to `en`,
   * then to the key itself. Interpolates `{param}` placeholders.
   */
  t(key: string, params?: Record<string, string | number>): string;
}

export function useT(): UseTResult {
  const { locale } = useAppearance();
  const language = locale.language;

  const t = useMemo(() => {
    const dict = DICTIONARIES[language] ?? DICTIONARIES.en;
    return (key: string, params?: Record<string, string | number>): string => {
      const template = dict[key] ?? DICTIONARIES.en[key] ?? key;
      if (!params) return template;
      return template.replace(/\{(\w+)\}/g, (match, name: string) =>
        name in params ? String(params[name]) : match,
      );
    };
  }, [language]);

  return { language, t };
}
