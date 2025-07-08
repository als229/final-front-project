import styled from "styled-components";

export const SlideWrapper = styled.div`
  width: 100vw;
  height: 560px;
  background-color: #c9f2ff;
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
  transform: translateX(10rem);
`;

export const Badge = styled.div`
  background-color: black;
  color: white;
  padding: 0.4rem 1rem;
  font-size: 0.9rem;
  border-radius: 20px;
  width: fit-content;
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  font-size: 2.7rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const SubText = styled.p`
  font-size: 1.1rem;
  color: #555;
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
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
`;

export const PaginationSpacer = styled.div`
  height: 60px;
  background-color: white;
`;
