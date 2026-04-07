import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../store/auth";
import { useSelector } from "react-redux";
import { themeAction } from "../store/theme";
import { useState } from "react";
import { FaSignOutAlt, FaTachometerAlt, FaTasks } from "react-icons/fa";

export default function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const projects = useSelector((state) => state.project.projects);
  const isDark = useSelector((state) => state.theme.isDark);
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("userEmail");
    dispatch(authAction.logout());
    navigate("/");
  };

  const toggleTheme = () => {
    dispatch(themeAction.toggleTheme());
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-60 bg-indigo-600 text-white p-2 rounded-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 640 640">
            <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 640 640">
            <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" />
          </svg>
        )}
      </button>
      {/*close from outside */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`w-64 h-screen bg-indigo-600 text-white fixed left-0 top-0 p-4 pt-14 md:pt-4 transition-all duration-300 z-50 ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Task Manager</h2>
        </div>

        <nav className="mt-6 flex flex-col justify-between h-[85%]">
          {isAuthenticated && (
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 p-4 hover:bg-indigo-500 rounded cursor-pointer"
                >
                  <FaTachometerAlt size={20} className="shrink-0" />
                  <span>Dashboard</span>
                </Link>
              </li>

              {projects.length > 0 && (
                <li>
                  <Link
                    to="/add-task"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 p-4 hover:bg-indigo-500 rounded cursor-pointer"
                  >
                    <FaTasks size={20} className="shrink-0" />
                    <span>Add Task</span>
                  </Link>
                </li>
              )}

              <li
                onClick={logoutHandler}
                className="flex items-center gap-3 p-4 hover:bg-indigo-500 rounded cursor-pointer"
              >
                <FaSignOutAlt size={24} className="shrink-0" />
                <span>Logout</span>
              </li>
            </ul>
          )}

          <div className="px-2">
            <button
              onClick={toggleTheme}
              className="w-full p-3 bg-white/20 hover:bg-white/30 rounded-lg text-sm"
            >
              {isDark ? "Light" : "Dark"}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
