import "./App.css";
import React, { Component } from "react";

// import { useState, useEffect } from "react";
import Home from "./components/Home";
import Signin from "./components/Signin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/register";

// import Axios from "axios";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home authorized={false} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
