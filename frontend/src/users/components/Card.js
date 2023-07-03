function Card({ title, description, img }) {
  return (
    <div className="card">
      <div className="card-img">
        <img className="image-in-card" src={cardImage1} alt="" />
      </div>
      <div className="card-title-holder">
        <h2 className="card-title">yo yo yo</h2>
      </div>
      <div className="card-text">
        <p>Paragraphs go here</p>
      </div>
    </div>
  );
}
export default Card;
