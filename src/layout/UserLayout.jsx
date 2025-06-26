import { Outlet } from "react-router-dom";
import Header from "@/common/header/Header";
import Footer from "@/common/footer/Footer";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 101vh;
`;

/* ② 메인 영역이 남는 공간을 모두 차지하도록 */
const Main = styled.main`
  flex: 1;
`;

export default function UserLayout() {
  return (
    <>
      <Wrapper>
        <Header />

        <Main>
          <Outlet />
        </Main>

        <Footer />
      </Wrapper>
    </>
  );
}
