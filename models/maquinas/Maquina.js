const Sequelize = require('sequelize');
const connection = require('../../database/database');

const Maquina = connection.define('maquina',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    modelo:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    fabricante:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    Manutencao:{
        type: Sequelize.DATE,
        allowNull: false,
    }
});

Maquina.sync({force:false}).then(()=>{});

module.exports = Maquina;