const BASE_URL = "http://localhost/cllgclub/backend/api";

// ✅ Helper: Get Authorization header with JWT
function getAuthHeaders() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;
  if (!token) throw new Error("No token found!");
  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
  };
}


// ✅ Common Fetch Helper with automatic JWT handling
const fetchApi = async (endpoint, options = {}) => {
  try {
    const headers = {
      ...getAuthHeaders(), // merge auth headers
      ...(options.headers || {}),
    };

    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      credentials: "include",
      ...options,
      headers,
    });

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      if (!response.ok || data.status !== "success") {
        throw new Error(data.message || "Request failed");
      }
      return data;
    } else {
      const text = await response.text();
      throw new Error(text || "Unknown server response");
    }
  } catch (err) {
    console.error("❌ API Error:", err);
    throw new Error(err.message || "Network or server error");
  }
};

// ✅ Fetch all workshops (GET)
export const getWorkshops = async () => {
  const res = await fetchApi("getWorkshops.php", {
    method: "GET",
  });
  return res;
};


// ✅ Add a new workshop (POST)
export const addWorkshop = async (data) => {
  const res = await fetchApi("addWorkshop.php", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res;
};

// ✅ Update workshop (POST)
export const updateWorkshop = async (data) => {
  const res = await fetchApi("updateWorkshop.php", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res;
};

// ✅ Delete workshop (POST)
export const deleteWorkshop = async (id) => {
  const res = await fetchApi("deleteWorkshop.php", {
    method: "POST",
    body: JSON.stringify({ id }),
  });
  return res;
};

// ✅ Logout
export const logoutClub = async () => {
  const res = await fetch(`${BASE_URL}/logout.php`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();
  if (data.status === "success") {
    localStorage.removeItem("club_token"); // ✅ clear token
  } else {
    throw new Error(data.message || "Logout failed");
  }
  return data;
};
