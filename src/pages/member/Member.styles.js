import styled from "styled-components";

export const ModalContent = styled.div`
  max-width: 650px;
  width: 100%;
`;

export const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  background: #f8fafc;
  border-radius: 8px 8px 0 0;
`;

export const ModalTitle = styled.h2`
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;

  i {
    margin-right: 10px;
    color: #3b82f6;
  }
`;

export const ModalBody = styled.div`
  padding: 20px;
`;

export const MemberInfoCard = styled.div`
  background: #f0f9ff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  border: 1px solid #e0f2fe;
`;

export const MemberInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoLabel = styled.span`
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 4px;
  font-weight: 500;
`;

export const InfoValue = styled.span`
  font-size: 1rem;
  color: #0f172a;
  font-weight: 500;
`;

export const StatusIndicator = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 30px;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${(props) => (props.$active ? "#dcfce7" : "#fee2e2")};
  color: ${(props) => (props.$active ? "#059669" : "#dc2626")};

  &:before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
    background: ${(props) => (props.$active ? "#10b981" : "#ef4444")};
  }
`;

export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: #e5e7eb;
  margin: 24px 0;
`;

export const FormSection = styled.div`
  margin-bottom: 20px;
`;

export const FormTitle = styled.h3`
  font-size: 1.1rem;
  color: #334155;
  margin-bottom: 16px;
  font-weight: 600;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: center;
`;

export const InputLabel = styled.label`
  font-size: 0.9rem;
  color: #475569;
  font-weight: 500;
  margin-bottom: 6px;
  grid-column: 1 / -1;
`;

export const StyledInput = styled.input`
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const StyledSelect = styled.select`
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.95rem;
  background-color: white;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
`;

export const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;

  i {
    font-size: 0.9rem;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SaveButton = styled(ActionButton)`
  background: #2563eb;
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }

  &:disabled {
    background: #93c5fd;
  }
`;

export const CancelButton = styled(ActionButton)`
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;

  &:hover {
    background: #e2e8f0;
    color: #1e293b;
  }
`;

// 기존 스타일 유지 (호환성을 위해)
export const MemberInfo = styled.div`
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;

  p {
    margin: 5px 0;
  }
`;

export const FormField = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
  }

  input,
  select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
  }
`;
