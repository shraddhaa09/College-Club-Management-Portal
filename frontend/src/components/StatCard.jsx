export default function StatCard({ icon, value, label, trend }) {
  return (
    <div className="flex flex-col justify-center items-start bg-white rounded-2xl shadow-md p-8 w-full max-w-xs">
      <div className="text-2xl text-purple-500">{icon}</div>
      <div className="mt-3 text-3xl font-extrabold">{value}</div>
      <div className="text-gray-500 mt-1">{label}</div>
      {trend && <div className="text-green-600 font-semibold mt-2">{trend}</div>}
    </div>
  );
}
