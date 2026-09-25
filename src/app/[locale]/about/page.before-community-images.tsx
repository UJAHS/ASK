import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Users,
  Sparkles,
  ShieldCheck,
  HandHeart,
  CalendarDays,
} from "lucide-react";

type Locale = "en" | "hi" | "gu";

const content: Record<
  Locale,
  {
    badge: string;
    title: string;
    subtitle: string;
    introTitle: string;
    introText: string;
    purposeTitle: string;
    purposeText: string;
    valuesTitle: string;
    valuesText: string;
    values: {
      title: string;
      text: string;
    }[];
    journeyTitle: string;
    journeyText: string;
    communityTitle: string;
    communityText: string;
    ctaTitle: string;
    ctaText: string;
    join: string;
    explore: string;
  }
> = {
  en: {
    badge: "ABOUT ASK",
    title: "A community built around people, culture and connection.",
    subtitle:
      "Ahhichatra Sanskar Kendra brings people together through shared values, cultural activities, community participation and meaningful connections.",
    introTitle: "Who We Are",
    introText:
      "Ahhichatra Sanskar Kendra is a community platform created to bring people closer, celebrate culture and traditions, encourage participation and create meaningful relationships across generations. The ASK Community Portal provides a digital space where members can stay connected with the community and discover activities, events and opportunities to participate.",
    purposeTitle: "Our Purpose",
    purposeText:
      "Our purpose is to keep the community connected in a changing world. ASK creates opportunities for members to participate, meet one another, celebrate important occasions and remain connected with shared values and traditions.",
    valuesTitle: "What We Believe",
    valuesText:
      "Our community is built around values that encourage respect, togetherness, participation and trust.",
    values: [
      {
        title: "Togetherness",
        text: "Creating a welcoming environment where people feel connected and included.",
      },
      {
        title: "Culture",
        text: "Respecting traditions and creating opportunities to pass meaningful values to future generations.",
      },
      {
        title: "Participation",
        text: "Encouraging members to take part in activities, events and community initiatives.",
      },
      {
        title: "Trust",
        text: "Building strong relationships through respect, transparency and shared responsibility.",
      },
    ],
    journeyTitle: "Connecting Generations",
    journeyText:
      "ASK aims to create meaningful opportunities for different generations to meet, communicate and participate together. Through cultural activities, social initiatives, gatherings and digital connectivity, the community can remain active and connected.",
    communityTitle: "A Community That Participates",
    communityText:
      "The strength of a community comes from its people. Every member brings experiences, ideas and relationships that help make the community stronger.",
    ctaTitle: "Become part of the ASK community.",
    ctaText:
      "Create your community profile, discover activities, connect with members and stay informed about what is happening around ASK.",
    join: "Join ASK",
    explore: "Explore Activities",
  },

  hi: {
    badge: "ASK के बारे में",
    title: "लोगों, संस्कृति और जुड़ाव से बना एक समुदाय।",
    subtitle:
      "अहिच्छत्र संस्कार केंद्र साझा मूल्यों, सांस्कृतिक गतिविधियों, सामुदायिक भागीदारी और सार्थक संबंधों के माध्यम से लोगों को जोड़ता है।",
    introTitle: "हम कौन हैं",
    introText:
      "अहिच्छत्र संस्कार केंद्र एक ऐसा कम्युनिटी प्लेटफॉर्म है जिसका उद्देश्य लोगों को करीब लाना, संस्कृति और परंपराओं का सम्मान करना, भागीदारी को प्रोत्साहित करना और पीढ़ियों के बीच सार्थक संबंध बनाना है। ASK Community Portal सदस्यों को समुदाय से जुड़े रहने और गतिविधियों, कार्यक्रमों तथा भागीदारी के अवसरों को जानने के लिए एक डिजिटल स्थान प्रदान करता है।",
    purposeTitle: "हमारा उद्देश्य",
    purposeText:
      "हमारा उद्देश्य बदलती दुनिया में समुदाय को जोड़े रखना है। ASK सदस्यों को भाग लेने, एक-दूसरे से मिलने, महत्वपूर्ण अवसरों को साथ मनाने और साझा मूल्यों एवं परंपराओं से जुड़े रहने के अवसर प्रदान करता है।",
    valuesTitle: "हमारे विश्वास",
    valuesText:
      "हमारा समुदाय ऐसे मूल्यों पर आधारित है जो सम्मान, एकजुटता, भागीदारी और विश्वास को प्रोत्साहित करते हैं।",
    values: [
      {
        title: "एकजुटता",
        text: "ऐसा स्वागतपूर्ण वातावरण बनाना जहां हर व्यक्ति जुड़ा और शामिल महसूस करे।",
      },
      {
        title: "संस्कृति",
        text: "परंपराओं का सम्मान करना और आने वाली पीढ़ियों तक महत्वपूर्ण मूल्यों को पहुंचाने के अवसर बनाना।",
      },
      {
        title: "भागीदारी",
        text: "सदस्यों को गतिविधियों, कार्यक्रमों और सामुदायिक पहलों में भाग लेने के लिए प्रोत्साहित करना।",
      },
      {
        title: "विश्वास",
        text: "सम्मान, पारदर्शिता और साझा जिम्मेदारी के माध्यम से मजबूत संबंध बनाना।",
      },
    ],
    journeyTitle: "पीढ़ियों को जोड़ना",
    journeyText:
      "ASK विभिन्न पीढ़ियों के लोगों को मिलने, संवाद करने और साथ मिलकर भाग लेने के सार्थक अवसर प्रदान करने का प्रयास करता है। सांस्कृतिक गतिविधियों, सामाजिक पहलों, सामुदायिक मिलन और डिजिटल जुड़ाव के माध्यम से समुदाय सक्रिय और जुड़ा रह सकता है।",
    communityTitle: "भागीदारी वाला समुदाय",
    communityText:
      "समुदाय की ताकत उसके लोगों से आती है। प्रत्येक सदस्य अपने अनुभव, विचार और संबंधों के माध्यम से समुदाय को मजबूत बनाने में योगदान देता है।",
    ctaTitle: "ASK समुदाय का हिस्सा बनें।",
    ctaText:
      "अपना कम्युनिटी प्रोफाइल बनाएं, गतिविधियां खोजें, सदस्यों से जुड़ें और ASK से जुड़ी जानकारी प्राप्त करें।",
    join: "ASK से जुड़ें",
    explore: "गतिविधियां देखें",
  },

  gu: {
    badge: "ASK વિશે",
    title: "લોકો, સંસ્કૃતિ અને જોડાણથી બનેલો સમુદાય.",
    subtitle:
      "અહિચ્છત્ર સંસ્કાર કેન્દ્ર સહિયારા મૂલ્યો, સાંસ્કૃતિક પ્રવૃત્તિઓ, સામુદાયિક ભાગીદારી અને અર્થપૂર્ણ સંબંધો દ્વારા લોકોને જોડે છે.",
    introTitle: "અમે કોણ છીએ",
    introText:
      "અહિચ્છત્ર સંસ્કાર કેન્દ્ર એક એવું કમ્યુનિટી પ્લેટફોર્મ છે જે લોકોને નજીક લાવવા, સંસ્કૃતિ અને પરંપરાઓની ઉજવણી કરવા, ભાગીદારીને પ્રોત્સાહિત કરવા અને પેઢીઓ વચ્ચે અર્થપૂર્ણ સંબંધો બનાવવા માટે રચવામાં આવ્યું છે. ASK Community Portal સભ્યોને સમુદાય સાથે જોડાયેલા રહેવા તથા પ્રવૃત્તિઓ, કાર્યક્રમો અને ભાગીદારીની તકો શોધવા માટે ડિજિટલ જગ્યા આપે છે.",
    purposeTitle: "અમારો હેતુ",
    purposeText:
      "બદલાતી દુનિયામાં આપણા સમુદાયને જોડાયેલો રાખવો એ અમારો હેતુ છે. ASK સભ્યોને ભાગ લેવા, એકબીજાને મળવા, મહત્વપૂર્ણ પ્રસંગોની ઉજવણી કરવા અને સહિયારા મૂલ્યો તથા પરંપરાઓ સાથે જોડાયેલા રહેવાની તકો આપે છે.",
    valuesTitle: "અમારા મૂલ્યો",
    valuesText:
      "અમારો સમુદાય સન્માન, એકતા, ભાગીદારી અને વિશ્વાસને પ્રોત્સાહિત કરતા મૂલ્યો પર આધારિત છે.",
    values: [
      {
        title: "એકતા",
        text: "દરેક વ્યક્તિ જોડાયેલો અને સામેલ અનુભવે તેવું સ્વાગતપૂર્ણ વાતાવરણ બનાવવું.",
      },
      {
        title: "સંસ્કૃતિ",
        text: "પરંપરાઓનું સન્માન કરવું અને આવનારી પેઢીઓ સુધી મહત્વપૂર્ણ મૂલ્યો પહોંચાડવાની તકો ઊભી કરવી.",
      },
      {
        title: "ભાગીદારી",
        text: "સભ્યોને પ્રવૃત્તિઓ, કાર્યક્રમો અને સામુદાયિક પહેલોમાં ભાગ લેવા પ્રોત્સાહિત કરવા.",
      },
      {
        title: "વિશ્વાસ",
        text: "સન્માન, પારદર્શિતા અને સહિયારી જવાબદારી દ્વારા મજબૂત સંબંધો બનાવવું.",
      },
    ],
    journeyTitle: "પેઢીઓને જોડતા સંબંધો",
    journeyText:
      "ASK વિવિધ પેઢીના લોકોને મળવા, વાતચીત કરવા અને સાથે મળીને ભાગ લેવા માટે અર્થપૂર્ણ તકો ઊભી કરવાનો પ્રયાસ કરે છે. સાંસ્કૃતિક પ્રવૃત્તિઓ, સામાજિક પહેલ, મેળાવડા અને ડિજિટલ જોડાણ દ્વારા સમુદાય સક્રિય અને જોડાયેલો રહી શકે છે.",
    communityTitle: "ભાગીદારી કરતો સમુદાય",
    communityText:
      "સમુદાયની શક્તિ તેના લોકોમાંથી આવે છે. દરેક સભ્ય પોતાના અનુભવો, વિચારો અને સંબંધો દ્વારા સમુદાયને વધુ મજબૂત બનાવવામાં યોગદાન આપે છે.",
    ctaTitle: "ASK સમુદાયનો ભાગ બનો.",
    ctaText:
      "તમારી કમ્યુનિટી પ્રોફાઇલ બનાવો, પ્રવૃત્તિઓ શોધો, સભ્યો સાથે જોડાઓ અને ASK વિશેની માહિતી મેળવો.",
    join: "ASK સાથે જોડાઓ",
    explore: "પ્રવૃત્તિઓ જુઓ",
  },
};

