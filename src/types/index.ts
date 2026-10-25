export type LanguageCode = 
  | 'hi' // Hindi
  | 'en' // English
  | 'es' // Spanish
  | 'fr' // French
  | 'ja' // Japanese
  | 'de' // German
  | 'zh' // Mandarin
  | 'ta' // Tamil
  | 'ar'; // Arabic

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  speechCode: string;
  interjection: string; // e.g. "Suno!" or "Listen!" or "Attendez!"
}

export interface Debater {
  id: string;
  name: string;
  language: LanguageCode;
  avatar: string;
  color: string;
  role: 'pro' | 'con';
  stanceTitle: string;
  isAI?: boolean;
}

export interface Concession {
  id: string;
  debaterId: string;
  text: string;
  pointConceded: string;
  timestamp: number;
}

export interface Message {
  id: string;
  debaterId: string;
  debaterName: string;
  speakerLanguage: LanguageCode;
  originalText: string;
  translatedText: string;
  targetLanguage: LanguageCode;
  timestamp: number;
  isInterruption: boolean;
  interruptedMessageId?: string;
  cutoffText?: string;
  heatLevel: number; // 0 - 100
  sentiment: 'aggressive' | 'defensive' | 'concession' | 'neutral';
  concessionNote?: string;
}

export interface DebateTopic {
  id: string;
  title: string;
  category: string;
  proPosition: string;
  conPosition: string;
  proDebaterName: string;
  conDebaterName: string;
  proLanguage: LanguageCode;
  conLanguage: LanguageCode;
  openingPro: string;
  openingCon: string;
  keyDisputePoints: string[];
}

export type DebateMode = 'sparring' | 'split-duo' | 'spectator';

export type HeatStage = 'cool' | 'friction' | 'sparks' | 'boiling';
