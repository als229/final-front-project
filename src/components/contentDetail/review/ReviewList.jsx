import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

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
} from "src/styles/ReviewList.styles";

const ReviewList = ({ contentId }) => {
  const [reviews, setReviews] = useState([]);
  const accessToken = sessionStorage.getItem("accessToken");
  const ENV_URL = window.ENV?.API_URL;

  useEffect(() => {
    axios
      .get(`${ENV_URL}/api/reviews/${contentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const data = res.data.items || [];
        console.log(data);
        setReviews(data);
      })
      .catch((err) => console.error("리뷰 조회 실패:", err));
  }, [contentId]);

  return (
    <div>
      {reviews.length === 0 ? (
        <p>작성된 리뷰가 없습니다.</p>
      ) : (
        reviews.map((review) => (
          <ReviewBox key={review.reviewNo}>
            <Header>
              <ProfileImage src="/images/default-profile.png" />
              <div>
                <Nick>작성자: {review.userNo}</Nick>
                {/* 별점이 평균으로 온다면 평균만 표시 (별 다섯개 그릴지 말지 협의 필요) */}
                <StarRow>
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        src={
                          i < review.average
                            ? "/images/ico-star-fill.svg"
                            : "/images/ico-star-empty.svg"
                        }
                        alt="별점"
                      />
                    ))}
                  <DateText>{review.createdTime}</DateText>
                </StarRow>
              </div>
            </Header>

            <Content>{review.content}</Content>

            {Array.isArray(review.images) && review.images.length > 0 && (
              <ImageRow>
                {review.images.map((url, idx) => (
                  <Image key={url} src={url} alt={`리뷰이미지${idx}`} />
                ))}
              </ImageRow>
            )}
          </ReviewBox>
        ))
      )}
    </div>
  );
};

export default ReviewList;
