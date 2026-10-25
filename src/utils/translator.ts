import type { Language, LanguageCode } from '../types';

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', speechCode: 'hi-IN', interjection: 'रुको, सुनो!' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', speechCode: 'en-US', interjection: 'Hold on, listen!' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', speechCode: 'es-ES', interjection: '¡Espera un momento!' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', speechCode: 'fr-FR', interjection: 'Attends, écoute !' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', speechCode: 'ja-JP', interjection: 'ちょっと待って！' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', speechCode: 'de-DE', interjection: 'Warte mal kurz!' },
  { code: 'zh', name: 'Mandarin', nativeName: '中文', flag: '🇨🇳', speechCode: 'zh-CN', interjection: '等等，听我说！' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', speechCode: 'ta-IN', interjection: 'பொறு, கேளுங்கள்!' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', speechCode: 'ar-SA', interjection: 'لحظة، اسمعني!' },
];

// Concession markers across languages (triggering mind shifts)
const CONCESSION_MARKERS: Record<LanguageCode, string[]> = {
  en: ['fair point', 'i admit', 'you make a good point', "you're right about", 'i see what you mean', 'i agree that', 'okay fine', 'granted that', 'i had not considered', 'valid point'],
  hi: ['theek hai par', 'maan liya', 'ye point sahi hai', 'sahi keh rahe ho', 'baat toh sahi hai', 'chalo maan leta hoon', 'samajh gaya', 'is baat me dum hai', 'maine ye nahi socha tha'],
  es: ['buen punto', 'tienes razón en', 'admito que', 'veo lo que dices', 'estoy de acuerdo en', 'es verdad que', 'punto válido', 'no había pensado en eso'],
  fr: ['tu as raison', 'bon point', "j'admets que", 'je vois ce que tu veux dire', 'c’est vrai que', 'point valide', 'je concède', 'je n’avais pas pensé à ça'],
  ja: ['一理ある', '確かに', 'その点は認める', 'おっしゃる通り', 'それは分かった', '考え直してみる', '納得した'],
  de: ['guter punkt', 'du hast recht', 'ich gebe zu', 'ich verstehe was du meinst', 'das stimmt', 'das habe ich nicht bedacht', 'fairer einwand'],
  zh: ['有道理', '我承认', '你说得对', '我明白你的意思', '这点确实', '我没考虑过这个', '这点我同意'],
  ta: ['சரிதான்', 'நீ சொல்வது சரி', 'ஒப்புக்கொள்கிறேன்', 'நல்ல கருத்து', 'அதை நான் யோசிக்கவில்லை'],
  ar: ['نقطة جيدة', 'أعترف أن', 'معك حق في', 'أفهم ما تقصده', 'هذا صحيح', 'لم أفكر في ذلك'],
};

// Aggression / Heated markers (triggering temperature spikes)
const AGGRESSION_MARKERS: Record<LanguageCode, string[]> = {
  en: ['ridiculous', 'nonsense', 'completely wrong', 'absurd', 'impossible', 'never', 'no way', 'are you serious', 'total lie', 'stupid', 'delusional'],
  hi: ['bakwaas', 'galat', 'kuch bhi', 'bilkul galat', 'pagal', 'hosh me ho', 'jhoot', 'koi matlab nahi', 'kabhi nahi', 'bewakoofi', 'andha'],
  es: ['ridículo', 'tonterías', 'completamente falso', 'absurdo', 'imposible', 'jamás', 'estás loco', 'mentira', 'sin sentido'],
  fr: ['ridicule', "n'importe quoi", 'totalement faux', 'absurde', 'impossible', 'jamais', 'tu plaisantes', 'mensonge', 'délire'],
  ja: ['ありえない', 'デタラメ', '完全に間違っている', 'バカげている', '嘘だ', 'ふざけるな'],
  de: ['lächerlich', 'quatsch', 'völlig falsch', 'absurd', 'unmöglich', 'niemals', 'bist du verrückt', 'unsinn'],
  zh: ['荒谬', '胡说', '完全错误', '荒唐', '不可能', '绝不', '瞎说', '胡扯'],
  ta: ['முட்டாள்தனம்', 'தவறு', 'பொய்', 'சாத்தியமில்லை', 'எப்பொழுதும் இல்லை'],
  ar: ['سخيف', 'كلام فارغ', 'خاطئ تماما', 'مستحيل', 'أبدا', 'جنون', 'غير منطقي'],
};

