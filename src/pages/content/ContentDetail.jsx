import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ContentInfo from "../../components/contentDetail/ContentInfo";
import MapSection from "../../components/contentDetail/MapSection";
import ActionRow from "../../components/contentDetail/ActionRow";
import ReviewSection from "../../components/contentDetail/review/ReviewSection";
import { PageWrapper } from "./ContentDetail.styles";
import ChatFloatingButton from "../../components/contentDetail/ChatFloatingButton";
import ReviewSummarySection from "../../components/contentDetail/review/ReviewSummarySection";
import "./ContentDetail.css";

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
  const [festival, setFestival] = useState({
    contentId: id,
    cateGoryCode: "15",
    title: title,
    firstImage: image,
    tel: "",
    homepage: "",
    playTime: "",
    program: "",
    eventExp: "",
    sponsor: "",
    usetimeFestival: "",
    eventStartDate: "",
    eventEndDate: "",
    createdTime: "",
    modifiedTime: "",
    fileUrl: "",
  });

  const accessToken = sessionStorage.getItem("accessToken");
  const ENV_URL = window.ENV?.API_URL;

  // 리프레시 토큰으로 새 액세스 토큰 요청 함수
  const refreshToken = async () => {
    try {
      const refreshToken = sessionStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("리프레시 토큰이 없습니다");
      }

      const response = await axios.post(`${ENV_URL}/api/auth/refresh`, {
        refreshToken,
      });

      // 새 토큰 저장
      sessionStorage.setItem("accessToken", response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      // 로그인 페이지로 리디렉션
      window.location.href = "/login";
      return null;
    }
  };

  // API 요청 함수 - 토큰 갱신 로직 포함
  const secureApiRequest = async (apiCall) => {
    try {
      return await apiCall();
    } catch (error) {
      // 401 Unauthorized 에러면 토큰 갱신 시도
      if (error.response && error.response.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
          // 갱신된 토큰으로 재시도
          return await apiCall(newToken);
        }
      }
      // 403 Forbidden 에러면 권한 부족
      else if (error.response && error.response.status === 403) {
        console.error("접근 권한이 없습니다:", error);
        alert("이 콘텐츠에 접근할 권한이 없습니다.");
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    // 축제 정보 로드
    axios
      .get(`${ENV_URL}/api/festivals/${id}`)
      .then((res) => {
        setFestival(res.data);
        console.log("축제 정보 조회 성공", res.data);
      })
      .catch((err) => {
        console.error("축제 정보 조회 실패", err);
      });
  }, [id]);

  useEffect(() => {
    // 리뷰 정보 로드
    axios
      .get(`${ENV_URL}/api/reviews/summary?contentId=${id}`)
      .then((res) => {
        setAverage(res.data.average);
        setCount(res.data.totalCount);
        setImages(res.data.images);
      })
      .catch((err) => {
        console.error("리뷰 정보 조회 실패", err);
      });

    // 좋아요, 북마크 상태 로드 - 보안 적용
    if (accessToken) {
      const userNo = sessionStorage.getItem("userNo");

      secureApiRequest(async (token = accessToken) => {
        const response = await axios.get(
          `${ENV_URL}/api/favorites/favoriteSet`,
          {
            params: {
              userNo,
              contentId: id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
              // 추가 CSRF 헤더 (백엔드에서 요구하는 경우)
              "X-XSRF-TOKEN":
                document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || "",
            },
          }
        );

        const data = response.data.items;
        console.log(data);
        setLiked(data.likeFlag);
        setBookmarked(data.bookmarkFlag);
        return response;
      }).catch((err) => {
        console.error("좋아요/즐겨찾기 조회 실패", err);
      });
    }
  }, [id, accessToken]);

  return (
    <>
      <div className="festival-detail-header">
        <h1 className="festival-detail-title">{title}</h1>
        <p className="festival-detail-location">{location}</p>
        <p className="festival-detail-description">
          {festival.eventExp || "축제에 대한 설명이 없습니다."}
        </p>

        <div className="festival-info-section">
          <div className="festival-info-item">
            <div className="festival-info-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="festival-info-content">
              <div className="festival-info-label">행사 기간</div>
              <div className="festival-info-value">
                {festival.eventStartDate && festival.eventEndDate
                  ? `${festival.eventStartDate} ~ ${festival.eventEndDate}`
                  : "기간 정보가 없습니다."}
              </div>
            </div>
          </div>

          <div className="festival-info-item">
            <div className="festival-info-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="festival-info-content">
              <div className="festival-info-label">운영 시간</div>
              <div className="festival-info-value">
                {festival.usetimeFestival || "운영 시간 정보가 없습니다."}
              </div>
            </div>
          </div>

          <div className="festival-info-item">
            <div className="festival-info-icon">
              <i className="fas fa-user-tie"></i>
            </div>
            <div className="festival-info-content">
              <div className="festival-info-label">주최 / 주관</div>
              <div className="festival-info-value">
                {festival.sponsor || "주최자 정보가 없습니다."}
              </div>
            </div>
          </div>

          <div className="festival-info-item">
            <div className="festival-info-icon">
              <i className="fas fa-list-ul"></i>
            </div>
            <div className="festival-info-content">
              <div className="festival-info-label">프로그램</div>
              <div className="festival-info-value">
                {festival.program || "프로그램 정보가 없습니다."}
              </div>
            </div>
          </div>

          <div className="festival-info-item">
            <div className="festival-info-icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div className="festival-info-content">
              <div className="festival-info-label">연락처</div>
              <div className="festival-info-value">
                {festival.tel || "연락처 정보가 없습니다."}
              </div>
            </div>
          </div>

          <div className="festival-info-item">
            <div className="festival-info-icon">
              <i className="fas fa-globe"></i>
            </div>
            <div className="festival-info-content">
              <div className="festival-info-label">홈페이지</div>
              <div className="festival-info-value">
                {festival.homepage ? (
                  <a
                    href={festival.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    바로가기
                  </a>
                ) : (
                  "홈페이지 정보가 없습니다."
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <PageWrapper>
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
