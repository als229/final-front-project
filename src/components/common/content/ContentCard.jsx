import { useNavigate } from "react-router-dom";
import "./Content.css";

function ContentCard({ image, title, location, categoryName, onClick }) {
  const navigate = useNavigate();

  return (
    <div className="content-card" onClick={onClick}>
      <div className="content-card-image-container">
        <img src={image || "/images/default-travel.jpg"} alt={title} />
        <div className="content-card-category">
          <span>{categoryName}</span>
        </div>
      </div>
      <div className="content-card-info">
        <h3 className="content-card-title">{title}</h3>
        <div className="content-card-location">
          <i className="fas fa-map-marker-alt"></i> {location}
        </div>
      </div>
    </div>
  );
}

export default ContentCard;
