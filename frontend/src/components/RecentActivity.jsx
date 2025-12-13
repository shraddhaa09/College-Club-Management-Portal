import { formatDistanceToNow } from "date-fns";
import { FaUserCircle, FaCalendarPlus, FaBell, FaStickyNote } from "react-icons/fa";

// Map "type" strings to icons/colors
const iconFor = (type) => {
  switch (type) {
    case "event": return <FaCalendarPlus className="text-blue-600" />;
    case "notice": return <FaStickyNote className="text-yellow-600" />;
    case "reminder": return <FaBell className="text-pink-600" />;
    default: return <FaUserCircle className="text-gray-400" />;
  }
};

export default function RecentActivity({ items }) {
  if (!items?.length) return <div className="text-gray-500 text-center py-8">No activity yet.</div>;

  return (
    <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow">
      {items.map((a, i) => (
        <li key={i} className="flex items-center px-6 py-4 hover:bg-blue-50 transition">
          <div className="mr-4 text-2xl">{iconFor(a.type)}</div>
          <div className="flex-1">
            <div className="font-bold capitalize">{a.title || a.type}</div>
            <div className="text-gray-500">{a.description}</div>
          </div>
          <div className="text-xs text-gray-400 min-w-fit">{a.timestamp ? formatDistanceToNow(new Date(a.timestamp), { addSuffix: true }) : null}</div>
        </li>
      ))}
    </ul>
  );
}