// Common debate phrase translations for instant fallback
const PHRASE_DICTIONARY: Record<string, Record<LanguageCode, string>> = {
  "wait, that's not true!": {
    en: "Wait, that's not true!",
    hi: "रुको, ये बिल्कुल सच नहीं है!",
    es: "¡Espera, eso no es verdad!",
    fr: "Attends, ce n'est pas vrai !",
    ja: "待って、それは事実ではありません！",
    de: "Warte, das ist nicht wahr!",
    zh: "等等，那不是真的！",
    ta: "பொறுங்கள், அது உண்மையல்ல!",
    ar: "لحظة، هذا ليس صحيحاً!"
  },
  "look at the actual data!": {
    en: "Look at the actual data!",
    hi: "असली डेटा और आंकड़े देखो पहले!",
    es: "¡Mira los datos reales!",
    fr: "Regarde les vraies données !",
    ja: "実際のデータを見てください！",
    de: "Schau dir die tatsächlichen Daten an!",
    zh: "看看实际的数据！",
    ta: "உண்மையான தரவுகளைப் பாருங்கள்!",
    ar: "انظر إلى البيانات الفعلية!"
  },
  "you are missing the entire point!": {
    en: "You are missing the entire point!",
    hi: "तुम असल मुद्दे को पूरी तरह भूल रहे हो!",
    es: "¡Te estás perdiendo todo el punto!",
    fr: "Tu passes complètement à côté du sujet !",
    ja: "あなたは論点を完全に外しています！",
    de: "Du verfehlst das eigentliche Thema völlig!",
    zh: "你完全抓不住重点！",
    ta: "நீ முக்கிய விஷயத்தை தவறவிடுகிறாய்!",
    ar: "أنت تفوت النقطة الأساسية تماماً!"
  },
  "fair point, i see what you mean.": {
    en: "Fair point, I see what you mean.",
    hi: "सही बात है, मैं समझ रहा हूँ तुम क्या कह रहे हो।",
    es: "Buen punto, veo lo que quieres decir.",
    fr: "C'est un bon point, je vois ce que tu veux dire.",
    ja: "一理ありますね、おっしゃる意味が分かりました。",
    de: "Guter Punkt, ich verstehe, was du meinst.",
    zh: "有道理，我明白你的意思了。",
    ta: "நல்ல கருத்து, நீ சொல்வது புரிகிறது.",
    ar: "نقطة جيدة، أفهم ما تقصده."
  },
  "let me finish before you interrupt!": {
    en: "Let me finish before you interrupt!",
    hi: "बीच में टोकने से पहले मेरी बात पूरी होने दो!",
    es: "¡Déjame terminar antes de interrumpir!",
    fr: "Laisse-moi finir avant d'interrompre !",
    ja: "割り込む前に最後まで言わせてください！",
    de: "Lass mich ausreden, bevor du mich unterbrichst!",
    zh: "在打断我之前，让我把话说完！",
    ta: "இடைமறிக்கும் முன் என்னை முடிக்க விடுங்கள்!",
    ar: "دعني أنهي حديثي قبل أن تقاطعني!"
  }
};

