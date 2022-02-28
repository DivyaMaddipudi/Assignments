import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
// import Axios from "axios";
import Counters from "./components/counters";
import NavBar from "./components/navbar";
import React, { Component, state } from "react";
import { render } from "react-dom";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };

  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id != counterId);
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };
  render() {
    return (
      <>
        <NavBar />
        <main className="container">
          <Counters
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDelete={this.onDelete}
            counters={this.state.counters}
          />
        </main>
      </>
    );
  }
}

export default App;
