import styled from "styled-components";

export const BannerWrapper = styled.div`
  width: 100vw;
  overflow: hidden;
`;

const BaseSlideItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 480px;
  padding: 3rem 6rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 2rem;
  }
`;

export const SlideItem1 = styled(BaseSlideItem)`
  background-color: #a8e6cf; // 바다 느낌 민트
`;

export const SlideItem2 = styled(BaseSlideItem)`
  background-color: #dcedc1; // 연초록
`;

export const SlideItem3 = styled(BaseSlideItem)`
  background-color: #f0f4c3; // 옅은 노랑
`;

export const SlideItem4 = styled(BaseSlideItem)`
  background-color: #b2ebf2; // 하늘색
`;

export const SlideItem5 = styled(BaseSlideItem)`
  background-color: #fff9c4; // 부드러운 모래 느낌
`;

export const TextSection = styled.div`
  flex: 1;
`;

export const Label = styled.div`
  background: black;
  color: white;
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  margin-bottom: 16px;
`;

export const Title = styled.h2`
  font-size: 36px;
  white-space: pre-line;
  margin-bottom: 12px;
  color: #333;
`;

export const DetailLink = styled.a`
  color: #444;
  text-decoration: underline;
  font-size: 16px;
  cursor: pointer;
`;

export const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

export const BannerImage = styled.img`
  width: 90%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
`;
