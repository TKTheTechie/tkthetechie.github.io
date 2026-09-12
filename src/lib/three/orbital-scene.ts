import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/** A self-contained sculpture with no model downloads or postprocessing. */
export function createOrbitalScene(
  host: HTMLElement,
  initiallyPaused: boolean,
) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.45;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
  camera.position.set(0, 0, 9.4);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xe9ffcf, 0x1d2817, 2));
  const key = new THREE.DirectionalLight(0xf7ffe9, 4);
  key.position.set(-3, 5, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xc4f85a, 4);
  rim.position.set(4, -1, -2);
  scene.add(rim);
  const root = new THREE.Group();
  scene.add(root);
  const metal = new THREE.MeshPhysicalMaterial({
    color: 0xb3c7a6,
    metalness: 1,
    roughness: 0.22,
    clearcoat: 1,
    clearcoatRoughness: 0.15,
    envMapIntensity: 1.5,
  });
  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.36, 0.43, 192, 32, 2, 3),
    metal,
  );
  knot.rotation.set(0.5, -0.5, -0.45);
  root.add(knot);
  const orbit = new THREE.Group();
  orbit.rotation.set(1.15, -0.3, -0.4);
  root.add(orbit);
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.5, 0.009, 6, 160),
    new THREE.MeshBasicMaterial({
      color: 0xd2f879,
      transparent: true,
      opacity: 0.55,
    }),
  );
  orbit.add(ring);
  const satelliteGeometry = new THREE.SphereGeometry(0.12, 20, 14);
  const signalMaterial = new THREE.MeshStandardMaterial({
    color: 0xd2f879,
    emissive: 0x9cca39,
    emissiveIntensity: 0.45,
    roughness: 0.25,
    metalness: 0.45,
  });
  const satellites = Array.from({ length: 3 }, (_, i) => {
    const satellite = new THREE.Mesh(
      satelliteGeometry,
      i === 0 ? signalMaterial : metal,
    );
    orbit.add(satellite);
    return satellite;
  });
  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(2.8, 0.004, 4, 160),
    new THREE.MeshBasicMaterial({
      color: 0xaebd9c,
      transparent: true,
      opacity: 0.22,
    }),
  );
  halo.rotation.set(0.3, -0.6, 0);
  root.add(halo);
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(pointer: fine)');
  let paused = initiallyPaused;
  let visible = false;
  let frame = 0;
  let last = 0;
  let time = 0;
  let px = 0;
  let py = 0;
  const render = () => renderer.render(scene, camera);
  const tick = (now: number) => {
    frame = 0;
    const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;
    time += dt;
    knot.rotation.y = -0.5 + time * 0.12;
    knot.rotation.z = -0.45 + Math.sin(time * 0.15) * 0.14;
    root.rotation.y += (px * 0.16 - root.rotation.y) * 0.045;
    root.rotation.x += (py * 0.12 - root.rotation.x) * 0.045;
    root.position.y = Math.sin(time * 0.6) * 0.065;
    satellites.forEach((satellite, i) => {
      const a = time * 0.22 + (i * Math.PI * 2) / 3;
      satellite.position.set(Math.cos(a) * 2.5, Math.sin(a) * 2.5, 0);
    });
    render();
    frame = requestAnimationFrame(tick);
  };
  const sync = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
    if (visible && !paused && !media.matches && !document.hidden)
      frame = requestAnimationFrame(tick);
    else render();
  };
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(height, 1);
    camera.position.z = camera.aspect < 0.9 ? 10.3 : 9.4;
    camera.updateProjectionMatrix();
    render();
  };
  satellites.forEach((satellite, i) => {
    const a = (i * Math.PI * 2) / 3;
    satellite.position.set(Math.cos(a) * 2.5, Math.sin(a) * 2.5, 0);
  });
  const onPointer = (event: PointerEvent) => {
    if (!fine.matches || media.matches || paused) return;
    const rect = host.getBoundingClientRect();
    px = (event.clientX - rect.left) / rect.width - 0.5;
    py = (event.clientY - rect.top) / rect.height - 0.5;
  };
  const onLeave = () => {
    px = 0;
    py = 0;
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  io.observe(host);
  host.addEventListener('pointermove', onPointer);
  host.addEventListener('pointerleave', onLeave);
  media.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  resize();
  return {
    setPaused(value: boolean) {
      paused = value;
      sync();
    },
    destroy() {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('pointermove', onPointer);
      host.removeEventListener('pointerleave', onLeave);
      media.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          geometries.add(object.geometry);
          for (const material of [object.material].flat())
            materials.add(material);
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
