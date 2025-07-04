import {
  ReviewBox,
  Header,
  ProfileImage,
  Nick,
  StarRow,
  Star,
  DateText,
  ImageRow,
  Content,
  Image,
  ActionButtons,
  ActionButton,
  HeaderRow,
} from "src/styles/ReviewList.styles";
import {
  Stars,
  PreviewThumbnailWrapper,
  PreviewThumbnail,
  RemoveButton,
  UploadLabel,
} from "src/styles/ContentDetail.styles";

import { useState, useEffect } from "react";
import axios from "axios";
import StarSelector from "./StarSelector";

const ReviewList = ({ contentId, reloadTrigger }) => {
  const [reviews, setReviews] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [newFiles, setNewFiles] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);

  const accessToken = sessionStorage.getItem("accessToken");
  const ENV_URL = window.ENV?.API_URL;
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchReviews();
  }, [contentId, reloadTrigger]);

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
    const formData = new FormData();
    formData.append("contentId", editTarget.contentId);
    formData.append("content", editTarget.content);
    formData.append("point", editTarget.point);
    editTarget.images.forEach((url) => {
      formData.append("fileUrls", url);
    });
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

  const getStarImage = (i, point) => {
    if (i + 1 <= point) return "/images/ico-star-fill.svg";
    else if (i + 0.5 <= point) return "/images/ico-star-half.svg";
    else return "/images/ico-star-empty.svg";
  };

  return (
    <div>
      {reviews.length === 0 ? (
        <p>작성된 리뷰가 없습니다.</p>
      ) : (
        reviews.map((review) => (
          <ReviewBox key={review.reviewNo}>
            <Header>
              <ProfileImage src="/images/default-profile.png" />
              <div style={{ flex: 1 }}>
                <HeaderRow>
                  <Nick>{review.userId}</Nick>
                  {review.userId === userId && (
                    <ActionButtons>
                      <ActionButton onClick={() => handleEdit(review)}>
                        수정
                      </ActionButton>
                      <ActionButton
                        onClick={() => handleDelete(review.reviewNo)}
                      >
                        삭제
                      </ActionButton>
                    </ActionButtons>
                  )}
                </HeaderRow>
                <StarRow>
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        src={getStarImage(i, review.point)}
                        alt="별점"
                      />
                    ))}
                  <DateText>{review.createdTime}</DateText>
                </StarRow>
              </div>
            </Header>

            {editMode && editTarget?.reviewNo === review.reviewNo ? (
              <>
                <textarea
                  rows={4}
                  style={{ width: "100%", marginTop: "1rem" }}
                  value={editTarget.content}
                  onChange={(e) =>
                    setEditTarget((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                />

                <Stars style={{ marginTop: "8px" }}>
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
                </Stars>

                {Array.isArray(editTarget.images) &&
                  editTarget.images.length > 0 && (
                    <ImageRow style={{ marginTop: "10px" }}>
                      {editTarget.images.map((url, idx) => (
                        <PreviewThumbnailWrapper key={idx}>
                          <RemoveButton
                            onClick={() => handleRemoveExistingImage(idx)}
                          >
                            ×
                          </RemoveButton>
                          <PreviewThumbnail
                            src={url}
                            alt={`기존리뷰이미지${idx}`}
                          />
                        </PreviewThumbnailWrapper>
                      ))}
                    </ImageRow>
                  )}

                {newPreviews.length > 0 && (
                  <ImageRow style={{ marginTop: "10px" }}>
                    {newPreviews.map((src, idx) => (
                      <PreviewThumbnailWrapper key={idx}>
                        <RemoveButton onClick={() => handleRemoveNewImage(idx)}>
                          ×
                        </RemoveButton>
                        <PreviewThumbnail
                          src={src}
                          alt={`추가리뷰이미지${idx}`}
                        />
                      </PreviewThumbnailWrapper>
                    ))}
                  </ImageRow>
                )}

                <div style={{ marginTop: "8px" }}>
                  <input
                    id={`editFileUpload-${review.reviewNo}`}
                    type="file"
                    multiple
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <UploadLabel htmlFor={`editFileUpload-${review.reviewNo}`}>
                    사진 추가하기
                  </UploadLabel>
                </div>

                <ActionButtons style={{ marginTop: "8px" }}>
                  <ActionButton onClick={handleUpdate}>저장</ActionButton>
                  <ActionButton onClick={handleCancel}>취소</ActionButton>
                </ActionButtons>
              </>
            ) : (
              <>
                <Content>{review.content}</Content>
                {Array.isArray(review.images) && review.images.length > 0 && (
                  <ImageRow>
                    {review.images.map((url, idx) => (
                      <Image key={url} src={url} alt={`리뷰이미지${idx}`} />
                    ))}
                  </ImageRow>
                )}
              </>
            )}
          </ReviewBox>
        ))
      )}
    </div>
  );
};

export default ReviewList;
