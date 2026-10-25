import React from 'react';
import type { Message } from '../types';
import { MessageSquare, AlertOctagon, CheckCircle2 } from 'lucide-react';

interface TranscriptHistoryProps {
  messages: Message[];
}

export const TranscriptHistory: React.FC<TranscriptHistoryProps> = ({ messages }) => {
  if (messages.length === 0) {
    return (
      <div className="bg-[#FAFAF8]/[0.02] border border-[#FAFAF8]/10 rounded-2xl p-6 text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-[#FAFAF8]/40">
          No exchanges yet. Tap the microphone or cut in to ignite the argument.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0C] border border-[#FAFAF8]/15 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#FAFAF8]/10">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#CCFF00]" />
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#FAFAF8]">
            Argument Transcript & Collision Log ({messages.length} exchanges)
          </span>
        </div>
        <span className="font-mono text-[0.62rem] text-[#FAFAF8]/40 uppercase tracking-widest">
          Real-time record
        </span>
      </div>

      <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-3.5 rounded-xl border flex flex-col gap-1.5 transition-all ${
              m.isInterruption
                ? 'bg-[#FF5C00]/[0.08] border-[#FF5C00]/40 shadow-sm'
                : m.sentiment === 'concession'
                ? 'bg-[#CCFF00]/[0.08] border-[#CCFF00]/40'
                : 'bg-[#FAFAF8]/[0.03] border-[#FAFAF8]/10'
            }`}
          >
            {/* Header: Debater Name, Language, and Badges */}
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#FAFAF8]">{m.debaterName}</span>
                <span className="text-[0.62rem] uppercase px-1.5 py-0.5 rounded bg-[#FAFAF8]/10 text-[#FAFAF8]/70">
                  {m.speakerLanguage.toUpperCase()}
                </span>
                {m.isInterruption && (
                  <span className="flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-wider bg-[#FF5C00] text-black px-2 py-0.5 rounded-full font-bold">
                    <AlertOctagon className="w-3 h-3" />
                    Barged In
                  </span>
                )}
                {m.sentiment === 'concession' && (
                  <span className="flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-wider bg-[#CCFF00] text-black px-2 py-0.5 rounded-full font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    Concession Made
                  </span>
                )}
              </div>

              <span className="text-[0.65rem] text-[#FAFAF8]/40">
                {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>

            {/* Cut-off snippet if interrupted */}
            {m.cutoffText && (
              <div className="text-[0.72rem] font-mono text-[#FF5C00]/90 italic line-through">
                {m.cutoffText}
              </div>
            )}

            {/* Original Utterance */}
            <p className="text-sm text-[#FAFAF8] font-medium leading-relaxed">
              {m.originalText}
            </p>

            {/* Live Translation */}
            <div className="pt-1.5 border-t border-[#FAFAF8]/10 flex items-start gap-1.5 text-xs font-mono text-[#CCFF00]">
              <span className="text-[0.62rem] uppercase tracking-wider text-[#CCFF00]/70 shrink-0">
                [{m.targetLanguage.toUpperCase()} Translated]:
              </span>
              <span>{m.translatedText}</span>
            </div>

            {/* Concession explanation */}
            {m.concessionNote && (
              <div className="mt-1 text-[0.68rem] font-mono text-[#CCFF00] bg-[#CCFF00]/10 px-2 py-1 rounded">
                💡 {m.concessionNote}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
