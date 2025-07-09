import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import {
  MapContainer,
  MessageContainer,
  ErrorOverlay,
  MapWrapper,
} from "./KakaoMap.styles";
import { AuthContext } from "../context/AuthContext";

/* 임시 좌표 */
const DEFAULT_LAT = 33.450701;
const DEFAULT_LNG = 126.570667;
const DEFAULT_TITLE = "기본 위치 (정보 없음)";

const KakaoMap = ({ contentId }) => {
  const mapContainer = useRef(null);
  const kakaoMap = useRef(null);
  const { auth } = useContext(AuthContext);

  const kakaoMapApiKey = "c338bd3a36435339984df445d3229ab6";
  const apiUrl = window.ENV?.API_URL;

  const [mapData, setMapData] = useState({ center: null, markers: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMapData = (id) => {
    if (!id) {
      setError("ContentID가 존재하기 않습니다.");
      setLoading(false);
      setMapData({
        center: {
          lat: DEFAULT_LAT,
          lng: DEFAULT_LNG,
        },
        markers: [
          {
            lat: DEFAULT_LAT,
            lng: DEFAULT_LNG,
            title: "콘텐츠 ID 없음",
          },
        ],
      });
      return;
    }
    setLoading(true);
    setError(null);

    axios
      .get(`${apiUrl}/api/systm/map/${id}`, {
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
      })
      .then((res) => {
        if (res.data && res.data.items) {
          const item = res.data.items;
          const lat = parseFloat(item.mapY); /* 위도 */
          const lng = parseFloat(item.mapX); /* 경도 */

          if (isNaN(lat) || isNaN(lng)) {
            /* 좌표가 유효한 숫자가 아닌 경우 */
            console.warn(
              `contentId ${id}에 대한 유효한 좌표(mapX, mapY)가 없어 임시 좌표를 사용합니다.`
            );
            lat = DEFAULT_LAT;
            lng = DEFAULT_LNG;
            setError(
              "해당 콘텐츠의 정확한 위치 정보가 없어 기본 위치를 표시합니다."
            );
          } else {
            setError(null);
          }
          setMapData({
            center: { lat: lat, lng: lng },
            markers: [
              {
                lat: lat,
                lng: lng,
                title: item.title || `콘텐츠 ${id}`,
              },
            ],
          });
        } else {
          console.warn(
            `contentId ${id}에 대한 지도 데이터를 가져오지 못했거나 응답이 비정상적입니다.`
          );
          setError(
            res.data?.message ||
              "지도 데이터를 가져오지 못했습니다. 기본 위치를 표시합니다."
          );
          setMapData({
            center: { lat: DEFAULT_LAT, lng: DEFAULT_LNG },
            markers: [
              { lat: DEFAULT_LAT, lng: DEFAULT_LNG, title: DEFAULT_TITLE },
            ],
          });
        }
      })
      .catch((err) => {
        console.error("지도 데이터 조회 중 오류 발생:", err);
        setError(
          "지도 데이터를 불러오는 중 오류가 발생했습니다. 기본 위치를 표시합니다."
        );
        setMapData({
          center: { lat: DEFAULT_LAT, lng: DEFAULT_LNG },
          markers: [
            { lat: DEFAULT_LAT, lng: DEFAULT_LNG, title: DEFAULT_TITLE },
          ],
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMapData(contentId);
  }, [contentId, apiUrl]);

  useEffect(() => {
    if (!kakaoMapApiKey) {
      console.error("KAKAO_MAP_API_KEY 가 설정되어 있지 않습니다.");
      setError("KAKAO_MAP_API_KEY 가 설정되어 있지 않습니다.");
      return;
    }
    if (loading || !mapData.center) {
      return;
    }

    const loadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = mapContainer.current;
        if (!container) {
          console.warn("지도 컨테이너가 존재하지 않습니다.");
          return;
        }
        const center = new window.kakao.maps.LatLng(
          mapData.center.lat,
          mapData.center.lng
        );
        const options = {
          center: center,
          level: 3 /* 지도의 확대 레벨 */,
        };
        if (!kakaoMap.current) {
          /* 지도가 아직 생성되지 않았다면 새로 생성합니다. */
          kakaoMap.current = new window.kakao.maps.Map(container, options);
          console.log("Kakao 지도 생성 완료:", kakaoMap.current);
          /* 지도 객체가 처음 생성될 때만 이벤트 리스너를 추가합니다. */
          window.kakao.maps.event.addListener(
            kakaoMap.current,
            "center_changed",
            function () {
              const currentCenter = kakaoMap.current.getCenter();
              console.log(
                `지도의 중심 좌표가 변경되었습니다: 위도 ${currentCenter.getLat()}, 경도 ${currentCenter.getLng()}`
              );
            }
          );
          window.kakao.maps.event.addListener(
            kakaoMap.current,
            "zoom_changed",
            function () {
              const currentLevel = kakaoMap.current.getLevel();
              console.log(`지도의 확대 레벨이 변경되었습니다: ${currentLevel}`);
            }
          );
        } else {
          /* 이미 생성된 지도가 있다면 중심 좌표와 확대 레벨을 업데이트합니다. */
          kakaoMap.current.setCenter(options.center);
          kakaoMap.current.setLevel(options.level);
          console.log("Kakao 지도 업데이트");
        }

        /* 기존 마커가 있다면 제거합니다. */
        if (kakaoMap.current._markers) {
          kakaoMap.current._markers.forEach((marker) => marker.setMap(null));
        }
        kakaoMap.current._markers = [];

        /* 새로운 마커를 추가합니다. */
        mapData.markers.forEach((markerInfo) => {
          const markerPosition = new window.kakao.maps.LatLng(
            markerInfo.lat,
            markerInfo.lng
          );
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            title: markerInfo.title,
          });
          marker.setMap(kakaoMap.current);
          kakaoMap.current._markers.push(marker);
        });
        console.log(`Kakao 지도에 ${mapData.markers.length}개 마커 추가 완료`);
      });
    };

    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapApiKey}&autoload=false`; // 앱 키 포함
      script.async = true;
      document.head.appendChild(script);
      script.onload = loadKakaoMap;
      script.onerror = (err) => {
        console.error("Kakao 지도 SDK 로드 실패:", err);
        setError("Kakao 지도 SDK를 불러오는 데 실패했습니다.");
      };

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        if (kakaoMap.current) {
          kakaoMap.current = null;
        }
      };
    } else {
      /* SDK가 이미 로드되어 있다면 바로 지도 초기화/업데이트 로직을 실행합니다. */
      loadKakaoMap();
    }
  }, [kakaoMapApiKey, mapData, loading]); /* 변경될 때마다 useEffect 재실행 */

  /* 로딩, 에러, 데이터 없음 상태에 따라 다른 메시지를 표시합니다. */
  if (loading) {
    return (
      <MapWrapper>
        <MessageContainer>지도 데이터를 불러오는 중입니다...</MessageContainer>;
      </MapWrapper>
    );
  }
  if (!mapData.center && error) {
    return (
      <MapWrapper>
        <MessageContainer $isError>
          지도 정보를 표시할 수 없습니다.
        </MessageContainer>
        ;
      </MapWrapper>
    );
  }

  return (
    <MapWrapper>
      <MapContainer ref={mapContainer}>
        {error && mapData.center && <ErrorOverlay>{error}</ErrorOverlay>}
      </MapContainer>
    </MapWrapper>
  );
};

export default KakaoMap;
