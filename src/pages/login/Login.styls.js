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

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
`;

export const LoginContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 600px;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageSection = styled.div`
  background-image: url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80");
  background-size: cover;
  background-position: center;
  position: relative;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  }

  h2 {
    position: relative;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 15px;
    line-height: 1.2;
  }

  p {
    position: relative;
    font-size: 1.1rem;
    opacity: 0.9;
    font-weight: 300;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const FormSection = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
`;

export const LogoArea = styled.div`
  margin-bottom: 30px;
`;

export const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #3a86ff;

  span {
    color: #ff9e00;
  }
`;

export const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
`;

export const SubTitle = styled.p`
  font-size: 1rem;
  color: #777;
  margin-bottom: 30px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  position: relative;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: #444;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 14px 16px;
  padding-left: 40px;
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
`;

export const InputIcon = styled.i`
  position: absolute;
  top: 42px;
  left: 16px;
  color: #aaa;
  font-size: 1rem;
`;

export const ForgotLinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

export const ForgotLink = styled.button`
  background: none;
  border: none;
  color: #555;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    color: #3a86ff;
  }

  i {
    font-size: 0.8rem;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 14px;
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

export const SignupContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const SignupText = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

export const SignupButton = styled.button`
  padding: 12px 20px;
  border: 2px solid #3a86ff;
  border-radius: 8px;
  background: transparent;
  color: #3a86ff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;

  &:hover {
    background: #3a86ff;
    color: white;
  }
`;
