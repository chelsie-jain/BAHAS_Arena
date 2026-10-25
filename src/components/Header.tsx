import React from 'react';
import type { DebateMode, HeatStage } from '../types';
import { Volume2, VolumeX, Users, Swords, Eye, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audioEffects';

interface HeaderProps {
  mode: DebateMode;
  setMode: (mode: DebateMode) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  heatScore: number;
  heatStage: HeatStage;
  onOpenZeroModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  setMode,
  soundEnabled,
  setSoundEnabled,
  heatScore,
  heatStage,
  onOpenZeroModal,
}) => {
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEngine.enabled = next;
    if (next) soundEngine.playMicClick(true);
  };

  const getHeatBadgeColor = () => {
    switch (heatStage) {
      case 'boiling':
        return 'bg-[#FF5C00] text-black border-[#FF5C00] shadow-[0_0_15px_rgba(255,92,0,0.6)] animate-pulse';
      case 'sparks':
        return 'bg-[#FFAA00] text-black border-[#FFAA00]';
      case 'friction':
        return 'bg-[#CCFF00] text-black border-[#CCFF00]';
      default:
        return 'bg-[#3B1B4E] text-[#FAFAF8] border-[#FAFAF8]/20';
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#FAFAF8]/10 bg-[#0B0B0C]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
      {/* Brand & Zero badge */}
      <div className="flex items-center gap-3">
        <a href="/" className="flex items-center gap-2.5 text-decoration-none group">
          <div className="w-8 h-8 rounded-full bg-[#CCFF00] text-[#0B0B0C] flex items-center justify-center font-mono font-black text-sm tracking-tighter group-hover:scale-105 transition-transform">
            बहस
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-mono font-bold tracking-wider text-base text-[#FAFAF8] uppercase">
                BAHAS
              </span>
              <span className="font-mono text-[0.68rem] uppercase tracking-widest text-[#CCFF00] hidden sm:inline">
                Arena
              </span>
            </div>
            <span className="font-mono text-[0.62rem] uppercase tracking-wider text-[#FAFAF8]/50">
              Cross-Language Argument Engine
            </span>
          </div>
        </a>

        {/* Live Heat Indicator Badge */}
        <div className={`ml-2 px-2.5 py-1 rounded-full font-mono text-[0.65rem] uppercase tracking-wider border font-bold flex items-center gap-1.5 transition-all duration-300 ${getHeatBadgeColor()}`}>
          <span className="w-2 h-2 rounded-full bg-current"></span>
          <span>{heatScore}°C {heatStage.toUpperCase()}</span>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center bg-[#FAFAF8]/[0.06] p-1 rounded-full border border-[#FAFAF8]/10">
        <button
          onClick={() => setMode('sparring')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
            mode === 'sparring'
              ? 'bg-[#3B1B4E] text-[#CCFF00] font-semibold shadow-sm'
              : 'text-[#FAFAF8]/60 hover:text-[#FAFAF8]'
          }`}
          title="Argue against AI speaking a foreign language"
        >
          <Swords className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Solo Sparring</span>
          <span className="sm:hidden">Solo</span>
        </button>

        <button
          onClick={() => setMode('split-duo')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
            mode === 'split-duo'
              ? 'bg-[#3B1B4E] text-[#CCFF00] font-semibold shadow-sm'
              : 'text-[#FAFAF8]/60 hover:text-[#FAFAF8]'
          }`}
          title="Two humans face-to-face on one screen with dual mics"
        >
          <Users className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Split Duo</span>
          <span className="sm:hidden">Duo</span>
        </button>

        <button
          onClick={() => setMode('spectator')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
            mode === 'spectator'
              ? 'bg-[#3B1B4E] text-[#CCFF00] font-semibold shadow-sm'
              : 'text-[#FAFAF8]/60 hover:text-[#FAFAF8]'
          }`}
          title="Watch 2 AI agents heatedly argue, interrupt, and change minds"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Live Demo</span>
          <span className="sm:hidden">Demo</span>
        </button>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2.5">
        {/* Audio FX Toggle */}
        <button
          onClick={toggleSound}
          className={`p-2 rounded-full border transition-all ${
            soundEnabled
              ? 'border-[#CCFF00]/40 text-[#CCFF00] bg-[#CCFF00]/10 hover:bg-[#CCFF00]/20'
              : 'border-[#FAFAF8]/15 text-[#FAFAF8]/40 hover:text-[#FAFAF8]'
          }`}
          title={soundEnabled ? 'Mute audio FX' : 'Enable audio FX'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* ZERO Take-Home Review Button */}
        <button
          onClick={onOpenZeroModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider border border-[#CCFF00]/40 bg-[#CCFF00]/10 text-[#CCFF00] hover:bg-[#CCFF00] hover:text-[#0B0B0C] transition-all font-semibold"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>ZERO Build Submission</span>
        </button>
      </div>
    </header>
  );
};
