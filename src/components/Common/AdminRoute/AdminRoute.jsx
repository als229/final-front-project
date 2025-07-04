import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "src/pages/context/AuthContext";
import AdminLayout from "src/layout/AdminLayout";

const AdminRoute = () => {
  const { auth } = useContext(AuthContext);
  console.log("AdminRoute 상태:", auth);

  // if (!auth.user.isAuthenticated || auth.user.role !== "admin") {
  // const isAdmin = auth.userId === "admin" && auth.realName === "어드민";
  if (!auth.isAuthenticated) {
    console.log("관리자 권한이 없거나 인증되지 않았습니다.");
    return <Navigate to="/" replace />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminRoute;
