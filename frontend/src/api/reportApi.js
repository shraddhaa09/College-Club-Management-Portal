const BASE_URL = "http://localhost/cllgclub/backend/api";

function getAuthHeaders() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;
  if (!token) throw new Error("No token found!");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
}

export const getReports = async () => {
  const res = await fetch(`${BASE_URL}/getreports.php`, {
    headers: getAuthHeaders(),
    credentials: "include",
  });
  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message);
  return data;
};

