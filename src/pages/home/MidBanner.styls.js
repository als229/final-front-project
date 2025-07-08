import styled from "styled-components";

export const BannerContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 80px auto;
  padding: 32px 24px;
  background: linear-gradient(to right, #c6e6ff, #a1c4fd); // 파스텔톤
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BannerText = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
`;

export const BannerSubText = styled.p`
  font-size: 16px;
  color: #f3f3f3;
`;
