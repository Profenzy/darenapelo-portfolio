import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://darenapelo.com"),
  title: "Daren P. Apelo | Financial Management & High-Retention Video Editor",
  description:
    "Portfolio of Daren P. Apelo — Financial Management Graduate & Video Editor specializing in high-retention English/Spanish cuts, AMVs, YouTube long-forms, and viral short-form assets.",
  keywords: [
    "Daren P. Apelo",
    "Video Editor",
    "Financial Management",
    "High Retention Video Editing",
    "AMV Editor",
    "Bilingual Video Editor",
    "Spanish Video Editor",
    "YouTube Long Form",
    "Shorts Reels TikTok",
    "Crypto Meme Coin PFP",
    "Trixy Castro",
  ],
  authors: [{ name: "Daren P. Apelo" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Daren P. Apelo | High-Retention Video Editor",
    description: "Financial management strategy meets cinematic, high-retention editing.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/daren-pictures/avatar.jpg",
        width: 1200,
        height: 630,
        alt: "Daren P. Apelo Video Editor Portfolio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#0a0a0b]">
      <body className="min-h-screen bg-[#0a0a0b] text-[#f4f1ea] antialiased selection:bg-gold selection:text-black">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
