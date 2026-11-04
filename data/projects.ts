export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "LONG FORMS" | "SHORT FORMS" | "AMVs";
  categoryLabel: string;
  videoSrc: string;
  posterSrc?: string; // Optional: Only set when an authentic thumbnail exists!
  runtime: string;
  language: "EN" | "ES" | "EN / ES";
  platform: "YouTube" | "TikTok" | "Instagram Reels" | "Facebook" | "Webinar / Course";
  primaryFocus: "Retention Engineering" | "Sound Design & VFX" | "Narrative Pacing" | "Hook Optimization" | "Bilingual Educational Pacing";
  retentionMetric?: string;
  client?: string;
  description: string;
  strategyNotes: string[];
  deliverables?: string[];
  aspectRatio: "16:9" | "9:16";
}

export const PROJECTS: Project[] = [
  // ==========================================
  // LONG FORMS (16:9) - Authentic 16:9 Widescreen Videos & Proper Thumbnails
  // ==========================================
  {
    id: "long-freddy-money",
    title: "Freddy Money: Scaling Financial Capital",
    subtitle: "High-production YouTube masterclass with structured financial retention",
    category: "LONG FORMS",
    categoryLabel: "Long Forms (16:9)",
    videoSrc: "/videos/longforms/Freddy%20Money.mp4",
    posterSrc: "/thumbnails/freddy-money.png",
    runtime: "16:45",
    language: "EN",
    platform: "YouTube",
    primaryFocus: "Narrative Pacing",
    retentionMetric: "64.2% Avg Duration",
    client: "Freddy Money Show",
    description:
      "Deep financial masterclass cut featuring structured B-roll sequencing, chapter milestones, and financial management charts engineered to hold viewers through complex wealth concepts.",
    strategyNotes: [
      "Visual financial infographics replacing static talking-head slides",
      "Chapterized progression with narrative mini-resolutions every 2.5 minutes",
      "Dynamic background audio ducking calibrated for pristine vocal clarity"
    ],
    deliverables: ["4K 60FPS Master Cut", "Thumbnail Package", "Short-Form Teaser Pack"],
    aspectRatio: "16:9",
  },
  {
    id: "long-kristen-oja",
    title: "Kristen Oja: Integrative Health & Wealth",
    subtitle: "Documentary-grade interview pacing & visual narrative retention",
    category: "LONG FORMS",
    categoryLabel: "Long Forms (16:9)",
    videoSrc: "/videos/longforms/Kristen%20Oja.mp4",
    posterSrc: "/thumbnails/kristen-oja.png",
    runtime: "21:10",
    language: "EN",
    platform: "YouTube",
    primaryFocus: "Retention Engineering",
    retentionMetric: "59.8% Completion Rate",
    client: "Kristen Oja Series",
    description:
      "A long-form conversation edited with precision multi-camera switching, ambient soundscapes, and empathetic cut timing that enhances listener immersion.",
    strategyNotes: [
      "Micro-cuts on listener reactions to emphasize emotional breakthrough moments",
      "Clean color grading aligned with calming wellness aesthetic",
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
    categoryLabel: "Long Forms (16:9)",
    videoSrc: "/videos/longforms/LaLoba.mp4",
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
    categoryLabel: "Long Forms (16:9)",
    videoSrc: "/videos/longforms/Sam%20Rockwell.mp4",
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
    categoryLabel: "Long Forms (16:9)",
    videoSrc: "/videos/longforms/Yaritza.mp4",
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

  // ==========================================
  // SHORT FORMS (9:16) - Native Vertical Videos (No confusing third-party thumbnails!)
  // ==========================================
  {
    id: "short-5-questions",
    title: "5 Questions That Break Retention Drop-Off",
    subtitle: "English psychological hook sequencing for educational creators",
    category: "SHORT FORMS",
    categoryLabel: "Short Forms (9:16)",
    videoSrc: "/videos/short-05.mp4",
    // No thumbnail specified -> video player shows its own native first frame!
    runtime: "1:15",
    language: "EN",
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
    deliverables: ["Vertical Master (9:16)", "Hardcoded Captions", "Audio Stems"],
    aspectRatio: "9:16",
  },
  {
    id: "short-spanish-educacion",
    title: "La Importancia de la Educación Continua y el Crecimiento",
    subtitle: "The Mexican Carpenter & La Escuela Nueva Spanish educational reel",
    category: "SHORT FORMS",
    categoryLabel: "Short Forms (9:16)",
    videoSrc: "/videos/short-01.mp4",
    runtime: "0:49",
    language: "ES",
    platform: "TikTok",
    primaryFocus: "Bilingual Educational Pacing",
    retentionMetric: "74.5% Completion Rate",
    client: "The Mexican Carpenter / La Escuela Nueva",
    description:
      "Educational contractor growth reel in native Spanish. Employs crisp subtitle tracking, punchy zooms, and brand authority framing tailored for Hispanic trade professionals.",
    strategyNotes: [
      "Bold Spanish headline framing keeping key terms above the fold",
      "Fast cut cadence aligned with conversational speech rhythms",
      "High-contrast color pass making text pop on mobile OLED screens"
    ],
    deliverables: ["Vertical Master (9:16)", "Full Captions", "Sound Mix"],
    aspectRatio: "9:16",
  },
  {
    id: "short-spanish-errores",
    title: "Los 3 Errores Principales al Vender",
    subtitle: "High-converting Spanish contractor business coaching reel",
    category: "SHORT FORMS",
    categoryLabel: "Short Forms (9:16)",
    videoSrc: "/videos/short-02.mp4",
    runtime: "0:47",
    language: "ES",
    platform: "Instagram Reels",
    primaryFocus: "Hook Optimization",
    retentionMetric: "69.1% Average Retention",
    client: "The Mexican Carpenter / La Escuela Nueva",
    description:
      "Direct response Spanish educational reel. Built with zero intro delay, direct-to-camera engagement, and branded graphical callouts.",
    strategyNotes: [
      "First syllable hits at frame zero with prominent top banner",
      "Tactile sound design undercutting each listed mistake",
      "Clear call to action funneling viewers into training courses"
    ],
    deliverables: ["Master Cut 9:16", "Clean Audio Stem", "Subtitled Export"],
    aspectRatio: "9:16",
  },
  {
    id: "short-spanish-medicion",
    title: "Cómo Evitar Errores de Medición Costosos",
    subtitle: "Practical Spanish trade education & contractor risk reduction",
    category: "SHORT FORMS",
    categoryLabel: "Short Forms (9:16)",
    videoSrc: "/videos/short-03.mp4",
    runtime: "0:29",
    language: "ES",
    platform: "Facebook",
    primaryFocus: "Bilingual Educational Pacing",
    retentionMetric: "78.4% Retention Rate",
    client: "The Mexican Carpenter / La Escuela Nueva",
    description:
      "Rapid-fire Spanish tutorial showing contractor measurement pitfalls. Engineered for high shareability across Facebook and Instagram contractor groups.",
    strategyNotes: [
      "Tight 29-second cut with rapid demonstration pacing",
      "Attention anchor subtitles with highlighted warning keywords",
      "Dynamic sound effects accentuating error warnings"
    ],
    deliverables: ["Vertical Master (9:16)", "High Bitrate 1080x1920", "Audio Mix"],
    aspectRatio: "9:16",
  },
  {
    id: "short-spanish-profesionalismo",
    title: "Mentalidad y Profesionalismo en la Construcción",
    subtitle: "Spanish mindset & authority cut for trade entrepreneurs",
    category: "SHORT FORMS",
    categoryLabel: "Short Forms (9:16)",
    videoSrc: "/videos/short-04.mp4",
    runtime: "0:40",
    language: "ES",
    platform: "TikTok",
    primaryFocus: "Retention Engineering",
    retentionMetric: "66.3% Completion Rate",
    client: "The Mexican Carpenter / La Escuela Nueva",
    description:
      "Inspirational yet actionable trade reel in Spanish. Balances reflective narrative pacing with kinetic typography and audio bed transitions.",
    strategyNotes: [
      "Emotional music swelling aligned with thesis resolution",
      "Localized Spanish phrasing and rhythm-driven cuts",
      "Optimized for high repeat-replay rates"
    ],
    deliverables: ["TikTok 9:16 Master", "Clean Captioned File", "Audio Stems"],
    aspectRatio: "9:16",
  },
  {
    id: "short-daren-output",
    title: "Daren P. Apelo Video Showcase - Dynamic Cut",
    subtitle: "Precision mobile motion graphics & speed curve styling",
    category: "SHORT FORMS",
    categoryLabel: "Short Forms (9:16)",
    videoSrc: "/videos/short-output.mp4",
    runtime: "0:51",
    language: "EN",
    platform: "Instagram Reels",
    primaryFocus: "Hook Optimization",
    retentionMetric: "81.2% Watch-Through",
    client: "Daren P. Apelo Showcase",
    description:
      "Crafted utilizing Alight Motion speed curves and CapCut dynamic subtitle typography. Showcases high visual momentum and frame-exact audio sync.",
    strategyNotes: [
      "Speed ramping between key action beats",
      "Bass-boosted impact transients",
      "High-contrast color styling"
    ],
    deliverables: ["9:16 Vertical Master", "Stem Mix", "LUT Presets"],
    aspectRatio: "9:16",
  },
  {
    id: "short-final-cut",
    title: "High-Retention Creator Reel (Final Master Cut)",
    subtitle: "Full-velocity short form cut engineered for direct audience retention",
    category: "SHORT FORMS",
    categoryLabel: "Short Forms (9:16)",
    videoSrc: "/videos/short-final.mp4",
    runtime: "0:59",
    language: "EN",
    platform: "Instagram Reels",
    primaryFocus: "Retention Engineering",
    retentionMetric: "73.9% Retention",
    client: "Agency Client",
    description:
      "Fast-paced vertical reel structured around viewer drop-off analytics. Employs micro-zooms, kinetic callouts, and tactile sound design to maximize watch time.",
    strategyNotes: [
      "Zero dead air between cut points",
      "Dynamic background movement countering talking-head fatigue",
      "Tactile sound design for subconscious engagement"
    ],
    deliverables: ["Vertical 9:16 Master", "Audio Stem", "Captioned Version"],
    aspectRatio: "9:16",
  },

  // ==========================================
  // AMVs (ANIME EDIT) - Authentic Anime Edits
  // ==========================================
  {
    id: "amv-pacing-vfx",
    title: "Anime Sync & Dynamic VFX Cut",
    subtitle: "High-tempo beat synchronicity, optical flow & velocity mapping",
    category: "AMVs",
    categoryLabel: "AMV's (Anime)",
    videoSrc: "/videos/amv-aa.mp4",
    runtime: "0:35",
    language: "EN",
    platform: "TikTok",
    primaryFocus: "Sound Design & VFX",
    retentionMetric: "82.4% Completion Rate",
    client: "AMV Creator Network",
    description:
      "Fast-paced anime edit engineered with micro-cuts, frame blending, and custom SFX risers. Synchronized frame-by-frame using Alight Motion to maximize visual dopamine and replay loops.",
    strategyNotes: [
      "Sub-frame audio transients mapped to impact frames and chromatic aberration spikes",
      "Seamless infinite loop structure designed to prompt automatic repeat plays",
      "Velocity curve interpolation for dynamic speed ramps without stutter"
    ],
    deliverables: ["4K 60FPS Master Cut", "Vertical 9:16 Re-frame", "Sound Design Audio Stem"],
    aspectRatio: "9:16",
  },
  {
    id: "amv-extended-cut",
    title: "Anime Sync & Motion Graphics (Extended Cut)",
    subtitle: "Layered optical flow, rotoscoped transitions & atmospheric sound design",
    category: "AMVs",
    categoryLabel: "AMV's (Anime)",
    videoSrc: "/videos/short-aa.mp4",
    runtime: "1:01",
    language: "EN",
    platform: "TikTok",
    primaryFocus: "Sound Design & VFX",
    retentionMetric: "79.6% Replay Rate",
    client: "AMV Network",
    description:
      "A tribute to precision editing: rotoscoping, camera shake simulations, custom sound synthesis, and velocity map synchronizations designed for peak aesthetic satisfaction.",
    strategyNotes: [
      "Layered optical sound effects matched precisely with action impacts",
      "Custom glow shaders applied to character eyes and neon signs",
      "Rhythm-driven cut points aligned with bass drops"
    ],
    deliverables: ["Vertical Master (9:16)", "HQ WAV Audio Mix", "Color Grade LUTs"],
    aspectRatio: "9:16",
  },
];
