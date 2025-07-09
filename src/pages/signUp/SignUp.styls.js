import styled, { css } from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f9fc;
  padding: 20px;
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, sans-serif;
`;

export const SignupLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  max-width: 1200px;
  min-height: 700px;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const VisualSection = styled.div`
  background-image: url("https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80");
  background-size: cover;
  background-position: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(1px);
  }

  .content {
    position: relative;
    color: white;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center; /* 중앙 정렬로 변경 */
    align-items: flex-start;
    padding: 60px;
    z-index: 1;

    h2 {
      font-size: 3.2rem;
      font-weight: 700;
      margin-bottom: 24px;
      line-height: 1.1;
      letter-spacing: -0.5px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    }

    p {
      font-size: 1.25rem;
      opacity: 0.95;
      font-weight: 300;
      text-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
      max-width: 80%;
      letter-spacing: 0.2px;
      line-height: 1.5;
    }
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;
export const FormSection = styled.div`
  padding: 40px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

export const LogoBox = styled.div`
  margin-bottom: 30px;
`;

export const LogoText = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #3a86ff;

  span {
    color: #ff9e00;
  }
`;

export const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

export const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .step-number {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${(props) =>
      props.$active ? (props.$completed ? "#16a34a" : "#3a86ff") : "#e5e7eb"};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-bottom: 8px;
    transition: all 0.3s;

    ${(props) =>
      props.$completed &&
      css`
        &::before {
          content: "✓";
        }
      `}
  }

  .step-text {
    font-size: 0.8rem;
    color: ${(props) => (props.$active ? "#333" : "#9ca3af")};
    font-weight: ${(props) => (props.$active ? "500" : "400")};
    transition: all 0.3s;
  }
`;

export const StepLine = styled.div`
  height: 2px;
  flex: 1;
  background: ${(props) => (props.$active ? "#3a86ff" : "#e5e7eb")};
  margin: 0 10px 30px;
  transition: all 0.3s;
`;

export const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
`;

export const FormSubtitle = styled.p`
  font-size: 1rem;
  color: #777;
  margin-bottom: 30px;
`;

export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: #444;
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    color: #3a86ff;
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3a86ff;
    box-shadow: 0 0 0 3px rgba(58, 134, 255, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const InputWithButton = styled.div`
  display: flex;
  gap: 10px;
`;

export const InputFieldStyled = styled(InputField)`
  flex: 1;
  ${(props) =>
    props.$valid &&
    css`
      border-color: #16a34a;
      background-color: #f0fdf4;

      &:focus {
        border-color: #16a34a;
        box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
      }
    `}
`;

export const ActionButton = styled.button`
  padding: 0 20px;
  background: #3a86ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #2563eb;
  }

  &:disabled {
    background: #a8a8a8;
    cursor: not-allowed;
  }
`;

export const HelpText = styled.p`
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 6px;
`;

export const SubmitButtonWrapper = styled.div`
  margin-top: 10px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(to right, #3a86ff, #00c6ff);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
  margin-top: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 198, 255, 0.2);
  }

  &:disabled {
    background: linear-gradient(to right, #a8a8a8, #cccccc);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  i {
    font-size: 1.1rem;
  }
`;

export const LoginLink = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 0.9rem;
  color: #666;

  a {
    color: #3a86ff;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
