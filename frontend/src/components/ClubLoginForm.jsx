import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clubLogin } from "../api/clubApi"; // your API function

export default function ClubLoginForm({ setAuth }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await clubLogin(form.email, form.password);

      if (response.status === "success") {
        const { token, club } = response;

        const authObj = {
          userType: "club",
          token,
          club,
        };

        localStorage.setItem("auth", JSON.stringify(authObj));
        setAuth(authObj);
        navigate("/dashboard");
      } else {
        setError(response.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Club Login</h2>
        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Club Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="auth-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}