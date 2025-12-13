import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm";
import { fetchEvents, addEvent, updateEvent, deleteEvent } from "../api/eventsApi";

export default function EventsPage({ club, logout }) {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [popupEvent, setPopupEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setError("");
    try {
      const data = await fetchEvents();
      if (data.status === "success") setEvents(data.events || []);
      else setError(data.message || "Failed to load events.");
    } catch (err) {
      console.error("Error loading events:", err);
      setError("Error loading events. Please check your connection.");
    }
  };

  const filteredEvents = events.filter(
    (ev) =>
      ev.title.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" ||
        (filter === "Upcoming" && ev.status === "Upcoming") ||
        (filter === "Past" && ev.status !== "Upcoming"))
  );

  const handleAdd = () => setPopupEvent({ title: "", description: "", date: "", status: "Upcoming" });
  const handleEdit = (event) => setPopupEvent(event);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    deleteEvent(id)
      .then((data) => {
        if (data.status === "success") loadEvents();
        else alert(data.message || "Failed to delete event");
      })
      .catch((err) => console.error(err));
  };

  const handleFormSubmit = (data) => {
    const eventData = { ...data, club_id: club?.user_id };

    const apiCall = data.id ? updateEvent : addEvent;
    apiCall(eventData)
      .then((res) => {
        if (res.status === "success") loadEvents();
        else alert(res.message || "Operation failed");
      })
      .catch((err) => console.error(err));

    setPopupEvent(null);
  };

  const handleViewParticipants = (event) => {
    alert("Participants feature coming soon for: " + event.title);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar auth={club} setAuth={logout} />

      <main className="flex-1 p-8 ml-64 bg-gray-100">
        {/* Header + Add Event */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-800">Events</h1>
          <button
            className="bg-blue-600 px-5 py-2 text-white rounded hover:bg-blue-700"
            onClick={handleAdd}
          >
            + Add Event
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">{error}</div>
        )}

        {/* Search + Filter */}
        <div className="flex gap-3 mb-5">
          <input
            className="border px-3 py-2 rounded flex-1"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border px-2 py-2 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Past">Past Events</option>
          </select>
        </div>

        {/* Event List */}
        <EventList
          events={filteredEvents}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewParticipants={handleViewParticipants}
        />

        {/* Event Form Popup */}
        {popupEvent && (
          <EventForm
            event={popupEvent.id ? popupEvent : undefined}
            onClose={() => setPopupEvent(null)}
            onSubmit={handleFormSubmit}
          />
        )}
      </main>
    </div>
  );
}
