import { useState, useEffect, useRef } from "react";
import axios from "axios";
import StarSelector from "./StarSelector";
import styled, { keyframes } from "styled-components";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const ReviewList = ({ contentId, reloadTrigger }) => {
  const [reviews, setReviews] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [newFiles, setNewFiles] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);
  const [expandedImage, setExpandedImage] = useState(null);
  const editRef = useRef(null);

  const accessToken = sessionStorage.getItem("accessToken");
  const ENV_URL = window.ENV?.API_URL;
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchReviews();
  }, [contentId, reloadTrigger]);

  // 편집 모드일 때 외부 클릭 감지
  useEffect(() => {
    if (editMode) {
      const handleOutsideClick = (e) => {
        if (editRef.current && !editRef.current.contains(e.target)) {
          if (window.confirm("편집을 취소하시겠습니까?")) {
            handleCancel();
          }
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }
  }, [editMode]);

  const fetchReviews = () => {
    axios
      .get(`${ENV_URL}/api/reviews/${contentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setReviews(res.data.items || []);
      })
      .catch((err) => console.error("리뷰 조회 실패:", err));
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "yyyy년 MM월 dd일", { locale: ko });
    } catch (error) {
      return dateString;
    }
  };

  const handleEdit = (review) => {
    setEditMode(true);
    setEditTarget({ ...review });
    setNewFiles([]);
    setNewPreviews([]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewFiles((prev) => [...prev, ...files]);

    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((results) => {
      setNewPreviews((prev) => [...prev, ...results]);
    });
  };

  const handleRemoveNewImage = (idx) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== idx));
    setNewPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleRemoveExistingImage = (idx) => {
    setEditTarget((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  const handleUpdate = () => {
    if (!editTarget.content.trim()) {
      alert("리뷰 내용을 입력해주세요");
      return;
    }

    const formData = new FormData();
    formData.append("contentId", editTarget.contentId);
    formData.append("content", editTarget.content);
    formData.append("point", editTarget.point);

    if (Array.isArray(editTarget.images)) {
      editTarget.images.forEach((url) => {
        formData.append("fileUrls", url);
      });
    }

    newFiles.forEach((file) => formData.append("file", file));

    axios
      .put(`${ENV_URL}/api/reviews/${editTarget.reviewNo}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        fetchReviews();
        setEditMode(false);
        setEditTarget(null);
        setNewFiles([]);
        setNewPreviews([]);
      })
      .catch((err) => console.error("리뷰 수정 실패:", err));
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditTarget(null);
    setNewFiles([]);
    setNewPreviews([]);
  };

  const handleDelete = (reviewNo) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    axios
      .delete(`${ENV_URL}/api/reviews/${reviewNo}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => fetchReviews())
      .catch((err) => console.error("리뷰 삭제 실패:", err));
  };

  // 이미지 확대 모달 토글
  const toggleImageExpand = (url) => {
    setExpandedImage(expandedImage === url ? null : url);
  };

  return (
    <ReviewListContainer>
      {reviews.length === 0 ? (
        <EmptyReviewState>
          <i className="far fa-comment-alt"></i>
          <p>첫 번째 리뷰를 작성해보세요!</p>
          <small>
            이 관광지에 대한 경험을 공유하고 다른 여행자들에게 도움을 주세요.
          </small>
        </EmptyReviewState>
      ) : (
        <>
          <ReviewCount>총 {reviews.length}개의 리뷰</ReviewCount>
          {reviews.map((review) => (
            <ReviewCard
              key={review.reviewNo}
              isEditing={editMode && editTarget?.reviewNo === review.reviewNo}
              ref={
                editMode && editTarget?.reviewNo === review.reviewNo
                  ? editRef
                  : null
              }
            >
              <ReviewHeader>
                <UserSection>
                  <ProfileImage
                    src="/images/default-profile.png"
                    alt="프로필"
                  />
                  <UserInfo>
                    <UserName>{review.userId}</UserName>
                    <ReviewMeta>
                      <StarDisplay>
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <StarIcon
                              key={i}
                              $filled={i < Math.floor(review.point)}
                              $half={
                                i === Math.floor(review.point) &&
                                review.point % 1 >= 0.5
                              }
                            >
                              <i
                                className={
                                  i < Math.floor(review.point)
                                    ? "fas fa-star"
                                    : i === Math.floor(review.point) &&
                                      review.point % 1 >= 0.5
                                    ? "fas fa-star-half-alt"
                                    : "far fa-star"
                                }
                              ></i>
                            </StarIcon>
                          ))}
                        <span className="rating-value">
                          {review.point.toFixed(1)}
                        </span>
                      </StarDisplay>
                      <ReviewDate>{formatDate(review.createdTime)}</ReviewDate>
                    </ReviewMeta>
                  </UserInfo>
                </UserSection>

                {review.userId === userId && !editMode && (
                  <ActionButtonsContainer>
                    <ActionButton onClick={() => handleEdit(review)}>
                      <i className="fas fa-edit"></i> 수정
                    </ActionButton>
                    <ActionButton
                      $delete
                      onClick={() => handleDelete(review.reviewNo)}
                    >
                      <i className="fas fa-trash-alt"></i> 삭제
                    </ActionButton>
                  </ActionButtonsContainer>
                )}
              </ReviewHeader>

              {editMode && editTarget?.reviewNo === review.reviewNo ? (
                <EditModeContent>
                  <ReviewTextarea
                    rows={4}
                    value={editTarget.content}
                    onChange={(e) =>
                      setEditTarget((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    placeholder="리뷰 내용을 입력해주세요..."
                  />

                  <EditModeStars>
                    <StarsLabel>별점:</StarsLabel>
                    <StarSelector
                      point={editTarget.point}
                      setPoint={(val) =>
                        setEditTarget((prev) => ({ ...prev, point: val }))
                      }
                      hoverPoint={editTarget.hoverPoint || null}
                      setHoverPoint={(val) =>
                        setEditTarget((prev) => ({ ...prev, hoverPoint: val }))
                      }
                    />
                  </EditModeStars>

                  <EditModeImagesSection>
                    {/* 기존 이미지 */}
                    {Array.isArray(editTarget.images) &&
                      editTarget.images.length > 0 && (
                        <ImageGallery>
                          {editTarget.images.map((url, idx) => (
                            <ImageThumbnailWrapper key={idx}>
                              <RemoveButton
                                onClick={() => handleRemoveExistingImage(idx)}
                              >
                                <i className="fas fa-times"></i>
                              </RemoveButton>
                              <ImageThumbnail
                                src={url}
                                alt={`리뷰이미지${idx}`}
                              />
                            </ImageThumbnailWrapper>
                          ))}
                        </ImageGallery>
                      )}

                    {/* 새로 추가된 이미지 */}
                    {newPreviews.length > 0 && (
                      <ImageGallery>
                        {newPreviews.map((src, idx) => (
                          <ImageThumbnailWrapper key={`new-${idx}`}>
                            <RemoveButton
                              onClick={() => handleRemoveNewImage(idx)}
                            >
                              <i className="fas fa-times"></i>
                            </RemoveButton>
                            <ImageThumbnail src={src} alt={`새이미지${idx}`} />
                          </ImageThumbnailWrapper>
                        ))}
                      </ImageGallery>
                    )}
                  </EditModeImagesSection>

                  <EditModeActions>
                    <FileUploadContainer>
                      <input
                        id={`editFileUpload-${review.reviewNo}`}
                        type="file"
                        multiple
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                      <FileUploadLabel
                        htmlFor={`editFileUpload-${review.reviewNo}`}
                      >
                        <i className="fas fa-camera"></i> 사진 추가
                      </FileUploadLabel>
                    </FileUploadContainer>

                    <EditActionButtons>
                      <SaveButton onClick={handleUpdate}>
                        <i className="fas fa-check"></i> 저장
                      </SaveButton>
                      <CancelButton onClick={handleCancel}>
                        <i className="fas fa-times"></i> 취소
                      </CancelButton>
                    </EditActionButtons>
                  </EditModeActions>
                </EditModeContent>
              ) : (
                <ReviewContent>
                  <ReviewText>{review.content}</ReviewText>
                  {Array.isArray(review.images) && review.images.length > 0 && (
                    <ReviewImageGallery>
                      {review.images.map((url, idx) => (
                        <ReviewImageWrapper
                          key={idx}
                          onClick={() => toggleImageExpand(url)}
                        >
                          <ReviewImage src={url} alt={`리뷰이미지${idx}`} />
                        </ReviewImageWrapper>
                      ))}
                    </ReviewImageGallery>
                  )}
                </ReviewContent>
              )}
            </ReviewCard>
          ))}
        </>
      )}

      {/* 이미지 확대 모달 */}
      {expandedImage && (
        <ImageModal onClick={() => setExpandedImage(null)}>
          <ModalClose>
            <i className="fas fa-times"></i>
          </ModalClose>
          <ModalImage
            src={expandedImage}
            alt="확대된 이미지"
            onClick={(e) => e.stopPropagation()}
          />
        </ImageModal>
      )}
    </ReviewListContainer>
  );
};

// 애니메이션 정의
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// 스타일 컴포넌트
const ReviewListContainer = styled.div`
  padding: 10px 0;
`;

const ReviewCount = styled.h4`
  margin: 0 0 20px;
  color: #334155;
  font-size: 1.1rem;
  font-weight: 600;
`;

const ReviewCard = styled.div`
  background: ${(props) => (props.isEditing ? "#f8fafc" : "white")};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.4s ease-out;
  border: 1px solid ${(props) => (props.isEditing ? "#bae6fd" : "#e2e8f0")};

  &:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid white;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: #0f172a;
  margin-bottom: 4px;
`;

const ReviewMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

const StarDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;

  .rating-value {
    margin-left: 6px;
    font-weight: 600;
    font-size: 0.9rem;
    color: #0369a1;
  }
`;

const StarIcon = styled.span`
  color: ${(props) =>
    props.$filled ? "#f59e0b" : props.$half ? "#f59e0b" : "#cbd5e1"};
  font-size: 0.9rem;
`;

const ReviewDate = styled.span`
  color: #64748b;
  font-size: 0.85rem;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: ${(props) =>
    props.$delete ? "rgba(239, 68, 68, 0.05)" : "rgba(59, 130, 246, 0.05)"};
  color: ${(props) => (props.$delete ? "#ef4444" : "#3b82f6")};
  border: 1px solid
    ${(props) =>
      props.$delete ? "rgba(239, 68, 68, 0.2)" : "rgba(59, 130, 246, 0.2)"};
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.$delete ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)"};
    border-color: ${(props) => (props.$delete ? "#ef4444" : "#3b82f6")};
  }
`;

const ReviewContent = styled.div`
  margin-top: 12px;
`;

const ReviewText = styled.p`
  margin: 0 0 16px;
  line-height: 1.7;
  color: #334155;
  font-size: 1rem;
  white-space: pre-line;
`;

const ReviewImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 16px;
`;

const ReviewImageWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  cursor: zoom-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }
`;

const ReviewImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 편집 모드 스타일
const EditModeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ReviewTextarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #1e293b;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const EditModeStars = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StarsLabel = styled.span`
  font-size: 0.95rem;
  color: #475569;
  font-weight: 500;
`;

const EditModeImagesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ImageGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const ImageThumbnailWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const ImageThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-size: 12px;
  z-index: 1;

  &:hover {
    background: rgba(239, 68, 68, 0.8);
  }
`;

const EditModeActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const FileUploadContainer = styled.div``;

const FileUploadLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px dashed #94a3b8;
  color: #64748b;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    border-color: #64748b;
  }
`;

const EditActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const SaveButton = styled.button`
  background: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }
`;

const CancelButton = styled.button`
  background: #f1f5f9;
  color: #64748b;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;

  &:hover {
    background: #e2e8f0;
  }
`;

// 이미지 확대 모달
const ImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: zoom-out;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const ModalClose = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(239, 68, 68, 0.8);
    transform: scale(1.1);
  }
`;

const EmptyReviewState = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: #f8fafc;
  border-radius: 16px;
  border: 1px dashed #cbd5e1;
  color: #64748b;

  i {
    font-size: 2.5rem;
    margin-bottom: 16px;
    display: block;
    opacity: 0.6;
  }

  p {
    font-size: 1.2rem;
    margin: 0 0 8px;
    font-weight: 600;
    color: #475569;
  }

  small {
    display: block;
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.6;
  }

  animation: ${pulse} 2s infinite;
`;

export default ReviewList;
