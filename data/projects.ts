export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "AMVs" | "LONG FORMS" | "SHORT FORMS" | "CRYPTO";
  categoryLabel: string;
  videoSrc?: string;
  posterSrc: string;
  runtime: string;
  language: "EN" | "ES" | "EN / ES";
  platform: "YouTube" | "TikTok" | "Instagram Reels" | "X / Twitter" | "Webinar / Course";
  primaryFocus: "Retention Engineering" | "Sound Design & VFX" | "Narrative Pacing" | "Hook Optimization" | "Viral Meme Velocity";
  retentionMetric?: string;
  client?: string;
  description: string;
  strategyNotes: string[];
  deliverables?: string[];
  aspectRatio: "16:9" | "9:16";
}

export const PROJECTS: Project[] = [
  {
    id: "amv-pacing-vfx",
    title: "Anime Sync & Dynamic VFX Cut",
    subtitle: "High-tempo beat synchronicity, optical flow & velocity mapping",
    category: "AMVs",
    categoryLabel: "AMV's (Anime)",
    videoSrc: "/videos/amv-aa.mp4",
    posterSrc: "/daren-pictures/avatar.jpg",
    runtime: "0:35",
    language: "EN",
    platform: "TikTok",
    primaryFocus: "Sound Design & VFX",
    retentionMetric: "82.4% Completion Rate",
    client: "AMV Creator Network",
    description:
      "A fast-paced anime edit engineered with hyper-precise micro-cuts, frame blending, and custom SFX risers. Synchronized frame-by-frame to maximize visual dopamine and multi-replay loop behavior on TikTok & Reels.",
    strategyNotes: [
      "Sub-frame audio transients mapped to impact frames and chromatic aberration spikes",
      "Seamless infinite loop structure designed to prompt automatic repeat plays",
      "Velocity curve interpolation for dynamic speed ramps without stutter"
    ],
    deliverables: ["4K 60FPS Master Cut", "Vertical 9:16 Re-frame", "Sound Design Audio Stem"],
    aspectRatio: "9:16",
  },
  {
    id: "short-5-questions",
    title: "5 Questions That Break Retention Drop-Off",
    subtitle: "Bilingual psychological hook sequencing for educational creators",
    category: "SHORT FORMS",
    categoryLabel: "Short Forms",
    videoSrc: "/videos/short-05.mp4",
    posterSrc: "/thumbnails/longform-tn.png",
    runtime: "0:54",
    language: "EN / ES",
    platform: "Instagram Reels",
    primaryFocus: "Hook Optimization",
    retentionMetric: "71.8% Retention at 30s",
    client: "Educational Growth Creator",
    description:
      "Built for high-retention educational storytelling. Employs dynamic kinetic typography, pattern interruptions every 2.4 seconds, and strategic B-roll inserts to combat user swipe fatigue.",
    strategyNotes: [
      "3-second hook with negative-inquiry question headline to trigger cognitive dissonance",
      "Dynamic sound beds ducked -6dB during key thesis statements for pristine vocal clarity",
      "Custom colored text highlighting linked to core value-retention keywords"
    ],
    deliverables: ["Vertical Master (9:16)", "Hardcoded Bilingual Subtitles", "Custom Hook Thumbnails"],
    aspectRatio: "9:16",
  },
  {
    id: "long-trixy-escuela-nueva",
    title: "Trixy Castro: La Escuela Nueva",
    subtitle: "High-ticket financial masterclass & Spanish educational documentary",
    category: "LONG FORMS",
    categoryLabel: "Long Forms",
    videoSrc: "/videos/short-02.mp4", // Web preview
    posterSrc: "/thumbnails/longform-tn.png",
    runtime: "14:20",
    language: "ES",
    platform: "YouTube",
    primaryFocus: "Narrative Pacing",
    retentionMetric: "3.4x Watch Time Lift",
    client: "Trixy Castro (La Escuela Nueva)",
    description:
      "Full long-form documentary and masterclass curriculum editing for visionary entrepreneur Trixy Castro. Balanced high-production cinematic color grades with documentary pacing, multi-camera transitions, and authoritative Spanish typography.",
    strategyNotes: [
      "Re-architected 40-minute raw lectures into tight, narrative 14-minute episodic masterclasses",
      "Integrated branded motion graphic lower-thirds and financial chart callouts",
      "Engineered high-suspense chapter transitions to keep viewers hooked into subsequent modules"
    ],
    deliverables: ["14-Minute 4K Master", "5 Repurposed Shorts", "Custom Chapter Deck Graphics"],
    aspectRatio: "16:9",
  },
  {
    id: "short-creator-funnel",
    title: "High-Ticket Creator Funnel Hook",
    subtitle: "Fast-paced agency authority reel tailored for direct conversions",
    category: "SHORT FORMS",
    categoryLabel: "Short Forms",
    videoSrc: "/videos/short-02.mp4",
    posterSrc: "/daren-pictures/portrait.jpg",
    runtime: "0:42",
    language: "EN",
    platform: "Instagram Reels",
    primaryFocus: "Retention Engineering",
    retentionMetric: "69.1% Average Retention",
    client: "Boutique Creative Agency",
    description:
      "Direct response short-form content designed to capture high-net-worth clients. Uses micro-zooms, kinetic callouts, and strategic sound design to guide the eye toward the final call to action.",
    strategyNotes: [
      "Eliminated introductory fluff; launched straight into problem-state visual hook",
      "Added subtle tactile sound design (clicks, swooshes, page turns) for tactile engagement",
      "Color-coded key value metrics in refined warm gold to emphasize ROI and prestige"
    ],
    deliverables: ["Master Cut 9:16", "Clean Audio Stem", "B-roll Sound Mix"],
    aspectRatio: "9:16",
  },
  {
    id: "crypto-pfp-viral",
    title: "Crypto Community & Meme Coin PFP Visual",
    subtitle: "Web3 viral asset cut with animated PFP culture & dynamic momentum",
    category: "CRYPTO",
    categoryLabel: "Crypto & Web3",
    videoSrc: "/videos/short-03.mp4",
    posterSrc: "/daren-pictures/about-hero.jpg",
    runtime: "0:38",
    language: "EN",
    platform: "X / Twitter",
    primaryFocus: "Viral Meme Velocity",
    retentionMetric: "140K+ Organic Impressions",
    client: "Web3 / Solana Token Community",
    description:
      "High-octane Web3 video celebrating token community milestones. Incorporates animated 2D PFPs, meme culture inserts, on-chain chart explosions, and fast-paced electronic sound design.",
    strategyNotes: [
      "Layered alpha-channel PFP motion rigs for character movement over live price action",
      "Subtle VHS grain and chromatic glitched keyframes matching crypto Twitter aesthetic",
      "Hyped cadence designed for repetitive looping in community Telegram & Discord lounges"
    ],
    deliverables: ["Square 1:1 Community Video", "Vertical 9:16 Story Cut", "GIF Loop Variants"],
    aspectRatio: "9:16",
  },
  {
    id: "short-spanish-ecommerce",
    title: "Spanish E-Commerce Growth Reel",
    subtitle: "Culturally resonant Spanish pacing & localized retention hooks",
    category: "SHORT FORMS",
    categoryLabel: "Short Forms",
    videoSrc: "/videos/short-04.mp4",
    posterSrc: "/thumbnails/longform-tn.png",
    runtime: "0:49",
    language: "ES",
    platform: "TikTok",
    primaryFocus: "Hook Optimization",
    retentionMetric: "64.8% Completion Rate",
    client: "Latin American Brand Incubator",
    description:
      "Designed specifically for Latin American e-commerce audiences. Combines conversational Spanish subtitle timing, upbeat background pacing, and visual proofs of product capability.",
    strategyNotes: [
      "Tailored subtitle typography with Spanish punctuation accents and bold color emphasis",
      "Rapid product benefit showcase at second 4 to secure viewer commitment",
      "Dynamic background movement countering static talking-head fatigue"
    ],
    deliverables: ["TikTok 9:16 Master", "Clean Captioned File", "Audio Stems"],
    aspectRatio: "9:16",
  },
  {
    id: "long-success-unlocked",
    title: "Success Unlocked: Wealth Strategies",
    subtitle: "Documentary-style YouTube long form with financial market analytics",
    category: "LONG FORMS",
    categoryLabel: "Long Forms",
    videoSrc: "/videos/short-05.mp4", // Web preview
    posterSrc: "/thumbnails/longform-tn.png",
    runtime: "18:25",
    language: "EN",
    platform: "YouTube",
    primaryFocus: "Retention Engineering",
    retentionMetric: "58.2% Avg Duration (10m+)",
    client: "Success Unlocked Series",
    description:
      "An in-depth finance and business documentary cut. Bridging Daren's Financial Marketing expertise with long-form visual retention: visual financial modeling, animated balance sheets, and captivating B-roll storytelling.",
    strategyNotes: [
      "Chapterized progression that rewards viewer investment with mini-resolutions every 3 mins",
      "Clean 3D-styled chart representations replacing boring static stock slides",
      "Dynamic soundscaping providing emotional weight to market cycle discussions"
    ],
    deliverables: ["18-Minute 4K Master", "Thumbnail Deck", "Social Teaser Pack"],
    aspectRatio: "16:9",
  },
  {
    id: "amv-cinematic-flow",
    title: "Cinematic Flow & VFX Transitions",
    subtitle: "Complex mask tracking, speed curves & atmospheric sound design",
    category: "AMVs",
    categoryLabel: "AMV's (Anime)",
    videoSrc: "/videos/amv-aa.mp4",
    posterSrc: "/daren-pictures/avatar.jpg",
    runtime: "0:45",
    language: "EN",
    platform: "TikTok",
    primaryFocus: "Sound Design & VFX",
    retentionMetric: "88.7% Replay Rate",
    client: "Visual Motion Showcase",
    description:
      "A tribute to precision editing: rotoscoping, camera shake simulations, custom sound synthesis, and velocity map synchronizations designed for peak aesthetic satisfaction.",
    strategyNotes: [
      "Layered optical sound effects matched precisely with blade swings and impact shockwaves",
      "Custom glow shaders applied to character eyes and background neon signs",
      "Rhythm-driven cut points aligned with subtle bass drop polyrhythms"
    ],
    deliverables: ["Master Cut 9:16", "HQ WAV Audio Mix", "Color Grade LUTs"],
    aspectRatio: "9:16",
  },
];
