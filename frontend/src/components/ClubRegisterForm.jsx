import { useState } from "react";
import { clubRegister } from "../api/authApi";
export default function ClubRegisterForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    club_email: "",
    club_password: "",
    mission: "",
    vision: "",
    contact_info: ""
  });
  const [loading, setLoading] = useState(false);
  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await clubRegister(form);
    alert("Club registered! You can now log in.");
    setForm({
      name: "", description: "", club_email: "", club_password: "",
      mission: "", vision: "", contact_info: ""
    });
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} required />
      <input name="club_email" type="email" value={form.club_email} onChange={handleChange} required />
      <input name="club_password" type="password" value={form.club_password} onChange={handleChange} required />
      <input name="description" value={form.description} onChange={handleChange} />
      <input name="mission" value={form.mission} onChange={handleChange} />
      <input name="vision" value={form.vision} onChange={handleChange} />
      <input name="contact_info" value={form.contact_info} onChange={handleChange} />
      <button type="submit" disabled={loading}>Register</button>
    </form>
  );
}
