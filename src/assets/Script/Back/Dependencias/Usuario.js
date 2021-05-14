const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:root@127.0.0.1:3306/DWH"); 
const {CodificarToken } = require('./Seguridad');

module.exports = {
  ValidarUsuario: (Usuario) => {
    const Resultado = sequelize
      .query('select Usuario from USUARIO where Usuario = "' + Usuario + '"', {
        type: sequelize.QueryTypes.SELECT,
      })
      .catch((error) => {
      });
    return Resultado;
  },

  InsertarUsuario: (reg, res) => {
    const {
      Usuario,
      Nombre,
      Apellido,
      Email,
      Perfil,
      Password,
    } = reg.body.Datos; 

    sequelize
      .query(
        'insert into USUARIO (Usuario, Nombre, Apellido, Email, Perfil, Pass) VALUES ("' +
          Usuario +
          '", "' +
          Nombre +
          '", "' +
          Apellido +
          '", "' +
          Email +
          '", "' +
          Perfil +
          '", "' +
          Password +
          '" )',
        { type: sequelize.QueryTypes.INSERT }
      )
      .then((RespuestaInsertar) => {
        const ID_Usuario = RespuestaInsertar[0];
        const Token = CodificarToken(ID_Usuario, Perfil);
        Token
          ? res.json({ estado: "Correcto", msj: Token })
          : res.json({ estado: "Fallo", msj: "Usuario NO Guardado" });
      })
      .catch((error) => {
        res.json({ estado: " Error ", msj: error });
      });
  },

  validarUsuarioPassword: (reg, res) => {
    const { Usuario, Password } = reg.body;

    sequelize
      .query(
        'select ID,Perfil from USUARIO where Usuario = "' +
          Usuario +
          '" && Pass = "' +
          Password +
          '"',
        { type: sequelize.QueryTypes.SELECT }
      )
      .then((RespuestaValidar) => {
        if (RespuestaValidar.length === 1) {
          const { Perfil, ID } = RespuestaValidar[0];

          const Token = CodificarToken(ID, Usuario, Perfil);
          console.log(Perfil);
          if (Perfil === "1") {
            Token
              ? res.json({ estado: "Correcto", msj: Token, permiso: true })
              : res.json({ estado: "Fallo", msj: "Usuario NO Autenticado" });
          } else {
            Token
              ? res.json({ estado: "Correcto", msj: Token, permiso: false })
              : res.json({ estado: "Fallo", msj: "Usuario NO Autenticado" });
          }
        } else {
          res.json({ estado: "Usuario Ò Contraseña Invalido" });
        }
      })
      .catch((error) => {
        res.json({ estado: " Error ", msj: error });
      });
  },

  MostrarUsuarios: (reg, res) => {
   
    sequelize
      .query("select * from USUARIO ", { type: sequelize.QueryTypes.SELECT })
      .then((MostrarUsuario) => {
        MostrarUsuario.length === 0
          ? res.json({ estado: "Fallo",msj:"NO Hay Usuarios Registrados" })
          : res.json({ estado: "Correcto", msj:MostrarUsuario });
      })
      .catch((error) => {
        res.json({ estado: "Fallo", msj:" Error: " + error });
      });
  },




  MostrarUsuario: (reg, res) => {
  
    const { ID} = reg.body;
    sequelize
      .query("select * from USUARIO where ID = "+ID+" ;", { type: sequelize.QueryTypes.SELECT })
      .then((MostrarUsuario) => {
        MostrarUsuario.length === 0
          ? res.json({ estado: "Fallo",msj:"NO Hay Usuarios Registrados" })
          : res.json({ estado: "Correcto", msj:MostrarUsuario });
      })
      .catch((error) => {
        res.json({ estado: "Fallo", msj:" Error: " + error });
      });
  },



  EliminarUsuario: (reg, res) => {
    const { ID } = reg.body;

    sequelize
      .query("delete from USUARIO where ID = " + ID + "", {
        type: sequelize.QueryTypes.Delete,
      })
      .then((RespuestaEliminar) => {
        const { affectedRows } = RespuestaEliminar[0];

        affectedRows === 1
          ? res.json({estado: "Correcto" , msj:"USUARIO Eliminado Correctamente" })
          : res.json({ estado: "Fallo" , msj:"USUARIO NO Existe Ó Ya Fue Eliminado" });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      });
  },

  ActualizarUsuario: (reg, res) => {
     const {
      ID,
      Usuario,
      Nombre,
      Apellido,
      Email,
      Perfil,
      Password,
    } = reg.body.Datos; 

    sequelize
      .query(
        'update USUARIO set Usuario = "' +
          Usuario +
          '", Nombre = "' +
          Nombre +
          '", Apellido ="' +
          Apellido +
          '", Email = "' +
          Email +
          '", Perfil = "' +
          Perfil +
          '", pass = "' +
          Password +
          '" where ID = ' +
          ID +
          "",
        { type: sequelize.QueryTypes.UPDATE }
      )
      .then((RespuestaActualizar) => {
        RespuestaActualizar[RespuestaActualizar.length - 1] === 1
          ? res.json({ estado: "Correcto" , msj:"Usuario Actualizado Correctamente" })
          : res.json({
              estado: "Fallo",msj: "Usuario NO Fue Actualizado Ó Usuario NO Existe",
            });
      })
      .catch((error) => {
        res.json({ estado: " Error: " + error });
      }); 
  },
};