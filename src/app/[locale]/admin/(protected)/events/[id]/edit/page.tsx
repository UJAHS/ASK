import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EventForm } from "@/components/admin/EventForm";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export default async function EditEventPage({
  params,
}: Props) {
  const { locale, id } = await params;

  const event = await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      translations: true,
    },
  });

  if (!event) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Edit Event
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Update event information and translations.
        </p>
      </div>

      <EventForm
        locale={locale}
        eventId={event.id}
        initialData={event}
      />
    </div>
  );
}