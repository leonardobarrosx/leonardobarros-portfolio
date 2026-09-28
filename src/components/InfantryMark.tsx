/**
 * Brazilian Army infantry mark: the crossed rifles, drawn as flat geometry in the site's own
 * language rather than a scanned insignia, so it carries the active theme like everything else.
 * One rifle is built pointing up and then mirrored, which keeps the cross symmetrical.
 */
function Rifle({ deg }: { deg: number }) {
  return (
    <g transform={`rotate(${deg} 32 32)`}>
      {/* barrel, from the muzzle down to the receiver */}
      <rect className="inf__body" x="30.6" y="11" width="2.8" height="22" rx="0.6" />
      {/* front sight and muzzle */}
      <rect className="inf__detail" x="29.2" y="12.4" width="5.6" height="2.2" rx="0.6" />
      {/* receiver */}
      <rect className="inf__body" x="28.8" y="31" width="6.4" height="12" rx="1" />
      {/* magazine, angled forward */}
      <path className="inf__detail" d="M28.6 35.6 L23.4 39.4 L25.6 45.6 L30.4 42.6 Z" />
      {/* grip and butt stock */}
      <path className="inf__body" d="M29 42.4 L35.2 42.4 L36.6 53.4 L31.4 55 L28.4 50.6 Z" />
      {/* butt plate */}
      <rect className="inf__detail" x="30.4" y="52.6" width="6.6" height="2.4" rx="0.8" transform="rotate(-8 33.7 53.8)" />
    </g>
  );
}

export function InfantryMark({ title }: { title: string }) {
  return (
    <svg className="inf" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label={title}>
      <circle className="inf__ring" cx="32" cy="32" r="30.5" />
      <g className="inf__rifles">
        <Rifle deg={-34} />
        <Rifle deg={34} />
      </g>
    </svg>
  );
}
