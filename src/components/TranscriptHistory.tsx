import React from 'react';
import type { Message } from '../types';
import { MessageSquare, AlertOctagon, CheckCircle2 } from 'lucide-react';

interface TranscriptHistoryProps {
  messages: Message[];
}

export const TranscriptHistory: React.FC<TranscriptHistoryProps> = ({ messages }) => {
  if (messages.length === 0) {
    return (
      <div className="bg-white border border-slate-200/90 rounded-3xl p-8 text-center shadow-sm flex flex-col items-center justify-center gap-2">
        <MessageSquare className="w-5 h-5 text-slate-300" />
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          No live exchanges yet. Tap <strong className="text-slate-800">Activate Mic</strong>, submit a manual rebuttal, or hit <strong className="text-red-600">Cut In / Interrupt</strong> to ignite the argument.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-amber-600" />
          <span className="font-display text-xs uppercase tracking-wider font-extrabold text-slate-900">
            Argument Transcript & Collision Log ({messages.length} exchanges)
          </span>
        </div>
        <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80">
          Real-time record
        </span>
      </div>

      <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-4 rounded-2xl border flex flex-col gap-2 transition-all ${
              m.isInterruption
                ? 'bg-red-50/70 border-red-200 shadow-xs'
                : m.sentiment === 'concession'
                ? 'bg-emerald-50/70 border-emerald-200 shadow-xs'
                : 'bg-slate-50 border-slate-200/80'
            }`}
          >
            {/* Header: Debater Name, Language, and Badges */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-slate-900">{m.debaterName}</span>
                <span className="text-[0.65rem] uppercase px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 font-bold">
                  {m.speakerLanguage.toUpperCase()}
                </span>
                {m.isInterruption && (
                  <span className="flex items-center gap-1 text-[0.65rem] uppercase tracking-wider bg-red-600 text-white px-2.5 py-0.5 rounded-full font-bold shadow-xs">
                    <AlertOctagon className="w-3 h-3" />
                    Barged In
                  </span>
                )}
                {m.sentiment === 'concession' && (
                  <span className="flex items-center gap-1 text-[0.65rem] uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-0.5 rounded-full font-bold shadow-xs">
                    <CheckCircle2 className="w-3 h-3" />
                    Concession Made
                  </span>
                )}
              </div>

              <span className="font-mono text-xs text-slate-400">
                {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>

            {/* Cut-off snippet if interrupted */}
            {m.cutoffText && (
              <div className="text-xs text-red-600 italic line-through font-semibold bg-red-100/60 p-2 rounded-lg border border-red-200">
                "{m.cutoffText}..." [Interrupted]
              </div>
            )}

            {/* Original Utterance */}
            <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed">
              {m.originalText}
            </p>

            {/* Live Translation */}
            <div className="pt-2 border-t border-slate-200/70 flex items-start gap-1.5 text-xs text-blue-900 bg-blue-50/60 p-2.5 rounded-xl border border-blue-200/60">
              <span className="text-[0.68rem] uppercase tracking-wider text-blue-700 font-extrabold shrink-0">
                [{m.targetLanguage.toUpperCase()} Translated]:
              </span>
              <span className="text-slate-900 font-medium leading-relaxed">{m.translatedText}</span>
            </div>

            {/* Concession explanation */}
            {m.concessionNote && (
              <div className="text-xs text-emerald-900 bg-emerald-100/80 border border-emerald-200/80 px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5">
                <span>💡</span>
                <span>{m.concessionNote}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
