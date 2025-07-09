import styled from "styled-components";

// 전체 컨테이너
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

// 제목 스타일
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

// 도구 영역
export const AdminTools = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
`;

// 검색 폼
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

// 검색 입력창
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

// 검색 버튼
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

// 필터 그룹
export const FilterGroup = styled.div`
  position: relative;
  min-width: 140px;
`;

// 필터 레이블
export const FilterLabel = styled.label`
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 6px;
`;
// 필터 선택
export const FilterSelect = styled.select`
  appearance: none;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 14px;
  padding-right: 36px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #1f2937;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:hover {
    border-color: #d1d5db;
    background-color: #f9fafb;
  }

  /* 드롭다운 화살표 스타일 추가 */
  &:after {
    content: "";
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #6b7280;
    pointer-events: none;
  }
`;
// 드롭다운 아이콘 컨테이너 추가
export const SelectIconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: calc(50% + 6px); /* FilterLabel 높이 보정 */
  transform: translateY(-50%);
  pointer-events: none;
  color: #6b7280;

  ${FilterSelect}:focus + & {
    color: #3b82f6;
  }
`;

// 통계 정보 행
export const AdminStatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

// 통계 박스
export const StatBox = styled.div`
  background: ${(props) =>
    props.$active
      ? "linear-gradient(to right bottom, #dcfce7, #ecfdf5)"
      : props.$pending
      ? "linear-gradient(to right bottom, #fef9c3, #fef3c7)"
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

// 통계 제목
export const StatTitle = styled.div`
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 10px;
  font-weight: 500;
`;

// 통계 숫자
export const StatNumber = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${(props) =>
    props.$active
      ? "#059669"
      : props.$pending
      ? "#ca8a04"
      : props.$inactive
      ? "#dc2626"
      : "#0284c7"};
`;

// 액션 바
export const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// 컨텐츠 버튼
export const ContentButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
  }

  i {
    font-size: 1rem;
  }
`;

// 테이블 컨테이너
export const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

// 컨텐츠 테이블
export const ContentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

// 테이블 헤더
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
  width: ${(props) => props.width || "auto"};
`;

// 테이블 행
export const TableRow = styled.tr`
  &:hover {
    background: #f9fafb;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }
`;

// 테이블 셀
export const TableCell = styled.td`
  padding: 16px;
  color: #1f2937;
  font-size: 0.95rem;
  transition: background 0.2s;
  vertical-align: top;
`;

// 컨텐츠 이미지
export const ContentImage = styled.img`
  width: 100px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

// 이미지가 없을 때 대체할 플레이스홀더
export const ContentImagePlaceholder = styled.div`
  width: 100px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 6px;
  color: #9ca3af;

  i {
    font-size: 1.5rem;
  }
`;

// 컨텐츠 제목 (기본 스타일) - 이름 변경
export const ContentItemTitle = styled.div`
  font-weight: 600;
  color: #111827;
  margin-bottom: 6px;
  font-size: 1.05rem;
`;

// 컨텐츠 상세 정보
export const ContentDetail = styled.div`
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 6px;

  i {
    margin-right: 5px;
  }
`;

// 태그 컨테이너
export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`;

// 태그 아이템
export const TagItem = styled.span`
  background: #f3f4f6;
  color: #4b5563;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
`;

// 상태 배지
export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  background: ${(props) => {
    switch (props.$variant) {
      case "active":
        return "#dcfce7";
      case "pending":
        return "#fef9c3";
      case "inactive":
        return "#fee2e2";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.$variant) {
      case "active":
        return "#059669";
      case "pending":
        return "#ca8a04";
      case "inactive":
        return "#dc2626";
      default:
        return "#4b5563";
    }
  }};

  &:before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
    background: ${(props) => {
      switch (props.$variant) {
        case "active":
          return "#10b981";
        case "pending":
          return "#eab308";
        case "inactive":
          return "#ef4444";
        default:
          return "#9ca3af";
      }
    }};
  }
`;

// 페이지네이션 컨테이너
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 6px;
  border-top: 1px solid #f3f4f6;
`;

// 페이지네이션 버튼
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

// 페이지 번호 버튼
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

// 로딩 상태
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

// 에러 상태
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

// 빈 결과 상태
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

// 콘텐츠 제목 클릭 가능 스타일 - 이름 변경
export const ContentTitle = styled.div`
  font-weight: 600;
  color: #2563eb;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// 통계 행
export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

// 새로고침 버튼
export const RefreshButton = styled.button`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 8px 16px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #4b5563;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    color: #3b82f6;
  }

  i {
    font-size: 0.9rem;
  }
`;

// 일괄 작업 그룹
export const BulkActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const BulkActionLabel = styled.span`
  font-size: 0.9rem;
  color: #6b7280;
  margin-right: 8px;
  font-weight: 500;
`;

export const BulkActionButton = styled.button`
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;

  background: ${(props) => {
    if (props.$approve) return "#dcfce7";
    if (props.$disable) return "#fee2e2";
    return "#f3f4f6";
  }};

  color: ${(props) => {
    if (props.$approve) return "#059669";
    if (props.$disable) return "#dc2626";
    return "#6b7280";
  }};

  &:hover {
    filter: brightness(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// 콘텐츠 추가 버튼
export const AddContentButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  margin-left: 16px;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #2563eb;
  }

  i {
    font-size: 0.9rem;
  }
`;

// 내보내기 버튼
export const ExportButton = styled.button`
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  padding: 8px 16px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #4b5563;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e5e7eb;
    color: #1f2937;
  }

  i {
    font-size: 0.9rem;
  }
`;
// ActionButtonGroup 정의 아래에 ActionButton 추가
export const ActionButtonGroup = styled.div`
  display: flex;
  gap: 6px;
`;

// 액션 버튼 추가
export const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  /* 버튼 타입에 따른 스타일 */
  background: ${(props) => {
    if (props.$view) return "#e0f2fe";
    if (props.$edit) return "#e0e7ff";
    if (props.$approve) return "#dcfce7";
    if (props.$disable) return "#fee2e2";
    return "#f3f4f6";
  }};

  color: ${(props) => {
    if (props.$view) return "#0369a1";
    if (props.$edit) return "#4f46e5";
    if (props.$approve) return "#059669";
    if (props.$disable) return "#dc2626";
    return "#6b7280";
  }};

  &:hover {
    transform: translateY(-2px);
    filter: brightness(0.95);
  }

  &:active {
    transform: translateY(0);
  }
`;
