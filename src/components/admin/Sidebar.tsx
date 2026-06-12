"use client";

import Link from "next/link";

export default function Sidebar() {
  const menus = [
    { name: "Dashboard", url: "/admin/dashboard" },
    { name: "Master Data", url: "/admin/master-data" },
    { name: "Members", url: "/admin/members" },
    { name: "News", url: "/admin/news" },
    { name: "Activities", url: "/admin/activities" },
    { name: "Events", url: "/admin/events" },
    { name: "Gallery", url: "/admin/gallery" },
    { name: "Donations", url: "/admin/donations" },
    { name: "Matrimonial", url: "/admin/matrimonial" },
    { name: "Settings", url: "/admin/settings" },
  ];

  return (
    <aside className="w-64 bg-red-800 text-white min-h-screen">
      <div className="p-4 text-xl font-bold border-b">
        ASK Admin
      </div>

      <nav className="p-4 space-y-2">
        {menus.map((menu) => (
          <Link
            key={menu.url}
            href={menu.url}
            className="block p-2 rounded hover:bg-red-400"
          >
            {menu.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
