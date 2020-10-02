import React, { Component } from "react";
import LearnCards from "./learn-cards.component";

class Learn extends Component {
  render() {
    return (
      <>
        <div>
          <span className="center-item" style={{ fontSize: "1.5em" }}>
            Let's get started with our learning today!
          </span>
        </div>
        <div style={{ marginTop: "2em" }}>

            <LearnCards />

        </div>
      </>
    );
  }
}

export default Learn;
