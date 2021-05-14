 const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:root@127.0.0.1:3306/DWH");

module.exports = {

  ValidarRegionCompa: (reg, res) => {
    sequelize
      .query("select * from Ciudad", {
        type: sequelize.QueryTypes.SELECT,
      })
      .then((Respuesta) => {
        Respuesta.length == 0
          ? res.json({ estado: "Fallo", msj: "No hay Ciudad Guardadas" })
          : res.json({ estado: "Correcto", msj: Respuesta });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },

  MostrarBDRPC: (reg, res) => {
    let Etiqueta = "";

    reg.body.Posicion !== undefined
      ? (Etiqueta = reg.body.Posicion)
      : (Etiqueta = "Region");

    let value = "";

    switch (Etiqueta) {
      case "Ciudad":
        value = "where ID_Pais = " + reg.body.IDPais;
        break;

      case "Pais":
        value = "where ID_Region = " + reg.body.IDRegion;
        break;

      default:
        value = "";
        break;
    }

    sequelize
      .query("select * from " + Etiqueta + " " + value, {
        type: sequelize.QueryTypes.SELECT,
      })
      .then((Respuesta) => {
        Respuesta.length == 0
          ? res.json({ estado: "Fallo", msj: " No hay Paises Guardadas" })
          : res.json({ estado: "Correcto", msj: Respuesta });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },

  ValidarBDRPC: (Etiqueta, fila, NombreRegion) => {
    const result = sequelize.query(
      "select ID from " +
        Etiqueta +
        " where " +
        fila +
        ' = "' +
        NombreRegion +
        '"',
      { type: sequelize.QueryTypes.SELECT }
    );

    return result;
  },

  AgregarRPC: (reg, res) => {
    const { Etiqueta } = reg.body;

    let values = "";
    let filas = "";

    switch (Etiqueta) {
      case "Region":
        const { NombreRegion } = reg.body;
        filas = "(NombreRegion)";
        values = '"' + NombreRegion + '"';
        break;

      case "Pais":
        const { NombrePais, ID_Region } = reg.body;
        filas = "(NombrePais,ID_Region)";
        values = '"' + NombrePais + '",' + ID_Region;
        break;

      default:
        const { NombreCiudad, ID_Pais } = reg.body;
        filas = "(NombreCiudad,ID_Pais)";
        values = '"' + NombreCiudad + '",' + ID_Pais;
        break;
    }

    sequelize
      .query(
        "insert into " + Etiqueta + " " + filas + " VALUES (" + values + ")",
        { type: sequelize.QueryTypes.INSERT }
      )
      .then((Resultado) => {
        Resultado.length == 0
          ? res.json({ estado: "Fallo", msj: "No Se Guardo " + Etiqueta })
          : res.json({ estado: "Correcto", msj: Resultado });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },

  EliminarPC: (reg, res) => {
    const { ETIQUETA, ID } = reg.body;

    switch (ETIQUETA) {
      case "Pais":
        sequelize
          .query("delete from " + ETIQUETA + " where ID = " + ID, {
            type: sequelize.QueryTypes.Delete,
          })
          .then((Resultado) => {
            const { affectedRows } = Resultado[0];
            if (affectedRows == 1) {
              sequelize
                .query("delete from Ciudad where ID_Pais = " + ID, {
                  type: sequelize.QueryTypes.Delete,
                })
                .then((Resultado) => {
                  const { affectedRows } = Resultado[0];
                  affectedRows >= 0
                    ? res.json({ estado: "Correcto", msj: Resultado })
                    : res.json({
                        estado: "Fallo",
                        msj: "No Se Elimino " + ETIQUETA,
                      });
                })
                .catch((error) => {
                  res.json({ estado: " Error en Pais: " + error });
                });
            }
          })
          .catch((error) => {
            res.json({ estado: " Error en Ciudad: " + error });
          });
        break;

      default:
        sequelize
          .query("delete from Ciudad where ID = " + ID, {
            type: sequelize.QueryTypes.Delete,
          })
          .then((Resultado) => {
            const { affectedRows } = Resultado[0];
            affectedRows == 1
              ? res.json({ estado: "Correcto", msj: Resultado })
              : res.json({
                  estado: "Fallo",
                  msj: "No Se Elimino " + ETIQUETA,
                });
          })
          .catch((error) => {
            res.json({ estado: " Error en Ciudad: " + error });
          });
        break;
    }
  },

  EditarPC: (reg, res) => {
    const { Etiqueta, NOMBRE, ID } = reg.body;
    let fila = "";

    switch (Etiqueta) {
      case "Pais":
        fila = "NombrePais";
        break;

      default:
        fila = "NombreCiudad";
        break;
    }

    sequelize
      .query(
        "update " +
          Etiqueta +
          " set " +
          fila +
          ' = "' +
          NOMBRE +
          '" where ID = ' +
          ID +
          "",
        { type: sequelize.QueryTypes.UPDATE }
      )
      .then((Resultado) => {
        Resultado.length == 0
          ? res.json({ estado: "Fallo", msj: "No Se Guardo " + Etiqueta })
          : res.json({ estado: "Correcto", msj: Resultado });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },
};
