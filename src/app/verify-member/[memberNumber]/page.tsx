import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function VerifyMemberPage({
  params,
}: {
  params: Promise<{ memberNumber: string }>;
}) {
  const { memberNumber } = await params;

  const number = Number(memberNumber);

  if (!Number.isInteger(number) || number <= 0) {
    notFound();
  }

  const user = await prisma.user.findUnique({
    where: {
      memberNumber: number,
    },
    select: {
      id: true,
      memberNumber: true,
      status: true,
      createdAt: true,
    },
  });

  if (!user) {
    return <MemberNotFound />;
  }

  const profile = await prisma.memberProfile.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      firstName: true,
      lastName: true,
      profileImage: true,
    },
  });

  const memberName =
    `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim() ||
    "Community Member";

  const memberId = `ASK-${user.createdAt.getFullYear()}-${String(
    user.memberNumber
  ).padStart(6, "0")}`;

  const memberSince = user.createdAt.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const approved = user.status === "APPROVED";

  const initials =
    memberName
      .split(" ")
      .filter(Boolean)
      .map((name) => name.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "MC";

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#ffe5e9] via-[#ffd9df] to-[#ffccd4] px-4 py-8 dark:from-[#3b0710] dark:via-[#520b16] dark:to-[#28040a] sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-lg items-center justify-center">
        <div className="w-full overflow-hidden rounded-3xl border border-red-300/80 bg-white shadow-2xl dark:border-red-400/30 dark:bg-[#3d0912]">
          {/* HEADER */}
          <div className="bg-gradient-to-br from-[#991b2f] via-[#7f1726] to-[#5b0b18] px-6 py-8 text-center text-white">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-bold text-red-800 shadow-lg">
              ASK
            </div>

            <h1 className="mt-4 text-2xl font-bold">
              Ahhichatra Sanskar Kendra
            </h1>

            <p className="mt-1 text-sm text-red-200">
              Membership Verification
            </p>
          </div>

          {/* CONTENT */}
          <div className="p-6 sm:p-8">
            {/* VERIFICATION STATUS */}
            <div className="text-center">
              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold ${
                  approved
                    ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                    : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                }`}
              >
                {approved ? "✓" : "!"}
              </div>

              <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                {approved
                  ? "Verified Member"
                  : "Membership Not Active"}
              </h2>

              <p className="mt-1 text-gray-600 dark:text-red-100/70">
                {memberName}
              </p>
            </div>

            {/* MEMBER */}
            <div className="mt-7 flex items-center gap-4 rounded-2xl border border-red-200 bg-gradient-to-br from-[#fff0f2] via-[#ffe3e8] to-[#ffd6dd] p-4 dark:border-red-300/20 dark:from-[#5c111b] dark:via-[#4e0d16] dark:to-[#420910]">
              {profile?.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt={memberName}
                  className="h-16 w-16 flex-shrink-0 rounded-xl border-2 border-white object-cover shadow-md"
                />
              ) : (
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-white text-xl font-bold text-red-800 shadow-md">
                  {initials}
                </div>
              )}

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-red-900/60 dark:text-red-100/60">
                  Member Name
                </p>

                <p className="mt-1 truncate text-lg font-bold text-gray-900 dark:text-white">
                  {memberName}
                </p>

                <p className="mt-1 break-all font-mono text-sm font-semibold text-red-800 dark:text-red-200">
                  {memberId}
                </p>
              </div>
            </div>

            {/* DETAILS */}
            <div className="mt-6 space-y-3">
              <Info
                label="Member ID"
                value={memberId}
              />

              <Info
                label="Membership Status"
                value={user.status}
                status={approved ? "approved" : "inactive"}
              />

              <Info
                label="Member Since"
                value={memberSince}
              />
            </div>

            {/* FOOTER */}
            <div className="mt-7 rounded-xl border border-red-200/70 bg-red-50/70 p-4 text-center dark:border-red-300/10 dark:bg-red-950/20">
              <p className="text-xs leading-5 text-gray-500 dark:text-red-100/60">
                This page confirms the membership record associated with
                this membership number.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function MemberNotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#ffe5e9] via-[#ffd9df] to-[#ffccd4] px-4 py-8 dark:from-[#3b0710] dark:via-[#520b16] dark:to-[#28040a]">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-red-300/80 bg-white p-8 text-center shadow-2xl dark:border-red-400/30 dark:bg-[#3d0912]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl font-bold text-red-700 dark:bg-red-500/20 dark:text-red-300">
            !
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">
            Member Not Found
          </h1>

          <p className="mt-2 text-gray-500 dark:text-red-100/60">
            This membership number could not be verified.
          </p>
        </div>
      </div>
    </main>
  );
}

function Info({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status?: "approved" | "inactive";
}) {
  return (
    <div className="rounded-xl border border-red-200/80 bg-gradient-to-br from-[#fff0f2] via-[#ffe3e8] to-[#ffd6dd] p-4 dark:border-red-300/20 dark:from-[#5c111b] dark:via-[#4e0d16] dark:to-[#420910]">
      <p className="text-xs font-medium uppercase tracking-wide text-red-900/60 dark:text-red-100/60">
        {label}
      </p>

      {status ? (
        <span
          className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
            status === "approved"
              ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
          }`}
        >
          {value}
        </span>
      ) : (
        <p className="mt-1 break-words font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
      )}
    </div>
  );
}