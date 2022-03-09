import React, { useState } from "react";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";
import Axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function sellOnEtsy() {
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const [shopName, setShopName] = useState("");
  const [error, setError] = useState("");
  //   const [isError, setIsError] = useState(false);

  const CheckAvailability = (shopName) => {
    console.log(shopName.length);
    if (shopName.length < 4) {
      setError("Minimum length is 4");
    } else {
      setError("Available");
      Axios.post("http://localhost:4000/registerShop", {
        shopName: shopName,
      })
        .then((response) => {
          if (response.data.message === "duplicate") {
            setError("Not Available");
          } else if (response.data.message === "error") {
            setError("Error");
          }
        })
        .catch((err) => {
          setError("Shop Name is not available");
        });
    }
  };

  const handleCreateShop = () => {
    navigate("/shopHome");
  };

  let errorMsg = null;
  console.log(error);
  if (error === " " || error === "Not Available") {
    console.log(error + " in if block");
    errorMsg = (
      <div>
        <span style={{ color: "red" }}>{error}</span>
      </div>
    );
  } else if (error === "Available") {
    console.log(error + " in else block");
    errorMsg = (
      <div>
        <span style={{ color: "green" }}>{error}</span>
      </div>
    );
  }

  let redirectVar = null;
  if (!user) {
    console.log("cookie is found " + user);
    redirectVar = <Navigate to="/home" />;
  }

  return (
    <div>
      {redirectVar}
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <div className="sell_page">
        <h3>Name your shop</h3>
        <p>Choose a memorable name that reflects your style</p>
        <hr></hr>
        {errorMsg}
        <div className="shop_name">
          <input
            type="text"
            className="shopName"
            id="shopName"
            maxLength="20"
            required
            onChange={(event) => {
              setShopName(event.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              CheckAvailability(shopName);
            }}
          >
            Check availability
          </button>
        </div>
        <div className="create_shop">
          <button onClick={handleCreateShop}>Create Shop</button>
        </div>
      </div>
    </div>
  );
}

export default sellOnEtsy;
