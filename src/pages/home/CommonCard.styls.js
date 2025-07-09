import styled from "styled-components";

export const SlideWrapper = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const MainTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  position: relative;
  font-family: "Pretendard", -apple-system, sans-serif;

  &::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(to right, #3a86ff, #00c6ff);
    border-radius: 2px;
  }
`;

export const VerticalBar = styled.div`
  height: 20px;
  width: 2px;
  background-color: #ddd;
  margin: 0 15px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SubText = styled.p`
  color: #666;
  font-size: 1rem;
  margin: 0;

  @media (max-width: 768px) {
    margin-top: 8px;
    font-size: 0.9rem;
  }
`;

export const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 15px;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 70%;
  overflow: hidden;
`;

export const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 6px 12px;
  background: linear-gradient(135deg, #3a86ff, #00c6ff);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 20px;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

export const CardBottom = styled.div`
  padding: 20px;
`;

export const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: #2c3e50;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: "Pretendard", -apple-system, sans-serif;
`;

export const Location = styled.p`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #3a86ff;
  margin: 0 0 8px 0;
  font-weight: 500;

  &::before {
    content: "📍";
    margin-right: 5px;
    font-size: 0.9rem;
  }
`;

export const Address = styled.p`
  font-size: 0.85rem;
  color: #777;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
