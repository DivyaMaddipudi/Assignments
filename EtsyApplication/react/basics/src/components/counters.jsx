import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    return (
      <div>
        <button
          onClick={this.props.onReset}
          className="btn btn-primary btn-sm m-2"
        >
          Reset
        </button>
        {this.state.counters.map((counter) => (
          <Counter
            onDelete={this.props.onDelete}
            onIncrement={this.props.onIncrement}
            key={counter.id}
            counter={this.props.counters}
          ></Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
