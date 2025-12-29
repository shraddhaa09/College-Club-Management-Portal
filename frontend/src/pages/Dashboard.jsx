import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  getDashboardData,
  uploadMemory,
  deleteMemory,
} from "../api/clubApi";        // ← single import line

import {
  Users,
  Calendar as CalendarIcon,
  TrendingUp,
  Clock,
  MapPin,
} from "lucide-react";
import { StatCard } from "../components/dashboard-ui/StatCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/dashboard-ui/Card";
import { Badge } from "../components/dashboard-ui/Badge";
import { Calendar } from "../components/dashboard-ui/calendar";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { set } from "date-fns";

const departmentColors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#a855f7", "#ec4899"];

// --------------------
// Memory uploader
// --------------------
function MemoryUploader({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploaded_at, setUploaded_at] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    try {
      setUploading(true);
      const photo = await uploadMemory({ file, caption, uploaded_at: new Date() });
      onUploaded(photo);
      setFile(null);
      setCaption("");
      setUploaded_at
      (new Date());
    } catch (err) {
      alert(err.message || "Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-3 items-start"
    >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0] || null)}
        className="text-sm"
      />
      <input
        type="text"
        placeholder="Caption (optional)"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="border rounded px-2 py-1 text-sm flex-1"
      />
      <button
        type="submit"
        disabled={!file || uploading}
        className="bg-purple-600 text-white text-sm px-3 py-1 rounded disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}

