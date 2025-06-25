import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/Context/Auth/AuthContext";
import UserLayout from "@/Common/Layout/UserLayout";
import AdminLayout from "@/Common/Layout/AdminLayout";
import Main from "@/Main/Main";
import AdminRoute from "@/Common/AdminRoute/AdminRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<UserLayout />}>
            <Route path="/" element={<Main />}></Route>
          </Route>

          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
