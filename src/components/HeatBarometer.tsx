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
          icon: <Flame className="w-4 h-4 text-red-500 animate-bounce" />,
          color: '#DC2626',
        };
      case 'sparks':
        return {
          title: 'SPARKS FLYING',
          description: 'Frequent barge-ins. Pitch & speech rate accelerating.',
          icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
          color: '#D97706',
        };
      case 'friction':
        return {
          title: 'POINTED FRICTION',
          description: 'Debaters challenging premises. Cadence picking up.',
          icon: <Zap className="w-4 h-4 text-emerald-600" />,
          color: '#059669',
        };
      default:
        return {
          title: 'SIMMERING DEBATE',
          description: 'Calm exchange. Establishing initial dispute boundaries.',
          icon: <Shield className="w-4 h-4 text-slate-400" />,
          color: '#64748B',
        };
    }
  };

  const details = getStageDetails();

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {details.icon}
          <span className="font-display text-xs uppercase tracking-wider font-extrabold text-slate-900">
            Argument Heat: {details.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium">
            Barge-ins: <strong className="font-mono text-amber-700 font-bold text-sm">{interruptionsCount}</strong>
          </span>
          <span className="font-mono text-base font-black tracking-tight" style={{ color: details.color }}>
            {heatScore}°C
          </span>
        </div>
      </div>

      {/* Mercury Bar */}
      <div className="relative w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${Math.min(100, Math.max(4, heatScore))}%`,
            background:
              heatScore > 80
                ? 'linear-gradient(90deg, #F59E0B 0%, #EA580C 50%, #DC2626 100%)'
                : heatScore > 50
                ? 'linear-gradient(90deg, #10B981 0%, #F59E0B 60%, #EA580C 100%)'
                : 'linear-gradient(90deg, #60A5FA 0%, #10B981 100%)',
            boxShadow: heatScore > 75 ? `0 0 10px ${details.color}` : 'none',
          }}
        />

        {/* Milestone Tick Marks */}
        <div className="absolute inset-0 flex justify-between pointer-events-none px-1">
          <span className="w-0.5 h-full bg-slate-300" />
          <span className="w-0.5 h-full bg-slate-300" />
          <span className="w-0.5 h-full bg-slate-300" />
          <span className="w-0.5 h-full bg-slate-300" />
        </div>
      </div>

      <div className="flex items-center justify-between text-[0.68rem] text-slate-500 font-semibold tracking-wide uppercase pt-1">
        <span>0°C Cold Logic</span>
        <span>50°C Heated Rebuttals</span>
        <span>100°C Overlapping Clashes</span>
      </div>
    </div>
  );
};
