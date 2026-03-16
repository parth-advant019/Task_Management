import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../store/auth";
import { useSelector } from "react-redux";
import { themeAction } from "../store/theme";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isDark = useSelector((state) => state.theme.isDark);

  const logoutHandler = () => {
    localStorage.removeItem("userEmail");
    dispatch(authAction.logout());
    navigate("/");
  };

  const toggleTheme = () => {
    dispatch(themeAction.toggleTheme());
  };

  return (
    <nav className="bg-indigo-600 fixed w-full z-50 top-0">
      <div className="flex items-center justify-between mx-auto max-w-7xl p-4 text-white px-4 py-3">
        <span className="font-bold text-lg">Task Manager</span>
        <div className="flex items-center gap-3 sm:gap-6 text-sm sm:text-base">
          <button
            onClick={toggleTheme}
            className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm"
          >
            {isDark ? "Light" : "Dark"}
          </button>
          {isAuthenticated && (
            <>
              <Link to="/welcome" className="hover:text-gray-200">
                Home
              </Link>
              <Link to="/add-task" className="hover:text-gray-200">
                Add Task
              </Link>
              <button onClick={logoutHandler} className="hover:text-gray-200">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
