"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { PROJECTS, Project } from "@/data/projects";
import { ChevronDown, Play, Sparkles } from "lucide-react";

interface VanteHeroProps {
  onSelectProject?: (project: Project) => void;
}

export default function VanteHero({ onSelectProject }: VanteHeroProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Floating hover pill state (active at p > 0.86)
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [pillPos, setPillPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // References for Three.js state
  const threeRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    curve: THREE.CatmullRomCurve3;
    cardMeshes: THREE.Mesh[];
    materials: THREE.ShaderMaterial[];
    videos: HTMLVideoElement[];
    curvePoints: THREE.Vector3[];
    currentProgress: number;
    targetProgress: number;
    mouse: THREE.Vector2;
    raycaster: THREE.Raycaster;
    animationId: number;
    isMobile: boolean;
  } | null>(null);

  // Headline transforms based on progress
  // CRAFT IN slides left-to-right (-50vw to +76vw)
  // MOTION slides opposite (+50vw to -76vw)
  // Crossing around p ~ 0.24
  const craftInX = -50 + scrollProgress * 126; // at p=0.24: -50 + 30.24 = -19.76vw
  const motionX = 50 - scrollProgress * 126;  // at p=0.24: 50 - 30.24 = +19.76vw
  const headlineOpacity = Math.max(0, 1 - Math.max(0, (scrollProgress - 0.38) / 0.18));
  const subCaptionOpacity = Math.max(0, 1 - Math.max(0, (scrollProgress - 0.32) / 0.15));

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;
    const isMobile = width < 768;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0b);
    scene.fog = new THREE.FogExp2(0x0a0a0b, 0.028);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // 2. 161 Sampled Centripetal Spline Curve
    // Cards pass close to camera (5.4 - 7.6 units) and extend up to 24 units away
    const splinePoints = [
      new THREE.Vector3(-18, 9, -24),
      new THREE.Vector3(-11, 4.5, -18),
      new THREE.Vector3(-5.2, 0.5, -11.5),
      new THREE.Vector3(-0.8, -0.2, -6.2), // close approach
      new THREE.Vector3(3.8, 1.2, -8.5),
      new THREE.Vector3(6.5, -1.8, -14.0),
      new THREE.Vector3(1.5, -3.2, -19.0),
      new THREE.Vector3(-7.0, -1.5, -23.0),
      new THREE.Vector3(-12.0, 3.0, -26.0),
    ];
    const curve = new THREE.CatmullRomCurve3(splinePoints, false, "centripetal");
    // Generate 161 sampled points
    const sampled161 = curve.getPoints(161);

    // Optional subtle golden ribbon rail line
    const railGeometry = new THREE.BufferGeometry().setFromPoints(sampled161);
    const railMaterial = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.18,
    });
    const railLine = new THREE.Line(railGeometry, railMaterial);
    scene.add(railLine);

    // 3. 8 Video Textures & Shader Cards
    const cardMeshes: THREE.Mesh[] = [];
    const materials: THREE.ShaderMaterial[] = [];
    const videos: HTMLVideoElement[] = [];

    // Shared geometry for cards (width: 3.2, height: 1.8 for 16:9 aspect)
    const cardGeo = new THREE.PlaneGeometry(3.2, 1.8, 16, 16);

    // Custom Shader with rounded corners (radius: 0.018), border glow, cover UV, and back-face flip
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        vNormal = normalMatrix * normal;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform vec2 uCardSize;
      uniform vec2 uTextureSize;
      uniform float uRadius;
      uniform vec3 uBorderColor;
      uniform float uBorderWidth;
      uniform float uGlowIntensity;
      uniform float uOpacity;
      uniform float uHover;
      varying vec2 vUv;

      float roundedBoxSDF(vec2 p, vec2 b, float r) {
        vec2 d = abs(p) - b + vec2(r);
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
      }

      void main() {
        // Flip UV.x if back-facing so video cards are never mirrored
        vec2 uv = vUv;
        if (!gl_FrontFacing) {
          uv.x = 1.0 - uv.x;
        }

        // Cover-fit UV calculation
        vec2 s = uCardSize;
        vec2 i = uTextureSize;
        float rs = s.x / s.y;
        float ri = i.x / i.y;
        vec2 coverUv = uv;
        if (rs > ri) {
          coverUv.y = (uv.y - 0.5) * (ri / rs) + 0.5;
        } else {
          coverUv.x = (uv.x - 0.5) * (rs / ri) + 0.5;
        }

        vec4 texColor = texture2D(uTexture, coverUv);

        // Distance field in card space
        vec2 halfSize = vec2(0.5 * rs, 0.5);
        vec2 p = (uv - 0.5) * vec2(rs, 1.0);
        float dist = roundedBoxSDF(p, halfSize, uRadius * rs);

        if (dist > 0.001) {
          discard;
        }

        // Border glow and line
        float borderDist = abs(dist);
        float borderLine = 1.0 - smoothstep(0.0, uBorderWidth, borderDist);
        float glow = exp(-borderDist * 65.0) * (uGlowIntensity + uHover * 0.45);

        vec3 activeBorder = mix(uBorderColor, vec3(0.95, 0.82, 0.50), uHover);
        vec3 col = mix(texColor.rgb, activeBorder, clamp(borderLine * 0.9 + glow, 0.0, 1.0));

        // Edge anti-aliasing
        float alpha = 1.0 - smoothstep(-0.002, 0.0, dist);
        gl_FragColor = vec4(col, alpha * uOpacity);
      }
    `;

    const textureLoader = new THREE.TextureLoader();

    // Create 8 cards mapped to first 8 projects
    for (let i = 0; i < 8; i++) {
      const proj = PROJECTS[i % PROJECTS.length];
      let texture: THREE.Texture;

      if (proj.videoSrc) {
        const vid = document.createElement("video");
        vid.src = proj.videoSrc;
        vid.crossOrigin = "anonymous";
        vid.loop = true;
        vid.muted = true;
        vid.playsInline = true;
        vid.preload = "auto";
        vid.play().catch(() => {
          // Auto-play might be deferred until user interaction
        });
        videos.push(vid);

        texture = new THREE.VideoTexture(vid);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBAFormat;
      } else {
        texture = textureLoader.load(proj.posterSrc);
      }

      const mat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: texture },
          uCardSize: { value: new THREE.Vector2(3.2, 1.8) },
          uTextureSize: { value: new THREE.Vector2(16, 9) },
          uRadius: { value: 0.018 },
          uBorderColor: { value: new THREE.Color(0xd4af37) },
          uBorderWidth: { value: 0.008 },
          uGlowIntensity: { value: 0.35 },
          uOpacity: { value: 1.0 },
          uHover: { value: 0.0 },
        },
        side: THREE.DoubleSide,
        transparent: true,
      });
      materials.push(mat);

      const mesh = new THREE.Mesh(cardGeo, mat);
      mesh.userData = { index: i, project: proj };
      cardMeshes.push(mesh);
      scene.add(mesh);
    }

    const mouse = new THREE.Vector2(-999, -999);
    const raycaster = new THREE.Raycaster();

    threeRef.current = {
      renderer,
      scene,
      camera,
      curve,
      cardMeshes,
      materials,
      videos,
      curvePoints: sampled161,
      currentProgress: 0,
      targetProgress: 0,
      mouse,
      raycaster,
      animationId: 0,
      isMobile,
    };

    // 4. Resize listener
    const handleResize = () => {
      if (!containerRef.current || !threeRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      threeRef.current.isMobile = w < 768;
      threeRef.current.camera.aspect = w / h;
      threeRef.current.camera.updateProjectionMatrix();
      threeRef.current.renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 5. Animation Render Loop
    let lastTime = performance.now();

    const animate = () => {
      if (!threeRef.current) return;
      const state = threeRef.current;
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smooth scroll interpolation: p += (target - p) * 0.09
      state.currentProgress += (state.targetProgress - state.currentProgress) * 0.09;
      const p = state.currentProgress;

      // Card Grid Target Calculation
      // As cards exit rail (p > 0.72 to 1.0), the first 6 transition into a 3x2 grid (or 2x3 for aspect < 0.9)
      const aspect = state.camera.aspect;
      const isPortrait = aspect < 0.9;
      const gridCols = isPortrait ? 2 : 3;
      const gridRows = isPortrait ? 3 : 2;
      const spacingX = isPortrait ? 2.3 : 3.6;
      const spacingY = isPortrait ? 1.5 : 2.1;
      const gridScale = isPortrait ? 0.65 : 0.95;

      // Transition blend factor between 0.72 and 0.96
      const gridBlend = THREE.MathUtils.clamp((p - 0.72) / 0.24, 0, 1);
      const easeGrid = 1 - Math.pow(1 - gridBlend, 3); // ease-out cubic

      // Position cards along spline & interpolate to grid
      const totalCards = 8;
      for (let i = 0; i < totalCards; i++) {
        const mesh = state.cardMeshes[i];
        const mat = state.materials[i];

        // Position on curve: distribute cards along curve with progress shift
        // Rail progress t in [0, 1]
        let t = (p * 0.75 + (i / totalCards)) % 1.0;
        if (t < 0) t += 1.0;

        const curvePos = state.curve.getPointAt(t);
        const curveTangent = state.curve.getTangentAt(t);

        // Rotation along curve
        const up = new THREE.Vector3(0, 1, 0);
        const lookTarget = curvePos.clone().add(curveTangent);

        // Check if this card belongs in the 6-card final grid
        if (i < 6) {
          const col = i % gridCols;
          const row = Math.floor(i / gridCols);
          const gridX = (col - (gridCols - 1) / 2) * spacingX;
          const gridY = ((gridRows - 1) / 2 - row) * spacingY;
          const gridZ = -4.8; // positioned nicely in camera frustum

          const gridPos = new THREE.Vector3(gridX, gridY, gridZ);
          mesh.position.lerpVectors(curvePos, gridPos, easeGrid);

          // Interpolate orientation: look at camera when in grid
          if (easeGrid > 0.01) {
            mesh.lookAt(lookTarget);
            const curveQuat = mesh.quaternion.clone();
            mesh.quaternion.identity(); // flat to camera
            mesh.quaternion.slerp(curveQuat, 1 - easeGrid);
          } else {
            mesh.lookAt(lookTarget);
          }

          // Scale adjustments
          mesh.scale.setScalar(1 + (gridScale - 1) * easeGrid);

          // Card opacity
          mat.uniforms.uOpacity.value = 1.0;
        } else {
          // Cards 6 & 7 fade out as grid establishes
          mesh.position.copy(curvePos);
          mesh.lookAt(lookTarget);
          mat.uniforms.uOpacity.value = Math.max(0, 1 - gridBlend * 1.5);
        }

        // Optimize video play/pause:
        // Video plays only when near camera or in grid
        const distToCam = mesh.position.distanceTo(state.camera.position);
        const vid = state.videos[i];
        if (vid) {
          if (distToCam < 20 && mat.uniforms.uOpacity.value > 0.1) {
            if (vid.paused) vid.play().catch(() => {});
          } else {
            if (!vid.paused) vid.pause();
          }
        }
      }

      // Raycasting for cursor hover past p = 0.86
      if (p >= 0.85) {
        state.raycaster.setFromCamera(state.mouse, state.camera);
        // Only test the 6 grid cards
        const gridMeshes = state.cardMeshes.slice(0, 6);
        const intersects = state.raycaster.intersectObjects(gridMeshes);

        if (intersects.length > 0) {
          const hit = intersects[0];
          const hitMesh = hit.object as THREE.Mesh;
          const proj = hitMesh.userData.project as Project;
          setHoveredProject(proj);

          // Set hover highlight uniform
          state.cardMeshes.forEach((m, idx) => {
            state.materials[idx].uniforms.uHover.value = m === hitMesh ? 1.0 : 0.0;
          });
        } else {
          setHoveredProject(null);
          state.cardMeshes.forEach((m, idx) => {
            state.materials[idx].uniforms.uHover.value = 0.0;
          });
        }
      } else {
        if (hoveredProject !== null) {
          setHoveredProject(null);
          state.cardMeshes.forEach((m, idx) => {
            state.materials[idx].uniforms.uHover.value = 0.0;
          });
        }
      }

      state.renderer.render(state.scene, state.camera);
      state.animationId = requestAnimationFrame(animate);
    };

    stateRunLoop: {
      threeRef.current.animationId = requestAnimationFrame(animate);
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (threeRef.current) {
        cancelAnimationFrame(threeRef.current.animationId);
        threeRef.current.videos.forEach((v) => {
          v.pause();
          v.src = "";
          v.load();
        });
        threeRef.current.renderer.dispose();
      }
    };
  }, []);

  // Scroll listener for the #track container (900vh)
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current || !threeRef.current) return;
      const track = trackRef.current;
      const rect = track.getBoundingClientRect();
      const scrollable = track.scrollHeight - window.innerHeight;
      const raw = -rect.top / scrollable;
      const clamped = Math.min(Math.max(raw, 0), 1);

      threeRef.current.targetProgress = clamped;
      setScrollProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pointer move handler for pill position and raycasting
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || !threeRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPillPos({ x: e.clientX, y: e.clientY });

    // Normalized Device Coordinates (-1 to +1)
    const ndcX = (x / rect.width) * 2 - 1;
    const ndcY = -(y / rect.height) * 2 + 1;
    threeRef.current.mouse.set(ndcX, ndcY);
  }, []);

  // Click on card in grid to open project modal
  const handleCanvasClick = useCallback(() => {
    if (hoveredProject && onSelectProject) {
      onSelectProject(hoveredProject);
    }
  }, [hoveredProject, onSelectProject]);

  return (
    <div
      id="track"
      ref={trackRef}
      className="relative w-full"
      style={{ height: "900vh" }}
    >
      {/* Sticky 100vh stage */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onClick={handleCanvasClick}
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0b] cursor-default select-none"
      >
        {/* Three.js Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full block pointer-events-auto"
        />

        {/* Ambient Subtle Vignette & Gradient Overlays */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,11,0.75)_100%)]" />

        {/* Headline split: CRAFT IN and MOTION crossing at p ~ 0.24 */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 z-10 transition-opacity duration-200"
          style={{ opacity: headlineOpacity }}
        >
          <div className="relative w-full max-w-7xl flex flex-col items-center overflow-visible">
            {/* Top row: CRAFT IN */}
            <div
              className="will-change-transform transform-gpu flex items-center justify-center whitespace-nowrap"
              style={{
                transform: `translateX(${craftInX}vw)`,
              }}
            >
              <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black uppercase tracking-tightest leading-none gold-gradient-text drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]">
                CRAFT IN
              </h1>
            </div>

            {/* Bottom row: MOTION */}
            <div
              className="will-change-transform transform-gpu flex items-center justify-center whitespace-nowrap mt-[-0.15em]"
              style={{
                transform: `translateX(${motionX}vw)`,
              }}
            >
              <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black uppercase tracking-tightest leading-none text-[#f4f1ea] drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]">
                MOTION
              </h1>
            </div>

            {/* Sub-caption */}
            <div
              className="mt-6 sm:mt-8 flex flex-col items-center text-center transition-opacity duration-300"
              style={{ opacity: subCaptionOpacity }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-[#121214]/80 backdrop-blur-md text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-gold">
                <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
                <span>DAREN P. APELO // VISUAL PORTFOLIO</span>
              </div>
              <p className="mt-4 max-w-2xl text-xs sm:text-sm md:text-base font-medium tracking-wider text-[#c8c5bc] uppercase">
                FINANCIAL MARKETING STRATEGY MEETS HIGH-RETENTION EDITING.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar & Phase Indicator */}
        <div className="absolute bottom-8 left-6 sm:left-12 z-20 pointer-events-none flex items-center gap-4">
          <div className="w-24 sm:w-36 h-[2px] bg-[#27272a] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold to-[#f4f1ea] transition-all duration-75"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <div className="text-[10px] sm:text-xs font-mono tracking-widest text-muted">
            {scrollProgress < 0.35
              ? "PHASE 01 // OVERVIEW"
              : scrollProgress < 0.72
              ? "PHASE 02 // 3D CINEMATIC RAIL"
              : "PHASE 03 // FEATURED VAULT"}
          </div>
        </div>

        {/* Scroll hint when at the top */}
        <div
          className={`absolute bottom-8 right-6 sm:right-12 z-20 pointer-events-none flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8d8b86] transition-opacity duration-500 ${
            scrollProgress > 0.12 ? "opacity-0" : "opacity-100 animate-bounce"
          }`}
        >
          <span>SCROLL TO DIVE IN</span>
          <ChevronDown className="w-4 h-4 text-gold" />
        </div>

        {/* Grid active callout (p > 0.82) */}
        <div
          className={`absolute top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center text-center transition-all duration-500 ${
            scrollProgress >= 0.82 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-gold">
            FEATURED SELECTION
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-[#f4f1ea]">
            Click Any Frame to Inspect Breakdown
          </h2>
        </div>

        {/* Floating Gold/Ink Pill Indicator when hovering past p = 0.86 */}
        {hoveredProject && scrollProgress >= 0.85 && (
          <div
            className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-16 transition-transform duration-75 ease-out"
            style={{
              left: `${pillPos.x}px`,
              top: `${pillPos.y}px`,
            }}
          >
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#121214]/95 border border-gold/60 shadow-[0_10px_30px_rgba(212,175,55,0.25)] backdrop-blur-xl">
              <span className="inline-block w-2 h-2 rounded-full bg-gold animate-ping" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gold">
                  {hoveredProject.categoryLabel} &bull; {hoveredProject.runtime}
                </span>
                <span className="text-xs font-semibold text-[#f4f1ea] whitespace-nowrap">
                  {hoveredProject.title}
                </span>
              </div>
              <div className="ml-1 pl-2 border-l border-white/10 flex items-center gap-1 text-[11px] font-medium text-gold-light">
                <Play className="w-3 h-3 fill-current" />
                <span>VIEW</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
