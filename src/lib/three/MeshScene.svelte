<script lang="ts">
  /**
   * The event mesh, in real 3D.
   *
   * A Fibonacci-sphere topology of broker nodes joined to their nearest
   * neighbours, with messages travelling the edges, delivery pings, orbiting
   * holographic polyhedra (the "agents"), an optional broker core, and a
   * parallax particle field behind it all. Rendered additively onto a
   * transparent canvas so it composites over whatever the section paints.
   *
   * Pass an `anchor` element and the sphere will centre itself on that
   * element and size itself relative to it — the hero uses this to wrap the
   * mesh around the portrait.
   */
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { createPointsMaterial, createHoloMaterial, createGlowTexture } from './materials';
  import EventMesh from '$lib/components/EventMesh.svelte';

  export let anchor: HTMLElement | null = null;
  /** sphere radius as a multiple of the anchor's half-width (or the host's half-height) */
  export let radiusScale = 1.5;
  export let nodeCount = 96;
  export let degree = 3;
  export let packetCount = 28;
  export let particles = 700;
  /** holographic polyhedra orbiting the mesh */
  export let satellites = 6;
  /** render the broker core model at the centre */
  export let core = false;
  /** base spin, radians per second */
  export let speed = 0.09;
  export let interactive = true;
  /** vertical parallax as the page scrolls past (world units per viewport) */
  export let scrollParallax = 0.9;
  export let className = '';

  let host: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let fallback = false;

  /** repositions the sphere; assigned once the scene exists */
  let place: (() => void) | null = null;
  $: anchor, place?.();

  type Vec3 = { x: number; y: number; z: number };

  const CYAN = new THREE.Color('#38bdf8');
  const EMERALD = new THREE.Color('#34d399');
  const VIOLET = new THREE.Color('#a78bfa');
  const NODE = new THREE.Color('#bae6fd');
  const HUB = new THREE.Color('#a7f3d0');

  onMount(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch {
      fallback = true;
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    // a longer lens: the sphere still has depth but the near side no longer balloons
    const CAM_Z = 17;
    const FOV = 28;
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 60);
    camera.position.set(0, 0, CAM_Z);

    // additive + black fog = things fade out with distance
    scene.fog = new THREE.Fog(0x000000, CAM_Z - 1, CAM_Z + 4);

    const glowTex = createGlowTexture();

    /* ---------------------------------------------------------------- *
     * Topology
     * ---------------------------------------------------------------- */
    const nodes: Vec3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * golden;
      nodes.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
    }

    const hubs = new Set<number>();
    for (let i = 0; i < 7; i++) hubs.add(Math.floor((i * nodeCount) / 7 + 3) % nodeCount);

    const dist2 = (a: Vec3, b: Vec3) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
    const edges: Array<[number, number]> = [];
    const seen = new Set<string>();
    for (let i = 0; i < nodes.length; i++) {
      const nearest = nodes
        .map((n, j) => ({ j, d: dist2(nodes[i], n) }))
        .filter((e) => e.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, degree);
      for (const { j } of nearest) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push([i, j]);
      }
    }

    /* ---------------------------------------------------------------- *
     * The mesh group — everything inside is in unit-sphere space and the
     * group's scale carries the real radius.
     * ---------------------------------------------------------------- */
    const mesh = new THREE.Group();
    scene.add(mesh);

    // edges
    {
      const pos = new Float32Array(edges.length * 6);
      const col = new Float32Array(edges.length * 6);
      edges.forEach(([a, b], i) => {
        const pa = nodes[a];
        const pb = nodes[b];
        pos.set([pa.x, pa.y, pa.z, pb.x, pb.y, pb.z], i * 6);
        const c = hubs.has(a) || hubs.has(b) ? HUB : CYAN;
        col.set([c.r, c.g, c.b, c.r, c.g, c.b], i * 6);
      });
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const mat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.32,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      mesh.add(new THREE.LineSegments(geo, mat));
    }

    // nodes
    const pointsMat = createPointsMaterial();
    {
      const pos = new Float32Array(nodeCount * 3);
      const col = new Float32Array(nodeCount * 3);
      const size = new Float32Array(nodeCount);
      const alpha = new Float32Array(nodeCount);
      nodes.forEach((n, i) => {
        pos.set([n.x, n.y, n.z], i * 3);
        const c = hubs.has(i) ? HUB : NODE;
        col.set([c.r, c.g, c.b], i * 3);
        size[i] = hubs.has(i) ? 0.11 : 0.05;
        alpha[i] = hubs.has(i) ? 1 : 0.8;
      });
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
      geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
      geo.setAttribute('aAlpha', new THREE.BufferAttribute(alpha, 1));
      mesh.add(new THREE.Points(geo, pointsMat));

      // soft halo behind each hub
      const halo = new THREE.SpriteMaterial({
        map: glowTex,
        color: EMERALD,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      for (const h of hubs) {
        const s = new THREE.Sprite(halo);
        s.position.set(nodes[h].x, nodes[h].y, nodes[h].z);
        s.scale.setScalar(0.34);
        mesh.add(s);
      }
    }

    // packets + trails
    type Packet = { edge: number; t: number; speed: number; dir: 1 | -1; hue: THREE.Color };
    const HUES = [CYAN, EMERALD, VIOLET];
    const spawn = (): Packet => ({
      edge: (Math.random() * edges.length) | 0,
      t: 0,
      speed: 0.26 + Math.random() * 0.5,
      dir: Math.random() > 0.5 ? 1 : -1,
      hue: Math.random() < 0.14 ? HUES[2] : Math.random() < 0.5 ? HUES[0] : HUES[1]
    });
    const packets: Packet[] = [];
    for (let i = 0; i < packetCount; i++) {
      const p = spawn();
      p.t = Math.random();
      packets.push(p);
    }
    const TRAIL = 5;
    const packetPos = new Float32Array(packetCount * TRAIL * 3);
    const packetCol = new Float32Array(packetCount * TRAIL * 3);
    const packetSize = new Float32Array(packetCount * TRAIL);
    const packetAlpha = new Float32Array(packetCount * TRAIL);
    for (let i = 0; i < packetCount; i++) {
      for (let s = 0; s < TRAIL; s++) {
        const k = i * TRAIL + s;
        packetSize[k] = s === 0 ? 0.16 : 0.09 * (1 - s / (TRAIL + 1));
        packetAlpha[k] = s === 0 ? 1 : 0.35 * (1 - s / TRAIL);
      }
    }
    const packetGeo = new THREE.BufferGeometry();
    packetGeo.setAttribute('position', new THREE.BufferAttribute(packetPos, 3));
    packetGeo.setAttribute('aColor', new THREE.BufferAttribute(packetCol, 3));
    packetGeo.setAttribute('aSize', new THREE.BufferAttribute(packetSize, 1));
    packetGeo.setAttribute('aAlpha', new THREE.BufferAttribute(packetAlpha, 1));
    mesh.add(new THREE.Points(packetGeo, pointsMat));

    // delivery pings — a pooled set of expanding rings
    const PINGS = 14;
    type Ping = { node: number; t: number; hue: THREE.Color; live: boolean };
    const pings: Ping[] = Array.from({ length: PINGS }, () => ({ node: 0, t: 1, hue: CYAN, live: false }));
    const pingPos = new Float32Array(PINGS * 3);
    const pingCol = new Float32Array(PINGS * 3);
    const pingSize = new Float32Array(PINGS);
    const pingAlpha = new Float32Array(PINGS);
    const pingGeo = new THREE.BufferGeometry();
    pingGeo.setAttribute('position', new THREE.BufferAttribute(pingPos, 3));
    pingGeo.setAttribute('aColor', new THREE.BufferAttribute(pingCol, 3));
    pingGeo.setAttribute('aSize', new THREE.BufferAttribute(pingSize, 1));
    pingGeo.setAttribute('aAlpha', new THREE.BufferAttribute(pingAlpha, 1));
    const ringMat = createPointsMaterial(true);
    mesh.add(new THREE.Points(pingGeo, ringMat));

    const firePing = (node: number, hue: THREE.Color) => {
      const slot = pings.find((p) => !p.live) ?? pings[0];
      slot.node = node;
      slot.t = 0;
      slot.hue = hue;
      slot.live = true;
    };

    // orbital rings
    const rings = new THREE.Group();
    {
      const ringMatA = new THREE.MeshBasicMaterial({
        color: CYAN,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const ringMatB = ringMatA.clone();
      ringMatB.color = VIOLET;
      ringMatB.opacity = 0.16;
      const r1 = new THREE.Mesh(new THREE.TorusGeometry(1.28, 0.004, 6, 160), ringMatA);
      r1.rotation.x = Math.PI / 2 - 0.35;
      const r2 = new THREE.Mesh(new THREE.TorusGeometry(1.46, 0.003, 6, 180), ringMatB);
      r2.rotation.x = Math.PI / 2 + 0.55;
      r2.rotation.y = 0.4;
      rings.add(r1, r2);
      mesh.add(rings);
    }

    /* ---------------------------------------------------------------- *
     * Holographic 3D models — orbiting agents, and the broker core
     * ---------------------------------------------------------------- */
    const holoMats: THREE.ShaderMaterial[] = [];
    const makeHolo = (geo: THREE.BufferGeometry, a: THREE.Color, b: THREE.Color, opacity = 1) => {
      const g = new THREE.Group();
      const mat = createHoloMaterial(a, b, opacity);
      holoMats.push(mat);
      g.add(new THREE.Mesh(geo, mat));
      const edgeMat = new THREE.LineBasicMaterial({
        color: b,
        transparent: true,
        opacity: 0.55 * opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat));
      return g;
    };

    type Satellite = {
      group: THREE.Group;
      radius: number;
      incl: number;
      phase: number;
      speed: number;
      spin: THREE.Vector3;
    };
    const sats: Satellite[] = [];
    const satGeos = [
      new THREE.IcosahedronGeometry(0.075, 0),
      new THREE.OctahedronGeometry(0.085, 0),
      new THREE.TetrahedronGeometry(0.09, 0),
      new THREE.DodecahedronGeometry(0.07, 0)
    ];
    const satPalette: Array<[THREE.Color, THREE.Color]> = [
      [CYAN, new THREE.Color('#e0f2fe')],
      [EMERALD, new THREE.Color('#d1fae5')],
      [VIOLET, new THREE.Color('#ede9fe')]
    ];
    for (let i = 0; i < satellites; i++) {
      const [a, b] = satPalette[i % satPalette.length];
      const group = makeHolo(satGeos[i % satGeos.length], a, b, 0.9);
      const satGlow = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          color: a,
          transparent: true,
          opacity: 0.4,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      );
      satGlow.scale.setScalar(0.36);
      group.add(satGlow);
      mesh.add(group);
      sats.push({
        group,
        radius: 1.1 + (i % 3) * 0.12 + Math.random() * 0.06,
        incl: (i / satellites) * Math.PI - Math.PI / 2 + (Math.random() - 0.5) * 0.6,
        phase: (i / satellites) * Math.PI * 2,
        speed: (0.12 + Math.random() * 0.12) * (i % 2 ? 1 : -1),
        spin: new THREE.Vector3(Math.random() * 0.8, 0.4 + Math.random() * 0.8, Math.random() * 0.5)
      });
    }

    let coreGroup: THREE.Group | null = null;
    let coreInner: THREE.Mesh | null = null;
    if (core) {
      coreGroup = new THREE.Group();
      const shell = makeHolo(new THREE.IcosahedronGeometry(0.42, 1), CYAN, new THREE.Color('#e0f2fe'), 1);
      const innerMat = createHoloMaterial(EMERALD, new THREE.Color('#ffffff'), 1.4);
      holoMats.push(innerMat);
      coreInner = new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 0), innerMat);
      const heart = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          color: new THREE.Color('#7dd3fc'),
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      );
      heart.scale.setScalar(1.5);
      const gyroMat = new THREE.MeshBasicMaterial({
        color: EMERALD,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const g1 = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.008, 8, 120), gyroMat);
      const g2 = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.006, 8, 120), gyroMat.clone());
      (g2.material as THREE.MeshBasicMaterial).color = VIOLET;
      g1.rotation.x = Math.PI / 3;
      g2.rotation.y = Math.PI / 3;
      coreGroup.add(shell, coreInner, heart, g1, g2);
      coreGroup.userData = { g1, g2 };
      mesh.add(coreGroup);
    }

    /* ---------------------------------------------------------------- *
     * Particle field, far behind the mesh, for depth
     * ---------------------------------------------------------------- */
    const field = new THREE.Group();
    scene.add(field);
    const fieldMat = createPointsMaterial();
    fieldMat.uniforms.uNear.value = CAM_Z + 1;
    fieldMat.uniforms.uFar.value = CAM_Z + 14;
    let fieldGeo: THREE.BufferGeometry | null = null;
    if (particles > 0) {
      const pos = new Float32Array(particles * 3);
      const col = new Float32Array(particles * 3);
      const size = new Float32Array(particles);
      const alpha = new Float32Array(particles);
      for (let i = 0; i < particles; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 34;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
        pos[i * 3 + 2] = -2 - Math.random() * 12;
        const c = Math.random() < 0.6 ? NODE : Math.random() < 0.5 ? CYAN : EMERALD;
        col.set([c.r, c.g, c.b], i * 3);
        size[i] = 0.02 + Math.random() * 0.035;
        alpha[i] = 0.25 + Math.random() * 0.5;
      }
      fieldGeo = new THREE.BufferGeometry();
      fieldGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      fieldGeo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
      fieldGeo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
      fieldGeo.setAttribute('aAlpha', new THREE.BufferAttribute(alpha, 1));
      field.add(new THREE.Points(fieldGeo, fieldMat));
    }

    /* ---------------------------------------------------------------- *
     * Sizing + anchoring
     * ---------------------------------------------------------------- */
    let w = 1;
    let h = 1;
    let R = 1;
    let anchorX = 0;
    let anchorY = 0;
    const visibleHeight = () => 2 * CAM_Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2));

    place = () => {
      const hr = host.getBoundingClientRect();
      const worldPerPx = visibleHeight() / Math.max(1, h);
      let cx = w / 2;
      let cy = h / 2;
      let halfPx = Math.min(w, h) * 0.5;
      if (anchor) {
        const ar = anchor.getBoundingClientRect();
        cx = ar.left + ar.width / 2 - hr.left;
        cy = ar.top + ar.height / 2 - hr.top;
        halfPx = ar.width / 2;
      }
      anchorX = (cx - w / 2) * worldPerPx;
      anchorY = (h / 2 - cy) * worldPerPx;
      R = Math.max(0.2, halfPx * radiusScale * worldPerPx);
      mesh.position.set(anchorX, anchorY, 0);
      mesh.scale.setScalar(R);
      // the particle field parallaxes around the same centre
      field.position.x = anchorX * 0.35;

      const projScale = h / (2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)));
      for (const m of [pointsMat, ringMat]) {
        m.uniforms.uProjScale.value = projScale;
        m.uniforms.uPixelRatio.value = dpr;
        m.uniforms.uUnit.value = R;
        m.uniforms.uNear.value = CAM_Z - R * 0.9;
        m.uniforms.uFar.value = CAM_Z + R * 1.1;
      }
      fieldMat.uniforms.uProjScale.value = projScale;
      fieldMat.uniforms.uPixelRatio.value = dpr;
      fieldMat.uniforms.uUnit.value = 1;
      for (const m of holoMats) {
        m.uniforms.uNear.value = CAM_Z - R;
        m.uniforms.uFar.value = CAM_Z + R * 1.2;
        m.uniforms.uScan.value = 18 / R;
      }
      (scene.fog as THREE.Fog).near = CAM_Z - R * 0.4;
      (scene.fog as THREE.Fog).far = CAM_Z + R * 1.35;
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      place?.();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    if (anchor) ro.observe(anchor);
    resize();

    /* ---------------------------------------------------------------- *
     * Interaction
     * ---------------------------------------------------------------- */
    let px = 0;
    let py = 0;
    let tpx = 0;
    let tpy = 0;
    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      tpx = THREE.MathUtils.clamp((event.clientX - rect.left) / rect.width - 0.5, -0.75, 0.75);
      tpy = THREE.MathUtils.clamp((event.clientY - rect.top) / rect.height - 0.5, -0.75, 0.75);
    };
    const onPointerLeave = () => {
      tpx = 0;
      tpy = 0;
    };
    if (interactive && !coarse) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onPointerLeave);
    }

    let onScreen = true;
    let scrollT = 0;
    const io = new IntersectionObserver(([entry]) => (onScreen = entry.isIntersecting), { threshold: 0.01 });
    io.observe(host);

    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const rect = host.getBoundingClientRect();
        // 0 while the top of the host is at/above the viewport top, growing as it scrolls away
        scrollT = THREE.MathUtils.clamp(-rect.top / Math.max(1, window.innerHeight), -1, 1);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------------------------------------------------------------- *
     * Render loop
     * ---------------------------------------------------------------- */
    const tmp = new THREE.Vector3();
    let spin = 0;
    let time = 0;
    let raf = 0;
    let last = performance.now();

    const baseTiltX = -0.28;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!onScreen) return;
      time += dt;

      px += (tpx - px) * Math.min(1, dt * 3.2);
      py += (tpy - py) * Math.min(1, dt * 3.2);

      const boost = Math.min(1, Math.abs(px) * 1.4);
      spin += dt * speed * (1 + boost * 0.9);

      mesh.rotation.set(baseTiltX + py * 0.55 + scrollT * 0.5, spin + px * 0.7, 0);
      mesh.position.y = anchorY + scrollT * scrollParallax * R;

      // camera sways the opposite way for parallax between mesh and field
      camera.position.x += (px * 0.9 - camera.position.x) * Math.min(1, dt * 2.5);
      camera.position.y += (-py * 0.6 - camera.position.y) * Math.min(1, dt * 2.5);
      camera.lookAt(anchorX * 0.15, anchorY * 0.15, 0);

      rings.rotation.z += dt * 0.08;
      rings.rotation.x = Math.sin(time * 0.2) * 0.12;

      for (const m of holoMats) m.uniforms.uTime.value = time;

      // satellites
      for (const s of sats) {
        const a = s.phase + time * s.speed;
        tmp.set(Math.cos(a) * s.radius, 0, Math.sin(a) * s.radius);
        tmp.applyAxisAngle(new THREE.Vector3(1, 0, 0), s.incl);
        s.group.position.copy(tmp);
        s.group.rotation.x += dt * s.spin.x;
        s.group.rotation.y += dt * s.spin.y;
        s.group.rotation.z += dt * s.spin.z;
      }

      if (coreGroup && coreInner) {
        coreGroup.rotation.y = -mesh.rotation.y + time * 0.25;
        coreInner.rotation.x += dt * 0.7;
        coreInner.rotation.y += dt * 0.9;
        const pulse = 1 + Math.sin(time * 2.1) * 0.06;
        coreInner.scale.setScalar(pulse);
        const { g1, g2 } = coreGroup.userData as { g1: THREE.Mesh; g2: THREE.Mesh };
        g1.rotation.z += dt * 0.5;
        g2.rotation.x += dt * 0.35;
      }

      // packets
      if (!reduced) {
        for (let i = 0; i < packets.length; i++) {
          const packet = packets[i];
          packet.t += dt * packet.speed;
          const [a, b] = edges[packet.edge];
          if (packet.t >= 1) {
            firePing(packet.dir === 1 ? b : a, packet.hue);
            Object.assign(packet, spawn());
          }
          const from = packet.dir === 1 ? nodes[a] : nodes[b];
          const to = packet.dir === 1 ? nodes[b] : nodes[a];
          for (let s = 0; s < TRAIL; s++) {
            const t = Math.max(0, packet.t - s * 0.03);
            const lx = from.x + (to.x - from.x) * t;
            const ly = from.y + (to.y - from.y) * t;
            const lz = from.z + (to.z - from.z) * t;
            const len = Math.hypot(lx, ly, lz) || 1;
            const bow = (1 + Math.sin(Math.PI * t) * 0.08) / len;
            const k = (i * TRAIL + s) * 3;
            packetPos[k] = lx * bow;
            packetPos[k + 1] = ly * bow;
            packetPos[k + 2] = lz * bow;
            packetCol[k] = packet.hue.r;
            packetCol[k + 1] = packet.hue.g;
            packetCol[k + 2] = packet.hue.b;
          }
        }
        packetGeo.attributes.position.needsUpdate = true;
        packetGeo.attributes.aColor.needsUpdate = true;

        // pings
        for (let i = 0; i < PINGS; i++) {
          const p = pings[i];
          if (p.live) {
            p.t += dt * 1.6;
            if (p.t >= 1) p.live = false;
          }
          const n = nodes[p.node];
          pingPos[i * 3] = n.x;
          pingPos[i * 3 + 1] = n.y;
          pingPos[i * 3 + 2] = n.z;
          pingCol[i * 3] = p.hue.r;
          pingCol[i * 3 + 1] = p.hue.g;
          pingCol[i * 3 + 2] = p.hue.b;
          const eased = 1 - Math.pow(1 - Math.min(1, p.t), 3);
          pingSize[i] = p.live ? 0.08 + eased * 0.5 : 0;
          pingAlpha[i] = p.live ? (1 - p.t) * 0.9 : 0;
        }
        pingGeo.attributes.position.needsUpdate = true;
        pingGeo.attributes.aColor.needsUpdate = true;
        pingGeo.attributes.aSize.needsUpdate = true;
        pingGeo.attributes.aAlpha.needsUpdate = true;

        // particle drift
        field.position.y = Math.sin(time * 0.15) * 0.4 + scrollT * scrollParallax * 0.35;
        field.rotation.z = Math.sin(time * 0.05) * 0.03;
      }

      renderer.render(scene, camera);
    };

    if (reduced) {
      // a single static frame
      frame(performance.now() + 16);
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      scene.traverse((obj) => {
        const o = obj as THREE.Mesh;
        o.geometry?.dispose?.();
        const m = o.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(m)) m.forEach((x) => x.dispose());
        else m?.dispose?.();
      });
      glowTex.dispose();
      renderer.dispose();
      place = null;
    };
  });
</script>

<div bind:this={host} class="absolute inset-0 {className}" aria-hidden="true">
  {#if fallback}
    <EventMesh radius={0.3} nodeCount={nodeCount} packetCount={packetCount} />
  {:else}
    <canvas bind:this={canvas} class="block h-full w-full"></canvas>
  {/if}
</div>
