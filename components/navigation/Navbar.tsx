"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Vault", href: "#vault" },
    { label: "Strategy", href: "#strategy" },
    { label: "Client Spotlight", href: "#spotlight" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0a0b]/85 backdrop-blur-md border-b border-[#27272a]/80 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Name & Degree / Discipline Pill */}
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex flex-col">
            <span className="font-display font-black text-lg sm:text-xl tracking-tight text-[#f4f1ea] group-hover:text-gold transition-colors">
              DAREN P. APELO
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#8d8b86] uppercase flex items-center gap-1.5">
              <span>FINANCIAL MANAGEMENT</span>
              <span className="text-gold">&bull;</span>
              <span>VIDEO EDITOR</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-mono uppercase tracking-widest text-[#c8c5bc] hover:text-gold transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button & Availability indicator */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#121214] border border-[#27272a] text-[11px] font-mono text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPEN FOR COMMISSIONS</span>
          </div>

          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-[#0a0a0b] font-display font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href="#contact"
            className="px-3 py-1.5 rounded-full bg-gold text-[#0a0a0b] font-bold text-[11px] uppercase tracking-wider"
          >
            START
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#f4f1ea] hover:text-gold transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0b]/98 border-b border-[#27272a] px-6 py-6 transition-all">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono uppercase tracking-widest text-[#f4f1ea] hover:text-gold transition-colors py-1 border-b border-[#1a1a1e]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-muted">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Available for Select Client Commissions</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

