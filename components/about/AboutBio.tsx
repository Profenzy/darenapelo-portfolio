"use client";

import React from "react";
import Image from "next/image";
import { GraduationCap, Sparkles, CheckCircle2, Film, Palette, Cpu, ArrowUpRight } from "lucide-react";

export default function AboutBio() {
  const technicalToolkit = [
    { name: "Adobe Premiere Pro", role: "Primary NLE & Multi-Cam Pacing" },
    { name: "Adobe After Effects", role: "VFX, Motion Typography & Rotoscoping" },
    { name: "DaVinci Resolve", role: "Color Grading & Cinematic LUT Calibration" },
    { name: "Adobe Audition", role: "Audio Cleanup, Ducking & Stem Mastering" },
    { name: "Blender", role: "3D Asset Modeling & Web3 Visuals" },
    { name: "Retention Analytics", role: "Drop-Off Graphs & Hook Optimization" },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#0a0a0b] border-t border-[#1a1a1e] overflow-hidden">
      {/* Background Subtle Ambient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Refined Portrait with Gold Border and Grain Overlay */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer Glowing Accent Frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-gold/30 via-transparent to-gold/20 blur-lg opacity-70" />

              {/* Card Container */}
              <div className="relative rounded-3xl bg-[#121214] border border-gold/40 p-3 sm:p-4 shadow-2xl overflow-hidden">
                {/* Corner Decorative Brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold pointer-events-none" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold pointer-events-none" />

                {/* Portrait Image */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#1a1a1e]">
                  <Image
                    src="/daren-pictures/about-hero.jpg"
                    alt="Daren P. Apelo Portrait"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center filter contrast-[1.05]"
                    priority
                  />

                  {/* High contrast gradient at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-80 pointer-events-none" />

                  {/* Status Overlay Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0a0a0b]/85 border border-[#27272a] backdrop-blur-md">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold block">
                      CREATIVE DIRECTOR &amp; LEAD EDITOR
                    </span>
                    <span className="font-display font-black text-lg text-[#f4f1ea] block">
                      Daren P. Apelo
                    </span>
                    <span className="text-xs text-[#8d8b86] font-mono flex items-center gap-1.5 mt-0.5">
                      <GraduationCap className="w-3.5 h-3.5 text-gold" />
                      Financial Marketing Graduate
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Background */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121214] border border-gold/30 text-[11px] font-mono uppercase tracking-widest text-gold mb-4">
                <GraduationCap className="w-3.5 h-3.5 text-gold" />
                <span>EDITORIAL BIO &amp; PHILOSOPHY</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#f4f1ea]">
                Where Strategic Marketing <br />
                <span className="gold-gradient-text">Meets Cinematic Retention</span>
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#c8c5bc] leading-relaxed">
              <p>
                I hold a degree in <strong className="text-gold font-semibold">Financial Marketing</strong>, which fundamentally separates my video editing philosophy from the rest of the industry. While traditional editors treat video as a passive sequence of cuts, I approach every timeline as a conversion funnel.
              </p>
              <p>
                My editing framework is engineered around audience psychology: how rapid market shifts demand high visual velocity, how English and Spanish cultural nuances alter comedy and authority timing, and where viewer attention inevitably drops off.
              </p>
              <p>
                Over the past several years, I have spearheaded long-form masterclass post-production for high-ticket visionaries like <strong className="text-[#f4f1ea] font-semibold">Trixy Castro</strong> (*La Escuela Nueva*, *Success Unlocked*), animated high-velocity meme coin assets in the fast-paced Web3 ecosystem, and directed complex anime music video (AMV) edits with frame-precise sound design.
              </p>
            </div>

            {/* Technical Toolkit Grid */}
            <div className="pt-4 border-t border-[#1a1a1e]">
              <span className="text-xs font-mono uppercase tracking-widest text-gold block mb-3">
                POST-PRODUCTION STACK &amp; CAPABILITIES
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {technicalToolkit.map((tool) => (
                  <div
                    key={tool.name}
                    className="p-3 rounded-xl bg-[#121214] border border-[#27272a] hover:border-gold/40 transition-colors"
                  >
                    <span className="text-xs font-bold font-display uppercase text-[#f4f1ea] block">
                      {tool.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#8d8b86] block mt-0.5">
                      {tool.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="pt-2 flex items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-[#0a0a0b] font-display font-bold text-xs uppercase tracking-wider hover:bg-gold-light hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all"
              >
                <span>COMMISSION A CUT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#vault"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#121214] border border-[#27272a] text-[#f4f1ea] font-mono text-xs uppercase tracking-wider hover:border-gold/50 transition-colors"
              >
                <span>EXPLORE WORK</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
