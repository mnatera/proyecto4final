import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { AgregarRPC } from "../../Front/Consulta";

class Agregar extends Component {
  state = {
    ETIQUETA: "", 
    MOSTRAR: "", 
    NOMBRE: "",
    ID: "",
    Existe: {},
  };

  UNSAFE_componentWillMount() {
    this.setState({ ETIQUETA: this.props.Etiqueta });
    switch (this.props.Etiqueta) {
      case "Region":
        this.setState({ MOSTRAR: "Ingresar La Nueva Region" });
        break;

      case "Pais":
        this.setState({
          MOSTRAR: "Ingresar El Nuevo Pais De " + this.props.Nombres,
        });
        this.setState({ NOMBRE: this.props.Nombres, ID: this.props.IdRegion });
        break;

      default:
        this.setState({
          MOSTRAR: "Ingresar La Nueva Ciudad De " + this.props.Nombres,
        });
        this.setState({ NOMBRE: this.props.Nombres, ID: this.props.IdRegion });
        break;
    }
  }

  RecibirFormulario = async (e) => {
    e.preventDefault();
    let BaseBody = {};
    switch (this.state.ETIQUETA) {
      case "Region":
        BaseBody = {
          NombreRegion: e.target[0].value,
          Etiqueta: this.state.ETIQUETA,
        };
        break;

      case "Pais":
        BaseBody = {
          NombrePais: e.target[0].value,
          ID_Region: this.state.ID,
          Etiqueta: this.state.ETIQUETA,
        };
        break;

      default:
        BaseBody = {
          NombreCiudad: e.target[0].value,
          ID_Pais: this.state.ID,
          Etiqueta: this.state.ETIQUETA,
        };
        break;
    }

    const result = await AgregarRPC(BaseBody);
    if ((await result.estado) === "Correcto") {
      this.props.Cerrar("");
      this.props.Actualizar();
    } else {
      if ((await result.msj) === "Ya existe") {
        this.setState({ Existe: result.msj });
      }
    }
  };

  cierre = (e) => {
    e.preventDefault();
    this.props.Cerrar("");
  };

  control = (e) => {
    e.target.value = "";
    this.setState({ Existe: "" });
  };

  render() {
    const element = <FontAwesomeIcon icon={faTimes} />;
    return (
      <React.Fragment>
        <div className="Contenedor_Agregar">
          <div className="Ventana_Agregar">
            <a href="!#">
              <i className="" onClick={this.cierre}>
                {element}
              </i>
            </a>
            <h2 className="Grupo_Formulario">{this.state.MOSTRAR}</h2>

            <form
              className="Agregar_Formulario"
              onSubmit={this.RecibirFormulario}>
              <div>
                <input
                  className="TxtGuardar"
                  autoComplete="off"
                  type="text"
                  onClick={this.control}
                />
              </div>
              <div>
                <input className="BtnGuardar" type="submit" value="Guardar" />
              </div>
              {this.state.Existe === "Ya existe" && <h2>ya existe</h2>}
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Agregar;
