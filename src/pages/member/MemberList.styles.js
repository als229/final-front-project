import styled from 'styled-components';

export const MemberListContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5em;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
`;

export const Message = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.2em;
  margin-top: 50px;
`;

export const MemberCount = styled.p`
  text-align: right;
  color: #555;
  font-size: 1.1em;
  margin-bottom: 15px;
`;

export const MemberTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

export const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const TableData = styled.td`
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
  color: #333;
`;

export const TableButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  margin-right: 5px;

  &:hover {
    background-color: #218838;
  }

  &:last-child {
    margin-right: 0;
  }
`;
