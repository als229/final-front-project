import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderWrap = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 90px; /* 헤더 높이를 키워 로고 공간 확보 */
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 15px rgba(36, 99, 235, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 80px; /* 모바일에서도 여유 공간 확보 */
  }
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 15px;

  img {
    height: 65px; /* 기존 48px에서 65px로 크게 변경 */
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    img {
      height: 50px; /* 모바일에서도 크기 키움 (기존 40px에서) */
    }
  }
`;

/* 기존 다른 스타일 컴포넌트는 그대로 유지 */
export const Nav = styled.nav`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 12px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    justify-content: space-around;
    gap: 0;
  }
`;

export const MenuItem = styled(Link)`
  position: relative;
  color: #4b5563;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  letter-spacing: -0.3px;

  &:hover,
  &.active {
    color: #2563eb;
    background: #eff6ff;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 5px;
    left: 50%;
    width: 0;
    height: 2px;
    background: #2563eb;
    transition: all 0.3s ease;
    transform: translateX(-50%);
    opacity: 0;
  }

  &:hover::after,
  &.active::after {
    width: 20px;
    opacity: 1;
  }

  /* 버튼 타입일 경우 스타일 */
  ${(props) =>
    props.type === "button" || props.as === "button"
      ? `
    background: none;
    border: none;
    font-family: inherit;
    
    &:focus {
      outline: none;
    }
  `
      : ""}
`;

export const UserDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const MenuIcon = styled.span`
  margin-right: 6px;
  font-size: 16px;
  color: #4b5563;

  ${MenuItem}:hover & {
    color: #2563eb;
  }
`;
export const MenuItem2 = styled.button`
  font-size: 20px;
  color: rgb(39, 39, 39);
  text-decoration: none;
  position: relative;
  display: inline-flex;

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
    background: transparent; /* 기본은 투명 */
    transition: background 0.2s;
  }

  /* 호버 or 활성(active)일 때 점에 색 채우기 */
  &:hover::after {
    background: #000;
  }
`;
