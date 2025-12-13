const BASE_URL = "http://localhost/cllgclub/backend/api";


// -------------------------------------
// 🔑 Universal JWT Auth Header Helper
// -------------------------------------
function getAuthHeaders() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;
  if (!token) throw new Error("No token found. Please login.");
  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
  };
}


// -------------------------------------
// 🛠️ Common Fetch Helper (ALWAYS adds JWT automatically)
// -------------------------------------
async function fetchApi(endpoint, options = {}) {
  const mergedHeaders = { ...getAuthHeaders(), ...(options.headers || {}) };
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    credentials: "include",
    ...options,
    headers: mergedHeaders,
  });

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    const text = await response.text();
    throw new Error(text || "Unknown server response");
  }
}


// -------------------------------------
// CLUB AUTHENTICATION
// -------------------------------------
export async function clubLogin({ club_email, club_password }) {
  const res = await fetch(`${BASE_URL}/clubLogin.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      club_email: String(club_email).trim(),
      club_password: String(club_password).trim(),
    }),
  });
  const data = await res.json();
  return data;
}

export async function clubRegister(clubData) {
  const res = await fetch(`${BASE_URL}/clubRegister.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clubData),
  });
  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message || "Registration failed");
  return data;
}

export async function logoutClub() {
  const res = await fetch(`${BASE_URL}/logout.php`, {
    method: "POST",
    credentials: "include",
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message || "Logout failed");
  return data;
}


// -------------------------------------
// CLUB PROFILE
// -------------------------------------
export const getClubProfile = async () => {
  const res = await fetchApi("getClubProfile.php");
  if (res.status !== "success") throw new Error(res.message || "Failed to fetch profile");
  return res;
};

export const updateClubProfile = async (data) => {
  const options =
    data instanceof FormData
      ? { method: "POST", body: data, headers: getAuthHeaders() }
      : { method: "POST", body: JSON.stringify(data) };
  const res = await fetchApi("updateClubProfile.php", options);
  if (res.status !== "success") throw new Error(res.message || "Failed to update profile");
  return res;
};


// -------------------------------------
// EVENTS
// -------------------------------------
export const getEvents = async () => {
  const res = await fetchApi("getEvents.php");
  if (res.status !== "success") throw new Error(res.message || "Failed to fetch events");
  return res;
};

export const addEvent = async (data) => {
  const res = await fetchApi("addEvent.php", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (res.status !== "success") throw new Error(res.message || "Failed to add event");
  return res;
};

export const updateEvent = async (data) => {
  const res = await fetchApi("updateEvent.php", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (res.status !== "success") throw new Error(res.message || "Failed to update event");
  return res;
};

export const deleteEvent = async (id) => {
  const res = await fetchApi("deleteEvent.php", {
    method: "POST",
    body: JSON.stringify({ id }),
  });
  if (res.status !== "success") throw new Error(res.message || "Failed to delete event");
  return res;
};


// -------------------------------------
// WORKSHOPS
// -------------------------------------
export const getWorkshops = async () => {
  const res = await fetchApi("getWorkshops.php");
  if (res.status !== "success") throw new Error(res.message || "Failed to fetch workshops");
  return res;
};

export const addWorkshop = async (data) => {
  const res = await fetchApi("addWorkshop.php", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (res.status !== "success") throw new Error(res.message || "Failed to add workshop");
  return res;
};

export const updateWorkshop = async (data) => {
  const res = await fetchApi("updateWorkshop.php", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (res.status !== "success") throw new Error(res.message || "Failed to update workshop");
  return res;
};

export const deleteWorkshop = async (workshop_id) => {
  const res = await fetchApi("deleteWorkshop.php", {
    method: "POST",
    body: JSON.stringify({ workshop_id }),
  });
  if (res.status !== "success") throw new Error(res.message || "Failed to delete workshop");
  return res;
};


// -------------------------------------
// EXPORTS
// -------------------------------------
export const exportClubMembers = () =>
  (window.location = `${BASE_URL}/exportClubMembers.php`);

export const exportClubEvents = () =>
  (window.location = `${BASE_URL}/exportClubEvents.php`);

export const exportEventParticipants = (event_id) =>
  (window.location = `${BASE_URL}/exportEventParticipants.php?event_id=${event_id}`);


// -------------------------------------
// DASHBOARD
// -------------------------------------
export async function getDashboardData() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;
  if (!token) throw new Error("No token found in localStorage");

  const response = await fetch(`${BASE_URL}/getDashboard.php`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "X-Requested-With": "XMLHttpRequest"
    }
  });

  return await response.json();
}


// -------------------------------------
// MEMBERS MANAGEMENT
// -------------------------------------
export const getMembers = async () => {
  const res = await fetchApi("getMembers.php");
  if (res.status !== "success") throw new Error(res.message || "Failed to fetch members");
  return res;
};

export const addMember = async (data) => {
  const res = await fetchApi("addMember.php", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (res.status !== "success") throw new Error(res.message || "Failed to add member");
  return res;
};

export const updateMember = async (data) => {
  const res = await fetchApi("updateMember.php", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (res.status !== "success") throw new Error(res.message || "Failed to update member");
  return res;
};

export const removeMember = async (user_id) => {
  if (!user_id) throw new Error("user_id is required");
  const res = await fetchApi("removeMember.php", {
    method: "POST",
    body: JSON.stringify({ user_id }),
  });
  if (res.status !== "success") throw new Error(res.message || "Failed to remove member");
  return res;
};

export const getMembershipRequests = async () => {
  const res = await fetchApi("getMembershipRequests.php");
  if (res.status !== "success") throw new Error(res.message || "Failed to fetch membership requests");
  return res;
};

export const approveMembership = async ({ membership_id, action }) => {
  if (!membership_id || !action) throw new Error("membership_id and action are required");
  const res = await fetchApi("approveMembership.php", {
    method: "POST",
    body: JSON.stringify({ membership_id, action }),
  });
  if (res.status !== "success") throw new Error(res.message || "Failed to approve membership");
  return res;
};

export const assignMemberRole = async ({ user_id, role }) => {
  if (!user_id || !role) throw new Error("user_id and role are required");
  const res = await fetchApi("assignMemberRole.php", {
    method: "POST",
    body: JSON.stringify({ user_id, role }),
  });
  if (res.status !== "success") throw new Error(res.message || "Failed to assign role");
  return res;
};


// -------------------------------------
// NOTICES
// -------------------------------------
export const getNotices = async () => {
  const res = await fetchApi("getNotices.php");
  if (res.status !== "success") throw new Error(res.message || "Failed to fetch notices");
  return res;
};

export const addNotice = async (data) => {
  const res = await fetchApi("addNotice.php", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (res.status !== "success") throw new Error(res.message || "Failed to add notice");
  return res;
};

export const updateNotice = async (data) => {
  const res = await fetchApi("updateNotice.php", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (res.status !== "success") throw new Error(res.message || "Failed to update notice");
  return res;
};

export const deleteNotice = async (notice_id) => {
  const res = await fetchApi("deleteNotice.php", {
    method: "POST",
    body: JSON.stringify({ notice_id }),
  });
  if (res.status !== "success") throw new Error(res.message || "Failed to delete notice");
  return res;
};


// -------------------------------------
// MEMORIES (Photos)
// -------------------------------------
export async function uploadMemory({ file, caption, event_id }) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;
  if (!token) throw new Error("No token");

  const formData = new FormData();
  formData.append("image", file);
  if (caption) formData.append("caption", caption);
  if (event_id) formData.append("event_id", event_id);

  const res = await fetch(`${BASE_URL}/uploadMemory.php`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
    credentials: "include",
  });

  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message || "Failed to upload memory");
  return data.photo;
}

export async function getMemories() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;
  if (!token) throw new Error("No token");

  const res = await fetch(`${BASE_URL}/getMemories.php`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });

  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message || "Failed to fetch memories");
  return data.photos;
}

