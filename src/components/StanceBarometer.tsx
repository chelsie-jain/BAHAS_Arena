import React from 'react';
import type { Concession, Debater } from '../types';
import { Scale, CheckCircle2, Lightbulb } from 'lucide-react';

interface StanceBarometerProps {
  debaterA: Debater;
  debaterB: Debater;
  stanceScore: number; // 0 = Full Debater A, 50 = Common Ground, 100 = Full Debater B
  concessions: Concession[];
  onViewConsensus: () => void;
}

export const StanceBarometer: React.FC<StanceBarometerProps> = ({
  debaterA,
  debaterB,
  stanceScore,
  concessions,
  onViewConsensus,
}) => {
  // Distance from 50 (50 is perfect balance)
  const divergence = Math.abs(stanceScore - 50);
  const convergencePercent = Math.max(0, Math.min(100, Math.round((1 - divergence / 50) * 100)));
  const isConsensusReached = convergencePercent >= 70;

  return (
    <div className="bg-[#3B1B4E]/40 border border-[#CCFF00]/25 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 relative overflow-hidden">
      {/* Background glow when close to consensus */}
      {isConsensusReached && (
        <div className="absolute inset-0 bg-[#CCFF00]/[0.06] animate-pulse pointer-events-none" />
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-[#CCFF00]" />
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#FAFAF8]">
            Mind Shift & Persuasion Radar
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isConsensusReached ? (
            <button
              onClick={onViewConsensus}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[0.7rem] uppercase tracking-wider bg-[#CCFF00] text-[#0B0B0C] font-bold hover:scale-105 transition-transform"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Consensus Unlocked! View Treaty</span>
            </button>
          ) : (
            <span className="font-mono text-[0.68rem] uppercase tracking-wider text-[#FAFAF8]/70">
              Convergence: <strong className="text-[#CCFF00]">{convergencePercent}%</strong>
            </span>
          )}
        </div>
      </div>

      {/* Tug-of-War Barometer */}
      <div className="relative pt-6 pb-2">
        {/* Needle Marker Indicator */}
        <div
          className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center transition-all duration-700 ease-out"
          style={{ left: `${stanceScore}%` }}
        >
          <span className="font-mono text-[0.62rem] font-bold text-[#CCFF00] bg-[#0B0B0C] border border-[#CCFF00]/50 px-1.5 py-0.5 rounded shadow">
            {stanceScore < 45 ? `${debaterA.name} Leading` : stanceScore > 55 ? `${debaterB.name} Leading` : 'Common Ground!'}
          </span>
          <div className="w-0.5 h-3 bg-[#CCFF00]" />
        </div>

        {/* Dual Color Track */}
        <div className="w-full h-3 rounded-full overflow-hidden flex border border-[#FAFAF8]/20 bg-[#0B0B0C]">
          <div
            className="h-full bg-gradient-to-r from-[#FF5C00] to-[#FFAA00] transition-all duration-700"
            style={{ width: `${stanceScore}%` }}
          />
          <div
            className="h-full bg-gradient-to-r from-[#3B1B4E] to-[#CCFF00] transition-all duration-700"
            style={{ width: `${100 - stanceScore}%` }}
          />
        </div>

        {/* Center Common Ground Target */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#CCFF00] bg-[#0B0B0C] flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
        </div>
      </div>

      {/* Stance Labels */}
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex flex-col">
          <span className="text-[#FFAA00] font-semibold">{debaterA.name}</span>
          <span className="text-[0.65rem] text-[#FAFAF8]/50 max-w-[180px] truncate">{debaterA.stanceTitle}</span>
        </div>

        <div className="text-center font-mono text-[0.62rem] text-[#CCFF00] uppercase tracking-wider">
          50% Common Ground
        </div>

        <div className="flex flex-col text-right">
          <span className="text-[#CCFF00] font-semibold">{debaterB.name}</span>
          <span className="text-[0.65rem] text-[#FAFAF8]/50 max-w-[180px] truncate">{debaterB.stanceTitle}</span>
        </div>
      </div>

      {/* Latest Concession Ticker */}
      {concessions.length > 0 && (
        <div className="mt-1 pt-2 border-t border-[#FAFAF8]/10 flex items-center gap-2 text-xs text-[#FAFAF8]/80 font-mono">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
          <span className="text-[0.68rem] truncate">
            <strong>Mind Shift:</strong> {concessions[concessions.length - 1].text}
          </span>
        </div>
      )}
    </div>
  );
};
