import styled from "styled-components";

export const ModalTitle = styled.h2`
  margin-top: 0;
  color: #333;
`;

export const MemberInfo = styled.div`
  margin-bottom: 20px;
  p {
    margin: 8px 0;
    strong {
      margin-right: 10px;
      color: #555;
    }
  }
`;

export const FormField = styled.div`
  margin-bottom: 15px;
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #444;
  }
  input, select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const ActionButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  &:hover {
    background-color: #0056b3;
  }
  &.cancel {
    background-color: #6c757d;
    &:hover {
      background-color: #5a6268;
    }
  }
`;