export default function Dashboard({ club, setAuth }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState("");
  const [memories, setMemories] = useState([]);
  const [memoryIndex, setMemoryIndex] = useState(0);
  var currentDate;

  // Fetch dashboard data (including memories)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
        if (data.memories) setMemories(data.memories);
      } catch (err) {
        setError(err.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto-rotate memories
  useEffect(() => {
    if (!memories || memories.length === 0) return;
    const interval = setInterval(() => {
      setMemoryIndex((prev) => (prev + 1) % memories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [memories]);

  if (loading)
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar club={club} setAuth={setAuth} />
        <main className="flex-1 p-8 text-center py-20 text-xl">
          Loading dashboard...
        </main>
      </div>
    );

  if (error || !dashboardData)
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar club={club} setAuth={setAuth} />
        <main className="flex-1 p-8 text-center py-20 text-red-600 text-xl">
          {error || "Failed to load dashboard"}
        </main>
      </div>
    );


  const getEventsForDate = (date) =>
    dashboardData.upcomingEvents?.filter(
      (event) =>
        new Date(event.event_date).toDateString() ===
        date.toDateString()
    ) || [];

  const hasEventOnDate = (date) =>
    dashboardData.upcomingEvents?.some(
      (event) =>
        new Date(event.event_date).toDateString() ===
        date.toDateString()
    ) || false;

  const deptDataWithColors =
    dashboardData.departmentDistribution?.map((dept, index) => ({
      ...dept,
      color: departmentColors[index % departmentColors.length],
    })) || [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar club={club} setAuth={setAuth} />
      <main className="flex-1 p-8 ml-64">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome Back, {club?.name || "Club"}!
          </h1>
          <p className="text-gray-500">
            Monitor your club&apos;s performance and activities
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Club Members"
            value={dashboardData?.clubMembers || 0}
            icon={Users}
            trend="+8 this month"
          />
          <StatCard
            title="Our Events"
            value={dashboardData?.clubEvents || 0}
            icon={CalendarIcon}
            trend="2 upcoming"
          />
          <StatCard
            title="Avg Attendance"
            value={dashboardData?.avgAttendance || 0}
            icon={TrendingUp}
            trend="+5% from last month"
          />
        </div>

        {/* Calendar & Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Events Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border w-full"
                modifiers={{ hasEvent: hasEventOnDate }}
                modifiersStyles={{
                  hasEvent: {
                    backgroundColor: "#dbeafe",
                    fontWeight: "bold",
                    color: "#1e40af",
                  },
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Events on{" "}
                {selectedDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getEventsForDate(selectedDate).length > 0 ? (
                getEventsForDate(selectedDate).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-gray-50 transition cursor-pointer"
                  >
                    <div
                      className={`h-12 w-12 rounded-lg ${
                        event.isOwnClub
                          ? "bg-green-100"
                          : "bg-purple-100"
                      } flex items-center justify-center flex-shrink-0`}
                    >
                      <CalendarIcon
                        className={
                          event.isOwnClub
                            ? "text-green-600"
                            : "text-purple-600"
                        }
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium truncate">
                          {event.title || "Untitled Event"}
                        </h4>
                        {event.isOwnClub ? (
                          <Badge variant="success">Your Club</Badge>
                        ) : (
                          <Badge variant="secondary">
                            {event.clubName || "Other Club"}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock style={{ width: 12, height: 12 }} />
                          {event.time || "TBA"}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin style={{ width: 12, height: 12 }} />
                          {event.location || "TBA"}
                        </span>
                      </div>
                      <div className="mt-2">
                        <Badge variant="outline">
                          {event.attendees || 0} attending
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No events scheduled for this date
                </div>
              )}
            </CardContent>
          </Card>
        </div>

       {/* Event Memories */}
<Card className="mb-8">
  <CardHeader>
    <CardTitle>Event Memories</CardTitle>
  </CardHeader>

  <CardContent>
    <MemoryUploader onUploaded={(photo) => setMemories(prev => [photo, ...prev])} />

    {memories.length === 0 ? (
      <p className="text-gray-500 mt-4">No memories yet. Upload your first event photo!</p>
    ) : (
      <div className="mt-6 flex flex-col md:flex-row gap-6 items-center">

        {/* Main Image + Navigation */}
        <div className="w-full md:w-2/3 relative">
          <div className="relative rounded-xl overflow-hidden shadow group">
           
            <img
              key={memoryIndex} 
               src={`http://localhost/cllgclub/backend/${memories[memoryIndex].file_path}`}
               alt={memories[memoryIndex].caption || "Event memory"}
              className="w-full h-80 object-cover transition-opacity duration-500 opacity-100"
            />

            {/* Caption */}
            {memories[memoryIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2">
                {memories[memoryIndex].caption}
              </div>
            )}

            {/* Left / Right Arrows */}
            <button
              onClick={() => setMemoryIndex((memoryIndex - 1 + memories.length) % memories.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 px-2 py-1 rounded-full shadow hidden group-hover:block"
            >
              ←
            </button>
            <button
              onClick={() => setMemoryIndex((memoryIndex + 1) % memories.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 px-2 py-1 rounded-full shadow hidden group-hover:block"
            >
              →
            </button>
          </div>
        </div>

        {/* Thumbnail List */}
        <div className="w-full md:w-1/3 max-h-80 overflow-y-auto space-y-2">
          {memories.map((photo, idx) => (
            <div
            key={photo.id}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                idx === memoryIndex ? "bg-purple-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setMemoryIndex(idx)}
            >
              <img
                src={`http://localhost/cllgclub/backend/${photo.file_path}`}
                alt={photo.caption || "thumb"}
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex-1">
                <div className="text-sm font-medium truncate">
                  {photo.caption || "Event memory"}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(photo.uploaded_at).toLocaleDateString() }
                  {/* {new Date(photo.uploaded_at || photo.photo.uploaded_at).toLocaleDateString()} */}
                  
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!window.confirm("Delete this photo?")) return;

                  deleteMemory(photo.id)
                    .then(() => {
                      setMemories(prev => prev.filter((p) => p.id !== photo.id));
                      setMemoryIndex(0);
                    })
                    .catch((err) => alert(err.message));
                }}
                className="text-xs text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    )}
  </CardContent>
</Card>


        {/* Department Distribution */}
<Card className="mb-8">
  <CardHeader>
    <CardTitle>Department Distribution</CardTitle>
  </CardHeader>

  <CardContent>
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={deptDataWithColors}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={110}
          innerRadius={50}
          paddingAngle={5}
        >
          {deptDataWithColors.map((entry, index) => (
            <Cell
              key={index}
              fill={entry.color}
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>

        {/* Hover Tooltip */}
      </PieChart>
    </ResponsiveContainer>

    {/* Legend */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
      {deptDataWithColors.map((d, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="block w-3 h-3 rounded-full"
            style={{ backgroundColor: d.color }}
          />
          <span className="text-sm">{d.department} ({d.value})</span>
        </div>
      ))}
    </div>
  </CardContent>
</Card>

      </main>
    </div>
  );
}
