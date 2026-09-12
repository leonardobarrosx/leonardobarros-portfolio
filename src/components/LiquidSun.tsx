import { useEffect, useRef } from "react";
import { motion } from "../state/prefs";

const VERT = `attribute vec2 a; varying vec2 v;
void main() { v = a * 0.5 + 0.5; gl_Position = vec4(a, 0.0, 1.0); }`;

// A perfect disc at rest. Near the pointer, a decaying ripple pushes the disc's edge around; far from it nothing moves.
const FRAG = `precision mediump float; varying vec2 v;
uniform vec2 m; uniform float s; uniform float time; uniform vec3 color; uniform vec3 deep; uniform float px;
void main() {
  vec2 p = v - 0.5;
  vec2 d = v - m; float dist = length(d);
  vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0);
  float near = exp(-dist * 4.0) * s;                 // influence: 1 under the pointer, ~0 far away
  float w = sin(dist * 24.0 - time * 4.5) * near;    // ripple that pushes the edge only near the pointer
  vec2 q = p + dir * w * 0.07;
  float r = length(q);
  vec3 col = mix(color, deep, smoothstep(0.24, 0.47, r) * 0.5);   // soft darker rim, always there
  col += 0.07 * sin(dist * 90.0 - time * 3.5) * near;              // shimmer rings radiating from the pointer
  col += 0.08 * near;                                              // and a faint lift of the colour there
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
    const uM = U("m"), uS = U("s"), uT = U("time"), uColor = U("color"), uDeep = U("deep"), uPx = U("px");
    gl.clearColor(0, 0, 0, 0);

    const css = getComputedStyle(document.documentElement);
    gl.uniform3fv(uColor, hexToRgb(css.getPropertyValue("--accent").trim() || "#6f2ff2"));
    gl.uniform3fv(uDeep, hexToRgb(css.getPropertyValue("--accent-deep").trim() || "#5620c9"));

    let raf = 0, strength = 0, target = 0;
    const t0 = performance.now();
    const mouse = { x: 0.5, y: 0.5 };

    const draw = () => {
      raf = 0;
      strength += (target - strength) * 0.1;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.uniform1f(uS, strength);
      gl.uniform1f(uT, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (strength > 0.002 || target > 0) raf = requestAnimationFrame(draw);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };

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
