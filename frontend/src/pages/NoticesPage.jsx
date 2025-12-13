import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import NoticeList from '../components/NoticeList';
import NoticeForm from '../components/NoticeForm';
import { getNotices, addNotice, updateNotice, deleteNotice } from '../api/clubApi';

export default function NoticesPage() {
  const [notices, setNotices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔹 Load all notices on component mount
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const res = await getNotices();
      setNotices(res.notices || []);
      setError('');
    } catch (err) {
      setError('Failed to load notices');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingNotice(null);
    setShowForm(true);
  };

  const handleEditClick = (notice) => {
    setEditingNotice(notice);
    setShowForm(true);
  };

const handleDeleteClick = async (id) => {
  if (window.confirm('Are you sure you want to delete this notice?')) {
    try {
      const res = await deleteNotice(id);
      if (res.status === "success") {
        fetchNotices();
      } else {
        alert(res.message || "Failed to delete notice");
      }
    } catch (err) {
      alert(err.message); // Show backend message!
      console.error(err);
    }
  }
};


  const handleFormSubmit = async (data) => {
    try {
      const action = editingNotice ? updateNotice : addNotice;
      await action(data);
      setShowForm(false);
      setEditingNotice(null);
      fetchNotices(); // ✅ refresh after add/update
    } catch (err) {
      alert(err.message || 'Failed to save notice');
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">📢 Notices</h2>
          <button
            onClick={handleAddClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition"
          >
            + Add Notice
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center mt-10">Loading notices...</p>
        ) : error ? (
          <p className="text-red-500 text-center mt-10">{error}</p>
        ) : notices.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No notices found.</p>
        ) : (
          <NoticeList
            notices={notices}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        )}

        {showForm && (
          <NoticeForm
            notice={editingNotice}
            onSubmit={handleFormSubmit}
            onClose={() => {
              setShowForm(false);
              setEditingNotice(null);
            }}
          />
        )}
      </main>
    </div>
  );
}
