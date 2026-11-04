"use client";

import React, { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import VanteHero from "@/components/hero/VanteHero";
import ValueProposition from "@/components/metrics/ValueProposition";
import VideoGrid from "@/components/portfolio/VideoGrid";
import ProjectModal from "@/components/portfolio/ProjectModal";
import ClientSpotlight from "@/components/spotlight/ClientSpotlight";
import AboutBio from "@/components/about/AboutBio";
import ContactForm from "@/components/contact/ContactForm";
import { Project } from "@/data/projects";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [inquireProject, setInquireProject] = useState<Project | null>(null);

  const handleInquire = (project: Project) => {
    setInquireProject(project);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-[#f4f1ea] selection:bg-gold selection:text-black">
      {/* Top Fixed Header */}
      <Navbar />

      {/* Hero Section: "Vante" Scroll-Driven 3D Ribbon (Three.js 900vh track) */}
      <VanteHero onSelectProject={(project) => setSelectedProject(project)} />

      {/* Section A: Value Proposition & Metric Strip */}
      <ValueProposition />

      {/* Section B: Filterable Video Vault */}
      <VideoGrid onSelectProject={(project) => setSelectedProject(project)} />

      {/* Section C: Client Spotlight — Trixy Castro */}
      <ClientSpotlight onOpenProject={(project) => setSelectedProject(project)} />

      {/* Section D: About & Editorial Bio */}
      <AboutBio />

      {/* Section E: Terminal / Direct Contact & Footer */}
      <ContactForm prefilledProject={inquireProject} />

      {/* Interactive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={handleInquire}
      />
    </main>
  );
}
