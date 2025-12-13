import { useState } from 'react';
import Sidebar from './components/Sidebar'; // ✅ Sidebar

export default function ProfileEditor({ profile, onSubmit }) {
  const [mission, setMission] = useState(profile?.mission || "");
  const [vision, setVision] = useState(profile?.vision || "");
  const [contactInfo, setContactInfo] = useState(profile?.contact_info || "");
  const [logo, setLogo] = useState(null);
  const [cover, setCover] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("mission", mission);
    formData.append("vision", vision);
    formData.append("contact_info", contactInfo);
    if (logo) formData.append("logo", logo);
    if (cover) formData.append("cover_photo", cover);
    onSubmit(formData);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ Sidebar Section */}
      <Sidebar />

      {/* ✅ Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Edit Club Profile</h2>
          <p className="text-gray-600 mb-6">
            Update your club’s mission, vision, and contact details below.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Mission */}
            <label className="block mb-2 font-medium text-gray-700">Mission</label>
            <input
              type="text"
              placeholder="Enter your club mission"
              className="mb-4 w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              value={mission}
              onChange={e => setMission(e.target.value)}
            />

            {/* Vision */}
            <label className="block mb-2 font-medium text-gray-700">Vision</label>
            <input
              type="text"
              placeholder="Enter your club vision"
              className="mb-4 w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              value={vision}
              onChange={e => setVision(e.target.value)}
            />

            {/* Contact Info */}
            <label className="block mb-2 font-medium text-gray-700">Contact Info</label>
            <input
              type="text"
              placeholder="Enter your contact details"
              className="mb-6 w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              value={contactInfo}
              onChange={e => setContactInfo(e.target.value)}
            />

            {/* Optional File Inputs */}
            <label className="block mb-2 font-medium text-gray-700">Logo Image</label>
            <input
              type="file"
              className="mb-4"
              accept="image/*"
              onChange={e => setLogo(e.target.files[0])}
            />

            <label className="block mb-2 font-medium text-gray-700">Cover Photo</label>
            <input
              type="file"
              className="mb-4"
              accept="image/*"
              onChange={e => setCover(e.target.files[0])}
            />

            {/* Save Button */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-lg shadow"
            >
              Save Profile
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
