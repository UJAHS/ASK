import { auth } from "@/auth";
import MemberSidebar from "@/components/member/MemberSidebar";
import MemberHeader from "@/components/member/MemberHeader";

export default async function MemberLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}) {
  const session = await auth();
  const { locale } = await params;

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#ffe5e9]
        via-[#ffd9df]
        to-[#ffccd4]
        transition-colors
        duration-300
        dark:bg-gradient-to-br
        dark:from-[#3b0710]
        dark:via-[#520b16]
        dark:to-[#28040a]
      "
    >
      <MemberSidebar />

      <div className="md:ml-64">
        <MemberHeader
          email={session?.user?.email || ""}
          locale={locale}
        />

        <main
          className="
            min-h-[calc(100vh-64px)]
            p-4
            md:p-6
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}