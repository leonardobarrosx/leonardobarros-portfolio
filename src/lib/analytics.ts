/**
 * Privacy-friendly page analytics. Cloudflare Web Analytics sets no cookies and needs no consent
 * banner, so it can load for everyone. Paste the token from the Cloudflare dashboard below (or set
 * VITE_ANALYTICS_TOKEN at build time) and it starts reporting; empty means no script is loaded.
 */
const TOKEN = import.meta.env.VITE_ANALYTICS_TOKEN ?? "";

export function loadAnalytics() {
  if (!TOKEN || location.hostname === "localhost") return;
  const s = document.createElement("script");
  s.defer = true;
  s.src = "https://static.cloudflareinsights.com/beacon.min.js";
  s.dataset.cfBeacon = JSON.stringify({ token: TOKEN });
  document.head.appendChild(s);
}
