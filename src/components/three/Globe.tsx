"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const DEG = Math.PI / 180;
const R = 1;
const HQ = { lat: 30.4, lon: 69.3 }; // Pakistan
/** Abstract service regions (markets served remotely) — not office locations. */
const REGIONS = [
  { lat: 39, lon: -98 },
  { lat: 56, lon: -106 },
  { lat: 53, lon: -2 },
  { lat: 50, lon: 10 },
  { lat: 25, lon: 51 },
  { lat: -25, lon: 134 },
  { lat: 1.3, lon: 103.8 },
  { lat: 35, lon: 135 },
];

function toVec(lat: number, lon: number, r = R) {
  const phi = (90 - lat) * DEG;
  const theta = (lon + 180) * DEG;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

export default function Globe() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    const tilt = new THREE.Group();
    const globe = new THREE.Group();
    tilt.add(globe);
    scene.add(tilt);

    // Dotted sphere (Fibonacci distribution)
    const COUNT = 2600;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const cA = new THREE.Color("#4776FF");
    const cB = new THREE.Color("#865DFF");
    const cC = new THREE.Color("#35E5F5");
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = golden * i;
      positions.set([Math.cos(th) * rad * R, y * R, Math.sin(th) * rad * R], i * 3);
      const mix = (Math.sin(i * 0.013) + 1) / 2;
      const c = cA.clone().lerp(i % 7 === 0 ? cC : cB, mix * 0.8);
      colors.set([c.r, c.g, c.b], i * 3);
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    dotGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const dotMat = new THREE.PointsMaterial({ size: 0.014, vertexColors: true, transparent: true, opacity: 0.85, sizeAttenuation: true });
    globe.add(new THREE.Points(dotGeo, dotMat));

    // Inner shell to occlude back-facing dots slightly
    const shellMat = new THREE.MeshBasicMaterial({ color: "#080D1F", transparent: true, opacity: 0.72 });
    const shell = new THREE.Mesh(new THREE.SphereGeometry(R * 0.985, 48, 48), shellMat);
    globe.add(shell);

    // Atmosphere
    const atmoMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      uniforms: { c: { value: new THREE.Color("#4776FF") } },
      vertexShader: "varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
      fragmentShader: "uniform vec3 c; varying vec3 vN; void main(){ float i = pow(0.62 - dot(vN, vec3(0.0,0.0,1.0)), 3.0); gl_FragColor = vec4(c, 1.0) * i * 0.8; }",
    });
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.18, 48, 48), atmoMat));

    // HQ marker
    const hq = toVec(HQ.lat, HQ.lon, R * 1.005);
    const hqDot = new THREE.Mesh(new THREE.SphereGeometry(0.03, 16, 16), new THREE.MeshBasicMaterial({ color: "#65F2C6" }));
    hqDot.position.copy(hq);
    globe.add(hqDot);
    const ringMat = new THREE.MeshBasicMaterial({ color: "#65F2C6", transparent: true, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.05, 0.062, 48), ringMat);
    ring.position.copy(hq);
    ring.lookAt(hq.clone().multiplyScalar(2));
    globe.add(ring);

    // Arcs to service regions
    const arcs = REGIONS.map((reg, i) => {
      const end = toVec(reg.lat, reg.lon, R * 1.005);
      const mid = hq.clone().add(end).multiplyScalar(0.5);
      const dist = hq.distanceTo(end);
      mid.normalize().multiplyScalar(R + dist * 0.42);
      const curve = new THREE.QuadraticBezierCurve3(hq, mid, end);
      const pts = curve.getPoints(80);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: i % 2 ? "#865DFF" : "#35E5F5", transparent: true, opacity: 0.9 });
      const line = new THREE.Line(geo, mat);
      globe.add(line);
      const marker = new THREE.Mesh(new THREE.SphereGeometry(0.016, 12, 12), new THREE.MeshBasicMaterial({ color: "#ffffff" }));
      marker.position.copy(end);
      globe.add(marker);
      const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 12), new THREE.MeshBasicMaterial({ color: i % 2 ? "#865DFF" : "#35E5F5" }));
      globe.add(pulse);
      return { curve, geo, mat, pulse, offset: i * 0.37 };
    });

    // Orientation: bring Pakistan toward the viewer
    const beta = Math.atan2(hq.x, hq.z);
    const baseY = -beta;
    tilt.rotation.x = HQ.lat * DEG * 0.75;
    globe.rotation.y = baseY;

    function resize() {
      const { width, height } = el!.getBoundingClientRect();
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    }
    resize();

    const pointer = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    el.addEventListener("pointermove", onMove);

    function frame(t: number) {
      const s = t / 1000;
      globe.rotation.y += (baseY + Math.sin(s * 0.12) * 0.9 + pointer.x * 0.25 - globe.rotation.y) * 0.05;
      tilt.rotation.x += (HQ.lat * DEG * 0.75 + pointer.y * 0.12 - tilt.rotation.x) * 0.05;
      const p = (Math.sin(s * 2.2) + 1) / 2;
      ring.scale.setScalar(1 + p * 1.4);
      ringMat.opacity = 1 - p * 0.85;
      arcs.forEach((a) => {
        const k = ((s * 0.32 + a.offset) % 1.6) / 1.2;
        const drawn = Math.min(1, k);
        a.geo.setDrawRange(0, Math.max(2, Math.floor(drawn * 81)));
        a.mat.opacity = k > 1 ? Math.max(0, 1 - (k - 1) * 3) : 0.9;
        a.pulse.position.copy(a.curve.getPoint(Math.min(drawn, 1)));
        a.pulse.visible = k <= 1;
      });
      renderer.render(scene, camera);
    }

    let raf = 0;
    let running = false;
    const loop = (t: number) => {
      frame(t);
      if (running) raf = requestAnimationFrame(loop);
    };

    if (reduce) {
      arcs.forEach((a) => {
        a.geo.setDrawRange(0, 81);
        a.pulse.visible = false;
      });
      renderer.render(scene, camera);
    }

    const io = new IntersectionObserver(([entry]) => {
      if (reduce) return;
      running = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(loop);
    });
    io.observe(el);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) renderer.render(scene, camera);
    });
    ro.observe(el);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointermove", onMove);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className="size-full" />;
}
