import styled from "styled-components";

export const SliderWrapper = styled.div`
  width: 100%;
  height: 480px;
  overflow: visible;
`;

const BaseSlideItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem; // ← 텍스트와 이미지 간 간격
  height: 480px;
  padding: 3rem 6rem;
  box-sizing: border-box;
  overflow: visible;
`;

export const SlideItem1 = styled(BaseSlideItem)`
  background-color: #e0f7fa;
`;

export const SlideItem2 = styled(BaseSlideItem)`
  background-color: #b2ebf2;
`;

export const SlideItem3 = styled(BaseSlideItem)`
  background-color: #b3e5fc;
`;

export const SlideItem4 = styled(BaseSlideItem)`
  background-color: #81d4fa;
`;

export const SlideItem5 = styled(BaseSlideItem)`
  background-color: #4fc3f7;
`;

export const Leftbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 25rem;
  padding-top:
  width: auto;
`;

export const Rightbox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const TitleBox = styled.div`
  display: flex;
`;

export const BannerImage = styled.img`
  width: 900px;
  height: 420px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  object-fit: cover;
`;
