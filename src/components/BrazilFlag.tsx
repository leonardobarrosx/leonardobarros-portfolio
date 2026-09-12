/** Brazilian flag drawn in the site's violet by default; hover restores the real colours. */
export function BrazilFlag({ title = "Brasil" }: { title?: string }) {
  return (
    <svg className="flag" viewBox="0 0 28 20" width="28" height="20" role="img" aria-label={title}>
      <rect className="flag__g" width="28" height="20" rx="1.5" />
      <path className="flag__y" d="M14 2.6 25.4 10 14 17.4 2.6 10Z" />
      <circle className="flag__b" cx="14" cy="10" r="4.7" />
      <path className="flag__band" d="M9.7 9.1c3.1-1.4 6.2-0.9 8.7 1.4" />
    </svg>
  );
}
