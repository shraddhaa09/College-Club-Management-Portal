// src/components/NoticeList.jsx
export default function NoticeList({ notices, onEdit, onDelete }) {
  if (!notices || notices.length === 0)
    return <div className="bg-white p-6 rounded shadow">No notices found.</div>
  return (
    <div className="bg-white rounded shadow p-4">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Content</th>
            <th className="px-4 py-2 text-left">Created At</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {notices.map(nt => (
            <tr key={nt.id} className="border-t">
              <td className="px-4 py-2">{nt.title}</td>
              <td className="px-4 py-2">{nt.content}</td>
              <td className="px-4 py-2">{nt.created_at}</td>
              <td className="px-4 py-2">
                <button
                  className="text-blue-600 mr-2"
                  onClick={() => onEdit(nt)}>Edit</button>
                <button
                  className="text-red-600"
                  onClick={() => onDelete(nt.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
