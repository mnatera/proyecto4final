import React, { Component, createRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { AgregarRegion } from "../../Front/Consulta";

class Agregar_Region extends Component {
  RegionRef = createRef();

  state = {
    Existe: {},
  };

  recibirformulario = async (e) => {
    e.preventDefault();
    const BaseBody = {
      NombreRegion: this.RegionRef.current.value,
    };
    const result = await AgregarRegion(BaseBody);
    if ((await result.estado) === "Correcto") {
      document.querySelector(".Contenedor_Agregar_Region").style.visibility =
        "hidden";
      this.props.actualizar();
    } else {
      if ((await result.msj) === "Ya existe") {
        this.setState({ Existe: result.msj });
      }
    }
  };

  cierre = (e) => {
    e.preventDefault();
    document.querySelector(".Contenedor_Agregar_Region").style.visibility =
      "hidden";
  };

  control = (e) => {
    e.target.value = "";
    this.setState({ Existe: "" });
  };

  render() {
    const element = <FontAwesomeIcon icon={faTimes} />;
    return (
      <React.Fragment>
        <div className="Contenedor_Agregar_Region ">
          <div className="Ventana_Agregar_Region ">
            <a href="!#">
              <i className="" onClick={this.cierre}>
                {element}
              </i>
            </a>
            <h2 className="grupo_formulario">Nombre De La Nueva Region</h2>

            <form
              className="AgregarRegion_formulario"
              onSubmit={this.recibirformulario}
            >
              <div>
                <input
                  className="txtGuardar"
                  autoComplete="off"
                  type="text"
                  name="Region"
                  id="txt_guardar"
                  onClick={this.control}
                  ref={this.RegionRef}
                />
              </div>
              <div>
                <input className="BtnGuardar" type="submit" value="Guardar" />
                {this.state.Existe === "Ya existe" && <h2>ya existe</h2>}
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Agregar_Region;
