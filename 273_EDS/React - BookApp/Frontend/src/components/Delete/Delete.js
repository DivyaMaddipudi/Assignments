import Axios from "axios";
import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Delete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      error: "",
    };

    this.idChangeHandler = this.idChangeHandler.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  idChangeHandler = (e) => {
    this.setState({
      id: e.target.value,
    });
  };

  handleDelete = (e) => {
    const data = {
      id: this.state.id,
    };

    Axios.post("http://54.193.95.78:3001/delete", data)
      .then(() => {
        console.log("Success deleted");
      })
      .catch((err) => {
        this.setState({ error: "Book doesn't exist" });
      });
  };

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        {redirectVar}
        <div className="container">
          <span>{this.state.error}</span>
          <form>
            <span>{this.state.error}</span>
            <div style={{ width: "50%", float: "left" }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="BookID"
                placeholder="Search a Book by Book ID"
                onChange={this.idChangeHandler}
              />
            </div>
            <div style={{ width: "50%", float: "right" }}>
              <button
                onClick={this.handleDelete}
                className="btn btn-success"
                type="submit"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Delete;
