import React from 'react';
import { Flame, Zap, Shield, AlertTriangle } from 'lucide-react';
import type { HeatStage } from '../types';

interface HeatBarometerProps {
  heatScore: number;
  heatStage: HeatStage;
  interruptionsCount: number;
}

export const HeatBarometer: React.FC<HeatBarometerProps> = ({
  heatScore,
  heatStage,
  interruptionsCount,
}) => {
  const getStageDetails = () => {
    switch (heatStage) {
      case 'boiling':
        return {
          title: 'BOILING POINT',
          description: 'Max friction. Voices accelerated, screen tremor, rapid cross-talk.',
          icon: <Flame className="w-4 h-4 text-[#FF5C00] animate-bounce" />,
          color: '#FF5C00',
        };
      case 'sparks':
        return {
          title: 'SPARKS FLYING',
          description: 'Frequent barge-ins. Pitch & speech rate accelerating.',
          icon: <AlertTriangle className="w-4 h-4 text-[#FFAA00]" />,
          color: '#FFAA00',
        };
      case 'friction':
        return {
          title: 'POINTED FRICTION',
          description: 'Debaters challenging premises. Cadence picking up.',
          icon: <Zap className="w-4 h-4 text-[#CCFF00]" />,
          color: '#CCFF00',
        };
      default:
        return {
          title: 'SIMMERING DEBATE',
          description: 'Calm exchange. Establishing initial dispute boundaries.',
          icon: <Shield className="w-4 h-4 text-[#FAFAF8]/60" />,
          color: '#FAFAF8',
        };
    }
  };

  const details = getStageDetails();

  return (
    <div className="bg-[#FAFAF8]/[0.03] border border-[#FAFAF8]/10 rounded-2xl p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {details.icon}
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#FAFAF8]">
            Argument Heat: {details.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.68rem] uppercase tracking-wider text-[#FAFAF8]/60">
            Barge-ins: <strong className="text-[#CCFF00] font-bold">{interruptionsCount}</strong>
          </span>
          <span className="font-mono text-sm font-black" style={{ color: details.color }}>
            {heatScore}°C
          </span>
        </div>
      </div>

      {/* Mercury Bar */}
      <div className="relative w-full h-3 bg-[#0B0B0C] rounded-full overflow-hidden border border-[#FAFAF8]/15">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${Math.min(100, Math.max(4, heatScore))}%`,
            background:
              heatScore > 80
                ? 'linear-gradient(90deg, #CCFF00 0%, #FFAA00 50%, #FF5C00 100%)'
                : heatScore > 50
                ? 'linear-gradient(90deg, #3B1B4E 0%, #CCFF00 60%, #FFAA00 100%)'
                : 'linear-gradient(90deg, #3B1B4E 0%, #CCFF00 100%)',
            boxShadow: heatScore > 75 ? `0 0 12px ${details.color}` : 'none',
          }}
        />

        {/* Milestone Tick Marks */}
        <div className="absolute inset-0 flex justify-between pointer-events-none px-1">
          <span className="w-0.5 h-full bg-[#FAFAF8]/20" />
          <span className="w-0.5 h-full bg-[#FAFAF8]/20" />
          <span className="w-0.5 h-full bg-[#FAFAF8]/20" />
          <span className="w-0.5 h-full bg-[#FAFAF8]/20" />
        </div>
      </div>

      <div className="flex items-center justify-between text-[0.65rem] font-mono text-[#FAFAF8]/50 uppercase">
        <span>0°C Cold Logic</span>
        <span>50°C Heated Rebuttals</span>
        <span>100°C Overlapping Clashes</span>
      </div>
    </div>
  );
};
