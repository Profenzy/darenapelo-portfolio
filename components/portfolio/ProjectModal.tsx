"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Project } from "@/data/projects";
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Clock,
  Globe,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Monitor,
  ExternalLink,
} from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onInquire: (project: Project) => void;
}

export default function ProjectModal({ project, onClose, onInquire }: ProjectModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      setIsPlaying(true);
      setIsMuted(false);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const isVertical = project.aspectRatio === "9:16";
  const isDriveStream = Boolean(project.driveEmbedUrl);

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

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setProgress((cur / dur) * 100);

    const curMins = Math.floor(cur / 60);
    const curSecs = Math.floor(cur % 60);
    setCurrentTime(`${curMins}:${curSecs < 10 ? "0" : ""}${curSecs}`);

    const durMins = Math.floor(dur / 60);
    const durSecs = Math.floor(dur % 60);
    setDuration(`${durMins}:${durSecs < 10 ? "0" : ""}${durSecs}`);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const handleFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-[#0a0a0b]/90 backdrop-blur-xl animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#121214] border border-[#27272a] shadow-[0_25px_70px_rgba(0,0,0,0.85)] z-10 flex flex-col no-scrollbar">
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-[#0a0a0b]/80 border border-white/10 text-[#f4f1ea] hover:text-gold hover:border-gold/50 backdrop-blur-md transition-all shadow-lg"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Header Stage */}
        <div className="relative w-full bg-[#080809] p-3 sm:p-6 overflow-hidden flex items-center justify-center border-b border-[#1a1a1e]">
          <div
            className={`relative overflow-hidden rounded-2xl bg-black flex items-center justify-center shadow-2xl group ${
              isVertical
                ? "w-[260px] sm:w-[300px] aspect-[9/16] max-h-[62vh]"
                : "w-full max-w-4xl aspect-[16/9]"
            }`}
          >
            {/* 1. Google Drive Streaming Player for Long Forms */}
            {isDriveStream ? (
              <iframe
                src={project.driveEmbedUrl}
                allow="autoplay; fullscreen"
                allowFullScreen
                className="w-full h-full border-0 rounded-2xl bg-black"
                title={project.title}
              />
            ) : project.videoSrc ? (
              /* 2. HTML5 Video Player for Short Forms & AMVs */
              <>
                <video
                  ref={videoRef}
                  src={project.videoSrc}
                  autoPlay
                  playsInline
                  loop
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  onClick={togglePlay}
                  className="w-full h-full object-contain cursor-pointer"
                />

                {/* Hover overlay controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* In-Frame Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex flex-col gap-2 z-20">
                  <div
                    onClick={handleSeek}
                    className="w-full h-1.5 bg-white/20 hover:h-2.5 rounded-full cursor-pointer relative transition-all group/bar"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full relative"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#f4f1ea] shadow-md scale-0 group-hover/bar:scale-100 transition-transform" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-[#f4f1ea]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={togglePlay}
                        className="p-1.5 rounded-full bg-white/10 hover:bg-gold hover:text-black transition-colors"
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="p-1.5 rounded-full bg-white/10 hover:bg-gold hover:text-black transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                      <span className="text-[11px] text-[#8d8b86]">
                        {currentTime} / {duration !== "0:00" ? duration : project.runtime}
                      </span>
                    </div>

                    <button
                      onClick={handleFullScreen}
                      className="p-1.5 rounded-full bg-white/10 hover:bg-gold hover:text-black transition-colors"
                    >
                      <Maximize className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </>
            ) : project.posterSrc ? (
              <Image
                src={project.posterSrc}
                alt={project.title}
                fill
                className="object-contain"
              />
            ) : null}
          </div>
        </div>

        {/* Modal Info & Strategy Content */}
        <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#1a1a1e]">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-xs font-mono uppercase tracking-wider text-gold flex items-center gap-1">
                  {isVertical ? <Smartphone className="w-3 h-3 text-gold" /> : <Monitor className="w-3 h-3 text-gold" />}
                  {project.categoryLabel}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#1a1a1e] border border-[#27272a] text-xs font-mono uppercase text-[#c8c5bc] flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-gold" />
                  {project.language}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#1a1a1e] border border-[#27272a] text-xs font-mono uppercase text-[#c8c5bc]">
                  {project.platform}
                </span>
                {project.client && (
                  <span className="px-3 py-1 rounded-full bg-[#1a1a1e] border border-[#27272a] text-xs font-mono uppercase text-muted">
                    Client: {project.client}
                  </span>
                )}
              </div>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-[#f4f1ea]">
                {project.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#8d8b86]">
                {project.subtitle}
              </p>
            </div>

            {project.retentionMetric && (
              <div className="shrink-0 p-4 rounded-2xl bg-gradient-to-br from-[#1a1a1e] to-[#121214] border border-gold/30 flex flex-col items-start lg:items-end">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-gold" />
                  PROVEN RETENTION LIFT
                </span>
                <span className="font-display text-2xl sm:text-3xl font-black text-[#f4f1ea] mt-1">
                  {project.retentionMetric}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-gold mb-2">
                  OVERVIEW &amp; FINANCIAL MANAGEMENT RETENTION OBJECTIVE
                </h4>
                <p className="text-sm text-[#c8c5bc] leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-gold mb-3">
                  RETENTION &amp; PACING STRATEGY
                </h4>
                <ul className="space-y-3">
                  {project.strategyNotes.map((note, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-[#1a1a1e]/60 border border-[#27272a] text-xs sm:text-sm text-[#c8c5bc]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-between p-6 rounded-2xl bg-[#1a1a1e]/40 border border-[#27272a] space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#f4f1ea] mb-3">
                  DELIVERABLE SPECIFICATIONS
                </h4>
                <div className="space-y-2">
                  {project.deliverables?.map((deliv) => (
                    <div
                      key={deliv}
                      className="flex items-center gap-2 text-xs font-mono text-[#8d8b86]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-xs font-mono text-[#8d8b86]">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>Aspect: {project.aspectRatio}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#8d8b86]">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>Pacing Focus: {project.primaryFocus}</span>
                  </div>
                </div>
              </div>

              {/* Direct Google Drive Link if available */}
              {project.driveShareUrl && (
                <a
                  href={project.driveShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a1a1e] border border-gold/40 text-gold hover:bg-gold hover:text-black font-mono text-xs uppercase tracking-wider transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Master in Google Drive</span>
                </a>
              )}

              <div className="pt-2 border-t border-[#27272a]">
                <button
                  onClick={() => {
                    onClose();
                    onInquire(project);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-[#0a0a0b] font-display font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] transition-all hover:scale-[1.02]"
                >
                  <span>INQUIRE ABOUT THIS STYLE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
