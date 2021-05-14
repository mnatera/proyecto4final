import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPen,
  faTrash,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

import Canal from "./Canal-Contacto";
import {
  ConsultarRPC,
  EmpresaCRUD,
  BuscarUnContacto,
  ActualizarEliminarCanal,
  BuscarContactosCanalTodos,
  EliminarUnContacto,
  EditarContacto,
} from "../../Front/Consulta";

let ControlEditarcontacto = true;

const OptContacto = [
  <option key={0} value={0} disabled>
    Seleccione Un Canal
  </option>,
  <option key={1} value={1}>
    Teléfono
  </option>,
  <option key={2} value={2}>
    Whatsapp
  </option>,
  <option key={3} value={3}>
    Instagram
  </option>,
  <option key={4} value={4}>
    Facebook
  </option>,
  <option key={5} value={5}>
    Linkedin
  </option>,
];

const OptPreferencia = [
  <option key={0} value={0} disabled>
    Seleccione Una Preferencia
  </option>,
  <option key={1} value={1}>
    Sin preferencia
  </option>,
  <option key={2} value={2}>
    Canal favorito
  </option>,
  <option key={3} value={3}>
    No molestar
  </option>,
];

class Contactos extends Component {
  state = {
    VECTOR: [],
    ACTUALIZAR: false,
    CONTROLEDITAR: true,
    NombreFoto: "",
    datos: "",
    MostrarActualizar: "",

    RESULTADOREGION: "",
    RESULTADOPAIS: "",
    RESULTADOCIUDAD: "",
    RESULTADOEMPRESA: "",
  };

  async EliminarCanal(e) {
    e.preventDefault();

    let PosicionFilaFormulario = "";

    switch (e.target.tagName) {
      case "BUTTON":
        PosicionFilaFormulario = e.target.parentElement.parentElement;

        break;

      case "svg":
        PosicionFilaFormulario =
          e.target.parentElement.parentElement.parentElement;

        break;

      case "path":
        PosicionFilaFormulario =
          e.target.parentElement.parentElement.parentElement.parentElement;

        break;

      default:
        break;
    }

    let IDContacto = PosicionFilaFormulario.attributes[2].value;
    if (ControlEditarcontacto) {
      let Base = {
        Tipo: "Eliminar",
        ID_Canal: IDContacto,
      };

      let resultado = await ActualizarEliminarCanal(Base);

      if (resultado.estado === "Correcto") {
        const nodo = PosicionFilaFormulario;
        nodo.parentNode.removeChild(nodo);
      } else {
        console.log("no se puedo eliminar intente de nuevo");
      }
    } else {
      console.log("Primero tiene que guardar el cambio");
    }
  }

  async EditarCanal(e) {
    e.preventDefault();

    let PosicionFilaFormulario = "";
    let Etiqueta = "";
    switch (e.target.tagName) {
      case "BUTTON":
        PosicionFilaFormulario = e.target.parentElement.parentElement;
        Etiqueta = e.target.textContent;
        break;

      case "svg":
        PosicionFilaFormulario =
          e.target.parentElement.parentElement.parentElement;
        Etiqueta = e.target.parentElement.textContent;
        break;

      case "path":
        PosicionFilaFormulario =
          e.target.parentElement.parentElement.parentElement.parentElement;
        Etiqueta = e.target.parentElement.parentElement.textContent;
        break;

      default:
        break;
    }
    let IDContacto = PosicionFilaFormulario.attributes[1].value;
    let IDCanal = PosicionFilaFormulario.attributes[2].value;

    if (Etiqueta === "Editar Canal") {
      if (ControlEditarcontacto) {
        ControlEditarcontacto = false;
        PosicionFilaFormulario.children[0].children[0].disabled = false;
        PosicionFilaFormulario.children[1].children[0].disabled = false;
        PosicionFilaFormulario.children[2].children[0].disabled = false;
        PosicionFilaFormulario.children[3].children[0].style.display = "none";
        PosicionFilaFormulario.children[3].children[1].style.display =
          "initial";
        PosicionFilaFormulario.children[4].children[0].style.display = "none";
      } else {
        console.log("tienes que guardar primero el cambio");
      }
    } else {
      let CanalNuevo = PosicionFilaFormulario.children[0].children[0].value;
      let CuentaNueva = PosicionFilaFormulario.children[1].children[0].value;
      let PreferenciaNueva =
        PosicionFilaFormulario.children[2].children[0].value;

      let Base = {
        Tipo: "Actualizar",
        ID_Contacto: IDContacto,
        ID_Canal: IDCanal,
        ID_Canal_Nuevo: CanalNuevo,
        Cuenta: CuentaNueva,
        Preferencia: PreferenciaNueva,
      };

      await ActualizarEliminarCanal(Base);

      ControlEditarcontacto = true;
      PosicionFilaFormulario.children[0].children[0].disabled = true;
      PosicionFilaFormulario.children[1].children[0].disabled = true;
      PosicionFilaFormulario.children[2].children[0].disabled = true;
      PosicionFilaFormulario.children[3].children[0].style.display = "initial";
      PosicionFilaFormulario.children[3].children[1].style.display = "none";
      PosicionFilaFormulario.children[4].children[0].style.display = "initial";
    }
  }

