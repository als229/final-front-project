import styled from "styled-components";

export const SlideWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 16px;
`;

export const RecoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h2 {
    font-size: 20px;
    font-weight: bold;
    color: #222;
  }

  a {
    font-size: 14px;
    font-weight: bold;
    color: #555;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CardList = styled.div`
  display: flex;
  height: 320px;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 1.5rem;
  padding: 2rem 5vw;w
  overflow-x: auto;
  border-radius: 16px;

  background: linear-gradient(to right, #f0f8ff, #e7f0fd);
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.03);

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Card = styled.div`
  width: 220px;
  flex-shrink: 0;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(to bottom right, #ffffff, #f0f8ff);
  display: flex;
  flex-direction: column;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.06);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  height: 180px;
`;
export const HeartIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  padding: 6px;
  font-size: 18px;
  color: #ff6b81;
`;

export const CardBottom = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: white;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #1e3a8a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Location = styled.div`
  font-size: 13px;
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Address = styled.div`
  font-size: 12px;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin: 3rem 0 1.5rem;
`;

export const MainTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 800;
  color: #1e4dd6;
  font-family: "Pretendard", sans-serif;
  position: relative;
  animation: fadeInUp 1s ease;

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
export const VerticalBar = styled.div`
  width: 2px;
  height: 1.8rem;
  background-color: #d0d0d0;
`;
export const SubText = styled.p`
  font-size: 1.1rem;
  color: #5875ce;
  font-weight: 400;
  font-family: "Pretendard", sans-serif;
  white-space: nowrap;
  animation: fadeInUp 1.3s ease;
`;
export const Badge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff6b81;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  z-index: 2;
`;
