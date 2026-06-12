import Sidebar from "@/components/admin/Sidebar";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        {/* Top Navbar */}
        <div className="bg-red-800 shadow flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-white">
            Ahhichatra Sanskar Kendra
          </h1>

          <div className="flex items-center gap-4 text-white font-bold">
            <span>Super Admin</span>

            <LogoutButton />
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}