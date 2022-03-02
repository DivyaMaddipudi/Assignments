import React, { useState } from "react";
import Signin from "./Signin";
import "@material-ui/icons/Close";
import { Navigate } from "react-router";
import cookie from "react-cookies";
import {
  ShoppingCart,
  Person,
  NotificationsNoneSharp,
  FavoriteBorderSharp,
} from "@material-ui/icons";
// import { PersonIcon, ShoppingCart } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const [showSignIn, setshowSignIn] = useState(false);
  const popUpSignIn = () => {
    setshowSignIn(true);
  };

  let navLogin = null;
  if (cookie.load("user")) {
    console.log("Able to read cookie");
    console.log(cookie.load("user"));
    navLogin = (
      <ul className="icons">
        <li>
          <FavoriteBorderSharp />
        </li>
        <li>
          <NotificationsNoneSharp />
        </li>
        <li>
          <Person />
        </li>
        <li>
          <ShoppingCart />
        </li>
      </ul>
    );
  } else {
    console.log(cookie.load("email"));
    console.log("Not Able to read cookie in navbar");
    navLogin = (
      <ul className="icons">
        <li className="icons_nav" onClick={popUpSignIn}>
          Login
        </li>

        <li>
          <ShoppingCart />
        </li>
      </ul>
    );
  }

  let redirectVar = null;
  if (cookie.load("email")) {
    redirectVar = <Navigate to="/home" />;
  }
  return (
    <div>
      {/* {redirectVar} */}
      <header className="navBar">
        <h2 className="logo">Etsy</h2>
        <input type="text" id="searchBar" className="searchBar"></input>

        {navLogin}
      </header>
      {showSignIn && <Signin setshowSignIn={setshowSignIn} />}
    </div>
  );
}

export default Navbar;
