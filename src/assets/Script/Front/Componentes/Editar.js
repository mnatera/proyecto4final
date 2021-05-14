import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { EditarPC } from "../Consulta";

class Editar extends Component {
  state = {
    NOMBRE: "",
    ETIQUETA: "",
    ID: "",
    EXISTE: "",
  };

  UNSAFE_componentWillMount() {
    this.setState({
      NOMBRE: this.props.NOMBRE,
      ID: this.props.ID,
      ETIQUETA: this.props.Etiqueta.replace("Editar ", ""),
    });
  }

  recibirformulario = async (e) => {
    e.preventDefault();
    const BaseBody = {
      Etiqueta: this.state.ETIQUETA,
      NOMBRE: e.target[0].value,
      ID: this.state.ID,
    };
    const result = await EditarPC(BaseBody);
    if ((await result.estado) === "Correcto") {
      this.props.AbrirYCerrar("");
      this.props.Actualizar();
    } else {
      if ((await result.msj) === "Ya existe") {
        this.setState({ EXISTE: result.msj });
      }
    }
  };

  Cierre = (e) => {
    e.preventDefault();
    this.props.AbrirYCerrar("");
  };

  control = (e) => {
    e.target.value = "";
    this.setState({ EXISTE: "" });
  };

  render() {
    const element = <FontAwesomeIcon icon={faTimes} />;
    return (
      <React.Fragment>
        <div className="Contenedor_Editar">
          <div className="Ventana_Editar">
            <a href="!#">
              <i className="" onClick={this.Cierre}>
                {element}
              </i>
            </a>

            <h2 className="grupo_formulario">
              Deseas Editar {this.props.NOMBRE}
            </h2>
            <h4>
              <span>Recuerda!:</span>Ingresa El Nuevo Nombre
            </h4>

            <form
              className="Editar_formulario"
              onSubmit={this.recibirformulario}
            >
              <div>
                <input
                  className="TxtEditar"
                  autoComplete="off"
                  type="text"
                  onClick={this.control}
                />
              </div>
              <div>
                <input className="BtnEditar" type="submit" value="Editar" />
              </div>
              {this.state.EXISTE === "Ya existe" && <h2>ya existe</h2>}
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Editar;
