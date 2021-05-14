import React, { Component, createRef } from "react";

import "../../../style/Style.css";

import { login } from "../Consulta";

import Header from "./HaderLogo";

class Login extends Component {
  UsuarioRef = createRef();
  PasswordaRef = createRef();

  state = {
    Login: {},
  };

  recibirformulario = async (e) => {
    e.preventDefault();

    const BaseBody = {
      Usuario: this.UsuarioRef.current.value,
      Password: this.PasswordaRef.current.value,
    };

    const result = await login(BaseBody);
    await this.setState({
      Login: { result },
    });

    if ((await result.estado) === "Correcto") {
      localStorage.setItem("key", JSON.stringify(result.msj));
      this.props.history.push("/Home");
    }
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <main className="main_login">
          <section id="Login">
            <h1>Bienvenido</h1>
            <form
              className="login_formulario"
              onSubmit={this.recibirformulario}
            >
              <div>
                <label className="grupo_formulario">Usuario</label>
                <br></br>
                <input
                  type="text"
                  name="Usuario"
                  className="txt"
                  ref={this.UsuarioRef}
                />
              </div>

              <div>
                <label className="grupo_formulario">Contraseña</label>
                <br></br>
                <input
                  type="text"
                  name="Contraseña"
                  className="txt"
                  ref={this.PasswordaRef}
                />
              </div>

              <div>
                <input
                  className="btn_Ingresar"
                  type="submit"
                  value="Ingresar"
                />
              </div>
            </form>
          </section>
        </main>
      </React.Fragment>
    );
  }
}

export default Login;
