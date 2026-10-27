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
    <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 flex flex-col gap-4 relative shadow-sm">
      {/* Background glow when close to consensus */}
      {isConsensusReached && (
        <div className="absolute inset-0 bg-emerald-500/[0.06] rounded-3xl animate-pulse pointer-events-none" />
      )}

      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-600" />
          <span className="font-display text-xs uppercase tracking-wider font-extrabold text-slate-900">
            Mind Shift & Persuasion Radar
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isConsensusReached ? (
            <button
              onClick={onViewConsensus}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-slate-900 text-amber-300 font-bold hover:scale-105 transition-transform shadow-xs"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Consensus Unlocked! View Treaty</span>
            </button>
          ) : (
            <span className="text-xs text-slate-500 font-medium">
              Convergence: <strong className="font-mono text-emerald-700 font-bold text-sm">{convergencePercent}%</strong>
            </span>
          )}
        </div>
      </div>

      {/* Tug-of-War Barometer with ample vertical clearance */}
      <div className="relative pt-9 pb-3">
        {/* Dynamic Floating Needle Marker */}
        <div
          className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center transition-all duration-700 ease-out z-20 pointer-events-none"
          style={{ left: `${Math.max(8, Math.min(92, stanceScore))}%` }}
        >
          <span className="text-[0.68rem] font-bold text-slate-900 bg-white border border-slate-300 px-2.5 py-0.5 rounded-full shadow-xs whitespace-nowrap">
            {stanceScore < 45 ? `${debaterA.name} Leading` : stanceScore > 55 ? `${debaterB.name} Leading` : 'Common Ground!'}
          </span>
          <div className="w-0.5 h-3 bg-slate-800" />
          <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-slate-800" />
        </div>

        {/* Dual Color Track */}
        <div className="relative w-full h-3.5 rounded-full overflow-hidden flex border border-slate-200 bg-slate-100 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-700"
            style={{ width: `${stanceScore}%` }}
          />
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-700"
            style={{ width: `${100 - stanceScore}%` }}
          />
          {/* Subtle center notch on the bar */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white/90 rounded-full shadow-xs z-10" />
        </div>
      </div>

      {/* Clear 3-Column Stance Labels with No Truncation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-1 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
          <div className="flex flex-col">
            <span className="font-display text-amber-900 font-extrabold">{debaterA.name} (Side A)</span>
            <span className="text-xs text-slate-600 font-medium">{debaterA.stanceTitle}</span>
          </div>
        </div>

        <div className="flex justify-center shrink-0">
          <span className="text-center text-[0.7rem] text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/90 shadow-2xs whitespace-nowrap">
            50% Common Ground
          </span>
        </div>

        <div className="flex items-center sm:justify-end gap-2 text-left sm:text-right">
          <div className="flex flex-col">
            <span className="font-display text-blue-900 font-extrabold">{debaterB.name} (Side B)</span>
            <span className="text-xs text-slate-600 font-medium">{debaterB.stanceTitle}</span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
        </div>
      </div>

      {/* Latest Concession Ticker */}
      {concessions.length > 0 && (
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="truncate">
            <strong className="font-semibold text-slate-900">Mind Shift:</strong> {concessions[concessions.length - 1].text}
          </span>
        </div>
      )}
    </div>
  );
};
