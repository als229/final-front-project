import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./pages/context/AuthContext";
import UserLayout from "src/layout/UserLayout";
import AdminLayout from "src/layout/AdminLayout";
import AdminRoute from "@/common/adminRoute/AdminRoute";
import Home from "src/pages/home/Home";
import ContentAdd from "src/pages/content/ContentAdd";
import ContentList from "src/pages/content/ContentList";
import ContentUpdate from "src/pages/content/ContentUpdate";
import ContentDetail from "src/pages/content/ContentDeatail";

import ChatPage from "src/pages/chat/ChatPage";

import Login from "./pages/login/login";
import SignUp from "./pages/signUp/SignUp";
import FindId from "./pages/findId/findid";
import FindPw from "./pages/findPw/FindPw";
import Mypage from "./pages/mypage/Mypage";
import DeleteUser from "./pages/deleteUser/deleteUser";
import UpdatePassword from "./pages/updatePassword/UpdatePassword";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/chat/:roomId" element={<ChatPage />}></Route>
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/contentList" element={<ContentList />}></Route>
            {/* kkm test 용 코드 */}
            <Route path="/contentDetail" element={<ContentDetail />}></Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route path="/findId" element={<FindId />}></Route>
            <Route path="/findPw" element={<FindPw />}></Route>
            <Route path="/mypage" element={<Mypage />}></Route>
            <Route path="/mypage/password" element={<UpdatePassword />} />
            <Route path="/mypage/delete" element={<DeleteUser />} />
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
