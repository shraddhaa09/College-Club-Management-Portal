// File: components/MemberTable.jsx
import { FaEdit, FaTrash } from "react-icons/fa";

const ROLE_OPTIONS = [
  "member",
  "president",
  "vice-president",
  "secretary",
  "treasurer"
];

export default function MemberTable({ data, onEdit, onDelete, onRoleChange, onView }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="text-gray-600 text-sm border-b">
          <tr>
            <th className="py-3 px-2">Name</th>
            <th className="py-3 px-2">Role</th>
            <th className="py-3 px-2">Department</th>
            <th className="py-3 px-2">Domain</th>
            <th className="py-3 px-2">Status</th>
            <th className="py-3 px-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No members found.
              </td>
            </tr>
          ) : (
            data.map((m) => (
              <tr key={m.id} className="border-b hover:bg-gray-50 transition duration-150">
                <td className="py-3 px-2 font-semibold">{m.name}</td>
                <td className="px-2">
                  <select
                    value={m.role}
                    onChange={e => onRoleChange && onRoleChange(m.id, e.target.value)}
                    className="border rounded px-2 py-1 bg-gray-50 text-sm"
                  >
                    {ROLE_OPTIONS.map(role => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-2 text-sm">{m.department || "—"}</td>
                <td className="px-2 text-sm">{m.domain || "—"}</td>
                <td className="px-2">
                  <span
                    className={`px-3 py-1 rounded-full font-bold text-xs ${
                      m.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
                <td className="flex gap-2 items-center justify-center py-2">
                  <button
                    className="p-2 hover:bg-blue-100 rounded transition"
                    onClick={() => onView && onView(m)}
                    title="View Details"
                  >
                    <svg
                      width="18"
                      height="18"
                      className="text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeWidth="2"
                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                        1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2
                        c0-2.66-5.33-4-8-4z"
                      />
                    </svg>
                  </button>
                  <button
                    className="p-2 hover:bg-purple-100 rounded transition"
                    onClick={() => onEdit && onEdit(m)}
                    title="Edit"
                  >
                    <FaEdit className="text-purple-600" />
                  </button>
                  <button
                    className="p-2 hover:bg-red-100 rounded transition"
                    onClick={() => onDelete && onDelete(m.id)}
                    title="Delete"
                  >
                    <FaTrash className="text-red-600" />
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
