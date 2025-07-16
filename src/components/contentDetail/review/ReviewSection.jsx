import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { ReviewWrapper } from "../../../pages/content/ContentDetail.styles";

const ReviewSection = ({ contentId, reloadTrigger, setReloadTrigger }) => {
  const notifyChange = () => setReloadTrigger((prev) => prev + 1);
  return (
    <ReviewWrapper>
      <ReviewForm contentId={contentId} onReviewAdded={notifyChange} />
      <ReviewList
        contentId={contentId}
        reloadTrigger={reloadTrigger}
        onReviewChanged={notifyChange}
      />
    </ReviewWrapper>
  );
};

export default ReviewSection;
