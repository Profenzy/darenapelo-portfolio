"use client";

import React, { useState } from "react";
import {
  Send,
  CheckCircle,
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Globe,
  Terminal,
  ArrowUp,
  Sparkles,
  Phone,
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
    referenceLink: "",
    message: prefilledProject ? `Interested in booking an edit similar to: ${prefilledProject.title}` : "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("https://formspree.io/f/xpppnkdp", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          referenceLink: formData.referenceLink || "None provided",
          message: formData.message || "No additional details provided.",
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => ({}));
        if (data && data.errors && data.errors.length > 0) {
          setErrorMessage(data.errors.map((err: { message: string }) => err.message).join(", "));
        } else {
          setErrorMessage("Failed to transmit brief. Please try again or email Apelodaren3@gmail.com directly.");
        }
      }
    } catch (err) {
      setErrorMessage("Network error. Please check your connection or reach out directly via WhatsApp/Gmail.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Specific user-requested social media & direct channels
  const socialChannels = [
    {
      label: "Instagram",
      handle: "@apldaren",
      href: "https://www.instagram.com/apldaren/",
      icon: Instagram,
      description: "Direct DM & Reel Highlights",
    },
    {
      label: "Facebook",
      handle: "Daren P. Apelo",
      href: "https://www.facebook.com/share/19ytxkN59G/",
      icon: Facebook,
      description: "Official Profile & Video Posts",
    },
    {
      label: "WhatsApp",
      handle: "09937860489",
      href: "https://wa.me/639937860489",
      icon: MessageCircle,
      description: "Fast Direct Mobile Messaging",
    },
    {
      label: "Direct Gmail",
      handle: "Apelodaren3@gmail.com",
      href: "mailto:Apelodaren3@gmail.com",
      icon: Mail,
      description: "Business Inquiries & Raw Footage",
    },
  ];

  return (
    <footer id="contact" className="relative pt-20 sm:pt-32 pb-12 bg-[#08080a] border-t border-[#1a1a1e] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Terminal Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121214] border border-gold/40 text-[11px] font-mono uppercase tracking-widest text-gold mb-4">
              <Terminal className="w-3.5 h-3.5" />
              <span>COMMISSION INTAKE TERMINAL</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#f4f1ea]">
              Initiate a <span className="gold-gradient-text">Commission</span>
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-[#8d8b86]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM ACTIVE
            </span>
            <span>&bull;</span>
            <span>AES-256 ENCRYPTED</span>
            <span>&bull;</span>
            <span>AVG RESPONSE &lt; 4H</span>
          </div>
        </div>

        {/* Main Terminal Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Left Column: Intake Form (Estimated Budget Removed!) */}
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
                    Thank you, <strong className="text-gold">{formData.name || "Client"}</strong>. Your project brief has been logged. Daren will review your timeline and reference links and respond via email or WhatsApp within 4 hours.
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
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8d8b86] mb-1.5">
                        Client / Creator Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errorMessage) setErrorMessage(null);
                        }}
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
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errorMessage) setErrorMessage(null);
                        }}
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-[#27272a] focus:border-gold focus:outline-none text-sm text-[#f4f1ea] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8d8b86] mb-1.5">
                      Project Category
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-[#27272a] focus:border-gold focus:outline-none text-sm text-[#f4f1ea] transition-colors"
                    >
                      <option value="Short Forms">Short Forms (TikTok / Reels / Shorts 9:16)</option>
                      <option value="Long Forms">Long Forms (YouTube Masterclasses 16:9)</option>
                      <option value="AMVs">AMV &amp; Anime Motion Graphics</option>
                      <option value="Crypto & Web3">Crypto / Web3 Meme Coin PFP Visual</option>
                      <option value="Bilingual Spanish Suite">Bilingual Spanish Course Suite</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8d8b86] mb-1.5">
                      Reference Link / Footage Drive (Optional)
                    </label>
                    <input
                      type="url"
                      name="referenceLink"
                      value={formData.referenceLink}
                      onChange={(e) => setFormData({ ...formData, referenceLink: e.target.value })}
                      placeholder="https://drive.google.com/... or reference link"
                      className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-[#27272a] focus:border-gold focus:outline-none text-sm text-[#f4f1ea] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8d8b86] mb-1.5">
                      Project Objective &amp; Timeline Details
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline target audience, raw footage volume, and conversion goals..."
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
                        <span>TRANSMIT COMMISSION BRIEF</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Channels & Verified Handles */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gold block mb-1">
                  DIRECT FAST CHANNELS
                </span>
                <h3 className="font-display text-2xl font-bold uppercase text-[#f4f1ea] mb-2">
                  Connect Directly
                </h3>
                <p className="text-xs sm:text-sm text-[#8d8b86] leading-relaxed">
                  For immediate edits, time-sensitive releases, or creator retainers, ping directly across verified social &amp; messaging channels.
                </p>
              </div>

              {/* Direct Channels List with Real User Info */}
              <div className="space-y-3">
                {socialChannels.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3.5 sm:p-4 rounded-2xl bg-[#121214] border border-[#27272a] hover:border-gold/50 flex items-center justify-between group transition-all hover:translate-x-1"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1a1a1e] flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#f4f1ea] font-display uppercase block group-hover:text-gold transition-colors">
                            {item.label}
                          </span>
                          <span className="text-xs font-mono text-[#c8c5bc]">
                            {item.handle}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#8d8b86] hidden sm:block">
                        {item.description}
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* Verified Editorial Accreditations Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#121214] to-[#1a1a1e] border border-gold/20 space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-gold" />
                  CLIENT GUARANTEES
                </span>
                <ul className="space-y-1.5 text-xs text-[#c8c5bc]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>Rapid turnaround on short-form pilots</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>English &amp; Spanish localized subtitle stems</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>Retention curve audit &amp; hook re-cuts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-16 pt-8 border-t border-[#1a1a1e] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8d8b86]">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} DAREN P. APELO.</span>
            <span>ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-gold" />
              <span>GLOBAL REMOTE &bull; UTC+8</span>
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
