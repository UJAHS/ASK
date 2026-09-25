export const translations = {
  en: {
    home: "Home",
    about: "About",
    poems: "Poems",
    achievements: "Achievements",

    poet: "Poet",
    writer: "Writer",
    performer: "Performer",
    storyteller: "Storyteller",

    location: "Bhavnagar State",

    quote: "Words are my identity, poetry is my life",

    description:
      "Poems that touch the heart, thoughts that transform life, and words that remain forever.",

    readPoems: "Read Poems",
    listen: "Listen",
    explorePoetry: "Explore Poetry",

    poemsCount: "Poems",
    awardsCount: "Awards",
    eventsCount: "Events",

    language: "Language",
  },

  hi: {
    home: "होम",
    about: "परिचय",
    poems: "कविताएँ",
    achievements: "उपलब्धियाँ",

    poet: "कवि",
    writer: "लेखक",
    performer: "प्रस्तुतकर्ता",
    storyteller: "कहानीकार",

    location: "भावनगर राज्य",

    quote: "शब्द मेरी पहचान, कविता मेरी जान",

    description:
      "कविताएँ जो दिल को छू जाएँ, विचार जो जीवन बदल दें, और शब्द जो हमेशा याद रहें।",

    readPoems: "कविताएँ पढ़ें",
    listen: "सुनें",
    explorePoetry: "कविता संसार",

    poemsCount: "कविताएँ",
    awardsCount: "पुरस्कार",
    eventsCount: "कार्यक्रम",

    language: "भाषा",
  },

  gu: {
    home: "હોમ",
    about: "પરિચય",
    poems: "કાવ્યો",
    achievements: "સિદ્ધિઓ",

    poet: "કવિ",
    writer: "લેખક",
    performer: "કલાકાર",
    storyteller: "વાર્તાકાર",

    location: "ભાવનગર રાજ્ય",

    quote: "શબ્દ મારી ઓળખ, કવિતા મારી જાન",

    description:
      "હૃદયને સ્પર્શી જાય તેવી કવિતાઓ, જીવન બદલી નાખે તેવા વિચારો અને હંમેશા યાદ રહે તેવા શબ્દો.",

    readPoems: "કાવ્યો વાંચો",
    listen: "સાંભળો",
    explorePoetry: "કવિતા વિશ્વ",

    poemsCount: "કાવ્યો",
    awardsCount: "પુરસ્કારો",
    eventsCount: "કાર્યક્રમો",

    language: "ભાષા",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function t(
  language: "en" | "hi" | "gu",
  key: TranslationKey
) {
  return translations[language][key];
}