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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0B0B0C] border-2 border-[#CCFF00] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(204,255,0,0.3)] relative overflow-hidden flex flex-col gap-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAFAF8]/10 text-[#FAFAF8] hover:bg-[#FAFAF8]/20 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#CCFF00] text-black flex items-center justify-center font-black">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#CCFF00] font-bold">
                Minds Changed
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#FAFAF8] leading-tight">
              Treaty of Common Ground
            </h2>
          </div>
        </div>

        {/* Topic Context */}
        <div className="bg-[#FAFAF8]/[0.04] p-4 rounded-2xl border border-[#FAFAF8]/10">
          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-[#FAFAF8]/50 block">
            Debated Subject:
          </span>
          <p className="text-sm font-semibold text-[#FAFAF8] mt-1">{topic.title}</p>
        </div>

        {/* Shift Breakdown */}
        <div className="flex flex-col gap-3">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#FAFAF8]/70 font-bold">
            How Positions Shifted & Reconciled:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Shift A */}
            <div className="p-3.5 rounded-xl border border-[#FFAA00]/30 bg-[#FFAA00]/5 flex flex-col gap-1.5">
              <span className="font-mono text-xs font-bold text-[#FFAA00]">
                {debaterA.name} ({debaterA.language.toUpperCase()})
              </span>
              <p className="text-xs text-[#FAFAF8]/80 leading-relaxed">
                Moved from dogmatic defense of manual crafting to recognizing that raw syntax generation is fundamentally commoditized.
              </p>
            </div>

            {/* Shift B */}
            <div className="p-3.5 rounded-xl border border-[#CCFF00]/30 bg-[#CCFF00]/5 flex flex-col gap-1.5">
              <span className="font-mono text-xs font-bold text-[#CCFF00]">
                {debaterB.name} ({debaterB.language.toUpperCase()})
              </span>
              <p className="text-xs text-[#FAFAF8]/80 leading-relaxed">
                Conceded that AI agents lack contextual taste, empathy, and real-world stakeholder alignment.
              </p>
            </div>
          </div>
        </div>

        {/* Concessions Count */}
        {concessions.length > 0 && (
          <div className="text-[0.72rem] font-mono text-[#FAFAF8]/70">
            Recorded {concessions.length} formal concession(s) during cross-examination.
          </div>
        )}

        {/* The Synthesis */}
        <div className="bg-[#3B1B4E]/60 border border-[#CCFF00]/40 p-4 rounded-2xl flex flex-col gap-2">
          <span className="font-mono text-[0.68rem] uppercase tracking-wider text-[#CCFF00] font-bold flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>The Synthesized Consensus:</span>
          </span>
          <p className="text-xs sm:text-sm text-[#FAFAF8] leading-relaxed">
            "The future belongs neither to syntax typists nor autonomous black-box bots, but to <strong>forward-deployed builders with taste</strong> who wield AI as high-velocity leverage to solve dirty, real-world customer problems."
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => {
              onResetDebate();
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider bg-[#FAFAF8]/10 text-[#FAFAF8] hover:bg-[#FAFAF8]/20 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Fresh Debate</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider bg-[#CCFF00] text-black font-extrabold hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            Keep Arguing
          </button>
        </div>
      </div>
    </div>
  );
};
