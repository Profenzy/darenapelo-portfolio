"use client";

import React from "react";
import { TrendingUp, Languages, Coins, Zap, BarChart3, Clock, CheckCircle2 } from "lucide-react";

export default function ValueProposition() {
  const pillars = [
    {
      icon: TrendingUp,
      title: "Retention-Driven Pacing",
      tagline: "FINANCIAL MARKETING ANALYTICS APPLIED TO VIDEO",
      description:
        "Every cut, audio transient, and pattern interrupt is calibrated against real audience retention graphs. By eliminating cognitive friction points, videos maintain engagement well past platform averages.",
      bullets: [
        "First 3-second hook engineering",
        "Subconscious audio ducking & SFX risers",
        "Micro-zooms aligned with thesis drops",
      ],
      metric: "68.4%",
      metricLabel: "Average Watch-Time Retention",
    },
    {
      icon: Languages,
      title: "Bilingual Adaptability",
      tagline: "NATIVE FLUENCY IN ENGLISH & SPANISH",
      description:
        "Seamlessly cross linguistic and cultural borders. From high-ticket Spanish financial masterclasses for visionary entrepreneurs like Trixy Castro to viral US TikTok trends, content feels native in both markets.",
      bullets: [
        "Localized cultural slang & timing",
        "Dual-language kinetic captions",
        "Multi-market ad variants & splits",
      ],
      metric: "2 Markets",
      metricLabel: "US & Latin America Ready",
    },
    {
      icon: Coins,
      title: "Web3 & Culture Fluidity",
      tagline: "HIGH-VELOCITY MEME TRENDS & ANIME SYNC",
      description:
        "Bridging deep internet subcultures with viral visual velocity. From animated meme coin community PFPs to high-tempo anime music video (AMV) edits with optical flow and motion graphics.",
      bullets: [
        "2D PFP alpha-channel rigging",
        "Beat-matched velocity curves",
        "Meme culture narrative framing",
      ],
      metric: "10M+",
      metricLabel: "Total Organic Impressions",
    },
  ];

  const statMetrics = [
    { value: "10M+", label: "Organic Views Generated", note: "Across YouTube, TikTok & Reels" },
    { value: "68.4%", label: "Average 30s Retention", note: "Outperforming platform benchmarks" },
    { value: "EN / ES", label: "Dual Native Execution", note: "English & Spanish video masters" },
    { value: "150+", label: "High-Ticket Edits Shipped", note: "Zero missed client deadlines" },
  ];

  return (
    <section id="strategy" className="relative py-24 sm:py-32 bg-[#0a0a0b] overflow-hidden border-t border-[#1a1a1e]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-[#1a1a1e]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121214] border border-gold/30 text-[11px] font-mono uppercase tracking-widest text-gold mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>THE STRATEGIC ADVANTAGE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#f4f1ea]">
              Financial Acumen Meets <span className="gold-gradient-text">Visual Retention</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#8d8b86] font-normal leading-relaxed">
            Most editors focus purely on aesthetic flair. As a Financial Marketing Graduate, I structure video edits to convert: analyzing viewer drop-off metrics, market positioning, and consumer psychology.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-12">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative rounded-2xl bg-[#121214] border border-[#27272a] hover:border-gold/50 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_15px_40px_rgba(212,175,55,0.08)] hover:-translate-y-1"
              >
                {/* Subtle top indicator */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#1a1a1e] border border-[#27272a] group-hover:border-gold/40 flex items-center justify-center text-gold transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-[#8d8b86]">0{idx + 1}</span>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold block mb-2">
                    {pillar.tagline}
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase text-[#f4f1ea] group-hover:text-gold-light transition-colors mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8d8b86] leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {pillar.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-[#c8c5bc]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#1a1a1e] flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-display font-black text-gold">
                    {pillar.metric}
                  </span>
                  <span className="text-[11px] font-mono text-[#8d8b86] uppercase">
                    {pillar.metricLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Metric Strip */}
        <div className="mt-16 rounded-2xl bg-gradient-to-b from-[#121214] to-[#0d0d0f] border border-[#27272a] p-8 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#27272a]">
            {statMetrics.map((stat, i) => (
              <div key={stat.label} className={`flex flex-col ${i > 0 ? "pt-6 lg:pt-0 lg:pl-8" : ""}`}>
                <span className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#f4f1ea] tracking-tight">
                  <span className="gold-gradient-text">{stat.value}</span>
                </span>
                <span className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#f4f1ea]">
                  {stat.label}
                </span>
                <span className="mt-1 text-[11px] font-mono text-[#8d8b86]">
                  {stat.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
