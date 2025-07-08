import styled from "styled-components";
export const SectionWrapper = styled.section`
  padding: 2rem 1rem;
  background: #f8f9fa;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const SwiperWrap = styled.div`
  position: relative;

  .swiper-button-prev,
  .swiper-button-next {
    color: #000;
  }
`;

export const Card = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;
s;

export const CardTitle = styled.p`
  font-weight: 600;
  margin: 0.5rem;
  font-size: 0.95rem;
`;

export const CardSubtitle = styled.p`
  color: #555;
  font-size: 0.85rem;
  margin: 0 0.5rem 0.8rem 0.5rem;
`;
