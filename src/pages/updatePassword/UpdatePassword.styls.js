import styled from "styled-components";

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const SectionTitle = styled.h2`
  margin: 40px 0 16px;
  border-bottom: 2px solid #eee;
  padding-bottom: 8px;
`;
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 25px;
`;

export const Button = styled.button`
  width: 400px;
  height: 40px;
`;

export const UpdateForm = styled.form`
  width: 400px;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
  }

  &::placeholder {
    color: #bbb;
  }
`;
export const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 12px;
`;
export const Description = styled.p`
  font-size: 15px;
  color: #444;
  margin-bottom: 4px;
`;
