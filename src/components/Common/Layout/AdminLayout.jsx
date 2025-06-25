import { Outlet } from "react-router-dom";
import AdminHeader from "@/Common/Header/AdminHeader.jsx";
import Footer from "@/Common/Footer/Footer.jsx";
export default function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <Outlet />
      <Footer />
    </>
  );
}
