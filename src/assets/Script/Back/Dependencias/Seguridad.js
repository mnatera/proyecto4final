const jsonWebToken = require('jsonwebtoken');
const myJWTSecretKey = 'My_Clave_Secreta';

module.exports = {

    DescodificarToken: (token) => {
        const tokenDecodedData=jsonWebToken.verify(token, myJWTSecretKey,function(error,dato) {
              
                if (dato) {
                    return dato;
                } else {
                    return error.message;
                }
            });
           return tokenDecodedData;
        },

    CodificarToken: (ID,Usuario, Perfil) => {
        const payload = {
            "ID": ID,
            "Usuario": Usuario,
            "Perfil": Perfil
        }
        //const Token = jsonWebToken.sign(payload, myJWTSecretKey, { expiresIn: 60 * 60 * 24 }); //24 horas en segundos
        const Token = jsonWebToken.sign(payload, myJWTSecretKey);
        return Token;
    }
}
