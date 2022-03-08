import React from "react";
import {
  ShoppingCart,
  Person,
  NotificationsNoneSharp,
  FavoriteBorderSharp,
} from "@material-ui/icons";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";

function profileList({ setShowProfileLists }) {
  const navigate = useNavigate();
  const showHomePage = () => {
    setShowProfileLists(false);
  };

  const loadProfilePage = () => {
    navigate("/profile");
  };

  const handleSellOnEtsy = () => {
    navigate("/sellonetsy");
  };
  return (
    <div>
      <div onClick={showHomePage} className="profile-modal">
        <div className="profile-content">
          {/* <CloseLogin setshowSignIn={setshowSignIn} /> */}

          <ul className="profile-icons">
            <li onClick={loadProfilePage} className="profile-icon">
              <b>{cookie.load("user")}</b>
              <br />
              <span style={{ fontSize: "14px" }}>View your profile</span>
            </li>
            <li className="profile-icon">Gift card balance: $0.00</li>
            <li className="profile-icon">Messages</li>
            <li className="profile-icon">Purchases and reviews</li>
            <li className="profile-icon">Account Settings</li>
            <li onClick={handleSellOnEtsy} className="profile-icon">
              Sell on Etsy
            </li>
            <li className="profile-icon">Sign out</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default profileList;
