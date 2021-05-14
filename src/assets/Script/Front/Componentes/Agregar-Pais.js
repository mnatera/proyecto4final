import React, { Component, createRef } from "react";
import { AgregaPais, AgregaCiudad } from "../../Front/Consulta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class Agregar_Pais extends Component {
  PaisRef = createRef();

  state = {
    mostrar: "",
    NombrePais: "",
    NumeroRegion: "",
    NumeroPais: "",
  };

  UNSAFE_componentWillMount() {
    this.props.NumeroPais
      ? this.setState({
          NombrePais: this.props.nombres,
          NumeroPais: this.props.NumeroPais,
          mostrar:
            "Nombre De La Nueva Ciudad Del Pais De " + this.props.nombres,
        })
      : this.setState({
          NombrePais: this.props.nombres,
          NumeroRegion: this.props.numeroRegion,
          mostrar: "Nombre Del Nuevo Pais De " + this.props.nombres,
        });
  }

  recibirformulario = async (e) => {
    e.preventDefault();
    let BaseBody = {};
    let result = {};

    if (this.props.NumeroPais) {
      BaseBody = {
        NombreCiudad: this.PaisRef.current.value,
        ID_Pais: this.state.NumeroPais,
      };
      result = await AgregaCiudad(BaseBody);
    } else {
      BaseBody = {
        NombrePais: this.PaisRef.current.value,
        ID_Region: this.state.NumeroRegion,
      };
      result = await AgregaPais(BaseBody);
    }
    if ((await result.estado) === "Correcto") {
      this.props.actualizar();
      this.props.AgregarPais("");
    } else {
    }
  };

  cierre = (e) => {
    e.preventDefault();
    this.props.AgregarPais("");
  };

  render() {
    const element = <FontAwesomeIcon icon={faTimes} />;
    return (
      <React.Fragment>
        <div className="Contenedor_Agregar_Pais">
          <div className="Ventana_Agregar_Pais">
            <a href="!#">
              <i className="" onClick={this.cierre}>
                {element}
              </i>
            </a>
            <h2 className="grupo_formulario">{this.state.mostrar}</h2>
            <form
              className="AgregarPais_formulario"
              onSubmit={this.recibirformulario}
            >
              <div>
                <input
                  autoComplete="off"
                  className="txtGuardar"
                  type="text"
                  name="Region"
                  ref={this.PaisRef}
                />
              </div>
              <div>
                <input className="BtnGuardar" type="submit" value="Guardar" />
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Agregar_Pais;
