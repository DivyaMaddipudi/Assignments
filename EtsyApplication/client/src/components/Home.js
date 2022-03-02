import React from "react";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";
import Dashboard from "./Dashboard";

const Home = ({ authorized }) => {
  return (
    <div>
      <Navbar />
      <Hoverbar />
      <Dashboard />
    </div>
  );
};

export default Home;
