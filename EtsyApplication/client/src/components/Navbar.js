import React, { useState } from "react";
import Signin from "./Signin";
import { useNavigate } from "react-router-dom";
import "@material-ui/icons/Close";

function Navbar() {
  // let navigate = useNavigate();
  const [showSignIn, setshowSignIn] = useState(false);

  const popUpSignIn = () => {
    setshowSignIn(true);
  };
  return (
    <div>
      <header className="navBar">
        <h2 className="logo">Etsy</h2>
        <input type="text" id="searchBar" className="searchBar"></input>
        <ul className="icons">
          <li className="icons_nav" onClick={popUpSignIn}>
            Sign in
          </li>
          <li className="icons_nav">Login</li>
        </ul>
      </header>
      {showSignIn === true && <Signin setshowSignIn={setshowSignIn} />}
    </div>
  );
}

export default Navbar;
