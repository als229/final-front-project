import styled from "styled-components";
import { useState } from "react";
import GalleryModal from "./GalleryModal";
import {
  SummaryWrapper,
  StarRow,
  ImagePreviewRow,
  PreviewImage,
  MoreButton,
} from "../../../pages/content/ContentDetail.styles";
import FullStar from "/images/ico-star-fill.svg";
import HalfStar from "/images/ico-star-half.svg";
import EmptyStar from "/images/ico-star-empty.svg";

const ReviewSummarySection = ({
  images = [],
  averageRating = 0,
  totalCount = 0,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <SummaryWrapper>
      <StarRow>
        {"⭐".repeat(Math.round(averageRating))}{" "}
        <span style={{ marginLeft: "8px" }}>
          {typeof averageRating === "number" ? averageRating.toFixed(1) : "0.0"}{" "}
          ({totalCount})
        </span>
        <MoreButton onClick={() => setOpen(true)}>전체보기</MoreButton>
      </StarRow>

      <ImagePreviewRow>
        {Array.isArray(images) &&
          images
            .slice(0, 10)
            .map((img, i) => (
              <PreviewImage key={i} src={img} alt={`리뷰이미지${i}`} />
            ))}
      </ImagePreviewRow>

      {open && <GalleryModal images={images} onClose={() => setOpen(false)} />}
    </SummaryWrapper>
  );
};

export default ReviewSummarySection;
