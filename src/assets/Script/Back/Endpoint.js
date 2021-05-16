const express = require("express");
const PORT = 2009;
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
app.post("/inicio", ValidarDatosIngresadoslogin, validarUsuarioPassword);
app.post("/InsertUser", ValidarDatosIngresoRegistro, InsertarUsuario);
app.get("/MostrarRegion", MostrarBDRPC);
app.post("/MostrarPC", MostrarBDRPC);
app.post("/AgregarRPC", ValidarRPC, AgregarRPC);
app.post("/Eliminar", EliminarPC);
app.post("/Editar", ValidarRPC, EditarPC);
app.get("/ValidaEmpresa", ValidarRegionCompa);
app.post("/AgregarEmpresas", AgregarEmpresa);
app.get("/MostrarEmpresas", MostrarEmpresas);
app.post("/EliminarEmpresas", EliminarEmpresa);
app.post("/MostrarEditarEmpresas", MostrarEditarEmpresa);
app.post("/EditarEmpresas", EditarEmpresa);
app.get("/NombreEmpresas", MostrarNombreEmpresa);
app.put("/EditarContacto", ActualizarContacto);
app.post("/AgregarContacto", AgregarContacto);
app.post("/AgregarCanal", AgregarCanal);
app.get("/MostrarContactos", MostrarContactos);
app.post("/MostrarContactosChannel", MostrarContactosCanal);
app.post("/BuscarContactos", BuscarContactos);
app.post("/BuscarUnContactos", BuscarUnContacto);
app.post("/MostrarContactosCanalTodos", MostrarContactosCanalTodos);
app.post("/ActualizarEliminarCanal", ActualizarEliminarCanal);
app.post("/EliminarUnContacto", EliminarUnContacto);
app.get("/MostrarUsuarios", MostrarUsuarios);
app.post("/EditarUsuario", MostrarUsuario);
app.put("/ActualizarUsuario", ActualizarUsuario);
app.delete("/EliminarUsuario", EliminarUsuario);

app.listen(PORT, () => {
  console.log("servidor escuchando en el puerto " + PORT);
});
