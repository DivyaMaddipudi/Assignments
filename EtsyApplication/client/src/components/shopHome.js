import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import AddProducts from "./products/addProducts";
import Axios from "axios";
import { Col, Card, Row } from "antd";
import EditProducts from "./products/editProducts";
import EditItemImage from "./products/editItemImage";
import SearchFeature from "./Features/searchFeature";
import ShopHeader from "./shopHeader";
import EditShopImage from "./products/editShopImage";

function shopHome() {
  const user = useSelector(selectUser);
  const [products, setProducts] = useState([]);
  const [showProds, setShowProds] = useState(false);
  const [Skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(3);
  const [showProductsAddPage, setShowProductsAddPage] = useState(false);
  const [postSize, setPostSize] = useState();
  const [showProductsEditPage, setShowProductsEditPage] = useState(false);
  const [productId, setProductId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState("");
  const [showShowImageEditPage, setShowShowImageEditPage] = useState(false);
  const [shop, setShop] = useState();
  const [shopImage, setShopImage] = useState();

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
  const editItem = (id) => {
    setShowProductsEditPage(true);
    setProductId(id);
    console.log("Item to edit" + id);
  };

  const editShopImage = () => {
    setShowShowImageEditPage(true);
    console.log("Edit button clicked");
  };

  const editItemImage = (id) => {
    setShowProductsEditPage(true);
    setProductId(id);
    console.log("Item to edit" + id);
  };

  const updateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    console.log(newSearchTerm + ".........................");

    const variables = {
      skip: 0,
      limit: limit,
      filters: filters,
      searchTerm: searchTerm,
    };
    setSkip(0);
    viewItems(variables);
  };

  const renderCards = products.map((product) => {
    return (
      <Col
        style={{
          flex: "1",
          // backgroundColor: "yellow",
        }}
      >
        <Card
          style={{
            marginLeft: "5%",
            marginBottom: "5%",
            boxShadow: "0px 0px 9px 2px black",
            width: "90%",
            marginTop: "20px",
            height: "350px",
            textAlign: "center",
            overflow: "hidden",
          }}
          hoverable={true}
          cover={
            <div>
              <h2>{product.itemName}</h2>
              <img
                style={{ height: "175px" }}
                src={require("../Images/" + product.itemImage)}
              />
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
          <button
            style={{
              marginTop: "5%",
              width: "25%",
              borderRadius: "4px",
              padding: "5px",
              marginRight: "5%",
              backgroundColor: "gray",
              border: "none",
              color: "white",
            }}
            onClick={() => editItem(product.itemId)}
          >
            Edit
          </button>
          <button
            style={{
              marginTop: "5%",
              width: "40%",
              borderRadius: "4px",
              padding: "5px",
              backgroundColor: "gray",
              border: "none",
              color: "white",
            }}
            onClick={() => editItemImage(product.itemId)}
          >
            Edit Image
          </button>
        </Card>
      </Col>
    );
  });

  return (
    <div>
      <Navbar />
      <Hoverbar />
      <hr></hr>

      <ShopHeader />

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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "10%",
            marginTop: "-3.5%",
          }}
        >
          <SearchFeature refreshFunction={updateSearchTerm} />
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

      {showProductsEditPage && (
        <EditItemImage
          setShowProductsEditPage={setShowProductsEditPage}
          products={products}
          itemId={productId}
        />
      )}

      {showShowImageEditPage && (
        <EditShopImage showShowImageEditPage={setShowShowImageEditPage} />
      )}
    </div>
  );
}

export default shopHome;
