/** Section label: "01 / Title  ———" with a katakana/kanji accent. The rule is animated by useReveal. */
export function Label({ n, text, jp }: { n: string; text: string; jp?: string }) {
  return (
    <div className="label">
      <span className="mono">{n} / {text}</span>
      {jp && <span className="label__jp jp">{jp}</span>}
      <span className="label__rule" aria-hidden="true" />
    </div>
  );
}
