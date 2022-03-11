import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import AddProducts from "./products/addProducts";
import Axios from "axios";
import { Col, Card, Row } from "antd";

function shopHome() {
  const user = useSelector(selectUser);
  const [products, setProducts] = useState([]);
  const [showProds, setShowProds] = useState(false);
  const [Skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(3);
  const [showProductsAddPage, setShowProductsAddPage] = useState(false);
  const [postSize, setPostSize] = useState();

  const addItems = () => {
    setShowProductsAddPage(true);
  };

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: limit,
    };
    viewItems(variables);
  }, []);

  const onLoadMore = () => {
    console.log(limit);
    console.log(skip);
    let skip = Skip + limit;
    console.log(skip + " in load more");
    const variables = {
      skip: skip,
      limit: limit,
      loadMore: true,
    };
    viewItems(variables);
    setSkip(skip);
  };

  const viewItems = (variables) => {
    setShowProds(true);
    console.log("---------------in view Items-------------------");
    console.log(variables.skip + " in get all products");
    Axios.post(
      "http://localhost:4000/getAllProducts/" + user.id,
      variables
    ).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setProducts([...products, ...response.data.result]);
          console.log(products);
        } else {
          setProducts(response.data.result);
        }
        setPostSize(response.data.postSize);
        console.log(response.data.postSize + "Postsize in getallProducts");
      } else {
        console.log("Failed in ");
      }
    });
  };

  const renderCards = products.map((product) => {
    return (
      <Col
        style={{
          flex: "1",
        }}
      >
        <Card
          style={{
            boxShadow: "0px 0px 9px 2px black",
            width: "80%",
            marginTop: "20px",
            height: "300px",
            textAlign: "center",
            overflow: "hidden",
          }}
          hoverable={true}
          cover={
            <div>
              <h2>{product.itemName}</h2>
              <img src={require("../../Images/" + product.itemImage)} />
            </div>
          }
        >
          <Card.Meta
            style={{
              width: "100%",
            }}
            title={product.itemDescription}
            description={`$${product.itemPrice}`}
          />
        </Card>
      </Col>
    );
  });

  return (
    <div>
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <div className="shophome_header">
        <div className="shop_details">
          <img
            className="shop_img"
            src="https://images.pexels.com/photos/11376531/pexels-photo-11376531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          ></img>
          <div className="shop_info">
            <h3 className="shop_name">SunnySelfCare</h3>
            <p>0 sales </p>
            <button className="editshop_btn" type="submit">
              Edit shop
            </button>
          </div>
        </div>
        <div className="owner_details">
          <h6 style={{ fontSize: "18px" }}>SHOP OWNER</h6>
          <img
            style={{ width: "30%", borderRadius: "50%", height: "100px" }}
            src="https://images.pexels.com/photos/11376531/pexels-photo-11376531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          ></img>
          <h5>{user.name}</h5>
        </div>
      </div>
      <div className="shop_items">
        <div>
          <button
            style={{
              marginLeft: "7.5%",
              padding: "10px",
              width: "25%",
              backgroundColor: "gray",
              border: "none",
              color: "white",
            }}
            onClick={addItems}
          >
            Add More Items..!
          </button>
        </div>
        <div>
          <div style={{ width: "75%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}></div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "1rem auto",
              }}
            ></div>
            {products.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  height: "300px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2>No post yet...</h2>
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  boxShadow: "0px 0px 9px 2px black",
                  // display: "flex",
                  // height: "300px",
                  // justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <Row
                  style={{
                    display: "flex",
                    gridAutoFlow: "column",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {renderCards}
                </Row>
              </div>
            )}

            <br />
            <br />
            {postSize >= limit && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={onLoadMore}>Load More</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showProductsAddPage && (
        <AddProducts setShowProductsAddPage={setShowProductsAddPage} />
      )}
    </div>
  );
}

export default shopHome;
