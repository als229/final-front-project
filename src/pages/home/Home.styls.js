import styled from "styled-components";

export const HomeContainer = styled.div`
  max-width: 100%;
  overflow-x: hidden;
  padding-bottom: 60px;
  background-color: #f9fafb;
`;

export const SectionDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0 30px;
  position: relative;

  &::before {
    content: "";
    height: 1px;
    width: 100%;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.03),
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.03)
    );
    position: absolute;
  }

  span {
    background-color: #f9fafb;
    padding: 0 20px;
    position: relative;
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    font-family: "Pretendard", -apple-system, sans-serif;

    &::before {
      content: "✈️";
      margin-right: 8px;
      font-size: 1.2rem;
    }
  }
`;

export const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3a86ff, #00c6ff);
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 133, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s ease;

  i {
    font-size: 1.2rem;
  }

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 133, 255, 0.35);
  }
`;
