import {
  HeaderWrap,
  Logo,
  Nav,
  MenuItem,
  UserDiv,
  MenuIcon,
} from "./Header.styls";
import { AuthContext } from "../../../pages/context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// 로고 이미지 경로: src/assets/logo.png 예시
import logoImg from "../../../assets/logo.png";

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
  return (
    <>
      <HeaderWrap>
        {/* 왼쪽 로고 */}
        <Logo to="/">
          <img src={logoImg} alt="놀러 Way 로고" />
        </Logo>

        {/* 메뉴 - 카테고리 번호 수정 */}
        <Nav>
          <MenuItem to="/">
            <MenuIcon className="fas fa-home" /> 홈
          </MenuItem>
          <MenuItem to="/contentList?category=1">
            <MenuIcon className="fas fa-mountain-sun" /> 관광지
          </MenuItem>
          <MenuItem to="/contentList?category=2">
            <MenuIcon className="fas fa-utensils" /> 맛집
          </MenuItem>
          <MenuItem to="/contentList?category=3">
            <MenuIcon className="fas fa-bed" /> 숙소
          </MenuItem>
          <MenuItem to="/contentList?category=4">
            <MenuIcon className="fas fa-music" /> 축제
          </MenuItem>
        </Nav>

        <UserDiv>
          {auth.accessToken ? (
            <>
              <MenuItem type="button" onClick={handleLogout}>
                <MenuIcon className="fas fa-sign-out-alt" /> 로그아웃
              </MenuItem>
              <MenuItem as="button" onClick={() => navi("/admin/contentAdd")}>
                <MenuIcon className="fas fa-user-shield" /> 관리자
              </MenuItem>
            </>
          ) : (
            <MenuItem to="/Login">
              <MenuIcon className="fas fa-sign-in-alt" /> 로그인
            </MenuItem>
          )}
        </UserDiv>
      </HeaderWrap>
    </>
  );
};

export default Header;
