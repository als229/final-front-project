import { useContext } from "react";
import { AuthContext } from "../../../pages/context/AuthContext";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../assets/logo.png";
import {
  HeaderContainer,
  AdminStatusBar,
  AdminBadge,
  ServerStatus,
  StatusDot,
  AdminInfo,
  LogoutButton,
  MainHeader,
  LogoSection,
  AdminText,
  NavSection,
  NavItem,
  ActionSection,
  ActionButton,
} from "./AdminHeader.styls";

const AdminHeader = () => {
  const { auth, logout } = useContext(AuthContext);
  const navi = useNavigate();
  const adminName = sessionStorage.getItem("nickName") || "관리자";

  const handleLogout = () => {
    logout();
    navi("/login");
  };

  // 현재 경로 확인
  const currentPath = window.location.pathname;

  return (
    <HeaderContainer>
      {/* 상단 상태 바 */}
      <AdminStatusBar>
        <AdminBadge>
          <i className="fas fa-shield-alt"></i> 관리자 모드
        </AdminBadge>
        <ServerStatus>
          <StatusDot $status="online" /> 시스템 정상 작동 중
        </ServerStatus>
        <AdminInfo>
          <i className="fas fa-user-shield"></i> {adminName} 님
          <LogoutButton onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> 로그아웃
          </LogoutButton>
        </AdminInfo>
      </AdminStatusBar>

      {/* 메인 헤더 */}
      <MainHeader>
        <LogoSection to="/admin">
          <img src={logoImg} alt="놀러 Way 로고" />
          <AdminText>Admin Console</AdminText>
        </LogoSection>

        <NavSection>
          <NavItem
            $active={currentPath === "/admin"}
            onClick={() => navi("/admin")}
          >
            <i className="fas fa-tachometer-alt"></i>
            <span>대시보드</span>
          </NavItem>

          <NavItem
            $active={currentPath.includes("/admin/adminContentList")}
            onClick={() => navi("/admin/adminContentList")}
          >
            <i className="fas fa-map-marked-alt"></i>
            <span>콘텐츠 관리</span>
          </NavItem>

          <NavItem
            $active={currentPath.includes("/admin/reportList")}
            onClick={() => navi("/admin/reportList")}
          >
            <i className="fas fa-flag"></i>
            <span>신고 관리</span>
          </NavItem>

          <NavItem
            $active={currentPath.includes("/admin/memberList")}
            onClick={() => navi("/admin/memberList")}
          >
            <i className="fas fa-users-cog"></i>
            <span>회원 관리</span>
          </NavItem>
        </NavSection>

        <ActionSection>
          <ActionButton
            title="새 콘텐츠 추가"
            onClick={() => navi("/admin/contentAdd")}
          >
            <i className="fas fa-plus-circle"></i>
          </ActionButton>
          <ActionButton title="사용자 페이지로 이동" onClick={() => navi("/")}>
            <i className="fas fa-home"></i>
          </ActionButton>
        </ActionSection>
      </MainHeader>
    </HeaderContainer>
  );
};

export default AdminHeader;
