import { 
  FaUserFriends, 
  FaCalendarAlt, 
  FaChalkboardTeacher, 
  FaChartBar, 
  FaCog, 
  FaHome, 
  FaSignOutAlt, 
  FaBars 
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const menu = [
  { path: "/dashboard", name: "Dashboard", icon: <FaHome /> },
  { path: "/members", name: "Manage Members", icon: <FaUserFriends /> },
  { path: "/events", name: "Events", icon: <FaCalendarAlt /> },
  { path: "/workshops", name: "Workshops", icon: <FaChalkboardTeacher /> },
  { path: "/reports", name: "Reports", icon: <FaChartBar /> },
  { path: "/settings", name: "Settings", icon: <FaCog /> }
];

export default function Sidebar({ setAuth, auth }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleLogout = () => {
    if (setAuth) setAuth(null);
    navigate("/");
  };

  const isOpen = hovered || !collapsed; // expands on hover

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-purple-600 text-white rounded-md"
        onClick={() => setCollapsed(false)}
      >
        <FaBars size={20} />
      </button>

      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen 
          bg-gradient-to-b from-purple-600 to-blue-500 
          shadow-lg flex flex-col justify-between 
          transition-all duration-300 
          ${isOpen ? "w-64" : "w-20"}
          ${collapsed && !hovered ? "lg:w-20" : "lg:w-64"}
        `}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Toggle button (only desktop) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:block absolute top-4 right-4 text-white"
        >
          <FaBars size={20} />
        </button>

        <div className="overflow-y-auto mt-12">
          <div className={`text-white font-bold text-lg px-8 pb-8 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            Welcome back, {auth?.club?.name || "Admin"}
          </div>

          <nav className="flex-1 space-y-1">
            {menu.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 font-medium gap-4
                  transition-colors duration-150
                  ${isActive ? "bg-white/90 text-blue-700 shadow" : "text-white hover:bg-white/20"}
                  rounded-l-full
                `
                }
              >
                <span className="text-2xl">{item.icon}</span>
                {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center px-6 py-3 gap-4 text-white hover:bg-white/20 mb-4"
        >
          <FaSignOutAlt className="text-2xl" />
          {isOpen && "Logout"}
        </button>
      </aside>
    </>
  );
}