export async function deleteMemory(id) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;
  if (!token) throw new Error("No token");

  const res = await fetch(`${BASE_URL}/deleteMemory.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  });

  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message || "Failed to delete memory");
  return true;
}


// -------------------------------------
// SETTINGS (Club Settings Management)
// -------------------------------------
//const SETTINGS_BASE = `${BASE_URL}/settings`;

export async function getSettings() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth || !auth.token) throw new Error("No token found");

  const res = await fetch(`${BASE_URL}/getSettings.php`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch settings: ${errText}`);
  }

  const data = await res.json();
  if (data.status !== "success") {
    throw new Error(data.message || "Failed to fetch settings");
  }

  return { club: data.club };
}

export async function updateSettings(formData) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth || !auth.token) throw new Error("No token found");

  const res = await fetch(`${BASE_URL}/updateSettings.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.token}`,
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to update settings: ${errText}`);
  }

  const data = await res.json();
  if (data.status !== "success") {
    throw new Error(data.message || "Failed to update settings");
  }

  return data;
}


// Default export
const clubApi = {
  clubLogin,
  clubRegister,
  logoutClub,
  getClubProfile,
  updateClubProfile,
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  getWorkshops,
  addWorkshop,
  updateWorkshop,
  deleteWorkshop,
  getDashboardData,
  getMembers,
  addMember,
  updateMember,
  removeMember,
  getMembershipRequests,
  approveMembership,
  assignMemberRole,
  getNotices,
  addNotice,
  updateNotice,
  deleteNotice,
  getSettings,
  updateSettings,
  uploadMemory,
  getMemories,
  deleteMemory,
};

export default clubApi;
