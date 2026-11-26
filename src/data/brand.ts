import type { Lang } from "./i18n/types";

/**
 * LAB: the monogram of Leonardo de Araujo Barros, which also reads as a lab, the place where
 * things get built and tested. These lines say so wherever the mark is explained.
 */
export const brandNote: Record<Lang, [string, string, string]> = {
  en: ["L.A.B.", "Leonardo de Araujo Barros", "+ a software lab"],
  pt: ["L.A.B.", "Leonardo de Araujo Barros", "+ laboratório de software"],
  es: ["L.A.B.", "Leonardo de Araujo Barros", "+ laboratorio de software"],
  de: ["L.A.B.", "Leonardo de Araujo Barros", "+ Software-Labor"],
  ja: ["L.A.B.", "Leonardo de Araujo Barros", "+ ソフトウェア・ラボ"],
  ko: ["L.A.B.", "Leonardo de Araujo Barros", "+ 소프트웨어 랩"],
  zh: ["L.A.B.", "Leonardo de Araujo Barros", "+ 软件实验室"],
};
