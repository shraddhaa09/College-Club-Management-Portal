import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { FaPlus, FaClock, FaUserFriends, FaTrash, FaEdit } from "react-icons/fa";
import { Button } from "../components/workshop-ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/workshop-ui/Card";
import { Badge } from "../components/workshop-ui/Badge";
import { getWorkshops, addWorkshop, deleteWorkshop, updateWorkshop } from "../api/workshopApi";
import WorkshopModal from "../components/WorkshopModal";

export default function Workshops({ club, setAuth }) {
  const [workshops, setWorkshops] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", date: "", duration: "", seats: 0, enrolled: 0, type: ""
  });
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchList(); }, []);

  async function fetchList() {
    try {
      setLoading(true);
      const res = await getWorkshops();
      if (res.status === "success") setWorkshops(res.workshops || []);
      else setAlert({ message: res.message || "Failed to fetch workshops", type: "error" });
    } catch (err) {
      setAlert({ message: err.message || "Server error while loading workshops", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => setAlert({ message: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  function handleChange(e) {
    const value = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setForm(f => ({ ...f, [e.target.name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setAlert({ message: "", type: "" });

    try {
      let res;
      if (isEdit) res = await updateWorkshop({ ...form, id: selectedWorkshop.id });
      else res = await addWorkshop(form);

      if (res.status === "success") {
        setAlert({ message: res.message || (isEdit ? "Workshop updated successfully!" : "Workshop added successfully!"), type: "success" });
        fetchList();
        setModal(false);
        setIsEdit(false);
        setSelectedWorkshop(null);
        resetForm();
      } else {
        setAlert({ message: res.message || "Operation failed", type: "error" });
      }
    } catch (err) {
      setAlert({ message: err.message || "Server error", type: "error" });
    }
  }

  function resetForm() {
    setForm({ title: "", description: "", date: "", duration: "", seats: 0, enrolled: 0, type: "" });
  }

  function handleViewDetails(workshop) {
    setSelectedWorkshop(workshop);
    setShowDetails(true);
  }

  function handleEdit(workshop) {
    setSelectedWorkshop(workshop);
    setForm({
      title: workshop.title, description: workshop.description, date: workshop.date,
      duration: workshop.duration, seats: workshop.seats, enrolled: workshop.enrolled, type: workshop.type
    });
    setIsEdit(true);
    setModal(true);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this workshop?")) return;
    try {
      const res = await deleteWorkshop(id);
      if (res.status === "success") {
        setAlert({ message: "Workshop deleted successfully!", type: "success" });
        fetchList();
      } else setAlert({ message: res.message || "Failed to delete workshop", type: "error" });
    } catch (err) {
      setAlert({ message: err.message || "Server error occurred", type: "error" });
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar auth={club} setAuth={setAuth} />

      <main className="flex-1 p-8 ml-64">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Workshops</h1>
              <p className="text-gray-500">Manage and schedule workshops</p>
            </div>
            <Button onClick={() => { resetForm(); setIsEdit(false); setModal(true); }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 shadow hover:scale-105 transition">
              <FaPlus className="h-4 w-4 mr-2" /> Add Workshop
            </Button>
          </div>

          {alert.message && (
            <div className={`px-4 py-2 rounded text-center font-medium border ${alert.type === "error" ? "bg-red-50 border-red-200 text-red-700" : "bg-green-50 border-green-200 text-green-700"}`}>
              {alert.message}
            </div>
          )}

          {loading && <div className="text-gray-500 text-center mt-4">Loading workshops...</div>}

          {modal && (
            <form className="bg-white p-6 rounded-2xl shadow max-w-lg mb-8" onSubmit={handleSubmit}>
              <h2 className="text-xl font-bold mb-4">{isEdit ? "Edit Workshop" : "Add Workshop"}</h2>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="block border rounded p-2 mb-2 w-full"
                required
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="block border rounded p-2 mb-2 w-full"
                required
              />

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="block border rounded p-2 mb-2 w-full"
                required
              >
                <option value="">Select Type</option>
                <option value="Workshop">Workshop</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Competition">Competition</option>
                <option value="Event">Event</option>
              </select>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="block border rounded p-2 mb-2 w-full"
                required
              />

              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="Duration (e.g. 2 hrs)"
                className="block border rounded p-2 mb-2 w-full"
                required
              />

              <input
                type="number"
                name="seats"
                value={form.seats}
                onChange={handleChange}
                placeholder="Seats"
                min={1}
                className="block border rounded p-2 mb-2 w-full"
                required
              />

              <input
                type="number"
                name="enrolled"
                value={form.enrolled}
                onChange={handleChange}
                placeholder="Enrolled"
                min={0}
                className="block border rounded p-2 mb-2 w-full"
                required
              />

              <div className="flex gap-2">
                <Button type="submit">{isEdit ? "Save" : "Add"}</Button>
                <Button type="button" variant="outline" onClick={() => { setModal(false); setIsEdit(false); }}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {workshops.length > 0 ? workshops.map((workshop) => (
              <Card key={workshop.id} className="border-0 bg-white/80 shadow-lg transition-smooth hover:scale-105 flex flex-col">
                <CardHeader>
                  {workshop.type && <Badge variant="purple" className="capitalize mb-2">{workshop.type}</Badge>}
                  <CardTitle className="text-xl">{workshop.title}</CardTitle>
                  <p className="text-sm text-gray-500">{workshop.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Date</span>
                      <Badge variant="outline">{workshop.date}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaClock className="h-4 w-4" /> <span>{workshop.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaUserFriends className="h-4 w-4" /> <span>{workshop.enrolled}/{workshop.seats} enrolled</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" onClick={() => handleViewDetails(workshop)}>View Details</Button>
                      <Button variant="outline" onClick={() => handleEdit(workshop)}><FaEdit /></Button>
                      <Button variant="outline" onClick={() => handleDelete(workshop.id)}><FaTrash /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) : <p className="text-center text-gray-500 col-span-full">No workshops available.</p>}
          </div>

          {showDetails && <WorkshopModal workshop={selectedWorkshop} onClose={() => setShowDetails(false)} />}
        </div>
      </main>
    </div>
  );
}
