/**
 * Brazilian Army infantry mark: two crossed rifles with the grenade above the crossing, following the
 * shape of the branch insignia but drawn here as flat geometry in the site's own language, so it
 * carries the active theme and the dark scheme instead of sitting on the page as a foreign sticker.
 * The rifle is built pointing right and then mirrored, which keeps the cross symmetrical.
 */
function Rifle({ flip }: { flip?: boolean }) {
  const t = `rotate(${flip ? 26 : -26} 32 37)${flip ? " translate(64 0) scale(-1 1)" : ""}`;
  return (
    <g transform={t}>
      {/* butt: flared heel into the small of the stock */}
      <path className="inf__body" d="M2.6 41.2 3.4 34.4 13 34 13.6 39.8 Z" />
      <path className="inf__body" d="M12.8 34.6 H23.4 l0.4 4.6 H13.4 Z" />
      {/* lock plate and trigger guard */}
      <rect className="inf__detail" x="21.4" y="33.8" width="5.2" height="5.4" rx="1" />
      <path className="inf__body" d="M26.2 35 H31 v3.4 h-4.8 Z" />
      {/* barrel to the muzzle */}
      <rect className="inf__body" x="30" y="35.2" width="29" height="2.2" rx="1.1" />
      <rect className="inf__detail" x="46.6" y="34.2" width="1.8" height="4.2" rx="0.6" />
      <rect className="inf__body" x="58" y="34.4" width="4" height="3.8" rx="1.2" />
    </g>
  );
}

export function InfantryMark({ title }: { title: string }) {
  return (
    <svg className="inf" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label={title}>
      <circle className="inf__ring" cx="32" cy="32" r="30.5" />
      <g className="inf__rifles">
        <Rifle />
        <Rifle flip />
      </g>
      {/* the grenade sits above the crossing */}
      <g className="inf__grenade">
        <circle className="inf__body" cx="32" cy="21.4" r="5" />
        <path className="inf__body" d="M30.2 16.4 h3.6 l0.6 -2.4 -1.6 -0.7 -0.8 1.5 -1 -1.9 -1.7 1 Z" />
        <circle className="inf__detail" cx="32" cy="21.4" r="2" />
      </g>
    </svg>
  );
}
