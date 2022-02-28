import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import Axios from "axios";
import Home from "./Home";
import Register from "./register";

function Signin({ setshowSignIn }) {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const showHomePage = () => {
    setshowSignIn(false);
  };

  const handleRegister = () => {
    Navigate("/register");
  };
  const addUser = () => {
    console.log("Hello");
    Axios.post("http://localhost:4000/signup", {
      email: email,
      username: username,
      password: password,
    }).then(() => {
      navigate("/home");
      console.log("Success");
    });
  };

  return (
    <>
      <div className="bg-modal">
        <div className="modal-content">
          <div className="signin_close">
            <p onClick={showHomePage}>X</p>
          </div>
          <div className="signin_heading">
            <h4>Sign in</h4>
            <button
              onClick={handleRegister}
              className="register-btn btn-primary"
            >
              Register
            </button>
          </div>
          <form className="signin_form" action="/home">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <br />
              <input
                type="email"
                className="email"
                id="email"
                placeholder="Enter email"
                required
              />
            </div>

            <div className="htmlForm-group">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                className="password"
                id="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="forgot_password">
              <p className="password_forgot">Forgot your password?</p>
            </div>
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signin;
