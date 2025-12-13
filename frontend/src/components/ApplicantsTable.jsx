// File: components/ApplicantsTable.jsx
import React from "react";

export default function ApplicantsTable({ applicants, onApprove, onReject }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-10 overflow-x-auto">
      <h2 className="font-bold text-lg mb-4">Pending Applications</h2>
      <table className="w-full text-left border-collapse">
        <thead className="text-gray-600 text-sm border-b">
          <tr>
            <th className="py-3 px-2">Name</th>
            <th className="py-3 px-2">Department</th>
            <th className="py-3 px-2">Domain</th>
            <th className="py-3 px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applicants.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-400">
                No pending applicants.
              </td>
            </tr>
          ) : (
            applicants.map((app) => (
              <tr key={app.id} className="border-b hover:bg-gray-50 transition duration-150">
                <td className="py-3 px-2">{app.name}</td>
                <td className="py-3 px-2">{app.department || "—"}</td>
                <td className="py-3 px-2">{app.domain || "—"}</td>
                <td className="py-3 px-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => onApprove(app.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => onReject(app.id)}
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
  );
}
