const Sequelize = require('sequelize');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME;
const DB_USER_NAME = process.env.DB_USER_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;
const SSLMODE = process.env.SSLMODE;
const AMBIENTE = process.env.AMBIENTE;

if(AMBIENTE == "desenvolvimento"){

    const connection = new Sequelize(DB_NAME,DB_USER_NAME,DB_PASSWORD,{
        host: DB_HOST,
        dialect: 'mysql',
    });

    module.exports = connection;

}else{

    const connection = new Sequelize(DB_NAME,DB_USER_NAME,DB_PASSWORD,{
        host: DB_HOST,
        dialect: 'mysql',
        port:DB_PORT,
        database: DB_DATABASE,
        sslmode: SSLMODE,
    });

    module.exports = connection;
    
}



