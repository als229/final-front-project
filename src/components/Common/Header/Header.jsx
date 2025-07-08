import {
  HeaderWrap,
  Logo,
  Nav,
  MenuItem,
  UserDiv,
} from "@/components/common/header/Header.styls";
import { AuthContext } from "../../../pages/context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// 로고 이미지 경로: src/assets/logo.png 예시
import logoImg from "@/assets/logo.png";

const Header = () => {
  const navi = useNavigate();
  const { auth, logout } = useContext(AuthContext);
  const handleLogout = (e) => {
    logout();
    setTimeout(() => {
      navi("/login");
      alert("로그아웃 되었습니다.");
    }, 0);
  };
  const goCategory = (name) => {
    navi("/contentList", { state: { categoryName: name } });
  };
  return (
    <>
      <HeaderWrap>
        {/* 왼쪽 로고 */}
        <Logo to="/">
          <img src={logoImg} alt="놀러 Way 로고" />
        </Logo>

        {/* 메뉴 */}
        <Nav>
          <MenuItem to="/">홈</MenuItem>
          <MenuItem as="button" onClick={() => goCategory("관광지")}>
            관광지
          </MenuItem>
          <MenuItem as="button" onClick={() => goCategory("맛집")}>
            맛집
          </MenuItem>
          <MenuItem as="button" onClick={() => goCategory("숙소")}>
            숙소
          </MenuItem>
          <MenuItem as="button" onClick={() => goCategory("축제")}>
            축제
          </MenuItem>
        </Nav>

        <UserDiv>
          {auth.accessToken ? (
            <>
              <MenuItem type="button" onClick={handleLogout}>
                로그아웃
              </MenuItem>
              <MenuItem as="button" onClick={() => navi("/admin/contentAdd")}>
                관리자 페이지로 이동데스
              </MenuItem>
            </>
          ) : (
            <MenuItem to="/Login">로그인</MenuItem>
          )}
        </UserDiv>
      </HeaderWrap>
    </>
  );
};

export default Header;
