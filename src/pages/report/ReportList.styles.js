import styled from 'styled-components';

export const ReportListContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 25px;
  font-size: 2em;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
`;

export const Message = styled.p`
  text-align: center;
  color: #7f8c8d;
  font-size: 1.2em;
  padding: 20px;
  background-color: #ecf0f1;
  border-radius: 5px;
  margin-top: 20px;
`;

export const ReportCount = styled.p`
  text-align: center;
  color: #27ae60;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 1.1em;
`;

export const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse; /* 테이블 셀 경계선 병합 */
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden; /* 모서리 둥글게 처리 */
`;

export const TableHeader = styled.th`
  background-color: #3498db;
  color: white;
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
  font-size: 0.95em;
  border-bottom: 1px solid #ddd;

  &:first-child {
    border-top-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) { /* 짝수 행 배경색 */
    background-color: #f2f2f2;
  }
  &:hover { /* 마우스 오버 시 배경색 */
    background-color: #e9f5ff;
  }
`;

export const TableData = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  color: #333;
  font-size: 0.9em;

  /* 내용이 길 경우 줄 바꿈 및 말 줄임표 */
  &.content-column {
    max-width: 250px; /* 최대 너비 설정 */
    white-space: nowrap; /* 줄 바꿈 방지 */
    overflow: hidden; /* 넘치는 내용 숨김 */
    text-overflow: ellipsis; /* 말 줄임표 (...) 표시 */
  }
`;

export const TableButton = styled.button` /* 표 내 버튼 스타일 */
  background-color: #28a745; /* 초록색 계열 */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 0.85em;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #218838;
  }
`;
