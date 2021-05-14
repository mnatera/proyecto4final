import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ConsultarRPC, EmpresaCRUD } from "../../Front/Consulta";

class Agregar_Compa extends Component {
  state = {
    VALIDAR: "",
    RESULTADOREGION: "",
    RESULTADOPAIS: "",
    RESULTADOCIUDAD: "",
    EDITAR: "",
    MOSTRAR: "",
    ID: "",
  };

  async componentWillMount() {
    if (this.props.Editar.msj === undefined) {
      this.setState({ MOSTRAR: "Agregar Nueva Compañia" });
    } else {
      this.setState({ MOSTRAR: "Editar Una Compañia" });
    }

    this.setState({ VALIDAR: this.props.Valida });
    const BaseBody = { Posicion: "Region" };
    const Result = await ConsultarRPC(BaseBody);
    Result.estado === "Fallo"
      ? this.setState({ RESULTADOREGION: "" })
      : this.setState({ RESULTADOREGION: Result });
  }

  componentDidMount() {
    if (this.props.Editar.msj === undefined) {
      this.setState({ EDITAR: "" });
      document.getElementsByName("Nombre")[0].textContent = "";
      document.getElementsByName("Direccion")[0].textContent = "";
      document.getElementsByName("Email")[0].textContent = "";
      document.getElementsByName("Telefono")[0].textContent = "";
    } else {
      this.setState({ EDITAR: this.props.Editar });
      const { ID, NombreEmpresa, Direccion, Email, Telefono } =
        this.props.Editar.msj[0];
      this.setState({ ID: ID });
      document.getElementsByName("Nombre")[0].value = NombreEmpresa;
      document.getElementsByName("Direccion")[0].value = Direccion;
      document.getElementsByName("Email")[0].value = Email;
      document.getElementsByName("Telefono")[0].value = Telefono;
    }
  }

  RecibirFormulario = async (e) => {
    e.preventDefault();

    switch (e.target[7].value) {
      case "Modificar":
        if (
          document.getElementsByName("Nombre")[0].value !== "" &&
          document.getElementsByName("Direccion")[0].value !== "" &&
          document.getElementsByName("Email")[0].value !== "" &&
          document.getElementsByName("Telefono")[0].value !== "" &&
          document.getElementById("Region").value !== "0" &&
          document.getElementById("Pais").value !== "0" &&
          document.getElementById("Ciudad").value !== "0"
        ) {
          const BaseBody = {
            Posicion: "EditarEmpresa",
            ID: this.state.ID,
            NombreEmpresa: e.target[0].value,
            Direccion: e.target[1].value,
            Email: e.target[2].value,
            Telefono: e.target[3].value,
            ID_Region: e.target[4].selectedOptions[0].id,
            ID_Pais: e.target[5].selectedOptions[0].id,
            ID_Ciudad: e.target[6].selectedOptions[0].id,
          };
          const Result = await EmpresaCRUD(BaseBody);
          if (Result.estado === "Fallo") {
            console.log("no se edito");
          } else {
            this.setState({ ID: "" });
            this.props.Cerrar("");
            this.props.Actualizar();
          }
        } else {
          console.log("hay campos vacios");
        }

        break;

      case "Ingresar":
        const BaseBody = {
          Posicion: "GuardarEmpresa",
          NombreEmpresa: e.target[0].value,
          Direccion: e.target[1].value,
          Email: e.target[2].value,
          Telefono: e.target[3].value,
          ID_Region: e.target[4].selectedOptions[0].id,
          ID_Pais: e.target[5].selectedOptions[0].id,
          ID_Ciudad: e.target[6].selectedOptions[0].id,
        };

        const Result = await EmpresaCRUD(BaseBody);
        if (Result.estado === "Fallo") {
          console.log("no se guardo");
        } else {
          this.props.Cerrar("");
          this.props.Actualizar();
        }

        break;

      default:
        break;
    }
  };

  cierre = (e) => {
    e.preventDefault();
    this.props.Cerrar("");
  };

  SelectRegion = async (e) => {
    e.preventDefault();

    const BaseBody = { Posicion: "Pais", IDRegion: e.target.selectedIndex };
    const Result = await ConsultarRPC(BaseBody);

    if (
      Result.estado === "Fallo" ||
      e.target.value === "Seleccione Una Region"
    ) {
      document.querySelector("#Pais").disabled = true;
      document.querySelector("#Ciudad").disabled = true;

      this.setState({ RESULTADOPAIS: "" });
    } else {
      document.querySelector("#Pais").disabled = false;
      document.querySelector("#Ciudad").disabled = true;
      this.setState({ RESULTADOPAIS: Result });
    }
  };

