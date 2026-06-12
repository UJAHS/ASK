export default function DashboardPage() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-5">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Total Members
          </h2>

          <div className="text-4xl font-bold mt-3">
            0
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Pending Approval
          </h2>

          <div className="text-4xl font-bold mt-3">
            0
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            News
          </h2>

          <div className="text-4xl font-bold mt-3">
            0
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold">
            Activities
          </h2>

          <div className="text-4xl font-bold mt-3">
            0
          </div>
        </div>

      </div>

    </div>
  );
}