import styled from "styled-components";
import { Swiper } from "swiper/react";

export const SectionWrapper = styled.section`
  margin: 4rem 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.2rem;
  font-weight: 700;
`;

export const StyledSwiper = styled(Swiper)`
  .swiper-slide {
    transition: all 0.3s ease;
    transform: scale(0.9);
    opacity: 0.7;

    &:hover {
      transform: scale(1.05);
      opacity: 1;
      z-index: 10;
    }
  }
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  cursor: pointer;
`;

export const ImageWrap = styled.div`
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.3s ease;
  }
`;

export const CardText = styled.div`
  padding: 1rem;
`;

export const Title = styled.h3`
  font-size: 1.1rem;
  margin: 0;
  font-weight: 600;
`;

export const Location = styled.p`
  font-size: 0.9rem;
  color: #777;
`;
