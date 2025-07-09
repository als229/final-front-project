import styled from "styled-components";

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

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1000px;
  min-height: 550px;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const VisualSection = styled.div`
  background-image: url("https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80");
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
    background: linear-gradient(135deg);
    backdrop-filter: blur(1px);
  }

  .content {
    position: relative;
    color: white;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    z-index: 1;

    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 20px;
      line-height: 1.2;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    p {
      font-size: 1.1rem;
      opacity: 0.9;
      font-weight: 300;
      text-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
      max-width: 90%;
    }
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const FormSection = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 40px 30px;
  }
`;

export const LogoText = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #3a86ff;
  margin-bottom: 30px;

  span {
    color: #ff9e00;
  }
`;

export const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
`;

export const FormSubtitle = styled.p`
  font-size: 0.95rem;
  color: #777;
  margin-bottom: 30px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  position: relative;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 10px;
  color: #444;
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    color: #3a86ff;
    font-size: 1rem;
  }
`;

export const InputField = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3a86ff;
    box-shadow: 0 0 0 3px rgba(58, 134, 255, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 15px;
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 198, 255, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const BackToLogin = styled.button.attrs({
  type: "button",
})`
  background: none;
  border: none;
  color: #3a86ff;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;

  &:hover {
    text-decoration: underline;
  }
`;

export const LoadingSpinner = styled.i`
  font-size: 1.2rem;
`;
