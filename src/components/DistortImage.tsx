import { useEffect, useRef } from "react";
import { motion } from "../state/prefs";

const VERT = `attribute vec2 a; varying vec2 v;
void main() { v = a * 0.5 + 0.5; gl_Position = vec4(a, 0.0, 1.0); }`;

// Cover-fit sampling, then a decaying ripple around the pointer with a touch of chromatic aberration.
const FRAG = `precision mediump float; varying vec2 v;
uniform sampler2D t; uniform vec2 m; uniform float s; uniform float time; uniform vec2 res; uniform vec2 tres;
// four stones at once: xy where it landed, z how hard, w how long ago
uniform vec4 hits[4];
void main() {
  float ra = res.x / res.y, ta = tres.x / tres.y; vec2 uv = v;
  if (ra > ta) { uv.y = (uv.y - 0.5) * (ta / ra) + 0.5; } else { uv.x = (uv.x - 0.5) * (ra / ta) + 0.5; }
  vec2 asp = vec2(ra, 1.0);
  vec2 d = (v - m) * asp; float dist = length(d);
  vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0);
  float w = sin(dist * 26.0 - time * 5.0) * exp(-dist * 3.2) * s;
  vec2 off = dir * w * 0.04;
  float rings = 0.0;
  for (int i = 0; i < 4; i++) {
    float amp = hits[i].z;
    if (amp <= 0.001) continue;
    vec2 hd = (v - hits[i].xy) * asp; float hdist = length(hd);
    float age = hits[i].w;
    float front = hdist - age * 0.45;
    float wave = sin(front * 46.0) * exp(-front * front * 36.0);
    float ring = wave * exp(-age * 1.35) * exp(-hdist * 1.7) * amp;
    float core = exp(-hdist * hdist * (620.0 - 140.0 * amp)) * exp(-age * 3.0) * amp;
    vec2 hdir = hdist > 0.0001 ? hd / hdist : vec2(0.0);
    off += hdir * ring * 0.034;
    rings += ring * 0.6 + core;
  }
  float r = texture2D(t, uv + off + dir * 0.010 * s).r;
  float g = texture2D(t, uv + off).g;
  float b = texture2D(t, uv + off - dir * 0.010 * s).b;
  gl_FragColor = vec4(vec3(r, g, b) + 0.16 * rings, 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src); gl.compileShader(sh);
  return sh;
}

/**
 * Image with a pointer-driven WebGL ripple. Falls back to the plain <img> when WebGL is unavailable or motion is off.
 * The <img> is always rendered underneath so layout and the first paint never depend on the canvas.
 */
interface Source { type: string; srcSet: string }

export function DistortImage({ src, alt, width, height, className, sources, sizes }: { src: string; alt: string; width: number; height: number; className?: string; sources?: Source[]; sizes?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = wrap.current, cv = canvas.current;
    if (!host || !cv || !motion.enabled || window.matchMedia("(hover: none)").matches) return;
    const gl = cv.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

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
    const uM = U("m"), uS = U("s"), uT = U("time"), uRes = U("res"), uTres = U("tres"), uHits = U("hits");

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let ready = false, raf = 0, strength = 0, target = 0;
    /* Each click drops a stone: x, y, amplitude, age. A new one takes the slot of the oldest ring so
       the waves pile up instead of the newest cancelling the rest. */
    const hits = new Float32Array(16);
    let last = 0;
    const addHit = (nx: number, ny: number, power: number) => {
      let slot = 0, oldest = -1;
      for (let i = 0; i < 4; i++) {
        const score = hits[i * 4 + 2] <= 0.001 ? 1e6 : hits[i * 4 + 3];
        if (score > oldest) { oldest = score; slot = i; }
      }
      hits[slot * 4] = nx;
      hits[slot * 4 + 1] = ny;
      hits[slot * 4 + 2] = Math.min(0.6 + power * 0.4, 2);
      hits[slot * 4 + 3] = 0;
    };
    const t0 = performance.now();
    const mouse = { x: 0.5, y: 0.5 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = host.getBoundingClientRect();
      cv.width = Math.max(1, Math.round(r.width * dpr)); cv.height = Math.max(1, Math.round(r.height * dpr));
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(uRes, cv.width, cv.height);
    };

    const draw = () => {
      raf = 0;
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      strength += (target - strength) * 0.08;
      let live = false;
      for (let i = 0; i < 4; i++) {
        if (hits[i * 4 + 2] <= 0.001) continue;
        hits[i * 4 + 3] += dt;
        hits[i * 4 + 2] *= 1 - dt * 1.3;
        if (hits[i * 4 + 2] <= 0.001 || hits[i * 4 + 3] > 3) hits[i * 4 + 2] = 0;
        else live = true;
      }
      gl.uniform4fv(uHits, hits);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.uniform1f(uS, strength);
      gl.uniform1f(uT, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (strength > 0.002 || target > 0 || live) raf = requestAnimationFrame(draw);
      else cv.style.opacity = "0";
    };
    const kick = () => { if (!raf && ready) { cv.style.opacity = "1"; raf = requestAnimationFrame(draw); } };

    const img = new Image();
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.uniform2f(uTres, img.naturalWidth, img.naturalHeight);
      resize();
      ready = true;
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    img.src = src;

    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = 1 - (e.clientY - r.top) / r.height;
      kick();
    };
    const enter = () => { target = 1; kick(); };
    // a click on the photo drops a stone where it landed
    const shot = (e: Event) => {
      const { x, y, power } = (e as CustomEvent<{ x: number; y: number; power: number }>).detail;
      const r = host.getBoundingClientRect();
      const nx = (x - r.left) / r.width, ny = 1 - (y - r.top) / r.height;
      if (nx < -0.25 || nx > 1.25 || ny < -0.25 || ny > 1.25) return;
      addHit(nx, ny, power);
      last = performance.now();
      kick();
    };
    window.addEventListener("lb:shot", shot);
    const leave = () => { target = 0; kick(); };
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    const ro = new ResizeObserver(() => { if (ready) { resize(); kick(); } });
    ro.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("lb:shot", shot);
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [src]);

  return (
    <div className={`distort ${className ?? ""}`} ref={wrap}>
      <picture>
        {sources?.map((s) => <source key={s.type} type={s.type} srcSet={s.srcSet} sizes={sizes} />)}
        <img src={src} alt={alt} width={width} height={height} sizes={sizes} loading="lazy" decoding="async" />
      </picture>
      <canvas ref={canvas} aria-hidden="true" />
    </div>
  );
}
