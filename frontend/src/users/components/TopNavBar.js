import { useState } from "react";
import "./TopNavBar.css";
function TopNavbar() {
  return (
    <div className="top-nav">
      <a href="#" className={`top-nav-item`}>
        <span>College Favorites</span>
      </a>
      <a href="#" className="top-nav-item">
        <span>Best for Budget</span>
      </a>
      <a href="#" className="top-nav-item">
        <span>Decorations</span>
      </a>
      <a href="#" className="top-nav-item">
        <span>Necessities</span>
      </a>
      <a href="#" className="top-nav-item">
        <span>College-merchendise</span>
      </a>
    </div>
  );
}

export default TopNavbar;
