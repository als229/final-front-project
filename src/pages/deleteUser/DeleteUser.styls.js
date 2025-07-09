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
  height: 280px;
  overflow: hidden;
`;

export const HeaderImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://images.unsplash.com/photo-1503221043305-f7498f8b7888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80");
  background-size: cover;
  background-position: center 40%;
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
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 1.1rem;
    font-weight: 300;
    opacity: 0.9;
    text-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 40px 20px;

    h1 {
      font-size: 1.8rem;
    }
  }
`;

export const FormContainer = styled.div`
  max-width: 700px;
  width: 90%;
  margin: -50px auto 60px;
  padding: 0;
  position: relative;
  z-index: 3;
`;

export const DeleteForm = styled.form`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  padding: 40px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background-color: #8a63d2;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

export const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
`;

export const FormDescription = styled.p`
  color: #777;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 25px;
`;

export const StyledList = styled.ul`
  list-style: none;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 30px;
  border-left: 4px solid #8a63d2;
`;

export const StyledListItem = styled.li`
  padding: 8px 0;
  color: #555;
  font-size: 0.95rem;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;

  i {
    color: #d55b92;
    margin-right: 10px;
    margin-top: 3px;
  }

  &:last-child {
    i {
      color: #4a6fa5;
    }
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 25px;
  position: relative;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #444;
  margin-bottom: 10px;

  i {
    color: #8a63d2;
  }
`;

export const InputField = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f8f9fa;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #8a63d2;
    box-shadow: 0 0 0 3px rgba(138, 99, 210, 0.1);
    background-color: #fff;
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const StyledCheckbox = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  cursor: pointer;
  accent-color: #8a63d2;
`;

export const CheckboxLabel = styled.label`
  color: #444;
  font-size: 0.95rem;
  cursor: pointer;
`;

export const FarewellMessage = styled.div`
  padding: 15px;
  background-color: rgba(138, 99, 210, 0.05);
  border-radius: 8px;
  color: #8a63d2;
  font-size: 1rem;
  margin-bottom: 25px;
  text-align: center;
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  i {
    font-size: 1.2rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 576px) {
    flex-direction: column-reverse;
  }
`;

export const ConfirmButton = styled.button`
  flex: 1;
  padding: 15px;
  background: linear-gradient(to right, #d55b92, #8a63d2);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(138, 99, 210, 0.2);

  &:hover:not(:disabled) {
    box-shadow: 0 6px 15px rgba(138, 99, 210, 0.3);
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
  font-size: 0.95rem;
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
