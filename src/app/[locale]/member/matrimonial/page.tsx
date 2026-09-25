import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import MatrimonialSearch from "@/components/member/MatrimonialSearch";

type Props = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    q?: string;
    gender?: string;
    maritalStatus?: string;
    city?: string;
    state?: string;
  }>;
};

const translations = {
  en: {
    title: "Matrimonial",
    subtitle:
      "Create your profile and discover matrimonial profiles from the ASK Community.",
    myProfile: "My Matrimonial Profile",
    noProfile:
      "You have not created a matrimonial profile yet.",
    createText:
      "Create your matrimonial profile to participate in the ASK Community matrimonial section.",
    approvalText:
      "Your profile will become visible according to your privacy settings after admin approval.",
    create: "Create Matrimonial Profile",
    edit: "Edit Profile",
    preview: "Preview Profile",
    status: "Profile Status",
    approved: "Approved",
    pending: "Pending Approval",
    visibility: "Profile Visibility",
    public: "Public",
    membersOnly: "Members Only",
    private: "Private",
    contact: "Contact Preference",
    adminOnly: "Contact through Admin",
    back: "Back to Dashboard",
    profileReady: "Your matrimonial profile is ready.",
    awaitingApproval:
      "Your profile is awaiting admin approval.",
    privateNotice:
      "Your profile is currently private.",
  },

  hi: {
    title: "à¤µà¤¿à¤µà¤¾à¤¹ à¤ªà¤°à¤¿à¤šà¤¯",
    subtitle:
      "à¤…à¤ªà¤¨à¥€ à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¬à¤¨à¤¾à¤à¤‚ à¤”à¤° ASK à¤¸à¤®à¥à¤¦à¤¾à¤¯ à¤•à¥€ à¤µà¥ˆà¤µà¤¾à¤¹à¤¿à¤• à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤–à¥‹à¤œà¥‡à¤‚à¥¤",
    myProfile: "à¤®à¥‡à¤°à¥€ à¤µà¥ˆà¤µà¤¾à¤¹à¤¿à¤• à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤²",
    noProfile:
      "à¤†à¤ªà¤¨à¥‡ à¤…à¤­à¥€ à¤¤à¤• à¤µà¥ˆà¤µà¤¾à¤¹à¤¿à¤• à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¨à¤¹à¥€à¤‚ à¤¬à¤¨à¤¾à¤ˆ à¤¹à¥ˆà¥¤",
    createText:
      "ASK à¤¸à¤®à¥à¤¦à¤¾à¤¯ à¤•à¥‡ à¤µà¥ˆà¤µà¤¾à¤¹à¤¿à¤• à¤…à¤¨à¥à¤­à¤¾à¤— à¤®à¥‡à¤‚ à¤­à¤¾à¤— à¤²à¥‡à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤…à¤ªà¤¨à¥€ à¤µà¥ˆà¤µà¤¾à¤¹à¤¿à¤• à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¬à¤¨à¤¾à¤à¤‚à¥¤",
    approvalText:
      "à¤ªà¥à¤°à¤¶à¤¾à¤¸à¤¨ à¤•à¥€ à¤¸à¥à¤µà¥€à¤•à¥ƒà¤¤à¤¿ à¤•à¥‡ à¤¬à¤¾à¤¦ à¤†à¤ªà¤•à¥€ à¤—à¥‹à¤ªà¤¨à¥€à¤¯à¤¤à¤¾ à¤¸à¥‡à¤Ÿà¤¿à¤‚à¤— à¤•à¥‡ à¤…à¤¨à¥à¤¸à¤¾à¤° à¤†à¤ªà¤•à¥€ à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¦à¤¿à¤–à¤¾à¤ˆ à¤œà¤¾à¤à¤—à¥€à¥¤",
    create: "à¤µà¥ˆà¤µà¤¾à¤¹à¤¿à¤• à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¬à¤¨à¤¾à¤à¤‚",
    edit: "à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¸à¤‚à¤ªà¤¾à¤¦à¤¿à¤¤ à¤•à¤°à¥‡à¤‚",
    preview: "à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¦à¥‡à¤–à¥‡à¤‚",
    status: "à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¸à¥à¤¥à¤¿à¤¤à¤¿",
    approved: "à¤…à¤¨à¥à¤®à¥‹à¤¦à¤¿à¤¤",
    pending: "à¤…à¤¨à¥à¤®à¥‹à¤¦à¤¨ à¤²à¤‚à¤¬à¤¿à¤¤",
    visibility: "à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¦à¥ƒà¤¶à¥à¤¯à¤¤à¤¾",
    public: "à¤¸à¤¾à¤°à¥à¤µà¤œà¤¨à¤¿à¤•",
    membersOnly: "à¤•à¥‡à¤µà¤² à¤¸à¤¦à¤¸à¥à¤¯",
    private: "à¤¨à¤¿à¤œà¥€",
    contact: "à¤¸à¤‚à¤ªà¤°à¥à¤• à¤ªà¥à¤°à¤¾à¤¥à¤®à¤¿à¤•à¤¤à¤¾",
    adminOnly: "à¤ªà¥à¤°à¤¶à¤¾à¤¸à¤¨ à¤•à¥‡ à¤®à¤¾à¤§à¥à¤¯à¤® à¤¸à¥‡ à¤¸à¤‚à¤ªà¤°à¥à¤•",
    back: "à¤¡à¥ˆà¤¶à¤¬à¥‹à¤°à¥à¤¡ à¤ªà¤° à¤µà¤¾à¤ªà¤¸ à¤œà¤¾à¤à¤‚",
    profileReady: "à¤†à¤ªà¤•à¥€ à¤µà¥ˆà¤µà¤¾à¤¹à¤¿à¤• à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤¤à¥ˆà¤¯à¤¾à¤° à¤¹à¥ˆà¥¤",
    awaitingApproval:
      "à¤†à¤ªà¤•à¥€ à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤ªà¥à¤°à¤¶à¤¾à¤¸à¤¨ à¤•à¥€ à¤¸à¥à¤µà¥€à¤•à¥ƒà¤¤à¤¿ à¤•à¥€ à¤ªà¥à¤°à¤¤à¥€à¤•à¥à¤·à¤¾ à¤•à¤° à¤°à¤¹à¥€ à¤¹à¥ˆà¥¤",
    privateNotice:
      "à¤†à¤ªà¤•à¥€ à¤ªà¥à¤°à¥‹à¤«à¤¼à¤¾à¤‡à¤² à¤µà¤°à¥à¤¤à¤®à¤¾à¤¨ à¤®à¥‡à¤‚ à¤¨à¤¿à¤œà¥€ à¤¹à¥ˆà¥¤",
  },

  gu: {
    title: "àª²àª—à«àª¨ àªªàª°àª¿àªšàª¯",
    subtitle:
      "àª¤àª®àª¾àª°à«€ àªªà«àª°à«‹àª«àª¾àª‡àª² àª¬àª¨àª¾àªµà«‹ àª…àª¨à«‡ ASK àª¸àª®à«àª¦àª¾àª¯àª¨à«€ àª²àª—à«àª¨ àªªà«àª°à«‹àª«àª¾àª‡àª² àª¶à«‹àª§à«‹.",
    myProfile: "àª®àª¾àª°à«€ àª²àª—à«àª¨ àªªà«àª°à«‹àª«àª¾àª‡àª²",
    noProfile:
      "àª¤àª®à«‡ àª¹àªœà« àª¸à«àª§à«€ àª²àª—à«àª¨ àªªà«àª°à«‹àª«àª¾àª‡àª² àª¬àª¨àª¾àªµà«€ àª¨àª¥à«€.",
    createText:
      "ASK àª¸àª®à«àª¦àª¾àª¯àª¨àª¾ àª²àª—à«àª¨ àªµàª¿àª­àª¾àª—àª®àª¾àª‚ àª­àª¾àª— àª²à«‡àªµàª¾ àª®àª¾àªŸà«‡ àª¤àª®àª¾àª°à«€ àª²àª—à«àª¨ àªªà«àª°à«‹àª«àª¾àª‡àª² àª¬àª¨àª¾àªµà«‹.",
    approvalText:
      "àªµà«àª¯àªµàª¸à«àª¥àª¾àªªàª¨àª¨à«€ àª®àª‚àªœà«‚àª°à«€ àªªàª›à«€ àª¤àª®àª¾àª°à«€ àª—à«‹àªªàª¨à«€àª¯àª¤àª¾ àª¸à«‡àªŸàª¿àª‚àª— àª®à«àªœàª¬ àª¤àª®àª¾àª°à«€ àªªà«àª°à«‹àª«àª¾àª‡àª² àª¦à«‡àª–àª¾àª¶à«‡.",
    create: "àª²àª—à«àª¨ àªªà«àª°à«‹àª«àª¾àª‡àª² àª¬àª¨àª¾àªµà«‹",
    edit: "àªªà«àª°à«‹àª«àª¾àª‡àª² àª¸à«àª§àª¾àª°à«‹",
    preview: "àªªà«àª°à«‹àª«àª¾àª‡àª² àªœà«àª“",
    status: "àªªà«àª°à«‹àª«àª¾àª‡àª² àª¸à«àª¥àª¿àª¤àª¿",
    approved: "àª®àª‚àªœà«‚àª°",
    pending: "àª®àª‚àªœà«‚àª°à«€ àª¬àª¾àª•à«€",
    visibility: "àªªà«àª°à«‹àª«àª¾àª‡àª² àª¦à«ƒàª¶à«àª¯àª¤àª¾",
    public: "àªœàª¾àª¹à«‡àª°",
    membersOnly: "àª®àª¾àª¤à«àª° àª¸àª­à«àª¯à«‹ àª®àª¾àªŸà«‡",
    private: "àª–àª¾àª¨àª—à«€",
    contact: "àª¸àª‚àªªàª°à«àª• àªªàª¸àª‚àª¦àª—à«€",
    adminOnly: "àªµà«àª¯àªµàª¸à«àª¥àª¾àªªàª¨ àª¦à«àªµàª¾àª°àª¾ àª¸àª‚àªªàª°à«àª•",
    back: "àª¡à«‡àª¶àª¬à«‹àª°à«àª¡ àªªàª° àªªàª¾àª›àª¾ àªœàª¾àªµ",
    profileReady: "àª¤àª®àª¾àª°à«€ àª²àª—à«àª¨ àªªà«àª°à«‹àª«àª¾àª‡àª² àª¤à«ˆàª¯àª¾àª° àª›à«‡.",
    awaitingApproval:
      "àª¤àª®àª¾àª°à«€ àªªà«àª°à«‹àª«àª¾àª‡àª² àªµà«àª¯àªµàª¸à«àª¥àª¾àªªàª¨àª¨à«€ àª®àª‚àªœà«‚àª°à«€àª¨à«€ àª°àª¾àª¹ àªœà«‹àªˆ àª°àª¹à«€ àª›à«‡.",
    privateNotice:
      "àª¤àª®àª¾àª°à«€ àªªà«àª°à«‹àª«àª¾àª‡àª² àª¹àª¾àª²àª®àª¾àª‚ àª–àª¾àª¨àª—à«€ àª›à«‡.",
  },
} as const;

