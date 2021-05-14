import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "../src/assets/Script/Front/Componentes/Login";
import Error from "../src/assets/Script/Front/Componentes/Error";
import Home from "../src/assets/Script/Front/Componentes/Home";
import Usuarios from "../src/assets/Script/Front/Componentes/Usuarios";
import Region from "../src/assets/Script/Front/Componentes/Region";
import Campanas from "../src/assets/Script/Front/Componentes/Compa";
import Contactos from "../src/assets/Script/Front/Componentes/Contactos";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
          {/*CONFIGURAR RUTAS Y PAGINAS */}
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/Home" component={Home} />
            <Route exact path="/Usuario" component={Usuarios} />
            <Route exact path="/Region" component={Region} />
            <Route exact path="/Compa" component={Campanas} />
            <Route exact path="/Contactos" component={Contactos} />
            <Route component={Error} />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
