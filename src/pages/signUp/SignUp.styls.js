import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 160px);
`;

export const SignUpForm = styled.form`
  display: flex;
  width: 400px;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const SignUpBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const InputVerify = styled.input`
  width: 320px;
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

export const RowBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const SignUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;
export const Button = styled.button`
  width: 400px;
  height: 40px;
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
