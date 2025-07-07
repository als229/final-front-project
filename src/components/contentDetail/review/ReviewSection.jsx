import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { ReviewWrapper } from "../../../pages/content/ContentDetail.styles";

const ReviewSection = ({ contentId, reloadTrigger, setReloadTrigger }) => {
  return (
    <ReviewWrapper>
      <ReviewForm
        contentId={contentId}
        onReviewAdded={() => setReloadTrigger((prev) => prev + 1)}
      />
      <ReviewList contentId={contentId} reloadTrigger={reloadTrigger} />
    </ReviewWrapper>
  );
};

export default ReviewSection;
