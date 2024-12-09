const mysql = require("mysql2")
const dotenv = require("dotenv")
dotenv.config();

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_DOCKER_PORT
}).promise()

module.exports = connection;