const Sequelize = require('sequelize');
const connection = require('../../database/database');

const Historico = connection.define('historico',{
    modelo:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    defeito:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
    acao:{
        type: Sequelize.TEXT,
        allowNull: false,
    } 
});

Historico.sync({force:false}).then(()=>{});

module.exports = Historico;