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
  padding: 0 5vw;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Card = styled.div`
  width: 220px;

  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: #fff;
  display: flex;
  flex-direction: column;
`;

export const ImageWrapper = styled.div`
  position: relative;
  height: 180px;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Location = styled.div`
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Address = styled.div`
  font-size: 12px;
  color: #999;
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
`;
export const VerticalBar = styled.div`
  width: 2px;
  height: 1.8rem;
  background-color: #d0d0d0;
`;
export const SubText = styled.p`
  font-size: 1.1rem;
  color: #444;
  font-weight: 400;
  color: rgb(88, 117, 206);
  font-family: "Pretendard", sans-serif;
  white-space: nowrap;
`;
