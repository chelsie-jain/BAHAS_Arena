import { useState, useEffect, useRef } from 'react';
import type {
  Debater,
  DebateMode,
  DebateTopic,
  HeatStage,
  LanguageCode,
  Message,
  Concession,
} from './types';
import { Header } from './components/Header';
import { HeatBarometer } from './components/HeatBarometer';
import { StanceBarometer } from './components/StanceBarometer';
import { DebateArena } from './components/DebateArena';
import { InterjectionDock } from './components/InterjectionDock';
import { TranscriptHistory } from './components/TranscriptHistory';
import { ConsensusModal } from './components/ConsensusModal';
import { ZeroReviewModal } from './components/ZeroReviewModal';
import { DEBATE_TOPICS, SPECTATOR_SCRIPTS, generateAIReply } from './utils/debateEngine';
import { translateText, analyzeSentimentAndConcession, SUPPORTED_LANGUAGES } from './utils/translator';
import { speechEngine } from './utils/speechEngine';
import { soundEngine } from './utils/audioEffects';
import { Play, RotateCcw, Bot, Square } from 'lucide-react';
import './App.css';

export function App() {
  // Mode & Audio
  const [mode, setMode] = useState<DebateMode>('sparring');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Topics
  const [topic, setTopic] = useState<DebateTopic>(DEBATE_TOPICS[0]);

  // Debaters
  const [debaterA, setDebaterA] = useState<Debater>({
    id: 'debater-a',
    name: 'Kabir',
    language: 'hi',
    avatar: '🇮🇳',
    color: '#D97706',
    role: 'con',
    stanceTitle: 'Empower Builders with AI Taste',
    isAI: false,
  });

  const [debaterB, setDebaterB] = useState<Debater>({
    id: 'debater-b',
    name: 'Jean-Luc',
    language: 'fr',
    avatar: '🇫🇷',
    color: '#2563EB',
    role: 'pro',
    stanceTitle: 'Automated Coders Replace Juniors',
    isAI: true,
  });

  // Argument Dynamics
  const [heatScore, setHeatScore] = useState<number>(20);
  const [stanceScore, setStanceScore] = useState<number>(25); // 0 = Full A, 50 = Common Ground, 100 = Full B
  const [interruptionsCount, setInterruptionsCount] = useState<number>(0);
  const [concessions, setConcessions] = useState<Concession[]>([]);

  // Speaking state
  const [activeSpeakerId, setActiveSpeakerId] = useState<string | null>(null);
  const [interruptedSpeakerId, setInterruptedSpeakerId] = useState<string | null>(null);
  const [currentMessageA, setCurrentMessageA] = useState<string>('');
  const [translatedMessageA, setTranslatedMessageA] = useState<string>('');
  const [currentMessageB, setCurrentMessageB] = useState<string>('');
  const [translatedMessageB, setTranslatedMessageB] = useState<string>('');

  // Transcripts
  const [messages, setMessages] = useState<Message[]>([]);

  // Mic state
  const [isListeningA, setIsListeningA] = useState<boolean>(false);
  const [isListeningB, setIsListeningB] = useState<boolean>(false);

  // Modals
  const [showConsensusModal, setShowConsensusModal] = useState<boolean>(false);
  const [showZeroModal, setShowZeroModal] = useState<boolean>(false);

  // Spectator & Sparring Simulation State
  const [isSpectating, setIsSpectating] = useState<boolean>(false);
  const spectatorStepRef = useRef<number>(0);
  const spectatorTimeoutRef = useRef<any>(null);
  const sparringTimeoutRef = useRef<any>(null);

  // Heat Stage derivation
  const getHeatStage = (heat: number): HeatStage => {
    if (heat >= 80) return 'boiling';
    if (heat >= 55) return 'sparks';
    if (heat >= 25) return 'friction';
    return 'cool';
  };

  const heatStage = getHeatStage(heatScore);

  // Stable UI: No screen shake, audio pulse only when heat crosses into boiling
  useEffect(() => {
    if (heatStage === 'boiling') {
      soundEngine.playTensionPulse();
    }
  }, [heatStage]);

  // Track if debate is actively in progress
  const isArguing = isSpectating || activeSpeakerId !== null || isListeningA || isListeningB;

  // Update Debater Language
  const handleUpdateDebaterLang = (debaterId: string, lang: LanguageCode) => {
    if (debaterId === debaterA.id) {
      setDebaterA((prev) => ({ ...prev, language: lang }));
    } else {
      setDebaterB((prev) => ({ ...prev, language: lang }));
    }
  };

  // Change Topic
  const handleSelectTopic = (newTopic: DebateTopic) => {
    setTopic(newTopic);
    setDebaterA((prev) => ({
      ...prev,
      name: newTopic.conDebaterName,
      language: newTopic.conLanguage,
      stanceTitle: newTopic.conPosition,
    }));
    setDebaterB((prev) => ({
      ...prev,
      name: newTopic.proDebaterName,
      language: newTopic.proLanguage,
      stanceTitle: newTopic.proPosition,
    }));
    resetDebateState();
  };

  const resetDebateState = () => {
    speechEngine.cutOffSpeech();
    speechEngine.stopListening();
    if (spectatorTimeoutRef.current) clearTimeout(spectatorTimeoutRef.current);
    if (sparringTimeoutRef.current) clearTimeout(sparringTimeoutRef.current);
    spectatorStepRef.current = 0;
    setIsSpectating(false);
    setActiveSpeakerId(null);
    setInterruptedSpeakerId(null);
    setCurrentMessageA('');
    setTranslatedMessageA('');
    setCurrentMessageB('');
    setTranslatedMessageB('');
    setHeatScore(20);
    setStanceScore(25);
    setInterruptionsCount(0);
    setConcessions([]);
    setMessages([]);
    setIsListeningA(false);
    setIsListeningB(false);
  };

  // Core Barge-In / Interruption Handler
  const handleBargeIn = (interrupterId: string) => {
    const interrupter = interrupterId === debaterA.id ? debaterA : debaterB;
    const victim = interrupterId === debaterA.id ? debaterB : debaterA;

    // Immediately cut off any playing audio
    speechEngine.cutOffSpeech();
    soundEngine.playBargeIn();

    // Mark visual collision
    setInterruptedSpeakerId(victim.id);
    setTimeout(() => setInterruptedSpeakerId(null), 1200);

    // Increase heat and barge-in count
    setInterruptionsCount((prev) => prev + 1);
    setHeatScore((prev) => Math.min(100, prev + 18));

    // Get interjection phrase in interrupter's language
    const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === interrupter.language);
    const interjectionText = langObj?.interjection || 'Wait, hold on!';

    handleSendUtterance(interrupter.id, interjectionText, true);
  };

  // Process & Send an Utterance (Typed, Spoken, or Auto)
  const handleSendUtterance = async (
    speakerId: string,
    rawText: string,
    isInterruption: boolean = false
  ) => {
    const isA = speakerId === debaterA.id;
    const speaker = isA ? debaterA : debaterB;
    const listener = isA ? debaterB : debaterA;

    setActiveSpeakerId(speaker.id);
    if (isA) {
      setCurrentMessageA(rawText);
    } else {
      setCurrentMessageB(rawText);
    }

    // 1. NLP Sentiment & Concession Detection
    const analysis = analyzeSentimentAndConcession(rawText, speaker.language);

    // Update heat
    setHeatScore((prev) => Math.min(100, Math.max(10, prev + analysis.heatDelta)));

    // Update stance score
    if (analysis.stanceShift !== 0) {
      setStanceScore((prev) => {
        // Shift toward 50 (Common ground)
        const target = 50;
        const diff = target - prev;
        const delta = Math.sign(diff) * Math.min(Math.abs(diff), analysis.stanceShift);
        const next = Math.max(0, Math.min(100, prev + delta));
        
        // If close to consensus, trigger modal
        if (Math.abs(next - 50) <= 12) {
          setTimeout(() => setShowConsensusModal(true), 1200);
        }
        return next;
      });
    }

    // Record concession if detected
    if (analysis.concessionDetected) {
      soundEngine.playConcessionChime();
      const newConcession: Concession = {
        id: `con-${Date.now()}`,
        debaterId: speaker.id,
        text: `${speaker.name} (${speaker.language.toUpperCase()}): "${rawText.slice(0, 60)}..."`,
        pointConceded: analysis.concessionNote || 'Yielded ground on argument',
        timestamp: Date.now(),
      };
      setConcessions((prev) => [...prev, newConcession]);
    }

    // 2. Real-Time Translation into Listener's Language
    const translated = await translateText(rawText, speaker.language, listener.language);

    if (isA) {
      setTranslatedMessageA(translated);
    } else {
      setTranslatedMessageB(translated);
    }

    // 3. Audio Synthesis in Speaker's Native Tongue
    speechEngine.speak(
      rawText,
      speaker.language,
      heatScore,
      () => {},
      () => {
        // Speech ended normally
        if (activeSpeakerId === speaker.id) {
          setActiveSpeakerId(null);
        }
      }
    );

    // 4. Append to Message History
    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random()}`,
      debaterId: speaker.id,
      debaterName: speaker.name,
      speakerLanguage: speaker.language,
      originalText: rawText,
      translatedText: translated,
      targetLanguage: listener.language,
      timestamp: Date.now(),
      isInterruption,
      heatLevel: heatScore,
      sentiment: analysis.sentiment,
      concessionNote: analysis.concessionNote,
    };

    setMessages((prev) => [...prev, newMessage]);

    // 5. In Solo Sparring Mode, generate AI Opponent Rebuttal
    if (mode === 'sparring' && isA && !isSpectating) {
      if (sparringTimeoutRef.current) clearTimeout(sparringTimeoutRef.current);
      sparringTimeoutRef.current = setTimeout(() => {
        const aiResponse = generateAIReply(
          rawText,
          debaterA.language,
          debaterB.language,
          heatScore,
          topic
        );
        handleSendUtterance(debaterB.id, aiResponse.text, aiResponse.isInterruption);
      }, 1600);
    }
  };

  // Toggle Live Microphone
  const handleToggleMic = (speakerId: string) => {
    const isA = speakerId === debaterA.id;
    const isListening = isA ? isListeningA : isListeningB;
    const speaker = isA ? debaterA : debaterB;

    if (isListening) {
      speechEngine.stopListening();
      if (isA) setIsListeningA(false);
      else setIsListeningB(false);
      soundEngine.playMicClick(false);
    } else {
      soundEngine.playMicClick(true);
      const ok = speechEngine.initRecognition(
        speaker.language,
        (interim) => {
          if (isA) setCurrentMessageA(interim);
          else setCurrentMessageB(interim);
        },
        (final) => {
          if (final.trim()) {
            handleSendUtterance(speaker.id, final.trim(), false);
          }
        },
        (err) => {
          console.warn('Speech err', err);
          if (isA) setIsListeningA(false);
          else setIsListeningB(false);
        }
      );

      if (ok) {
        speechEngine.startListening();
        if (isA) setIsListeningA(true);
        else setIsListeningB(true);
      } else {
        alert('Web Speech API is not supported in this browser or mic permission was not granted. You can still argue seamlessly using the text input or Quick Interjection cards!');
      }
    }
  };

  // Automated Spectator Arena Runner
  const runSpectatorStep = () => {
    const script = SPECTATOR_SCRIPTS[topic.id] || SPECTATOR_SCRIPTS['ai-coders'];
    const idx = spectatorStepRef.current;

    if (idx >= script.length) {
      setIsSpectating(false);
      spectatorStepRef.current = 0;
      setTimeout(() => setShowConsensusModal(true), 1200);
      return;
    }

    const step = script[idx];
    const speakerId = step.speaker === 'con' ? debaterA.id : debaterB.id;

    if (step.isInterruption) {
      handleBargeIn(speakerId);
    }

    handleSendUtterance(speakerId, step.text, step.isInterruption);
    spectatorStepRef.current = idx + 1;

    spectatorTimeoutRef.current = setTimeout(runSpectatorStep, step.delayMs);
  };

  const handleStartSpectator = () => {
    setIsSpectating(true);
    resetDebateState();
    spectatorStepRef.current = 0;
    setTimeout(runSpectatorStep, 600);
  };

  const handleResumeSpectator = () => {
    setIsSpectating(true);
    if (spectatorTimeoutRef.current) clearTimeout(spectatorTimeoutRef.current);
    spectatorTimeoutRef.current = setTimeout(runSpectatorStep, 400);
  };

  const handleRestartSpectator = () => {
    handleStartSpectator();
  };

  const handleStopSpectator = () => {
    setIsSpectating(false);
    if (spectatorTimeoutRef.current) clearTimeout(spectatorTimeoutRef.current);
    speechEngine.cutOffSpeech();
    setActiveSpeakerId(null);
    setInterruptedSpeakerId(null);
  };

  // Universal Stop Button across all modes (Solo Sparring, Split Duo, Spectator)
  const handleStopArgue = () => {
    // 1. Immediately cut off all synthesized and queued audio
    speechEngine.cutOffSpeech();

    // 2. Stop speech recognition microphones
    speechEngine.stopListening();
    setIsListeningA(false);
    setIsListeningB(false);

    // 3. Halt pending AI timeouts and spectator loops
    if (spectatorTimeoutRef.current) clearTimeout(spectatorTimeoutRef.current);
    if (sparringTimeoutRef.current) clearTimeout(sparringTimeoutRef.current);
    setIsSpectating(false);

    // 4. Clear active/collided speaker visual states
    setActiveSpeakerId(null);
    setInterruptedSpeakerId(null);
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header
        mode={mode}
        setMode={(m) => {
          setMode(m);
          if (m === 'spectator') handleStartSpectator();
          else handleStopSpectator();
        }}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        heatScore={heatScore}
        heatStage={heatStage}
        onOpenZeroModal={() => setShowZeroModal(true)}
        isArguing={isArguing}
        onStopArgue={handleStopArgue}
        onRestartArgue={mode === 'spectator' ? handleRestartSpectator : resetDebateState}
        canRestart={!isArguing && (spectatorStepRef.current > 0 || messages.length > 0)}
      />

      <main className="shell flex-1 py-6 sm:py-8 flex flex-col gap-6">
        {/* Topic Selector & Stance Subtitle */}
        <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col gap-4 shadow-sm relative">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-display text-xs uppercase tracking-wider text-slate-700 font-extrabold">
                Active Dispute Arena
              </span>
            </div>

            {/* Quick Topic Chooser */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-bold hidden sm:inline">
                Topic:
              </span>
              <select
                value={topic.id}
                onChange={(e) => {
                  const t = DEBATE_TOPICS.find((dt) => dt.id === e.target.value);
                  if (t) handleSelectTopic(t);
                }}
                className="bg-slate-50 text-slate-900 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer shadow-2xs max-w-full sm:max-w-md"
              >
                {DEBATE_TOPICS.map((t) => (
                  <option key={t.id} value={t.id} className="bg-white text-slate-900 font-medium">
                    {t.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <h1 className="font-display text-2xl sm:text-3.5xl font-black tracking-tight text-slate-900 leading-tight">
              {topic.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Two debaters, zero shared languages. Live speech barge-ins, tension escalation, and real-time persuasion.
            </p>
          </div>

          {/* Spectator Mode Play/Pause/Restart Bar */}
          {mode === 'spectator' && (
            <div className="mt-2 pt-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-display text-xs uppercase tracking-wider text-slate-900 font-bold">
                  {isSpectating
                    ? '▶ Live Clash In Progress...'
                    : spectatorStepRef.current > 0
                    ? `⏸ Live Clash Stopped (Step ${spectatorStepRef.current})`
                    : '⏸ Ready to Start Clash'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isSpectating ? (
                  <button
                    onClick={handleStopSpectator}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-all shadow-xs"
                    title="Stop the current live argument"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Stop Argue</span>
                  </button>
                ) : spectatorStepRef.current > 0 ? (
                  <>
                    <button
                      onClick={handleResumeSpectator}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs uppercase bg-emerald-600 text-white font-extrabold hover:bg-emerald-700 transition-all shadow-xs"
                      title="Resume argument where you left off"
                    >
                      <Play className="w-3.5 h-3.5 text-white" />
                      <span>Resume Argue</span>
                    </button>
                    <button
                      onClick={handleRestartSpectator}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs uppercase bg-slate-900 text-white font-extrabold hover:bg-slate-800 transition-all shadow-xs"
                      title="Restart argument from the beginning"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      <span>Restart From Beginning</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleStartSpectator}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs uppercase bg-slate-900 text-white font-extrabold hover:bg-slate-800 transition-all shadow-xs"
                    title="Start live simulation clash"
                  >
                    <Play className="w-3.5 h-3.5 text-amber-400" />
                    <span>Play AI Clash</span>
                  </button>
                )}
                <button
                  onClick={resetDebateState}
                  className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all border border-slate-200"
                  title="Reset debate state"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Dynamic Gauges: Heat & Mind-Shift Stance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HeatBarometer
            heatScore={heatScore}
            heatStage={heatStage}
            interruptionsCount={interruptionsCount}
          />
          <StanceBarometer
            debaterA={debaterA}
            debaterB={debaterB}
            stanceScore={stanceScore}
            concessions={concessions}
            onViewConsensus={() => setShowConsensusModal(true)}
          />
        </div>

        {/* Central Split Debate Arena */}
        <section>
          <DebateArena
            debaterA={debaterA}
            debaterB={debaterB}
            onUpdateDebaterLang={handleUpdateDebaterLang}
            activeSpeakerId={activeSpeakerId}
            interruptedSpeakerId={interruptedSpeakerId}
            currentMessageA={currentMessageA}
            translatedMessageA={translatedMessageA}
            currentMessageB={currentMessageB}
            translatedMessageB={translatedMessageB}
            heatScore={heatScore}
            onManualSubmit={(debaterId, text) => handleSendUtterance(debaterId, text, false)}
            isSpectatorMode={mode === 'spectator'}
          />
        </section>

        {/* Tactical Interjection & Mic Decks */}
        {mode !== 'spectator' && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InterjectionDock
              speakerName={debaterA.name}
              speakerLang={debaterA.language}
              isListening={isListeningA}
              onToggleMic={() => handleToggleMic(debaterA.id)}
              onBargeIn={() => handleBargeIn(debaterA.id)}
              onSendInterjection={(text) => handleSendUtterance(debaterA.id, text, true)}
              onStop={handleStopArgue}
              isSpeaking={activeSpeakerId === debaterA.id}
            />

            {mode === 'split-duo' ? (
              <InterjectionDock
                speakerName={debaterB.name}
                speakerLang={debaterB.language}
                isListening={isListeningB}
                onToggleMic={() => handleToggleMic(debaterB.id)}
                onBargeIn={() => handleBargeIn(debaterB.id)}
                onSendInterjection={(text) => handleSendUtterance(debaterB.id, text, true)}
                onStop={handleStopArgue}
                isSpeaking={activeSpeakerId === debaterB.id}
              />
            ) : (
              <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-sm">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs uppercase tracking-wider text-slate-800 font-extrabold flex items-center gap-1.5">
                      <Bot className="w-4 h-4 text-blue-600" />
                      <span>AI Sparring Partner: {debaterB.name}</span>
                    </span>
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200/90 px-2.5 py-0.5 rounded-full">
                      {debaterB.language.toUpperCase()} Voice
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-1">
                    Jean-Luc will aggressively challenge your premises in French, cut in when you pause, and concede ground when you present irrefutable evidence.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Auto-Rebuttals Active</span>
                  </span>
                  <span className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80 text-slate-700">
                    Native Synthesis
                  </span>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Full Chronological Transcript & Collision Log */}
        <section>
          <TranscriptHistory messages={messages} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 sm:px-8 text-center text-xs text-slate-600 font-medium">
        <div className="shell flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>BAHAS (बहस) • Real-Time Cross-Language Argument Arena</span>
          <button
            onClick={() => setShowZeroModal(true)}
            className="text-slate-900 hover:text-amber-600 hover:underline uppercase tracking-wider font-bold transition-colors"
          >
            Read Chelsie's Three Zero Product Reviews →
          </button>
        </div>
      </footer>

      {/* Modals */}
      <ConsensusModal
        isOpen={showConsensusModal}
        onClose={() => setShowConsensusModal(false)}
        debaterA={debaterA}
        debaterB={debaterB}
        topic={topic}
        concessions={concessions}
        onResetDebate={resetDebateState}
      />

      <ZeroReviewModal
        isOpen={showZeroModal}
        onClose={() => setShowZeroModal(false)}
      />
    </div>
  );
}

export default App;
