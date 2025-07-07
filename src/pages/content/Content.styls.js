import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 8rem;
`;

export const TableContainer = styled.div`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
`;

export const Thead = styled.thead`
  background-color: #f3f4f6;
`;

export const Tr = styled.tr`
  border-top: 1px solid #e5e7eb;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const Th = styled.th`
  text-align: left;
  padding: 0.75rem 1rem;
  color: #374151;
  font-weight: 600;
`;

export const Td = styled.td`
  padding: 0.75rem 1rem;
  color: #4b5563;
`;

export const ActionButton = styled.button`
  background-color: ${(props) => (props.delete ? "#f87171" : "#60a5fa")};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 4px 10px;
  margin-right: 6px;
  cursor: pointer;
  font-size: 0.85rem;

  &:hover {
    opacity: 0.9;
  }
`;
