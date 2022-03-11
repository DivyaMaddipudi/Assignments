import React from "react";

function cardUL() {
  return (
    <div className="card text-center">
      <div className="overflow">
        <img src={require("../../Images/" + product.itemImage)} alt="item" />
      </div>
      <div className="card-body text-dark">
        <h4 className="card-title">Card Title</h4>
        <p className="card-text text-secondary">hello</p>
        <button
          style={{
            width: "25%",
            borderRadius: "4px",
            backgroundColor: "gray",
            border: "none",
            color: "white",
          }}
          className="btn"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default cardUL;
