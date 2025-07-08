import styled from "styled-components";

// --- 공통 신고 관련 컴포넌트 스타일 (AdminReportProcessModal 및 일반 ReportModal에서 사용) ---

export const ReportContainer = styled.div`
  padding: 25px; /* 내부 여백 */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15); /* 그림자 */
  width: 100%;
  max-width: 550px; /* 최대 너비 */
  margin: 0 auto; /* 중앙 정렬 */
  text-align: center; /* 내부 텍스트 및 일부 요소 가운데 정렬 */
  position: relative; /* 모달 내에서 위치 조정을 위해 */

  h2 {
    margin-bottom: 25px;
    font-size: 1.8em;
    color: #2c3e50;
  }

  p {
    margin-bottom: 10px;
    font-size: 0.95em;
    color: #6c7a89;
    line-height: 1.4;
    text-align: left; /* 본문 텍스트는 왼쪽 정렬 */
  }
`;

export const ReportForm = styled.div`
  margin-bottom: 20px;
  text-align: left; /* 폼 라벨과 입력 필드 왼쪽 정렬 */
`;

export const ReportLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #34495e;
  font-size: 0.95em;
`;

// 공통 입력 스타일
const ReportInput = `
  width: 100%;
  padding: 10px 12px;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  font-size: 1em;
  color: #333;
  background-color: #fcfdfe;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  /* readOnly 속성이 있을 때의 스타일 */
  &[readOnly] {
    background-color: #e9ecef; /* 더 연한 회색 */
    cursor: not-allowed;
    color: #555;
  }
`;

export const Select = styled.select`
  ${ReportInput}
  height: 40px; /* Select 박스 높이 고정 */
  appearance: none; /* 기본 select 화살표 제거 (커스텀 디자인을 위해) */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236c757d'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E"); /* 커스텀 화살표 */
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1em;
`;

export const ReportTextArea = styled.textarea`
  ${ReportInput}
  min-height: 90px;
  max-height: 200px; /* 사용자가 조절할 수 있는 최대 높이 */
  resize: vertical;
`;

// 신고 버튼 (공통)
export const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.05em;
  width: 100%;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  margin-top: 25px; /* 기본 버튼 위 여백 */

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.2);
  }

  &:active {
    background-color: #004085;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

// 리뷰 삭제 버튼 (관리자용)
export const DeleteButton = styled(SubmitButton)`
  background-color: #dc3545; /* 빨간색 계열 */
  margin-top: 15px; /* 제출 버튼과의 간격 */

  &:hover {
    background-color: #c82333;
    box-shadow: 0 2px 8px rgba(220, 53, 69, 0.2);
  }

  &:active {
    background-color: #bd2130;
  }
`;

// --- 신고 목록 관련 스타일 (ReportList에서 사용) ---

export const ReportListContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
  margin-bottom: 25px;
  text-align: center;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
`;

export const Message = styled.p`
  font-size: 1.2em;
  color: #666;
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  background-color: #e9ecef;
  border-radius: 5px;
`;

export const ReportCount = styled.p`
  font-size: 1.1em;
  color: #555;
  text-align: right;
  margin-bottom: 15px;
`;

export const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  padding: 15px 10px;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  font-size: 0.95em;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #e9ecef;
  }
`;

export const TableData = styled.td`
  padding: 12px 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  vertical-align: middle;
  font-size: 0.9em;
  color: #333;

  &.content-column {
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }
`;

export const TableButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #218838;
  }
`;
