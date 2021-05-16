const CONSTANTS = {
  //APIKEY: "Ff19ygaLzNZSsZhE8C9ECIN3zhUdqqHP",
  BASE_PATH: "http://localhost:2009",

  LOGUIN: "/inicio",
  MOSTRARREGION: "/MostrarRegion",
  MOSTRARPC: "/MostrarPC",
  AGREGARRPC: "/AgregarRPC",
  ELIMINARPC: "/Eliminar",
  EDITARARPC: "/Editar",
  VALIDARCIUDADCOMPA: "/ValidaEmpresa",
  MOSTRAREMP: "/MostrarEmpresas",
  AGREGAREMPRESAS: "/AgregarEmpresas",
  ELIMINAREMPRESAS: "/EliminarEmpresas",
  MOSTRAREDITAREMPRESAS: "/MostrarEditarEmpresas",
  EDITAREMPRESAS: "/EditarEmpresas",
  NOMBREEMPRESAS: "/NombreEmpresas",
  AGREGARCONTACTO: "/AgregarContacto",
  AGREGARCANAL: "/AgregarCanal",
  EDITARCONTACTO: "/EditarContacto",
  MOSTRARCONTACTOS: "/MostrarContactos",
  MOSTRARCONTACTOSANAL: "/MostrarContactosChannel",
  BUSCADORDECONTACTOS: "/BuscarContactos",
  BUSCARUNCONTACTO: "/BuscarUnContactos",
  MOSTRARCONTACTOSANALTODOS: "/MostrarContactosCanalTodos",
  ACTUALIZARELIMINARCANAL: "/ActualizarEliminarCanal",
  ELIMINARUNCONTACTO: "/EliminarUnContacto",
  INSERTUSER: "/InsertUser",
  MOSTRARUSUARIO: "/MostrarUsuarios",
  EDITARUSUARIO: "/EditarUsuario",
  ACTUALIZARUSUARIO: "/ActualizarUsuario",
  ELIMINARUSUARIO: "/EliminarUsuario",

  POST: "POST",
  GET: "GET",
  DELETE: "DELETE",
  PUT: "PUT",
};

//llamado////////////////////////////////////////////
async function LlamadoGet(Rutafetch, method) {
  const Resultado = await fetch(Rutafetch, {
    mode: "cors",
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    })
    .catch((erores) => console.error("Error:", erores));
  return Resultado;
}

async function Llamado(Rutafetch, method, BaseBody = "") {
  const Resultado = await fetch(Rutafetch, {
    mode: "cors",
    method: method,
    body: JSON.stringify(BaseBody),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    })
    .catch((erores) => console.error("Error:", erores));
  return Resultado;
}

