import React, { useState } from "react";
export default function EventForm({ event, onClose, onSubmit }) {
  const [form, setForm] = useState(
    event || {
      title: "",
      description: "",
      event_date: "",
      time: "",
      venue: "",
      status: "Upcoming"
    }
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form); // Make sure form has event_date!
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-7 rounded-lg shadow-xl w-[95vw] max-w-md">
        <h2 className="font-bold mb-3">{event ? "Edit" : "Add"} Event</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            maxLength={120}
            required
          />
          <div className="flex gap-2">
            <input
              type="date"
              name="event_date"
              value={form.event_date}
              onChange={handleChange}
              className="border rounded px-3 py-2 flex-1"
              required
            />
            {/* optional: keep time if you want—but not saved in backend */}
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="border rounded px-3 py-2 flex-1"
            />
          </div>
          <input
            name="venue"
            placeholder="Venue"
            value={form.venue}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option>Upcoming</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
          <div className="flex justify-between mt-1">
            <button className="bg-blue-600 text-white rounded px-5 py-2" type="submit">
              {event ? "Update" : "Add"}
            </button>
            <button className="bg-gray-200 px-5 py-2 rounded" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
