import { MapBox } from "../../pages/content/ContentDetail.styles";
import KakaoMap from "../../pages/map/KakaoMap";

const MapSection = ({ location, id }) => {
  return <KakaoMap contentId={id} />;
};

export default MapSection;
