import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderWrap = styled.header`
  width: 100%;
  height: 100px;
  background: rgb(255, 255, 255); /* 스크린샷 회색 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  box-sizing: border-box;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
`;

/* ── 로고 ──────────────────────────────── */
export const Logo = styled(NavLink)`
  img {
    height: 100px;
    object-fit: contain;
  }
`;

/* ── 가운데 메뉴 ───────────────────────── */
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

/* ── 메뉴 링크 공통 스타일 ──────────────── */
export const MenuItem = styled(NavLink).attrs((props) => ({
  as: props.as || NavLink,
}))`
  font-size: 20px;
  color: rgb(39, 39, 39);
  text-decoration: none;
  position: relative;
  display: inline-flex;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    font-weight: 700;
  }

  &::after {
    content: "";
    position: absolute;
    top: -2px;
    right: -10px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: transparent;
    transition: background 0.2s;
  }

  &:hover::after {
    background: #000;
  }
`;
