import React, { Component } from "react";

import { ConsultarRPC } from "../Consulta";

class Region_Pais_Ciudad extends Component {
  state = {
    CIUDAD: "",
    NOMBREPAIS: "",
  };

  async UNSAFE_componentWillMount() {
    this.setState({ NOMBREPAIS: this.props.nombrepais });
    const BaseBody = { Posicion: "Ciudad", IDPais: this.props.NumeroPais };
    const Result = await ConsultarRPC(BaseBody);
    this.setState({ CIUDAD: Result });
  }

  Eliminar = (e) => {
    e.preventDefault();
    const Body = {
      ETIQUETA: e.target.attributes.etiqueta.value,
      NOMBRE: e.target.attributes.nombre.value,
      ID: e.target.attributes.numerociudad.value,
    };
    this.props.BODYEliCi(Body);
  };

  Editar = (e) => {
    e.preventDefault();
    const Body = {
      ETIQUETA: e.target.attributes.etiqueta.value,
      NOMBRE: e.target.attributes.nombre.value,
      ID: e.target.attributes.numerociudad.value,
    };
    this.props.BODYEdiCi(Body);
  };

  Contraer = (e) => {
    e.preventDefault();
    e.target.parentElement
      .querySelector(".nested")
      .classList.toggle("activado");
    e.target.classList.toggle("caret-down");
  };

  render() {
    const { estado, msj } = this.state.CIUDAD;
    let vare =
      estado === "Correcto" ? (
        <React.Fragment>
          <span className="caret" onClick={this.Contraer}>
            {" "}
            {this.state.NOMBREPAIS}
          </span>
          <ul className="nested">
            {msj.map((elemento) => {
              const { NombreCiudad, ID } = elemento;
              return (
                <li key={ID}>
                  <div key={ID} className="contenedor_Botones">
                    <button
                      nombre={NombreCiudad}
                      etiqueta="Editar Ciudad"
                      onClick={this.Editar}
                      numerociudad={ID}
                    >
                      Editar Ciudad
                    </button>
                    <button
                      nombre={NombreCiudad}
                      etiqueta="Eliminar Ciudad"
                      onClick={this.Eliminar}
                      numerociudad={ID}
                    >
                      Eliminar Ciudad
                    </button>
                  </div>
                  {NombreCiudad}
                </li>
              );
            })}
          </ul>
        </React.Fragment>
      ) : (
        <span> {this.state.NOMBREPAIS}</span>
      );

    return vare;
  }
}
export default Region_Pais_Ciudad;
