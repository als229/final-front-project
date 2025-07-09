import styled from "styled-components";
import { NavLink } from "react-router-dom";

// 전체 헤더 컨테이너
export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// 상단 상태 표시줄
export const AdminStatusBar = styled.div`
  background-color: #1e293b;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 20px;
  font-size: 0.8rem;
`;

export const AdminBadge = styled.div`
  background-color: #dc2626;
  padding: 4px 10px;
  border-radius: 4px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ServerStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$status === "online" ? "#22c55e" : "#ef4444"};
`;

export const AdminInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  i {
    margin-right: 6px;
  }
`;

export const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0;
  margin-left: 10px;

  &:hover {
    color: white;
  }
`;

// 메인 헤더
export const MainHeader = styled.div`
  background-color: #f8fafc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 64px;
  border-bottom: 1px solid #e2e8f0;
`;

export const LogoSection = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;

  img {
    height: 36px;
    margin-right: 12px;
  }
`;

export const AdminText = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  border-left: 2px solid #cbd5e1;
  padding-left: 12px;
`;

export const NavSection = styled.nav`
  display: flex;
  gap: 5px;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 6px;
  position: relative;
  background-color: ${(props) => (props.$active ? "#e2e8f0" : "transparent")};
  color: ${(props) => (props.$active ? "#0f172a" : "#64748b")};
  font-weight: ${(props) => (props.$active ? "600" : "400")};

  i {
    margin-right: 8px;
    font-size: 1rem;
  }

  &:hover {
    background-color: #f1f5f9;
    color: #0f172a;
  }
`;

export const NavBadge = styled.span`
  background-color: ${(props) => (props.$alert ? "#ef4444" : "#3b82f6")};
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 8px;
`;

export const ActionSection = styled.div`
  display: flex;
  gap: 6px;
`;

export const ActionButton = styled.button`
  background-color: transparent;
  border: 1px solid #cbd5e1;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  font-size: 1rem;

  &:hover {
    background-color: #f1f5f9;
    color: #0f172a;
  }
`;

export const SearchButton = styled(ActionButton)`
  background-color: #0f172a;
  border: none;
  color: white;

  &:hover {
    background-color: #1e293b;
    color: white;
  }
`;

// 기존 스타일 유지 (필요한 경우)
export const HeaderWrap = styled.header`
  width: 100%;
  height: 100px;
  background: rgb(255, 255, 255);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  box-sizing: border-box;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
`;

export const Logo = styled(NavLink)`
  img {
    height: 100px;
    object-fit: contain;
  }
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
  max-width: 1100px;
`;

export const UserDiv = styled.div`
  margin-right: 20px;
`;

export const MenuItem = styled(NavLink)`
  font-size: 20px;
  color: rgb(39, 39, 39);
  text-decoration: none;
  position: relative;
  display: inline-flex;

  &:hover {
    font-weight: 700;
  }
`;
