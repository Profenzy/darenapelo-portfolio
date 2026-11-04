import Link from "next/link";
import { ArrowLeft, Film } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0b] text-[#f4f1ea] px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#121214] border border-gold/40 flex items-center justify-center text-gold mb-6 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
        <Film className="w-8 h-8" />
      </div>
      <span className="text-xs font-mono uppercase tracking-widest text-gold mb-2">
        ERROR 404
      </span>
      <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#f4f1ea] mb-3">
        Frame Not Found
      </h1>
      <p className="max-w-md text-sm text-[#8d8b86] mb-8">
        The requested asset or cut is not in the archive. Return to the main portfolio reel.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-[#0a0a0b] font-display font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Vault</span>
      </Link>
    </div>
  );
}
