import styled from "styled-components";

// 메인 컨테이너
export const DetailContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

// 헤더 섹션
export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const BackButton = styled.button`
  background: #f3f4f6;
  border: none;
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
    color: #111827;
  }

  i {
    font-size: 0.9rem;
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  flex-grow: 1;
  text-align: center;

  @media (max-width: 768px) {
    text-align: left;
    width: 100%;
    margin-top: 8px;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const EditButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;

  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  i {
    font-size: 0.9rem;
  }
`;

export const DeleteButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;

  &:hover {
    background: #dc2626;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  i {
    font-size: 0.9rem;
  }
`;

// 콘텐츠 상태 바
export const ContentStatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
  padding: 16px 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ContentId = styled.div`
  font-weight: 500;
  color: #6b7280;

  span {
    font-weight: 600;
    color: #4b5563;
    margin-left: 4px;
  }
`;

export const StatusGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const StatusLabel = styled.span`
  font-weight: 500;
  color: #4b5563;
`;

export const StatusBadge = styled.span`
  background: ${(props) => (props.$color ? `${props.$color}20` : "#f3f4f6")};
  color: ${(props) => props.$color || "#6b7280"};
  padding: 4px 12px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;

  &:before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
    background: ${(props) => props.$color || "#9ca3af"};
  }
`;

export const StatusActions = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const StatusButton = styled.button`
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
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  i {
    font-size: 0.9rem;
  }
`;

// 콘텐츠 섹션
export const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ContentImageSection = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  background: #f8fafc;
`;

export const MainImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

export const NoImagePlaceholder = styled.div`
  width: 100%;
  height: 300px;
  background: #f3f4f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9ca3af;

  i {
    font-size: 3rem;
    margin-bottom: 12px;
    opacity: 0.5;
  }

  span {
    font-size: 1rem;
    opacity: 0.8;
  }
`;

export const ContentInfoSection = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const ContentInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`;

export const InfoItem = styled.div`
  margin-bottom: 12px;
`;

export const InfoLabel = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 4px;
  font-weight: 500;
`;

export const InfoValue = styled.div`
  font-size: 1rem;
  color: #111827;
  font-weight: 500;
  word-break: break-word;
`;

// 설명 섹션
export const DescriptionSection = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #111827;
  margin-top: 0;
  margin-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 8px;
`;

export const DescriptionText = styled.div`
  line-height: 1.6;
  color: #374151;
  white-space: pre-wrap;
  font-size: 0.95rem;
`;

// 갤러리 섹션
export const GallerySection = styled.div`
  margin-bottom: 24px;
`;

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  margin-top: 16px;
`;

export const GalleryImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

// 지도 섹션
export const MapSection = styled.div`
  margin-bottom: 24px;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  background: #f3f4f6;
`;

// 로딩 및 에러 메시지
export const LoadingMessage = styled.div`
  padding: 40px;
  text-align: center;
  font-size: 1.1rem;
  color: #6b7280;

  i {
    margin-right: 10px;
    color: #3b82f6;
    animation: spin 1s infinite linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  padding: 40px;
  text-align: center;
  font-size: 1.1rem;
  color: #ef4444;
  background: #fef2f2;
  border-radius: 8px;
  border: 1px solid #fee2e2;

  i {
    margin-right: 10px;
  }
`;

// 댓글 섹션
export const CommentsSection = styled.div`
  margin-bottom: 24px;
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

export const CommentItem = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid #e5e7eb;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const CommentAuthor = styled.span`
  font-weight: 600;
  color: #4b5563;
`;

export const CommentDate = styled.span`
  font-size: 0.85rem;
  color: #9ca3af;
`;

export const CommentText = styled.p`
  margin: 0;
  color: #374151;
  line-height: 1.5;
`;

// 히스토리 섹션
export const HistorySection = styled.div`
  margin-bottom: 24px;
`;

export const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const HistoryItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
`;

export const HistoryIcon = styled.div`
  width: 30px;
  height: 30px;
  background: ${(props) => props.$color || "#e5e7eb"};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;

  i {
    font-size: 0.9rem;
  }
`;

export const HistoryInfo = styled.div`
  flex-grow: 1;
`;

export const HistoryAction = styled.div`
  font-weight: 500;
  color: #374151;
`;

export const HistoryTime = styled.div`
  font-size: 0.85rem;
  color: #9ca3af;
`;

// 탭 컨테이너
export const TabsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 10px;
`;

export const TabButton = styled.button`
  background: ${(props) => (props.$active ? "#3b82f6" : "#f3f4f6")};
  color: ${(props) => (props.$active ? "white" : "#4b5563")};
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: ${(props) => (props.$active ? "#2563eb" : "#e5e7eb")};
  }

  i {
    font-size: 0.9rem;
  }
`;

// 카테고리 상세 정보 섹션
export const CategoryDetailSection = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
`;

export const CategoryDetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

export const DetailItem = styled.div`
  margin-bottom: 16px;
  ${(props) =>
    props.$empty &&
    `
    text-align: center;
    padding: 30px;
    color: #6b7280;
    background: #f9fafb;
    border-radius: 8px;
    border: 1px dashed #d1d5db;
    grid-column: 1 / -1;
    
    i {
      font-size: 2rem;
      color: #9ca3af;
      margin-bottom: 12px;
      display: block;
    }
    
    p {
      margin: 6px 0;
      
      &:first-of-type {
        font-weight: 500;
        color: #4b5563;
      }
    }
  `}
`;

export const DetailLabel = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 6px;
  font-weight: 500;
`;

export const DetailValue = styled.div`
  font-size: 1rem;
  color: #111827;
  line-height: 1.5;
  white-space: pre-wrap;
`;

// 이미지 갤러리
export const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
`;

export const AdditionalImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;
