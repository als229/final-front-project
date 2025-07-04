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

import StarSelector from "./StarSelector";
import axios from "axios";

const ReviewForm = ({ contentId, onReviewAdded }) => {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [point, setPoint] = useState(5);
  const [hoverPoint, setHoverPoint] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

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
        alert("리뷰가 등록되었습니다.");
        setContent("");
        setFiles([]);
        setPreviews([]);
        setPoint(5);
        setHoverPoint(null);
        onReviewAdded();
      })
      .catch((error) => {
        console.error("리뷰 등록 실패:", error);
      });
  };

  const handleRemoveImage = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
    setPreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div>
      <Stars>
        <StarSelector
          point={point}
          setPoint={setPoint}
          hoverPoint={hoverPoint}
          setHoverPoint={setHoverPoint}
        />
      </Stars>

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
