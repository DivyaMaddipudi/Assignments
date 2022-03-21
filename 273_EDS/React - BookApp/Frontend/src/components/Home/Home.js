import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
    };
  }
  //get the books data from backend
  componentDidMount() {
    axios.get("http://54.193.95.78:3001/home").then((response) => {
      //update the state with the response data
      console.log(response.data);
      this.setState({
        books: this.state.books.concat(response.data),
      });
    });
  }

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    //iterate over books to create a table row

    let details = this.state.books.map((book) => {
      return (
        <tr>
          <td>{book.BookID}</td>
          <td>{book.Title}</td>
          <td>{book.Author}</td>
        </tr>
      );
    });
    //if not logged in go to login page

    return (
      <div>
        <div className="container">
          {redirectVar}

          <h2>List of All Books</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Title</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {/*Display the Tbale row based on data recieved*/}
              {details}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
//export Home Component
export default Home;