function getLocale(value: string): Locale {
  if (value === "hi" || value === "gu") return value;
  return "en";
}

const valueIcons = [
  Users,
  Sparkles,
  HandHeart,
  ShieldCheck,
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const t = content[locale];

  return (
    <main className="overflow-hidden bg-[#fff7f8] text-[#3b0710] dark:bg-[#170107] dark:text-white">
      {/* HERO */}
      <section
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#8f0014]
          via-[#c90018]
          to-[#ef001d]
          py-20
          text-white
          shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
          dark:from-[#100105]
          dark:via-[#2a030b]
          dark:to-[#180107]
          sm:py-28
        "
      >
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-pink-300/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[70%] -translate-x-1/2 rounded-full bg-red-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.2em] backdrop-blur">
              <Heart className="h-4 w-4 fill-current" />
              {t.badge}
            </div>

            <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-red-50/85 sm:text-lg">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="bg-[#fff7f8] py-20 dark:bg-[#170107] sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className="text-xs font-bold tracking-[0.22em] text-red-700 dark:text-red-300">
                {t.introTitle}
              </span>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#3b0710] dark:text-white sm:text-4xl">
                {t.introTitle}
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-[#6f2735] dark:text-red-100/70">
                {t.introText}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[Users, Heart, CalendarDays, Sparkles].map(
                  (Icon, index) => (
                    <div
                      key={index}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-100 bg-white text-red-700 shadow-sm dark:border-red-400/15 dark:bg-red-950/30 dark:text-red-200"
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PURPOSE */}
      <section
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#5a0915]
          via-[#760d1d]
          to-[#3b0710]
          py-20
          text-white
          dark:from-[#210209]
          dark:via-[#35040d]
          dark:to-[#100105]
          sm:py-24
        "
      >
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-red-400/10 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-pink-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold tracking-[0.22em] text-red-200">
                {t.purposeTitle}
              </span>

              <h2 className="mt-4 max-w-xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                {t.purposeTitle}
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-red-100/70 sm:text-lg">
                {t.purposeText}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Users,
                  title: t.values[0].title,
                },
                {
                  icon: Heart,
                  title: t.values[1].title,
                },
                {
                  icon: CalendarDays,
                  title: t.values[2].title,
                },
                {
                  icon: ShieldCheck,
                  title: t.values[3].title,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.12]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/20 text-red-200">
                      <Icon className="h-5 w-5" />
                    </div>

                    <p className="mt-6 font-bold">
                      {item.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#fff0f2] py-20 dark:bg-[#210209] sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-[0.22em] text-red-700 dark:text-red-300">
              {t.valuesTitle}
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#3b0710] dark:text-white sm:text-4xl">
              {t.valuesTitle}
            </h2>

            <p className="mt-4 leading-8 text-[#6f2735] dark:text-red-100/65">
              {t.valuesText}
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.values.map((item, index) => {
              const Icon = valueIcons[index];

              return (
                <div
                  key={item.title}
                  className="
                    group
                    rounded-2xl
                    border
                    border-red-100
                    bg-white
                    p-6
                    shadow-sm
                    transition
                    duration-300
                    hover:-translate-y-2
                    hover:border-red-300
                    hover:shadow-[0_20px_45px_rgba(190,24,93,0.13)]
                    dark:border-red-400/15
                    dark:bg-red-950/25
                    dark:hover:border-red-400/30
                  "
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-700 transition group-hover:bg-red-700 group-hover:text-white dark:bg-red-900/50 dark:text-red-200 dark:group-hover:bg-red-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-6 font-bold text-[#4a0a15] dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#7b3442] dark:text-red-100/60">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONNECTING GENERATIONS */}
      <section className="bg-[#fff7f8] py-20 dark:bg-[#170107] sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200">
                <Users className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-3xl font-black tracking-tight text-[#3b0710] dark:text-white sm:text-4xl">
                {t.journeyTitle}
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-[#6f2735] dark:text-red-100/65">
                {t.journeyText}
              </p>
            </div>

            <div className="rounded-[28px] border border-red-200 bg-gradient-to-br from-white via-[#fff1f3] to-[#ffdfe5] p-8 shadow-xl dark:border-red-400/15 dark:from-[#3b0710] dark:via-[#28040a] dark:to-[#170107] sm:p-10">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Users,
                    title: t.communityTitle,
                  },
                  {
                    icon: Sparkles,
                    title: t.values[1].title,
                  },
                  {
                    icon: HandHeart,
                    title: t.values[2].title,
                  },
                  {
                    icon: ShieldCheck,
                    title: t.values[3].title,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-red-200 bg-white/80 p-5 dark:border-red-400/10 dark:bg-red-950/30"
                    >
                      <Icon className="h-5 w-5 text-red-700 dark:text-red-300" />

                      <p className="mt-4 text-sm font-bold text-[#4a0a15] dark:text-white">
                        {item.title}
                      </p>
                    </div>
                  );
                })}
              </div>

              <p className="mt-6 text-sm leading-7 text-[#7b3442] dark:text-red-100/60">
                {t.communityText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#8f0014]
          via-[#c90018]
          to-[#ef001d]
          py-20
          text-white
          shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
          dark:from-[#240209]
          dark:via-[#520914]
          dark:to-[#180107]
          sm:py-24
        "
      >
        <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-pink-300/15 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[70%] -translate-x-1/2 rounded-full bg-red-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <Heart className="h-6 w-6 fill-current" />
          </div>

          <h2 className="mt-7 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            {t.ctaTitle}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-red-50/80 sm:text-lg">
            {t.ctaText}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/register`}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-red-800 shadow-xl transition hover:-translate-y-0.5 hover:bg-red-50"
            >
              {t.join}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href={`/${locale}/activities`}
              className="inline-flex items-center rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              {t.explore}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}