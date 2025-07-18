import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./pages/context/AuthContext";
import UserLayout from "./layout/UserLayout";
import AdminRoute from "./components/common/adminRoute/AdminRoute";
import Home from "./pages/home/Home";
import ContentAdd from "./pages/content/ContentAdd";
import ContentList from "./pages/content/ContentList";
import ContentUpdate from "./pages/content/ContentUpdate";
import ContentDetail from "./pages/content/ContentDetail";

import ReportList from "./pages/report/ReportList";
import Address from "./pages/global/Address";

import ChatPage from "./pages/chat/ChatPage";

import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import FindId from "./pages/findId/Findid";
import FindPw from "./pages/findPw/FindPw";
import Mypage from "./pages/mypage/Mypage";
import DeleteUser from "./pages/deleteUser/DeleteUser";
import UpdatePassword from "./pages/updatePassword/UpdatePassword";
import ContentAddPage from "./pages/content/ContentAddPage";
import MemberList from "./pages/member/MemberList";
import AdminContentList from "./pages/content/admin/AdminContentList";
import AdminContentDetail from "./pages/content/admin/AdminContentDetail";
import ContentUpdatePage from "./pages/content/ContentUpdatePage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/chat/:contentNo" element={<ChatPage />}></Route>
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
          <Route path="adminContentList" element={<AdminContentList />}></Route>
          <Route
            path="content/:contentId"
            element={<AdminContentDetail />}
          ></Route>
          <Route
            path="content/:contentId/edit"
            element={<ContentUpdate />}
          ></Route>
          <Route path="reportList" element={<ReportList />}></Route>
          <Route path="memberList" element={<MemberList />}></Route>
          <Route path="contentAdd" element={<ContentAddPage />}></Route>
          <Route path="addr" element={<Address />}></Route>
          <Route
            path="content-update/:contentId"
            element={<ContentUpdatePage />}
          ></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
