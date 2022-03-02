import React, { useState } from "react";
import Signin from "./Signin";
import "@material-ui/icons/Close";
import { Navigate } from "react-router";
import cookie from "react-cookies";
import Error from "./error";

function Navbar() {
  const [showSignIn, setshowSignIn] = useState(false);
  const popUpSignIn = () => {
    setshowSignIn(true);
  };

  let navLogin = null;
  if (cookie.load("cookie")) {
    console.log("Able to read cookie");
    navLogin = <span class="glyphicon glyphicon-user">Logout</span>;
  } else {
    console.log("Not Able to read cookie in navbar");
    navLogin = <span class="glyphicon glyphicon-log-in">Sign in</span>;
  }

  let redirectVar = null;
  if (cookie.load("cookie")) {
    redirectVar = <Navigate to="/home" />;
  }
  return (
    <div>
      {redirectVar}
      <header className="navBar">
        <h2 className="logo">Etsy</h2>
        <input type="text" id="searchBar" className="searchBar"></input>

        <ul className="icons">
          <li className="icons_nav" onClick={popUpSignIn}>
            {navLogin}
          </li>
          {/* <li className="icons_nav">Login</li> */}
        </ul>
      </header>
      {showSignIn && <Error setshowSignIn={setshowSignIn} />}
    </div>
  );
}

export default Navbar;
