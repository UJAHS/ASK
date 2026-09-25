import Link from "next/link";

const masterMenus = [
  {
    title: "Skills",
    href: "/admin/master-data/skill",
    icon: "SK",
    iconColor: "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-500/20 dark:text-violet-100 dark:border-violet-300/20",
  },
  {
    title: "Gotra",
    href: "/admin/master-data/gotra",
    icon: "G",
    iconColor: "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-100 dark:border-red-300/20",
  },
  {
    title: "Education",
    href: "/admin/master-data/education",
    icon: "E",
    iconColor: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-100 dark:border-blue-300/20",
  },
  {
    title: "Occupation",
    href: "/admin/master-data/occupation",
    icon: "O",
    iconColor: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/20 dark:text-purple-100 dark:border-purple-300/20",
  },
  {
    title: "Blood Group",
    href: "/admin/master-data/blood-group",
    icon: "B",
    iconColor: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/20 dark:text-rose-100 dark:border-rose-300/20",
  },
  {
    title: "Country",
    href: "/admin/master-data/country",
    icon: "C",
    iconColor: "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-500/20 dark:text-cyan-100 dark:border-cyan-300/20",
  },
  {
    title: "State",
    href: "/admin/master-data/state",
    icon: "S",
    iconColor: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-100 dark:border-indigo-300/20",
  },
  {
    title: "City",
    href: "/admin/master-data/city",
    icon: "C",
    iconColor: "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-500/20 dark:text-teal-100 dark:border-teal-300/20",
  },
  {
    title: "Profession",
    href: "/admin/master-data/profession",
    icon: "P",
    iconColor: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-100 dark:border-amber-300/20",
  },
  {
    title: "Business Category",
    href: "/admin/master-data/business-category",
    icon: "BC",
    iconColor: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-500/20 dark:text-orange-100 dark:border-orange-300/20",
  },
  {
    title: "Activity",
    href: "/admin/master-data/activity",
    icon: "A",
    iconColor: "bg-green-100 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-100 dark:border-green-300/20",
  },
];

export default function MasterDataPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#7f1020] dark:text-white">
          Master Data Management
        </h1>

        <p className="mt-1 text-sm text-gray-600 dark:text-white/70">
          Manage the master data used throughout the ASK Community Portal.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {masterMenus.map((menu) => (
          <Link
            key={menu.title}
            href={menu.href}
            className="
              group
              rounded-2xl
              border border-[#b40018]/15
              bg-white/75
              p-5
              shadow-[0_8px_25px_rgba(127,16,32,0.10)]
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-[#b40018]/35
              hover:bg-white
              hover:shadow-[0_14px_35px_rgba(127,16,32,0.18)]
              dark:border-white/10
              dark:bg-white/5
              dark:shadow-lg
              dark:hover:border-red-400/40
              dark:hover:bg-white/10
              dark:hover:shadow-red-900/20
            "
          >
            <div className="flex items-center justify-between gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border font-bold ${menu.iconColor}`}
              >
                {menu.icon}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-base font-semibold text-[#64131f] dark:text-white">
                  {menu.title}
                </h2>

                <p className="mt-1 text-xs text-gray-500 dark:text-white/50">
                  Manage {menu.title.toLowerCase()}
                </p>
              </div>

              <span className="text-xl text-[#9b4a58] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#b40018] dark:text-white/40 dark:group-hover:text-red-300">
                &gt;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}