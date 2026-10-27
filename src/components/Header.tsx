import React from 'react';
import type { DebateMode, HeatStage } from '../types';
import { Volume2, VolumeX, Users, Swords, Eye, Sparkles, Square, RotateCcw } from 'lucide-react';
import { soundEngine } from '../utils/audioEffects';

interface HeaderProps {
  mode: DebateMode;
  setMode: (mode: DebateMode) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  heatScore: number;
  heatStage: HeatStage;
  onOpenZeroModal: () => void;
  isArguing: boolean;
  onStopArgue: () => void;
  onRestartArgue?: () => void;
  canRestart?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  setMode,
  soundEnabled,
  setSoundEnabled,
  heatScore,
  heatStage,
  onOpenZeroModal,
  isArguing,
  onStopArgue,
  onRestartArgue,
  canRestart = false,
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
        return 'bg-red-500 text-white border-red-500 shadow-sm animate-pulse';
      case 'sparks':
        return 'bg-amber-500 text-white border-amber-500';
      case 'friction':
        return 'bg-emerald-600 text-white border-emerald-600';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="shell py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Zero badge */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2.5 text-decoration-none group">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-base tracking-tight group-hover:scale-105 transition-transform shadow-xs shrink-0">
              बहस
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display font-extrabold tracking-tight text-xl text-slate-900">
                  BAHAS
                </span>
                <span className="text-[0.65rem] uppercase tracking-widest text-amber-600 font-extrabold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/80 hidden sm:inline">
                  Arena
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium tracking-tight">
                Cross-Language Argument Engine
              </span>
            </div>
          </a>

          {/* Live Heat Indicator Badge */}
          <div className={`ml-1 sm:ml-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border flex items-center gap-1.5 transition-all duration-300 shadow-2xs ${getHeatBadgeColor()}`}>
            <span className="w-2 h-2 rounded-full bg-current"></span>
            <span className="font-mono text-xs font-bold">{heatScore}°C</span>
            <span className="hidden sm:inline font-sans">{heatStage.toUpperCase()}</span>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200/80 shadow-2xs">
          <button
            onClick={() => setMode('sparring')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all font-semibold ${
              mode === 'sparring'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Argue against AI speaking a foreign language"
          >
            <Swords className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Solo Sparring</span>
            <span className="sm:hidden">Solo</span>
          </button>

          <button
            onClick={() => setMode('split-duo')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all font-semibold ${
              mode === 'split-duo'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Two humans face-to-face on one screen with dual mics"
          >
            <Users className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Split Duo</span>
            <span className="sm:hidden">Duo</span>
          </button>

          <button
            onClick={() => setMode('spectator')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all font-semibold ${
              mode === 'spectator'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Watch 2 AI agents heatedly argue, interrupt, and change minds"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Demo</span>
            <span className="sm:hidden">Demo</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Universal Stop Argue Button */}
          <button
            onClick={onStopArgue}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs border ${
              isArguing
                ? 'bg-red-600 hover:bg-red-700 text-white border-red-600 animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
            title="Immediately halt all speech, pause active AI responses, and stop the argument"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>Stop Argue</span>
          </button>

          {/* Restart Button (available in live mode when stopped or when restartable) */}
          {canRestart && onRestartArgue && (
            <button
              onClick={onRestartArgue}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600 transition-all shadow-xs"
              title="Restart argument from beginning"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart</span>
            </button>
          )}

          {/* Audio FX Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-full border transition-all ${
              soundEnabled
                ? 'border-slate-300 text-slate-800 bg-slate-100 hover:bg-slate-200'
                : 'border-slate-200 text-slate-400 hover:text-slate-600'
            }`}
            title={soundEnabled ? 'Mute audio FX' : 'Enable audio FX'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* ZERO Take-Home Review Button */}
          <button
            onClick={onOpenZeroModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border border-slate-900 bg-slate-900 text-amber-300 hover:bg-slate-800 hover:text-amber-200 transition-all shadow-xs shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">ZERO Build Submission</span>
            <span className="sm:hidden">Part 1</span>
          </button>
        </div>
      </div>
    </header>
  );
};
