import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ActivityForm from "@/components/admin/ActivityForm";

export default async function EditActivityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  const role = session?.user
    ? String((session.user as any).role || "")
    : "";

  const isAdmin =
    role === "ADMIN" ||
    role === "SUPER_ADMIN";

  if (!isAdmin) {
    redirect("/unauthorized");
  }

  const { id } = await params;

  const activity = await prisma.activity.findUnique({
    where: {
      id,
    },
  });

  if (!activity) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <Link
          href="/admin/activities"
          className="mb-4 inline-flex text-sm font-semibold text-red-700 hover:text-red-900"
        >
          ← Back to Activities
        </Link>

        <h1 className="mt-3 text-3xl font-bold text-gray-900">
          Edit Activity
        </h1>

        <p className="mt-1 text-gray-600">
          Update community activity details.
        </p>
      </div>

      <ActivityForm
        activity={{
          id: activity.id,
          title: activity.title,
          description: activity.description,
          category: activity.category,
          location: activity.location,
          activityDate: activity.activityDate
            ? activity.activityDate.toISOString()
            : null,
          image: activity.image,
          status: activity.status,
        }}
      />
    </div>
  );
}