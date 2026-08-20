<script lang="ts">
  import { onMount } from 'svelte';

  /** Rendered radius as a fraction of the smaller canvas dimension. */
  export let radius = 0.34;
  export let nodeCount = 78;
  /** Neighbours each node links to when the topology is built. */
  export let degree = 3;
  export let packetCount = 22;
  /** Base rotation speed, radians/second. */
  export let speed = 0.11;
  export let interactive = true;
  export let className = '';

  let canvas: HTMLCanvasElement;
  let host: HTMLDivElement;

  type Vec3 = { x: number; y: number; z: number };

  onMount(() => {
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------------------------------------------------------------- *
     * Topology — nodes on a Fibonacci sphere, linked to near neighbours
     * ---------------------------------------------------------------- */
    const nodes: Vec3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * golden;
      nodes.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
    }

    // Broker-ish "hub" nodes get drawn larger — a few anchors in the mesh.
    const hubs = new Set<number>();
    for (let i = 0; i < 6; i++) hubs.add(Math.floor((i * nodeCount) / 6 + 1) % nodeCount);

    const edges: Array<[number, number]> = [];
    const seen = new Set<string>();
    for (let i = 0; i < nodes.length; i++) {
      const distances = nodes
        .map((n, j) => ({ j, d: dist2(nodes[i], n) }))
        .filter((entry) => entry.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, degree);
      for (const { j } of distances) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push([i, j]);
      }
    }

    function dist2(a: Vec3, b: Vec3) {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dz = a.z - b.z;
      return dx * dx + dy * dy + dz * dz;
    }

    /* ---------------------------------------------------------------- *
     * Packets — messages travelling the mesh
     * ---------------------------------------------------------------- */
    const HUES = [
      [56, 189, 248], // cyan
      [52, 211, 153], // emerald
      [167, 139, 250] // violet, rarer
    ];

    type Packet = { edge: number; t: number; speed: number; dir: 1 | -1; hue: number };
    const packets: Packet[] = [];
    const spawn = (): Packet => ({
      edge: (Math.random() * edges.length) | 0,
      t: 0,
      speed: 0.28 + Math.random() * 0.5,
      dir: Math.random() > 0.5 ? 1 : -1,
      hue: Math.random() < 0.14 ? 2 : Math.random() < 0.5 ? 0 : 1
    });
    for (let i = 0; i < packetCount; i++) {
      const p = spawn();
      p.t = Math.random();
      packets.push(p);
    }

    /** Rings that flash outward when a packet is delivered. */
    type Ping = { node: number; t: number; hue: number };
    let pings: Ping[] = [];

    /* ---------------------------------------------------------------- *
     * Pre-rendered glow sprites — far cheaper than per-dot shadowBlur
     * ---------------------------------------------------------------- */
    const SPRITE = 64;
    const sprites = HUES.map(([r, g, b]) => {
      const c = document.createElement('canvas');
      c.width = c.height = SPRITE;
      const sctx = c.getContext('2d')!;
      const grad = sctx.createRadialGradient(SPRITE / 2, SPRITE / 2, 0, SPRITE / 2, SPRITE / 2, SPRITE / 2);
      grad.addColorStop(0, `rgba(255,255,255,0.95)`);
      grad.addColorStop(0.22, `rgba(${r},${g},${b},0.85)`);
      grad.addColorStop(0.55, `rgba(${r},${g},${b},0.22)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, SPRITE, SPRITE);
      return c;
    });

    /* ---------------------------------------------------------------- *
     * Sizing
     * ---------------------------------------------------------------- */
    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    /* ---------------------------------------------------------------- *
     * Interaction — the mesh leans toward the pointer
     * ---------------------------------------------------------------- */
    let targetTiltX = -0.22;
    let targetTiltY = 0;
    let tiltX = targetTiltX;
    let tiltY = 0;
    let spinBoost = 0;

    const onPointerMove = (event: PointerEvent) => {
      if (!interactive) return;
      const rect = host.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      targetTiltY = nx * 0.85;
      targetTiltX = -0.22 + ny * 0.6;
      spinBoost = Math.min(1, Math.abs(nx) * 1.6);
    };
    const onPointerLeave = () => {
      targetTiltY = 0;
      targetTiltX = -0.22;
      spinBoost = 0;
    };

    if (interactive) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      host.addEventListener('pointerleave', onPointerLeave);
    }

    /* ---------------------------------------------------------------- *
     * Visibility — never burn frames on an off-screen canvas
     * ---------------------------------------------------------------- */
    let onScreen = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    io.observe(host);

    /* ---------------------------------------------------------------- *
     * Render loop
     * ---------------------------------------------------------------- */
    let spin = 0;
    let raf = 0;
    let last = performance.now();

    const projected = new Array(nodes.length).fill(null).map(() => ({ x: 0, y: 0, z: 0, s: 0 }));

    const project = (v: Vec3, out: { x: number; y: number; z: number; s: number }, R: number, cx: number, cy: number) => {
      // rotate around Y, then X
      const cosY = Math.cos(spin);
      const sinY = Math.sin(spin);
      let x = v.x * cosY - v.z * sinY;
      let z = v.x * sinY + v.z * cosY;
      let y = v.y;

      const cosX = Math.cos(tiltX);
      const sinX = Math.sin(tiltX);
      const y2 = y * cosX - z * sinX;
      const z2 = y * sinX + z * cosX;

      const cosZ = Math.cos(tiltY);
      const sinZ = Math.sin(tiltY);
      const x2 = x * cosZ - y2 * sinZ;
      const y3 = x * sinZ + y2 * cosZ;

      // perspective
      const fov = 3.1;
      const s = fov / (fov + z2);
      out.x = cx + x2 * R * s;
      out.y = cy + y3 * R * s;
      out.z = z2;
      out.s = s;
    };

    const rotatePoint = (v: Vec3, R: number, cx: number, cy: number) => {
      const out = { x: 0, y: 0, z: 0, s: 0 };
      project(v, out, R, cx, cy);
      return out;
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      raf = requestAnimationFrame(frame);

      if (!onScreen) return;

      // ease the tilt toward its target
      tiltX += (targetTiltX - tiltX) * Math.min(1, dt * 3.5);
      tiltY += (targetTiltY - tiltY) * Math.min(1, dt * 3.5);
      spin += dt * speed * (1 + spinBoost * 0.9);

      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * radius;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < nodes.length; i++) project(nodes[i], projected[i], R, cx, cy);

      /* ---- edges: back half first so the front reads as "in front" ---- */
      ctx.lineCap = 'round';
      for (const [a, b] of edges) {
        const pa = projected[a];
        const pb = projected[b];
        const depth = (pa.z + pb.z) / 2;
        // depth 1 (far) → 0 (near); front edges brighter
        const near = (1 - depth) / 2;
        const alpha = 0.05 + near * 0.3;
        ctx.strokeStyle = `rgba(125, 211, 252, ${alpha.toFixed(3)})`;
        ctx.lineWidth = 0.35 + near * 0.85;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      /* ---- nodes ---- */
      const order = projected
        .map((p, i) => ({ i, z: p.z }))
        .sort((m, n) => n.z - m.z);

      for (const { i } of order) {
        const p = projected[i];
        const near = (1 - p.z) / 2;
        const isHub = hubs.has(i);
        const size = (isHub ? 2.6 : 1.35) * (0.55 + near * 1.05);
        const alpha = 0.25 + near * 0.75;

        if (isHub) {
          const sprite = sprites[1];
          const g = size * 9;
          ctx.globalAlpha = alpha * 0.75;
          ctx.drawImage(sprite, p.x - g / 2, p.y - g / 2, g, g);
          ctx.globalAlpha = 1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = isHub
          ? `rgba(167, 243, 208, ${alpha})`
          : `rgba(186, 230, 253, ${alpha * 0.85})`;
        ctx.fill();
      }

      /* ---- packets travelling along edges ---- */
      if (!prefersReduced) {
        for (const packet of packets) {
          packet.t += dt * packet.speed;

          if (packet.t >= 1) {
            const [a, b] = edges[packet.edge];
            pings.push({ node: packet.dir === 1 ? b : a, t: 0, hue: packet.hue });
            Object.assign(packet, spawn());
            continue;
          }

          const [a, b] = edges[packet.edge];
          const from = packet.dir === 1 ? nodes[a] : nodes[b];
          const to = packet.dir === 1 ? nodes[b] : nodes[a];
          const t = packet.t;

          // lerp then re-normalise so the path bows along the surface,
          // and lift it slightly so it reads as travelling *over* the mesh
          const lx = from.x + (to.x - from.x) * t;
          const ly = from.y + (to.y - from.y) * t;
          const lz = from.z + (to.z - from.z) * t;
          const len = Math.hypot(lx, ly, lz) || 1;
          const bow = 1 + Math.sin(Math.PI * t) * 0.07;
          const pos = { x: (lx / len) * bow, y: (ly / len) * bow, z: (lz / len) * bow };

          const pp = rotatePoint(pos, R, cx, cy);
          const near = (1 - pp.z) / 2;

          // trailing comet
          const trailSteps = 5;
          for (let s = trailSteps; s >= 1; s--) {
            const tt = Math.max(0, t - s * 0.035);
            const tx = from.x + (to.x - from.x) * tt;
            const ty = from.y + (to.y - from.y) * tt;
            const tz = from.z + (to.z - from.z) * tt;
            const tl = Math.hypot(tx, ty, tz) || 1;
            const tb = 1 + Math.sin(Math.PI * tt) * 0.07;
            const tp = rotatePoint({ x: (tx / tl) * tb, y: (ty / tl) * tb, z: (tz / tl) * tb }, R, cx, cy);
            const [r, g, bl] = HUES[packet.hue];
            ctx.beginPath();
            ctx.arc(tp.x, tp.y, (1.5 * (s / trailSteps)) * (0.5 + near), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${bl},${(0.06 + near * 0.14) * (1 - s / (trailSteps + 1))})`;
            ctx.fill();
          }

          const glow = (7 + near * 13) * 1.6;
          ctx.globalAlpha = 0.35 + near * 0.65;
          ctx.drawImage(sprites[packet.hue], pp.x - glow / 2, pp.y - glow / 2, glow, glow);
          ctx.globalAlpha = 1;

          ctx.beginPath();
          ctx.arc(pp.x, pp.y, 1 + near * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${0.5 + near * 0.5})`;
          ctx.fill();
        }

        /* ---- delivery pings ---- */
        pings = pings.filter((ping) => {
          ping.t += dt * 1.7;
          if (ping.t >= 1) return false;
          const p = projected[ping.node];
          const near = (1 - p.z) / 2;
          if (near < 0.35) return true; // hidden round the back
          const [r, g, b] = HUES[ping.hue];
          const eased = 1 - Math.pow(1 - ping.t, 3);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2 + eased * 16 * near, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - ping.t) * 0.5 * near})`;
          ctx.lineWidth = 1.1 * (1 - ping.t) + 0.2;
          ctx.stroke();
          return true;
        });
      }
    };

    if (prefersReduced) {
      // one static frame, no loop
      last = performance.now();
      frame(last + 16);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
    };
  });
</script>

<div bind:this={host} class="absolute inset-0 {className}" aria-hidden="true">
  <canvas bind:this={canvas} class="block h-full w-full"></canvas>
</div>
