import "./Purchase.css";

import cardImage1 from "../../Images/phillip-goldsberry-fZuleEfeA1Q-unsplash.jpg";
import cardImage2 from "../../Images/spacejoy-IH7wPsjwomc-unsplash.jpg";
import cardImage3 from "../../Images/suchit-poojari-ljRiZl00n18-unsplash.jpg";

function Purchase(prop) {
  return (
    <div className="card-mirage">
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
      <div className="card">
        <div className="card-img">
          <img className="image-in-card" src={cardImage2} alt="" />
        </div>
        <div className="card-title-holder">
          <h2 className="card-title">yo yo yo</h2>
        </div>
        <div className="card-text">
          <p>Paragraphs go here</p>
        </div>
      </div>
      <div className="card">
        <div className="card-img">
          <img className="image-in-card" src={cardImage3} alt="" />
        </div>
        <div className="card-title-holder">
          <h2 className="card-title">yo yo yo</h2>
        </div>
        <div className="card-text">
          <p>Paragraphs go here</p>
        </div>
      </div>
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
      <div className="card">
        <div className="card-img">
          <img className="image-in-card" src={cardImage2} alt="" />
        </div>
        <div className="card-title-holder">
          <h2 className="card-title">yo yo yo</h2>
        </div>
        <div className="card-text">
          <p>Paragraphs go here</p>
        </div>
      </div>
      <div className="card">
        <div className="card-img">
          <img className="image-in-card" src={cardImage3} alt="" />
        </div>
        <div className="card-title-holder">
          <h2 className="card-title">yo yo yo</h2>
        </div>
        <div className="card-text">
          <p>Paragraphs go here</p>
        </div>
      </div>
    </div>
  );
}
export default Purchase;
