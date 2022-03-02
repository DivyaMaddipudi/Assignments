import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";

//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
    cookie.remove("cookie", { path: "/" });
  };
  render() {
    //if Cookie is set render Logout Button
    let navLogin = null;
    if (cookie.load("cookie")) {
      console.log("Able to read cookie");
      navLogin = (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/login" onClick={this.handleLogout}>
              <span className="glyphicon glyphicon-user"></span>Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      //Else display login button
      console.log("Not Able to read cookie");
      navLogin = (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/login">
              <span className="glyphicon glyphicon-log-in"></span> Login
            </Link>
          </li>
        </ul>
      );
    }

    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand">Book Store App</a>
            </div>
            <ul className="nav navbar-nav">
              <li className="active">
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/create">Add a Book</Link>
              </li>
              <li>
                <Link to="/delete">Delete a Book</Link>
              </li>
            </ul>
            {navLogin}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