module.exports = {
  
///////agregar un usuario/////////////////////////
  UsuarioCRUD: async (BaseBody) => {
    let Rutafetch = "";
    let method = "";
    let respuesta = {};

    switch (BaseBody.Posicion) {
      case "MostrarUsuarios":
        Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.MOSTRARUSUARIO;
        method = CONSTANTS.GET;
        respuesta = await LlamadoGet(Rutafetch, method);
        break;

      case "MostrarEditarUsuario":
        Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.EDITARUSUARIO;
        method = CONSTANTS.POST;
        respuesta = await Llamado(Rutafetch, method, BaseBody);
        break;

      case "AgregarUsuario":
        Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.INSERTUSER;
        method = CONSTANTS.POST;
        respuesta = await Llamado(Rutafetch, method, BaseBody);
        break;

      case "ActualizarUsuario":
        Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.ACTUALIZARUSUARIO;
        method = CONSTANTS.PUT;
        respuesta = await Llamado(Rutafetch, method, BaseBody);
        break;

      case "EliminarUsuario":
        Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.ELIMINARUSUARIO;
        method = CONSTANTS.DELETE;
        respuesta = await Llamado(Rutafetch, method, BaseBody);

        break;

      default:
        break;
    }

    return respuesta;
  },

 //////////ingresar al sistema/////////
  login: async (BaseBody) => {
    const Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.LOGUIN;
    const method = CONSTANTS.POST;
    const respuesta = await Llamado(Rutafetch, method, BaseBody);
    return respuesta;
  },

  /////////////consulta///////////////////////
  ConsultarRPC: async (BaseBody) => {
    let Rutafetch = "";
    let method = "";
    let respuesta = "";

    switch (BaseBody.Posicion) {
      case "Region":
        Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.MOSTRARREGION;
        method = CONSTANTS.GET;
        respuesta = await LlamadoGet(Rutafetch, method);
        break;

      case "Pais":
        Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.MOSTRARPC;
        method = CONSTANTS.POST;
        respuesta = await Llamado(Rutafetch, method, BaseBody);
        break;

      default:
        Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.MOSTRARPC;
        method = CONSTANTS.POST;
        respuesta = await Llamado(Rutafetch, method, BaseBody);
        break;
    }
    return respuesta;
  },

  /////////agregar////////////////////////
  AgregarRPC: async (BaseBody) => {
    const method = CONSTANTS.POST;
    const Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.AGREGARRPC;
    const respuesta = await Llamado(Rutafetch, method, BaseBody);
    return respuesta;
  },

  /////////delete///////////////////////////////////7
  EliminarPC: async (BaseBody) => {
    const method = CONSTANTS.POST;
    const Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.ELIMINARPC;
    const respuesta = await Llamado(Rutafetch, method, BaseBody);
    return respuesta;
  },

  ///////////////update//////////////////
  EditarPC: async (BaseBody) => {
    const method = CONSTANTS.POST;
    const Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.EDITARARPC;
    const respuesta = await Llamado(Rutafetch, method, BaseBody);
    return respuesta;
  },

  /////////////////////validar ciudad ////////////
  EmpresaCRUD: async (BaseBody) => {
    let Rutafetch = "";
    let method = "";
    let respuesta = {};
    switch (BaseBody.Posicion) {
      case "ValidarRegionCompa":
        Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.VALIDARCIUDADCOMPA;
        method = CONSTANTS.GET;
        respuesta = await LlamadoGet(Rutafetch, method);

        break;

      case "MostrarEmpresas":
        Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.MOSTRAREMP;
        method = CONSTANTS.GET;
        respuesta = await LlamadoGet(Rutafetch, method);

        break;

      case "GuardarEmpresa":
        Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.AGREGAREMPRESAS;
        method = CONSTANTS.POST;
        respuesta = await Llamado(Rutafetch, method, BaseBody);

        break;

      case "EliminarEmpresa":
        Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.ELIMINAREMPRESAS;
        method = CONSTANTS.POST;
        respuesta = await Llamado(Rutafetch, method, BaseBody);

        break;

      case "MostrarEditarEmpresa":
        Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.MOSTRAREDITAREMPRESAS;
        method = CONSTANTS.POST;
        respuesta = await Llamado(Rutafetch, method, BaseBody);

        break;

      case "EditarEmpresa":
        Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.EDITAREMPRESAS;
        method = CONSTANTS.POST;
        respuesta = await Llamado(Rutafetch, method, BaseBody);
        break;

      case "NombreEmpresa":
        Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.NOMBREEMPRESAS;
        method = CONSTANTS.GET;
        respuesta = await LlamadoGet(Rutafetch, method);
        break;

      default:
        break;
    }
    return respuesta;
  },

 
  AgregarContacto: async (BaseBody) => {
    const method = CONSTANTS.POST;
    const Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.AGREGARCONTACTO;
    const respuesta = await Llamado(Rutafetch, method, BaseBody);
    return respuesta;
  },


  AgregarCanal: async (BaseBody) => {
    const method = CONSTANTS.POST;
    const Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.AGREGARCANAL;
    const respuesta = await Llamado(Rutafetch, method, BaseBody);
    return respuesta;
  },

  EditarContacto: async (BaseBody) => {
    const method = CONSTANTS.PUT;
    const Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.EDITARCONTACTO;
    const respuesta = await Llamado(Rutafetch, method, BaseBody);
    return respuesta;
  },

  //agregar contacto
  BuscarContactos: async () => {
    const method = CONSTANTS.GET;
    const Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.MOSTRARCONTACTOS;
    const respuesta = await LlamadoGet(Rutafetch, method);
    return respuesta;
  },

  BuscarContactosCanal: async (BaseBody) => {
    const method = CONSTANTS.POST;
    const Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.MOSTRARCONTACTOSANAL;
    const respuesta = await Llamado(Rutafetch, method, BaseBody);
    return respuesta;
  },

  BuscadorContactos: async (BaseBody) => {
    const method = CONSTANTS.POST;
    const Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.BUSCADORDECONTACTOS;
    const respuesta = await Llamado(Rutafetch, method, BaseBody);
    return respuesta;
  },

  BuscarUnContacto: async (BaseBody) => {
    const method = CONSTANTS.POST;
    const Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.BUSCARUNCONTACTO;
    const respuesta = await Llamado(Rutafetch, method, BaseBody);
    return respuesta;
  },

  BuscarContactosCanalTodos: async (BaseBody) => {
    const method = CONSTANTS.POST;
    const Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.MOSTRARCONTACTOSANALTODOS;
    const respuesta = await Llamado(Rutafetch, method, BaseBody);
    return respuesta;
  },

  ActualizarEliminarCanal: async (BaseBody) => {
    const method = CONSTANTS.POST;
    const Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.ACTUALIZARELIMINARCANAL;
    const respuesta = await Llamado(Rutafetch, method, BaseBody);
    return respuesta;
  },

  EliminarUnContacto: async (BaseBody) => {
    const method = CONSTANTS.POST;
    const Rutafetch = CONSTANTS.BASE_PATH + CONSTANTS.ELIMINARUNCONTACTO;
    const respuesta = await Llamado(Rutafetch, method, BaseBody);
    return respuesta;
  },
};
