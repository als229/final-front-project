import { useState } from "react";
import styled, { keyframes } from "styled-components";
import StarSelector from "./StarSelector";
import axios from "axios";

const ReviewForm = ({ contentId, onReviewAdded }) => {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [point, setPoint] = useState(5);
  const [hoverPoint, setHoverPoint] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTip, setShowTip] = useState(true);

  const accessToken = sessionStorage.getItem("accessToken");
  const ENV_URL = window.ENV?.API_URL;

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);

    const readers = newFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((newPreviews) => {
      setPreviews((prev) => [...prev, ...newPreviews]);
    });
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("contentId", contentId);
    formData.append("content", content);
    formData.append("point", point);
    files.forEach((file) => formData.append("file", file));

    axios
      .post(`${ENV_URL}/api/reviews`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        setContent("");
        setFiles([]);
        setPreviews([]);
        setPoint(5);
        setHoverPoint(null);
        onReviewAdded();

        // 성공 메시지 표시 애니메이션
        setIsSubmitting(false);
        showSuccessMessage();
      })
      .catch((error) => {
        console.error("리뷰 등록 실패:", error);
        setIsSubmitting(false);
        alert("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
      });
  };

  const showSuccessMessage = () => {
    // Toast 메시지 등을 여기서 구현할 수 있음
    const toast = document.createElement("div");
    toast.className = "review-toast";
    toast.textContent = "리뷰가 성공적으로 등록되었습니다!";
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => document.body.removeChild(toast), 500);
    }, 2000);
  };

  const handleRemoveImage = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
    setPreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    <ReviewFormCard>
      <FormHeader>
        <FormTitle>
          <i className="fas fa-pencil-alt"></i> 리뷰 작성하기
        </FormTitle>
        <RatingSection>
          <RatingLabel>이 장소를 평가해주세요</RatingLabel>
          <StarSelectorWrapper>
            <StarSelector
              point={point}
              setPoint={setPoint}
              hoverPoint={hoverPoint}
              setHoverPoint={setHoverPoint}
            />
            <RatingValue>{point.toFixed(1)}</RatingValue>
          </StarSelectorWrapper>
        </RatingSection>
      </FormHeader>

      <TextareaWrapper>
        {showTip && (
          <TipBubble>
            <TipContent>
              <i className="fas fa-lightbulb"></i>
              <span>
                이 장소에서의 경험을 공유해 보세요! 무엇이 좋았나요? 어떤 점이
                특별했나요?
              </span>
            </TipContent>
            <CloseButton onClick={() => setShowTip(false)}>
              <i className="fas fa-times"></i>
            </CloseButton>
          </TipBubble>
        )}
        <ReviewTextarea
          placeholder="당신의 여행 경험을 공유해주세요..."
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setShowTip(false)}
        />
      </TextareaWrapper>

      {previews.length > 0 && (
        <PreviewGallery>
          {previews.map((src, index) => (
            <PreviewThumbnailWrapper key={index}>
              <RemoveButton onClick={() => handleRemoveImage(index)}>
                <i className="fas fa-times"></i>
              </RemoveButton>
              <PreviewThumbnail src={src} alt={`미리보기${index}`} />
            </PreviewThumbnailWrapper>
          ))}
        </PreviewGallery>
      )}

      <FormFooter>
        <FileUploadArea>
          <UploadLabel htmlFor="fileUpload">
            <i className="fas fa-camera"></i>
            <span>사진 추가</span>
            <small>{files.length > 0 ? `${files.length}장의 사진` : ""}</small>
          </UploadLabel>
          <input
            id="fileUpload"
            type="file"
            multiple
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </FileUploadArea>

        <SubmitButton
          onClick={handleSubmit}
          disabled={isSubmitting || !content.trim()}
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner /> 등록 중...
            </>
          ) : (
            <>
              <i className="far fa-paper-plane"></i> 리뷰 등록하기
            </>
          )}
        </SubmitButton>
      </FormFooter>
    </ReviewFormCard>
  );
};

// 애니메이션 정의
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); }
  50% { transform: scale(1.05); box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15); }
  100% { transform: scale(1); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); }
`;

// 스타일 컴포넌트
const ReviewFormCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin: 24px 0;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
  border: 1px solid #edf2f7;
`;

const FormHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    color: #3b82f6;
  }
`;

const RatingSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 768px) {
    align-items: flex-start;
    width: 100%;
  }
`;

const RatingLabel = styled.label`
  font-size: 0.9rem;
  color: #4a5568;
  margin-bottom: 6px;
`;

const StarSelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RatingValue = styled.span`
  font-weight: 700;
  font-size: 1.1rem;
  color: #f59e0b;
`;

const TextareaWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const TipBubble = styled.div`
  position: absolute;
  top: -60px;
  left: 10px;
  background: #fffbeb;
  border: 1px solid #fef3c7;
  border-radius: 12px;
  padding: 10px 14px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: calc(100% - 20px);
  z-index: 5;
  animation: ${fadeIn} 0.3s ease-out;

  &:after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 20px;
    width: 16px;
    height: 16px;
    background: #fffbeb;
    border-right: 1px solid #fef3c7;
    border-bottom: 1px solid #fef3c7;
    transform: rotate(45deg);
  }
`;

const TipContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #92400e;

  i {
    color: #f59e0b;
    font-size: 1rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #92400e;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 4px;
  margin-left: auto;
`;

const ReviewTextarea = styled.textarea`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const PreviewGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
`;

const PreviewThumbnailWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  &:hover {
    transform: scale(1.03);
  }
`;

const PreviewThumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-size: 10px;
  padding: 0;
  z-index: 1;

  &:hover {
    background: #ef4444;
  }
`;

const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
`;

const FileUploadArea = styled.div``;

const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  color: #475569;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    border-color: #94a3b8;
  }

  i {
    color: #64748b;
    font-size: 1.1rem;
  }

  small {
    font-size: 0.8rem;
    color: #64748b;
    margin-left: 4px;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 30px;
  background: ${(props) =>
    props.disabled ? "#cbd5e1" : "linear-gradient(135deg, #3b82f6, #2563eb)"};
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  box-shadow: ${(props) =>
    props.disabled ? "none" : "0 4px 10px rgba(37, 99, 235, 0.25)"};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(37, 99, 235, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  i {
    font-size: 1rem;
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: ${spin} 0.8s linear infinite;
`;

// 전역 스타일 (CSS 파일에 추가)
const createGlobalStyle = `
.review-toast {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(34, 197, 94, 0.9);
  color: white;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  opacity: 1;
  transition: opacity 0.5s ease;
}
`;

// 전역 스타일을 head에 추가
(() => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.innerHTML = createGlobalStyle;
    document.head.appendChild(style);
  }
})();

export default ReviewForm;
