const express = require("express");
const PORT = 3001;
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const { Conexion } = require("./Servicios/Conexion");
const {
  InsertarUsuario,
  validarUsuarioPassword,
  MostrarUsuarios,
  MostrarUsuario,
  EliminarUsuario,
  ActualizarUsuario,
} = require("./Dependencias/Usuario");

const {
  AgregarEmpresa,
  MostrarEmpresas,
  EliminarEmpresa,
  MostrarEditarEmpresa,
  EditarEmpresa,
  MostrarNombreEmpresa,
} = require("./Dependencias/DatosEmpresa");

const {
  AgregarContacto,
  AgregarCanal,
  ActualizarContacto,
  ActualizarEliminarCanal,
  EliminarUnContacto,
  MostrarContactos,
  BuscarUnContacto,
  MostrarContactosCanal,
  MostrarContactosCanalTodos,
  BuscarContactos,
} = require("./Dependencias/DatosContacto");

const {
  ValidarDatosIngresoRegistro,
  ValidarDatosIngresadoslogin,
  ValidarRPC,
} = require("./Dependencias/Middleware");

const {
  AgregarRPC,
  MostrarBDRPC,
  EliminarPC,
  EditarPC,
  ValidarRegionCompa,
} = require("./Dependencias/DatosRegion");

Conexion();
app.post("/Login", ValidarDatosIngresadoslogin, validarUsuarioPassword);
app.post("/InsertUser", ValidarDatosIngresoRegistro, InsertarUsuario);
app.get("/Mostrar-R", MostrarBDRPC);
app.post("/Mostrar-PC", MostrarBDRPC);
app.post("/Agregar-RPC", ValidarRPC, AgregarRPC);
app.post("/Eliminar-PC", EliminarPC);
app.post("/Editar-PC", ValidarRPC, EditarPC);
app.get("/Validad-Empresa", ValidarRegionCompa);
app.post("/Agregar-Empresas", AgregarEmpresa);
app.get("/Mostrar-Empresas", MostrarEmpresas);
app.post("/Eliminar-Empresas", EliminarEmpresa);
app.post("/Mostrar-Editar-Empresas", MostrarEditarEmpresa);
app.post("/Editar-Empresas", EditarEmpresa);
app.get("/Nombre-Empresas", MostrarNombreEmpresa);
app.put("/Editar_Contacto", ActualizarContacto);
app.post("/Agregar-Contacto", AgregarContacto);
app.post("/Agregar-Canal", AgregarCanal);
app.get("/Mostrar_Contactos", MostrarContactos);
app.post("/Mostrar_Contactos_Canal", MostrarContactosCanal);
app.post("/Buscar_Contactos", BuscarContactos);
app.post("/Buscar_Un_Contactos", BuscarUnContacto);
app.post("/Mostrar_Contactos_Canal_Todos", MostrarContactosCanalTodos);
app.post("/Actualizar_Eliminar_Canal", ActualizarEliminarCanal);
app.post("/Eliminar_Un_Contacto", EliminarUnContacto);
app.get("/Mostrar_Usuarios", MostrarUsuarios);
app.post("/Editar_Usuario", MostrarUsuario);
app.put("/Actualizar_Usuario", ActualizarUsuario);
app.delete("/Eliminar_Usuario", EliminarUsuario);

app.listen(PORT, () => {
  console.log("servidor escuchando en el puerto " + PORT);
});
