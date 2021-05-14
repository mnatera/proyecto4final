const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:root@127.0.0.1:3306/DWH");
 

module.exports = {
  AgregarContacto: (reg, res) => {
    const {
      NombreContacto,
      ApellidoContacto,
      CargoContacto,
      EmailContacto,
      ID_CompañiaContacto,
      ID_RegionContacto,
      ID_PaisContacto,
      ID_CiudadContacto,
      DireccionContacto,
      InteresContacto,
      Foto,
    } = reg.body;

    sequelize
      .query(
        "insert into CONTACTO (NombreContacto,ApellidoContacto,Cargo,Email,ID_Empresa,ID_Region,ID_Pais,ID_Ciudad,Direccion,Interes,Foto) VALUES ('" +
          NombreContacto +
          "','" +
          ApellidoContacto +
          "','" +
          CargoContacto +
          "','" +
          EmailContacto +
          "','" +
          ID_CompañiaContacto +
          "','" +
          ID_RegionContacto +
          "','" +
          ID_PaisContacto +
          "','" +
          ID_CiudadContacto +
          "','" +
          DireccionContacto +
          "','" +
          InteresContacto +
          "','" +
          Foto +
          "')",
        { type: sequelize.QueryTypes.INSERT }
      )
      .then((Resultado) => {
        Resultado.length === 0
          ? res.json({ estado: "Fallo", msj: "No Se Guardo " })
          : res.json({ estado: "Correcto", msj: Resultado });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },

  AgregarCanal: (reg, res) => {
    const { Canal, Cuenta, Preferencia, ID_Contacto } = reg.body;

    sequelize
      .query(
        "insert into CANAL (Canal,Cuenta,Preferencia,ID_Contacto) VALUES ('" +
          Canal +
          "','" +
          Cuenta +
          "','" +
          Preferencia +
          "','" +
          ID_Contacto +
          "')",
        { type: sequelize.QueryTypes.INSERT }
      )

      .then((Resultado) => {
        Resultado.length === 0
          ? res.json({ estado: "Fallo", msj: "No Se Guardo" })
          : res.json({ estado: "Correcto", msj: Resultado });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },

  MostrarContactos: (reg, res) => {
    //console.log(reg.body);
    sequelize
      .query(
        "select CONTACTO.ID,CONTACTO.Foto, CONTACTO.NombreContacto,CONTACTO.Interes, CONTACTO.ApellidoContacto, CONTACTO.Cargo, CONTACTO.Email, EMPRESA.NombreEmpresa, REGION.NombreRegion, PAIS.NombrePais from CONTACTO INNER JOIN EMPRESA on CONTACTO.ID_Empresa=EMPRESA.ID INNER JOIN PAIS on CONTACTO.ID_Pais=PAIS.ID INNER JOIN REGION on CONTACTO.ID_Region=REGION.ID ",
        //ORDER BY CONTACTO.NombreContacto DESC
        { type: sequelize.QueryTypes.SELECT }
      )
      .then((Respuesta) => {
        Respuesta.length === 0
          ? res.json({
              estado: "Fallo",
              msj: "No Hay Contactos Guardados Guardadas",
            })
          : res.json({ estado: "Correcto", msj: Respuesta });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },

  MostrarContactosCanal: (reg, res) => {
    const { ID_Contacto } = reg.body;
    sequelize
      .query(
        "select Canal,Cuenta,Preferencia from CANAL where ID_Contacto='" +
          ID_Contacto +
          "' && Preferencia=2;",
        { type: sequelize.QueryTypes.SELECT }
      )
      .then((Respuesta) => {
        Respuesta.length === 0
          ? res.json({ estado: "Fallo", msj: "No Hay Canales Guardados" })
          : res.json({ estado: "Correcto", msj: Respuesta });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },

  MostrarContactosCanalTodos: (reg, res) => {
    const { ID_Contacto } = reg.body;
    sequelize
      .query("select * from CANAL where ID_Contacto='" + ID_Contacto + "';", {
        type: sequelize.QueryTypes.SELECT,
      })
      .then((Respuesta) => {
        Respuesta.length === 0
          ? res.json({ estado: "Fallo", msj: "No Hay Canales Guardados" })
          : res.json({ estado: "Correcto", msj: Respuesta });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },

  BuscarContactos: (reg, res) => {
    const { Parametro } = reg.body;
    let texto = "";

    if (Parametro) {
      texto =
        "select CONTACTO.ID,CONTACTO.Foto, CONTACTO.NombreContacto,CONTACTO.Interes, CONTACTO.ApellidoContacto, CONTACTO.Cargo, CONTACTO.Email, EMPRESA.NombreEmpresa, REGION.NombreRegion, PAIS.NombrePais from CONTACTO INNER JOIN EMPRESA on CONTACTO.ID_Empresa=EMPRESA.ID INNER JOIN PAIS on CONTACTO.ID_Pais=PAIS.ID INNER JOIN REGION on CONTACTO.ID_Region=REGION.ID where " +
        Parametro +
        ";";
    } else {
      texto =
        "select CONTACTO.ID,CONTACTO.Foto, CONTACTO.NombreContacto,CONTACTO.Interes, CONTACTO.ApellidoContacto, CONTACTO.Cargo, CONTACTO.Email, EMPRESA.NombreEmpresa, REGION.NombreRegion, PAIS.NombrePais from CONTACTO INNER JOIN EMPRESA on CONTACTO.ID_Empresa=EMPRESA.ID INNER JOIN PAIS on CONTACTO.ID_Pais=PAIS.ID INNER JOIN REGION on CONTACTO.ID_Region=REGION.ID;";
    }

    sequelize
      .query(texto, { type: sequelize.QueryTypes.SELECT })

      .then((Respuesta) => {
        Respuesta.length === 0
          ? res.json({
              estado: "Fallo",
              msj: "No Hay resultados de tu busqueda",
            })
          : res.json({ estado: "Correcto", msj: Respuesta });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },

  BuscarUnContacto: (reg, res) => {
    const { ID_Contacto } = reg.body;
    sequelize
      .query(
        "select NombreContacto,ApellidoContacto,Cargo,Email,ID_Empresa,ID_Region,ID_Pais,ID_Ciudad,Direccion,Interes,Foto from CONTACTO where ID = " +
          ID_Contacto +
          ";",
        { type: sequelize.QueryTypes.SELECT }
      )

      .then((Respuesta) => {
        Respuesta.length === 0
          ? res.json({
              estado: "Fallo",
              msj: "No Hay resultados de tu busqueda",
            })
          : res.json({ estado: "Correcto", msj: Respuesta });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },

  ActualizarEliminarCanal: (reg, res) => {
    const { Tipo, ID_Canal } = reg.body;

    let BaseSQL = "";
    switch (Tipo) {
      case "Eliminar":
        BaseSQL = "DELETE FROM CANAL WHERE ID=" + ID_Canal + ";";
        break;

      case "Actualizar":
        const { Cuenta, Preferencia, ID_Canal_Nuevo } = reg.body;
        BaseSQL =
          "UPDATE CANAL SET Canal='" +
          ID_Canal_Nuevo +
          "',Cuenta='" +
          Cuenta +
          "',Preferencia='" +
          Preferencia +
          "' WHERE ID='" +
          ID_Canal +
          "';";
        break;
      default:
        break;
    }
    sequelize
      .query(BaseSQL, { type: sequelize.QueryTypes.UPDATE })
      .then((Respuesta) => {
        Respuesta[1] === 0
          ? res.json({
              estado: "Fallo",
              msj: "No se actualizo o NO se Elimino",
            })
          : res.json({ estado: "Correcto" });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },

  EliminarUnContacto: (reg, res) => {
    const { ID } = reg.body;
    sequelize
      .query("DELETE FROM CONTACTO WHERE ID=" + ID + ";", {
        type: sequelize.QueryTypes.UPDATE,
      })
      .then((Respuesta) => {
        Respuesta[1] === 0
          ? res.json({
              estado: "Fallo",
              msj: "NO se Elimino",
            })
          : res.json({ estado: "Correcto" });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },

  ActualizarContacto: (reg, res) => {
    const {
      ID,
      NombreContacto,
      ApellidoContacto,
      CargoContacto,
      EmailContacto,
      ID_CompañiaContacto,
      ID_RegionContacto,
      ID_PaisContacto,
      ID_CiudadContacto,
      DireccionContacto,
      InteresContacto,
      Foto,
    } = reg.body;

    sequelize
      .query(
        "UPDATE CONTACTO SET NombreContacto = '" +
          NombreContacto +
          "', ApellidoContacto = '" +
          ApellidoContacto +
          "', Cargo = '" +
          CargoContacto +
          "', Email = '" +
          EmailContacto +
          "', ID_Empresa = '" +
          ID_CompañiaContacto +
          "', ID_Region = '" +
          ID_RegionContacto +
          "', ID_Pais = '" +
          ID_PaisContacto +
          "', ID_Ciudad = '" +
          ID_CiudadContacto +
          "', Direccion = '" +
          DireccionContacto +
          "', Interes = '" +
          InteresContacto +
          "', Foto = '" +
          Foto +
          "' where ID = " +
          ID +
          ";",
        { type: sequelize.QueryTypes.UPDATE }
      )
      .then((Respuesta) => {

      /*   console.log(Respuesta);
        Respuesta[1] === 0
          ? res.json({
              estado: "Fallo",
              msj: "No se actualizo",
            })
          : */ res.json({ estado: "Correcto" });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },
};
