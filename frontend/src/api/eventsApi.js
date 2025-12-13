// 📁 backend/api endpoints base
const API_BASE = "http://localhost/cllgclub/backend/api";

// ------------------------------
// 🔐 Get Auth Headers (JWT-based)
// ------------------------------
function getAuthHeaders() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token; // single source of truth

  if (!token) {
    console.error("❌ No token found! Please log in again.");
    // Optionally redirect:
    // window.location.href = "/club-login";
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// --------------------
// 📦 Event API Helpers
// --------------------
export async function fetchEvents() {
  const res = await fetch(`${API_BASE}/getEvents.php`, { // ✅ same as backend filename
    method: "GET",
    headers: getAuthHeaders(),
  });
  return res.json();
}


export async function addEvent(event) {
  const res = await fetch(`${API_BASE}/addEvent.php`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(event),
  });
  return res.json();
}

export async function updateEvent(event) {
  const res = await fetch(`${API_BASE}/updateEvent.php`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(event),
  });
  return res.json();
}


export async function deleteEvent(id) {
  const res = await fetch(`${API_BASE}/deleteEvent.php?id=${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    // DELETE requests should not have a body for PHP
  });
  return res.json();
}
