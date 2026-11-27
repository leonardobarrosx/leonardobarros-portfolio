import { useEffect, useRef } from "react";
import { motion } from "../state/prefs";

const VERT = `attribute vec2 a; varying vec2 v;
void main() { v = a * 0.5 + 0.5; gl_Position = vec4(a, 0.0, 1.0); }`;

// A perfect disc at rest. Near the pointer, a decaying ripple pushes the disc's edge around; far from it nothing moves.
const FRAG = `precision mediump float; varying vec2 v;
uniform vec2 m; uniform float s; uniform float time; uniform vec3 color; uniform vec3 deep; uniform float px;
// four stones at once: xy where it landed, z how hard, w how long ago
uniform vec4 hits[4];
void main() {
  vec2 q_off = vec2(0.0);
  vec2 p = v - 0.5;
  vec2 d = v - m; float dist = length(d);
  vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0);
  float near = exp(-dist * 4.0) * s;                 // influence: 1 under the pointer, ~0 far away
  float w = sin(dist * 24.0 - time * 4.5) * near;    // ripple that pushes the edge only near the pointer
  float rings = 0.0;
  for (int i = 0; i < 4; i++) {
    float amp = hits[i].z;
    if (amp <= 0.001) continue;
    vec2 hd = v - hits[i].xy; float hdist = length(hd);
    float age = hits[i].w;
    float front = hdist - age * 0.5;                        // the ring travels outward from the impact
    float wave = sin(front * 44.0) * exp(-front * front * 24.0);   // a crest with its trough behind
    float ring = wave * exp(-age * 1.3) * exp(-hdist * 0.7) * amp;
    float core = exp(-hdist * hdist * (260.0 - 90.0 * amp)) * exp(-age * 2.6) * amp;  // the stone itself
    vec2 hdir = hdist > 0.0001 ? hd / hdist : vec2(0.0);
    q_off += hdir * ring * 0.1;
    rings += ring * 0.75 + core;
  }
  vec2 q = p + dir * w * 0.07 + q_off;
  float r = length(q);
  vec3 col = mix(color, deep, smoothstep(0.24, 0.47, r) * 0.5);   // soft darker rim, always there
  col += 0.07 * sin(dist * 90.0 - time * 3.5) * near;              // shimmer rings radiating from the pointer
  col += 0.08 * near;                                              // and a faint lift of the colour there
  col += 0.42 * rings;                                             // the crest of each ring catches the light
  float a = 1.0 - smoothstep(0.47 - px, 0.47 + px, r);
  gl_FragColor = vec4(col, a);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src); gl.compileShader(sh);
  return sh;
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/**
 * The hero's disc. Listens to pointer movement on `area` (the hero) so the ripple can start as the
 * pointer reaches the edge, but only distorts while the pointer is over the disc's box.
 * Falls back to the plain CSS circle when WebGL is unavailable or motion is off.
 */
export function LiquidSun({ area }: { area: React.RefObject<HTMLElement | null> }) {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = box.current, cv = canvas.current, hero = area.current;
    if (!host || !cv || !hero || !motion.enabled || window.matchMedia("(hover: none)").matches) return;
    const gl = cv.getContext("webgl", { antialias: true, premultipliedAlpha: false, alpha: true });
    if (!gl) return;
    host.classList.add("is-gl");

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const a = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uM = U("m"), uS = U("s"), uT = U("time"), uColor = U("color"), uDeep = U("deep"), uPx = U("px"), uHits = U("hits");
    gl.clearColor(0, 0, 0, 0);

    // Disc colours follow the theme tokens; on a theme change they ease over instead of snapping.
    const readTheme = (): [number[], number[]] => {
      const css = getComputedStyle(document.documentElement);
      return [hexToRgb(css.getPropertyValue("--accent").trim() || "#6f2ff2"), hexToRgb(css.getPropertyValue("--accent-deep").trim() || "#5620c9")];
    };
    let [color, deep] = readTheme();
    let [colorTo, deepTo] = [color, deep];
    let tinting = false;

    let raf = 0, strength = 0, target = 0;
    /* Each click drops a stone: x, y, amplitude, age. A new click takes the slot of the oldest ring,
       so clicking again layers another wave over the ones still travelling instead of restarting. */
    const hits = new Float32Array(16);
    let last = 0;
    const addHit = (nx: number, ny: number, power: number) => {
      let slot = 0, oldest = -1;
      for (let i = 0; i < 4; i++) {
        const age = hits[i * 4 + 3], amp = hits[i * 4 + 2];
        const score = amp <= 0.001 ? 1e6 : age;
        if (score > oldest) { oldest = score; slot = i; }
      }
      hits[slot * 4] = nx;
      hits[slot * 4 + 1] = ny;
      hits[slot * 4 + 2] = Math.min(0.55 + power * 0.35, 1.8);
      hits[slot * 4 + 3] = 0;
    };
    const t0 = performance.now();
    const mouse = { x: 0.5, y: 0.5 };

    const draw = () => {
      raf = 0;
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      strength += (target - strength) * 0.1;
      let live = false;
      for (let i = 0; i < 4; i++) {
        if (hits[i * 4 + 2] <= 0.001) continue;
        hits[i * 4 + 3] += dt;
        hits[i * 4 + 2] *= 1 - dt * 1.35;            // the ring loses its energy as it travels
        if (hits[i * 4 + 2] <= 0.001 || hits[i * 4 + 3] > 3) hits[i * 4 + 2] = 0;
        else live = true;
      }
      gl.uniform4fv(uHits, hits);
      if (tinting) {
        let d = 0;
        color = color.map((c, i) => { const n = c + (colorTo[i] - c) * 0.12; d += Math.abs(colorTo[i] - n); return n; });
        deep = deep.map((c, i) => { const n = c + (deepTo[i] - c) * 0.12; d += Math.abs(deepTo[i] - n); return n; });
        if (d < 0.004) { color = colorTo; deep = deepTo; tinting = false; }
        gl.uniform3fv(uColor, color);
        gl.uniform3fv(uDeep, deep);
      }
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.uniform1f(uS, strength);
      gl.uniform1f(uT, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (strength > 0.002 || target > 0 || tinting || live) raf = requestAnimationFrame(draw);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };
    gl.uniform3fv(uColor, color);
    gl.uniform3fv(uDeep, deep);

    // a click near the disc drops a stone in it
    const shot = (e: Event) => {
      const { x, y, power } = (e as CustomEvent<{ x: number; y: number; power: number }>).detail;
      const r = host.getBoundingClientRect();
      const nx = (x - r.left) / r.width, ny = 1 - (y - r.top) / r.height;
      if (nx < -0.6 || nx > 1.6 || ny < -0.6 || ny > 1.6) return;
      addHit(nx, ny, power);
      last = performance.now();
      kick();
    };
    window.addEventListener("lb:shot", shot);

    const retint = () => {
      // tokens land on <html> synchronously; read them on the next frame so the swap is complete
      requestAnimationFrame(() => { [colorTo, deepTo] = readTheme(); tinting = true; kick(); });
    };
    window.addEventListener("lb:theme", retint);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // layout size: unaffected by the intro scale / parallax transforms on the host
      const w = host.clientWidth, h = host.clientHeight;
      cv.width = Math.max(1, Math.round(w * dpr)); cv.height = Math.max(1, Math.round(h * dpr));
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform1f(uPx, 1.2 / cv.width);
      kick();
    };

    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = 1 - (e.clientY - r.top) / r.height;
      mouse.x = x; mouse.y = y;
      const inside = x > -0.08 && x < 1.08 && y > -0.08 && y < 1.08;
      target = inside ? 1 : 0;
      if (inside || strength > 0.002) kick();
    };
    const leave = () => { target = 0; kick(); };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      window.removeEventListener("lb:theme", retint);
      window.removeEventListener("lb:shot", shot);
      host.classList.remove("is-gl");
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [area]);

  return (
    <div className="hero__sun" ref={box} aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  );
}
