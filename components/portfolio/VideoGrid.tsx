"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { PROJECTS, Project } from "@/data/projects";
import { Play, Volume2, VolumeX, Maximize2, Sparkles, Filter, Clock, Globe, Film, Smartphone, Monitor } from "lucide-react";

interface VideoGridProps {
  onSelectProject: (project: Project) => void;
}

type FilterCategory = "All" | "LONG FORMS" | "SHORT FORMS" | "AMVs" | "CRYPTO";

export default function VideoGrid({ onSelectProject }: VideoGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [mutedVideoId, setMutedVideoId] = useState<string | null>(null);

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const filterTabs: { label: string; value: FilterCategory; count: number }[] = [
    { label: "All Projects", value: "All", count: PROJECTS.length },
    {
      label: "Long Forms (16:9)",
      value: "LONG FORMS",
      count: PROJECTS.filter((p) => p.category === "LONG FORMS").length,
    },
    {
      label: "Short Forms (9:16)",
      value: "SHORT FORMS",
      count: PROJECTS.filter((p) => p.category === "SHORT FORMS").length,
    },
    {
      label: "AMV's (Anime)",
      value: "AMVs",
      count: PROJECTS.filter((p) => p.category === "AMVs").length,
    },
    {
      label: "Crypto & Web3",
      value: "CRYPTO",
      count: PROJECTS.filter((p) => p.category === "CRYPTO").length,
    },
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const togglePlay = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[projectId];
    if (!vid) return;

    if (playingVideoId === projectId) {
      vid.pause();
      setPlayingVideoId(null);
    } else {
      if (playingVideoId && videoRefs.current[playingVideoId]) {
        videoRefs.current[playingVideoId]?.pause();
      }
      vid.play().then(() => setPlayingVideoId(projectId)).catch(() => {});
    }
  };

  const toggleMute = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[projectId];
    if (!vid) return;

    const isCurrentlyMuted = vid.muted;
    vid.muted = !isCurrentlyMuted;
    setMutedVideoId(vid.muted ? projectId : null);
  };

  return (
    <section id="vault" className="relative py-20 sm:py-32 bg-[#0a0a0b] border-t border-[#1a1a1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121214] border border-gold/30 text-[11px] font-mono uppercase tracking-widest text-gold mb-4">
              <Film className="w-3.5 h-3.5" />
              <span>THE REPERTOIRE ARCHIVE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#f4f1ea]">
              Filterable <span className="gold-gradient-text">Video Vault</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#8d8b86]">
            Every asset is delivered in its native aspect ratio. Engineered for high watch time, retention curves, custom sound design, and viral audience conversion.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-gold text-[#0a0a0b] font-bold shadow-[0_0_20px_rgba(212,175,55,0.35)] scale-105"
                    : "bg-[#121214] text-[#8d8b86] hover:text-[#f4f1ea] border border-[#27272a] hover:border-gold/40"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-[#0a0a0b]/20 text-[#0a0a0b]" : "bg-[#1a1a1e] text-[#8d8b86]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {filteredProjects.map((project) => {
            const isPlaying = playingVideoId === project.id;
            const isMuted = mutedVideoId === project.id || (playingVideoId !== project.id);
            const isVertical = project.aspectRatio === "9:16";

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group relative flex flex-col rounded-2xl bg-[#121214] border border-[#27272a] hover:border-gold/60 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_20px_45px_rgba(212,175,55,0.12)] hover:-translate-y-1"
              >
                {/* Media Container: strict aspect ratio without stretching! */}
                <div
                  className={`relative w-full bg-black overflow-hidden flex items-center justify-center ${
                    isVertical ? "aspect-[9/16] max-h-[460px]" : "aspect-[16/9]"
                  }`}
                >
                  {/* Poster Thumbnail */}
                  <Image
                    src={project.posterSrc}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`transition-all duration-700 ${
                      isVertical ? "object-cover" : "object-contain bg-black"
                    } ${
                      isPlaying ? "opacity-0 pointer-events-none" : "opacity-90 group-hover:opacity-100 group-hover:scale-105"
                    }`}
                  />

                  {/* HTML5 Video element */}
                  {project.videoSrc && (
                    <video
                      ref={(el) => {
                        videoRefs.current[project.id] = el;
                      }}
                      src={project.videoSrc}
                      loop
                      playsInline
                      muted={isMuted}
                      preload="metadata"
                      className={`absolute inset-0 w-full h-full ${
                        isVertical ? "object-cover" : "object-contain"
                      } transition-opacity duration-300 ${
                        isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    />
                  )}

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-black/40 pointer-events-none" />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    <span className="px-2.5 py-1 rounded-md bg-[#0a0a0b]/85 border border-white/10 text-[10px] font-mono tracking-wider text-gold uppercase backdrop-blur-md flex items-center gap-1">
                      {isVertical ? <Smartphone className="w-3 h-3 text-gold" /> : <Monitor className="w-3 h-3 text-gold" />}
                      {project.categoryLabel}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#0a0a0b]/85 border border-white/10 text-[10px] font-mono tracking-wider text-[#f4f1ea] uppercase backdrop-blur-md flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold" />
                      {project.runtime}
                    </span>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div
                      className={`w-14 h-14 rounded-full bg-gold/90 text-[#0a0a0b] flex items-center justify-center shadow-2xl transition-all duration-300 ${
                        isPlaying
                          ? "opacity-0 scale-75 group-hover:opacity-80"
                          : "opacity-85 scale-100 group-hover:scale-110 group-hover:bg-gold"
                      }`}
                    >
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>

                  {/* In-Card Video Quick Controls */}
                  {project.videoSrc && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
                      <button
                        onClick={(e) => togglePlay(project.id, e)}
                        className="p-2 rounded-full bg-[#0a0a0b]/80 border border-white/10 text-gold hover:text-white backdrop-blur-md transition-colors"
                        title={isPlaying ? "Pause preview" : "Play preview"}
                      >
                        <Play className={`w-3.5 h-3.5 ${isPlaying ? "fill-current" : ""}`} />
                      </button>
                      {isPlaying && (
                        <button
                          onClick={(e) => toggleMute(project.id, e)}
                          className="p-2 rounded-full bg-[#0a0a0b]/80 border border-white/10 text-gold hover:text-white backdrop-blur-md transition-colors"
                          title={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? (
                            <VolumeX className="w-3.5 h-3.5" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Retention Metric Tag if available */}
                  {project.retentionMetric && (
                    <div className="absolute bottom-3 left-3 pointer-events-none z-10">
                      <span className="px-2.5 py-1 rounded-md bg-gold/20 border border-gold/40 text-[10px] font-mono text-gold-light uppercase backdrop-blur-md flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-gold" />
                        {project.retentionMetric}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Meta & Breakdown */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2.5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#1a1a1e] text-[#c8c5bc] border border-[#27272a]">
                        <Globe className="w-2.5 h-2.5 text-gold" />
                        {project.language}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1a1a1e] text-[#c8c5bc] border border-[#27272a]">
                        {project.platform}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold/10 text-gold-light border border-gold/20">
                        {project.primaryFocus}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold uppercase text-[#f4f1ea] group-hover:text-gold-light transition-colors line-clamp-1 mb-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#8d8b86] line-clamp-2 leading-relaxed">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-4 pt-3 border-t border-[#1a1a1e] flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#8d8b86] group-hover:text-gold transition-colors">
                    <span>INSPECT STRATEGY</span>
                    <Maximize2 className="w-3.5 h-3.5 group-hover:scale-125 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
