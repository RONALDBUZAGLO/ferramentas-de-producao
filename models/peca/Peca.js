const Sequelize = require('sequelize');
const connection = require('../../database/database');

const Peca = connection.define('peca',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    código:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    maquina:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    quantidadeMinima:{
        type: Sequelize.STRING,
        allowNull: false,
    }

});

// Peca.sync({force:false}).then(()=>{});

module.exports = Peca;