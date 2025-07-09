import styled from "styled-components";

export const SlideWrapper = styled.div`
  width: 100vw;
  height: 560px;
  background: linear-gradient(to right, #d6f0ff, #fffbe9);
  overflow: visible;
  position: relative;

  .swiper-pagination {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const SlideInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
  gap: 6rem;
  padding: 0 3rem;
`;

export const TextBox = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 6rem;
  animation: fadeSlideIn 1s ease forwards;

  @keyframes fadeSlideIn {
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

export const Badge = styled.div`
  background-color: #0088cc;
  color: white;
  padding: 0.4rem 1.2rem;
  font-size: 0.85rem;
  border-radius: 999px;
  width: fit-content;
  margin-bottom: 1rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 136, 204, 0.3);
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.85;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const Title = styled.h2`
  font-size: 2.7rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #2b3a55;
  font-family: "Pretendard", "Noto Sans KR", sans-serif;
`;

export const SubText = styled.p`
  font-size: 1.1rem;
  color: #5a5a5a;
  line-height: 1.6;
  font-family: "Pretendard", "Noto Sans KR", sans-serif;
`;

export const ImageBox = styled.div`
  width: 55%;
  max-width: 1000px; /* 이미지 영역 넓힘 */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: visible;
  padding-right: 2rem;
  margin-top: 6rem;
`;

export const BannerImage = styled.img`
  width: 100%;
  max-width: 1000px;
  height: auto;
  object-fit: cover;
  filter: brightness(96%) contrast(105%);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.03) rotate(0.2deg);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }
`;
export const PaginationSpacer = styled.div`
  height: 60px;
  background-color: white;
`;
