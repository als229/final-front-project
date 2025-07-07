import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "src/pages/context/AuthContext";
import UserLayout from "src/layout/UserLayout";
import AdminLayout from "src/layout/AdminLayout";
import AdminRoute from "@/common/adminRoute/AdminRoute";
import Home from "src/pages/home/Home";
import ContentAdd from "src/pages/content/ContentAdd";
import ContentList from "src/pages/content/ContentList";
import ContentUpdate from "src/pages/content/ContentUpdate";
import ContentDetail from "src/pages/content/ContentDeatail";

import ReportList from "src/pages/report/ReportList";
import KakaoMap from "./pages/map/kakaoMap";
import Address from "./pages/global/Address";

import ChatPage from "src/pages/chat/ChatPage";

import Login from "src/pages/login/login";
import SignUp from "src/pages/signUp/SignUp";
import FindId from "src/pages/findId/findid";
import FindPw from "src/pages/findPw/FindPw";
import Mypage from "src/pages/mypage/Mypage";
import DeleteUser from "src/pages/deleteUser/deleteUser";
import UpdatePassword from "src/pages/updatePassword/UpdatePassword";
import Report from "./pages/report/Report";
import MemberList from "./pages/member/MemberList";


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

          <Route path="/memberList" element={<MemberList />} />
          <Route path="/reportList" element={<ReportList />}></Route>
          <Route path="/address" element={<Address />}></Route>
        </Route>

        <Route path="/admin" element={<AdminRoute />}>
          <Route path="contentAdd" element={<ContentAdd />}></Route>
          <Route path="contentUpdate" element={<ContentUpdate />}></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
