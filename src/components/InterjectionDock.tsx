import React, { useEffect } from 'react';
import { Mic, MicOff, AlertOctagon, CornerDownRight, HandMetal, Sparkles } from 'lucide-react';
import type { LanguageCode } from '../types';

interface InterjectionDockProps {
  speakerName: string;
  speakerLang: LanguageCode;
  isListening: boolean;
  onToggleMic: () => void;
  onBargeIn: () => void;
  onSendInterjection: (text: string) => void;
  disabled?: boolean;
}

export const InterjectionDock: React.FC<InterjectionDockProps> = ({
  speakerName,
  speakerLang,
  isListening,
  onToggleMic,
  onBargeIn,
  onSendInterjection,
  disabled = false,
}) => {
  // Shortcut: Spacebar for quick barge in
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If typing in an input or textarea, don't trigger spacebar barge-in
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.code === 'Space' && !e.repeat && !disabled) {
        e.preventDefault();
        onBargeIn();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBargeIn, disabled]);

  // Contextual quick interjection phrases by language
  const getQuickCards = () => {
    switch (speakerLang) {
      case 'hi':
        return [
          { label: 'रुको सुनो!', text: 'रुको एक मिनट, मेरी बात सुनो!', type: 'interrupt' },
          { label: 'सरासर गलत!', text: 'ये बिल्कुल गलत बात है, इसका कोई प्रूफ नहीं है!', type: 'aggressive' },
          { label: 'डेटा देखो!', text: 'जमीनी हकीकत और असली डेटा देखो पहले!', type: 'aggressive' },
          { label: 'बात तो सही है पर...', text: 'चलो ये बात मान ली, लेकिन अगला पॉइंट क्या है?', type: 'concession' },
        ];
      case 'fr':
        return [
          { label: 'Attends !', text: "Attends une seconde, écoute ce que je dis !", type: 'interrupt' },
          { label: "C'est faux !", text: "C'est totalement faux et sans fondement !", type: 'aggressive' },
          { label: 'Regarde les faits !', text: 'Regarde les chiffres réels avant d’affirmer ça !', type: 'aggressive' },
          { label: 'Tu as raison mais...', text: "Tu as raison sur ce point, mais la suite compte !", type: 'concession' },
        ];
      case 'es':
        return [
          { label: '¡Espera!', text: '¡Espera un momento, déjame decir esto!', type: 'interrupt' },
          { label: '¡Eso es falso!', text: '¡Eso no es verdad en lo absoluto!', type: 'aggressive' },
          { label: '¡Mira los datos!', text: '¡Mira la evidencia antes de continuar!', type: 'aggressive' },
          { label: 'Buen punto pero...', text: 'Admito que tienes razón ahí, pero escúchame.', type: 'concession' },
        ];
      case 'ja':
        return [
          { label: 'ちょっと待って！', text: 'ちょっと待ってください、私の話を聞いて！', type: 'interrupt' },
          { label: 'それは違います！', text: 'それは事実と全く異なります！', type: 'aggressive' },
          { label: '一理あるが...', text: '確かに一理ありますが、その先が問題です。', type: 'concession' },
        ];
      default:
        return [
          { label: 'Hold on!', text: 'Hold on a second, hear me out right now!', type: 'interrupt' },
          { label: "That's not true!", text: "That is completely untrue and you know it!", type: 'aggressive' },
          { label: 'Look at the data!', text: 'Look at the verifiable data before making claims!', type: 'aggressive' },
          { label: 'Fair point, but...', text: 'Fair point on that aspect, but you missed the tradeoff.', type: 'concession' },
        ];
    }
  };

  const cards = getQuickCards();

  return (
    <div className="bg-[#0B0B0C] border border-[#FAFAF8]/15 rounded-2xl p-4 flex flex-col gap-3.5 shadow-xl">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.68rem] uppercase tracking-wider text-[#FAFAF8]/60 flex items-center gap-1.5">
          <HandMetal className="w-3.5 h-3.5 text-[#CCFF00]" />
          <span>Quick Barge-In Deck ({speakerName})</span>
        </span>
        <span className="font-mono text-[0.62rem] text-[#FAFAF8]/40 uppercase tracking-widest hidden sm:inline">
          [SPACE] to interrupt
        </span>
      </div>

      {/* Main Action Strip: Barge-In Button + Live Mic */}
      <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] gap-2.5">
        {/* Massive Barge-In / Interrupt Trigger */}
        <button
          onClick={onBargeIn}
          disabled={disabled}
          className="group relative flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#FF5C00] to-[#FFAA00] text-[#0B0B0C] py-3.5 px-5 rounded-xl font-mono text-xs uppercase tracking-wider font-extrabold shadow-lg hover:shadow-[0_0_20px_rgba(255,92,0,0.5)] active:scale-95 transition-all disabled:opacity-40"
        >
          <AlertOctagon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>CUT IN / INTERRUPT NOW!</span>
        </button>

        {/* Live Mic Voice Toggle */}
        <button
          onClick={onToggleMic}
          disabled={disabled}
          className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-mono text-xs uppercase tracking-wider font-bold border transition-all ${
            isListening
              ? 'bg-[#CCFF00] text-[#0B0B0C] border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.4)] animate-pulse'
              : 'bg-[#FAFAF8]/[0.05] text-[#FAFAF8] border-[#FAFAF8]/20 hover:border-[#CCFF00]/50 hover:text-[#CCFF00]'
          }`}
        >
          {isListening ? (
            <>
              <Mic className="w-4 h-4 text-black animate-spin" />
              <span>Listening... (Mute)</span>
            </>
          ) : (
            <>
              <MicOff className="w-4 h-4" />
              <span>Activate Mic</span>
            </>
          )}
        </button>
      </div>

      {/* Quick Tactical Interjection Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {cards.map((c, i) => (
          <button
            key={i}
            onClick={() => onSendInterjection(c.text)}
            disabled={disabled}
            className={`px-3 py-1.5 rounded-full font-mono text-[0.68rem] tracking-wider transition-all border flex items-center gap-1.5 active:scale-95 ${
              c.type === 'concession'
                ? 'bg-[#3B1B4E] border-[#CCFF00]/40 text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black'
                : 'bg-[#FAFAF8]/[0.04] border-[#FAFAF8]/15 text-[#FAFAF8]/80 hover:border-[#FF5C00] hover:text-[#FF5C00]'
            }`}
          >
            {c.type === 'concession' ? (
              <Sparkles className="w-3 h-3 text-[#CCFF00]" />
            ) : (
              <CornerDownRight className="w-3 h-3 text-current" />
            )}
            <span>{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
