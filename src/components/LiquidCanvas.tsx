import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

// ── Simplex 3D noise (compact implementation) ──────────────────────────
const F3 = 1.0 / 3.0;
const G3 = 1.0 / 6.0;

const grad3 = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
];

function buildPerm() {
  const p: number[] = [];
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  const perm = new Array(512);
  const permMod12 = new Array(512);
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
    permMod12[i] = perm[i] % 12;
  }
  return { perm, permMod12 };
}

const { perm, permMod12 } = buildPerm();

function simplex3(x: number, y: number, z: number): number {
  const s = (x + y + z) * F3;
  const i = Math.floor(x + s), j = Math.floor(y + s), k = Math.floor(z + s);
  const t = (i + j + k) * G3;
  const X0 = i - t, Y0 = j - t, Z0 = k - t;
  const x0 = x - X0, y0 = y - Y0, z0 = z - Z0;

  let i1: number, j1: number, k1: number;
  let i2: number, j2: number, k2: number;

  if (x0 >= y0) {
    if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
    else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
  } else {
    if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
    else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
    else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
  }

  const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
  const x2 = x0 - i2 + 2.0 * G3, y2 = y0 - j2 + 2.0 * G3, z2 = z0 - k2 + 2.0 * G3;
  const x3 = x0 - 1.0 + 3.0 * G3, y3 = y0 - 1.0 + 3.0 * G3, z3 = z0 - 1.0 + 3.0 * G3;

  const ii = i & 255, jj = j & 255, kk = k & 255;

  let n0 = 0, n1 = 0, n2 = 0, n3 = 0;

  let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
  if (t0 > 0) {
    t0 *= t0;
    const gi0 = permMod12[ii + perm[jj + perm[kk]]];
    n0 = t0 * t0 * (grad3[gi0][0] * x0 + grad3[gi0][1] * y0 + grad3[gi0][2] * z0);
  }
  let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
  if (t1 > 0) {
    t1 *= t1;
    const gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]];
    n1 = t1 * t1 * (grad3[gi1][0] * x1 + grad3[gi1][1] * y1 + grad3[gi1][2] * z1);
  }
  let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
  if (t2 > 0) {
    t2 *= t2;
    const gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]];
    n2 = t2 * t2 * (grad3[gi2][0] * x2 + grad3[gi2][1] * y2 + grad3[gi2][2] * z2);
  }
  let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
  if (t3 > 0) {
    t3 *= t3;
    const gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]];
    n3 = t3 * t3 * (grad3[gi3][0] * x3 + grad3[gi3][1] * y3 + grad3[gi3][2] * z3);
  }

  return 32.0 * (n0 + n1 + n2 + n3);
}

// ── LiquidCanvas Component ─────────────────────────────────────────────
interface LiquidCanvasProps {
  className?: string;
}

