/**
 * Shader materials shared by the WebGL scenes.
 *
 * Everything renders additively onto a transparent canvas, so "dark" simply
 * means "invisible" — that lets depth fade, fog and glow all fall out of a
 * single blending mode without a post-processing pass.
 */
import * as THREE from 'three';

/* -------------------------------------------------------------------------- */
/* Glow points — nodes, packets, particles                                      */
/* -------------------------------------------------------------------------- */

const POINT_VERT = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aAlpha;

  uniform float uPixelRatio;
  uniform float uProjScale;
  uniform float uUnit;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vDepth;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uUnit * uProjScale * uPixelRatio / max(0.1, -mv.z);
    vColor = aColor;
    vAlpha = aAlpha;
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const POINT_FRAG = /* glsl */ `
  uniform float uNear;
  uniform float uFar;
  uniform float uRing;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vDepth;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    if (d > 1.0) discard;

    float depthFade = mix(0.12, 1.0, smoothstep(uFar, uNear, vDepth));

    float glow;
    float hot;
    if (uRing > 0.5) {
      // thin expanding ring for delivery pings
      float band = 1.0 - abs(d - 0.82) / 0.18;
      glow = clamp(band, 0.0, 1.0);
      hot = glow * 0.35;
    } else {
      float core = 1.0 - d;
      glow = pow(core, 2.2);
      hot = smoothstep(0.28, 0.0, d);
    }

    float a = glow * vAlpha * depthFade;
    vec3 col = vColor * a + vec3(1.0) * hot * vAlpha * depthFade * 0.85;
    gl_FragColor = vec4(col, a);
  }
`;

export function createPointsMaterial(ring = false) {
  return new THREE.ShaderMaterial({
    vertexShader: POINT_VERT,
    fragmentShader: POINT_FRAG,
    uniforms: {
      uPixelRatio: { value: 1 },
      uProjScale: { value: 1 },
      uUnit: { value: 1 },
      uNear: { value: 10 },
      uFar: { value: 14 },
      uRing: { value: ring ? 1 : 0 }
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
}

/* -------------------------------------------------------------------------- */
/* Holographic surface — fresnel rim, scanlines, a little flicker              */
/* -------------------------------------------------------------------------- */

const HOLO_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPos;
  varying float vDepth;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = viewMatrix * worldPos;
    vViewDir = normalize(-mv.xyz);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const HOLO_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uColor2;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uScan;
  uniform float uNear;
  uniform float uFar;

  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPos;
  varying float vDepth;

  void main() {
    float facing = clamp(dot(normalize(vNormal), normalize(vViewDir)), 0.0, 1.0);
    float fres = pow(1.0 - facing, 2.4);

    float scan = 0.5 + 0.5 * sin(vWorldPos.y * uScan - uTime * 2.2);
    scan = mix(0.72, 1.0, scan);

    float flicker = 0.95 + 0.05 * sin(uTime * 19.0 + vWorldPos.x * 6.0);
    float depthFade = mix(0.2, 1.0, smoothstep(uFar, uNear, vDepth));

    vec3 col = mix(uColor, uColor2, fres);
    float a = (0.06 + fres * 0.95) * scan * flicker * uOpacity * depthFade;
    gl_FragColor = vec4(col * a, a);
  }
`;

export function createHoloMaterial(color: THREE.ColorRepresentation, color2: THREE.ColorRepresentation, opacity = 1) {
  return new THREE.ShaderMaterial({
    vertexShader: HOLO_VERT,
    fragmentShader: HOLO_FRAG,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uColor2: { value: new THREE.Color(color2) },
      uTime: { value: 0 },
      uOpacity: { value: opacity },
      uScan: { value: 22 },
      uNear: { value: 10 },
      uFar: { value: 14 }
    },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
  });
}

/** Radial glow sprite, used for the halo around hubs and the core. */
export function createGlowTexture(size = 128) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.18, 'rgba(255,255,255,0.55)');
  g.addColorStop(0.5, 'rgba(255,255,255,0.12)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
