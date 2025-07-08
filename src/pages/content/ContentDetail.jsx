import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MapSection from "../../components/contentDetail/MapSection";
import ActionRow from "../../components/contentDetail/ActionRow";
import ReviewSection from "../../components/contentDetail/review/ReviewSection";
import { PageWrapper } from "./ContentDetail.styles";
import ChatFloatingButton from "../../components/contentDetail/ChatFloatingButton";
import ReviewSummarySection from "../../components/contentDetail/review/ReviewSummarySection";
import "./ContentDetail.css";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ContentDetail = () => {
  const { state } = useLocation();
  const { id, title, image, location } = state;
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [images, setImages] = useState([]);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [contentDetail, setContentDetail] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

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

      sessionStorage.setItem("accessToken", response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      window.location.href = "/login";
      return null;
    }
  };

  // API 요청 함수 - 토큰 갱신 로직 포함
  const secureApiRequest = async (apiCall) => {
    try {
      return await apiCall();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
          return await apiCall(newToken);
        }
      } else if (error.response && error.response.status === 403) {
        console.error("접근 권한이 없습니다:", error);
        alert("이 콘텐츠에 접근할 권한이 없습니다.");
      } else {
        throw error;
      }
    }
  };

  // 컨텐츠 상세 정보 가져오기
  useEffect(() => {
    axios
      .get(`${ENV_URL}/api/main-contents/${id}`, {
        params: {
          contentId: id,
        },
      })
      .then((res) => {
        console.log("컨텐츠 상세 정보:", res.data);
        if (res.data && res.data.items) {
          setContentDetail(res.data.items);
        }
      })
      .catch((err) => {
        console.error("컨텐츠 상세 정보 조회 실패:", err);
      });
  }, [id]);

  useEffect(() => {
    // 리뷰 정보 로드
    axios
      .get(`${ENV_URL}/api/reviews/summary?contentId=${id}`)
      .then((res) => {
        const summaryData = res.data.items;

        setAverage(summaryData.average || 0);
        setCount(summaryData.totalCount || 0);
        setImages(Array.isArray(summaryData.images) ? summaryData.images : []);

        setTimeout(() => {
          console.log("상태 업데이트 후 (딜레이):", { average, count, images });
        }, 100);
      })
      .catch((err) => {
        console.error("리뷰 정보 조회 실패", err);
      });

    // 좋아요, 북마크 상태 로드
    if (accessToken) {
      const userNo = sessionStorage.getItem("userNo");
      secureApiRequest(async (token = accessToken) => {
        const response = await axios.get(
          `${ENV_URL}/api/favorites/favoriteSet`,
          {
            params: { userNo, contentId: id },
            headers: {
              Authorization: `Bearer ${token}`,
              "X-XSRF-TOKEN":
                document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || "",
            },
          }
        );
        const data = response.data.items;
        setLiked(data.likeFlag);
        setBookmarked(data.bookmarkFlag);
        return response;
      }).catch((err) => {
        console.error("좋아요/즐겨찾기 조회 실패", err);
      });
    }
  }, [id, accessToken]);

  // 콘텐츠 타입 판별 함수
  const getContentType = () => {
    if (!contentDetail) return null;

    // 카테고리 코드로 타입 판별
    const { categoryCode } = contentDetail;
    if (categoryCode === 4) return "festival"; // 축제
    if (categoryCode === 1) return "tour"; // 관광지
    if (categoryCode === 2) return "food"; // 맛집
    if (categoryCode === 3) return "lodging"; // 숙박

    return "general";
  };

  const contentType = getContentType();

  // 해당 컨텐츠의 상세 정보 렌더링 - detailDto가 없어도 기본 정보는 표시
  const renderDetailInfo = () => {
    // 기본 정보 (모든 타입 공통)
    const basicInfo = (
      <div className="detail-section">
        <h3 className="detail-section-title">기본 정보</h3>
        <div className="info-grid">
          {contentDetail?.sidoName && (
            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <div>
                <h4>위치</h4>
                <p>{`${contentDetail.sidoName} ${
                  contentDetail.sigunguName || ""
                }`}</p>
              </div>
            </div>
          )}

          {contentDetail?.tel && (
            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div>
                <h4>연락처</h4>
                <p>{contentDetail.tel}</p>
              </div>
            </div>
          )}

          {contentDetail?.createdTime && (
            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <div>
                <h4>등록일</h4>
                <p>{contentDetail.createdTime}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );

    // contentDetail이 없으면 기본 정보도 렌더링하지 않음
    if (!contentDetail) return null;

    // detailDto가 없는 경우 기본 정보만 반환
    if (!contentDetail.detailDto) {
      return (
        <>
          {basicInfo}
          <div className="detail-section">
            <p className="info-alert">
              <i className="fas fa-info-circle"></i> 상세 정보가 준비 중입니다.
            </p>
          </div>
        </>
      );
    }

    const { detailDto } = contentDetail;

    switch (contentType) {
      case "festival":
        return (
          <>
            {basicInfo}
            <div className="detail-section">
              <h3 className="detail-section-title">축제 정보</h3>
              <div className="info-grid">
                {detailDto.eventStartDate && detailDto.eventEndDate && (
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-calendar-alt"></i>
                    </div>
                    <div>
                      <h4>행사 기간</h4>
                      <p>
                        {detailDto.eventStartDate} ~ {detailDto.eventEndDate}
                      </p>
                    </div>
                  </div>
                )}

                {detailDto.useTimeFestival && (
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div>
                      <h4>운영 시간</h4>
                      <p>{detailDto.useTimeFestival}</p>
                    </div>
                  </div>
                )}

                {detailDto.sponsor && (
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-user-tie"></i>
                    </div>
                    <div>
                      <h4>주최/주관</h4>
                      <p>{detailDto.sponsor}</p>
                    </div>
                  </div>
                )}

                {detailDto.program && (
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-list-ul"></i>
                    </div>
                    <div>
                      <h4>프로그램</h4>
                      <p>{detailDto.program}</p>
                    </div>
                  </div>
                )}
              </div>

              {detailDto.eventExp && (
                <div className="detail-description">
                  <h3>행사 설명</h3>
                  <p>{detailDto.eventExp}</p>
                </div>
              )}
            </div>
          </>
        );

      case "food":
        return (
          <>
            {basicInfo}
            <div className="detail-section">
              <h3 className="detail-section-title">맛집 정보</h3>
              <div className="info-grid">
                {detailDto.mainMenu && (
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-utensils"></i>
                    </div>
                    <div>
                      <h4>대표 메뉴</h4>
                      <p>{detailDto.mainMenu}</p>
                    </div>
                  </div>
                )}

                {detailDto.parking && (
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-parking"></i>
                    </div>
                    <div>
                      <h4>주차 시설</h4>
                      <p>{detailDto.parking}</p>
                    </div>
                  </div>
                )}
              </div>

              {detailDto.foodExp && (
                <div className="detail-description">
                  <h3>음식 설명</h3>
                  <p>{detailDto.foodExp}</p>
                </div>
              )}
            </div>
          </>
        );

      case "lodging":
        return (
          <>
            {basicInfo}
            <div className="detail-section">
              <h3 className="detail-section-title">숙박 정보</h3>
              <div className="info-grid">
                {(detailDto.checkIn || detailDto.checkOut) && (
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-door-open"></i>
                    </div>
                    <div>
                      <h4>체크인/체크아웃</h4>
                      <p>
                        체크인: {detailDto.checkIn || "정보 없음"}
                        <br />
                        체크아웃: {detailDto.checkOut || "정보 없음"}
                      </p>
                    </div>
                  </div>
                )}

                {detailDto.parking && (
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-parking"></i>
                    </div>
                    <div>
                      <h4>주차 시설</h4>
                      <p>{detailDto.parking}</p>
                    </div>
                  </div>
                )}

                {detailDto.elevator && (
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-arrow-up"></i>
                    </div>
                    <div>
                      <h4>엘리베이터</h4>
                      <p>{detailDto.elevator}</p>
                    </div>
                  </div>
                )}
              </div>

              {detailDto.lodgingExp && (
                <div className="detail-description">
                  <h3>숙박 시설 설명</h3>
                  <p>{detailDto.lodgingExp}</p>
                </div>
              )}
            </div>
          </>
        );

      case "tour":
        return (
          <>
            {basicInfo}
            <div className="detail-section">
              <h3 className="detail-section-title">관광지 정보</h3>
              <div className="info-grid">
                {detailDto.useTimeTour && (
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div>
                      <h4>이용 시간</h4>
                      <p>{detailDto.useTimeTour}</p>
                    </div>
                  </div>
                )}

                {detailDto.parking && (
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-parking"></i>
                    </div>
                    <div>
                      <h4>주차 시설</h4>
                      <p>{detailDto.parking}</p>
                    </div>
                  </div>
                )}
              </div>

              {detailDto.tourExp && (
                <div className="detail-description">
                  <h3>관광지 설명</h3>
                  <p>{detailDto.tourExp}</p>
                </div>
              )}
            </div>
          </>
        );

      default:
        return (
          <>
            {basicInfo}
            <div className="detail-section">
              <p className="no-info-text">추가 정보가 없습니다.</p>
            </div>
          </>
        );
    }
  };

  return (
    <>
      {contentDetail && (
        <div className="content-detail-container">
          {/* 이미지 갤러리 섹션 */}
          <div className="image-gallery-section">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              className="detail-swiper"
            >
              {/* 메인 이미지 먼저 표시 */}
              <SwiperSlide key="main">
                <div className="gallery-image-container">
                  <img
                    src={contentDetail.firstImage}
                    alt={contentDetail.title}
                  />
                </div>
              </SwiperSlide>

              {/* fileUrl 배열의 이미지들 표시 */}
              {contentDetail.fileUrl &&
                contentDetail.fileUrl.map((url, index) => (
                  <SwiperSlide key={index}>
                    <div className="gallery-image-container">
                      <img
                        src={url}
                        alt={`${contentDetail.title} ${index + 1}`}
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          {/* 컨텐츠 기본 정보 헤더 */}
          <div className="content-header">
            <div className="content-category-badge">
              {contentDetail.categoryName || "여행"}
            </div>
            <h1 className="content-title">{contentDetail.title}</h1>
            <div className="content-meta">
              <div className="content-location">
                <i className="fas fa-map-marker-alt"></i>{" "}
                {contentDetail.sigunguName
                  ? `${contentDetail.sidoName} ${contentDetail.sigunguName}`
                  : location}
              </div>
              {contentDetail.tel && (
                <div className="content-tel">
                  <i className="fas fa-phone"></i> {contentDetail.tel}
                </div>
              )}
            </div>
          </div>

          {/* 탭 메뉴 */}
          <div className="content-tabs">
            <button
              className={`tab-button ${activeTab === "info" ? "active" : ""}`}
              onClick={() => setActiveTab("info")}
            >
              <i className="fas fa-info-circle"></i> 상세정보
            </button>
            <button
              className={`tab-button ${
                activeTab === "reviews" ? "active" : ""
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              <i className="fas fa-star"></i> 리뷰 ({count})
            </button>
            <button
              className={`tab-button ${activeTab === "map" ? "active" : ""}`}
              onClick={() => setActiveTab("map")}
            >
              <i className="fas fa-map"></i> 지도
            </button>
          </div>

          {/* 탭 컨텐츠 */}
          <div className="tab-content">
            {activeTab === "info" && <>{renderDetailInfo()}</>}

            {activeTab === "reviews" && (
              <>
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
              </>
            )}

            {activeTab === "map" && (
              <div className="map-container">
                <MapSection location={contentDetail.addr1 || location} />
              </div>
            )}
          </div>

          {/* 액션 버튼 영역 */}
          <ActionRow
            contentId={id}
            liked={liked}
            setLiked={setLiked}
            bookmarked={bookmarked}
            setBookmarked={setBookmarked}
          />
        </div>
      )}
      <ChatFloatingButton contentId={id} title={contentDetail?.title || title}>
        오픈채팅방 열기
      </ChatFloatingButton>
    </>
  );
};

export default ContentDetail;
