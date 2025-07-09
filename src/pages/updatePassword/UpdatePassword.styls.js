import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7f9fc;
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, sans-serif;
`;

export const PageHeader = styled.header`
  position: relative;
  height: 240px;
  overflow: hidden;
`;

export const HeaderImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://images.unsplash.com/photo-1499678329028-101435549a4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80");
  background-size: cover;
  background-position: center;
  z-index: 0;
`;

export const HeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right);
  z-index: 1;
`;

export const HeaderContent = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  color: white;
  z-index: 2;

  h1 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 15px;
    line-height: 1.2;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  p {
    font-size: 1.1rem;
    font-weight: 300;
    opacity: 0.9;
    text-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 40px 20px;

    h1 {
      font-size: 1.8rem;
    }
  }
`;

export const ContentContainer = styled.div`
  max-width: 600px;
  width: 90%;
  margin: -40px auto 60px;
  padding: 0;
  position: relative;
  z-index: 3;
`;

export const FormCard = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  padding: 40px;
  position: relative;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

export const SecurityIcon = styled.i`
  font-size: 2.5rem;
  color: #3a86ff;
  background-color: rgba(58, 134, 255, 0.1);
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 20px;
`;

export const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
`;

export const FormDescription = styled.p`
  color: #777;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 30px;
`;

export const UpdateForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const FormGroup = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #444;
  margin-bottom: 8px;

  i {
    color: #3a86ff;
  }
`;

export const InputField = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 40px 0 15px;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  background-color: #f8f9fa;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3a86ff;
    box-shadow: 0 0 0 3px rgba(58, 134, 255, 0.1);
    background-color: #fff;
  }

  &::placeholder {
    color: #aaa;
  }

  ${(props) =>
    props.$valid &&
    `
    border-color: #40c057;
    background-color: rgba(64, 192, 87, 0.05);
  `}
`;

export const InputIcon = styled.i`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: #aaa;
  z-index: 1;
  pointer-events: none;

  /* 기존 margin-top 제거 */

  &.text-success {
    color: #40c057;
  }

  &.text-danger {
    color: #fa5252;
  }
`;

export const PasswordStrength = styled.div`
  margin-top: 8px;

  .bar {
    height: 4px;
    background-color: rgb(255, 255, 255);
    border-radius: 2px;
    overflow: hidden;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: ${(props) => props.strength * 25}%;
      background-color: ${(props) =>
        props.strength === 0
          ? "#e9ecef"
          : props.strength === 1
          ? "#fa5252"
          : props.strength === 2
          ? "#fd7e14"
          : props.strength === 3
          ? "#20c997"
          : "#40c057"};
      transition: all 0.3s;
    }
  }

  span {
    display: block;
    font-size: 0.8rem;
    color: #868e96;
    margin-top: 4px;
    text-align: right;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 15px;
  background: linear-gradient(to right, #3a86ff, #00c6ff);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(58, 134, 255, 0.2);

  &:hover {
    box-shadow: 0 6px 15px rgba(58, 134, 255, 0.3);
    transform: translateY(-2px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 15px;
  background-color: #f1f3f5;
  color: #495057;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;

  &:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
  }
`;

export const PasswordTips = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid #3a86ff;

  h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #495057;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 10px;

    i {
      color: #fd7e14;
    }
  }

  ul {
    padding-left: 20px;
    color: #666;
    font-size: 0.9rem;

    li {
      margin-bottom: 6px;
    }

    li:last-child {
      margin-bottom: 0;
    }
  }
`;
