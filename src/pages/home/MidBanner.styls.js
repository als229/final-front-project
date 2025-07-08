import styled from "styled-components";

export const BannerContainer = styled.div`
  width: 100vw;
  padding: 48px 0;
  background: linear-gradient(90deg, #b4dffb, #a3c8f8);
`;

export const BannerContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
`;

export const BannerText = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

export const BannerSubText = styled.p`
  font-size: 1rem;
  color: #eaf6ff;
  font-weight: 400;
  letter-spacing: -0.2px;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;
