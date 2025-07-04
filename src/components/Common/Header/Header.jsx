import {
  HeaderWrap,
  Logo,
  Nav,
  MenuItem,
  UserDiv,
} from "@/common/header/Header.styls";

// 로고 이미지 경로: src/assets/logo.png 예시
import logoImg from "src/assets/logo.png";

const Header = () => {
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
          <MenuItem to="/">관광지</MenuItem>
          <MenuItem to="/">맛집</MenuItem>
          <MenuItem to="/">숙소</MenuItem>
          <MenuItem to="/">축제</MenuItem>
        </Nav>
        <UserDiv>
          <MenuItem to="/">로그인</MenuItem>
        </UserDiv>
      </HeaderWrap>
    </>
  );
};

export default Header;
