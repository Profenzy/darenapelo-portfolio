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
  platform: "YouTube" | "TikTok" | "Instagram Reels" | "Facebook" | "Webinar / Course";
  primaryFocus: "Retention Engineering" | "Sound Design & VFX" | "Narrative Pacing" | "Hook Optimization" | "Viral Meme Velocity";
  retentionMetric?: string;
  client?: string;
  description: string;
  strategyNotes: string[];
  deliverables?: string[];
  aspectRatio: "16:9" | "9:16";
}

export const PROJECTS: Project[] = [
  // --- LONG FORMS (with User Provided Thumbnails) ---
  {
    id: "long-freddy-money",
    title: "Freddy Money: Scaling Financial Capital",
    subtitle: "High-production YouTube masterclass with structured financial retention",
    category: "LONG FORMS",
    categoryLabel: "Long Forms",
    videoSrc: "/videos/short-output.mp4",
    posterSrc: "/thumbnails/freddy-money.png",
    runtime: "16:45",
    language: "EN",
    platform: "YouTube",
    primaryFocus: "Narrative Pacing",
    retentionMetric: "64.2% Avg Duration",
    client: "Freddy Money Show",
    description:
      "Deep financial masterclass cut featuring structured B-roll sequencing, chapter milestones, and animated balance sheet graphs engineered to hold viewers through complex wealth concepts.",
    strategyNotes: [
      "Visual financial infographics replacing static talking-head slides",
      "Chapterized progression with mini-cliffhangers every 2.5 minutes",
      "Dynamic background music ducking calibrated for vocal clarity"
    ],
    deliverables: ["4K 60FPS Master Cut", "Thumbnail Package", "Short-Form Teaser Pack"],
    aspectRatio: "16:9",
  },
  {
    id: "long-kristen-oja",
    title: "Kristen Oja: Integrative Health & Wealth",
    subtitle: "Documentary-grade interview pacing & visual narrative retention",
    category: "LONG FORMS",
    categoryLabel: "Long Forms",
    videoSrc: "/videos/short-final.mp4",
    posterSrc: "/thumbnails/kristen-oja.png",
    runtime: "21:10",
    language: "EN",
    platform: "YouTube",
    primaryFocus: "Retention Engineering",
    retentionMetric: "59.8% Completion Rate",
    client: "Kristen Oja Series",
    description:
      "A long-form medical & wellness conversation edited with precision multi-cam switching, ambient soundscapes, and empathetic cut timing that enhances listener immersion.",
    strategyNotes: [
      "Micro-cuts on listener reactions to emphasize emotional breakthrough moments",
      "Clean color grading aligned with calming healthcare aesthetic",
      "Carefully timed kinetic captions highlighting key actionable takeaways"
    ],
    deliverables: ["Full Master Cut", "Vertical Story Teasers", "Audio Mastering"],
    aspectRatio: "16:9",
  },
  {
    id: "long-laloba",
    title: "La Loba: Cultural Storytelling Masterclass",
    subtitle: "Bilingual Spanish long-form documentary with cinematic color and pacing",
    category: "LONG FORMS",
    categoryLabel: "Long Forms",
    videoSrc: "/videos/short-02.mp4",
    posterSrc: "/thumbnails/laloba.png",
    runtime: "18:30",
    language: "ES",
    platform: "YouTube",
    primaryFocus: "Narrative Pacing",
    retentionMetric: "3.2x Watch Time Lift",
    client: "La Loba Productions",
    description:
      "An authoritative Spanish narrative documentary. Balanced cultural storytelling with rapid documentary pacing, contextual Spanish typography, and rhythmic audio cuts.",
    strategyNotes: [
      "Integrated Spanish kinetic text overlays preserving poetic cadence",
      "Multi-track audio soundscapes with layered atmospheric effects",
      "Strategic pacing adjustments countering drop-offs in long explanations"
    ],
    deliverables: ["Full 1080p Master", "Spanish Subtitle Stem", "5 Repurposed Reels"],
    aspectRatio: "16:9",
  },
  {
    id: "long-sam-rockwell",
    title: "Sam Rockwell: Real Estate & Market Capital",
    subtitle: "Financial management principles applied to high-ticket real estate",
    category: "LONG FORMS",
    categoryLabel: "Long Forms",
    videoSrc: "/videos/short-04.mp4",
    posterSrc: "/thumbnails/sam-rockwell.png",
    runtime: "14:15",
    language: "EN",
    platform: "YouTube",
    primaryFocus: "Retention Engineering",
    retentionMetric: "72.4% Retention at 5m",
    client: "Sam Rockwell Media",
    description:
      "Tailored for high-net-worth real estate investors. Combines architectural B-roll, on-screen deal margin calculations, and fast-paced edits designed to command investor trust.",
    strategyNotes: [
      "Financial data visualization emphasizing property yields and IRR",
      "Tight speech editing removing pauses and dead air without sounding unnatural",
      "Custom gold-accented lower thirds and chapter cards"
    ],
    deliverables: ["YouTube 4K Master", "Thumbnail Artwork", "Ad Clips"],
    aspectRatio: "16:9",
  },
  {
    id: "long-yaritza",
    title: "Yaritza: Creative Vision & Business Growth",
    subtitle: "Documentary interview showcasing brand scaling and visual identity",
    category: "LONG FORMS",
    categoryLabel: "Long Forms",
    videoSrc: "/videos/short-05.mp4",
    posterSrc: "/thumbnails/yaritza.png",
    runtime: "19:40",
    language: "EN / ES",
    platform: "YouTube",
    primaryFocus: "Narrative Pacing",
    retentionMetric: "68.9% Average Retention",
    client: "Yaritza Brand",
    description:
      "Dynamic bilingual interview edit bridging creative execution and financial sustainability. Crafted with energetic music changes, pattern interruptions, and crisp color science.",
    strategyNotes: [
      "Bilingual subtitle styling with Spanish/English color coding",
      "Dynamic zooms on critical quotes to emphasize entrepreneurial lessons",
      "Pattern interrupts every 3.2 seconds during dense technical discussions"
    ],
    deliverables: ["Full Interview Cut", "Audio Master", "Social Clip Carousel"],
    aspectRatio: "16:9",
  },

  // --- SHORT FORMS (True 9:16 Vertical Assets) ---
  {
    id: "short-5-questions",
    title: "5 Questions That Break Retention Drop-Off",
    subtitle: "Bilingual psychological hook sequencing for educational creators",
    category: "SHORT FORMS",
    categoryLabel: "Short Forms",
    videoSrc: "/videos/short-05.mp4",
    posterSrc: "/thumbnails/sam-rockwell.png",
    runtime: "0:54",
    language: "EN / ES",
    platform: "Instagram Reels",
    primaryFocus: "Hook Optimization",
    retentionMetric: "71.8% Retention at 30s",
    client: "Educational Growth Creator",
    description:
      "Engineered for high-retention short-form storytelling. Dynamic kinetic typography, pattern interruptions every 2.4 seconds, and strategic B-roll inserts to counter user swipe fatigue.",
    strategyNotes: [
      "3-second hook with negative-inquiry question headline to trigger curiosity",
      "Audio ducking during key thesis statements for vocal clarity",
      "Color-highlighted keywords mapped to viewer attention anchors"
    ],
    deliverables: ["Vertical Master (9:16)", "Hardcoded Bilingual Subtitles", "Custom Hook Thumbnails"],
    aspectRatio: "9:16",
  },
  {
    id: "short-creator-funnel",
    title: "High-Ticket Creator Funnel Hook",
    subtitle: "Fast-paced agency authority reel tailored for direct conversions",
    category: "SHORT FORMS",
    categoryLabel: "Short Forms",
    videoSrc: "/videos/short-02.mp4",
    posterSrc: "/daren-pictures/daren-3.jpg",
    runtime: "0:42",
    language: "EN",
    platform: "Instagram Reels",
    primaryFocus: "Retention Engineering",
    retentionMetric: "69.1% Average Retention",
    client: "Boutique Creative Agency",
    description:
      "Direct-response vertical video designed to capture high-value clients. Features micro-zooms, kinetic callouts, and tactile sound design to guide the eye toward the final call to action.",
    strategyNotes: [
      "Zero dead air: first syllable hits at frame 0",
      "Tactile SFX (clicks, swooshes, page turns) for subconscious engagement",
      "Warm gold metric highlights reinforcing premium value"
    ],
    deliverables: ["Master Cut 9:16", "Clean Audio Stem", "B-roll Sound Mix"],
    aspectRatio: "9:16",
  },
  {
    id: "short-spanish-ecommerce",
    title: "Spanish E-Commerce Growth Reel",
    subtitle: "Culturally resonant Spanish pacing & localized retention hooks",
    category: "SHORT FORMS",
    categoryLabel: "Short Forms",
    videoSrc: "/videos/short-04.mp4",
    posterSrc: "/thumbnails/laloba.png",
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
    id: "short-output-cut",
    title: "Visual Momentum & Dynamic Cut",
    subtitle: "Fast-paced transitions, sound design & rhythm-driven pacing",
    category: "SHORT FORMS",
    categoryLabel: "Short Forms",
    videoSrc: "/videos/short-output.mp4",
    posterSrc: "/thumbnails/kristen-oja.png",
    runtime: "0:39",
    language: "EN",
    platform: "Instagram Reels",
    primaryFocus: "Hook Optimization",
    retentionMetric: "78.2% Watch-Through",
    client: "Creator Network",
    description:
      "Precision cut utilizing Alight Motion speed curves, CapCut dynamic font styling, and beat-matched visual transitions.",
    strategyNotes: [
      "Speed ramping between key action beats",
      "Bass-boosted impact transients",
      "High-contrast color styling"
    ],
    deliverables: ["9:16 Vertical Master", "Stem Mix", "LUT Presets"],
    aspectRatio: "9:16",
  },

  // --- AMVs (ANIME EDIT) ---
  {
    id: "amv-pacing-vfx",
    title: "Anime Sync & Dynamic VFX Cut",
    subtitle: "High-tempo beat synchronicity, optical flow & velocity mapping",
    category: "AMVs",
    categoryLabel: "AMV's (Anime)",
    videoSrc: "/videos/amv-aa.mp4",
    posterSrc: "/daren-pictures/daren-2.jpg",
    runtime: "0:35",
    language: "EN",
    platform: "TikTok",
    primaryFocus: "Sound Design & VFX",
    retentionMetric: "82.4% Completion Rate",
    client: "AMV Creator Network",
    description:
      "Fast-paced anime edit engineered with micro-cuts, frame blending, and custom SFX risers. Synchronized frame-by-frame using Alight Motion and Sketchbook detailing to maximize visual dopamine and replay loops.",
    strategyNotes: [
      "Sub-frame audio transients mapped to impact frames and chromatic aberration spikes",
      "Seamless infinite loop structure designed to prompt automatic repeat plays",
      "Velocity curve interpolation for dynamic speed ramps without stutter"
    ],
    deliverables: ["4K 60FPS Master Cut", "Vertical 9:16 Re-frame", "Sound Design Audio Stem"],
    aspectRatio: "9:16",
  },

  // --- CRYPTO & WEB3 ---
  {
    id: "crypto-pfp-viral",
    title: "Crypto Community & Meme Coin PFP Visual",
    subtitle: "Web3 viral asset cut with animated PFP culture & dynamic momentum",
    category: "CRYPTO",
    categoryLabel: "Crypto & Web3",
    videoSrc: "/videos/short-03.mp4",
    posterSrc: "/daren-pictures/daren-1.jpg",
    runtime: "0:38",
    language: "EN",
    platform: "Facebook",
    primaryFocus: "Viral Meme Velocity",
    retentionMetric: "140K+ Organic Impressions",
    client: "Web3 / Meme Coin Community",
    description:
      "High-octane Web3 video celebrating community milestones. Incorporates animated 2D PFPs, meme culture inserts, on-chain chart explosions, and fast-paced electronic sound design.",
    strategyNotes: [
      "Layered alpha-channel PFP motion rigs for character movement over price action",
      "VHS grain and chromatic keyframes matching digital culture aesthetic",
      "Hyped cadence designed for repetitive looping in community groups"
    ],
    deliverables: ["Square 1:1 Community Video", "Vertical 9:16 Story Cut", "GIF Loop Variants"],
    aspectRatio: "9:16",
  },
];
