import type { DebateTopic, LanguageCode } from '../types';

export const DEBATE_TOPICS: DebateTopic[] = [
  {
    id: 'ai-coders',
    title: 'AI Replacing vs Augmenting Developers',
    category: 'Technology & Work',
    proPosition: 'AI will replace traditional junior coding roles within 3 years.',
    conPosition: 'AI empowers builders with taste to ship 10x faster; human judgement is irreplaceable.',
    proDebaterName: 'Jean-Luc (Paris)',
    conDebaterName: 'Kabir (Indore)',
    proLanguage: 'fr',
    conLanguage: 'hi',
    openingPro: "Regardez la réalité en face : les agents écrivent déjà 80% du code basique sans fatigue !",
    openingCon: "Bhai code likhna sirf syntax nahi hota, user ki takleef samajhna aur taste hona zaroori hai!",
    keyDisputePoints: ['Code synthesis speed vs system architecture', 'Entry-level hiring pipeline', 'Domain understanding & human taste']
  },
  {
    id: 'remote-vs-office',
    title: 'Mandatory Office vs 100% Remote Work',
    category: 'Culture & Organization',
    proPosition: 'Early stage startups need high-bandwidth in-person whiteboard friction.',
    conPosition: 'Asynchronous remote work attracts global talent and respects deep focus.',
    proDebaterName: 'Mateo (Madrid)',
    conDebaterName: 'Rohan (Bengaluru)',
    proLanguage: 'es',
    conLanguage: 'hi',
    openingPro: "¡La energía de estar juntos en una sala resuelve en 10 minutos lo que tarda tres días en Slack!",
    openingCon: "Traffic mein do ghante phas kar office aane se product accha nahi banta, focus se banta hai!",
    keyDisputePoints: ['Spontaneous serendipity', 'Commute fatigue vs productivity', 'Global talent access']
  },
  {
    id: 'bootstrap-vs-vc',
    title: 'Bootstrap First vs Venture Capital Blitzscaling',
    category: 'Startup Strategy',
    proPosition: 'Venture capital is non-negotiable to capture aggressive winner-take-all markets.',
    conPosition: 'Bootstrapping forces immediate unit economics and builds anti-fragile businesses.',
    proDebaterName: 'Klaus (Berlin)',
    conDebaterName: 'Priya (Mumbai)',
    proLanguage: 'de',
    conLanguage: 'hi',
    openingPro: "Ohne massives Risikokapital überrollt dich die Konkurrenz in sechs Monaten gnadenlos!",
    openingCon: "Pehle din se agar customer paisa nahi de raha, toh 10 million dollar funding bhi doobegi!",
    keyDisputePoints: ['Customer revenue validation', 'Speed of market capture', 'Founder independence vs hypergrowth']
  }
];

export interface ScriptedStep {
  speaker: 'pro' | 'con';
  text: string;
  isInterruption: boolean;
  cutOffPrevAt?: string;
  heatDelta: number;
  stanceShift: number;
  concessionNote?: string;
  delayMs: number;
}

// A thrilling scripted dialogue for the AI vs AI live demonstration
export const SPECTATOR_SCRIPTS: Record<string, ScriptedStep[]> = {
  'ai-coders': [
    {
      speaker: 'pro',
      text: "Regardez les benchmarks de cette semaine : les modèles écrivent des API entières en quarante secondes !",
      isInterruption: false,
      heatDelta: 10,
      stanceShift: -5,
      delayMs: 3800,
    },
    {
      speaker: 'con',
      text: "रुको! तुम सिर्फ बॉयलरप्लेट की बात कर रहे हो! प्रोडक्शन में जब बग आता है ना, तो AI हाथ खड़े कर देता है!",
      isInterruption: true,
      cutOffPrevAt: "...écrivent des API entières en— [INTERRUPTED]",
      heatDelta: 22,
      stanceShift: -8,
      delayMs: 4200,
    },
    {
      speaker: 'pro',
      text: "Mais c'est absurde ! Les agents corrigent déjà leurs propres erreurs avec des boucles de feedback !",
      isInterruption: true,
      cutOffPrevAt: "...to AI haath khade kar— [INTERRUPTED]",
      heatDelta: 25,
      stanceShift: -10,
      delayMs: 3900,
    },
    {
      speaker: 'con',
      text: "अरे भाई डेटा सिक्योरिटी और कस्टमर का असली दर्द कौन समझेगा? क्या तुम्हारा एजेंट क्लाइंट के साथ बैठकर उसकी चाय पिएगा?",
      isInterruption: true,
      cutOffPrevAt: "...avec des boucles de— [INTERRUPTED]",
      heatDelta: 28,
      stanceShift: -5,
      delayMs: 4300,
    },
    {
      speaker: 'pro',
      text: "Tu as raison sur ce point : la compréhension humaine du client reste irremplaçable. Mais pour le codage pur, le junior classique est dépassé !",
      isInterruption: false,
      heatDelta: -16,
      stanceShift: 24, // Major concession!
      concessionNote: "Jean-Luc admitted: Human client understanding is irreplaceable!",
      delayMs: 4500,
    },
    {
      speaker: 'con',
      text: "हाँ, ये बात मैं भी मानता हूँ कि सिंटेक्स रटने वाले डेवलपर्स को बदलना पड़ेगा। जो बिल्डर AI को हथियार बनाएगा, वही जीतेगा!",
      isInterruption: false,
      heatDelta: -20,
      stanceShift: 32, // Mutual consensus achieved!
      concessionNote: "Kabir conceded: Developers who don't leverage AI will become obsolete!",
      delayMs: 4500,
    }
  ]
};

