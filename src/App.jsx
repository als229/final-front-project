import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "src/context/auth/AuthContext";
import UserLayout from "src/layout/UserLayout";
import AdminLayout from "src/layout/AdminLayout";
import AdminRoute from "@/common/adminRoute/AdminRoute";
import Home from "src/pages/home/Home";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />}></Route>
          </Route>

          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}></Route>
          </Route>
        </Routes>
        .
      </AuthProvider>
    </>
  );
}

export default App;
