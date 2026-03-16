import { Outlet } from "react-router-dom";
import NavBar from "../ui/NavBar";

export default function RootLayout() {
  return (
    <>
      <NavBar />
      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );
}
