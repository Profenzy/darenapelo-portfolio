"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { PROJECTS, Project } from "@/data/projects";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface VanteHeroProps {
  onSelectProject?: (project: Project) => void;
}

export default function VanteHero({ onSelectProject }: VanteHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Active showcase index
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<"featured" | "shorts" | "longforms">("featured");

  // Select filtered subsets for the hero reel
  const heroProjects = React.useMemo(() => {
    if (activeTab === "shorts") {
      return PROJECTS.filter((p) => p.aspectRatio === "9:16");
    }
    if (activeTab === "longforms") {
      return PROJECTS.filter((p) => p.aspectRatio === "16:9");
    }
    // Featured mix: top shorts and top longforms
    return [
      PROJECTS.find((p) => p.id === "short-5-questions") || PROJECTS[0],
      PROJECTS.find((p) => p.id === "long-freddy-money") || PROJECTS[1],
      PROJECTS.find((p) => p.id === "amv-pacing-vfx") || PROJECTS[2],
      PROJECTS.find((p) => p.id === "long-kristen-oja") || PROJECTS[3],
      PROJECTS.find((p) => p.id === "short-output-cut") || PROJECTS[4],
      PROJECTS.find((p) => p.id === "long-laloba") || PROJECTS[5],
    ];
  }, [activeTab]);

  const currentProject = heroProjects[activeIndex % heroProjects.length];

  // Handle active slide change
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % heroProjects.length);
  };
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + heroProjects.length) % heroProjects.length);
  };

  // Video play/pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Auto-play new video when index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [activeIndex, activeTab]);

  // Subtle interactive 3D WebGL golden ribbon backdrop
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let width = canvas.clientWidth || window.innerWidth;
    let height = canvas.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0b, 0.035);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);

    // Create 3D flowing golden curves and subtle particle constellation
    const curvePoints = [
      new THREE.Vector3(-12, 6, -8),
      new THREE.Vector3(-6, -2, -4),
      new THREE.Vector3(0, 3, -2),
      new THREE.Vector3(7, -3, -6),
      new THREE.Vector3(12, 4, -10),
    ];
    const curve = new THREE.CatmullRomCurve3(curvePoints, false, "centripetal");
    const points = curve.getPoints(120);

    // Golden ribbon line
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.35,
    });
    const line = new THREE.Line(lineGeo, lineMat);
    scene.add(line);

    // Floating gold particle dust
    const particleCount = 120;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 24;
      posArray[i + 1] = (Math.random() - 0.5) * 16;
      posArray[i + 2] = (Math.random() - 0.5) * 16 - 4;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe5c07b,
      size: 0.05,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse parallax tracking
    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      targetY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Gentle wave in particles and line
      particles.rotation.y = elapsed * 0.03;
      line.rotation.z = Math.sin(elapsed * 0.2) * 0.05;

      // Camera parallax interpolation
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen pt-28 pb-16 sm:py-32 flex flex-col justify-center items-center overflow-hidden bg-[#0a0a0b]">
      {/* Interactive 3D WebGL Canvas Backdrop */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Atmospheric Radial Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gold/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-t from-[#0a0a0b] to-transparent pointer-events-none z-10" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Top Badges & Status */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-[#121214]/80 backdrop-blur-md text-[11px] font-mono tracking-widest uppercase text-gold">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>FINANCIAL MANAGEMENT GRADUATE &bull; VIDEO EDITOR</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-[#121214]/60 text-[11px] font-mono tracking-wider text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ENGLISH &amp; SPANISH CUTS</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-5xl mb-4 sm:mb-6">
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tightest leading-[0.9] text-[#f4f1ea] drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
            CRAFT IN <span className="gold-gradient-text">MOTION</span>
          </h1>
          <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base font-mono uppercase tracking-wider text-[#c8c5bc] max-w-2xl mx-auto leading-relaxed">
            FINANCIAL MANAGEMENT STRATEGY MEETS HIGH-RETENTION EDITING.
          </p>
        </div>

        {/* Category Filter Pills for Hero Reel */}
        <div className="flex items-center gap-2 mb-8 bg-[#121214]/80 p-1.5 rounded-full border border-[#27272a] backdrop-blur-md">
          <button
            onClick={() => {
              setActiveTab("featured");
              setActiveIndex(0);
            }}
            className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === "featured"
                ? "bg-gold text-[#0a0a0b] font-bold shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                : "text-[#8d8b86] hover:text-[#f4f1ea]"
            }`}
          >
            Featured Mix
          </button>
          <button
            onClick={() => {
              setActiveTab("shorts");
              setActiveIndex(0);
            }}
            className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === "shorts"
                ? "bg-gold text-[#0a0a0b] font-bold shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                : "text-[#8d8b86] hover:text-[#f4f1ea]"
            }`}
          >
            Short Forms (9:16)
          </button>
          <button
            onClick={() => {
              setActiveTab("longforms");
              setActiveIndex(0);
            }}
            className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === "longforms"
                ? "bg-gold text-[#0a0a0b] font-bold shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                : "text-[#8d8b86] hover:text-[#f4f1ea]"
            }`}
          >
            Long Forms (16:9)
          </button>
        </div>

        {/* HERO INTERACTIVE SHOWCASE STAGE (Never stretched, true aspect ratios!) */}
        <div className="relative w-full max-w-4xl flex flex-col items-center">
          {/* Main Display Container */}
          <div className="relative w-full flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
            {/* Centerpiece Showcase Card */}
            {currentProject.aspectRatio === "9:16" ? (
              /* True 9:16 Smartphone Styled Frame */
              <div className="relative w-[240px] sm:w-[280px] md:w-[310px] aspect-[9/16] rounded-[2.5rem] bg-[#121214] border-2 border-gold/40 shadow-[0_20px_60px_rgba(212,175,55,0.18)] p-2.5 overflow-hidden group transition-all duration-500">
                {/* Smartphone Speaker / Notch cutout */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#0a0a0b] rounded-full z-20 flex items-center justify-center">
                  <div className="w-8 h-1 bg-white/20 rounded-full" />
                </div>

                {/* Video Container (Strictly aspect 9:16, object-contain/cover without distortion) */}
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black flex items-center justify-center">
                  {currentProject.videoSrc ? (
                    <video
                      ref={videoRef}
                      src={currentProject.videoSrc}
                      autoPlay
                      playsInline
                      loop
                      muted={isMuted}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={togglePlay}
                    />
                  ) : (
                    <Image
                      src={currentProject.posterSrc}
                      alt={currentProject.title}
                      fill
                      className="object-cover"
                    />
                  )}

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Overlay Controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                    <button
                      onClick={togglePlay}
                      className="p-2.5 rounded-full bg-[#0a0a0b]/80 border border-white/20 text-gold hover:text-white backdrop-blur-md transition-colors"
                      aria-label="Play/Pause"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current translate-x-0.5" />
                      )}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-2.5 rounded-full bg-[#0a0a0b]/80 border border-white/20 text-gold hover:text-white backdrop-blur-md transition-colors"
                      aria-label="Mute/Unmute"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* True 16:9 Widescreen Masterclass Frame */
              <div className="relative w-full max-w-2xl aspect-[16/9] rounded-3xl bg-[#121214] border-2 border-gold/40 shadow-[0_20px_60px_rgba(212,175,55,0.18)] p-2.5 overflow-hidden group transition-all duration-500">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                  {currentProject.videoSrc ? (
                    <video
                      ref={videoRef}
                      src={currentProject.videoSrc}
                      autoPlay
                      playsInline
                      loop
                      muted={isMuted}
                      className="w-full h-full object-contain cursor-pointer"
                      onClick={togglePlay}
                    />
                  ) : (
                    <Image
                      src={currentProject.posterSrc}
                      alt={currentProject.title}
                      fill
                      className="object-cover"
                    />
                  )}

                  {/* Gradient bottom shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Overlay Controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                    <button
                      onClick={togglePlay}
                      className="p-2.5 rounded-full bg-[#0a0a0b]/80 border border-white/20 text-gold hover:text-white backdrop-blur-md transition-colors"
                      aria-label="Play/Pause"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current translate-x-0.5" />
                      )}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-2.5 rounded-full bg-[#0a0a0b]/80 border border-white/20 text-gold hover:text-white backdrop-blur-md transition-colors"
                      aria-label="Mute/Unmute"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 sm:-left-6 lg:-left-12 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-[#121214]/90 border border-gold/30 text-gold hover:bg-gold hover:text-black backdrop-blur-md transition-all shadow-xl z-30"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 sm:-right-6 lg:-right-12 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-[#121214]/90 border border-gold/30 text-gold hover:bg-gold hover:text-black backdrop-blur-md transition-all shadow-xl z-30"
              aria-label="Next Project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Under-Card Project Meta Details & CTA */}
          <div className="mt-6 flex flex-col items-center text-center space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-gold">
                {currentProject.categoryLabel}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1a1a1e] border border-[#27272a] text-[10px] sm:text-xs font-mono text-[#c8c5bc]">
                {currentProject.platform} &bull; {currentProject.runtime}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1a1a1e] border border-[#27272a] text-[10px] sm:text-xs font-mono text-gold-light">
                {currentProject.primaryFocus}
              </span>
            </div>

            <h3 className="font-display font-bold text-xl sm:text-2xl uppercase text-[#f4f1ea]">
              {currentProject.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#8d8b86] max-w-xl">
              {currentProject.subtitle}
            </p>

            {/* Inspect Button & Vault Navigation */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onSelectProject && onSelectProject(currentProject)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold hover:bg-gold-light text-[#0a0a0b] font-display font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all hover:scale-105"
              >
                <span>INSPECT STRATEGY &amp; SPECS</span>
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              <a
                href="#vault"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-[#8d8b86] hover:text-gold transition-colors"
              >
                <span>BROWSE FULL VAULT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
