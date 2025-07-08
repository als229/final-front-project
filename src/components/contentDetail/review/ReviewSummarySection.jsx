import { useState, useEffect } from "react";
import styled from "styled-components";
import GalleryModal from "./GalleryModal";

const ReviewSummarySection = ({ images = [], average = 0, totalCount = 0 }) => {
  const [open, setOpen] = useState(false);
  console.log("ReviewSummarySection 렌더링됨!");
  console.log({
    images: images,
    average: average,
    totalCount: totalCount,
    averageType: typeof average,
    imagesLength: Array.isArray(images) ? images.length : "not array",
  });

  // 데이터 확인용 로그 추가
  useEffect(() => {
    console.log("ReviewSummarySection props received:", {
      images: images,
      imagesLength: Array.isArray(images) ? images.length : 0,
      average: average,
      totalCount: totalCount,
    });
  }, [images, average, totalCount]);

  // 별점을 올바르게 계산 (소수점 첫째 자리까지)
  const averageRating = typeof average === "number" ? average : 0;
  const formattedAverage = averageRating.toFixed(1);

  // 별 개수 계산
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating - fullStars >= 0.5;

  return (
    <SummaryWrapper>
      <SummaryHeader>
        <SectionTitle>방문객 리뷰</SectionTitle>
        <ReviewCount>{totalCount}개의 리뷰</ReviewCount>
      </SummaryHeader>

      <RatingContainer>
        <RatingValue>{formattedAverage}</RatingValue>
        <StarsDisplay>
          {/* 꽉 찬 별 */}
          {Array(fullStars)
            .fill()
            .map((_, i) => (
              <StarIcon key={`full-${i}`} className="fas fa-star" />
            ))}

          {/* 반 별 */}
          {hasHalfStar && <StarIcon className="fas fa-star-half-alt" />}

          {/* 빈 별 */}
          {Array(5 - fullStars - (hasHalfStar ? 1 : 0))
            .fill()
            .map((_, i) => (
              <StarIcon key={`empty-${i}`} className="far fa-star" />
            ))}
        </StarsDisplay>
      </RatingContainer>

      {Array.isArray(images) && images.length > 0 ? (
        <>
          <GalleryTitle>
            <i className="fas fa-camera"></i> 여행자 사진
            <PhotoCount>{images.length}</PhotoCount>
          </GalleryTitle>

          <ImageGrid>
            {images.slice(0, 5).map((img, i) => (
              <ImageWrapper key={i}>
                <PreviewImage src={img} alt={`리뷰이미지${i}`} />
              </ImageWrapper>
            ))}

            {images.length > 5 && (
              <MoreImagesButton onClick={() => setOpen(true)}>
                <MoreImagesOverlay>
                  <i className="fas fa-plus"></i>
                  <span>{images.length - 5}장 더보기</span>
                </MoreImagesOverlay>
                <PreviewImage src={images[5]} alt="더보기" />
              </MoreImagesButton>
            )}
          </ImageGrid>

          <ViewAllButton onClick={() => setOpen(true)}>
            <i className="fas fa-images"></i> 모든 사진 보기
          </ViewAllButton>
        </>
      ) : (
        <NoPhotosMessage>
          <i className="fas fa-camera"></i>
          <p>아직 등록된 사진이 없습니다</p>
        </NoPhotosMessage>
      )}

      {open && <GalleryModal images={images} onClose={() => setOpen(false)} />}
    </SummaryWrapper>
  );
};

// 스타일 컴포넌트 정의
const SummaryWrapper = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const SummaryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  color: #1e293b;
  font-weight: 700;
  margin: 0;
`;

const ReviewCount = styled.div`
  color: #64748b;
  font-size: 0.9rem;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const RatingValue = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: #0f172a;
`;

const StarsDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StarIcon = styled.i`
  color: #f59e0b;
  font-size: 1.2rem;
`;

const GalleryTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #334155;
  margin: 0 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    color: #3b82f6;
  }
`;

const PhotoCount = styled.span`
  background: #f1f5f9;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 20px;
  margin-left: 8px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;

const ImageWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 1;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ImageWrapper}:hover & {
    transform: scale(1.05);
  }
`;

const MoreImagesButton = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1;
`;

const MoreImagesOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 2;

  i {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }

  span {
    font-size: 0.85rem;
    font-weight: 500;
  }
`;

const ViewAllButton = styled.button`
  background: #f1f5f9;
  color: #0f172a;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  font-weight: 500;

  &:hover {
    background: #e2e8f0;
  }

  i {
    color: #3b82f6;
  }
`;

const NoPhotosMessage = styled.div`
  text-align: center;
  padding: 30px 0;
  color: #94a3b8;

  i {
    font-size: 2rem;
    margin-bottom: 12px;
    opacity: 0.7;
  }

  p {
    font-size: 1rem;
    margin: 0;
  }
`;

export default ReviewSummarySection;
