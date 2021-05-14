import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const { DescodificarToken } = require("../../Back/Dependencias/Seguridad");

class Menu extends Component {
  state = {
    mostrar: true,
  };

  UNSAFE_componentWillMount() {
    const JWT = JSON.parse(localStorage.getItem("key"));
    const datos = DescodificarToken(JWT);

    if (datos.Perfil !== "1") {
      this.setState({
        mostrar: false,
      });
    }
  }

  render() {
    return (
      <div className="Mcolum-6">
        <ul>
          <li>
            <NavLink to="/Region" activeClassName="active">
              Region/Ciudad
            </NavLink>
          </li>
          {this.state.mostrar ? (
            <li>
              <NavLink to="/Usuario" activeClassName="active">
                Usuarios
              </NavLink>
            </li>
          ) : (
            ""
          )}

          <li>
            <NavLink to="/Compa" activeClassName="active">
              Compañia
            </NavLink>
          </li>
          <li>
            <NavLink to="/Contactos" activeClassName="active">
              Contactos
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default Menu;
