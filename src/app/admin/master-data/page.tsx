import Link from "next/link";

const masterMenus = [
  {
    title: "Gotra",
    href: "/admin/master-data/gotra",
    color: "bg-blue-500",
  },
  {
    title: "Education",
    href: "/admin/master-data/education",
    color: "bg-green-500",
  },
  {
    title: "Occupation",
    href: "/admin/master-data/occupation",
    color: "bg-purple-500",
  },
  {
    title: "Blood Group",
    href: "/admin/master-data/blood-group",
    color: "bg-red-500",
  },
  {
    title: "State",
    href: "/admin/master-data/state",
    color: "bg-orange-500",
  },
  {
    title: "City",
    href: "/admin/master-data/city",
    color: "bg-cyan-500",
  },
  {
    title: "Profession",
    href: "/admin/master-data/profession",
    color: "bg-pink-500",
  },
  {
    title: "Business Category",
    href: "/admin/master-data/business-category",
    color: "bg-indigo-500",
  },
  {
    title: "Activity",
    href: "/admin/master-data/activity",
    color: "bg-yellow-500",
  },
];

export default function MasterDataPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Master Data Management
      </h1>

      <div className="grid grid-cols-4 gap-4">
        {masterMenus.map((item) => (
          <Link key={item.title} href={item.href}>
            <div
              className={`
                ${item.color}
                rounded-lg
                shadow-md
                hover:shadow-xl
                hover:scale-105
                transition-all
                duration-300
                cursor-pointer
                text-white
                p-4
                h-28
                flex
                flex-col
                justify-center
              `}
            >
              <h2 className="text-xl font-bold">
                {item.title}
              </h2>

              <p className="text-sm mt-2">
                Manage {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}