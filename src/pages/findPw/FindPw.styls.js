import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 160px);
`;

export const FindPwBox = styled.div`
  display: flex;
  justify-content: center;
`;
export const FindPwForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  gap: 16px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
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
