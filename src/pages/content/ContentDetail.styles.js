import styled from "styled-components";

// 전체 페이지 Wrapper
export const PageWrapper = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 1.5rem;
`;

// 이미지, 제목, 위치 묶음
export const ContentInfoWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const ContentImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

export const ContentTitle = styled.h1`
  margin-top: 1rem;
  font-size: 1.5rem;
`;

export const ContentLocation = styled.p`
  color: #666;
  font-size: 0.95rem;
`;

// 지도 영역
export const MapBox = styled.div`
  width: 100%;
  height: 300px;
  background-color: #eee;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

// 별점 + 좋아요 + 즐겨찾기 버튼 줄
export const Row = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 1.5rem 0;
`;

export const Button = styled.button`
  background: #f3f3f3;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  border: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    background: #e7e7e7;
  }
`;

// 댓글 영역
export const ReviewWrapper = styled.section`
  padding-top: 1.5rem;
  border-top: 1px solid #ddd;
`;

// 별점 ★ 표시
export const Stars = styled.div`
  display: flex;
  gap: 0;

  .star {
    position: relative;
    width: 24px;
    height: 24px;
    background-image: url("/images/ico-star-empty.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

    pointer-events: none; // div는 이벤트 받지 않음
    flex-shrink: 0;
  }

  .star-click-area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    pointer-events: auto; // span만 이벤트 받음
    cursor: pointer;
  }

  .fill-full {
    background-image: url("/images/ico-star-fill.svg");
  }

  .fill-half {
    background-image: url("/images/ico-star-half.svg");
  }
`;

// 리뷰 작성 폼
export const ReviewTextarea = styled.textarea`
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  resize: vertical;
  resize: none;
`;

export const SubmitButton = styled.button`
  width: 150px;
  height: 30px;
  background: #fff;
  border: 1px solid rgb(77, 77, 77);
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;
  margin-left: auto;

  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`;

export const Icon = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 0.4rem;

  vertical-align: middle;

  &.star-empty {
    background-image: url("/images/ico-star-empty.svg");
  }

  &.star-fill {
    background-image: url("/images/ico-star-fill.svg");
  }
`;

export const FloatingButton = styled.button`
  position: fixed;
  top: 200px;
  right: 24px;
  z-index: 998;
  background-color: #ff4d4f;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e43c3e;
  }
`;

// 리뷰 요약 상단 영역
export const SummaryWrapper = styled.div`
  padding: 1rem 0;
`;

export const StarRow = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

export const ImagePreviewRow = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const PreviewImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  color: #0077ff;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 10px;
`;

// 갤러리 모달
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBox = styled.div`
  background: #fff;
  padding: 2rem;
  width: 80%;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 12px;
  position: relative;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
`;

export const GridImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #000;
  cursor: pointer;
`;
export const PreviewThumbnailRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 10px;
  margin-top: 1rem;
  padding-top: 6px;
  overflow-x: auto;
  overflow-y: visible;
`;

export const PreviewThumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
  border: 1px solid #ccc;
`;

export const PreviewThumbnailWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  padding-top: 6px;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 9px;
  right: 1px;
  background: #ff4d4f;
  border: none;
  color: white;
  font-size: 12px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 1;
`;

export const FileUploadLabel = styled.label`
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #0077ff;
  color: white;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    background-color: #005fcc;
  }
`;

export const UploadLabel = styled.label`
  width: 150px;
  height: 30px;
  background: #fff;
  border: 1px solid rgb(77, 77, 77);
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;
  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 1rem;
`;
