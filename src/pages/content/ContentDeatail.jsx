import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ContentInfo from "@/components/contentDetail/ContentInfo";
import MapSection from "@/components/contentDetail/MapSection";
import ActionRow from "@/components/contentDetail/ActionRow";
import ReviewSection from "@/components/contentDetail/review/ReviewSection";
import { PageWrapper } from "./ContentDetail.styles";
import ChatFloatingButton from "@/components/contentDetail/ChatFloatingButton";
import ReviewSummarySection from "@/components/contentDetail/review/ReviewSummarySection";

import axios from "axios";

const ContentDetail = () => {
  const { state } = useLocation();
  const { id, title, image, location } = state;
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [images, setImages] = useState([]);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const accessToken = sessionStorage.getItem("accessToken");
  const ENV_URL = window.ENV?.API_URL;

  useEffect(() => {
    axios
      .get(`${ENV_URL}/api/reviews/summary?contentId=${id}`)
      .then((res) => {
        setAverage(res.data.average);
        setCount(res.data.totalCount);
        setImages(res.data.images);
      })
      .catch((err) => {
        console.error("평균별점, 리뷰갯수, 리뷰사진들 조회 실패", err);
      });

    if (accessToken) {
      const userNo = sessionStorage.getItem("userNo");

      axios
        .get(`${ENV_URL}/api/favorites/favoriteSet`, {
          params: {
            userNo,
            contentId: id,
          },
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          const data = res.data.items;
          console.log(data);
          setLiked(data.likeFlag);
          setBookmarked(data.bookmarkFlag);
        })
        .catch((err) => {
          console.error("좋아요/즐겨찾기 조회 실패", err);
        });
    }
  }, [id]);

  return (
    <>
      <PageWrapper>
        <ContentInfo title={title} image={image} location={location} />
        <MapSection location={location} />
        <ActionRow
          contentId={id}
          liked={liked}
          setLiked={setLiked}
          bookmarked={bookmarked}
          setBookmarked={setBookmarked}
        />
        <ReviewSummarySection
          images={images}
          average={average}
          totalCount={count}
        />
        <ReviewSection
          contentId={id}
          reloadTrigger={reloadTrigger}
          setReloadTrigger={setReloadTrigger}
        />
      </PageWrapper>
      <ChatFloatingButton contentId={id}>오픈채팅방 열기</ChatFloatingButton>
    </>
  );
};

export default ContentDetail;
