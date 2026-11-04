"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GraduationCap, Sparkles, CheckCircle2, Film, Palette, Cpu, ArrowUpRight, Layers } from "lucide-react";

export default function AboutBio() {
  // All 4 photos of Daren from the Daren pictures folder
  const darenPhotos = [
    {
      src: "/daren-pictures/daren-4.jpg",
      title: "Financial Management Graduate",
      caption: "Formal graduation portrait with academic honors & financial degree",
      tag: "ACADEMIC FOUNDATION",
    },
    {
      src: "/daren-pictures/daren-1.jpg",
      title: "Editorial & Creative Direction",
      caption: "Lead video editor and post-production creative director",
      tag: "CREATIVE DIRECTION",
    },
    {
      src: "/daren-pictures/daren-2.jpg",
      title: "Pacing & Motion Specialist",
      caption: "Mobile motion graphics, speed ramping, and retention engineering",
      tag: "MOTION SUITE",
    },
    {
      src: "/daren-pictures/daren-3.jpg",
      title: "High-Ticket Client Partner",
      caption: "Collaborating with creators and founders across US and LatAm",
      tag: "CLIENT RETENTION",
    },
  ];

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const activePhoto = darenPhotos[activePhotoIdx];

  // Softwares explicitly specified by user: Alight Motion, Canva, Capcut, Sketchbook
  const softwareToolkit = [
    {
      name: "Alight Motion",
      category: "Mobile Motion Graphics & VFX",
      description: "Complex keyframe curve smoothing, velocity mapping, optical transitions, and sub-frame audio synchronization.",
    },
    {
      name: "CapCut",
      category: "High-Retention Video Assembly",
      description: "Viral pacing cuts, localized multi-language kinetic typography, auto-ducking audio soundbeds, and algorithmic hook architecture.",
    },
    {
      name: "Canva",
      category: "Graphic Design & Thumbnails",
      description: "High-CTR YouTube thumbnail layouts, brand style sheets, presentation decks, and visual asset composition.",
    },
    {
      name: "Sketchbook",
      category: "Digital Illustration & PFP Art",
      description: "Custom hand-drawn character detailing, community meme coin PFP rigs, storyboard sketches, and mask overlays.",
    },
  ];

  return (
    <section id="about" className="relative py-20 sm:py-32 bg-[#0a0a0b] border-t border-[#1a1a1e] overflow-hidden">
      {/* Background Subtle Ambient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Interactive 4-Photo Editorial Gallery */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md">
              {/* Glowing accent border */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-gold/30 via-transparent to-gold/20 blur-md opacity-70" />

              {/* Main Active Portrait Frame */}
              <div className="relative rounded-3xl bg-[#121214] border border-gold/40 p-2.5 sm:p-3 shadow-2xl overflow-hidden">
                {/* Decorative Brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold pointer-events-none z-20" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold pointer-events-none z-20" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold pointer-events-none z-20" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold pointer-events-none z-20" />

                {/* Primary Photo Display */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#1a1a1e]">
                  <Image
                    src={activePhoto.src}
                    alt={activePhoto.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-top filter contrast-[1.03] transition-all duration-500"
                    priority
                  />

                  {/* Gradient bottom scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-85 pointer-events-none" />

                  {/* Dynamic Caption Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-[#0a0a0b]/85 border border-[#27272a] backdrop-blur-md z-10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold block">
                      {activePhoto.tag}
                    </span>
                    <span className="font-display font-black text-base text-[#f4f1ea] block">
                      {activePhoto.title}
                    </span>
                    <span className="text-[11px] text-[#8d8b86] font-mono block mt-0.5">
                      {activePhoto.caption}
                    </span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Strip: All 4 Photos selectable! */}
              <div className="mt-4 grid grid-cols-4 gap-2.5">
                {darenPhotos.map((photo, idx) => {
                  const isSelected = activePhotoIdx === idx;
                  return (
                    <button
                      key={photo.src}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        isSelected
                          ? "border-gold scale-105 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                          : "border-[#27272a] opacity-60 hover:opacity-100 hover:border-gold/50"
                      }`}
                      aria-label={`Select photo ${idx + 1}`}
                    >
                      <Image
                        src={photo.src}
                        alt={`Daren photo thumbnail ${idx + 1}`}
                        fill
                        className="object-cover object-top"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-gold/10 pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-center text-[11px] font-mono text-[#8d8b86]">
                Click thumbnail to view Daren&apos;s academic &amp; editorial portraits (4 total)
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Background */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121214] border border-gold/30 text-[11px] font-mono uppercase tracking-widest text-gold mb-3">
                <GraduationCap className="w-3.5 h-3.5 text-gold" />
                <span>EDITORIAL BIO &amp; PHILOSOPHY</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#f4f1ea]">
                Financial Management Meets <br />
                <span className="gold-gradient-text">High-Retention Editing</span>
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm md:text-base text-[#c8c5bc] leading-relaxed">
              <p>
                I hold a degree in <strong className="text-gold font-semibold">Financial Management</strong>. This academic background gives me an analytical edge that traditional video editors simply do not possess. Instead of treating a timeline merely as visual decoration, I structure every video edit as a high-retention conversion vehicle.
              </p>
              <p>
                My editing framework centers on audience attention optimization: understanding drop-off curves, balancing cognitive load, utilizing pattern interruptions, and tailoring linguistic nuances for both English and Spanish markets.
              </p>
              <p>
                From spearheading educational masterclass editing for clients like <strong className="text-[#f4f1ea] font-semibold">Trixy Castro</strong> (*La Escuela Nueva*, *Success Unlocked*) to crafting beat-matched anime music videos (AMVs) and Web3 meme coin visuals, I bring disciplined financial precision to every frame.
              </p>
            </div>

            {/* Core Software Stack Specified by User */}
            <div className="pt-4 border-t border-[#1a1a1e]">
              <span className="text-xs font-mono uppercase tracking-widest text-gold block mb-3 flex items-center gap-2">
                <Palette className="w-3.5 h-3.5" />
                SPECIALIZED SOFTWARE &amp; PRODUCTION SUITE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {softwareToolkit.map((tool) => (
                  <div
                    key={tool.name}
                    className="p-3.5 rounded-xl bg-[#121214] border border-[#27272a] hover:border-gold/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold font-display uppercase text-gold">
                        {tool.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#8d8b86]">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#c8c5bc] leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-[#0a0a0b] font-display font-bold text-xs uppercase tracking-wider hover:bg-gold-light hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all"
              >
                <span>INITIATE COMMISSION</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#vault"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#121214] border border-[#27272a] text-[#f4f1ea] font-mono text-xs uppercase tracking-wider hover:border-gold/50 transition-colors"
              >
                <span>EXPLORE VIDEO VAULT</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
