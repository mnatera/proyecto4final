import { Component } from "react";
import React from "react";

class Buscador_Boton extends Component {
  render() {
    return (
      <div className="contenedor-botones">
        <div className="contenedor-left"></div>

        <div className="contenedor-right">
          <label className="icono">
            <i className="fa fa-arrow-to-top"></i>
          </label>
          <label className="Agregar">
            <span>Agregar contactos</span>
          </label>
          <label className="Exportar">Exportar contactos</label>
        </div>
      </div>
    );
  }
}

export default Buscador_Boton;
