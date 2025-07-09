import { useState } from "react";
import styled, { keyframes } from "styled-components";

const GalleryModal = ({ images = [], onClose }) => {
  // 확대된 이미지를 추적하기 위한 상태
  const [selectedImage, setSelectedImage] = useState(null);

  // 이미지 클릭 핸들러
  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  // 확대 보기 닫기
  const handleZoomClose = (e) => {
    e.stopPropagation();
    setSelectedImage(null);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <i className="fas fa-times"></i>
        </CloseButton>

        <ModalHeader>
          <h3>여행자 사진 ({images.length})</h3>
        </ModalHeader>

        <ModalBody>
          <GalleryGrid>
            {images.map((url, index) => (
              <GalleryImageWrapper
                key={index}
                onClick={() => handleImageClick(url)}
              >
                <GalleryImage src={url} alt={`여행자 사진 ${index + 1}`} />
                <ImageOverlay>
                  <i className="fas fa-search-plus"></i>
                </ImageOverlay>
              </GalleryImageWrapper>
            ))}
          </GalleryGrid>
        </ModalBody>
      </ModalContent>

      {/* 확대된 이미지 보기 */}
      {selectedImage && (
        <ZoomedImageOverlay onClick={handleZoomClose}>
          <ZoomedImageContainer>
            <ZoomCloseButton onClick={handleZoomClose}>
              <i className="fas fa-times"></i>
            </ZoomCloseButton>
            <ZoomedImage
              src={selectedImage}
              alt="확대된 이미지"
              onClick={(e) => e.stopPropagation()}
            />
          </ZoomedImageContainer>
        </ZoomedImageOverlay>
      )}
    </ModalOverlay>
  );
};

// 애니메이션 정의
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

// 스타일 컴포넌트
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: ${scaleIn} 0.3s ease-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  color: #1e293b;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    transform: scale(1.1);
  }
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #0f172a;
    margin: 0;
  }
`;

const ModalBody = styled.div`
  padding: 20px 24px;
  overflow-y: auto;
  flex: 1;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }
`;

const GalleryImageWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);

    /* 호버 시 오버레이 표시 */
    > div {
      opacity: 1;
    }
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;

  i {
    color: white;
    font-size: 1.5rem;
    background: rgba(255, 255, 255, 0.2);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// 확대된 이미지 스타일
const ZoomedImageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  animation: ${fadeIn} 0.2s ease-out;
`;

const ZoomedImageContainer = styled.div`
  position: relative;
  width: 90%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ZoomedImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: ${scaleIn} 0.3s ease-out;
`;

const ZoomCloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
    transform: scale(1.1);
  }
`;

export default GalleryModal;
