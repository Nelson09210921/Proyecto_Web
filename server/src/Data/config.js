import mysql from 'promise-mysql';
import config from "./../config";

const connection = mysql.createConnection({
  host: config.config.host,
  user: config.config.user,
  password: config.config.pass,
  database: config.config.database
});

const getConn = (err) => {
  if (err) throw err;

  console.log('Connected!');
  return connection;
};

module.exports = {
  getConn
}