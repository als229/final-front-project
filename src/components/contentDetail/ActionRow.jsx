import { Row, Button, Icon } from "src/styles/ContentDetail.styles";
import axios from "axios";

const ActionRow = ({
  contentId,
  liked,
  setLiked,
  bookmarked,
  setBookmarked,
}) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const ENV_URL = window.ENV?.API_URL;

  const handleFavoriteToggle = (category) => {
    const payload = {
      contentId: contentId,
      category: category,
    };

    axios
      .post(`${ENV_URL}/api/favorites`, payload, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        if (category === 1) setLiked((prev) => !prev);
        if (category === 2) setBookmarked((prev) => !prev);
      })
      .catch((err) => {
        console.error("좋아요/즐겨찾기 요청 실패:", err);
      });
  };

  return (
    <Row>
      <Button onClick={() => handleFavoriteToggle(1)}>
        {liked ? "💗 좋아요" : "🤍 좋아요"}
      </Button>
      <Button onClick={() => handleFavoriteToggle(2)}>
        <Icon className={bookmarked ? "star-fill" : "star-empty"} />
        즐겨찾기
      </Button>
    </Row>
  );
};

export default ActionRow;