export async function translateText(
  text: string,
  fromLang: LanguageCode,
  toLang: LanguageCode
): Promise<string> {
  if (fromLang === toLang) return text;
  if (!text || !text.trim()) return '';

  const cleanText = text.trim();
  const lower = cleanText.toLowerCase();

  // 1. Direct dictionary match
  for (const [key, map] of Object.entries(PHRASE_DICTIONARY)) {
    if (lower === key || map[fromLang]?.toLowerCase() === lower) {
      if (map[toLang]) return map[toLang];
    }
  }

  // 2. Try online free API with strict 650ms timeout
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 650);

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      cleanText
    )}&langpair=${fromLang}|${toLang}`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data && data.responseData && data.responseData.translatedText) {
        return data.responseData.translatedText;
      }
    }
  } catch (_e) {
    // Timeout or network error - gracefully fall back
  }

  // 3. Heuristic translation fallback
  return getFallbackTranslation(cleanText, fromLang, toLang);
}

function getFallbackTranslation(text: string, fromLang: LanguageCode, toLang: LanguageCode): string {
  // If target is English
  if (toLang === 'en') {
    if (fromLang === 'hi') {
      if (text.includes('galat') || text.includes('bakwaas')) return "That is completely wrong and absurd!";
      if (text.includes('suno') || text.includes('ruko')) return "Listen, hold on a second!";
      if (text.includes('theek') || text.includes('sahi')) return "Okay, fair point on that specific aspect.";
      if (text.includes('paisa') || text.includes('budget')) return "Look at the budget and financial cost!";
      return `[Hindi: "${text}"] - "Listen to my point here!"`;
    }
    if (fromLang === 'fr') {
      if (text.includes('faux') || text.includes('ridicule')) return "That's completely false and unfounded!";
      if (text.includes('attends') || text.includes('écoute')) return "Wait, hear me out!";
      if (text.includes('raison') || text.includes('vrai')) return "You're right about that particular point.";
      return `[French: "${text}"] - "Consider the fundamental premise!"`;
    }
    if (fromLang === 'es') {
      if (text.includes('falso') || text.includes('mentira')) return "That is an outright falsehood!";
      if (text.includes('espera') || text.includes('mira')) return "Wait, look at the reality!";
      if (text.includes('razón') || text.includes('cierto')) return "Fair enough, I grant you that point.";
      return `[Spanish: "${text}"] - "Pay attention to the core evidence!"`;
    }
  }

  // If target is Hindi
  if (toLang === 'hi') {
    if (text.toLowerCase().includes('wrong') || text.toLowerCase().includes('false')) {
      return "ये सरासर गलत और बेतुकी बात है!";
    }
    if (text.toLowerCase().includes('listen') || text.toLowerCase().includes('wait')) {
      return "एक मिनट रुको, मेरी बात सुनो पहले!";
    }
    if (text.toLowerCase().includes('point') || text.toLowerCase().includes('admit') || text.toLowerCase().includes('agree')) {
      return "चलो तुम्हारी यह बात मान लेते हैं, लेकिन...";
    }
    return `[${fromLang.toUpperCase()}]: "${text}" (ध्यान से सुनो, यह तर्क समझो!)`;
  }

  // General fallback
  const langObj = SUPPORTED_LANGUAGES.find(l => l.code === toLang);
  const langName = langObj ? langObj.name : toLang;
  return `[${langName} Translation]: "${text}"`;
}

export function analyzeSentimentAndConcession(
  text: string,
  lang: LanguageCode
): {
  sentiment: 'aggressive' | 'defensive' | 'concession' | 'neutral';
  heatDelta: number;
  concessionDetected: boolean;
  concessionNote?: string;
  stanceShift: number; // Positive means shifts towards consensus (0 to 25)
} {
  const lower = text.toLowerCase();
  
  // Check concessions first
  const concessions = CONCESSION_MARKERS[lang] || CONCESSION_MARKERS['en'];
  const matchedConcession = concessions.find((m) => lower.includes(m.toLowerCase()));

  if (matchedConcession) {
    return {
      sentiment: 'concession',
      heatDelta: -18, // De-escalates heat
      concessionDetected: true,
      concessionNote: `Conceded ground: "${matchedConcession}"`,
      stanceShift: 18, // Significant shift toward consensus
    };
  }

  // Check aggression
  const aggressions = AGGRESSION_MARKERS[lang] || AGGRESSION_MARKERS['en'];
  const matchedAggression = aggressions.find((m) => lower.includes(m.toLowerCase()));
  const hasExclamation = (text.match(/!/g) || []).length >= 2;
  const isCaps = text.length > 8 && text === text.toUpperCase();

  if (matchedAggression || hasExclamation || isCaps) {
    return {
      sentiment: 'aggressive',
      heatDelta: 16, // Spikes heat
      concessionDetected: false,
      stanceShift: -6, // Entrenches stance further
    };
  }

  // Check defensive
  if (lower.includes('let me') || lower.includes('finish') || lower.includes('poori') || lower.includes('déjame') || lower.includes('laisse-moi')) {
    return {
      sentiment: 'defensive',
      heatDelta: 8,
      concessionDetected: false,
      stanceShift: -2,
    };
  }

  return {
    sentiment: 'neutral',
    heatDelta: 3,
    concessionDetected: false,
    stanceShift: 0,
  };
}