// Generates dynamic AI rebuttals in sparring mode
export function generateAIReply(
  userText: string,
  _userLang: LanguageCode,
  aiLang: LanguageCode,
  currentHeat: number,
  _topic: DebateTopic
): {
  text: string;
  isInterruption: boolean;
  heatDelta: number;
  stanceShift: number;
  concessionNote?: string;
} {
  const lower = userText.toLowerCase();

  // If user conceded or made a calm, nuanced point
  if (lower.includes('point') || lower.includes('fair') || lower.includes('agree') || lower.includes('theek') || lower.includes('sahi') || lower.includes('admit') || lower.includes('daccord')) {
    if (aiLang === 'fr') {
      return {
        text: "J'apprécie que tu reconnaisses cet aspect. C'est exactement le compromis : l'outil amplifie la créativité, mais n'annule pas la rigueur.",
        isInterruption: false,
        heatDelta: -18,
        stanceShift: 25,
        concessionNote: "Mutual understanding emerging on balanced adoption",
      };
    }
    if (aiLang === 'es') {
      return {
        text: "Admito que tienes razón en eso. Si encontramos un término medio entre la velocidad y la empatía humana, ambos ganamos.",
        isInterruption: false,
        heatDelta: -18,
        stanceShift: 25,
        concessionNote: "Consensus reached on human-in-the-loop synthesis",
      };
    }
    if (aiLang === 'ja') {
      return {
        text: "確かにその通りですね。極端な二者択一ではなく、両方の長所を組み合わせるべきだという点には同意します。",
        isInterruption: false,
        heatDelta: -18,
        stanceShift: 25,
        concessionNote: "Concurred on complementary synergy",
      };
    }
    return {
      text: "I actually agree with that nuance. If we combine automated speed with human intuition, that's where true breakthroughs happen.",
      isInterruption: false,
      heatDelta: -18,
      stanceShift: 25,
      concessionNote: "Point recognized by opponent",
    };
  }

  // If high heat or aggressive pushback
  if (currentHeat > 65 || lower.includes('!') || lower.includes('wrong') || lower.includes('galat') || lower.includes('never') || lower.includes('bakwaas')) {
    if (aiLang === 'fr') {
      return {
        text: "Attends une seconde ! Tu simplifies le problème à l'extrême ! As-tu seulement regardé les coûts opérationnels de ta proposition ?!",
        isInterruption: true,
        heatDelta: 18,
        stanceShift: -8,
      };
    }
    if (aiLang === 'es') {
      return {
        text: "¡No me interrumpas con argumentos sin fundamento! ¡Los hechos demuestran exactamente lo contrario de lo que estás afirmando!",
        isInterruption: true,
        heatDelta: 18,
        stanceShift: -8,
      };
    }
    if (aiLang === 'ja') {
      return {
        text: "ちょっと待ってください！それはあまりにも一方的な見方です。実際のデータが示している現実を無視していませんか？！",
        isInterruption: true,
        heatDelta: 18,
        stanceShift: -8,
      };
    }
    return {
      text: "Wait right there! You are completely evading the core question! Where is your verified proof for that claim?!",
      isInterruption: true,
      heatDelta: 18,
      stanceShift: -8,
    };
  }

  // Standard firm rebuttal
  if (aiLang === 'fr') {
    return {
      text: "Mais pense à l'échelle industrielle : comment une équipe artisanale peut-elle rivaliser sans automatisation radicale ?",
      isInterruption: false,
      heatDelta: 8,
      stanceShift: -2,
    };
  }
  if (aiLang === 'es') {
    return {
      text: "Entiendo tu perspectiva, pero en el mercado actual, la velocidad de ejecución lo es todo.",
      isInterruption: false,
      heatDelta: 6,
      stanceShift: 0,
    };
  }
  return {
    text: "That sounds fine in theory, but when rubber meets the road, reality forces a very different trade-off.",
    isInterruption: false,
    heatDelta: 6,
    stanceShift: 0,
  };
}
