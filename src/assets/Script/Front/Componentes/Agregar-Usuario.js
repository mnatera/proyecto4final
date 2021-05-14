import React, { Component, createRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { UsuarioCRUD } from "../Consulta";

class NewUsuario extends Component {
  UsuarioRef = createRef();
  PasswordaRef = createRef();
  NombreRef = createRef();
  ApellidoRef = createRef();
  PerfilRef = createRef();
  EmailRef = createRef();
  RepetirContraseñaRef = createRef();

  state = {
/*     NewUser: {}, */
    mostrar: "",
  };

  recibirformulario = async (e) => {
    e.preventDefault();

    this.setState({ mostrar: "" });

    if (
      this.PasswordaRef.current.value ===
      this.RepetirContraseñaRef.current.value
    ) {
      if (e.target[7].value === "Ingresar") {
        const BaseBody = {
          Usuario: this.UsuarioRef.current.value,
          Nombre: this.NombreRef.current.value,
          Apellido: this.ApellidoRef.current.value,
          Email: this.EmailRef.current.value,
          Perfil: this.PerfilRef.current.value,
          Password: this.PasswordaRef.current.value,
        };

        const Base = { Posicion: "AgregarUsuario", Datos: BaseBody };

        const result = await UsuarioCRUD(Base);

        if (result.estado === "Correcto") {
          this.props.Cerrar("");
          this.props.Actualizar();
        } else {
          this.setState({ mostrar: result.estado });
        }
      } else {
        const BaseBody = {
          ID: this.props.Editar.msj[0].ID,
          Usuario: this.UsuarioRef.current.value,
          Nombre: this.NombreRef.current.value,
          Apellido: this.ApellidoRef.current.value,
          Email: this.EmailRef.current.value,
          Perfil: this.PerfilRef.current.value,
          Password: this.PasswordaRef.current.value,
        };
        const Base = { Posicion: "ActualizarUsuario", Datos: BaseBody };
        const result = await UsuarioCRUD(Base);

        if (result.estado === "Correcto") {
          this.props.Cerrar("");
          this.props.Actualizar();
        } else {
          this.setState({ mostrar: result.estado });
        }
      }
    } else {
      this.setState({ mostrar: "contraseñas no coinciden." });
    }
  };

  cierre = (e) => {
    e.preventDefault();
    this.props.Cerrar("");
  };

  componentDidMount() {
    let datos = this.props.Editar;
    if (datos) {
      const {
        Apellido,
        Email,
        /*   ID, */
        Nombre,
        Pass,
        Perfil,
        Usuario,
      } = datos.msj[0];

      document.getElementsByName("Usuario")[0].value = Usuario;
      document.getElementsByName("Nombre")[0].value = Nombre;
      document.getElementsByName("Apellido")[0].value = Apellido;
      document.getElementsByName("Email")[0].value = Email;
      document.getElementsByName("Perfil")[0].value = Perfil;
      document.getElementsByName("Contraseña")[0].value = Pass;
      document.getElementsByName("Usuario")[0].value = Usuario;
      document.getElementsByName("boton")[0].value = "Actualizar";
    }
  }

  render() {
    const element = <FontAwesomeIcon icon={faTimes} />;
    return (
      <div className="contenedor-Agregar-Usuario">
        <div className="Ventana_Agregar">
          <div className="usuariotituloycierre">
            <h1>Crear Usuario</h1>
            <a href="!#">
              <i className="" onClick={this.cierre}>
                {element}
              </i>
            </a>
          </div>

          <form
            className="Crear_Usuario_formulario"
            onSubmit={this.recibirformulario}
          >
            <div>
              <label className="grupo_formulario">Usuario: </label>
            </div>

            <div>
              <input
                type="text"
                name="Usuario"
                className="txt"
                ref={this.UsuarioRef}
              />
            </div>

            <div>
              <label className="grupo_formulario">Nombre: </label>
            </div>

            <div>
              <input
                type="text"
                name="Nombre"
                className="txt"
                ref={this.NombreRef}
              />
            </div>

            <div>
              <label className="grupo_formulario">Apellido: </label>
            </div>

            <div>
              <input
                type="text"
                name="Apellido"
                className="txt"
                ref={this.ApellidoRef}
              />
            </div>

            <div>
              <label className="grupo_formulario">Email: </label>
            </div>

            <div>
              <input
                type="text"
                name="Email"
                className="txt"
                ref={this.EmailRef}
              />
            </div>

            <div>
              <label className="grupo_formulario">Perfil: </label>
            </div>

            <div>
              <select
                name="Perfil"
                className="txt ancho"
                defaultValue="2"
                ref={this.PerfilRef}
              >
                <option value="1">Administrador</option>
                <option value="2">Usuario</option>
              </select>
            </div>

            <div>
              <label className="grupo_formulario">Contraseña: </label>
            </div>

            <div>
              <input
                type="text"
                name="Contraseña"
                className="txt"
                ref={this.PasswordaRef}
              />
            </div>
            <div>
              <label className="grupo_formulario">Repetir Contraseña: </label>
            </div>

            <div>
              <input
                type="text"
                className="txt"
                name="RepetirContraseña "
                ref={this.RepetirContraseñaRef}
              />
            </div>
            <div></div>

            <div className="btn-completo">
              <input
                type="submit"
                className="btn"
                name="boton"
                value="Ingresar"
              />
            </div>
          </form>
          <h6>{this.state.mostrar}</h6>
        </div>
      </div>
    );
  }
}

export default NewUsuario;
