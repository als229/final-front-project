function ContentCard({ image, title, location }) {
  return (
    <div className="content-card">
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
