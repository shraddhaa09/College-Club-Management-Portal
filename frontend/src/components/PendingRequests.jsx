export default function PendingRequests({ requests, onApprove, onReject }) {
  if (!requests || requests.length === 0) 
    return <div className="bg-white p-4 rounded shadow mb-4">No pending requests.</div>;

  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">Pending Requests</h3>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Joined</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {requests.map(r => (
            <tr key={r.id} className="border-t">
              <td className="px-4 py-2">{r.name}</td>
              <td className="px-4 py-2">{r.email}</td>
              <td className="px-4 py-2">{r.joined_at}</td>
              <td className="px-4 py-2">
                <button
                  className="text-green-600 mr-2 hover:underline"
                  onClick={() => onApprove(r.id)}
                >
                  Approve
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => onReject(r.id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
