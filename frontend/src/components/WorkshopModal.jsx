// src/components/WorkshopModal.jsx
export default function WorkshopModal({ workshop, onClose }) {
  if (!workshop) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[400px] p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {workshop.title}
        </h2>

        {/* Modal Body */}
        <div className="space-y-2 text-gray-700 text-sm">
          <p><strong>Description:</strong> {workshop.description}</p>
          <p><strong>Date:</strong> {workshop.date}</p>
          <p><strong>Duration:</strong> {workshop.duration}</p>
          <p><strong>Seats:</strong> {workshop.seats}</p>
          <p><strong>Enrolled:</strong> {workshop.enrolled}</p>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
