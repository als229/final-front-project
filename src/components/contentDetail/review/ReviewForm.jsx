import { useState } from "react";
import {
  Stars,
  ReviewTextarea,
  UploadLabel,
  SubmitButton,
  PreviewThumbnailRow,
  PreviewThumbnail,
  PreviewThumbnailWrapper,
  RemoveButton,
  ButtonRow,
} from "src/styles/ContentDetail.styles";

import axios from "axios";

const ReviewForm = ({ contentId }) => {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [point, setPoint] = useState(5);
  const [hoverPoint, setHoverPoint] = useState(null);

  const accessToken = sessionStorage.getItem("accessToken");
  const ENV_URL = window.ENV?.API_URL;

  const handleMouseMove = (e, i) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const ratio = x / width;
    const hoverValue = ratio <= 0.5 ? i - 0.5 : i;
    setHoverPoint(hoverValue);
  };

  const handleClick = () => {
    if (hoverPoint !== null) setPoint(hoverPoint);
  };

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
    const formData = new FormData();
    formData.append("contentId", contentId);
    formData.append("content", content);
    formData.append("point", point);
    files.forEach((file) => formData.append("file", file)); // 백엔드에서 이름 맞춰야 함

    axios
      .post(`${ENV_URL}/api/reviews`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        alert("리뷰가 등록되었습니다.");
        setContent("");
        setFiles([]);
        setPreviews([]);
        setPoint(5);
        setHoverPoint(null);
      })
      .catch((error) => {
        console.error("리뷰 등록 실패:", error);
      });
  };

  const renderStars = () => {
    const displayPoint = hoverPoint ?? point;
    return [1, 2, 3, 4, 5].map((i) => {
      let fill = "empty";
      if (displayPoint >= i) fill = "full";
      else if (displayPoint >= i - 0.5) fill = "half";

      return (
        <div key={i} className={`star fill-${fill}`}>
          <span
            className="star-click-area"
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => setHoverPoint(null)}
            onClick={handleClick}
          />
        </div>
      );
    });
  };

  const handleRemoveImage = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
    setPreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div>
      <Stars>{renderStars()}</Stars>

      <ReviewTextarea
        placeholder="댓글을 입력해 주세요"
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {previews.length > 0 && (
        <PreviewThumbnailRow>
          {previews.map((src, index) => (
            <PreviewThumbnailWrapper key={index}>
              <RemoveButton onClick={() => handleRemoveImage(index)}>
                ×
              </RemoveButton>
              <PreviewThumbnail src={src} alt={`미리보기${index}`} />
            </PreviewThumbnailWrapper>
          ))}
        </PreviewThumbnailRow>
      )}

      <ButtonRow>
        <UploadLabel htmlFor="fileUpload">사진 추가하기</UploadLabel>
        <input
          id="fileUpload"
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <SubmitButton onClick={handleSubmit}>등록하기</SubmitButton>
      </ButtonRow>
    </div>
  );
};

export default ReviewForm;
