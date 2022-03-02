import React, { useState } from "react";
import Axios from "axios";

function error() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [authFlag, setAuthFlag] = useState("");
  //   const [showRegister, setShowRegister] = useState(false);

  //   const handleRegister = () => {
  //     setShowRegister(true);
  //   };

  const checkUser = (e) => {
    // e.preventDefault();
    Axios.post("http://localhost:4000/signin", {
      email: email,
      password: password,
    }).then((response) => {
      console.log("Response: " + response.status);
      if (response.status !== 200) {
        e.preventDefault();
      }
    });
  };

  return (
    <div>
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
        <button onClick={checkUser} type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default error;
