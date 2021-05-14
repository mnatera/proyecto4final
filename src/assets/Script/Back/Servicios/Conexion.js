
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:root@127.0.0.1:3306/DWH");

const mysql = require('mysql2');

module.exports = {

    Conexion: () => {
        sequelize.authenticate()
            .then(() => {
                console.log('Conectado');
               // sequelize.close();
            })
        }
    } 