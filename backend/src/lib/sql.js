import mysql from "mysql";

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "whdgnsqkqh",
  database: "cemi"
});

connection.connect();
export default connection;
