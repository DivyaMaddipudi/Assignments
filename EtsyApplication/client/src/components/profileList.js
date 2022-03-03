import React from "react";
import {
  ShoppingCart,
  Person,
  NotificationsNoneSharp,
  FavoriteBorderSharp,
} from "@material-ui/icons";
import cookie from "react-cookies";

function profileList({ setShowProfileLists }) {
  const showHomePage = () => {
    setShowProfileLists(false);
  };
  return (
    <div>
      <div onClick={showHomePage} className="profile-modal">
        <div className="profile-content">
          {/* <CloseLogin setshowSignIn={setshowSignIn} /> */}

          <ul className="profile-icons">
            <li>
              <p>{cookie.load("user")}</p>
            </li>
            <li>Gift card balances</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default profileList;
