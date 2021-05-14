import { Component } from "react";
import React from "react";
import "../../../style/Style.css";
import Menu from "./Menu";

class Header extends Component {

  render() {
    return (
      <header>
        <nav className="container-Header">
          <div className="Lcolum-6">
            <a href="../../../../index.html"><span>LOGO</span></a>
          </div>
          <Menu />  
        </nav>
      </header>
    );
  }
}

export default Header;
