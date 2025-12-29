import { useState, useEffect } from "react";
import { Save, RefreshCw } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { Button } from "../components/settings-ui/Button";
import { Input } from "../components/settings-ui/Input";
import { Label } from "../components/settings-ui/Label";
import { Textarea } from "../components/settings-ui/Textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/settings-ui/Card";
import { getSettings, updateSettings } from "../api/clubApi";

export default function Settings({ club, auth, setAuth }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    club_name: "",
    club_description: "",
    club_contact_email: "",
    club_mission: "",
    club_vision: "",
  });

  // ✅ Fetch settings from backend
  const fetchSettings = () => {
    setLoading(true);
    setError("");

    getSettings()
      .then((res) => {
        if (res.club) {
          setFormData({
            club_name: res.club.club_name || "",
            club_description: res.club.club_description || "",
            club_contact_email: res.club.club_contact_email || "",
            club_mission: res.club.mission || "",
            club_vision: res.club.vision || "",
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load settings");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (error) setError("");
    if (success) setSuccess("");
  };

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.club_name.trim()) {
      setError("Club name is required");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const dataToSend = {
      name: formData.club_name,
      description: formData.club_description,
      club_email: formData.club_contact_email,
      mission: formData.club_mission || "",
      vision: formData.club_vision || "",
    };

    updateSettings(dataToSend)
      .then(() => {
        setSuccess("Settings updated successfully!");
        fetchSettings();
      })
      .catch((err) => {
        setError(err.message || "Failed to update settings");
      })
      .finally(() => setSaving(false));
  };

  // ✅ Reset form
  const handleReset = () => {
    if (window.confirm("Are you sure you want to discard changes?")) {
      fetchSettings();
      setError("");
      setSuccess("");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar auth={auth} club={club} setAuth={setAuth} />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading settings...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar auth={auth} club={club} setAuth={setAuth} />
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-gray-500">
                Manage your club information and vision
              </p>
            </div>
            <Button variant="outline" onClick={handleReset} disabled={saving}>
              <RefreshCw style={{ width: 16, height: 16, marginRight: 8 }} />
              Reset
            </Button>
          </div>

          {/* Success Message */}
          {success && (
            <div className="px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          {/* Club Settings Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Club Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="club_name">Club Name *</Label>
                  <Input
                    id="club_name"
                    value={formData.club_name}
                    onChange={handleChange}
                    placeholder="Enter club name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="club_description">Description</Label>
                  <Textarea
                    id="club_description"
                    rows={4}
                    value={formData.club_description}
                    onChange={handleChange}
                    placeholder="Enter club description"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="club_contact_email">Contact Email</Label>
                  <Input
                    id="club_contact_email"
                    type="email"
                    value={formData.club_contact_email}
                    onChange={handleChange}
                    placeholder="Enter contact email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="club_mission">Mission</Label>
                  <Textarea
                    id="club_mission"
                    rows={3}
                    value={formData.club_mission}
                    onChange={handleChange}
                    placeholder="Enter club mission"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="club_vision">Vision</Label>
                  <Textarea
                    id="club_vision"
                    rows={3}
                    value={formData.club_vision}
                    onChange={handleChange}
                    placeholder="Enter club vision"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                disabled={saving}
              >
                <Save style={{ width: 16, height: 16, marginRight: 8 }} />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
