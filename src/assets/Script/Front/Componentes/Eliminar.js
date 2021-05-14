import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { EliminarPC } from "../Consulta";

class Eliminar extends Component {
  state = {
    NOMBRE: "",
    ETIQUETA: "",
    MOSTRAR: "",
    ID: "",
  };

  UNSAFE_componentWillMount() {
    this.setState({
      NOMBRE: this.props.NOMBRE,
      ID: this.props.ID,
      ETIQUETA: this.props.Etiqueta.replace("Eliminar ", ""),
    });
    switch (this.props.Etiqueta.replace("Eliminar ", "")) {
      case "Pais":
        this.setState({
          MOSTRAR: (
            <React.Fragment>
              <h2 className="grupo_formulario">
                Deseas Eliminar El Pais {this.state.NOMBRE}{" "}
              </h2>
              <h4>
                <span>Recuerda!:</span>Desapareceran todas las ciudades de{" "}
                {this.props.NOMBRE}
              </h4>
            </React.Fragment>
          ),
        });
        break;

      default:
        this.setState({
          MOSTRAR: (
            <h2 className="grupo_formulario">
              Deseas Eliminar La Ciudad {this.props.NOMBRE}
            </h2>
          ),
        });
        break;
    }
  }

  recibirformulario = async (e) => {
    e.preventDefault();
    const BaseBody = {
      ETIQUETA: this.state.ETIQUETA,
      NOMBRE: this.state.NOMBRE,
      ID: this.state.ID,
    };
    const Result = await EliminarPC(BaseBody);
    if ((await Result.estado) === "Correcto") {
      this.props.AbrirYCerrar("");
      this.props.Actualizar();
    }
  };

  Cierre = (e) => {
    e.preventDefault();
    this.props.AbrirYCerrar("");
  };

  render() {
    const element = <FontAwesomeIcon icon={faTimes} />;
    return (
      <React.Fragment>
        <div className="Contenedor_Eliminar">
          <div className="Ventana_Eliminar">
            <a href="!#">
              <i className="" onClick={this.Cierre}>
                {element}
              </i>
            </a>

            {this.state.MOSTRAR}

            <form
              className="Eliminar_formulario"
              onSubmit={this.recibirformulario}
            >
              <div>
                <input className="BtnEliminar" type="submit" value="Eliminar" />
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Eliminar;
