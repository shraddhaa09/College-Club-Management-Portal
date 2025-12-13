import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getMembers, updateMember } from "../api/clubApi";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

export default function MembersPage({ club, setAuth }) {
  const [members, setMembers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterDomain, setFilterDomain] = useState("All");
  const [sortBy, setSortBy] = useState("joined");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    try {
      setLoading(true);
      const res = await getMembers();
      setMembers(res.members);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch members");
    } finally {
      setLoading(false);
    }
  }

  // Filter/search/sort ACTIVE members only
  useEffect(() => {
    let temp = members.filter(m => m.status === "active");
    if (search.trim()) {
      temp = temp.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filterDept !== "All") temp = temp.filter((m) => m.department === filterDept);
    if (filterDomain !== "All") temp = temp.filter((m) => m.domain === filterDomain);

    if (sortBy === "name") temp.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "joined")
      temp.sort((a, b) => new Date(b.joined) - new Date(a.joined));

    setFiltered(temp);
  }, [search, filterDept, filterDomain, sortBy, members]);

  const total = members.length;
  const activeCount = members.filter((m) => m.status === "active").length;
  const pendingCount = members.filter((m) => m.status === "pending").length;
  const removedCount = members.filter((m) => m.status === "removed").length;

  const domains = [...new Set(members.map((m) => m.domain))];
  const domainData = domains.map((d) => ({
    name: d || "Unassigned",
    value: members.filter((m) => m.domain === d).length,
  }));

  async function handleRoleChange(id, newRole) {
    try {
      await updateMember({ id, role: newRole });
      alert("Role updated successfully!");
      loadMembers();
    } catch (err) {
      console.error(err);
      alert("Failed to update role");
    }
  }

  async function handleStatusChange(id, newStatus) {
    try {
      await updateMember({ id, status: newStatus });
      alert("Status updated successfully!");
      loadMembers();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  }

  // Only pending users
  const pendingApplicants = members.filter(m => m.status === "pending");

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar auth={club} setAuth={setAuth} />
        <main className="flex-1 p-8 text-center py-20 text-xl">Loading members...</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar auth={club} setAuth={setAuth} />
      <main className="flex-1 p-8 ml-64 space-y-10">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-blue-100 rounded-xl p-4 shadow">
            <h3 className="text-xl font-semibold">Total Members</h3>
            <p className="text-2xl">{total}</p>
          </div>
          <div className="bg-green-100 rounded-xl p-4 shadow">
            <h3 className="text-xl font-semibold">Active</h3>
            <p className="text-2xl">{activeCount}</p>
          </div>
          <div className="bg-yellow-100 rounded-xl p-4 shadow">
            <h3 className="text-xl font-semibold">Pending</h3>
            <p className="text-2xl">{pendingCount}</p>
          </div>
          <div className="bg-red-100 rounded-xl p-4 shadow">
            <h3 className="text-xl font-semibold">Removed</h3>
            <p className="text-2xl">{removedCount}</p>
          </div>
        </div>

        {/* Filters/Search */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="border rounded-lg px-3 py-2 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-3">
            <select className="border p-2 rounded" onChange={(e) => setFilterDept(e.target.value)}>
              <option>All</option>
              {[...new Set(members.map((m) => m.department))].map((dept) => (
                <option key={dept}>{dept}</option>
              ))}
            </select>
            <select className="border p-2 rounded" onChange={(e) => setFilterDomain(e.target.value)}>
              <option>All</option>
              {domains.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <select className="border p-2 rounded" onChange={(e) => setSortBy(e.target.value)}>
              <option value="joined">Sort by Joined</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* Members Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Domain</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-400">No active members found.</td>
                </tr>
              ) : (
                filtered.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="border p-2">{m.name}</td>
                    <td className="border p-2">{m.email}</td>
                    <td className="border p-2">{m.department}</td>
                    <td className="border p-2">{m.domain}</td>
                    <td className="border p-2">
                      <select
                        className="border p-1 rounded"
                        value={m.role}
                        onChange={(e) => handleRoleChange(m.id, e.target.value)}
                      >
                        <option>member</option>
                        <option>officer</option>
                        <option>president</option>
                        <option>vice-president</option>
                        <option>secretary</option>
                        <option>treasurer</option>
                      </select>
                    </td>
                    <td className="border p-2">{new Date(m.joined).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pending Applicants Table */}
        <div className="overflow-x-auto mt-8">
          <h2 className="font-bold text-lg mb-4">Pending Applications</h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Domain</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingApplicants.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">
                    No pending applicants.
                  </td>
                </tr>
              ) : (
                pendingApplicants.map(app => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="border p-2">{app.name}</td>
                    <td className="border p-2">{app.email}</td>
                    <td className="border p-2">{app.department}</td>
                    <td className="border p-2">{app.domain}</td>
                    <td className="border p-2">
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => handleStatusChange(app.id, "active")}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleStatusChange(app.id, "removed")}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Domain Pie Chart */}
        <div className="mt-8 bg-white p-4 rounded-xl shadow-md w-full h-80">
          <h3 className="text-center font-semibold text-lg mb-2">Domain Distribution</h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                dataKey="value"
                data={domainData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {domainData.map((_, index) => (
                  <Cell key={index} fill={`hsl(${index * 40}, 70%, 60%)`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
