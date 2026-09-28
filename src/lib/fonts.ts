/**
 * Korean and Chinese faces are large and only the ko and zh versions of the site need them, so they
 * are requested the first time one of those languages is selected. Japanese ships with the page
 * because the katakana and kanji decoration appears in every language.
 */
const LOADED = new Set<string>();

const FAMILIES: Record<string, string> = {
  ko: "Noto+Sans+KR:wght@400;700;900",
  zh: "Noto+Sans+SC:wght@400;700;900",
};

export function loadFontsFor(lang: string) {
  const family = FAMILIES[lang];
  if (!family || LOADED.has(lang)) return;
  LOADED.add(lang);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
  document.head.appendChild(link);
}
