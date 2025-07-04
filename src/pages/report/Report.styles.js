import styled from "styled-components";

export const ReportContainer = styled.div`
  h2 {
    margin-bottom: 20px;
    font-size: 1.5em;
    color: #333;
  }

  p {
    margin-bottom: 10px;
    font-size: 1em;
    color: #555;
  }
`;

export const ReportForm = styled.div`
  margin-bottom: 15px;
`;

export const ReportLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

// 공통 입력 스타일
const ReportInput = `
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 1em;

  &:focus {
    outline: none;
    border-color: #007bff; /* 포커스 시 테두리 색상 변경 */
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

export const Select = styled.select`
  ${ReportInput}
`;

export const ReportTextArea = styled.textarea`
  ${ReportInput}
  margin-bottom: 10px;
  resize: vertical; /* 세로 크기 조정 */
`;

// 신고 버튼 스타일
export const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  width: 100%;
  
  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004085;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
