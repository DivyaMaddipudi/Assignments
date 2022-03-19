import React from "react";
import cookie from "react-cookies";

function Dashboard() {
  return (
    <div>
      <div className="dash_board">
        <h1 className="title">Welcome to Etsy, {cookie.load("user")}!</h1>
        <div className="dashboard_items">
          <div className="dashboard_item">
            <img
              src="https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="home"
            ></img>
            <h3 style={{ fontSize: "20px" }}>Home Decor</h3>
          </div>
          <div className="dashboard_item">
            <img
              src="https://images.pexels.com/photos/827518/pexels-photo-827518.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="home"
            ></img>
            <h3 style={{ fontSize: "20px", marginLeft: "-10%" }}>
              Outdoor & Garden
            </h3>
          </div>
          <div className="dashboard_item">
            <img
              src="https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="home"
            ></img>
            <h3 style={{ fontSize: "20px", marginLeft: "-10%" }}>
              Kitchen & Dining
            </h3>
          </div>
          <div className="dashboard_item">
            <img
              src="https://images.pexels.com/photos/994515/pexels-photo-994515.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="home"
            ></img>
            <h3 style={{ fontSize: "20px", marginLeft: "10%" }}>Necklaces</h3>
          </div>
          <div className="dashboard_item">
            <img
              src="https://images.pexels.com/photos/1410226/pexels-photo-1410226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="home"
            ></img>
            <h3 style={{ fontSize: "20px", marginLeft: "-10%" }}>
              Wedding Decor
            </h3>
          </div>
          <div className="dashboard_item">
            <img
              src="https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="home"
            ></img>
            <h3 style={{ fontSize: "20px", marginLeft: "-15%" }}>
              On Sale & Discount
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
