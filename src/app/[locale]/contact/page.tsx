import {
  Mail,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

type ContactPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const translations = {
  en: {
    badge: "GET IN TOUCH",
    title: "We would love to hear from you",
    description:
      "Have a question, suggestion, partnership idea or need help with the ASK Community Portal? Reach out to us and our team will be happy to connect with you.",
    contactUs: "Contact Us",
    sendMessage: "Send us a message",
    formDescription:
      "Fill in the form below and our team will get back to you.",
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    subject: "Subject",
    message: "Message",
    namePlaceholder: "Enter your full name",
    emailPlaceholder: "Enter your email address",
    phonePlaceholder: "Enter your phone number",
    subjectPlaceholder: "What would you like to discuss?",
    messagePlaceholder: "Write your message here...",
    send: "Send Message",
    emailTitle: "Email",
    phoneTitle: "Phone",
    addressTitle: "Community",
    address:
      "Ahhichatra Sanskar Kendra Community Portal",
    hoursTitle: "Availability",
    hours: "Monday – Saturday, 10:00 AM – 6:00 PM",
    communityTitle: "Be part of our community",
    communityDescription:
      "Connect with ASK, participate in community activities and stay connected with fellow members.",
    join: "Become a Member",
    required: "Please fill in all required fields.",
    success:
      "Thank you for contacting ASK. Your message has been prepared.",
  },

  hi: {
    badge: "संपर्क करें",
    title: "हम आपसे जुड़ना चाहेंगे",
    description:
      "ASK Community Portal के बारे में कोई प्रश्न, सुझाव, साझेदारी का विचार या सहायता चाहिए? हमसे संपर्क करें। हमारी टीम आपसे जुड़कर खुशी महसूस करेगी।",
    contactUs: "हमसे संपर्क करें",
    sendMessage: "हमें संदेश भेजें",
    formDescription:
      "नीचे दिया गया फॉर्म भरें और हमारी टीम आपसे संपर्क करेगी।",
    name: "पूरा नाम",
    email: "ईमेल पता",
    phone: "फोन नंबर",
    subject: "विषय",
    message: "संदेश",
    namePlaceholder: "अपना पूरा नाम दर्ज करें",
    emailPlaceholder: "अपना ईमेल पता दर्ज करें",
    phonePlaceholder: "अपना फोन नंबर दर्ज करें",
    subjectPlaceholder: "आप किस बारे में बात करना चाहते हैं?",
    messagePlaceholder: "अपना संदेश यहाँ लिखें...",
    send: "संदेश भेजें",
    emailTitle: "ईमेल",
    phoneTitle: "फोन",
    addressTitle: "समुदाय",
    address:
      "अहिच्छत्र संस्कार केंद्र कम्युनिटी पोर्टल",
    hoursTitle: "उपलब्धता",
    hours: "सोमवार – शनिवार, सुबह 10:00 – शाम 6:00",
    communityTitle: "हमारे समुदाय का हिस्सा बनें",
    communityDescription:
      "ASK से जुड़ें, सामुदायिक गतिविधियों में भाग लें और अन्य सदस्यों से जुड़े रहें।",
    join: "सदस्य बनें",
    required: "कृपया सभी आवश्यक फ़ील्ड भरें।",
    success:
      "ASK से संपर्क करने के लिए धन्यवाद। आपका संदेश तैयार किया गया है।",
  },

  gu: {
    badge: "સંપર્ક કરો",
    title: "અમે તમારી સાથે જોડાવા માંગીએ છીએ",
    description:
      "ASK Community Portal વિશે કોઈ પ્રશ્ન, સૂચન, ભાગીદારીનો વિચાર અથવા મદદ જોઈએ છે? અમારો સંપર્ક કરો. અમારી ટીમ તમારી સાથે જોડાઈને ખુશ થશે.",
    contactUs: "અમારો સંપર્ક કરો",
    sendMessage: "અમને સંદેશ મોકલો",
    formDescription:
      "નીચેનું ફોર્મ ભરો અને અમારી ટીમ તમારી સાથે સંપર્ક કરશે.",
    name: "પૂરું નામ",
    email: "ઈમેલ સરનામું",
    phone: "ફોન નંબર",
    subject: "વિષય",
    message: "સંદેશ",
    namePlaceholder: "તમારું પૂરું નામ દાખલ કરો",
    emailPlaceholder: "તમારું ઈમેલ સરનામું દાખલ કરો",
    phonePlaceholder: "તમારો ફોન નંબર દાખલ કરો",
    subjectPlaceholder: "તમે શેના વિશે વાત કરવા માંગો છો?",
    messagePlaceholder: "તમારો સંદેશ અહીં લખો...",
    send: "સંદેશ મોકલો",
    emailTitle: "ઈમેલ",
    phoneTitle: "ફોન",
    addressTitle: "સમુદાય",
    address:
      "અહિચ્છત્ર સંસ્કાર કેન્દ્ર કમ્યુનિટી પોર્ટલ",
    hoursTitle: "ઉપલબ્ધતા",
    hours: "સોમવાર – શનિવાર, સવારે 10:00 – સાંજે 6:00",
    communityTitle: "અમારા સમુદાયનો ભાગ બનો",
    communityDescription:
      "ASK સાથે જોડાઓ, સામુદાયિક પ્રવૃત્તિઓમાં ભાગ લો અને અન્ય સભ્યો સાથે જોડાયેલા રહો.",
    join: "સભ્ય બનો",
    required: "કૃપા કરીને તમામ જરૂરી માહિતી ભરો.",
    success:
      "ASK નો સંપર્ક કરવા બદલ આભાર. તમારો સંદેશ તૈયાર કરવામાં આવ્યો છે.",
  },
} as const;

function getLocale(value: string) {
  if (value === "hi") return "hi";
  if (value === "gu") return "gu";
  return "en";
}

export default async function ContactPage({
  params,
}: ContactPageProps) {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const t = translations[locale];

  return (
    <main className="min-h-screen bg-[#f8eef0] text-[#3b0710] transition-colors duration-300 dark:bg-[#180307] dark:text-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff7f8] via-[#f3d8de] to-[#dda1ad] py-20 dark:from-[#30060d] dark:via-[#4b0b16] dark:to-[#180307]">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#b40018]/10 blur-3xl dark:bg-[#ef001d]/10" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#b40018]/10 blur-3xl dark:bg-[#ef001d]/10" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b40018]/20 bg-white/60 px-4 py-2 text-sm font-bold text-[#b40018] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-[#ff7c8b]">
              <MessageCircle className="h-4 w-4" />
              {t.badge}
            </div>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5d2932] dark:text-white/70">
              {t.description}
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* CONTACT INFORMATION */}
          <div>
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b40018] dark:text-[#ff6877]">
                {t.contactUs}
              </p>

              <h2 className="mt-3 text-3xl font-black">
                {t.contactUs}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-[#b40018]/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#b40018]/10 text-[#b40018] dark:bg-[#ef001d]/10 dark:text-[#ff6877]">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      {t.emailTitle}
                    </h3>
                    <p className="mt-1 text-sm text-[#76535b] dark:text-white/60">
                      Contact our community team through the portal.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#b40018]/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#b40018]/10 text-[#b40018] dark:bg-[#ef001d]/10 dark:text-[#ff6877]">
                    <Phone className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      {t.phoneTitle}
                    </h3>
                    <p className="mt-1 text-sm text-[#76535b] dark:text-white/60">
                      Our team will respond to your enquiry.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#b40018]/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#b40018]/10 text-[#b40018] dark:bg-[#ef001d]/10 dark:text-[#ff6877]">
                    <MapPin className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      {t.addressTitle}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[#76535b] dark:text-white/60">
                      {t.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#b40018]/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#b40018]/10 text-[#b40018] dark:bg-[#ef001d]/10 dark:text-[#ff6877]">
                    <Clock className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      {t.hoursTitle}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[#76535b] dark:text-white/60">
                      {t.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="rounded-3xl border border-[#b40018]/10 bg-white p-6 shadow-xl sm:p-8 lg:p-10 dark:border-white/10 dark:bg-[#2b0710]">
            <div className="mb-8">
              <h2 className="text-2xl font-black sm:text-3xl">
                {t.sendMessage}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#76535b] dark:text-white/60">
                {t.formDescription}
              </p>
            </div>

            <form
              action="mailto:"
              method="post"
              encType="text/plain"
              className="space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    {t.name}
                  </label>

                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={t.namePlaceholder}
                    className="w-full rounded-xl border border-[#b40018]/15 bg-[#fff8f9] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#a7838a] focus:border-[#b40018] focus:ring-4 focus:ring-[#b40018]/10 dark:border-white/10 dark:bg-white/[0.04] dark:placeholder:text-white/30"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    {t.email}
                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={t.emailPlaceholder}
                    className="w-full rounded-xl border border-[#b40018]/15 bg-[#fff8f9] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#a7838a] focus:border-[#b40018] focus:ring-4 focus:ring-[#b40018]/10 dark:border-white/10 dark:bg-white/[0.04] dark:placeholder:text-white/30"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    {t.phone}
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder={t.phonePlaceholder}
                    className="w-full rounded-xl border border-[#b40018]/15 bg-[#fff8f9] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#a7838a] focus:border-[#b40018] focus:ring-4 focus:ring-[#b40018]/10 dark:border-white/10 dark:bg-white/[0.04] dark:placeholder:text-white/30"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    {t.subject}
                  </label>

                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder={t.subjectPlaceholder}
                    className="w-full rounded-xl border border-[#b40018]/15 bg-[#fff8f9] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#a7838a] focus:border-[#b40018] focus:ring-4 focus:ring-[#b40018]/10 dark:border-white/10 dark:bg-white/[0.04] dark:placeholder:text-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  {t.message}
                </label>

                <textarea
                  name="message"
                  required
                  rows={7}
                  placeholder={t.messagePlaceholder}
                  className="w-full resize-none rounded-xl border border-[#b40018]/15 bg-[#fff8f9] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#a7838a] focus:border-[#b40018] focus:ring-4 focus:ring-[#b40018]/10 dark:border-white/10 dark:bg-white/[0.04] dark:placeholder:text-white/30"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8f0014] via-[#b40018] to-[#d21b35] px-6 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                {t.send}
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* COMMUNITY CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#8f0014] via-[#b40018] to-[#d21b35] p-8 text-white shadow-2xl sm:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                <Users className="h-7 w-7" />
              </div>

              <div>
                <h2 className="text-2xl font-black sm:text-3xl">
                  {t.communityTitle}
                </h2>

                <p className="mt-2 max-w-2xl text-white/80">
                  {t.communityDescription}
                </p>
              </div>
            </div>

            <Link
              href={`/${locale}/register`}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-[#8f0014] shadow-lg transition hover:-translate-y-1"
            >
              {t.join}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}