import styled from "styled-components";

// 전체 컨테이너 - 더 세련된 배경과 그림자 효과
export const AdminContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
  transition: all 0.3s ease;
`;

// 헤더 섹션
export const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
  border-bottom: 1px solid #f0f2f5;
  padding-bottom: 20px;
`;

// 제목 스타일 개선
export const AdminTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  display: flex;
  align-items: center;

  i {
    color: #3b82f6;
    margin-right: 12px;
    font-size: 1.8rem;
  }
`;

// 도구 영역 개선
export const AdminTools = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
`;

// 검색 폼 현대적으로 개선
export const SearchForm = styled.form`
  display: flex;
  background: #f9fafb;
  border-radius: 50px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  transition: all 0.2s ease;

  &:focus-within {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    border-color: #3b82f6;
    background: white;
  }
`;

// 검색 입력창 세련되게 개선
export const SearchInput = styled.input`
  padding: 12px 20px;
  border: none;
  font-size: 0.95rem;
  width: 300px;
  background: transparent;
  color: #374151;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

// 검색 버튼 현대적으로 개선
export const SearchButton = styled.button`
  background: transparent;
  color: #6b7280;
  border: none;
  padding: 0 20px;
  border-left: 1px solid #e5e7eb;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #3b82f6;
  }

  i {
    font-size: 1rem;
  }
`;

// 필터 컨테이너 개선
export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f9fafb;
  padding: 4px 16px;
  border-radius: 50px;
  border: 1px solid #e5e7eb;
`;

// 필터 레이블 세련되게
export const FilterLabel = styled.label`
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
`;

// 필터 선택 드롭다운 개선
export const FilterSelect = styled.select`
  padding: 8px 12px;
  border: none;
  font-size: 0.9rem;
  background-color: transparent;
  color: #374151;
  font-weight: 500;

  &:focus {
    outline: none;
  }

  option {
    background: white;
    color: #1f2937;
  }
`;

// 통계 정보 카드 개선
export const AdminStatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

// 통계 카드 디자인 개선
export const StatBox = styled.div`
  background: ${(props) =>
    props.$active
      ? "linear-gradient(to right bottom, #dcfce7, #ecfdf5)"
      : props.$inactive
      ? "linear-gradient(to right bottom, #fee2e2, #fef2f2)"
      : "linear-gradient(to right bottom, #f0f9ff, #e0f2fe)"};
  border-radius: 12px;
  padding: 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }
`;

// 통계 제목 개선
export const StatTitle = styled.div`
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 10px;
  font-weight: 500;
`;

// 통계 숫자 개선
export const StatNumber = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${(props) =>
    props.$active ? "#059669" : props.$inactive ? "#dc2626" : "#0284c7"};
`;

// 테이블 컨테이너 개선
export const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

// 관리자 테이블 개선
export const AdminTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

// 테이블 헤더 개선
export const TableHeader = styled.th`
  background: #f9fafb;
  color: #4b5563;
  font-weight: 600;
  padding: 16px;
  text-align: left;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 10;
`;

// 테이블 행 개선
export const TableRow = styled.tr`
  &:hover {
    background: #f9fafb;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }
`;

// 테이블 셀 개선
export const TableCell = styled.td`
  padding: 16px;
  color: #1f2937;
  font-size: 0.95rem;
  transition: background 0.2s;
`;

// 상태 배지 개선
export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  background: ${(props) => (props.$active ? "#dcfce7" : "#fee2e2")};
  color: ${(props) => (props.$active ? "#059669" : "#dc2626")};

  &:before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 8px;
    background: ${(props) => (props.$active ? "#10b981" : "#ef4444")};
  }
`;

// 액션 버튼 개선
export const ActionButton = styled.button`
  background: #f3f4f6;
  border: none;
  color: #4b5563;
  border-radius: 50px;
  padding: 8px 16px;
  font-size: 0.85rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #3b82f6;
    color: white;
  }

  i {
    font-size: 0.9rem;
  }
`;

// 페이지네이션 컨테이너 개선
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 6px;
  border-top: 1px solid #f3f4f6;
`;

// 페이지네이션 버튼 개선
export const PaginationButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #f3f4f6;
    border-color: #d1d5db;
  }
`;

// 페이지 번호 버튼 개선
export const PageNumber = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: ${(props) => (props.$active ? "#3b82f6" : "transparent")};
  color: ${(props) => (props.$active ? "white" : "#4b5563")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: ${(props) => (props.$active ? "600" : "400")};

  &:hover:not(:disabled) {
    background: ${(props) => (props.$active ? "#2563eb" : "#f3f4f6")};
  }
`;

// 로딩 상태 개선
export const LoadingState = styled.div`
  padding: 60px;
  text-align: center;
  color: #6b7280;

  i {
    font-size: 1.5rem;
    margin-right: 10px;
    color: #3b82f6;
  }
`;

// 에러 상태 개선
export const ErrorState = styled.div`
  padding: 40px;
  text-align: center;
  color: #ef4444;
  background: #fef2f2;
  border-radius: 12px;
  border: 1px solid #fee2e2;
  margin: 20px 0;

  i {
    font-size: 1.5rem;
    margin-right: 10px;
  }
`;

// 빈 결과 상태 개선
export const EmptyState = styled.div`
  padding: 80px 20px;
  text-align: center;
  color: #6b7280;

  i {
    font-size: 3.5rem;
    margin-bottom: 20px;
    opacity: 0.3;
    color: #9ca3af;
  }

  p {
    font-size: 1.1rem;
    color: #4b5563;
  }
`;

// 기존 스타일 유지 (호환성을 위해)
export const MemberListContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Arial", sans-serif;
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
