import React, { Component } from "react";

import { ConsultarRPC } from "../Consulta";

import Header from "./Header";
import RegionPais from "./Region-Pais";

import Agregar from "./Agregar";
import Eliminar from "./Eliminar";
import Editar from "./Editar";

class Region extends Component {
  state = {
    RESULTADOREGION: "",
    ETIQUETA: "",
    ///////
    IDREGION: "",
    NOMBREREGION: "",
    ////////
    NOMBREPAIS: "",
    IDPAIS: "",
    ////
    NOMBRE: "",
    ID: "",
  };

  async UNSAFE_componentWillMount() {
    const BaseBody = { Posicion: "Region" };
    const Result = await ConsultarRPC(BaseBody);
    document.querySelector("main").style.marginTop = "50px";

    if (Result.estado === "Fallo") {
      this.setState({
        RESULTADOREGION: <h2>No Hay Regiones/Paises/Ciudades Guardadas</h2>,
      });
    } else {
      this.setState({
        RESULTADOREGION: (
          <ul id="myUL">
            {Result.msj.map((elemento) => {
              const { NombreRegion, ID } = elemento;
              return (
                <li key={ID}>
                  <button
                    numero={ID}
                    nombre={NombreRegion}
                    etiqueta="Pais"
                    id="Btn_Pais"
                    onClick={this.AgregarPais}
                    key={ID}
                  >
                    Agregar Pais
                  </button>

                  <RegionPais
                    //entrada
                    NOMBREREGION={NombreRegion}
                    IDREGIONMOSTRAR={ID}
                    //salida
                    BODYEdi={this.Editar}
                    BODYEli={this.Eliminar}
                    BODY={this.AgregarCiudad}
                  />
                </li>
              );
            })}
          </ul>
        ),
      });
    }
  }

  AgregarRegion = (e) => {
    e.preventDefault();
    this.setState({ ETIQUETA: e.target.attributes.etiqueta.value });
  };

  AgregarPais = (e) => {
    if (e === "") {
      this.setState({ NOMBREREGION: "", NombreAgregarCiudad: "" });
    } else {
      e.preventDefault();
      this.setState({
        IDREGION: e.target.attributes.numero.value,
        NOMBREREGION: e.target.attributes.nombre.value,
        ETIQUETA: e.target.attributes.etiqueta.value,
      });
    }
  };

  AgregarCiudad = (e) => {
    const { ETIQUETA, NOMBREPAIS, IDPAIS } = e;
    this.setState({
      ETIQUETA: ETIQUETA,
      NOMBREPAIS: NOMBREPAIS,
      IDPAIS: IDPAIS,
    });
  };

  Editar = (e) => {
    const { ETIQUETA, NOMBRE, ID } = e;
    this.setState({
      ETIQUETA: ETIQUETA,
      NOMBRE: NOMBRE,
      ID: ID,
    });
  };

  Eliminar = (e) => {
    const { ETIQUETA, NOMBRE, ID } = e;
    this.setState({
      ETIQUETA: ETIQUETA,
      NOMBRE: NOMBRE,
      ID: ID,
    });
  };

  AbrirYCerrar = (e) => {
    e === ""
      ? this.setState({ ETIQUETA: "", NOMBREPAIS: "" })
      : this.setState({
          ETIQUETA: e.ETIQUETA,
          NOMBREPAIS: e.NOMBREPAIS,
          IDPAIS: e.IDPAIS,
        });
  };

  Actualizar = () => {
    window.location.reload(false);
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <main>
          {this.state.ETIQUETA === "Region" && ( //Agregar Region
            <Agregar
              Etiqueta={this.state.ETIQUETA} //entrada
              Cerrar={this.AbrirYCerrar} //salida
              Actualizar={this.Actualizar}
            />
          )}

          {
            //Agregar Pais
            this.state.ETIQUETA === "Pais" && (
              <Agregar
                //entrada
                Etiqueta={this.state.ETIQUETA}
                Nombres={this.state.NOMBREREGION}
                IdRegion={this.state.IDREGION}
                //salida
                Cerrar={this.AbrirYCerrar}
                Actualizar={this.Actualizar}
              />
            )
          }

          {
            //Agregar Ciudad
            this.state.ETIQUETA === "Ciudad" && (
              <Agregar
                //entrada
                Etiqueta={this.state.ETIQUETA}
                Nombres={this.state.NOMBREPAIS}
                IdRegion={this.state.IDPAIS}
                //salida
                Cerrar={this.AbrirYCerrar}
                Actualizar={this.Actualizar}
              />
            )
          }

          {
            ///////eliminar
            this.state.ETIQUETA === "Eliminar Pais" && (
              <Eliminar
                //ENTRADA
                NOMBRE={this.state.NOMBRE}
                Etiqueta={this.state.ETIQUETA}
                ID={this.state.ID}
                //SALIDA
                AbrirYCerrar={this.AbrirYCerrar}
                Actualizar={this.Actualizar}
              />
            )
          }
          {this.state.ETIQUETA === "Eliminar Ciudad" && (
            <Eliminar
              //ENTRADA
              NOMBRE={this.state.NOMBRE}
              Etiqueta={this.state.ETIQUETA}
              ID={this.state.ID}
              //SALIDA
              AbrirYCerrar={this.AbrirYCerrar}
              Actualizar={this.Actualizar}
            />
          )}

          {
            ///editar
            this.state.ETIQUETA === "Editar Pais" && (
              <Editar
                //ENTRADA
                NOMBRE={this.state.NOMBRE}
                Etiqueta={this.state.ETIQUETA}
                ID={this.state.ID}
                //SALIDA
                AbrirYCerrar={this.AbrirYCerrar}
                Actualizar={this.Actualizar}
              />
            )
          }

          {this.state.ETIQUETA === "Editar Ciudad" && (
            <Editar
              //ENTRADA
              NOMBRE={this.state.NOMBRE}
              Etiqueta={this.state.ETIQUETA}
              ID={this.state.ID}
              //SALIDA
              AbrirYCerrar={this.AbrirYCerrar}
              Actualizar={this.Actualizar}
            />
          )}

          <section id="Region">
            <h1>Regiones / Paises / Ciudades</h1>
            <button
              id="Btn_Region"
              etiqueta="Region"
              onClick={this.AgregarRegion}
            >
              Agregar Region
            </button>

            {this.state.RESULTADOREGION}
          </section>
        </main>
      </React.Fragment>
    );
  }
}

export default Region;
