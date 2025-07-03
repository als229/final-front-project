import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { ReviewWrapper } from "src/styles/ContentDetail.styles";

const ReviewSection = ({ contentId }) => {
  return (
    <ReviewWrapper>
      <ReviewForm contentId={contentId} />
      <ReviewList contentId={contentId} />
    </ReviewWrapper>
  );
};

export default ReviewSection;
