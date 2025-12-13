// src/components/StatsHeader.jsx
export default function StatsHeader({ stats }) {
  return (
    <div className="flex gap-5 mb-6">
      <StatCard label="Total Events" value={stats.events || 0} />
      <StatCard label="Upcoming" value={stats.upcoming || 0} />
      <StatCard label="Notices" value={stats.notices || 0} />
      <StatCard label="Members" value={stats.members || 0} />
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded shadow p-5 w-48 flex flex-col items-center">
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
}
