"use client";

import MembershipQRCode from "./MembershipQRCode";

type Props = {
  memberName: string;
  memberNumber: number;
  status: string;
  memberSince: string;
  profileImage?: string | null;
};

export default function PrintableMembershipCard({
  memberName,
  memberNumber,
  status,
  memberSince,
  profileImage,
}: Props) {
  const formattedNumber = `ASK-${new Date().getFullYear()}-${String(
    memberNumber
  ).padStart(6, "0")}`;

  function printCard() {
    window.print();
  }

  const initials =
    memberName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "M";

  return (
    <>
      <button
        type="button"
        onClick={printCard}
        className="rounded-lg border border-red-800 px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-50 transition"
      >
        Print Card
      </button>

      <div className="hidden print:block fixed inset-0 bg-white p-10 z-[9999]">
        <div className="mx-auto w-[420px]">
          <div className="rounded-2xl bg-red-800 text-white p-7 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-red-200">
                  AHHiCHATRĀ SANSKAR KENDRA
                </p>

                <h1 className="text-2xl font-bold mt-2">
                  Community Membership
                </h1>
              </div>

              <div className="w-14 h-14 rounded-full bg-white text-red-800 flex items-center justify-center font-bold">
                ASK
              </div>
            </div>

            <div className="mt-7 flex items-center gap-5">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={memberName}
                  className="w-20 h-20 rounded-xl object-cover border-2 border-white"
                />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-white text-red-800 flex items-center justify-center text-2xl font-bold">
                  {initials}
                </div>
              )}

              <div>
                <p className="text-xs text-red-200">
                  MEMBER NAME
                </p>

                <p className="text-xl font-bold">
                  {memberName}
                </p>

                <p className="text-xs text-red-200 mt-2">
                  MEMBER NUMBER
                </p>

                <p className="font-mono font-semibold">
                  {formattedNumber}
                </p>
              </div>
            </div>

            <div className="mt-7 pt-5 border-t border-red-700 flex justify-between items-end">
              <div>
                <p className="text-xs text-red-200">
                  STATUS
                </p>

                <p className="font-bold">
                  {status}
                </p>

                <p className="text-xs text-red-200 mt-3">
                  MEMBER SINCE
                </p>

                <p className="font-semibold">
                  {memberSince}
                </p>
              </div>

              <MembershipQRCode
                memberNumber={memberNumber}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}