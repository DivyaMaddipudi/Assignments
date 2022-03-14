import React, { useState } from "react";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";
import { Col, Card, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  removeProductsState,
  updateProducts,
} from "../features/productsSlice";
import { selectUser } from "../features/userSlice";
import cookie from "react-cookies";
import { Link, Navigate } from "react-router-dom";

function searchResultItems() {
  const product = useSelector(getProducts);
  const products = product;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [filterByValue, setFilterByValue] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);

  let filteredProducts = null;
  const filterByPrice = () => {
    if (minPrice !== 0 && maxPrice !== 100) {
      setFilterByValue(true);
      filteredProducts = product.filter((prod) => {
        return prod.itemPrice > minPrice && prod.itemPrice < maxPrice;
      });
      // product = filteredProducts();
      dispatch(updateProducts(filteredProducts));
      console.log(filteredProducts);
    }
  };

  let searchPage = null;
  if (sortBy === "itemPrice") {
    product.sort(function(a, b) {
      return a.itemPrice - b.itemPrice;
    });
  } else if (sortBy === "itemCount") {
    product.sort(function(a, b) {
      return a.itemCount - b.itemCount;
    });
  }

  // console.log(product);

  if (user && cookie.load("user") && product !== null) {
    searchPage = product.map((pro) => {
      return (
        <div className="col-md-4 mb-4">
          <div className="card">
            <img
              src={require("../Images/" + pro.itemImage)}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{pro.itemName}</h5>
              <p>Price: ${pro.itemPrice}</p>
              {/* <p>{pro.itemCount}</p> */}
              <p className="card-text">{pro.itemDescription}</p>
            </div>
          </div>
        </div>
      );
    });
  } else {
    dispatch(removeProductsState());
    searchPage = (
      <div>
        <h4> No Items</h4>
      </div>
    );
  }

  let redirectVar = null;
  if (!cookie.load("user")) {
    redirectVar = <Navigate to="/home" />;
  }
  return (
    <>
      {redirectVar}
      <Navbar />
      <Hoverbar />
      <hr></hr>

      <div
        style={{
          width: "20%",
          position: "relative",
          top: "0",
          left: "78%",
        }}
      >
        <div class="card-body">
          <form id="price-range-form">
            <label for="min-price" class="form-label">
              Min price:
            </label>
            <span id="min-price-txt">${minPrice}</span>
            <input
              type="range"
              class="form-range"
              min="0"
              max="99"
              id="min-price"
              step="1"
              defaultValue="0"
              onChange={(event) => {
                setMinPrice(event.target.value);
              }}
            />
            <label for="max-price" class="form-label">
              Max price:
            </label>
            <span id="max-price-txt">${maxPrice}</span>
            <input
              type="range"
              class="form-range"
              min="1"
              max="100"
              id="max-price"
              step="1"
              defaultValue="100"
              onChange={(event) => {
                setMaxPrice(event.target.value);
              }}
            />
            <button onClick={filterByPrice}>Filter</button>
          </form>
        </div>
      </div>
      {/* 
      <input
        type="checkbox"
        checked={checked}
        id="count"
        name="count"
        value="count"
        onChange={(event) => {
          setOutOfStock(event.target.value);
        }}
      />
      <label for="count">Out of stock</label>
      <br></br> */}

      <div style={{ marginLeft: "80%" }}>
        Sort by: &nbsp;
        <select
          onChange={(event) => {
            setSortBy(event.target.value);
          }}
          style={{
            width: "%",
            height: "40px",
            border: "1px solid black",
            borderRadius: "4px",
            border: "none",
          }}
        >
          <option value="itemPrice">Relavency</option>
          <option value="itemPrice">Price</option>
          <option value="itemCount">Quantity</option>
          <option value="salesCount">Sales Count</option>
        </select>
      </div>
      <div className="container-fluid mx-1">
        <div className="row mt-5 mx-1">
          <div className="col-md-15">
            <div className="row">{searchPage}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default searchResultItems;
