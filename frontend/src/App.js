import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// 🔐 Authentication and Registration Pages
import MainAuthPage from "./pages/MainAuthPage";
import ClubLoginForm from "./components/ClubLoginForm";
import ClubRegisterForm from "./components/ClubRegisterForm";

// 🏫 Club-related Pages
import Dashboard from "./pages/Dashboard";
import EventsPage from "./pages/EventsPage";
import NoticesPage from "./pages/NoticesPage";
import MembersPage from "./pages/MembersPage";
import ClubProfilePage from "./pages/ClubProfilePage";
import Workshops from "./pages/Workshops";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

// 🧑‍🎓 Student and Admin Dashboards

export default function App() {
  // This loads auth from localStorage at startup:
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Ensure localStorage stays in sync if auth changes:
  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  if (loading) return <div>Loading...</div>;

  // 🔸 Protected Route Component
  function ProtectedRoute({ children, allowed }) {
    if (!auth || !auth.token) return <Navigate to="/" replace />;
    if (allowed && !allowed.includes(auth.userType)) return <Navigate to="/" replace />;
    return children;
  }


  return (
    !loading && (
    <BrowserRouter>
      <Routes>
        {/* ---------------------- PUBLIC ROUTES ---------------------- */}

        {/* Main entry page */}
        <Route path="/" element={<MainAuthPage setAuth={setAuth} />} />

        {/* Login Routes */}
        <Route
          path="/club-login"
          element={<ClubLoginForm setAuth={setAuth} />}
        />

        {/* Registration Routes */}
        <Route path="/club-register" element={<ClubRegisterForm />} />

        {/* ---------------------- CLUB ROUTES ---------------------- */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowed={["club"]}>
              <Dashboard logout={() => setAuth(null)} club={auth} setAuth={setAuth} />
            </ProtectedRoute>
          }
        />
        <Route
  path="/events"
  element={
    <ProtectedRoute allowed={["club"]}>
      <EventsPage club={auth} setAuth={setAuth} />
    </ProtectedRoute>
  }
/>
        <Route
          path="/notices"
          element={
            <ProtectedRoute allowed={["club"]}>
              <NoticesPage club={auth} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/members"
          element={
            <ProtectedRoute allowed={["club"]}>
              <MembersPage club={auth} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowed={["club"]}>
              <ClubProfilePage club={auth} logout={() => setAuth(null)} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workshops"
          element={
            <ProtectedRoute allowed={["club"]}>
              <Workshops club={auth} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowed={["club"]}>
              <Reports club={auth} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowed={["club"]}>
              <Settings club={auth} />
            </ProtectedRoute>
          }
        />

        {/* ---------------------- FALLBACK ROUTE ---------------------- */}
<Route path="*" element={<Navigate to="/" />} />      </Routes>
    </BrowserRouter>
    )
  );
}
