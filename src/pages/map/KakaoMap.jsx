import React, { useEffect, useRef, useState } from "react";
import {
  MapWrapper,
  MapContainer,
  MessageContainer,
  ErrorOverlay,
  MapInfoBox,
  LocationTitle,
  CoordinateInfo,
  ZoomControls,
  ZoomButton,
} from "./KakaoMap.styles";

// 기본 위치 (제주도)
const DEFAULT_COORDS = { lat: 33.450701, lng: 126.570667, title: "기본 위치" };

const KakaoMap = ({ mapX, mapY, title }) => {
  const containerRef = useRef(null);
  const mapInstance = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mapConfig, setMapConfig] = useState({
    center: null,
    markers: [],
    zoom: 3,
  });

  // 1) 좌표 유효성 검사 및 state 설정
  useEffect(() => {
    const lat = parseFloat(mapY);
    const lng = parseFloat(mapX);
    if (isNaN(lat) || isNaN(lng)) {
      setError("유효하지 않은 좌표입니다. 기본 위치로 표시합니다.");
      setMapConfig({
        center: { lat: DEFAULT_COORDS.lat, lng: DEFAULT_COORDS.lng },
        markers: [DEFAULT_COORDS],
        zoom: 3,
      });
    } else {
      setMapConfig({
        center: { lat, lng },
        markers: [{ lat, lng, title: title || "위치" }],
        zoom: 3,
      });
      setError("");
    }
    setLoading(false);
  }, [mapX, mapY, title]);

  // 2) public/index.html에 다음 스크립트 한 번만 넣은 뒤 autoload=false 옵션 추가
  // <script
  //   src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_JS_KEY&libraries=services&autoload=false"
  //   async
  // ></script>

  // 3) Kakao Maps 로드 및 지도 초기화
  useEffect(() => {
    if (loading || !mapConfig.center) return;
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.load) {
      setError("카카오 맵 SDK 로딩 실패");
      return;
    }

    // SDK 초기화 콜백
    window.kakao.maps.load(() => {
      if (!containerRef.current) {
        setError("맵 컨테이너를 찾을 수 없습니다.");
        return;
      }
      try {
        const { lat, lng } = mapConfig.center;
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: mapConfig.zoom,
        };

        // mapInstance 가 null일 때만 생성
        if (!mapInstance.current) {
          mapInstance.current = new window.kakao.maps.Map(
            containerRef.current,
            options
          );
          // 줌 이벤트
          window.kakao.maps.event.addListener(
            mapInstance.current,
            "zoom_changed",
            () => {
              setMapConfig((cfg) => ({
                ...cfg,
                zoom: mapInstance.current.getLevel(),
              }));
            }
          );
        } else {
          mapInstance.current.setCenter(options.center);
          mapInstance.current.setLevel(options.level);
        }

        // 기존 마커 제거
        if (mapInstance.current._markers) {
          mapInstance.current._markers.forEach((m) => m.setMap(null));
        }
        mapInstance.current._markers = [];

        // 새로운 마커 추가
        mapConfig.markers.forEach((mInfo) => {
          const pos = new window.kakao.maps.LatLng(mInfo.lat, mInfo.lng);
          const marker = new window.kakao.maps.Marker({
            position: pos,
            map: mapInstance.current,
            title: mInfo.title,
          });
          mapInstance.current._markers.push(marker);

          const iw = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${mInfo.title}</div>`,
          });
          window.kakao.maps.event.addListener(marker, "mouseover", () =>
            iw.open(mapInstance.current, marker)
          );
          window.kakao.maps.event.addListener(marker, "mouseout", () =>
            iw.close()
          );
        });
      } catch (e) {
        console.error(e);
        setError("지도 초기화 중 오류가 발생했습니다.");
      }
    });
  }, [loading, mapConfig]);

  if (loading) {
    return (
      <MapWrapper>
        <MessageContainer>
          <i className="fas fa-spinner fa-spin" /> 로딩 중…
        </MessageContainer>
      </MapWrapper>
    );
  }
  if (error) {
    return (
      <MapWrapper>
        <MessageContainer $isError>
          <i className="fas fa-exclamation-triangle" /> {error}
        </MessageContainer>
      </MapWrapper>
    );
  }

  return (
    <MapWrapper>
      <MapContainer ref={containerRef} />
      <ZoomControls>
        <ZoomButton
          onClick={() =>
            mapInstance.current &&
            mapInstance.current.setLevel(Math.max(1, mapConfig.zoom - 1))
          }
        >
          +
        </ZoomButton>
        <ZoomButton
          onClick={() =>
            mapInstance.current &&
            mapInstance.current.setLevel(Math.min(10, mapConfig.zoom + 1))
          }
        >
          −
        </ZoomButton>
      </ZoomControls>
      <MapInfoBox>
        <LocationTitle>{mapConfig.markers[0].title}</LocationTitle>
        <CoordinateInfo>
          위도: {mapConfig.center.lat.toFixed(6)}, 경도:{" "}
          {mapConfig.center.lng.toFixed(6)}
        </CoordinateInfo>
      </MapInfoBox>
      {error && <ErrorOverlay>{error}</ErrorOverlay>}
    </MapWrapper>
  );
};

export default KakaoMap;
