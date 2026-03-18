import { Outlet } from "react-router-dom";
import NavBar from "../ui/NavBar";

export default function RootLayout() {
  return (
    <div className="flex">
      <NavBar />
      <div className="w-full p-8 ml-0 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
}
