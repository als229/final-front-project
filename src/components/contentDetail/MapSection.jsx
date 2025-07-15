import { MapBox } from "../../pages/content/ContentDetail.styles";
import KakaoMap from "../../pages/map/KakaoMap";

const MapSection = ({ id, mapX, mapY }) => {
  console.log("나오냐?", mapX, mapY);
  return (
    <div className="map-section">
      <KakaoMap
        contentId={id}
        mapX={mapX} // 좌표 정보 전달
        mapY={mapY} // 좌표 정보 전달
      />
    </div>
  );
};

export default MapSection;
