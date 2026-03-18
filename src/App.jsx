import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./components/auth/LoginPage";
import RootLayout from "./components/layout/RootLayout";
import DashboardPage from "./components/dashboard/DashboardPage";
import AddTask from "./components/addTask/AddTask";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isDark = useSelector((state) => state.theme.isDark);
  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">
        <Routes>
          <Route element={<RootLayout />}>
            <Route
              path="/"
              element={isAuthenticated ? <DashboardPage /> : <LoginPage />}
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <DashboardPage /> : <Navigate to="/" />
              }
            />
            <Route
              path="/add-task"
              element={isAuthenticated ? <AddTask /> : <Navigate to="/" />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
