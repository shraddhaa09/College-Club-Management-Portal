const BASE_URL = "http://localhost/cllgclub/backend/api";

// -----------------------
// STUDENT AUTH
// -----------------------
export async function studentLogin(payload) {
  const res = await fetch(`${BASE_URL}/studentLogin.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data; // caller decides what to do with token
}

export async function studentRegister(payload) {
  const res = await fetch(`${BASE_URL}/studentRegister.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data;
}

// -----------------------
// CLUB AUTH
// -----------------------
export async function clubLogin(payload) {
  const res = await fetch(`${BASE_URL}/clubLogin.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data;
}

export async function clubRegister(payload) {
  const res = await fetch(`${BASE_URL}/clubRegister.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data;
}

// -----------------------
// Example protected request (optional)
// -----------------------
export async function getProtectedData(token) {
  const res = await fetch(`${BASE_URL}/protectedEndpoint.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    credentials: "include",
  });

  return await res.json();
}
