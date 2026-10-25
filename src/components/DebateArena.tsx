import React, { useState } from 'react';
import type { Debater, LanguageCode, Message } from '../types';
import { SUPPORTED_LANGUAGES } from '../utils/translator';
import { SoundwaveCanvas } from './SoundwaveCanvas';
import { Send, Globe, AlertTriangle, Volume2 } from 'lucide-react';

interface DebateArenaProps {
  debaterA: Debater;
  debaterB: Debater;
  onUpdateDebaterLang: (debaterId: string, lang: LanguageCode) => void;
  activeSpeakerId: string | null;
  interruptedSpeakerId: string | null;
  currentMessageA: string;
  translatedMessageA: string;
  currentMessageB: string;
  translatedMessageB: string;
  heatScore: number;
  recentMessages?: Message[];
  onManualSubmit: (debaterId: string, text: string) => void;
  isSpectatorMode?: boolean;
}

export const DebateArena: React.FC<DebateArenaProps> = ({
  debaterA,
  debaterB,
  onUpdateDebaterLang,
  activeSpeakerId,
  interruptedSpeakerId,
  currentMessageA,
  translatedMessageA,
  currentMessageB,
  translatedMessageB,
  heatScore,
  onManualSubmit,
  isSpectatorMode = false,
}) => {
  const [inputTextA, setInputTextA] = useState('');
  const [inputTextB, setInputTextB] = useState('');

  const handleSendA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTextA.trim()) return;
    onManualSubmit(debaterA.id, inputTextA.trim());
    setInputTextA('');
  };

  const handleSendB = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTextB.trim()) return;
    onManualSubmit(debaterB.id, inputTextB.trim());
    setInputTextB('');
  };

  const getLangObj = (code: LanguageCode) => {
    return SUPPORTED_LANGUAGES.find((l) => l.code === code) || SUPPORTED_LANGUAGES[0];
  };

  const isSpeakingA = activeSpeakerId === debaterA.id;
  const isSpeakingB = activeSpeakerId === debaterB.id;
  const wasInterruptedA = interruptedSpeakerId === debaterA.id;
  const wasInterruptedB = interruptedSpeakerId === debaterB.id;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 relative">
      {/* Collision Flash Overlay when an Interruption occurs */}
      {(wasInterruptedA || wasInterruptedB) && (
        <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
          <div className="bg-[#FF5C00] text-black font-mono font-black text-xs sm:text-sm uppercase tracking-widest px-4 py-2 rounded-full shadow-[0_0_30px_rgba(255,92,0,0.8)] animate-ping">
            ⚡ BARGE-IN COLLISION DETECTED
          </div>
        </div>
      )}

      {/* ===================== SIDE A: DEBATER 1 ===================== */}
      <div
        className={`flex flex-col justify-between rounded-3xl p-5 sm:p-6 transition-all duration-300 border relative overflow-hidden ${
          isSpeakingA
            ? 'bg-[#3B1B4E]/25 border-[#FFAA00] shadow-[0_0_25px_rgba(255,170,0,0.25)]'
            : wasInterruptedA
            ? 'bg-[#FF5C00]/10 border-[#FF5C00] shadow-[0_0_20px_rgba(255,92,0,0.3)]'
            : 'bg-[#FAFAF8]/[0.03] border-[#FAFAF8]/10'
        }`}
      >
        {/* Debater Profile & Language Selector */}
        <div className="flex items-center justify-between pb-4 border-b border-[#FAFAF8]/10">
          <div className="flex items-center gap-3">
            {/* Avatar with speaking ring */}
            <div className="relative">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-black text-lg border-2 transition-all ${
                  isSpeakingA
                    ? 'border-[#FFAA00] bg-[#FFAA00] text-black shadow-lg scale-105'
                    : 'border-[#FAFAF8]/20 bg-[#0B0B0C] text-[#FAFAF8]'
                }`}
              >
                {debaterA.avatar}
              </div>
              {isSpeakingA && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#FFAA00] border-2 border-[#0B0B0C] animate-ping" />
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-[#FAFAF8]">
                  {debaterA.name}
                </span>
                <span className="font-mono text-[0.62rem] uppercase px-2 py-0.5 rounded-full bg-[#FFAA00]/20 text-[#FFAA00] border border-[#FFAA00]/40 font-bold">
                  Side A
                </span>
              </div>
              <span className="font-mono text-[0.68rem] text-[#FAFAF8]/50 truncate max-w-[200px]">
                {debaterA.stanceTitle}
              </span>
            </div>
          </div>

          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#0B0B0C] px-2.5 py-1.5 rounded-xl border border-[#FAFAF8]/15">
            <Globe className="w-3.5 h-3.5 text-[#FFAA00]" />
            <select
              value={debaterA.language}
              onChange={(e) => onUpdateDebaterLang(debaterA.id, e.target.value as LanguageCode)}
              disabled={isSpectatorMode}
              className="bg-transparent font-mono text-xs text-[#FAFAF8] focus:outline-none cursor-pointer uppercase"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-[#0B0B0C] text-[#FAFAF8]">
                  {lang.flag} {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Audio Visualizer */}
        <div className="my-3">
          <SoundwaveCanvas
            isSpeaking={isSpeakingA}
            heatScore={heatScore}
            isInterrupted={wasInterruptedA}
            activeColor="#FFAA00"
          />
        </div>

        {/* Live Speaking Stream & Subtitle Window */}
        <div className="min-h-[160px] flex flex-col justify-end gap-3 my-2 bg-[#0B0B0C]/80 rounded-2xl p-4 border border-[#FAFAF8]/10">
          {wasInterruptedA && (
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF5C00] bg-[#FF5C00]/10 border border-[#FF5C00]/30 px-3 py-1.5 rounded-xl animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>CUT OFF MID-SENTENCE BY OPPONENT!</span>
            </div>
          )}

          {/* Native Language Utterance */}
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[0.62rem] uppercase tracking-wider text-[#FFAA00]">
              Original ({getLangObj(debaterA.language).name}):
            </span>
            <p className="text-sm sm:text-base font-medium text-[#FAFAF8] leading-relaxed">
              {currentMessageA ? (
                <span>{currentMessageA}</span>
              ) : (
                <span className="text-[#FAFAF8]/30 italic font-mono text-xs">
                  {isSpeakingA ? 'Speaking live...' : 'Waiting for turn or interruption...'}
                </span>
              )}
            </p>
          </div>

          {/* Real-Time Live Translation for Opponent */}
          <div className="pt-2 border-t border-[#FAFAF8]/10 flex flex-col gap-1">
            <span className="font-mono text-[0.62rem] uppercase tracking-wider text-[#CCFF00] flex items-center gap-1.5">
              <Volume2 className="w-3 h-3" />
              <span>Live Translation into {getLangObj(debaterB.language).name}:</span>
            </span>
            <p className="text-xs sm:text-sm font-mono text-[#CCFF00] bg-[#CCFF00]/10 p-2.5 rounded-xl border border-[#CCFF00]/25">
              {translatedMessageA ? (
                translatedMessageA
              ) : (
                <span className="text-[#CCFF00]/40 italic">
                  Subtitles stream as words are spoken...
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Manual Rebuttal Input (for non-mic typing) */}
        {!isSpectatorMode && (
          <form onSubmit={handleSendA} className="mt-3 flex items-center gap-2">
            <input
              type="text"
              value={inputTextA}
              onChange={(e) => setInputTextA(e.target.value)}
              placeholder={`Argue in ${getLangObj(debaterA.language).name}...`}
              className="flex-1 bg-[#0B0B0C] border border-[#FAFAF8]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#FAFAF8] placeholder-[#FAFAF8]/30 font-mono focus:outline-none focus:border-[#FFAA00]"
            />
            <button
              type="submit"
              disabled={!inputTextA.trim()}
              className="bg-[#FFAA00] text-black px-3.5 py-2.5 rounded-xl font-mono text-xs uppercase font-bold hover:scale-105 active:scale-95 disabled:opacity-30 transition-transform"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>

      {/* ===================== SIDE B: DEBATER 2 ===================== */}
      <div
        className={`flex flex-col justify-between rounded-3xl p-5 sm:p-6 transition-all duration-300 border relative overflow-hidden ${
          isSpeakingB
            ? 'bg-[#3B1B4E]/25 border-[#CCFF00] shadow-[0_0_25px_rgba(204,255,0,0.25)]'
            : wasInterruptedB
            ? 'bg-[#FF5C00]/10 border-[#FF5C00] shadow-[0_0_20px_rgba(255,92,0,0.3)]'
            : 'bg-[#FAFAF8]/[0.03] border-[#FAFAF8]/10'
        }`}
      >
        {/* Debater Profile & Language Selector */}
        <div className="flex items-center justify-between pb-4 border-b border-[#FAFAF8]/10">
          <div className="flex items-center gap-3">
            {/* Avatar with speaking ring */}
            <div className="relative">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-black text-lg border-2 transition-all ${
                  isSpeakingB
                    ? 'border-[#CCFF00] bg-[#CCFF00] text-black shadow-lg scale-105'
                    : 'border-[#FAFAF8]/20 bg-[#0B0B0C] text-[#FAFAF8]'
                }`}
              >
                {debaterB.avatar}
              </div>
              {isSpeakingB && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#CCFF00] border-2 border-[#0B0B0C] animate-ping" />
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-[#FAFAF8]">
                  {debaterB.name}
                </span>
                <span className="font-mono text-[0.62rem] uppercase px-2 py-0.5 rounded-full bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/40 font-bold">
                  Side B
                </span>
              </div>
              <span className="font-mono text-[0.68rem] text-[#FAFAF8]/50 truncate max-w-[200px]">
                {debaterB.stanceTitle}
              </span>
            </div>
          </div>

          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#0B0B0C] px-2.5 py-1.5 rounded-xl border border-[#FAFAF8]/15">
            <Globe className="w-3.5 h-3.5 text-[#CCFF00]" />
            <select
              value={debaterB.language}
              onChange={(e) => onUpdateDebaterLang(debaterB.id, e.target.value as LanguageCode)}
              disabled={isSpectatorMode}
              className="bg-transparent font-mono text-xs text-[#FAFAF8] focus:outline-none cursor-pointer uppercase"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-[#0B0B0C] text-[#FAFAF8]">
                  {lang.flag} {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Audio Visualizer */}
        <div className="my-3">
          <SoundwaveCanvas
            isSpeaking={isSpeakingB}
            heatScore={heatScore}
            isInterrupted={wasInterruptedB}
            activeColor="#CCFF00"
          />
        </div>

        {/* Live Speaking Stream & Subtitle Window */}
        <div className="min-h-[160px] flex flex-col justify-end gap-3 my-2 bg-[#0B0B0C]/80 rounded-2xl p-4 border border-[#FAFAF8]/10">
          {wasInterruptedB && (
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF5C00] bg-[#FF5C00]/10 border border-[#FF5C00]/30 px-3 py-1.5 rounded-xl animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>CUT OFF MID-SENTENCE BY OPPONENT!</span>
            </div>
          )}

          {/* Native Language Utterance */}
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[0.62rem] uppercase tracking-wider text-[#CCFF00]">
              Original ({getLangObj(debaterB.language).name}):
            </span>
            <p className="text-sm sm:text-base font-medium text-[#FAFAF8] leading-relaxed">
              {currentMessageB ? (
                <span>{currentMessageB}</span>
              ) : (
                <span className="text-[#FAFAF8]/30 italic font-mono text-xs">
                  {isSpeakingB ? 'Speaking live...' : 'Waiting for turn or interruption...'}
                </span>
              )}
            </p>
          </div>

          {/* Real-Time Live Translation for Opponent */}
          <div className="pt-2 border-t border-[#FAFAF8]/10 flex flex-col gap-1">
            <span className="font-mono text-[0.62rem] uppercase tracking-wider text-[#FFAA00] flex items-center gap-1.5">
              <Volume2 className="w-3 h-3" />
              <span>Live Translation into {getLangObj(debaterA.language).name}:</span>
            </span>
            <p className="text-xs sm:text-sm font-mono text-[#FFAA00] bg-[#FFAA00]/10 p-2.5 rounded-xl border border-[#FFAA00]/25">
              {translatedMessageB ? (
                translatedMessageB
              ) : (
                <span className="text-[#FFAA00]/40 italic">
                  Subtitles stream as words are spoken...
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Manual Rebuttal Input */}
        {!isSpectatorMode && (
          <form onSubmit={handleSendB} className="mt-3 flex items-center gap-2">
            <input
              type="text"
              value={inputTextB}
              onChange={(e) => setInputTextB(e.target.value)}
              placeholder={`Argue in ${getLangObj(debaterB.language).name}...`}
              className="flex-1 bg-[#0B0B0C] border border-[#FAFAF8]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#FAFAF8] placeholder-[#FAFAF8]/30 font-mono focus:outline-none focus:border-[#CCFF00]"
            />
            <button
              type="submit"
              disabled={!inputTextB.trim()}
              className="bg-[#CCFF00] text-black px-3.5 py-2.5 rounded-xl font-mono text-xs uppercase font-bold hover:scale-105 active:scale-95 disabled:opacity-30 transition-transform"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
