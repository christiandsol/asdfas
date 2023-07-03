// import App from "../App";
import "./Header.css";
import searchIcon from "../../Images/search-icon.png";
import cartIcon from "../../Images/cart-icon-fotor-2023061916048.png";

function Header({ loggedIn }) {
  return (
    <div className="header">
      <div className="header-part part-1">
        <p>Décor Discovery</p>
      </div>
      <div className="header-part part-2">
        {/* <input type="search" />
        <img className="search-icon" src={searchIcon} alt="" /> */}
      </div>
      <div className="header-part part-3">
        {loggedIn ? (
          <a href="/decor/new" className="post">
            <p>Post</p>
          </a>
        ) : (
          <a href="/sign-in" class="sign-in">
            <p>Sign In</p>
          </a>
        )}
      </div>
      <div className="header-part part-4">
        <img className="cart-icon" src={cartIcon} alt="img" />
      </div>
    </div>
  );
}

export default Header;
