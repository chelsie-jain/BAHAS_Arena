import type { LanguageCode } from '../types';

export const LANGUAGE_SPEECH_MAP: Record<LanguageCode, string> = {
  hi: 'hi-IN',
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  ja: 'ja-JP',
  de: 'de-DE',
  zh: 'zh-CN',
  ta: 'ta-IN',
  ar: 'ar-SA',
};

class SpeechEngine {
  private synth: SpeechSynthesis | null = null;
  public currentUtterance: SpeechSynthesisUtterance | null = null;
  private recognition: any = null;
  public isListening: boolean = false;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  public getVoicesForLang(langCode: LanguageCode): SpeechSynthesisVoice[] {
    const locale = LANGUAGE_SPEECH_MAP[langCode];
    return this.voices.filter((v) => v.lang.startsWith(langCode) || v.lang.startsWith(locale));
  }

  // Speak with dynamic pitch & rate modulation driven by heat score
  public speak(
    text: string,
    langCode: LanguageCode,
    heatScore: number = 0,
    onStart?: () => void,
    onEnd?: () => void
  ) {
    if (!this.synth) {
      if (onStart) onStart();
      setTimeout(() => {
        if (onEnd) onEnd();
      }, Math.max(1200, text.length * 50));
      return;
    }

    // Cancel any previous speech immediately
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const speechCode = LANGUAGE_SPEECH_MAP[langCode] || 'en-US';
    utterance.lang = speechCode;

    // Pick best voice
    const matchedVoices = this.getVoicesForLang(langCode);
    if (matchedVoices.length > 0) {
      utterance.voice = matchedVoices[0];
    }

    // Dynamic agitation modulation:
    // Pacing accelerates from 1.0x to 1.32x as debate heats up
    // Pitch elevates by up to 20% to reflect emotional urgency
    const normalizedHeat = Math.min(100, Math.max(0, heatScore));
    utterance.rate = 1.0 + (normalizedHeat / 100) * 0.32;
    utterance.pitch = 1.0 + (normalizedHeat / 100) * 0.22;

    utterance.onstart = () => {
      this.currentUtterance = utterance;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  // Immediate barge-in / interrupt cut-off!
  public cutOffSpeech() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return this.synth ? this.synth.speaking : false;
  }

  // Web Speech API continuous recognition
  public initRecognition(
    langCode: LanguageCode,
    onInterim: (text: string) => void,
    onFinal: (text: string) => void,
    onError?: (err: any) => void
  ): boolean {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported in this browser.');
      return false;
    }

    try {
      if (this.recognition) {
        this.recognition.stop();
      }

      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = LANGUAGE_SPEECH_MAP[langCode];

      this.recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        if (interim) onInterim(interim);
        if (final) onFinal(final);
      };

      this.recognition.onerror = (event: any) => {
        console.warn('Recognition error:', event.error);
        if (onError) onError(event);
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      return true;
    } catch (err) {
      console.error('Failed to init SpeechRecognition:', err);
      return false;
    }
  }

  public startListening() {
    if (this.recognition && !this.isListening) {
      try {
        this.recognition.start();
        this.isListening = true;
      } catch (e) {
        console.warn('SpeechRecognition start failed:', e);
      }
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.isListening = false;
    }
  }
}

export const speechEngine = new SpeechEngine();
