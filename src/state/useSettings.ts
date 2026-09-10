import { useEffect, useState } from "react";
import type { Lang } from "../lib/types";

const STORAGE_KEY = "newport-rising-lang";
const SUPPORTED: Lang[] = ["en", "cy", "pl", "uk", "pa", "ur", "hu"];

function isLang(value: unknown): value is Lang {
  return typeof value === "string" && SUPPORTED.includes(value as Lang);
}

function getInitialLang(): Lang {
  // 1. A language the visitor has chosen before wins.
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    // Private browsing or blocked storage - fall through to detection.
  }

  // 2. Otherwise, try to match the browser's preferred language.
  try {
    for (const tag of navigator.languages ?? [navigator.language]) {
      const base = tag.toLowerCase().split("-")[0];
      if (isLang(base)) return base;
    }
  } catch {
    // Ignore and fall through.
  }

  // 3. Default to English.
  return "en";
}

export function useSettings() {
  const [settings, setSettings] = useState<{ lang: Lang }>(() => ({
    lang: getInitialLang(),
  }));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, settings.lang);
    } catch {
      // Storage unavailable - the choice just won't persist this session.
    }
  }, [settings.lang]);

  const setLang = (lang: Lang) => {
    setSettings((prev) => ({ ...prev, lang }));
  };

  return { settings, setLang };
}