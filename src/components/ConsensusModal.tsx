import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { Debater, Concession, DebateTopic } from '../types';
import { soundEngine } from '../utils/audioEffects';
import { Award, Check, Sparkles, X, RotateCcw } from 'lucide-react';

interface ConsensusModalProps {
  isOpen: boolean;
  onClose: () => void;
  debaterA: Debater;
  debaterB: Debater;
  topic: DebateTopic;
  concessions: Concession[];
  onResetDebate: () => void;
}

export const ConsensusModal: React.FC<ConsensusModalProps> = ({
  isOpen,
  onClose,
  debaterA,
  debaterB,
  topic,
  concessions,
  onResetDebate,
}) => {
  useEffect(() => {
    if (isOpen) {
      soundEngine.playConsensusFanfare();
      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#CCFF00', '#FF5C00', '#FAFAF8', '#3B1B4E'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white border-2 border-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col gap-5 text-slate-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center font-black shadow-xs">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-xs uppercase tracking-widest text-amber-600 font-extrabold">
                Minds Changed
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Treaty of Common Ground
            </h2>
          </div>
        </div>

        {/* Topic Context */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90">
          <span className="font-display text-xs uppercase tracking-wider text-slate-500 font-bold block">
            Debated Subject:
          </span>
          <p className="text-sm sm:text-base font-bold text-slate-900 mt-1">{topic.title}</p>
        </div>

        {/* Shift Breakdown */}
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-xs uppercase tracking-wider text-slate-700 font-extrabold">
            How Positions Shifted & Reconciled:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Shift A */}
            <div className="p-4 rounded-2xl border border-amber-300 bg-amber-50/70 flex flex-col gap-1.5">
              <span className="font-display text-xs font-bold text-amber-800 uppercase tracking-wide">
                {debaterA.name} ({debaterA.language.toUpperCase()})
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Moved from dogmatic defense of manual crafting to recognizing that raw syntax generation is fundamentally commoditized.
              </p>
            </div>

            {/* Shift B */}
            <div className="p-4 rounded-2xl border border-blue-300 bg-blue-50/70 flex flex-col gap-1.5">
              <span className="font-display text-xs font-bold text-blue-800 uppercase tracking-wide">
                {debaterB.name} ({debaterB.language.toUpperCase()})
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Conceded that AI agents lack contextual taste, empathy, and real-world stakeholder alignment.
              </p>
            </div>
          </div>
        </div>

        {/* Concessions Count */}
        {concessions.length > 0 && (
          <div className="text-xs text-slate-600 font-medium">
            Recorded <strong className="font-mono text-emerald-700 font-bold">{concessions.length}</strong> formal concession(s) during cross-examination.
          </div>
        )}

        {/* The Synthesis */}
        <div className="bg-slate-900 text-white border border-slate-800 p-5 rounded-2xl flex flex-col gap-2 shadow-sm">
          <span className="font-display text-xs uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>The Synthesized Consensus:</span>
          </span>
          <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
            "The future belongs neither to syntax typists nor autonomous black-box bots, but to <strong className="text-amber-300 font-semibold">forward-deployed builders with taste</strong> who wield AI as high-velocity leverage to solve dirty, real-world customer problems."
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => {
              onResetDebate();
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider bg-slate-100 text-slate-800 hover:bg-slate-200 transition-all font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Fresh Debate</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider bg-slate-900 text-white font-extrabold hover:bg-slate-800 active:scale-95 transition-all shadow-md"
          >
            Keep Arguing
          </button>
        </div>
      </div>
    </div>
  );
};
