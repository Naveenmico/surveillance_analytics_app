const Pool = require('pg-pool');
const dbHandeler = require('../dbHandler/dbHandler')
const config = require('../config/config');
const db = new Pool(config.dbConnection);

const authModel = {
    postRegister : async (first_name,email,hashedPassword) =>{
        const values = [first_name,email,hashedPassword];
        const result = (await dbHandeler.fetchDataParameterized(config.QUERY.postRegister, values)).rows;
        const user = result[0];
      
          return {
            status: true,
            statusCode: 200,
            result: user,
          };
    },

    postLogin : async(email) => {
        const values = [email];
        const result = (await dbHandeler.fetchDataParameterized(config.QUERY.postLogin, values)).rows;
        //console.log(result)
        const user = result[0];

          return {
            status: true,
            statusCode: 200,
            result: user,
          };
    }
}

module.exports = authModel;