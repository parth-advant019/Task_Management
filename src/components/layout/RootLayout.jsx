import { Outlet } from "react-router-dom";
import SideBar from "../ui/SideBar";

export default function RootLayout() {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full p-8 ml-0 md:ml-64 pt-16 md:pt-8">
        <Outlet />
      </div>
    </div>
  );
}