type Locale = "en" | "hi" | "gu";

function getLocale(value: string): Locale {
  if (value === "hi") return "hi";
  if (value === "gu") return "gu";
  return "en";
}

function statusLabel(
  status: string,
  t: (typeof translations)[Locale]
) {
  if (status === "APPROVED") return t.approved;
  return t.pending;
}

function visibilityLabel(
  visibility: string,
  t: (typeof translations)[Locale]
) {
  if (visibility === "PUBLIC") return t.public;
  if (visibility === "MEMBERS_ONLY") return t.membersOnly;
  return t.private;
}

export default async function MemberMatrimonialPage({
  params,
  searchParams,
}: Props) {
  const { locale: rawLocale } = await params;
  const filters = await searchParams;

  const locale = getLocale(rawLocale);
  const t = translations[locale];

  const session = await auth();

  if (!session?.user?.email) {
    redirect(`/${locale}/login`);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      role: true,
      status: true,
      matrimonialProfile: true,
    },
  });

  if (
    !user ||
    user.role !== "MEMBER" ||
    user.status !== "APPROVED"
  ) {
    redirect(`/${locale}/unauthorized`);
  }

  const profile = user.matrimonialProfile;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">

      {/* Header */}
      <div>
        <Link
          href={`/${locale}/member/dashboard`}
          className="
            inline-flex items-center gap-2
            text-sm font-semibold
            text-red-600
            transition
            hover:text-red-800
            dark:text-red-400
            dark:hover:text-red-300
          "
        >
          â† {t.back}
        </Link>

        <div className="mt-5">
          <div
            className="
              mb-3 inline-flex
              rounded-full
              border border-red-200
              bg-red-100
              px-3 py-1
              text-xs font-bold
              uppercase tracking-wide
              text-red-700
              dark:border-red-900/60
              dark:bg-red-950/50
              dark:text-red-300
            "
          >
            {t.title}
          </div>

          <h1
            className="
              text-3xl font-bold
              tracking-tight
              text-gray-900
              dark:text-white
              sm:text-4xl
            "
          >
            {t.title}
          </h1>

          <p className="
            mt-2 max-w-3xl
            text-sm leading-6
            text-gray-600
            dark:text-gray-300
          ">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* My Profile */}
      {profile ? (
        <section
          className="
            overflow-hidden
            rounded-3xl
            border border-red-200
            bg-gradient-to-br
            from-[#FFF8DF]
            via-[#ffd2da]
            to-[#ffc4ce]
            shadow-lg
            shadow-red-900/10
            transition-all duration-300
            hover:shadow-xl
            dark:border-red-900/70
            dark:bg-gradient-to-br
            dark:from-[#68131f]
            dark:via-[#570e18]
            dark:to-[#410810]
          "
        >
          <div className="p-6 sm:p-8">

            <div className="
              flex flex-col gap-6
              lg:flex-row
              lg:items-center
              lg:justify-between
            ">

              <div className="flex items-center gap-5">

                <div className="
                  h-24 w-24 shrink-0
                  overflow-hidden
                  rounded-3xl
                  border-4 border-white
                  bg-red-100
                  shadow-lg
                  dark:border-red-200/20
                  dark:bg-red-950
                ">
                  {profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt={`${profile.firstName} ${profile.lastName || ""}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="
                      flex h-full w-full
                      items-center justify-center
                      bg-red-600
                      text-3xl font-bold
                      text-white
                    ">
                      {profile.firstName
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}
                </div>

                <div>
                  <p className="
                    text-sm font-semibold
                    text-red-700
                    dark:text-red-300
                  ">
                    {t.myProfile}
                  </p>

                  <h2 className="
                    mt-1 text-2xl font-bold
                    text-gray-900
                    dark:text-white
                  ">
                    {profile.firstName}{" "}
                    {profile.lastName || ""}
                  </h2>

                  <p className="
                    mt-1 text-sm
                    text-gray-600
                    dark:text-gray-300
                  ">
                    {profile.city || ""}
                    {profile.city && profile.state
                      ? ", "
                      : ""}
                    {profile.state || ""}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">

                <Link
                  href={`/${locale}/dashboard/matrimonial/edit`}
                  className="
                    rounded-xl
                    bg-red-600
                    px-5 py-3
                    text-sm font-bold
                    text-white
                    shadow-md
                    transition-all
                    hover:-translate-y-0.5
                    hover:bg-red-700
                    hover:shadow-lg
                  "
                >
                  {t.edit}
                </Link>

                {profile.status === "APPROVED" &&
                  profile.profileVisibility !==
                    "PRIVATE" && (
                    <Link
                      href={`/${locale}/matrimonial/${profile.id}`}
                      className="
                        rounded-xl
                        border border-red-300
                        bg-white/70
                        px-5 py-3
                        text-sm font-bold
                        text-red-700
                        transition-all
                        hover:-translate-y-0.5
                        hover:bg-white
                        hover:shadow-md
                        dark:border-red-800
                        dark:bg-red-950/30
                        dark:text-red-200
                        dark:hover:bg-red-950/60
                      "
                    >
                      {t.preview}
                    </Link>
                  )}

              </div>
            </div>

            <div className="
              mt-6 grid
              grid-cols-1 gap-4
              md:grid-cols-3
            ">

              <div className="
                rounded-2xl
                border border-red-200
                bg-white/60
                p-5
                dark:border-red-100/10
                dark:bg-[#751a28]/50
              ">
                <p className="
                  text-xs font-bold uppercase
                  tracking-wide
                  text-red-600
                  dark:text-red-300
                ">
                  {t.status}
                </p>

                <p className="
                  mt-2 text-lg font-bold
                  text-gray-900
                  dark:text-white
                ">
                  {statusLabel(
                    profile.status,
                    t
                  )}
                </p>
              </div>

              <div className="
                rounded-2xl
                border border-red-200
                bg-white/60
                p-5
                dark:border-red-100/10
                dark:bg-[#751a28]/50
              ">
                <p className="
                  text-xs font-bold uppercase
                  tracking-wide
                  text-red-600
                  dark:text-red-300
                ">
                  {t.visibility}
                </p>

                <p className="
                  mt-2 text-lg font-bold
                  text-gray-900
                  dark:text-white
                ">
                  {visibilityLabel(
                    profile.profileVisibility,
                    t
                  )}
                </p>
              </div>

              <div className="
                rounded-2xl
                border border-red-200
                bg-white/60
                p-5
                dark:border-red-100/10
                dark:bg-[#751a28]/50
              ">
                <p className="
                  text-xs font-bold uppercase
                  tracking-wide
                  text-red-600
                  dark:text-red-300
                ">
                  {t.contact}
                </p>

                <p className="
                  mt-2 text-lg font-bold
                  text-gray-900
                  dark:text-white
                ">
                  {profile.contactPreference ===
                  "MEMBERS_ONLY"
                    ? t.membersOnly
                    : t.adminOnly}
                </p>
              </div>

            </div>
          </div>
        </section>
      ) : (
        <section
          className="
            overflow-hidden
            rounded-3xl
            border border-red-200
            bg-gradient-to-br
            from-[#FFFDF2]
            via-[#FFF6D8]
            to-[#FFEEC0]
            p-8
            shadow-lg
            shadow-red-200/30
            dark:border-red-900/70
            dark:bg-gradient-to-br
            dark:from-[#751a28]
            dark:via-[#64131f]
            dark:to-[#51101a]
          "
        >
          <div className="max-w-3xl">

            <div className="
              mb-5 flex h-14 w-14
              items-center justify-center
              rounded-2xl
              bg-red-600
              text-2xl text-white
              shadow-lg
            ">
              â™¥
            </div>

            <h2 className="
              text-2xl font-bold
              text-gray-900
              dark:text-white
            ">
              {t.noProfile}
            </h2>

            <p className="
              mt-3 text-sm leading-7
              text-gray-600
              dark:text-gray-300
            ">
              {t.createText}
            </p>

            <div className="
              mt-6 rounded-2xl
              border border-red-200/80
              bg-white/60
              p-4
              text-sm
              text-gray-600
              backdrop-blur
              dark:border-red-900/60
              dark:bg-black/10
              dark:text-gray-300
            ">
              {t.approvalText}
            </div>

            <Link
              href={`/${locale}/dashboard/matrimonial/new`}
              className="
                mt-7 inline-flex
                rounded-xl
                bg-red-600
                px-6 py-3
                text-sm font-bold
                text-white
                shadow-lg
                transition-all
                hover:-translate-y-0.5
                hover:bg-red-700
                hover:shadow-xl
              "
            >
              {t.create}
            </Link>

          </div>
        </section>
      )}

      {/* Matrimonial Search & Directory */}
      <MatrimonialSearch
        locale={locale}
        userId={user.id}
        q={filters.q?.trim() || ""}
        gender={filters.gender || ""}
        maritalStatus={filters.maritalStatus || ""}
        city={filters.city || ""}
        state={filters.state || ""}
      />

    </div>
  );
}