import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Register from "./register";
import CloseLogin from "./closeLogin";

function Signin({ setshowSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showRegister, setShowRegister] = useState(false);

  const handleRegister = () => {
    setShowRegister(true);
  };

  const checkUser = (e) => {
    // e.preventDefault();
    Axios.post("http://localhost:4000/signin", {
      email: email,
      password: password,
    })
      .then(() => {
        console.log("Success");
      })
      .catch(console.log("Hello"));
  };

  return (
    <>
      <div className="bg-modal">
        <div className="modal-content">
          <CloseLogin setshowSignIn={setshowSignIn} />

          <div className="signin_heading">
            <h4>Sign in</h4>
            <button
              onClick={handleRegister}
              className="register-btn btn-primary"
            >
              Register
            </button>
          </div>
          <form className="signin_form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <br />
              <input
                type="email"
                className="email"
                id="email"
                placeholder="Enter email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
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
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
            </div>
            <div className="forgot_password">
              <p className="password_forgot">Forgot your password?</p>
            </div>
            <button
              onClick={checkUser}
              type="submit"
              className="btn btn-primary"
            >
              Sign In
            </button>
          </form>
        </div>
        {showRegister === true && (
          <Register setShowRegister={setShowRegister} />
        )}
      </div>
    </>
  );
}

export default Signin;
