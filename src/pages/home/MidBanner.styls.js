import styled from "styled-components";

export const BannerContainer = styled.div`
  width: 100vw;
  background: linear-gradient(90deg, #b4dffb, #a3c8f8);
  padding: 60px 0;
`;

export const BannerContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  animation: fadeInLeft 1.2s ease;

  @keyframes fadeInLeft {
    0% {
      opacity: 0;
      transform: translateX(-30px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const BannerText = styled.h2`
  font-size: 2.4rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const BannerSubText = styled.p`
  font-size: 1.1rem;
  color: #f0f7ff;
  font-weight: 400;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export const BannerButton = styled.button`
  background: #ffffff;
  color: #1e4dd6;
  font-weight: 600;
  border: none;
  padding: 10px 22px;
  border-radius: 24px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e0efff;
    transform: translateY(-2px);
  }
`;
