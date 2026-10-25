import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface ZeroReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZeroReviewModal: React.FC<ZeroReviewModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-[#0B0B0C] border-2 border-[#CCFF00] rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-[0_0_60px_rgba(204,255,0,0.25)] relative my-8 flex flex-col gap-6 text-[#FAFAF8]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAFAF8]/10 text-[#FAFAF8] hover:bg-[#FAFAF8]/20 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#FAFAF8]/10 pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#CCFF00] text-black flex items-center justify-center font-mono font-black text-base">
            04
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#CCFF00] font-bold">
                Zero Take-Home Build Submission
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">Chelsie Jain / Forward Deployed Builder</h2>
          </div>
        </div>

        {/* Section 1: The Three Product Reviews */}
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between border-b border-[#FAFAF8]/10 pb-2">
            <h3 className="font-mono text-sm uppercase tracking-wider text-[#CCFF00] font-bold">
              Part 1: The Three Products (Under 150 Words Each)
            </h3>
            <span className="font-mono text-[0.62rem] text-[#FAFAF8]/50 uppercase tracking-widest">
              Direct & Unpolished
            </span>
          </div>

          {/* Product 1: The Middle Market */}
          <div className="p-4 rounded-2xl bg-[#3B1B4E]/30 border border-[#FAFAF8]/10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#FFAA00] uppercase">
                01. The Middle Market
              </span>
              <span className="font-mono text-[0.62rem] text-[#FAFAF8]/50">135 words</span>
            </div>
            <p className="text-xs sm:text-sm text-[#FAFAF8]/90 leading-relaxed">
              <strong>The Problem:</strong> Small Indian businesses (photo studios, labs, print shops) are choked answering the exact same five WhatsApp queries all day—pricing, dates, delivery—while orders live in chaotic paper registers or heads. Delayed replies directly bleed bookings to competitors, but rigid enterprise CRM software is overkill and abandoned within a week.
            </p>
            <p className="text-xs sm:text-sm text-[#FAFAF8]/90 leading-relaxed">
              <strong>First thing I'd build:</strong> A headless WhatsApp shadow-assistant wired directly to a Google Sheet or lightweight SQLite ledger the owner already knows how to view. When a customer asks "14 dec free hai?" or "rate bhejo", the assistant checks slot availability and auto-drafts the exact reply with a one-tap approval notification to the owner’s phone before dispatch. Zero new software for the owner to learn; instant customer response times.
            </p>
          </div>

          {/* Product 2: CLOSURE */}
          <div className="p-4 rounded-2xl bg-[#3B1B4E]/30 border border-[#FAFAF8]/10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#CCFF00] uppercase">
                02. CLOSURE
              </span>
              <span className="font-mono text-[0.62rem] text-[#FAFAF8]/50">136 words</span>
            </div>
            <p className="text-xs sm:text-sm text-[#FAFAF8]/90 leading-relaxed">
              <strong>The Problem:</strong> Ghosting in hiring creates an asymmetric information vacuum. Freshers invest hours into applications and take-home assignments, only to receive generic "moving forward with others" auto-rejects. Candidates invent imaginary flaws, compounding the same resume and coding mistakes across forty more applications, while founders simply lack the hours to write 200 custom rejection letters.
            </p>
            <p className="text-xs sm:text-sm text-[#FAFAF8]/90 leading-relaxed">
              <strong>First thing I'd build:</strong> Preserve the Rs 29 human-signed authenticity, but make review turnaround sustainable using an internal "Diff & Diagnostic" engine. It ingests the job spec and applicant submission, detects the top 2 concrete failure points (e.g., missing API error boundaries, unhandled edge cases), and pre-populates structured bullet points for the human reviewer to audit, tweak, and sign in under 60 seconds. High human empathy at viable unit economics.
            </p>
          </div>

          {/* Product 3: ISHQweds */}
          <div className="p-4 rounded-2xl bg-[#3B1B4E]/30 border border-[#FAFAF8]/10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#FF5C00] uppercase">
                03. ISHQweds
              </span>
              <span className="font-mono text-[0.62rem] text-[#FAFAF8]/50">138 words</span>
            </div>
            <p className="text-xs sm:text-sm text-[#FAFAF8]/90 leading-relaxed">
              <strong>The Problem:</strong> Indian weddings aren't logistical spreadsheets; they are high-stakes emotional pressure cookers spanning joint families, conflicting rituals, and dozens of informal vendors (pandit, caterer, mehendi, decor) operating on verbal promises. Dedicated wedding apps fail because elders refuse to install them, forcing the bride and groom into full-time grievance and coordination dispatchers.
            </p>
            <p className="text-xs sm:text-sm text-[#FAFAF8]/90 leading-relaxed">
              <strong>First thing I'd build:</strong> A WhatsApp-native "Shaadi Control Bot" with zero mobile app downloads. Relatives RSVP, select dietary preferences, and coordinate arrival cabs directly through guided WhatsApp chat flows. Vendors receive milestone reminders with UPI advance tracking. The couple and key planners get a single, automated 9:00 AM WhatsApp briefing sheet showing what is locked, what is pending, and which vendor needs a phone call today.
            </p>
          </div>
        </div>

        {/* Section 2: BAHAS Architecture for Part 2 */}
        <div className="flex flex-col gap-3 pt-2">
          <h3 className="font-mono text-sm uppercase tracking-wider text-[#CCFF00] font-bold border-b border-[#FAFAF8]/10 pb-2">
            Part 2: BAHAS Architecture (The Cross-Language Argument Arena)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#FAFAF8]/[0.03] border border-[#FAFAF8]/10 rounded-xl">
              <strong className="text-[#CCFF00] block mb-1">1. Sub-second Streaming Translation</strong>
              Sub-50ms hybrid translation engine pairing a curated debate lexicon with public endpoints, streaming live subtitles in the opponent's language so debaters can counter before a sentence concludes.
            </div>
            <div className="p-3 bg-[#FAFAF8]/[0.03] border border-[#FAFAF8]/10 rounded-xl">
              <strong className="text-[#FF5C00] block mb-1">2. Barge-in & Audio Ducking</strong>
              Barge-in collision engine that instantly ducks the opponent's audio synthesis (`speechSynthesis.cancel()`), marks cut-off text in the transcript, and shifts active priority to the interrupter.
            </div>
            <div className="p-3 bg-[#FAFAF8]/[0.03] border border-[#FAFAF8]/10 rounded-xl">
              <strong className="text-[#FFAA00] block mb-1">3. Heat & Vocal Agitation Meter</strong>
              Dynamic Mercury Barometer measuring sentiment aggression, words-per-minute, and collision frequency. Elevates synthesized speech playback speed (up to 1.32x) and pitch to mirror genuine human agitation.
            </div>
            <div className="p-3 bg-[#FAFAF8]/[0.03] border border-[#FAFAF8]/10 rounded-xl">
              <strong className="text-[#CCFF00] block mb-1">4. Mind Shift & Concession Radar</strong>
              Scans natural language in real-time for concessions ("fair point", "maan liya", "tu as raison"). Shifts the stance barometer toward 50% common ground, culminating in the Treaty of Common Ground.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#FAFAF8]/10 pt-4">
          <span className="font-mono text-xs text-[#FAFAF8]/50">
            Candidate: Chelsie Jain • Indore, India
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#CCFF00] text-black font-mono text-xs uppercase font-extrabold hover:scale-105 active:scale-95 transition-all"
          >
            Back to Arena
          </button>
        </div>
      </div>
    </div>
  );
};
