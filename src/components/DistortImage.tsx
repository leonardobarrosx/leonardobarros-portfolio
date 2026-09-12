import { useEffect, useRef } from "react";
import { motion } from "../state/prefs";

const VERT = `attribute vec2 a; varying vec2 v;
void main() { v = a * 0.5 + 0.5; gl_Position = vec4(a, 0.0, 1.0); }`;

// Cover-fit sampling, then a decaying ripple around the pointer with a touch of chromatic aberration.
const FRAG = `precision mediump float; varying vec2 v;
uniform sampler2D t; uniform vec2 m; uniform float s; uniform float time; uniform vec2 res; uniform vec2 tres;
void main() {
  float ra = res.x / res.y, ta = tres.x / tres.y; vec2 uv = v;
  if (ra > ta) { uv.y = (uv.y - 0.5) * (ta / ra) + 0.5; } else { uv.x = (uv.x - 0.5) * (ra / ta) + 0.5; }
  vec2 asp = vec2(ra, 1.0);
  vec2 d = (v - m) * asp; float dist = length(d);
  vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0);
  float w = sin(dist * 26.0 - time * 5.0) * exp(-dist * 3.2) * s;
  vec2 off = dir * w * 0.04;
  float r = texture2D(t, uv + off + dir * 0.010 * s).r;
  float g = texture2D(t, uv + off).g;
  float b = texture2D(t, uv + off - dir * 0.010 * s).b;
  gl_FragColor = vec4(r, g, b, 1.0);
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
export function DistortImage({ src, alt, width, height, className }: { src: string; alt: string; width: number; height: number; className?: string }) {
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
    const uM = U("m"), uS = U("s"), uT = U("time"), uRes = U("res"), uTres = U("tres");

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let ready = false, raf = 0, strength = 0, target = 0, t0 = performance.now();
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
      strength += (target - strength) * 0.08;
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.uniform1f(uS, strength);
      gl.uniform1f(uT, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (strength > 0.002 || target > 0) raf = requestAnimationFrame(draw);
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
    const leave = () => { target = 0; kick(); };
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    const ro = new ResizeObserver(() => { if (ready) { resize(); kick(); } });
    ro.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [src]);

  return (
    <div className={`distort ${className ?? ""}`} ref={wrap}>
      <img src={src} alt={alt} width={width} height={height} loading="lazy" />
      <canvas ref={canvas} aria-hidden="true" />
    </div>
  );
}
