import { Outlet } from "react-router-dom";
import AdminHeader from "@/common/header/AdminHeader.jsx";
import Footer from "@/common/footer/Footer.jsx";

import styled from "styled-components";

/* 화면을 세로로 꽉 채우고, Footer를 맨 아래로 밀어주는 래퍼 */
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

/* 메인(콘텐츠) 영역 – 남는 공간을 전부 차지 */
const Main = styled.main`
  flex: 1;
  padding: 24px;
  /* 관리자 페이지라면 연한 배경이나 그리드 라인을 넣어도 OK */
  /* background: #fafafa; */
`;

export default function AdminLayout() {
  console.log("🟢 AdminHeader 렌더링됨");
  return (
    <>
      <Wrapper>
        <AdminHeader />
        <Main>
          <h1>asdasdasd</h1>
          {/* 각 관리자 페이지 컴포넌트 렌더링 위치 */}
          <Outlet />
        </Main>

        <Footer />
      </Wrapper>
    </>
  );
}
