import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface ZeroReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZeroReviewModal: React.FC<ZeroReviewModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white border-2 border-slate-900 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 flex flex-col gap-6 text-slate-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-display font-black text-base shadow-xs">
            04
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-xs uppercase tracking-widest text-amber-600 font-extrabold">
                Zero Take-Home Build Submission
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900">Chelsie Jain / Forward Deployed Builder</h2>
          </div>
        </div>

        {/* Section 1: The Three Product Reviews */}
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between border-b border-slate-200 pb-2">
            <h3 className="font-display text-sm uppercase tracking-wider text-slate-900 font-extrabold">
              Part 1: The Three Products (Under 150 Words Each)
            </h3>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Direct & Unpolished
            </span>
          </div>

          {/* Product 1: The Middle Market */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="font-display text-xs font-bold text-amber-800 uppercase tracking-wide">
                01. The Middle Market
              </span>
              <span className="font-mono text-xs text-slate-600 font-bold bg-white px-2 py-0.5 rounded border border-amber-200">135 words</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              <strong className="text-slate-900 font-bold">The Problem:</strong> Small Indian businesses (photo studios, labs, print shops) are choked answering the exact same five WhatsApp queries all day—pricing, dates, delivery—while orders live in chaotic paper registers or heads. Delayed replies directly bleed bookings to competitors, but rigid enterprise CRM software is overkill and abandoned within a week.
            </p>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              <strong className="text-slate-900 font-bold">First thing I'd build:</strong> A headless WhatsApp shadow-assistant wired directly to a Google Sheet or lightweight SQLite ledger the owner already knows how to view. When a customer asks "14 dec free hai?" or "rate bhejo", the assistant checks slot availability and auto-drafts the exact reply with a one-tap approval notification to the owner’s phone before dispatch. Zero new software for the owner to learn; instant customer response times.
            </p>
          </div>

          {/* Product 2: CLOSURE */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="font-display text-xs font-bold text-emerald-800 uppercase tracking-wide">
                02. CLOSURE
              </span>
              <span className="font-mono text-xs text-slate-600 font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">136 words</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              <strong className="text-slate-900 font-bold">The Problem:</strong> Ghosting in hiring creates an asymmetric information vacuum. Freshers invest hours into applications and take-home assignments, only to receive generic "moving forward with others" auto-rejects. Candidates invent imaginary flaws, compounding the same resume and coding mistakes across forty more applications, while founders simply lack the hours to write 200 custom rejection letters.
            </p>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              <strong className="text-slate-900 font-bold">First thing I'd build:</strong> Preserve the Rs 29 human-signed authenticity, but make review turnaround sustainable using an internal "Diff & Diagnostic" engine. It ingests the job spec and applicant submission, detects the top 2 concrete failure points (e.g., missing API error boundaries, unhandled edge cases), and pre-populates structured bullet points for the human reviewer to audit, tweak, and sign in under 60 seconds. High human empathy at viable unit economics.
            </p>
          </div>

          {/* Product 3: ISHQweds */}
          <div className="p-5 rounded-2xl bg-orange-50/70 border border-orange-200 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="font-display text-xs font-bold text-orange-800 uppercase tracking-wide">
                03. ISHQweds
              </span>
              <span className="font-mono text-xs text-slate-600 font-bold bg-white px-2 py-0.5 rounded border border-orange-200">138 words</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              <strong className="text-slate-900 font-bold">The Problem:</strong> Indian weddings aren't logistical spreadsheets; they are high-stakes emotional pressure cookers spanning joint families, conflicting rituals, and dozens of informal vendors (pandit, caterer, mehendi, decor) operating on verbal promises. Dedicated wedding apps fail because elders refuse to install them, forcing the bride and groom into full-time grievance and coordination dispatchers.
            </p>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              <strong className="text-slate-900 font-bold">First thing I'd build:</strong> A WhatsApp-native "Shaadi Control Bot" with zero mobile app downloads. Relatives RSVP, select dietary preferences, and coordinate arrival cabs directly through guided WhatsApp chat flows. Vendors receive milestone reminders with UPI advance tracking. The couple and key planners get a single, automated 9:00 AM WhatsApp briefing sheet showing what is locked, what is pending, and which vendor needs a phone call today.
            </p>
          </div>
        </div>

        {/* Section 2: BAHAS Architecture for Part 2 */}
        <div className="flex flex-col gap-3 pt-2">
          <h3 className="font-display text-sm uppercase tracking-wider text-slate-900 font-extrabold border-b border-slate-200 pb-2">
            Part 2: BAHAS Architecture (The Cross-Language Argument Arena)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl">
              <strong className="font-display text-slate-900 block mb-1 font-bold">1. Sub-second Streaming Translation</strong>
              Sub-50ms hybrid translation engine pairing a curated debate lexicon with public endpoints, streaming live subtitles in the opponent's language so debaters can counter before a sentence concludes.
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl">
              <strong className="font-display text-red-700 block mb-1 font-bold">2. Barge-in & Audio Ducking</strong>
              Barge-in collision engine that instantly ducks the opponent's audio synthesis (`speechSynthesis.cancel()`), marks cut-off text in the transcript, and shifts active priority to the interrupter.
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl">
              <strong className="font-display text-amber-700 block mb-1 font-bold">3. Heat & Vocal Agitation Meter</strong>
              Dynamic Mercury Barometer measuring sentiment aggression, words-per-minute, and collision frequency. Elevates synthesized speech playback speed (up to 1.32x) and pitch to mirror genuine human agitation.
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl">
              <strong className="font-display text-emerald-700 block mb-1 font-bold">4. Mind Shift & Concession Radar</strong>
              Scans natural language in real-time for concessions ("fair point", "maan liya", "tu as raison"). Shifts the stance barometer toward 50% common ground, culminating in the Treaty of Common Ground.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <span className="text-xs text-slate-600 font-semibold">
            Candidate: Chelsie Jain • Indore, India
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs uppercase font-extrabold hover:bg-slate-800 active:scale-95 transition-all shadow-sm"
          >
            Back to Arena
          </button>
        </div>
      </div>
    </div>
  );
};
