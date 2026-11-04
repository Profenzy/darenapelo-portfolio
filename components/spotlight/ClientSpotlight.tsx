"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Award, CheckCircle2, TrendingUp, Play, Sparkles, BookOpen, Layers, ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

interface ClientSpotlightProps {
  onOpenProject?: (project: Project) => void;
}

export default function ClientSpotlight({ onOpenProject }: ClientSpotlightProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const deliverables = [
    {
      title: "Episodic Masterclass Modules",
      desc: "Distilled multi-hour raw lectures into fast-moving 14-minute high-retention modules with clear visual signposts and structured chapters.",
    },
    {
      title: "Multi-Platform Viral Promotional Reels",
      desc: "Engineered TikTok and Instagram hook variants in native Spanish to funnel tens of thousands of organic viewers into the high-ticket curriculum.",
    },
    {
      title: "Bilingual Webinar & Course Visual Assets",
      desc: "Custom financial slide redesigns, animated wealth equation overlays, and motion graphics reinforcing authority and prestige.",
    },
  ];

  const caseMetrics = [
    { value: "3.4X", label: "Average Watch Time Lift", sub: "Compared to previous lecture format" },
    { value: "94%", label: "Course Completion Rate", sub: "Students finishing all video modules" },
    { value: "2", label: "Target Markets Captured", sub: "United States Hispanic & Latin America" },
    { value: "50+", label: "Assets Delivered & Deployed", sub: "Masterclasses, teasers & ad variants" },
  ];

  return (
    <section id="spotlight" className="relative py-24 sm:py-32 bg-[#0d0d0f] border-t border-[#1a1a1e] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gold/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-surface-raised blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Tag */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121214] border border-gold/40 text-[11px] font-mono uppercase tracking-widest text-gold mb-4">
              <Award className="w-3.5 h-3.5 text-gold" />
              <span>KEY CLIENT CASE STUDY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#f4f1ea]">
              Client Spotlight: <span className="gold-gradient-text">Trixy Castro</span>
            </h2>
            <p className="mt-2 text-base text-[#8d8b86] font-mono">
              La Escuela Nueva &bull; Success Unlocked &bull; High-Ticket Spanish Education
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8d8b86]">
            <span>INDUSTRY:</span>
            <span className="text-gold">FINANCE & WEALTH EDUCATION</span>
          </div>
        </div>

        {/* Spotlight Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column: Media Preview */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#121214] border border-gold/30 p-2 sm:p-3 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
              {/* Media Frame */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#080809]">
                <Image
                  src="/thumbnails/longform-tn.png"
                  alt="Trixy Castro La Escuela Nueva Masterclass Thumbnail"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/90 via-black/20 to-transparent pointer-events-none" />

                {/* Live video layer if playing */}
                {isPlaying && (
                  <video
                    src="/videos/short-02.mp4"
                    autoPlay
                    controls
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-20"
                  />
                )}

                {/* Center play button */}
                {!isPlaying && (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold/90 hover:bg-gold text-[#0a0a0b] flex items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:scale-110 transition-all z-10 cursor-pointer"
                    aria-label="Play Trixy Castro Case Study Preview"
                  >
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
                  </button>
                )}

                {/* Bottom Video Label Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#f4f1ea] pointer-events-none z-10">
                  <span className="px-3 py-1 rounded-md bg-[#0a0a0b]/80 border border-white/10 backdrop-blur-md">
                    MASTERCLASS EPISODE 03 // 14:20
                  </span>
                  <span className="px-3 py-1 rounded-md bg-gold/20 border border-gold/40 text-gold-light backdrop-blur-md">
                    BILINGUAL SPANISH CUT
                  </span>
                </div>
              </div>
            </div>

            {/* Testimonial / Aesthetic Philosophy Quote Card */}
            <div className="mt-6 p-6 sm:p-7 rounded-2xl bg-[#121214] border border-[#27272a] relative">
              <span className="text-3xl font-serif text-gold leading-none block mb-2">&ldquo;</span>
              <p className="text-sm sm:text-base text-[#f4f1ea] font-medium leading-relaxed italic">
                Daren transformed our dense financial curriculum into high-converting, visually magnetic video masterclasses. His understanding of student retention and bilingual nuances directly amplified our completion rates.
              </p>
              <div className="mt-4 pt-4 border-t border-[#1a1a1e] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gold font-display uppercase block">
                    Trixy Castro
                  </span>
                  <span className="text-[11px] font-mono text-[#8d8b86]">
                    Founder, La Escuela Nueva &amp; Real Estate Mogul
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-gold">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Verified Client Partner</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Case Breakdown & Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gold block mb-2">
                EXECUTIVE SUMMARY
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#f4f1ea] leading-tight mb-4">
                Crisp High-Ticket Branding Meets Spanish Retention Pacing
              </h3>
              <p className="text-sm text-[#8d8b86] leading-relaxed">
                When scaling a premium Spanish financial masterclass, raw screen shares cause severe student drop-off. Daren established a cohesive visual identity: dark UI containers with warm gold highlights, dynamic on-screen financial modeling, and tight pacing that kept students engaged through complex economic concepts.
              </p>
            </div>

            {/* Deliverables Stack */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#f4f1ea] block">
                DELIVERABLES DELIVERED
              </span>
              {deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#121214] border border-[#27272a] hover:border-gold/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <h4 className="text-xs font-bold font-display uppercase text-[#f4f1ea]">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#8d8b86] pl-6 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Impact Metric Strip */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {caseMetrics.map((m) => (
                <div
                  key={m.label}
                  className="p-4 rounded-xl bg-[#121214] border border-gold/20 flex flex-col justify-between"
                >
                  <span className="font-display text-2xl sm:text-3xl font-black text-gold">
                    {m.value}
                  </span>
                  <span className="text-xs font-semibold text-[#f4f1ea] uppercase mt-1">
                    {m.label}
                  </span>
                  <span className="text-[10px] font-mono text-[#8d8b86] mt-0.5">
                    {m.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