export default function LiquidCanvas({ className = '' }: LiquidCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    renderer: null as THREE.WebGLRenderer | null,
    scene: null as THREE.Scene | null,
    camera: null as THREE.OrthographicCamera | null,
    mesh: null as THREE.Mesh | null,
    geometry: null as THREE.PlaneGeometry | null,
    positionAttr: null as THREE.BufferAttribute | null,
    originalPositions: null as Float32Array | null,
    animationId: 0,
    mouse: new THREE.Vector2(9999, 9999),
    targetMouse: new THREE.Vector2(9999, 9999),
    isHovering: false,
    isInView: false,
    effectStrength: 0, // 0→1 for fade-in on scroll + hover
    clock: new THREE.Clock(),
  });

  const init = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const s = stateRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    s.renderer = renderer;

    // Scene
    const scene = new THREE.Scene();
    s.scene = scene;

    // Camera — orthographic to fill container perfectly
    const aspect = w / h;
    const frustumSize = 2;
    const camera = new THREE.OrthographicCamera(
      -frustumSize * aspect / 2, frustumSize * aspect / 2,
      frustumSize / 2, -frustumSize / 2, 0.1, 100
    );
    camera.position.z = 2;
    s.camera = camera;

    // Geometry — high-resolution plane for smooth displacement
    const segX = Math.floor(w / 8);
    const segY = Math.floor(h / 8);
    const geometry = new THREE.PlaneGeometry(
      frustumSize * aspect, frustumSize, segX, segY
    );
    s.geometry = geometry;
    s.positionAttr = geometry.attributes.position as THREE.BufferAttribute;
    s.originalPositions = new Float32Array(s.positionAttr.array);

    // Material — liquid/glass-like physical material
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x111111),
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.95,
      thickness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.0,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    s.mesh = mesh;

    // Lights for the physical material
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x6ee7b7, 0.8);
    directionalLight.position.set(2, 3, 4);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x818cf8, 1.2, 10);
    pointLight1.position.set(-2, 1, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x38bdf8, 0.8, 10);
    pointLight2.position.set(2, -1, 2);
    scene.add(pointLight2);
  }, []);

  const animate = useCallback(() => {
    const s = stateRef.current;
    if (!s.renderer || !s.scene || !s.camera || !s.positionAttr || !s.originalPositions) return;

    s.animationId = requestAnimationFrame(animate);

    const elapsed = s.clock.getElapsedTime();

    // Smooth mouse interpolation
    s.mouse.lerp(s.targetMouse, 0.05);

    // Smoothly ramp effect strength based on visibility + hover
    const targetStrength = s.isInView ? (s.isHovering ? 1.0 : 0.35) : 0;
    s.effectStrength += (targetStrength - s.effectStrength) * 0.03;

    // Displace vertices using simplex noise + mouse proximity
    const positions = s.positionAttr.array as Float32Array;
    const original = s.originalPositions;
    const strength = s.effectStrength;

    for (let i = 0; i < positions.length; i += 3) {
      const ox = original[i];
      const oy = original[i + 1];

      // Base noise displacement (slow ambient wave)
      const noiseVal = simplex3(ox * 1.5, oy * 1.5, elapsed * 0.4);
      let displacement = noiseVal * 0.08 * strength;

      // Mouse-reactive ripple
      const dx = ox - s.mouse.x;
      const dy = oy - s.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mouseInfluence = Math.max(0, 1.0 - dist / 0.8);
      const ripple = Math.sin(dist * 12 - elapsed * 4) * mouseInfluence * 0.12;
      displacement += ripple * strength;

      positions[i + 2] = displacement;
    }

    s.positionAttr.needsUpdate = true;
    s.geometry!.computeVertexNormals();

    s.renderer.render(s.scene, s.camera);
  }, []);

  useEffect(() => {
    init();

    const s = stateRef.current;
    const container = containerRef.current;
    if (!container) return;

    // Start animation loop
    animate();

    // ── Mouse tracking ──
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Map to world coordinates (matching orthographic frustum)
      const aspect = rect.width / rect.height;
      s.targetMouse.set(x * aspect, y);
    };

    const handleMouseEnter = () => { s.isHovering = true; };
    const handleMouseLeave = () => {
      s.isHovering = false;
      s.targetMouse.set(9999, 9999);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // ── IntersectionObserver for scroll-based activation ──
    const observer = new IntersectionObserver(
      ([entry]) => {
        s.isInView = entry.isIntersecting;
      },
      { threshold: 0.15 }
    );
    observer.observe(container);

    // ── Resize handler ──
    const handleResize = () => {
      if (!container || !s.renderer || !s.camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      s.renderer.setSize(w, h);
      const aspect = w / h;
      const frustumSize = 2;
      (s.camera as THREE.OrthographicCamera).left = -frustumSize * aspect / 2;
      (s.camera as THREE.OrthographicCamera).right = frustumSize * aspect / 2;
      (s.camera as THREE.OrthographicCamera).top = frustumSize / 2;
      (s.camera as THREE.OrthographicCamera).bottom = -frustumSize / 2;
      s.camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(s.animationId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      s.renderer?.dispose();
      s.geometry?.dispose();
      if (s.renderer?.domElement && container.contains(s.renderer.domElement)) {
        container.removeChild(s.renderer.domElement);
      }
    };
  }, [init, animate]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
