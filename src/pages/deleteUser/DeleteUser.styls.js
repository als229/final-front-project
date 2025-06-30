import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 160px);
`;
export const DeleteForm = styled.form`
  width: 450px;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
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

  }
`;
export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;
export const ConfirmButton = styled.button`
  flex: 1;
  background-color: #ff4d4f;
  color: white;
  border: none;
  height: 40px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #d9363e;
  }
`;
export const CancelButton = styled.button`
  flex: 1;
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  height: 40px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const CheckboxTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ConfirmText = styled.p`
  font-size: 14px;
`;
export const StyledList = styled.ul`
  padding-left: 20px;
  font-size: 14px;
  color: #444;
`;

export const StyledListItem = styled.li`
  margin-bottom: 12px; // li 간 간격
  line-height: 1.6; // 줄 간격
  list-style-type: disc; // 기본 점 스타일 (필요시 변경 가능)
`;
