// kkm test 용 코드
import { useNavigate } from "react-router-dom";

function ContentCard({ image, title, location, onClick }) {
  // kkm test 용 코드
  const navigate = useNavigate();

  return (
    <div className="content-card" onClick={onClick}>
      <div className="card-image">
        <img src={image} alt={title} />
        <button className="like-btn">♡</button>
      </div>
      <div className="card-text">
        <strong>{title}</strong>
        <p>{location}</p>
      </div>
    </div>
  );
}

export default ContentCard;
