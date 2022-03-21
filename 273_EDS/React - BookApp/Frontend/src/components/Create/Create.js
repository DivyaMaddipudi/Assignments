import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BookID: "",
      Title: "",
      Author: "",
      error: "",
    };

    this.idChnageHandler = this.idChnageHandler.bind(this);
    this.booknameChnageHandler = this.booknameChnageHandler.bind(this);
    this.authornameChnageHandler = this.authornameChnageHandler.bind(this);
    this.handleCreateBook = this.handleCreateBook.bind(this);
  }

  idChnageHandler = (e) => {
    this.setState({
      BookID: e.target.value,
    });
  };

  booknameChnageHandler = (e) => {
    this.setState({
      Title: e.target.value,
    });
  };

  authornameChnageHandler = (e) => {
    this.setState({
      Author: e.target.value,
    });
  };

  handleCreateBook = () => {
    console.log("Hello ================ Inside handle create");
    axios.post("http://localhost:3001/create", {
      BookID: this.state.BookID,
      Title: this.state.Title,
      Author: this.state.Author,
    });
  };

  render() {
    // let redirectVar = null;
    // if (cookie.load("cookie")) {
    //   redirectVar = <Redirect to="/create" />;
    // }
    return (
      <div>
        <br />
        <div className="container">
          {/* {redirectVar} */}
          <span>{this.state.error}</span>

          <form>
            <div style={{ width: "30%" }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="BookID"
                placeholder="Book ID"
                onChange={this.idChnageHandler}
              />
            </div>
            <br />
            <div style={{ width: "30%" }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="Title"
                placeholder="Book Title"
                onChange={this.booknameChnageHandler}
              />
            </div>
            <br />
            <div style={{ width: "30%" }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="Author"
                placeholder="Book Author"
                onChange={this.authornameChnageHandler}
              />
            </div>
            <br />
            <div style={{ width: "30%" }}>
              <button
                onClick={this.handleCreateBook}
                className="btn btn-success"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Create;
