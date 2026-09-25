import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function MatrimonialViewPage({
  params,
}: Props) {
  const { locale, id } = await params;

  const profile = await prisma.matrimonialProfile.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          email: true,
          memberNumber: true,
          status: true,
          memberProfile: true,
        },
      },
    },
  });

  if (!profile) {
    redirect(`/${locale}/admin/matrimonial`);
  }

  const name = [
    profile.firstName,
    profile.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6">
      <div className="mx-auto max-w-6xl">

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href={`/${locale}/admin/matrimonial`}
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              ← Back to Matrimonial Profiles
            </Link>

            <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
              {name || "Matrimonial Profile"}
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Member #{profile.user.memberNumber}
            </p>
          </div>

          <Link
            href={`/${locale}/admin/matrimonial/${profile.id}/edit`}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-red-700"
          >
            Edit Profile
          </Link>
        </div>

        <div className="space-y-6">

          <Card title="Member Information">
            <Row label="Member Number">
              #{profile.user.memberNumber}
            </Row>

            <Row label="Email">
              {profile.user.email}
            </Row>

            <Row label="Member Status">
              {profile.user.status}
            </Row>

            <Row label="Matrimonial Status">
              {profile.status}
            </Row>
          </Card>

          <Card title="Personal Information">
            <Row label="Name">{name || "-"}</Row>
            <Row label="Gender">{profile.gender}</Row>
            <Row label="Date of Birth">
              {profile.dateOfBirth
                ? new Date(
                    profile.dateOfBirth
                  ).toLocaleDateString()
                : "-"}
            </Row>
            <Row label="Height">
              {profile.height || "-"}
            </Row>
            <Row label="Marital Status">
              {profile.maritalStatus}
            </Row>
          </Card>

          <Card title="Education & Profession">
            <Row label="Education">
              {profile.education || "-"}
            </Row>

            <Row label="Profession">
              {profile.profession || "-"}
            </Row>

            <Row label="Occupation">
              {profile.occupation || "-"}
            </Row>

            <Row label="Company">
              {profile.company || "-"}
            </Row>
          </Card>

          <Card title="Location">
            <Row label="City">
              {profile.city || "-"}
            </Row>

            <Row label="State">
              {profile.state || "-"}
            </Row>

            <Row label="Country">
              {profile.country || "-"}
            </Row>

            <Row label="Pincode">
              {profile.pincode || "-"}
            </Row>
          </Card>

          <Card title="Community Information">
            <Row label="Religion">
              {profile.religion || "-"}
            </Row>

            <Row label="Community">
              {profile.community || "-"}
            </Row>

            <Row label="Sub Community">
              {profile.subCommunity || "-"}
            </Row>

            <Row label="Gotra">
              {profile.gotra || "-"}
            </Row>
          </Card>

          <Card title="Family Information">
            <Row label="Father">
              {profile.fatherName || "-"}
            </Row>

            <Row label="Mother">
              {profile.motherName || "-"}
            </Row>

            <Row label="Siblings">
              {profile.siblings || "-"}
            </Row>

            <LongRow label="Family Details">
              {profile.familyDetails || "-"}
            </LongRow>
          </Card>

          <Card title="About">
            <LongRow label="About Me">
              {profile.aboutMe || "-"}
            </LongRow>

            <LongRow label="Partner Expectations">
              {profile.partnerExpectation || "-"}
            </LongRow>
          </Card>

          <Card title="Profile Settings">
            <Row label="Contact Preference">
              {profile.contactPreference}
            </Row>

            <Row label="Profile Visibility">
              {profile.profileVisibility}
            </Row>

            <LongRow label="Profile Image">
              {profile.profileImage || "-"}
            </LongRow>
          </Card>

        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h2 className="mb-5 border-b border-slate-200 pb-3 text-lg font-bold text-slate-900 dark:text-white">
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {children}
      </div>
    </section>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
        {children}
      </p>
    </div>
  );
}

function LongRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="md:col-span-2">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-300">
        {children}
      </p>
    </div>
  );
}