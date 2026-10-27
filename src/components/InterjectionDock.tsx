import React, { useEffect } from 'react';
import { Mic, MicOff, AlertOctagon, CornerDownRight, HandMetal, Sparkles, Square } from 'lucide-react';
import type { LanguageCode } from '../types';

interface InterjectionDockProps {
  speakerName: string;
  speakerLang: LanguageCode;
  isListening: boolean;
  onToggleMic: () => void;
  onBargeIn: () => void;
  onSendInterjection: (text: string) => void;
  disabled?: boolean;
  onStop?: () => void;
  isSpeaking?: boolean;
}

export const InterjectionDock: React.FC<InterjectionDockProps> = ({
  speakerName,
  speakerLang,
  isListening,
  onToggleMic,
  onBargeIn,
  onSendInterjection,
  disabled = false,
  onStop,
  isSpeaking = false,
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
    <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-display text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5 font-extrabold">
          <HandMetal className="w-4 h-4 text-amber-600" />
          <span>Quick Barge-In Deck ({speakerName})</span>
        </span>
        <span className="text-xs text-slate-500 font-semibold hidden sm:inline bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80">
          Press [SPACE] to interrupt
        </span>
      </div>

      {/* Main Action Strip: Barge-In Button + Live Mic + Stop Button */}
      <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_auto] gap-2.5">
        {/* Massive Barge-In / Interrupt Trigger */}
        <button
          onClick={onBargeIn}
          disabled={disabled}
          className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-3 px-4 rounded-2xl text-xs uppercase tracking-wider font-extrabold shadow-md hover:shadow-red-500/25 active:scale-95 transition-all disabled:opacity-40"
        >
          <AlertOctagon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>CUT IN / INTERRUPT!</span>
        </button>

        {/* Live Mic Voice Toggle */}
        <button
          onClick={onToggleMic}
          disabled={disabled}
          className={`flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl text-xs uppercase tracking-wider font-bold border transition-all ${
            isListening
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md animate-pulse'
              : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200 hover:border-slate-300'
          }`}
        >
          {isListening ? (
            <>
              <Mic className="w-4 h-4 text-white animate-spin" />
              <span>Mute Mic</span>
            </>
          ) : (
            <>
              <MicOff className="w-4 h-4 text-slate-600" />
              <span>Mic</span>
            </>
          )}
        </button>

        {/* Dedicated Stop Argue Button */}
        {onStop && (
          <button
            onClick={onStop}
            className={`flex items-center justify-center gap-1.5 py-3 px-3.5 rounded-2xl text-xs uppercase tracking-wider font-bold border transition-all ${
              isSpeaking || isListening
                ? 'bg-red-50 text-red-700 border-red-300 hover:bg-red-100 shadow-2xs animate-pulse'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
            title="Stop current speech, clear mic, and halt dispute"
          >
            <Square className="w-3.5 h-3.5 fill-current text-red-600" />
            <span className="hidden sm:inline">Stop</span>
          </button>
        )}
      </div>

      {/* Quick Tactical Interjection Pills with Full Hindi Clearance */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {cards.map((c, i) => (
          <button
            key={i}
            onClick={() => onSendInterjection(c.text)}
            disabled={disabled}
            className={`px-3.5 py-2.5 rounded-xl text-xs tracking-wide transition-all border flex items-center gap-1.5 active:scale-95 font-bold shadow-2xs leading-normal ${
              c.type === 'concession'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-400 hover:text-amber-800 hover:bg-amber-50'
            }`}
          >
            {c.type === 'concession' ? (
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            ) : (
              <CornerDownRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            )}
            <span>{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
