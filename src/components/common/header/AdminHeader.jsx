import { HeaderWrap, Logo, Nav, MenuItem, UserDiv } from "./AdminHeader.styls";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../pages/context/AuthContext";
import logoImg from "../../../assets/logo.png";

const AdminHeader = () => {
  const { auth, logout } = useContext(AuthContext);

  const handleLogout = (e) => {
    logout();
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
          <MenuItem to="/admin">홈</MenuItem>
          <MenuItem to="/contentList">컨텐츠관리</MenuItem>
          <MenuItem to="/reportList">리뷰신고관리</MenuItem>
          <MenuItem to="/memberList">회원관리</MenuItem>
          <MenuItem to="/">유저인터페이스 이동</MenuItem>
        </Nav>

        <UserDiv>
          {auth.accessToken ? (
            <MenuItem to="/Logout" onClick={handleLogout}>
              로그아웃
            </MenuItem>
          ) : (
            <MenuItem to="/Login">로그인</MenuItem>
          )}
        </UserDiv>
      </HeaderWrap>
    </>
  );
};

export default AdminHeader;
