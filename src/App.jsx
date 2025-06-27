import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "src/context/auth/AuthContext";
import UserLayout from "src/layout/UserLayout";
import AdminLayout from "src/layout/AdminLayout";
import AdminRoute from "@/common/adminRoute/AdminRoute";
import Home from "src/pages/home/Home";
import ContentAdd from "src/pages/content/ContentAdd";
import ContentList from "src/pages/content/ContentList";
import ContentUpdate from "src/pages/content/ContentUpdate";
import ContentDetail from "src/pages/content/ContentDeatail";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/contentList" element={<ContentList />}></Route>
            {/* kkm test 용 코드 */}
            <Route path="/contentDetail" element={<ContentDetail />}></Route>
          </Route>

          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="contentAdd" element={<ContentAdd />}></Route>
              <Route path="contentUpdate" element={<ContentUpdate />}></Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
