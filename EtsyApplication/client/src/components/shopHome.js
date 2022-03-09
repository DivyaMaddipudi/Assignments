import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";

function shopHome() {
  return (
    <div>
      <Navbar />
      <Hoverbar />
      <hr></hr>
      ShopHome
    </div>
  );
}

export default shopHome;
