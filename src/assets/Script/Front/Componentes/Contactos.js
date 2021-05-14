import React, { useState, useEffect } from "react";

import Ventana from "./Contacto-Ventana";
import flecha from "../../../icon/sort-alt.svg"; //../assets/icon/sort-alt.svg
import Header from "./Header";
import {
  BuscarContactos,
  BuscarContactosCanal,
  ConsultarRPC,
  EmpresaCRUD,
  BuscadorContactos,
  EliminarUnContacto,
} from "../Consulta"; //"../assets/Script/Front/Consulta"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faSortDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import eli from "../../../img/Eliminar.JPG";
const fotosperfil = require.context("../../../img", true);

function Contacto(props) {
  const OptInteres = [
    <option key={0} value={0}>
      Cualquiera
    </option>,
    <option key={1} value={1}>
      0 %
    </option>,
    <option key={2} value={2}>
      25 %
    </option>,
    <option key={3} value={3}>
      50 %
    </option>,
    <option key={4} value={4}>
      75 %
    </option>,
    <option key={5} value={5}>
      100 %
    </option>,
  ];
  const trash = <FontAwesomeIcon icon={faTrash} />;
  const [VetanaContacto, setVetanaContacto] = useState("");
  const [Region, setRegion] = useState("");
  const [Empresa, setEmpresa] = useState("");

  const [Busqueda, setBusquedar] = useState([]);
  const [MostrarDatos, setMostrarDatos] = useState([]);

  const [Cambiarcontacto, setCambiarcontacto] = useState(true);
  const [Cambiarpais, setCambiarpais] = useState(true);
  const [Cambiarcompania, setCambiarcompania] = useState(true);
  const [Cambiarcargo, setCambiarcargo] = useState(true);
  const [Cambiarinteres, setCambiarinteres] = useState(true);
  const [checkbox, setcheckbox] = useState([]);
  const [IDActualizar, setIDActualizar] = useState("");

  const [VentanaEliminar, setVentanaEliminar] = useState("");

  useEffect(() => {
    inicio();
  }, []);

  async function inicio() {
    const Result = await BuscarContactos();
    llenarpagina(Result);
  }

  async function llenarpagina(Result) {
    if (Result.estado === "Correcto") {
      if (Result.msj.length !== 0) {
        let mostrar = Result.msj.sort((a, b) =>
          a.NombreContacto > b.NombreContacto ? 1 : -1
        );

        for (let i = 0; i < mostrar.length; i++) {
          let Resultado = await MostrarPreferido(mostrar[i].ID);
          mostrar[i].canales = Resultado;
        }
        LlenarMostrar(mostrar);
      } else {
        console.log("no hay contactos guardados");
      }
    } else {
      console.log("problemas en la consulta");
      setMostrarDatos(
        <div>
          <h1>No hay resultados</h1>
        </div>
      );
      setBusquedar([]);
    }
    //llenar opciones

    const BaseBody = { Posicion: "Region" };
    const ResultadoRegion = await ConsultarRPC(BaseBody);

    if (ResultadoRegion.estado === "Correcto") {
      let RESULTADOREGION = ResultadoRegion.msj.map((elemento) => {
        const { NombreRegion, ID } = elemento;
        return (
          <option key={ID} id={ID} value={NombreRegion}>
            {NombreRegion}
          </option>
        );
      });

      setRegion([RESULTADOREGION]);
    }

    let Base = { Posicion: "NombreEmpresa" };
    const Resultado = await EmpresaCRUD(Base);
    if (Resultado.estado === "Correcto") {
      let RESULTADOEMPRESA = Resultado.msj.map((elemento) => {
        const { NombreEmpresa, ID } = elemento;
        return (
          <option key={ID} id={ID} value={NombreEmpresa}>
            {NombreEmpresa}
          </option>
        );
      });
      setEmpresa([RESULTADOEMPRESA]);
    }
  }

  async function MostrarPreferido(ID) {
    const BaseBody = { ID_Contacto: ID };
    const Result = await BuscarContactosCanal(BaseBody);
    if (Result.estado === "Correcto") {
      if (Result.msj.length !== 0) {
        let canales = Result.msj.map((item) => {
          let nombre = "";
          switch (item.Canal) {
            case 1:
              nombre = "Teléfono";
              break;

            case 2:
              nombre = "Whatsapp";
              break;

            case 3:
              nombre = "Instagram";
              break;

            case 4:
              nombre = "Facebook";
              break;

            case 5:
              nombre = "Linkedin";
              break;

            default:
              break;
          }
          return nombre;
        });
        return canales;
      } else {
        console.log("no hay contactos guardados");
      }
    } else {
      console.log("problemas en la consulta");
    }
  }

  function LlenarMostrar(Datos) {
    let contactos = Datos;
    setBusquedar(Datos);

    let MOSTRAR = contactos.map((item, index) => {
      let porcentage = 0;
      switch (item.Interes) {
        case 1:
          porcentage = 0;
          break;
        case 2:
          porcentage = 25;
          break;
        case 3:
          porcentage = 50;
          break;
        case 4:
          porcentage = 75;
          break;
        case 5:
          porcentage = 100;
          break;

        default:
          break;
      }

      let color = "";
      let nombre = 0;

      let primerosDos;
      let proximo;
      let canal;
      let control = true;

      if (item.canales === undefined) {
        control = false;
        canal = (
          <div className="contenedorItemCanal">
            <span>Pending</span>
          </div>
        );
      } else {
        if (item.canales.length > 2) {
          control = true;
          primerosDos = item.canales.map((itm, index) => {
            if (index === 0) {
              return (
                <div className="contenedorItemCanal" key={0}>
                  <span>{itm}</span>
                </div>
              );
            } else if (index === 1) {
              return (
                <React.Fragment>
                  <div className="contenedorItemCanal" key={1}>
                    <span>{itm}</span>
                  </div>
                  <button className="btnmascanal" onClick={AbrirVentana}>
                    ...
                  </button>
                </React.Fragment>
              );
            }
          });

          proximo = item.canales.map((itm, index) => {
            if (index > 1) {
              return (
                <div className="contenedorItemCanal" key={index}>
                  <span>{itm}</span>
                </div>
              );
            }
          });
        } else {
          control = false;
          canal = item.canales.map((itm, index) => {
            return (
              <div className="contenedorItemCanal" key={index}>
                <span>{itm}</span>
              </div>
            );
          });
        }
      }

      switch (porcentage) {
        case 25:
          color = "#1CC1F5";
          nombre = 20;
          break;

        case 50:
          color = "#FFC700";
          nombre = 20;
          break;

        case 75:
          color = "#FF6F00";
          nombre = 20;
          break;

        case 100:
          color = "#DE0028";
          nombre = 11;
          break;

        default:
          color = "#DDDDDD";
          nombre = 30;
          break;
      }

      let spanstyle = {
        margin: "0px " + nombre + "px 0px 0px",
      };

      let divstyle = {
        width: porcentage + "%",
        background: color,
      };

      const pen = <FontAwesomeIcon icon={faPen} />;

      return (
        <div className="contenedor_lista" key={item.ID} identificador={item.ID}>
          <div className="lista_Seleccion">
            <input
              type="checkbox"
              id="cbox1"
              value="first_checkbox"
              onClick={seleccionarUnoauno}
            />
          </div>
          <div className="lista_Contacto">
            <div className="foto_lista_Contacto">
              <img src={fotosperfil(item.Foto).default} alt="hola" />
            </div>
            <div className="NombreCorreo_lista_Contacto">
              <span>{item.NombreContacto + " " + item.ApellidoContacto}</span>
              <br></br>
              <span>{item.Email}</span>
            </div>
          </div>
          <div className="lista_PaisRegion">
            <span>{item.NombrePais}</span>
            <br></br>
            <span>{item.NombreRegion}</span>
          </div>
          <div className="lista_Compania">
            <span>{item.NombreEmpresa}</span>
          </div>
          <div className="lista_Cargo">
            <span>{item.Cargo}</span>
          </div>
          <div className="lista_Canal">
            {control ? (
              <div className="contenedorCanal">
                {primerosDos}
                <div className="ventanacanales">{proximo}</div>
              </div>
            ) : (
              <div className="contenedorCanal">{canal}</div>
            )}
          </div>
          <div className="lista_Interes">
            <span style={spanstyle}>{porcentage}%</span>
            <div className="barraGuia">
              <div className="barraValor" style={divstyle}></div>
            </div>
          </div>
          <div className="lista_Accion">
            <div className="btnEliminar" onClick={validareliminaricon}>
              {trash}
            </div>

            <div className="btnEditar" onClick={actualizar}>
              {pen}
            </div>
          </div>
        </div>
      );
    });
    setMostrarDatos(MOSTRAR);
  }

  function validareliminaricon(e) {
    let ID = "";
    switch (e.target.tagName) {
      case "path":
        ID =
          e.target.parentNode.parentNode.parentNode.parentNode.attributes[1]
            .value;
        break;
      case "svg":
        ID = e.target.parentNode.parentNode.parentNode.attributes[1].value;
        break;
      case "DIV":
        ID = e.target.parentNode.parentNode.attributes[1].value;
        break;

      default:
        break;
    }

    setVentanaEliminar(
      <div className="ventanaEliminar">
        <div className="contenedor">
          <img src={eli} alt="eliminar" />

          <button className="btncancelar" onClick={cancelaricono}>
            Cancelar
          </button>
          <button className="btneliminar" onClick={(e) => eliminar(ID)}>
            Eliminar
          </button>
        </div>
      </div>
    );
  }

  async function eliminar(e) {
    const base = {
      ID: e,
    };

    let Respuesta = await EliminarUnContacto(base);

    if (Respuesta.estado === "Correcto") {
      setVentanaEliminar("");
      inicio();
    }
  }

  function cancelaricono(params) {
    setVentanaEliminar("");
  }

  async function actualizar(e) {
    e.preventDefault();

    let ID = "";
    switch (e.target.tagName) {
      case "path":
        ID =
          e.target.parentNode.parentNode.parentNode.parentNode.attributes[1]
            .value;
        break;

      case "svg":
        ID = e.target.parentNode.parentNode.parentNode.attributes[1].value;
        break;

      case "DIV":
        ID = e.target.parentNode.parentNode.attributes[1].value;
        break;

      default:
        break;
    }

    document.querySelector(".contenedorElimiarcontacto").style.visibility =
      "hidden";
    document.querySelector(".msjCantidad").style.visibility = "hidden";

    let barra = document.querySelectorAll(".barraGuia");
    let valor = document.querySelectorAll(".barraValor");

    valor.forEach((element) => {
      element.style.position = "initial";
    });
    barra.forEach((element) => {
      element.style.position = "initial";
    });

    setVetanaContacto(["Abrir"]);
    setIDActualizar(ID);
  }

  function Organizar(e) {
    let Organizar = [];
    switch (e.target.id) {
      case "OrganizarNombre":
        if (Cambiarcontacto === true) {
          Organizar = Busqueda.sort((a, b) =>
            a.NombreContacto < b.NombreContacto ? 1 : -1
          );
          setCambiarcontacto(false);
        } else {
          setCambiarcontacto(true);

          Organizar = Busqueda.sort((a, b) =>
            a.NombreContacto > b.NombreContacto ? 1 : -1
          );
        }
        break;

      case "OrganizarPais":
        if (Cambiarpais === true) {
          Organizar = Busqueda.sort((a, b) =>
            a.NombrePais < b.NombrePais ? 1 : -1
          );
          setCambiarpais(false);
        } else {
          setCambiarpais(true);
          Organizar = Busqueda.sort((a, b) =>
            a.NombrePais > b.NombrePais ? 1 : -1
          );
        }
        break;

      case "OrganizarCompania":
        if (Cambiarcompania === true) {
          Organizar = Busqueda.sort((a, b) =>
            a.NombreEmpresa < b.NombreEmpresa ? 1 : -1
          );
          setCambiarcompania(false);
        } else {
          setCambiarcompania(true);
          Organizar = Busqueda.sort((a, b) =>
            a.NombreEmpresa > b.NombreEmpresa ? 1 : -1
          );
        }
        break;

      case "OrganizarCargo":
        if (Cambiarcargo === true) {
          Organizar = Busqueda.sort((a, b) => (a.Cargo < b.Cargo ? 1 : -1));
          setCambiarcargo(false);
        } else {
          setCambiarcargo(true);
          Organizar = Busqueda.sort((a, b) => (a.Cargo > b.Cargo ? 1 : -1));
        }
        break;

      case "OrganizarInteres":
        if (Cambiarinteres === true) {
          Organizar = Busqueda.sort((a, b) => (a.Interes < b.Interes ? 1 : -1));
          setCambiarinteres(false);
        } else {
          setCambiarinteres(true);
          Organizar = Busqueda.sort((a, b) => (a.Interes > b.Interes ? 1 : -1));
        }
        break;

      default:
        break;
    }

    LlenarMostrar(Organizar);
  }

  async function agregar(e) {
    e.preventDefault();

    document.querySelector(".contenedorElimiarcontacto").style.visibility =
      "hidden";
    document.querySelector(".msjCantidad").style.visibility = "hidden";

    let barra = document.querySelectorAll(".barraGuia");
    let valor = document.querySelectorAll(".barraValor");

    valor.forEach((element) => {
      element.style.position = "initial";
    });
    barra.forEach((element) => {
      element.style.position = "initial";
    });

    setVetanaContacto(["Abrir"]);
    setIDActualizar("Agregar");
  }

  async function buscar(e) {
    let check = checkbox;
    check.forEach((element) => {
      element.checked = false;
      element.parentNode.parentNode.style.backgroundColor =
        "rgba(255, 255, 255, 0.9)";
    });
    document.getElementById("SeleccionarTodo").checked = false;
    document.querySelector(".msjCantidad").style.visibility = "hidden";
    document.querySelector(".contenedorElimiarcontacto").style.visibility =
      "hidden"; //////
    document.querySelector(".cantidadseleccionados").textContent = "";
    check.splice(0, check.length);
    setcheckbox(check);

    let rutaCierre = "";
    switch (e.target.tagName) {
      case "path":
        rutaCierre = e.target.parentNode.parentNode.nextSibling;
        break;

      case "svg":
        rutaCierre = e.target.parentNode.nextSibling;
        break;

      case "DIV":
        rutaCierre = e.target.nextSibling;
        break;

      default:
        break;
    }

    if (rutaCierre.style.display === "initial") {
      rutaCierre.style.display = "none";
    }

    /////
    let ruta = "";
    switch (e.target.tagName) {
      case "path":
        ruta = e.target.parentNode.parentNode.nextSibling.children[0].children;
        break;

      case "svg":
        ruta = e.target.parentNode.nextSibling.children[0].children;
        break;

      case "DIV":
        ruta = e.target.nextSibling.children[0].children;
        break;

      default:
        break;
    }

    let Recolectardatos = [];
    Recolectardatos.push({
      valor: ruta[1].children[0].value,
      atributo: "NombreContacto",
      comparacion: "",
    });
    Recolectardatos.push({
      valor: ruta[3].children[0].value,
      atributo: "Cargo",
      comparacion: "",
    });
    Recolectardatos.push({
      valor: ruta[5].children[0].value,
      atributo: "NombreRegion",
      comparacion: "Todos",
    });
    Recolectardatos.push({
      valor: ruta[7].children[0].value,
      atributo: "NombreEmpresa",
      comparacion: "Todos",
    });
    Recolectardatos.push({
      valor: parseInt(ruta[9].children[0].value),
      atributo: "Interes",
      comparacion: 0,
    });

    let datos = [];
    let CadenaRuta = "";
    let control = true;
    for (let i = 0; i <= 4; i++) {
      if (Recolectardatos[i].valor !== Recolectardatos[i].comparacion) {
        datos.push(Recolectardatos[i]);
        if (control) {
          if (typeof Recolectardatos[i].valor === "number") {
            CadenaRuta =
              CadenaRuta +
              Recolectardatos[i].atributo +
              " = " +
              Recolectardatos[i].valor;
          } else {
            CadenaRuta =
              CadenaRuta +
              Recolectardatos[i].atributo +
              " = '" +
              Recolectardatos[i].valor +
              "' ";
          }
          control = false;
        } else {
          if (typeof Recolectardatos[i].valor === "number") {
            CadenaRuta =
              CadenaRuta +
              " && " +
              Recolectardatos[i].atributo +
              " = " +
              Recolectardatos[i].valor;
          } else {
            CadenaRuta =
              CadenaRuta +
              " && " +
              Recolectardatos[i].atributo +
              " = '" +
              Recolectardatos[i].valor +
              "' ";
          }
        }
      }
    }

    let base = { Parametro: CadenaRuta };
    let Resultado = await BuscadorContactos(base);

    llenarpagina(Resultado);
  }

  function AbrirVentana(e) {
    if (e.target.nextSibling.style.display === "initial") {
      e.target.nextSibling.style.display = "none";
    } else {
      e.target.nextSibling.style.display = "initial";
    }
  }

  function AbrirVentanaBusqueda(e) {
    let ruta = "";
    switch (e.target.tagName) {
      case "path":
        ruta = e.target.parentNode.parentNode.nextSibling.nextSibling;
        break;

      case "svg":
        ruta = e.target.parentNode.nextSibling.nextSibling;
        break;

      case "DIV":
        ruta = e.target.nextSibling.nextSibling;
        break;

      default:
        break;
    }

    if (ruta.style.display === "initial") {
      ruta.style.display = "none";
      document.querySelector(".msjCantidad").style.visibility = "initial";

      if (document.querySelector(".cantidadseleccionados").textContent === "") {
        document.querySelector(".msjCantidad").style.visibility = "hidden";
      } else {
        document.querySelector(".msjCantidad").style.visibility = "initial";
      }
    } else {
      ruta.style.display = "initial";
      document.querySelector(".msjCantidad").style.visibility = "hidden";
    }
  }

  function seleccionarTodo(e) {
    let vacio = [];
    let check = document.querySelectorAll("#cbox1");
    if (e.target.checked) {
      vacio = checkbox;
      vacio.splice(0, vacio.length);
      setcheckbox(vacio);
      check.forEach((element) => {
        let actual = checkbox;
        actual.push(element);
        setcheckbox(actual);
        element.checked = true;
        element.parentNode.parentNode.style.backgroundColor =
          "rgba(199, 242, 255, 0.9)";
      });
      document.querySelector(".msjCantidad").style.visibility = "initial";
      document.querySelector(".contenedorElimiarcontacto").style.visibility =
        "initial"; //////
      document.querySelector(".cantidadseleccionados").textContent =
        " " + checkbox.length + " seleccionados";
    } else {
      checkbox.forEach((element) => {
        element.checked = false;
        element.parentNode.parentNode.style.backgroundColor =
          "rgba(255, 255, 255, 0.9)";
      });
      vacio = checkbox;
      vacio.splice(0, vacio.length);
      setcheckbox(vacio);
      document.querySelector(".msjCantidad").style.visibility = "hidden";
      document.querySelector(".contenedorElimiarcontacto").style.visibility =
        "hidden"; //////
      document.querySelector(".cantidadseleccionados").textContent = "";
    }
  }

  function seleccionarUnoauno(e) {
    if (e.target.checked) {
      let pasar = checkbox;
      pasar.push(e.target);
      setcheckbox(pasar);
      e.target.parentNode.parentNode.style.backgroundColor =
        "rgba(199, 242, 255, 0.9)";

      document.querySelector(".msjCantidad").style.visibility = "initial";
      document.querySelector(".contenedorElimiarcontacto").style.visibility =
        "initial"; //////
      document.querySelector(".cantidadseleccionados").textContent =
        " " + checkbox.length + " seleccionados";
    } else {
      e.target.parentNode.parentNode.style.backgroundColor =
        "rgba(255, 255, 255, 0.9)";
      let idevento = e.target.parentNode.parentNode.attributes[1].value;
      let numeroeliminar = 0;

      checkbox.forEach((element, index) => {
        let comparar = element.parentNode.parentNode.attributes[1].value;
        if (idevento === comparar) {
          numeroeliminar = index;
        }
      });

      let eliminar = checkbox;
      eliminar.splice(numeroeliminar, 1);
      setcheckbox(eliminar);
      if (checkbox.length !== 0) {
        document.querySelector(".cantidadseleccionados").textContent =
          " " + checkbox.length + " seleccionados";
      } else {
        document.getElementById("SeleccionarTodo").checked = false;
        document.querySelector(".cantidadseleccionados").textContent =
          " " + checkbox.length + " seleccionados";
        document.querySelector(".msjCantidad").style.visibility = "hidden";
        document.querySelector(".contenedorElimiarcontacto").style.visibility =
          "hidden"; //////
        document.querySelector(".cantidadseleccionados").textContent = "";
      }
    }
  }

  function cancelartodo(e) {
    document.getElementById("SeleccionarTodo").click();
    setVentanaEliminar("");
  }

  function ConfirmarEliminar(params) {
    setVentanaEliminar(
      <div className="ventanaEliminar">
        <div className="contenedor">
          <img src={eli} alt="eliminar" />

          <button className="btncancelar" onClick={cancelartodo}>
            Cancelar
          </button>
          <button className="btneliminar" onClick={eliminarcontactos}>
            Eliminar
          </button>
        </div>
      </div>
    );
  }

  async function eliminarcontactos(e) {
    let vacio = [];
    checkbox.forEach(async (element) => {
      let id = element.parentNode.parentNode.attributes[1].value;

      const base = {
        ID: id,
      };
      let Respuesta = await EliminarUnContacto(base);
      if (Respuesta.estado === "Correcto") {
        console.log("contacto con ID " + id + " eliminado correctamente");
      } else {
        console.log("contacto con ID " + id + " no fue eliminado");
      }
    });

    vacio = checkbox;
    vacio.splice(0, vacio.length);
    setcheckbox(vacio);
    document.querySelector(".msjCantidad").style.visibility = "hidden";
    document.querySelector(".contenedorElimiarcontacto").style.visibility =
      "hidden"; //////
    document.querySelector(".cantidadseleccionados").textContent = "";

    document.getElementById("SeleccionarTodo").checked = false;
    setVentanaEliminar("");
    setMostrarDatos([""]);
    window.location.reload(false);
  
  }

  function Cierre(e) {
    if (e === "") {
      e.preventDefault();
      setVetanaContacto([""]);
    }
  }

  const flechadown = <FontAwesomeIcon icon={faSortDown} />;
  const lupa = <FontAwesomeIcon icon={faSearch} />;

  return (
    <React.Fragment>
      <Header />
      <main>
        <h1 className="titulocontactos">Contactos</h1>

        <section className="Superior">
          <div className="contenedor_buscador">
            <div className="buscador" onClick={AbrirVentanaBusqueda}>
              {flechadown}
            </div>
            <div className="buscadorlogo" onClick={buscar}>
              {lupa}
            </div>

            <div className="ventanaMenuBusqueda">
              <div className="contenedorMenuBusqueda">
                <span>Nombre del contacto</span>

                <div className="entrada">
                  <input
                    type="text"
                    placeholder="introduce el nombre del contacto"
                    className="txtnombre"
                  ></input>
                </div>

                <span>Cargo</span>
                <div className="entrada">
                  <input
                    type="text"
                    placeholder="introduce el cargo del contacto"
                    className="txtcargo"
                  ></input>
                </div>

                <span>Region</span>

                <div className="entrada">
                  <select className="TxtPaisRegionBusqueda ">
                    <option>Todos</option>
                    {Region}
                  </select>
                </div>

                <span>Compañia</span>

                <div className="entrada">
                  <select className="TxtCompañiaBusqueda ">
                    <option>Todos</option>
                    {Empresa}
                  </select>
                </div>

                <span>Interes</span>
                <div className="entrada">
                  <select className="TxtInteresBusqueda ">{OptInteres}</select>
                </div>
              </div>
            </div>
          </div>

          <div className="contenedorvacio"></div>
          <div className="contenedor_botones">
            {VetanaContacto !== "" ? (
              <Ventana ID={IDActualizar} Cerrar={Cierre} />
            ) : (
              ""
            )}
            <button onClick={agregar} className="agregarcontacto">
              Agregar Contacto
            </button>
          </div>
        </section>

        <section>
          <div className="msjCantidad">
            <div className="contenedorMjs">
              <span className="cantidadseleccionados"></span>
            </div>
          </div>

          <div className="contenedorElimiarcontacto">
            <button className="eliminarcontacto" onClick={ConfirmarEliminar}>
              {" "}
              {trash} Eliminar Contactos
            </button>
          </div>
        </section>

        <section className="inferior">
          <div className="contenedor">
            <div className="contenedor_lista_Titulo" key={0}>
              <div className="lista_Seleccion_Titulo">
                <input
                  type="checkbox"
                  id="SeleccionarTodo"
                  onClick={seleccionarTodo}
                />
              </div>
              <div className="lista_Contacto_Titulo">
                <span>Contacto</span>
                <img
                  src={flecha}
                  alt=""
                  id="OrganizarNombre"
                  onClick={Organizar}
                />
              </div>
              <div className="lista_PaisRegion_Titulo">
                <span>Pais/Region</span>
                <img
                  src={flecha}
                  alt=""
                  id="OrganizarPais"
                  onClick={Organizar}
                />
              </div>
              <div className="lista_Compania_Titulo">
                <span>Compañia</span>
                <img
                  src={flecha}
                  alt=""
                  id="OrganizarCompania"
                  onClick={Organizar}
                />
              </div>
              <div className="lista_Cargo_Titulo">
                <span>Cargo</span>
                <img
                  src={flecha}
                  alt=""
                  id="OrganizarCargo"
                  onClick={Organizar}
                />
              </div>
              <div className="lista_Canal_Titulo">
                <span>Canal Preferido</span>
              </div>
              <div className="lista_Interes_Titulo">
                <span>Interes</span>
                <img
                  src={flecha}
                  alt=""
                  id="OrganizarInteres"
                  onClick={Organizar}
                />
              </div>
              <div className="lista_Accion_Titulo">
                <span>Accion</span>
              </div>
            </div>
            {MostrarDatos}
          </div>
        </section>
        {VentanaEliminar}
      </main>
    </React.Fragment>
  );
}
export default Contacto;
