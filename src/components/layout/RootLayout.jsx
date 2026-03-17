import { Outlet } from "react-router-dom";
import NavBar from "../ui/NavBar";

export default function RootLayout() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <NavBar />

      {/* Main Content */}
      <div className="ml-20 md:ml-64 w-full p-8">
        <Outlet />
      </div>
    </div>
  );
}
