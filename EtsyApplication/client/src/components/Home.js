import React from "react";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";
import Dashboard from "./Dashboard";
import { UserContext } from "../Helper/Context";

const Home = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
      <Navbar />
      <Hoverbar />
      <Dashboard />
    </div>
  );
};

export default Home;
