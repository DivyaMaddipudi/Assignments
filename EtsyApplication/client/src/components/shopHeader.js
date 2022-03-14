import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../features/productsSlice";
import { selectUser } from "../features/userSlice";
import EditShop from "./ShopDetails/editShop";
// import Images from "../Images";

function shopHeader() {
  const user = useSelector(selectUser);
  const product = useSelector(getProducts);
  const [shopName, setShopName] = useState("");
  const [userId, setUserId] = useState();
  const [editShopPage, setEditShopPage] = useState(false);
  const [userName, setUserName] = useState("");
  const [shopImage, setShopImage] = useState("");
  const [shopDetails, setShopDetails] = useState();
  const [prodUserId, setProdUserId] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:4000/getShopById/" + user.id).then(
      (response) => {
        if (response.data.success) {
          // setShop(response.data.result);
          setShopName(response.data.result[0].shopName);
          setUserName(response.data.result[0].name);
          setShopImage(response.data.result[0].shopImage);
        } else {
          console.log("Failed in getting shop by id ");
        }
      }
    );
  }, []);

  const editShopDetails = (id) => {
    setUserId(id);
    setEditShopPage(true);
    console.log("In edit shop details");
  };

  let editButton = null;
  if (product !== null) {
    if (user.id === product.userId) {
      editButton = (
        <>
          <button
            onClick={() => editShopDetails(user.id)}
            id="imgupload"
            className="editshop_btn"
            type="submit"
          >
            Edit shop
          </button>
        </>
      );
    } else {
      editButton = <></>;
    }
  } else {
    editButton = (
      <>
        <button
          onClick={() => editShopDetails(user.id)}
          id="imgupload"
          className="editshop_btn"
          type="submit"
        >
          Edit shop
        </button>
      </>
    );
  }

  return (
    <div className="shophome_header">
      <div className="shop_details">
        {/* {`../Images/${shopImage}`} */}
        <img width="50px" src={"../Images/" + shopImage} alt="shop"></img>
        <div className="shop_info">
          <h3 className="shop_name">{shopName}</h3>
          <p> 10 Sales </p>
          {editButton}
        </div>
      </div>
      <div className="owner_details">
        <h6 style={{ fontSize: "18px" }}>SHOP OWNER</h6>
        <img
          style={{ width: "30%", borderRadius: "50%", height: "100px" }}
          src="https://images.pexels.com/photos/11376531/pexels-photo-11376531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        ></img>
        <h5>{userName}</h5>
      </div>
      {editShopPage && (
        <EditShop editShopPage={setEditShopPage} userId={userId} />
      )}
    </div>
  );
}

export default shopHeader;
