"use client";

import React, { useState } from "react";
import {
  Send,
  CheckCircle,
  Mail,
  MessageSquare,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Globe,
  Terminal,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import { Project } from "@/data/projects";

interface ContactFormProps {
  prefilledProject?: Project | null;
}

export default function ContactForm({ prefilledProject }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: prefilledProject?.categoryLabel || "Short Forms",
    budget: "$2,500 - $5,000",
    referenceLink: "",
    message: prefilledProject ? `Interested in booking an edit similar to: ${prefilledProject.title}` : "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate swift direct booking transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { label: "X / Twitter", href: "https://x.com", icon: Twitter },
    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { label: "Instagram", href: "https://instagram.com", icon: Instagram },
    { label: "YouTube", href: "https://youtube.com", icon: Youtube },
  ];

  return (
    <footer id="contact" className="relative pt-24 sm:pt-32 pb-12 bg-[#08080a] border-t border-[#1a1a1e] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Terminal Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121214] border border-gold/40 text-[11px] font-mono uppercase tracking-widest text-gold mb-4">
              <Terminal className="w-3.5 h-3.5" />
              <span>PROJECT INTAKE TERMINAL</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#f4f1ea]">
              Initiate a <span className="gold-gradient-text">Commission</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-[#8d8b86]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM ACTIVE
            </span>
            <span>&bull;</span>
            <span>AES-256 SECURE</span>
            <span>&bull;</span>
            <span>AVG RESPONSE &lt; 4H</span>
          </div>
        </div>

        {/* Main Terminal Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Left Column: Direct Intake Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#121214] border border-[#27272a] shadow-2xl p-6 sm:p-8 relative">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1a1a1e]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-[11px] font-mono text-muted">
                    session://daren-apelo/intake.sh
                  </span>
                </div>
                <span className="text-[10px] font-mono text-gold uppercase">
                  READY FOR INPUT
                </span>
              </div>

              {submitted ? (
                <div className="py-16 flex flex-col items-center text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold shadow-lg">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase text-[#f4f1ea]">
                    Transmission Confirmed
                  </h3>
                  <p className="max-w-md text-sm text-[#8d8b86]">
                    Thank you, <strong className="text-gold">{formData.name || "Client"}</strong>. Your project brief has been logged. Daren will review your timeline and reference links and respond within 4 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#1a1a1e] border border-[#27272a] text-xs font-mono uppercase text-[#f4f1ea] hover:border-gold transition-colors"
                  >
                    Submit Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8d8b86] mb-1.5">
                        Client / Agency Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Rivera"
                        className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-[#27272a] focus:border-gold focus:outline-none text-sm text-[#f4f1ea] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8d8b86] mb-1.5">
                        Direct Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-[#27272a] focus:border-gold focus:outline-none text-sm text-[#f4f1ea] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8d8b86] mb-1.5">
                        Project Category
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-[#27272a] focus:border-gold focus:outline-none text-sm text-[#f4f1ea] transition-colors"
                      >
                        <option value="Short Forms">Short Forms (TikTok / Reels / Shorts)</option>
                        <option value="Long Forms">Long Forms (YouTube / Masterclass)</option>
                        <option value="AMVs">AMV &amp; Motion Graphics VFX</option>
                        <option value="Crypto & Web3">Crypto / Web3 Meme Coin PFP Visual</option>
                        <option value="Bilingual Spanish Suite">Bilingual Spanish Course Suite</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8d8b86] mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-[#27272a] focus:border-gold focus:outline-none text-sm text-[#f4f1ea] transition-colors"
                      >
                        <option value="$1,000 - $2,500">$1,000 - $2,500 (Pilot Pack)</option>
                        <option value="$2,500 - $5,000">$2,500 - $5,000 (Monthly Retainer)</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000 (Full Masterclass Suite)</option>
                        <option value="$10,000+">$10,000+ (Enterprise / Agency Retainer)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8d8b86] mb-1.5">
                      Reference Link / Footage Drive (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.referenceLink}
                      onChange={(e) => setFormData({ ...formData, referenceLink: e.target.value })}
                      placeholder="https://drive.google.com/... or YouTube reference"
                      className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-[#27272a] focus:border-gold focus:outline-none text-sm text-[#f4f1ea] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8d8b86] mb-1.5">
                      Project Objective &amp; Notes
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your target audience, raw footage volume, and conversion goals..."
                      className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-[#27272a] focus:border-gold focus:outline-none text-sm text-[#f4f1ea] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold text-[#0a0a0b] font-display font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING BRIEF...</span>
                    ) : (
                      <>
                        <span>TRANSMIT PROJECT BRIEF</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Actions & Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gold block mb-2">
                  DIRECT FAST CHANNELS
                </span>
                <h3 className="font-display text-2xl font-bold uppercase text-[#f4f1ea] mb-3">
                  Prefer Direct Chat?
                </h3>
                <p className="text-sm text-[#8d8b86] leading-relaxed">
                  For time-sensitive commercial launches, breaking crypto meme trends, or high-priority creator retainers, ping directly via Telegram or WhatsApp.
                </p>
              </div>

              {/* Direct Messenger Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-[#121214] border border-[#27272a] hover:border-gold/50 flex items-center gap-3 group transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1a1a1e] flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#f4f1ea] font-display uppercase block">
                      Telegram
                    </span>
                    <span className="text-[10px] font-mono text-muted">
                      Direct Message
                    </span>
                  </div>
                </a>

                <a
                  href="mailto:darenapelo@gmail.com"
                  className="p-4 rounded-2xl bg-[#121214] border border-[#27272a] hover:border-gold/50 flex items-center gap-3 group transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1a1a1e] flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#f4f1ea] font-display uppercase block">
                      Direct Email
                    </span>
                    <span className="text-[10px] font-mono text-muted">
                      darenapelo@gmail.com
                    </span>
                  </div>
                </a>
              </div>

              {/* Verified Editorial Accreditations Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#121214] to-[#1a1a1e] border border-gold/20 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-gold" />
                  AGENCY &amp; CREATOR GUARANTEES
                </span>
                <ul className="space-y-2 text-xs text-[#c8c5bc]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>24-48 Hour Turnaround on Short-Form Pilots</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>Bilingual Master Files with Clean Textless Stems</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>Post-launch Retention Audit &amp; Hook Re-edits</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Network Channels */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8d8b86] block mb-3">
                NETWORKS &amp; VISUAL ARCHIVES
              </span>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-[#121214] border border-[#27272a] hover:border-gold/60 text-xs font-mono text-[#c8c5bc] hover:text-gold flex items-center gap-2 transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{s.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-20 pt-8 border-t border-[#1a1a1e] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8d8b86]">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} DAREN P. APELO.</span>
            <span>ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-gold" />
              <span>GLOBAL REMOTE &bull; MANILA UTC+8</span>
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-gold hover:text-gold-light transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