  SelectPais = async (e) => {
    const BaseBody = {
      Posicion: "Ciudad",
      IDPais: e.target.selectedOptions[0].id,
    };

    const Result = await ConsultarRPC(BaseBody);

    if (
      Result.estado === "Fallo" ||
      e.target.value === "Seleccione Una Ciudad"
    ) {
      document.querySelector("#Ciudad").disabled = true;
      this.setState({ RESULTADOCIUDAD: "" });
    } else {
      document.querySelector("#Ciudad").disabled = false;
      this.setState({ RESULTADOCIUDAD: Result });
    }
  };

  render() {
    const element = <FontAwesomeIcon icon={faTimes} />;

    let vare =
      this.state.VALIDAR === "Fallo" ? (
        <div className="Contenedor_Agregar">
          <div className="Ventana_Agregar">
            <a href="!#">
              <i className="" onClick={this.cierre}>
                {element}
              </i>
            </a>
            <h1>
              No Tienes Ciudades Guardadas Para Completar El Registro De
              Compañia
            </h1>
          </div>
        </div>
      ) : (
        <div className="Contenedor_Agregar">
          <div className="Ventana_Agregar">
            <a href="!#">
              <i className="" onClick={this.cierre}>
                {element}
              </i>
            </a>
            <h1>{this.state.MOSTRAR}</h1>
            <form
              className="Crear_Compa_formulario"
              onSubmit={this.RecibirFormulario}
            >
              <div>
                <div className="Colum-3">
                  <label className="grupo_formulario">Nombre: </label>
                </div>
                <div className="Colum-3">
                  <input
                    className="TxtGuardar"
                    type="text"
                    name="Nombre"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <div className="Colum-3">
                  <label className="grupo_formulario">Direccion: </label>
                </div>
                <div className="Colum-3">
                  <input
                    className="TxtGuardar"
                    type="text"
                    name="Direccion"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <div className="Colum-3">
                  <label className="grupo_formulario">Email: </label>
                </div>
                <div className="Colum-3">
                  <input
                    className="TxtGuardar"
                    type="text"
                    name="Email"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <div className="Colum-3">
                  <label className="grupo_formulario">Telefono: </label>
                </div>
                <div className="Colum-3">
                  <input
                    className="TxtGuardar"
                    type="text"
                    name="Telefono"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <div className="Colum-3">
                  <label className="grupo_formulario">Region</label>
                </div>

                <div>
                  <select
                    id="Region"
                    defaultValue="0"
                    onChange={this.SelectRegion}
                  >
                    <option value="0" disabled>
                      Seleccione Una Region
                    </option>
                    {this.state.RESULTADOREGION !== "" &&
                      this.state.RESULTADOREGION.msj.map((elemento) => {
                        const { NombreRegion, ID } = elemento;
                        return (
                          <option key={ID} id={ID} value={ID}>
                            {NombreRegion}{" "}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div>
                  <select
                    id="Pais"
                    defaultValue="0"
                    disabled={true}
                    onChange={this.SelectPais}
                  >
                    <option value="0" disabled>
                      Seleccione Una Pais
                    </option>

                    {this.state.RESULTADOPAIS.msj !== undefined &&
                      this.state.RESULTADOPAIS.msj.map((elemento) => {
                        const { NombrePais, ID } = elemento;
                        return (
                          <option key={ID} id={ID} value={ID}>
                            {NombrePais}{" "}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div>
                  <select id="Ciudad" defaultValue="0" disabled={true}>
                    <option value="0">Seleccione Una Ciudad</option>

                    {this.state.RESULTADOCIUDAD.msj !== undefined &&
                      this.state.RESULTADOCIUDAD.msj.map((elemento) => {
                        const { NombreCiudad, ID } = elemento;
                        return (
                          <option key={ID} id={ID} value={ID}>
                            {NombreCiudad}{" "}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div>
                {this.state.MOSTRAR === "Agregar Nueva Compañia" ? (
                  <input
                    className="BtnGuardar"
                    type="submit"
                    value="Ingresar"
                  />
                ) : (
                  <input
                    className="BtnModificar"
                    type="submit"
                    value="Modificar"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      );

    return vare;
  }
}

export default Agregar_Compa;
