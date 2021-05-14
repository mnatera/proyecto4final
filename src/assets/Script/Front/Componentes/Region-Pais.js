import React, { Component } from "react";
import RegionPaisCiudad from "./Region-Pais-Ciudad"; 
import { ConsultarRPC } from "../Consulta"; 
class Region_Pais extends Component {
  state = {
    RESULTADOPAIS: "",
    NOMBREREGION: "",
  };

  async UNSAFE_componentWillMount() {
    this.setState({ NOMBREREGION: this.props.NOMBREREGION });
    const BaseBody = { Posicion: "Pais", IDRegion: this.props.IDREGIONMOSTRAR };
    const Result = await ConsultarRPC(BaseBody);
    if (Result.estado === "Fallo") {
      this.setState({ RESULTADOPAIS: "" });
    } else {
      this.setState({ RESULTADOPAIS: Result });
    }
  }

  Editar = (e) => {
    e.preventDefault();
    const Body = {
      ETIQUETA: e.target.attributes.etiqueta.value,
      NOMBRE: e.target.attributes.nombre.value,
      ID: e.target.attributes.numeropais.value,
    };
    this.props.BODYEdi(Body);
  };

  EditarCiudad = (e) => {
    const Body = {
      ETIQUETA: e.ETIQUETA,
      NOMBRE: e.NOMBRE,
      ID: e.ID,
    };
    this.props.BODYEdi(Body);
  };

  Eliminar = (e) => {
    e.preventDefault();
    const Body = {
      ETIQUETA: e.target.attributes.etiqueta.value,
      NOMBRE: e.target.attributes.nombre.value,
      ID: e.target.attributes.numeropais.value,
    };
    this.props.BODYEli(Body);
  };

  EliminarCiudad = (e) => {
    const Body = {
      ETIQUETA: e.ETIQUETA,
      NOMBRE: e.NOMBRE,
      ID: e.ID,
    };
    this.props.BODYEli(Body);
  };

  AgregarCiudad = (e) => {
    e.preventDefault();
    const Body = {
      ETIQUETA: e.target.attributes.etiqueta.value,
      NOMBREPAIS: e.target.attributes.nombre.value,
      IDPAIS: e.target.attributes.numeropais.value,
    };
    this.props.BODY(Body);
  };

  Contraer = (e) => {
    e.preventDefault();
    e.target.parentElement
      .querySelector(".nested")
      .classList.toggle("activado");
    e.target.classList.toggle("caret-down");
  };

  render() {
    const { msj } = this.state.RESULTADOPAIS;

    let vare =
      this.state.RESULTADOPAIS === "" ? (
        <span> {this.state.NOMBREREGION}</span>
      ) : (
        <React.Fragment>
          <span className="caret" onClick={this.Contraer}>
            {" "}
            {this.state.NOMBREREGION}
          </span>

          <ul className="nested">
            {msj !== undefined &&
              msj.map((elemento) => {
                const { NombrePais, ID } = elemento;
                return (
                  <li key={ID}>
                    <div key={ID} className="contenedor_Botones">
                      <button
                        nombre={NombrePais}
                        numeropais={ID}
                        etiqueta="Editar Pais"
                        onClick={this.Eliminar}
                      >
                        Editar Pais
                      </button>
                      <button
                        nombre={NombrePais}
                        numeropais={ID}
                        etiqueta="Eliminar Pais"
                        onClick={this.Editar}
                      >
                        Eliminar Pais
                      </button>
                      <button
                        nombre={NombrePais}
                        numeropais={ID}
                        etiqueta="Ciudad"
                        onClick={this.AgregarCiudad}
                      >
                        Agregar Ciudad
                      </button>
                    </div>

                    <RegionPaisCiudad
                      nombrepais={NombrePais} /////////
                      //entrada
                      NumeroPais={ID}
                      //salida
                      BODYEdiCi={this.EditarCiudad}
                      BODYEliCi={this.EliminarCiudad}
                    />
                  </li>
                );
              })}
          </ul>
        </React.Fragment>
      );

    return vare;
  }
}

export default Region_Pais;

