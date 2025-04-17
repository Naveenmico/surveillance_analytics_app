const config = require('../config/config');
const Pool = require('pg-pool');
const pool = new Pool(config.dbConnection);

const dbHandeler = {};
dbHandeler.fetchData = async (queryString) => {
  const client = await pool.connect();
  let res = null;
  try {
    try {
      res = await client.query(queryString);
    } catch (err) {
      console.log('Error1', err);
      throw err;
    }
  } finally {
    client.release();
  }
  return res;
};

dbHandeler.fetchDataParameterized = async (queryString, params) => {
  const client = await pool.connect();
  let res = null;
  try {
    try {
      res = await client.query(queryString, params);
    } catch (err) {
      console.log('Error1', err);
      throw err;
    }
  } finally {
    client.release();
  }
  return res;
};

module.exports = dbHandeler;