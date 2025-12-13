import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar'; // <-- ADD THIS LINE
import { getClubProfile, updateClubProfile } from '../api/clubApi';

export default function ClubProfilePage() {
  const [form, setForm] = useState({
    mission: '',
    vision: '',
    contact_info: ''
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getClubProfile()
      .then(res => {
        if (res.status === "success" && res.profile) {
          setForm({
            mission: res.profile.mission || '',
            vision: res.profile.vision || '',
            contact_info: res.profile.contact_info || ''
          });
        }
      })
      .catch(() => setError("Error loading profile"));
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setError("");
    setSuccess("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateClubProfile(form)
      .then(() => setSuccess("Profile updated!"))
      .catch(err => setError(err.message || "Update failed"));
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-start p-8">
        <div className="w-full max-w-xl">
          <h2 className="mb-2 text-2xl font-bold">Club Profile</h2>
          {error && <div className="mb-2 text-red-600">{error}</div>}
          {success && <div className="mb-2 text-green-600">{success}</div>}
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow space-y-6">
            <div>
              <label className="block font-bold mb-1">Mission</label>
              <textarea className="w-full border rounded px-2 py-1" name="mission" value={form.mission} onChange={handleInputChange} />
            </div>
            <div>
              <label className="block font-bold mb-1">Vision</label>
              <textarea className="w-full border rounded px-2 py-1" name="vision" value={form.vision} onChange={handleInputChange} />
            </div>
            <div>
              <label className="block font-bold mb-1">Contact Info</label>
              <input className="w-full border rounded px-2 py-1" name="contact_info" value={form.contact_info} onChange={handleInputChange} />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Profile</button>
          </form>
        </div>
      </main>
    </div>
  );
}
