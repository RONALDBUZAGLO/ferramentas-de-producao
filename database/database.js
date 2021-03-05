const Sequelize = require('sequelize');

const connection = new Sequelize('ferramentas-de-producao','doadmin','mvdqfz5qev1sl2ya',{
    host: 'ferramentas-de-producao-do-user-8621037-0.b.db.ondigitalocean.com',
    dialect: 'mysql',
    port:'25060',
    database: 'defaultdb',
    sslmode: 'REQUIRED',
});

module.exports = connection;