  async componentDidMount() {
    let BaseBody = {
      ID_Contacto: this.props.ID,
    };

    if (this.props.ID !== "Agregar") {
      const ResultadoBuscar = await BuscarUnContacto(BaseBody);

      let Ruta = ResultadoBuscar.msj[0];

      document.querySelector(".TxtNombre").value = Ruta.NombreContacto;
      document.querySelector(".TxtApellido").value = Ruta.ApellidoContacto;
      document.querySelector(".TxtCargo").value = Ruta.Cargo;
      document.querySelector(".TxtEmail").value = Ruta.Email;
      document.querySelector("#Empresa").value = Ruta.ID_Empresa;
      document.querySelector(".TxtDireccion").value = Ruta.Direccion;
      document.querySelector("#Interes").value = Ruta.Interes;

      const ResultadoCanal = await BuscarContactosCanalTodos(BaseBody);

      if (ResultadoBuscar.estado === "Correcto") {
        let cantidadCanal = ResultadoCanal.msj;

        if (ResultadoCanal.estado === "Correcto") {
          this.setState({
            MostrarActualizar: (
              <React.Fragment>
                <div className="Contenedor">
                  <ul className="ContenedorUL">
                    {cantidadCanal.map((element, index) => {
                      const pen = <FontAwesomeIcon icon={faPen} />;
                      const trash = <FontAwesomeIcon icon={faTrash} />;
                      const save = <FontAwesomeIcon icon={faSave} />;
                      return (
                        <li
                          className="Guardado_Canal_Formulario"
                          key={element.ID}
                          idcontacto={element.ID_Contacto}
                          idcanal={element.ID}
                        >
                          <div className="Guardado_Canalcontacto">
                            <select
                              className="TxtCanalcontactoGuardado"
                              defaultValue={element.Canal}
                              disabled={true}
                            >
                              {OptContacto}
                            </select>
                          </div>

                          <div className="Guardado_CuentaUsuario">
                            <input
                              className="TxtCuentaUsuarioGuardado"
                              autoComplete="off"
                              type="text"
                              placeholder="@ejemplo"
                              defaultValue={element.Cuenta}
                              disabled={true}
                            />
                          </div>

                          <div className="Guardado_Preferencias">
                            <select
                              className="TxtPreferenciasGuardado"
                              defaultValue={element.Preferencia}
                              disabled={true}
                            >
                              {OptPreferencia}
                            </select>
                          </div>

                          <div className="Boton">
                            <button
                              // id="BtnEditar"
                              className="BtnEditar"
                              onClick={this.EditarCanal}
                              type="submit"
                            >
                              {pen}Editar Canal
                            </button>

                            <button
                              // id="BtnGuardarC"
                              className="BtnGuardarC"
                              onClick={this.EditarCanal}
                              type="submit"
                            >
                              {save}Guardar Cambios
                            </button>
                          </div>

                          <div className="Boton">
                            <button
                              //  id="BtnEliminar"
                              className="BtnEliminar"
                              onClick={this.EliminarCanal}
                              type="submit"
                            >
                              {trash}Eliminar Canal
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <input
                    className="BtnGuardar"
                    type="submit"
                    value="Guardar Contacto"
                    onClick={this.GuardarContacto}
                    idcontacto={this.props.ID}
                  />

                  <input
                    className="BtnEliminar"
                    type="submit"
                    value="Eliminar Contacto"
                    onClick={this.Eliminar}
                    idcontacto={this.props.ID}
                  />
                </div>
              </React.Fragment>
            ),
          });
        } else {
          console.log("no tiene canales registrados");

          this.setState({
            MostrarActualizar: (
              <div>
                <input
                  className="BtnGuardar"
                  type="submit"
                  value="Guardar Contacto"
                  onClick={this.GuardarContacto}
                  idcontacto={this.props.ID}
                />

                <input
                  className="BtnEliminar"
                  type="submit"
                  value="Eliminar Contacto"
                  onClick={this.Eliminar}
                  idcontacto={this.props.ID}
                />
              </div>
            ),
          });
        }

        let valorRTegion = Ruta.ID_Region;
        const BaseBody = { Posicion: "Region" };
        const Result = await ConsultarRPC(BaseBody);

        this.setState({
          RESULTADOREGION: (
            <select
              id="Region"
              defaultValue={valorRTegion}
              onChange={this.SelectRegion}
            >
              <option value="0" disabled>
                Seleccione Una Region{" "}
              </option>

              {Result.msj.map((elemento) => {
                const { NombreRegion, ID } = elemento;

                if (ID === valorRTegion) {
                  return (
                    <option key={ID} id={ID} value={ID}>
                      {NombreRegion}
                    </option>
                  );
                } else {
                  return (
                    <option key={ID} id={ID} value={ID}>
                      {NombreRegion}
                    </option>
                  );
                }
              })}
            </select>
          ),
        });

        this.SelectRegion(valorRTegion.toString());

        let valor = {
          Pais: Ruta.ID_Pais,
          Ciudad: Ruta.ID_Ciudad,
        };

        this.SelectPais(valor);
      } else {
        console.log("no se encontro datos de este usuario");
      }
    } else {
      const BaseBody = { Posicion: "Region" };
      const Result = await ConsultarRPC(BaseBody);

      this.setState({
        RESULTADOREGION: (
          <select id="Region" defaultValue="0" onChange={this.SelectRegion}>
            <option value="0" disabled>
              Seleccione Una Region{" "}
            </option>

            {Result.msj.map((elemento) => {
              const { NombreRegion, ID } = elemento;
              return (
                <option key={ID} id={ID} value={ID}>
                  {NombreRegion}
                </option>
              );
            })}
          </select>
        ),
      });

      this.setState({
        RESULTADOPAIS: (
          <select id="Pais" defaultValue="0" onChange={this.SelectPais}>
            <option value="0" disabled>
              Seleccione Un Pais
            </option>
          </select>
        ),
      });

      this.setState({
        RESULTADOCIUDAD: (
          <select id="Ciudad" defaultValue="0">
            <option value="0" disabled>
              Seleccione Una Ciudad
            </option>
          </select>
        ),
      });
    }
  }

  async Eliminar(e) {
    const IDEliminar = e.target.attributes[2].value;
    const base = {
      ID: IDEliminar,
    };
    await EliminarUnContacto(base);
  }




  async GuardarContacto(e) {
    e.preventDefault();

    const Ruta = e.target.form;

    let BaseBody = {
      ID: parseInt(e.target.attributes[2].value),
      NombreContacto: Ruta[0].value,
      ApellidoContacto: Ruta[1].value,
      CargoContacto: Ruta[2].value,
      EmailContacto: Ruta[3].value,
      ID_CompañiaContacto: Ruta[4].selectedOptions[0].value,

      ID_RegionContacto: Ruta[5].selectedOptions[0].value,
      ID_PaisContacto: Ruta[6].selectedOptions[0].value,
      ID_CiudadContacto: Ruta[7].selectedOptions[0].value,

      DireccionContacto: Ruta[8].value,
      InteresContacto: Ruta[9].selectedOptions[0].value,
      Foto: "./default.png",
    };

    const result = await EditarContacto(BaseBody);

    if (result.estado === "Correcto") {
      console.log(result.estado);
      document.querySelector(".cierreetiqueta").click();
    } else {
      console.log(result.estado);
    }
  }











  async UNSAFE_componentWillMount() {
    let Base = { Posicion: "NombreEmpresa" };
    const Resultado = await EmpresaCRUD(Base);

    if (Resultado.estado === "Fallo") {
      console.log(
        "no hay compañias guardadas profavor valla a la seccion de compañia y registre una"
      );
    } else {
      Base = { Posicion: "ValidarRegionCompa" };
      const Resultados = await EmpresaCRUD(Base);
      if (Resultados.estado === "Fallo") {
        console.log(
          "no hay regiones o paises o Ciudades guardadas profavor valla a la seccion de Region/pais/ciudad y registre una"
        );
      } else {
        this.setState({
          RESULTADOEMPRESA: Resultado.msj.map((elemento) => {
            const { NombreEmpresa, ID } = elemento;
            return (
              <option key={ID} id={ID} value={ID}>
                {NombreEmpresa}
              </option>
            );
          }),
        });
      }
    }
  }

  SelectRegion = async (e) => {
    let BaseBody = {};
    if (e.type === "change") {
      BaseBody = { Posicion: "Pais", IDRegion: e.target.value };

      const Result = await ConsultarRPC(BaseBody);

      if (Result.estado === "Correcto") {
        this.setState({
          RESULTADOPAIS: (
            <select id="Pais" defaultValue="0" onChange={this.SelectPais}>
              <option value="0" disabled>
                Seleccione Un Pais
              </option>

              {Result.msj.map((elemento) => {
                const { NombrePais, ID } = elemento;
                return (
                  <option key={ID} id={ID} value={ID}>
                    {NombrePais}
                  </option>
                );
              })}
            </select>
          ),
        });
      } else {
        this.setState({
          RESULTADOPAIS: (
            <select id="Pais" defaultValue="0" onChange={this.SelectPais}>
              <option value="0" disabled>
                Seleccione Un Pais
              </option>
            </select>
          ),
        });
      }

      this.setState({
        RESULTADOCIUDAD: (
          <select id="Ciudad" defaultValue="0">
            <option value="0" disabled>
              Seleccione Una Ciudad
            </option>
          </select>
        ),
      });

      document.getElementById("Pais").selectedIndex = "0";
      document.getElementById("Ciudad").selectedIndex = "0";
    } else {
      BaseBody = { Posicion: "Pais", IDRegion: e };

      const Result = await ConsultarRPC(BaseBody);

      if (Result.estado === "Correcto") {
        this.setState({
          RESULTADOPAIS: (
            <select
              id="Pais"
              defaultValue={BaseBody.IDRegion}
              onChange={this.SelectPais}
            >
              <option value="0" disabled>
                Seleccione Un Pais
              </option>

              {Result.msj.map((elemento) => {
                const { NombrePais, ID } = elemento;
                return (
                  <option key={ID} id={ID} value={ID}>
                    {NombrePais}
                  </option>
                );
              })}
            </select>
          ),
        });
      } else {
        document.getElementById("Pais").selectedIndex = "0";
      }
    }
  };

  SelectPais = async (e) => {
    let BaseBody = {};
    if (e.type === "change") {
      BaseBody = { Posicion: "Ciudad", IDPais: e.target.value };
      const Result = await ConsultarRPC(BaseBody);
      if (Result.estado === "Correcto") {
        this.setState({
          RESULTADOCIUDAD: (
            <select id="Ciudad" defaultValue="0">
              <option value="0" disabled>
                Seleccione Una Ciudad
              </option>

              {Result.msj.map((elemento) => {
                const { NombreCiudad, ID } = elemento;
                return (
                  <option key={ID} id={ID} value={ID}>
                    {NombreCiudad}
                  </option>
                );
              })}
            </select>
          ),
        });
      } else {
        this.setState({
          RESULTADOCIUDAD: (
            <select id="Ciudad" defaultValue="0">
              <option value="0" disabled>
                Seleccione Una Ciudad
              </option>
            </select>
          ),
        });
      }
      document.getElementById("Ciudad").selectedIndex = "0";
    } else {
      const { Pais, Ciudad } = e;

      BaseBody = { Posicion: "Ciudad", IDPais: Pais };
      const Result = await ConsultarRPC(BaseBody);

      if (Result.estado === "Correcto") {
        this.setState({
          RESULTADOCIUDAD: (
            <select id="Ciudad" defaultValue={parseInt(Ciudad)}>
              <option value="0" disabled>
                Seleccione Una Ciudad
              </option>

              {Result.msj.map((elemento) => {
                const { NombreCiudad, ID } = elemento;
                return (
                  <option key={ID} id={ID} value={ID}>
                    {NombreCiudad}
                  </option>
                );
              })}
            </select>
          ),
        });
      } else {
        document.getElementById("Ciudad").selectedIndex = "0";
      }
    }
  };

  Cambiar = (e) => {
    if (e === "") {
      this.setState({ eliminar: "" });
    } else {
      this.setState({ VECTOR: e });
    }
  };

  render() {
    const element = <FontAwesomeIcon icon={faTimes} />;
    return (
      <React.Fragment>
        <div className="Contenedor_Contactos">
          <div className="Ventana_Contactos">
            <div className="contenedor-header">
              <div className="titulo">
                <h2>Nuevo Contacto</h2>
              </div>
              <div className="cierre">
                <a className="cierreetiqueta" href="/Contactos">
                  <i className="">{element}</i>
                </a>
              </div>
            </div>

            <form className="Contactos_Formulario">
              <div className="Formulario_Principal">
                <div className="Nombre">
                  <label>
                    Nombre<span>*</span>
                  </label>
                  <br></br>
                  <input className="TxtNombre" autoComplete="off" type="text" />
                </div>

                <div className="Apellido">
                  <label>
                    Apellido<span>*</span>
                  </label>
                  <br></br>
                  <input
                    className="TxtApellido"
                    autoComplete="off"
                    type="text"
                  />
                </div>

                <div className="Cargo">
                  <label>
                    Cargo<span>*</span>
                  </label>
                  <br></br>
                  <input className="TxtCargo" autoComplete="off" type="text" />
                </div>

                <div className="Email">
                  <label>
                    Email<span>*</span>
                  </label>
                  <br></br>
                  <input className="TxtEmail" autoComplete="off" type="text" />
                </div>

                <div className="Compañia">
                  <label>
                    Compañia<span>*</span>
                  </label>
                  <br></br>

                  <select id="Empresa" defaultValue="0">
                    <option value="0" disabled>
                      Seleccione Una Empresa
                    </option>
                    {this.state.RESULTADOEMPRESA}
                  </select>
                </div>
              </div>

              <div className="Formulario_Secundario">
                <div className="Region">
                  <label>Region</label>
                  <br></br>

                  {this.state.RESULTADOREGION}
                </div>

                <div className="Pais">
                  <label>Pais</label>
                  <br></br>

                  {this.state.RESULTADOPAIS}
                </div>

                <div className="Ciudad">
                  <label>Ciudad</label>
                  <br></br>

                  {this.state.RESULTADOCIUDAD}
                </div>

                <div className="Direccion">
                  <label>Direccion</label>
                  <br></br>
                  <input
                    className="TxtDireccion"
                    autoComplete="off"
                    type="text"
                    placeholder="Ingresa Una Direccion"
                  />
                </div>

                <div className="Interes">
                  <label>Interes</label>
                  <br></br>

                  <select id="Interes" defaultValue="0">
                    <option value="0" disabled>
                      Seleccione Una
                    </option>
                    <option value="1">0%</option>
                    <option value="2">25%</option>
                    <option value="3">50%</option>
                    <option value="4">75%</option>
                    <option value="5">100%</option>
                  </select>
                </div>
              </div>
              {this.props.ID === "Agregar" ? (
                <Canal vec={this.state.VECTOR} />
              ) : (
                this.state.MostrarActualizar
              )}
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Contactos;
