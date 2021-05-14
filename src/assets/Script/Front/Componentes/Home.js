import React, { Component } from "react";
import Header from "./Header";

class Home extends Component {
 
  render() {
    return (
      <React.Fragment>
        <Header />
        <main>
          <h1>Bienvenido</h1>
        </main>
      </React.Fragment>
    );
  }
}

export default Home;
