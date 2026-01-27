import { useState } from "react";
import type { Lang } from "../lib/types";

export function useSettings() {
  const [settings, setSettings] = useState<{ lang: Lang }>({ lang: "en" });
  
  const setLang = (lang: Lang) => {
    setSettings((prev) => ({ ...prev, lang }));
  };

  return { settings, setLang };
}