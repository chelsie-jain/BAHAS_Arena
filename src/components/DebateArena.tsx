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
          <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider px-5 py-2.5 rounded-full shadow-[0_0_35px_rgba(239,68,68,0.7)] animate-bounce flex items-center gap-2">
            <span>⚡ BARGE-IN COLLISION DETECTED</span>
          </div>
        </div>
      )}

      {/* ===================== SIDE A: DEBATER 1 ===================== */}
      <div
        className={`flex flex-col gap-4 rounded-3xl p-5 sm:p-6 transition-all duration-300 border ${
          isSpeakingA
            ? 'bg-amber-50/50 border-amber-400 ring-2 ring-amber-400/40 shadow-md'
            : wasInterruptedA
            ? 'bg-red-50/70 border-red-400 ring-2 ring-red-400/40 shadow-md'
            : 'bg-white border-slate-200/90 shadow-sm'
        }`}
      >
        {/* Debater Profile & Language Selector */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {/* Avatar with speaking ring */}
            <div className="relative">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg border-2 transition-all ${
                  isSpeakingA
                    ? 'border-amber-500 bg-amber-500 text-white shadow-md scale-105'
                    : 'border-slate-200 bg-slate-100 text-slate-800'
                }`}
              >
                {debaterA.avatar}
              </div>
              {isSpeakingA && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white animate-ping" />
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display text-base font-extrabold text-slate-900">
                  {debaterA.name}
                </span>
                <span className="text-[0.65rem] uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-extrabold tracking-wide">
                  Side A
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
                {debaterA.stanceTitle}
              </span>
            </div>
          </div>

          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-amber-600" />
            <select
              value={debaterA.language}
              onChange={(e) => onUpdateDebaterLang(debaterA.id, e.target.value as LanguageCode)}
              disabled={isSpectatorMode}
              className="bg-transparent text-xs text-slate-800 focus:outline-none cursor-pointer uppercase font-semibold"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-white text-slate-900">
                  {lang.flag} {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Audio Visualizer */}
        <div>
          <SoundwaveCanvas
            isSpeaking={isSpeakingA}
            heatScore={heatScore}
            isInterrupted={wasInterruptedA}
            activeColor="#D97706"
          />
        </div>

        {/* Live Speaking Stream & Subtitle Window */}
        <div className="flex flex-col gap-3 bg-slate-50/90 rounded-2xl p-4 border border-slate-200/90">
          {wasInterruptedA && (
            <div className="flex items-center gap-2 text-xs font-bold text-red-700 bg-red-100 border border-red-300 px-3 py-1.5 rounded-xl animate-pulse">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>CUT OFF MID-SENTENCE BY OPPONENT!</span>
            </div>
          )}

          {/* Native Language Utterance */}
          <div className="flex flex-col gap-1">
            <span className="font-display text-[0.68rem] uppercase tracking-wider text-amber-800 font-bold">
              Original ({getLangObj(debaterA.language).name}):
            </span>
            <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed min-h-[2rem]">
              {currentMessageA ? (
                <span>{currentMessageA}</span>
              ) : (
                <span className="text-slate-400 italic text-xs font-normal">
                  {isSpeakingA ? 'Speaking live...' : 'Waiting for turn or interruption...'}
                </span>
              )}
            </p>
          </div>

          {/* Real-Time Live Translation for Opponent */}
          <div className="pt-2.5 border-t border-slate-200 flex flex-col gap-1.5">
            <span className="font-display text-[0.68rem] uppercase tracking-wider text-blue-800 font-bold flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Live Translation into {getLangObj(debaterB.language).name}:</span>
            </span>
            <div className="text-xs sm:text-sm font-medium text-slate-900 bg-blue-50/90 p-3 rounded-xl border border-blue-200/90 min-h-[3rem] flex items-center leading-relaxed">
              {translatedMessageA ? (
                translatedMessageA
              ) : (
                <span className="text-slate-400 italic font-normal">
                  Subtitles stream as words are spoken...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Manual Rebuttal Input Dock (grounded container with no edge-clipping) */}
        {!isSpectatorMode && (
          <div className="pt-1">
            <form onSubmit={handleSendA} className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-300 shadow-xs focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:border-amber-500 transition-all">
              <input
                type="text"
                value={inputTextA}
                onChange={(e) => setInputTextA(e.target.value)}
                placeholder={`Argue in ${getLangObj(debaterA.language).name}...`}
                className="flex-1 bg-transparent px-3 py-1.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputTextA.trim()}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl font-bold text-xs uppercase active:scale-95 disabled:opacity-40 transition-all shadow-xs shrink-0 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ===================== SIDE B: DEBATER 2 ===================== */}
      <div
        className={`flex flex-col gap-4 rounded-3xl p-5 sm:p-6 transition-all duration-300 border ${
          isSpeakingB
            ? 'bg-blue-50/50 border-blue-400 ring-2 ring-blue-400/40 shadow-md'
            : wasInterruptedB
            ? 'bg-red-50/70 border-red-400 ring-2 ring-red-400/40 shadow-md'
            : 'bg-white border-slate-200/90 shadow-sm'
        }`}
      >
        {/* Debater Profile & Language Selector */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {/* Avatar with speaking ring */}
            <div className="relative">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg border-2 transition-all ${
                  isSpeakingB
                    ? 'border-blue-600 bg-blue-600 text-white shadow-md scale-105'
                    : 'border-slate-200 bg-slate-100 text-slate-800'
                }`}
              >
                {debaterB.avatar}
              </div>
              {isSpeakingB && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white animate-ping" />
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display text-base font-extrabold text-slate-900">
                  {debaterB.name}
                </span>
                <span className="text-[0.65rem] uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300 font-extrabold tracking-wide">
                  Side B
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
                {debaterB.stanceTitle}
              </span>
            </div>
          </div>

          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <select
              value={debaterB.language}
              onChange={(e) => onUpdateDebaterLang(debaterB.id, e.target.value as LanguageCode)}
              disabled={isSpectatorMode}
              className="bg-transparent text-xs text-slate-800 focus:outline-none cursor-pointer uppercase font-semibold"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-white text-slate-900">
                  {lang.flag} {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Audio Visualizer */}
        <div>
          <SoundwaveCanvas
            isSpeaking={isSpeakingB}
            heatScore={heatScore}
            isInterrupted={wasInterruptedB}
            activeColor="#2563EB"
          />
        </div>

        {/* Live Speaking Stream & Subtitle Window */}
        <div className="flex flex-col gap-3 bg-slate-50/90 rounded-2xl p-4 border border-slate-200/90">
          {wasInterruptedB && (
            <div className="flex items-center gap-2 text-xs font-bold text-red-700 bg-red-100 border border-red-300 px-3 py-1.5 rounded-xl animate-pulse">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>CUT OFF MID-SENTENCE BY OPPONENT!</span>
            </div>
          )}

          {/* Native Language Utterance */}
          <div className="flex flex-col gap-1">
            <span className="font-display text-[0.68rem] uppercase tracking-wider text-blue-800 font-bold">
              Original ({getLangObj(debaterB.language).name}):
            </span>
            <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed min-h-[2rem]">
              {currentMessageB ? (
                <span>{currentMessageB}</span>
              ) : (
                <span className="text-slate-400 italic text-xs font-normal">
                  {isSpeakingB ? 'Speaking live...' : 'Waiting for turn or interruption...'}
                </span>
              )}
            </p>
          </div>

          {/* Real-Time Live Translation for Opponent */}
          <div className="pt-2.5 border-t border-slate-200 flex flex-col gap-1.5">
            <span className="font-display text-[0.68rem] uppercase tracking-wider text-amber-800 font-bold flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-amber-600" />
              <span>Live Translation into {getLangObj(debaterA.language).name}:</span>
            </span>
            <div className="text-xs sm:text-sm font-medium text-slate-900 bg-amber-50/90 p-3 rounded-xl border border-amber-200/90 min-h-[3rem] flex items-center leading-relaxed">
              {translatedMessageB ? (
                translatedMessageB
              ) : (
                <span className="text-slate-400 italic font-normal">
                  Subtitles stream as words are spoken...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Manual Rebuttal Input Dock (grounded container with no edge-clipping) */}
        {!isSpectatorMode && (
          <div className="pt-1">
            <form onSubmit={handleSendB} className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-300 shadow-xs focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-600 transition-all">
              <input
                type="text"
                value={inputTextB}
                onChange={(e) => setInputTextB(e.target.value)}
                placeholder={`Argue in ${getLangObj(debaterB.language).name}...`}
                className="flex-1 bg-transparent px-3 py-1.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputTextB.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-xs uppercase active:scale-95 disabled:opacity-40 transition-all shadow-xs shrink-0 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
