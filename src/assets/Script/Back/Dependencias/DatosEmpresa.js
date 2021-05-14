const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:root@127.0.0.1:3306/DWH");
module.exports = {
  AgregarEmpresa: (reg, res) => {
    const {
      NombreEmpresa,
      Direccion,
      Email,
      Telefono,
      ID_Region,
      ID_Pais,
      ID_Ciudad,
    } = reg.body;

    sequelize
      .query(
        "insert into EMPRESA (NombreEmpresa,Direccion,Email,Telefono,ID_Region,ID_Pais,ID_Ciudad) VALUES ('" +
          NombreEmpresa +
          "','" +
          Direccion +
          "','" +
          Email +
          "','" +
          Telefono +
          "','" +
          ID_Region +
          "','" +
          ID_Pais +
          "','" +
          ID_Ciudad +
          "')",
        { type: sequelize.QueryTypes.INSERT }
      )
      .then((Resultado) => {
        Resultado.length == 0
          ? res.json({ estado: "Fallo", msj: "No Se Guardo " })
          : res.json({ estado: "Correcto", msj: Resultado });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },

  MostrarEmpresas: (reg, res) => {
    sequelize
      .query(
        "select EMPRESA.ID,EMPRESA.NombreEmpresa, PAIS.NombrePais, EMPRESA.Direccion from EMPRESA  INNER JOIN PAIS on EMPRESA.ID_Pais=PAIS.ID",
        { type: sequelize.QueryTypes.SELECT }
      )
      .then((Respuesta) => {
        Respuesta.length == 0
          ? res.json({ estado: "Fallo", msj: "No Hay Empresas Guardadas" })
          : res.json({ estado: "Correcto", msj: Respuesta });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },

  EliminarEmpresa: (reg, res) => {
    const { ID } = reg.body;

    sequelize
      .query("delete from EMPRESA where ID = " + ID, {
        type: sequelize.QueryTypes.Delete,
      })
      .then((Resultado) => {
        const { affectedRows } = Resultado[0];
        affectedRows == 1
          ? res.json({ estado: "Correcto", msj: Resultado })
          : res.json({
              estado: "Fallo",
              msj: "No Se Elimino EMPRESA",
            });
      })
      .catch((error) => {
        res.json({ estado: " Error en Ciudad: " + error });
      });
  },

  MostrarEditarEmpresa: (reg, res) => {
    const { ID } = reg.body;
    sequelize
      .query("select * from EMPRESA where ID=" + ID, {
        type: sequelize.QueryTypes.SELECT,
      })
      .then((Respuesta) => {
        Respuesta.length == 0
          ? res.json({ estado: "Fallo", msj: "No Hay Empresas Guardadas" })
          : res.json({ estado: "Correcto", msj: Respuesta });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },

  EditarEmpresa: (reg, res) => {
    const {
      ID,
      NombreEmpresa,
      Direccion,
      Email,
      Telefono,
      ID_Region,
      ID_Pais,
      ID_Ciudad,
    } = reg.body;

    sequelize
      .query(
        "update EMPRESA set NombreEmpresa = '" +
          NombreEmpresa +
          "' , Direccion = '" +
          Direccion +
          "' , Email = '" +
          Email +
          "' , Telefono = '" +
          Telefono +
          "' , ID_Region = '" +
          ID_Region +
          "' , ID_Pais = '" +
          ID_Pais +
          "', ID_Ciudad = '" +
          ID_Ciudad +
          "' where ID = " +
          ID,
        {
          type: sequelize.QueryTypes.UPDATE,
        }
      )
      .then((Respuesta) => {
        Respuesta.length == 0
          ? res.json({ estado: "Fallo", msj: "No Se Edito" })
          : res.json({ estado: "Correcto", msj: Respuesta });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },

  MostrarNombreEmpresa: (reg, res) => {
    sequelize
      .query("select ID,NombreEmpresa from EMPRESA", {
        type: sequelize.QueryTypes.SELECT,
      })
      .then((Respuesta) => {
        Respuesta.length == 0
          ? res.json({ estado: "Fallo", msj: "No Hay Empresas Guardadas" })
          : res.json({ estado: "Correcto", msj: Respuesta });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },
};
