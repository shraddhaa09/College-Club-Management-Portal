import React from "react";
export default function EventList({ events, onEdit, onDelete, onViewParticipants }) {
  if (events.length === 0) {
    return <div className="text-gray-400 text-center py-16">No events found.</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
      {events.map(ev => (
        <div key={ev.id} className="bg-white shadow rounded-lg p-6 flex flex-col gap-2 relative">
          <span
            className="absolute top-5 right-6 py-1 px-4 rounded-full text-white text-xs font-bold"
            style={{
              background:
                ev.status === "Upcoming"
                  ? "#2788F6"
                  : ev.status === "Completed"
                  ? "#55cc99"
                  : "#e57373"
            }}
          >
            {ev.status}
          </span>
          <h3 className="text-blue-900 font-bold text-lg mb-1">{ev.title}</h3>
          <div className="flex gap-2 text-blue-700 text-sm"><span>📅 {ev.date} ⏰ {ev.time}</span></div>
          <div className="text-blue-500 text-xs mb-2">🏛️ {ev.venue}</div>
          <div className="text-gray-700 mb-2">
            {ev.description.length > 90 ? ev.description.slice(0, 90) + "..." : ev.description}
          </div>
          <div className="flex gap-3 mt-2">
            <button className="hover:text-blue-600" title="Edit" onClick={() => onEdit(ev)}>✏️</button>
            <button className="hover:text-red-600" title="Delete" onClick={() => onDelete(ev.id)}>🗑️</button>
            <button className="hover:text-indigo-600" title="View Participants" onClick={() => onViewParticipants(ev)}>👥</button>
          </div>
        </div>
      ))}
    </div>
  );
}
